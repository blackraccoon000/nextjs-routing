import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDocument } from "../../../helpers/dbUtilities";

type Success = {
  email: string;
};

type Failed = {
  message: string;
};

/**
 * @desc newsletter設定のアドレスを登録する。
 * @param req
 * POST emailの確認を実施
 * @param res
 * Failed時 message:string
 * @return null
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Success | Failed>
) => {
  if (req.method === "POST") {
    const userEmail: string = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    try {
      const client = await connectDatabase();
      await insertDocument(client, "newsletter", { email: userEmail });
      await client.close();
    } catch (error) {
      const { statusCode, message } = error;
      console.error("e:", error);
      res.status(statusCode).json({ message });
      return;
    }

    res.status(201).json({
      email: userEmail,
      message: "Success!",
    });
  }
};
export default handler;
