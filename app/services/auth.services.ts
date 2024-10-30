import { H3Event, H3Error } from "h3";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import dayjs from "dayjs";
import type {
  JSONResponse,
  User,
  TokensSession,
  Session,
} from "~~/app/misc/types";
import * as authResources from "../resources/auth.resources";
import * as tokensUtils from "../utils/token";
import * as usersUtils from "../utils/users";
import * as sessionsUtils from "../utils/sessions";
import * as passwordsUtils from "../utils/passwords";
import { getClientPlatform } from "../middleware";

export async function isAuthenticated(event: H3Event): Promise<JSONResponse> {
  const authenticated = await authResources.isAuthenticated(event);
  const response = {} as JSONResponse;

  if (authenticated instanceof H3Error) {
    response.status = "fail";
    response.error = authenticated;
  }

  if (authenticated === false) {
    response.status = "fail";
  }

  if (authenticated === true) {
    response.status = "success";
  }

  return response;
}
export async function login(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  // Check client platform first
  const errorOrPlatform = getClientPlatform(event);
  // If error, return error
  if (errorOrPlatform instanceof H3Error) {
    // Delete tokens
    deleteCookie(event, "iam-access-token");
    deleteCookie(event, "iam-refresh-token");
    deleteCookie(event, "iam-sid");

    response.status = "fail";
    response.error = errorOrPlatform;
    return response;
  }

  // Otherwise get platform
  const platform = errorOrPlatform as string;

  const errorOrTokens = await authResources.loginUser(event);

  // If error, return error
  if (errorOrTokens instanceof H3Error) {
    // Delete tokens
    deleteCookie(event, "iam-access-token");
    deleteCookie(event, "iam-refresh-token");
    deleteCookie(event, "iam-sid");

    response.status = "fail";
    response.error = errorOrTokens;
    return response;
  }

  //Otherwise get tokens
  const tokens = errorOrTokens as TokensSession;

  // If platform is app dev/production, set tokens in header
  if (platform === "app") {
    setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
    setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
    if (tokens.sid) setHeader(event, "iam-sid", tokens.sid);
  }

  // If platform is browser production, set tokens in secure, httpOnly cookies
  if (platform === "browser") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      httpOnly: true,
      secure: true,
    });

    // Cookies containing refresh tokens expire in 14 days, unless refreshed and new tokens obtained
    // Refresh tokens themselves expire in 14 days, unless new tokens are obtained
    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: dayjs().add(14, "day").toDate(),
    });

    // Set session id in cookie
    if (tokens.sid) setCookie(event, "iam-sid", tokens.sid);
  }

  // Development cookies are not secure. Use only in development
  if (platform === "browser-dev") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      // Access tokens themselves expire in 15 mins
      expires: dayjs().add(1, "day").toDate(),
    });
    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      expires: dayjs().add(1, "day").toDate(),
    });

    // Set session id token in cookie
    if (tokens.sid) setCookie(event, "iam-sid", tokens.sid);
  }

  // Create api result
  const body = await readBody(event);

  // If all is successful
  response.status = "success";
  response.data = {
    email: body.email,
  };
  return response;
}
export async function refresh(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;

  // Check client platform first
  const errorOrPlatform = getClientPlatform(event);

  // If error, return error
  if (errorOrPlatform instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrPlatform;
    return response;
  }

  // Otherwise get platform
  const platform = errorOrPlatform as string;

  // Attempt to refresh tokens
  const errorOrTokens = await authResources.refreshTokens(event);

  // If error, return error
  if (errorOrTokens instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrTokens;
    return response;
  }

  //Otherwise get tokens
  const tokens = errorOrTokens as TokensSession;

  // If platform is app dev/production, set tokens in header
  if (platform === "app") {
    setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
    setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
    if (tokens.sid) setHeader(event, "iam-sid", tokens.sid);
  }

  // If platform is browser production, set tokens in secure, httpOnly cookies
  if (platform === "browser") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      httpOnly: true,
      secure: true,
    });

    // Cookies containing refresh tokens expire in 14 days, unless refreshed and new tokens obtained
    // Refresh tokens themselves expire in 14 days, unless new tokens are obtained
    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: dayjs().add(14, "day").toDate(),
    });

    // Set session id
    if (tokens.sid) setCookie(event, "iam-sid", tokens.sid);
  }

  // Development cookies are not secure. Use only in development
  if (platform === "browser-dev") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      // Access tokens themselves expire in 15 mins
      expires: dayjs().add(1, "day").toDate(),
    });

    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      expires: dayjs().add(1, "day").toDate(),
    });

    // Set session id
    if (tokens.sid) setCookie(event, "iam-sid", tokens.sid);
  }

  // If all is successful
  response.status = "success";

  return response;
}
export async function logout(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  const errorOrTrue = await authResources.logoutUser(event);

  // If error, return error
  if (errorOrTrue instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrTrue;
    return response;
  }

  // Otherwise return successful logout response
  response.status = "success";
  return response;
}
export async function profile(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  let sessionOrError = {} as Session | H3Error;
  const profileOrError = await authResources.getProfile(event);

  if (profileOrError instanceof H3Error) {
    response.status = "fail";
    response.error = profileOrError;
    return response;
  }

  const profile = profileOrError as User;

  // Get csrf token from using session id token
  const sessionId = getCookie(event, "iam-sid");
  if (sessionId) sessionOrError = await sessionsUtils.getUserSession(sessionId);

  // If error, return error
  if (sessionOrError instanceof H3Error) {
    console.log("Error getting user session");
    response.status = "fail";
    response.error = response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }

  // Otherwise get session and csrf token
  const session = sessionOrError as Session;
  profile.csrf_token = session.csrf_token;

  // Return response
  response.status = "success";
  response.data = profile;

  return response;
}
export async function update(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;

  // Check if csrf token is valid
  const csrfTokenError = await tokensUtils.validateCsrfToken(event);

  if (csrfTokenError instanceof H3Error) {
    console.log("Csrf token error");
    response.status = "fail";
    response.error = createError({
      statusCode: 403,
      statusMessage: "Missing or invalid csrf token",
    });
    return response;
  }

  const profileOrError = await authResources.updateProfile(event);

  if (profileOrError instanceof H3Error) {
    response.status = "fail";
    response.error = profileOrError;
    return response;
  }

  const profile = profileOrError as User;

  response.status = "success";
  response.data = profile;

  return response;
}
export async function destroy(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;

  // Check if csrf token is valid
  const csrfTokenError = await tokensUtils.validateCsrfToken(event);

  if (csrfTokenError instanceof H3Error) {
    console.log("Csrf token error");
    response.status = "fail";
    response.error = createError({
      statusCode: 403,
      statusMessage: "Missing or invalid csrf token",
    });
    return response;
  }

  // Attempt to delete account
  const deleteOrError = await authResources.deleteAccount(event);

  // If error in deleting user account, return error
  if (deleteOrError instanceof H3Error) {
    response.status = "fail";
    response.error = deleteOrError;
    return response;
  }

  const userDeleted = deleteOrError as boolean;

  // If false result, which shouldn't happen, return error
  if (userDeleted === false) {
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Error deleting user account",
    });
    return response;
  }

  // Otherwise delete was successful
  response.status = "success";

  return response;
}
export async function verifyEmailToken(
  event: H3Event
): Promise<JSONResponse | void> {
  const response = {} as JSONResponse;
  // Get token from body
  const body = await readBody(event);
  const token = body.token;

  if (!token) {
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
    return response;
  }
  // Verify token
  const jwtPayloadOrError = tokensUtils.verifyEmailVerificationToken(token);

  // If email verification token is expired, return error
  if (jwtPayloadOrError instanceof jwt.TokenExpiredError) {
    console.log("Expired email verification reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Link has expired",
    });
    return response;
  }

  // If other error occurred, return error
  if (jwtPayloadOrError instanceof H3Error) {
    console.log("Other error with email reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
    return response;
  }

  // Otherwise update user email to verified
  const jwtPayload = jwtPayloadOrError as jwt.JwtPayload;
  const updateError = await usersUtils.updateEmailVerifiedTrue(
    jwtPayload.email
  );

  if (updateError) {
    console.log("Error updating verified email to true");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
    return response;
  }
  // Return password
  response.status = "success";
  response.data = {
    email: jwtPayload.email,
  };

  return response;
}
export async function reset(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  // Delete tokens
  deleteCookie(event, "iam-access-token");
  deleteCookie(event, "iam-refresh-token");
  deleteCookie(event, "iam-sid");
  // Send user an email to reset their password
  const errorOrReset = await authResources.resetPassword(event);
  // For security purposes, do not throw errors
  if (errorOrReset instanceof H3Error) {
    console.log("Error: Failed to reset user password");
  }
  // For security purposes, response is always successful
  response.status = "success";

  return response;
}
export async function verifyReset(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;

  // Delete access and refresh tokens
  deleteCookie(event, "iam-access-token");
  deleteCookie(event, "iam-refresh-token");
  deleteCookie(event, "iam-sid");

  // Get token from body
  const body = await readBody(event);
  const token = body.token;

  if (!token) {
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
    return response;
  }

  // Verify token
  const userOrError = tokensUtils.verifyPasswordResetToken(token);

  // If password reset token is expired, return error
  if (userOrError instanceof jwt.TokenExpiredError) {
    console.log("Expired password reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Link has expired",
    });
    return response;
  }

  // If other error occurred, return error
  if (userOrError instanceof H3Error) {
    console.log("Other error with password reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
    return response;
  }

  // Get token payload. Check if error
  const errorOrTokenPayload = tokensUtils.getTokenPayload(token, "reset");
  if (errorOrTokenPayload instanceof H3Error) {
    console.log("Get token payload error");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
    return response;
  }

  // If no error, get token payload
  const tokenPayload = errorOrTokenPayload as JwtPayload;

  // If token has no id, return error
  if (!tokenPayload.jti) {
    console.log("Token payload has no id (jwt.jti)");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
    return response;
  }

  // Attempt to add token, if token already exists, it's used
  if (
    tokenPayload.jti !==
    (await tokensUtils.addOneTimeToken(tokenPayload.jti, new Date()))
  ) {
    console.log("Adding one time token failed. Token is probably already used");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
    return response;
  }

  // Otherwise generate new password for user
  const user = userOrError as User;
  const errorOrPassword = await passwordsUtils.generateNewPassword(user.uuid);

  // If error, return error
  if (errorOrPassword instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrPassword;
    return response;
  }

  // Otherwise, get newly generated password
  const password = errorOrPassword as string;

  // Return password
  response.status = "success";
  response.data = {
    pass: password,
  };

  return response;
}
export async function verifyEmail(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  // Send user an email to verify their email
  const errorOrReset = await authResources.verifyUserEmail(event);
  // Always returns success because user must click link in email to verify it
  if (errorOrReset instanceof H3Error) {
    console.log(errorOrReset.message);
    response.status = "fail";
    response.error = createError({
      statusCode: 403,
      statusMessage: errorOrReset.message,
    });
    return response;
  }
  // For security purposes, response is always successful
  response.status = "success";
  response.data = errorOrReset;
  return response;
}
