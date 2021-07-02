import { NextApiRequest, NextApiResponse } from "next";
import { mongoClient } from "../../../helpers/dbUtilities";

type Success = {
  email: string;
  message: string;
};

type Failed = {
  message: string;
};

/**
 * Use MongoClient input Email Address
 * @param email - string - クライアントから取得したEmail Address
 * @return Promise<void>
 */
const mongoMailInsert = async (email: string) => {
  const client = await mongoClient();
  const db = await client.db();
  await db.collection("newsletter").insertOne({ email });
  // .catch((error) => console.error(error));
  await client.close();
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
    console.log("server side:", userEmail);
    await mongoMailInsert(userEmail);

    res.status(201).json({
      email: userEmail,
      message: "Success!",
    });
  }
};
export default handler;
