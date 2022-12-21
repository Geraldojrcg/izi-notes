import { getBaseUrl } from "./url";

type RequestType = {
  path: string;
  method?: RequestInit["method"];
  data?: any;
  headers?: Request["headers"];
} & RequestInit;

export const fetcher = ({ path, method, data, ...paarms }: RequestType) => {
  return fetch(`${getBaseUrl()}/${path}`, {
    method: method || "GET",
    body: data ? JSON.stringify(data) : null,
    ...paarms,
  });
};
