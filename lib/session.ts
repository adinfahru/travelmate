import { User, getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession(authOptions);
  if (!authUserSession) throw new Error("unauthorized");
  return authUserSession.user as User;
};
