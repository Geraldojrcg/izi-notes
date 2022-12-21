import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export const getServerSideUser = async () => {
  const session = await unstable_getServerSession(authOptions);
  return session?.user;
};
