// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/prisma";
import { ApiHandler } from "../../../utils/server/handler";

export default ApiHandler({
  method: "GET",
  handler: async (req: NextApiRequest, res: NextApiResponse) => {
    const { noteId } = req.query;

    const note = await prisma.note.findFirst({
      where: {
        id: noteId as string,
      },
    });

    res.status(200).json(note);
  },
});
