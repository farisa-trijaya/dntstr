import refreshTokenController from "~/app/controllers/refreshToken.controller";

export default defineEventHandler(async (event) => {
  return refreshTokenController(event);
});
