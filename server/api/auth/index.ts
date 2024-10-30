import authController from "~/app/controllers/auth.controller";

export default defineEventHandler(async (event) => {
  return authController(event);
});
