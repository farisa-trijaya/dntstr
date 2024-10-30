import { createRouter, defineEventHandler, H3Error } from "h3";
import * as transactionServices from "../services/transaction.services";
import { canAccessAdmin } from "../helpers/permissions.helpers";
import { isAuthenticated } from "../resources/auth.resources";
import { getUserFromAccessToken } from "../helpers/users.helpers";

const router = createRouter();

const userNotFoundError = createError({
  statusCode: 401,
  statusMessage: "Unauthorized. User not found.",
});

const forbiddenError = createError({
  statusCode: 403,
  statusMessage: "Forbidden",
});

const csrfTokenError = createError({
  statusCode: 403,
  statusMessage: "Missing or invalid csrf token",
});

router.post(
  "/create",
  defineEventHandler(async (event) => {
    return await transactionServices.createNewTransactionService(event);
  })
);
router.get(
  "/:orderID",
  defineEventHandler(async (event) => {
    return await transactionServices.getTransactionByOrderIDService(event);
  })
);
router.get(
  "/all",
  defineEventHandler(async (event) => {
    const authenticated = await isAuthenticated(event);
    if (authenticated instanceof H3Error) throw forbiddenError;
    if (authenticated === false) throw forbiddenError;
    const userOrNull = await getUserFromAccessToken(event);
    if (userOrNull === null) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized. Missing access token.",
      });
    }
    event.context.user = userOrNull;
    if (!event.context.user) throw userNotFoundError;
    if (!canAccessAdmin(event.context.user)) throw forbiddenError;
    return await transactionServices.getAllTransactionService(event);
  })
);
router.get(
  "/user-all",
  defineEventHandler(async (event) => {
    return await transactionServices.getAllTransactionUserService(event);
  })
);

export default useBase("/api/transaction", router.handler);
