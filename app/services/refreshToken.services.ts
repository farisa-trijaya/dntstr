import { H3Event, H3Error } from "h3";
import * as refreshTokenResource from "../resources/refreshToken.resources";
import type { JSONResponse, RefreshTokens } from "~~/app/misc/types";

export async function index(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  const errorOrTokens = await refreshTokenResource.getAllRefreshTokens(event);
  // If error, return error
  if (errorOrTokens instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrTokens;
    return response;
  }
  // Otherwise, return tokens
  const tokens = errorOrTokens as RefreshTokens;
  response.status = "success";
  response.data = tokens;

  return response;
}
export async function destroy(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  const errorOrBoolean = await refreshTokenResource.destroyRefreshToken(event);
  // If error, return error
  if (errorOrBoolean instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrBoolean;
    return response;
  }
  // If false is returned, which shouldn't happen
  if (errorOrBoolean === false) {
    response.status = "fail";
    return response;
  }
  // Otherwise token successfully deleted
  else {
    response.status = "success";
    return response;
  }
}
export async function destroyAll(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  const errorOrBoolean = await refreshTokenResource.destroyRefreshTokens(event);
  // If error, return error
  if (errorOrBoolean instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrBoolean;
    return response;
  }
  // If false is returned, which shouldn't happen
  if (errorOrBoolean === false) {
    response.status = "fail";
    return response;
  }
  // Otherwise token successfully deleted
  else {
    response.status = "success";
    return response;
  }
}
