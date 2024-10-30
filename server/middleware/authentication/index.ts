import { H3Error } from "h3";
import { isAuthenticated } from "~/app/resources/auth.resources";
import { getAuthenticatedRoutes } from "~/app/utils/login";
import { getUserFromAccessToken } from "~/app/helpers/users.helpers";

const forbiddenError = createError({
  statusCode: 403,
  statusMessage: "Forbidden",
});

export default defineEventHandler(async (event) => {
  // Get all routes that need a user to be authenticated
  const authRoutes = getAuthenticatedRoutes();

  // Check if request url is among authenticated routes
  if (event.node.req.url)
    for (let i = 0; i < authRoutes.length; i++) {
      if (event.node.req.url.includes(authRoutes[i])) {
        // Check if user is authenticated
        const authenticated = await isAuthenticated(event);

        if (authenticated instanceof H3Error) throw forbiddenError;

        if (authenticated === false) throw forbiddenError;

        // If user is authenticated, add user to context
        const userOrNull = await getUserFromAccessToken(event);

        if (userOrNull === null) {
          console.log(
            "Missing access token after authentication. This should not happen."
          );
          throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized. Missing access token.",
          });
        }

        // Add user to context
        event.context.user = userOrNull;
        break;
      }
    }
});
