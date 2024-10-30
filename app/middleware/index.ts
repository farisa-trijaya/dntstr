import { H3Event, H3Error } from "h3";

export function getClientPlatform(event: H3Event): H3Error | string {
  const clientPlatforms = ["app", "browser", "browser-dev"];
  let clientPlatform = event.node.req.headers["client-platform"] as string;

  // Check if 'client-platform' header is present
  if (!clientPlatform) {
    console.log(
      "Missing required header 'client-platform'. 'client-platform' upgraded to 'browser'"
    );

    // Add client-platform to request headers
    event.node.req.headers["client-platform"] = "browser";
    clientPlatform = "browser";
  }

  // Check if 'client-platform' header is either 'app' or 'browser'
  if (!clientPlatforms.includes(clientPlatform))
    return createError({
      statusCode: 400,
      statusMessage:
        "Required header 'client-platform' must be 'app', 'browser', or 'browser-dev' only",
    });

  return clientPlatform;
}
