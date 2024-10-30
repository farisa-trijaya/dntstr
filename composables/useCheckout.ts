import type { ChangePassword, JSONResponse } from "~/app/misc/types";
import type { User, Transaction } from "~/utils/products";

export default function useCheckout() {
  return {
    createTransaction,
    verifyEmailToken,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    getProfile,
    refresh,
    deleteAccount,
    resetPassword,
    verifyReset,
    verifyEmail,
    getTransactionByOrderID,
    getAllTransactionUser,
    uploadAvatar,
    changePassword,
  };
}
async function createTransaction(
  user: User,
  transaction: Transaction
): Promise<JSONResponse> {
  const response = await $fetch("/api/transaction/create", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
    body: { user, transaction },
  });
  return response;
}
async function verifyEmailToken(token: string): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/verify-email-token", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
    body: {
      token: token,
    },
  });
  return response;
}
async function isAuthenticated(): Promise<boolean> {
  // Api response always has status, data, or error
  const { status } = await $fetch("/api/auth/is-authenticated", {
    headers: {
      "client-platform": "browser",
    },
  });
  // If status is success, then user is authenticated, and return true, otherwise return false
  return status === "success";
}
async function login(email: string, password: string): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
    body: {
      email,
      password,
    },
  });

  return response;
}
async function logout(): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
  });

  return response;
}
async function updateProfile(user: User): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/update", {
    method: "PUT",
    headers: {
      "client-platform": "browser",
    },
    body: user,
  });

  return response;
}
async function getProfile(): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/profile", {
    headers: {
      "client-platform": "browser",
    },
  });

  return response;
}
async function refresh(): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/refresh", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
  });

  return response;
}
async function deleteAccount(
  uuid: string,
  csrfToken: string
): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/delete", {
    method: "DELETE",
    headers: {
      "client-platform": "browser",
    },
    body: {
      uuid: uuid,
      csrf_token: csrfToken,
    },
  });

  return response;
}
async function resetPassword(email: string): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/reset", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
    body: {
      email: email,
    },
  });

  return response;
}
async function verifyReset(token: string): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/verify-reset", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
    body: {
      token: token,
    },
  });

  return response;
}
async function verifyEmail(email: string): Promise<JSONResponse> {
  const response = await $fetch("/api/auth/verify-email", {
    method: "POST",
    headers: {
      "client-platform": "browser",
    },
    body: {
      email: email,
    },
  });
  return response;
}
async function getTransactionByOrderID(orderID: string): Promise<JSONResponse> {
  const response = await $fetch(`/api/transaction/${orderID}`, {
    method: "GET",
    headers: {
      "client-platform": "browser",
    },
  });
  return response;
}
async function getAllTransactionUser(): Promise<JSONResponse> {
  const response = await $fetch("/api/transaction/user-all", {
    method: "GET",
    headers: {
      "client-platform": "browser",
    },
  });
  return response;
}
async function uploadAvatar(file: File): Promise<JSONResponse> {
  // console.log(file);
  const body = new FormData();
  body.append("file", file, file.name);

  const response = await $fetch("/api/users/upload-avatar", {
    method: "PUT",
    headers: {
      "client-platform": "browser",
    },
    body: body,
  });
  return response;
}
async function changePassword(data: ChangePassword): Promise<JSONResponse> {
  const response = await $fetch("/api/users/change-password", {
    method: "PUT",
    headers: {
      "client-platform": "browser",
    },
    body: data,
  });
  return response;
}
