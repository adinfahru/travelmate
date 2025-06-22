import { Session, User, getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession(authOptions);
  if (!authUserSession) throw new Error("unauthorized");
  return authUserSession.user as User;
};

export const getSession = async (): Promise<Session | null> => {
  return await getServerSession(authOptions);
};

export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getSession();
  return session !== null;
};
