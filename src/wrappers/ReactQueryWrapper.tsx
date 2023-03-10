"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const ReactQueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ReactQueryWrapper;
