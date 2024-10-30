import usersController from "~/app/controllers/users.controller";

export default defineEventHandler(async (event) => {
  return usersController(event);
});
