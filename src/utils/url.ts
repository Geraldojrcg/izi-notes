export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "/api"; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}/api`; // dev SSR should use localhost
};
