import type { JSONResponse, User } from "~~/app/misc/types";

export default function useAdmin() {
  return {
    getUsers,
    updateUser,
    deleteUser,
    userHasPermission,
    getRefreshTokens,
    deleteRefreshToken,
    deleteRefreshTokens,
    getAllTransactions,
  };
}

async function getRefreshTokens(): Promise<JSONResponse> {
  const response = await $fetch("/api/refresh-tokens", {
    headers: {
      "client-platform": "browser",
    },
  });

  return response;
}
async function deleteRefreshToken(
  id: number,
  csrfToken: string
): Promise<JSONResponse> {
  const response = await $fetch(`/api/refresh-tokens/${id}`, {
    method: "DELETE",
    headers: {
      "client-platform": "browser",
    },
    body: {
      csrf_token: csrfToken,
    },
  });

  return response;
}
async function deleteRefreshTokens(csrfToken: string): Promise<JSONResponse> {
  const response = await $fetch(`/api/refresh-tokens/`, {
    method: "DELETE",
    headers: {
      "client-platform": "browser",
    },
    body: {
      csrf_token: csrfToken,
    },
  });

  return response;
}
async function getUsers(): Promise<JSONResponse> {
  const response = await $fetch("/api/users", {
    headers: {
      "client-platform": "browser",
    },
  });

  return response;
}
async function updateUser(user: User): Promise<JSONResponse> {
  const response = await $fetch(`/api/users/${user.uuid}`, {
    method: "PUT",
    headers: {
      "client-platform": "browser",
    },
    body: user,
  });

  console.log("Response: ", response);
  return response;
}
async function deleteUser(user: User): Promise<JSONResponse> {
  const response = await $fetch(`/api/users/${user.uuid}`, {
    method: "DELETE",
    headers: {
      "client-platform": "browser",
    },
    body: {
      csrf_token: user.csrf_token,
    },
  });

  return response;
}
async function getAllTransactions(
  page: string,
  total: string,
  orderId: string
): Promise<JSONResponse> {
  const response = await $fetch(
    `/api/transaction/all?skip=${page}&take=${total}&search${orderId}`,
    {
      method: "GET",
      headers: {
        "client-platform": "browser",
      },
    }
  );
  return response;
}
async function userHasPermission(
  user: User,
  permission: string
): Promise<JSONResponse> {
  const response = await $fetch(
    `/api/users/${user.uuid}/permission/${permission}`,
    {
      headers: {
        "client-platform": "browser",
      },
    }
  );

  return response;
}
