import { NextApiRequest, NextApiResponse } from "next";

type Success = {
  email: string;
  message: string;
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
const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Success | Failed>
) => {
  if (req.method === "POST") {
    const userEmail: string = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    console.log("server side:", userEmail);
    res.status(201).json({
      email: userEmail,
      message: "Success!",
    });
  }
};
export default handler;
