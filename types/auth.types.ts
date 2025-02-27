export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USERs",
}

export type CurrentUserType = {
  email: string;
  role: UserRole;
  id: string;
};
