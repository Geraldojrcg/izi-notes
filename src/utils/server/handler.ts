import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "./authMiddleware";

export type Controller = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

export const ApiHandler = (contoller: Controller) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;

    // check handler supports HTTP method
    if (contoller.method !== method) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      await authMiddleware(req, res);
      await contoller.handler(req, res);
    } catch (error: any) {
      res.status(error?.response?.status).send(error?.response?.data);
    }
  };
};
