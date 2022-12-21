import { useSession, signIn, signOut } from "next-auth/react";

function useAuth() {
  const session = useSession();
  const user = session.data?.user;

  return {
    user,
    isLogged: session.status === "authenticated",
    signIn,
    signOut,
  };
}

export default useAuth;
