"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const NextAuthWrapper = ({ children }: Props) => (
  <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
);

export default NextAuthWrapper;
