export enum Role {
  // ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export const rolePermissions: Record<Role, string[]> = {
  // [Role.ADMIN]: ["read", "write", "delete", "manage"],
  [Role.USER]: ["read", "write"],
  [Role.GUEST]: ["read"],
};

export function hasPermission(role: Role, permission: string): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}
