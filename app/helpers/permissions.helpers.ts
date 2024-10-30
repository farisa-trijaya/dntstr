import type { User } from "~~/app/misc/types";

export function canAccessAdmin(user: User): boolean {
  if (user.role === "SUPER_ADMIN" && user.email_verified) return true;

  return false;
}

export function hasPermission(user: User, permission: string): boolean {
  // Check if user has the permission
  const permissions = {
    "can-access-admin": canAccessAdmin(user),
  };

  // If permission does not exist, return false
  if (permission in permissions === false) {
    console.log(`No such permission as "${permission}"`);
    return false;
  } else {
    // @ts-ignore
    return permissions[permission];
  }
}
