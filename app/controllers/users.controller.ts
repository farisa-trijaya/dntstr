import { createRouter, defineEventHandler, useBase, H3Error } from "h3";
import { canAccessAdmin } from "~~/app/helpers/permissions.helpers";
import { isOwner } from "~~/app/helpers/users.helpers";
import { validateCsrfToken } from "~~/app/utils/token";
import * as usersServices from "../services/users.services";

const userNotFoundError = createError({
  statusCode: 401,
  statusMessage: "Unauthorized. User not found.",
});

// Forbidden error
const forbiddenError = createError({
  statusCode: 403,
  statusMessage: "Forbidden",
});

// Missing csrf token error
const csrfTokenError = createError({
  statusCode: 403,
  statusMessage: "Missing or invalid csrf token",
});

const router = createRouter();

router.get(
  "/",
  defineEventHandler(async (event) => {
    if (!event.context.user) throw userNotFoundError;
    if (!canAccessAdmin(event.context.user)) throw forbiddenError;
    return await usersServices.index(event);
  })
);
router.post(
  "/",
  defineEventHandler(async (event) => {
    return await usersServices.create(event);
  })
);
router.get(
  "/:uuid",
  defineEventHandler(async (event) => {
    // Get user uuid from request
    if (!event.context.user) throw userNotFoundError;
    const uuid = event.context.params?.uuid;

    // Permissions: to see record, user must be either super admin or be the owner
    if (uuid)
      if (
        event.context.user.uuid &&
        !canAccessAdmin(event.context.user) &&
        !isOwner(event.context.user.uuid, uuid)
      )
        throw forbiddenError;

    return await usersServices.show(event);
  })
);
router.get(
  "/:uuid/permission/:permission",
  defineEventHandler(async (event) => {
    if (!event.context.user) throw userNotFoundError;
    if (!canAccessAdmin(event.context.user)) throw forbiddenError;

    return await usersServices.permission(event);
  })
);
router.put(
  "/:uuid",
  defineEventHandler(async (event) => {
    // Check if csrf token is valid
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error) throw csrfTokenError;

    // Get user uuid from request
    if (!event.context.user) throw userNotFoundError;
    const uuid = event.context.params?.uuid;

    // To edit record, user must be either super admin or be the owner
    if (uuid)
      if (
        event.context.user.uuid &&
        !canAccessAdmin(event.context.user) &&
        !isOwner(event.context.user.uuid, uuid)
      )
        throw forbiddenError;

    return await usersServices.update(event);
  })
);
router.delete(
  "/:uuid",
  defineEventHandler(async (event) => {
    // Check if csrf token is valid
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error) throw csrfTokenError;

    // Get user uuid from request
    if (!event.context.user) throw userNotFoundError;
    const uuid = event.context.params?.uuid;

    // To delete record, user must be either super admin or be the owner
    if (uuid)
      if (
        event.context.user.uuid &&
        !canAccessAdmin(event.context.user) &&
        !isOwner(event.context.user.uuid, uuid)
      )
        throw forbiddenError;

    return await usersServices.destroy(event);
  })
);
router.put(
  "/upload-avatar",
  defineEventHandler(async (event) => {
    return await usersServices.uploadAvatar(event);
  })
);
router.put(
  "/change-password",
  defineEventHandler(async (event) => {
    return await usersServices.changePasswordService(event);
  })
);
export default useBase("/api/users", router.handler);
