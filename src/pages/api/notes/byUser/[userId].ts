// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../database/prisma";
import { ApiHandler } from "../../../../utils/server/handler";

export default ApiHandler({
  method: "GET",
  handler: async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;

    const userNotes = await prisma.note.findMany({
      where: {
        userId: userId as string,
      },
    });

    res.status(200).json(userNotes);
  },
});
