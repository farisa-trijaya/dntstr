import { createRouter, defineEventHandler } from "h3";
import * as authServices from "../services/auth.services";

const router = createRouter();

router.post(
  "/verify-email-token",
  defineEventHandler(async (event) => {
    return await authServices.verifyEmailToken(event);
  })
);
router.get(
  "/is-authenticated",
  defineEventHandler(async (event) => {
    return await authServices.isAuthenticated(event);
  })
);
router.get(
  "/profile",
  defineEventHandler(async (event) => {
    return await authServices.profile(event);
  })
);
router.post(
  "/login",
  defineEventHandler(async (event) => {
    return await authServices.login(event);
  })
);
router.post(
  "/refresh",
  defineEventHandler(async (event) => {
    return await authServices.refresh(event);
  })
);
router.post(
  "/logout",
  defineEventHandler(async (event) => {
    return await authServices.logout(event);
  })
);
router.put(
  "/update",
  defineEventHandler(async (event) => {
    return await authServices.update(event);
  })
);
router.delete(
  "/delete",
  defineEventHandler(async (event) => {
    return await authServices.destroy(event);
  })
);
router.post(
  "/reset",
  defineEventHandler(async (event) => {
    return await authServices.reset(event);
  })
);
router.post(
  "/verify-reset",
  defineEventHandler(async (event) => {
    return await authServices.verifyReset(event);
  })
);
router.post(
  "/verify-email",
  defineEventHandler(async (event) => {
    return await authServices.verifyEmail(event);
  })
);
export default useBase("/api/auth", router.handler);
