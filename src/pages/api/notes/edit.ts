// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/prisma";
import { ApiHandler } from "../../../utils/server/handler";

export default ApiHandler({
  method: "PUT",
  handler: async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body);

    await prisma.note.update({
      where: {
        id: data.id as string,
      },
      data: data,
    });

    res.status(200).end();
  },
});
