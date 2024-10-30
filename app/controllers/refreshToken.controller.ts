import { createRouter, defineEventHandler, useBase, H3Error } from "h3";
import { canAccessAdmin } from "~~/app/helpers/permissions.helpers";
import { validateCsrfToken } from "~~/app/utils/token";
import * as refreshTokenService from "../services/refreshToken.services";

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

// Get all refresh tokens
router.get(
  "/",
  defineEventHandler(async (event) => {
    if (!event.context.user) throw userNotFoundError;
    if (!canAccessAdmin(event.context.user)) throw forbiddenError;
    return await refreshTokenService.index(event);
  })
);

// Delete a refresh token
router.delete(
  "/:id",
  defineEventHandler(async (event) => {
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error) throw csrfTokenError;

    // Get user from context
    if (!event.context.user) throw userNotFoundError;
    if (!canAccessAdmin(event.context.user)) throw forbiddenError;

    return await refreshTokenService.destroy(event);
  })
);

// Delete all refresh tokens
router.delete(
  "/",
  defineEventHandler(async (event) => {
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error) throw csrfTokenError;
    // Get user from context
    if (!event.context.user) throw userNotFoundError;
    if (!canAccessAdmin(event.context.user)) throw forbiddenError;

    return await refreshTokenService.destroyAll(event);
  })
);

export default useBase("/api/refresh-tokens", router.handler);
