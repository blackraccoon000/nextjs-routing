import { NextApiRequest, NextApiResponse } from "next";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/dbUtilities";

type Success = {
  message: string;
};

type Failed = {
  error: string;
};

export type Input = {
  _id: string;
  eventId: string;
  email: string;
  name: string;
  text: string;
};

export type Output = Input[] | undefined;

/**
 * @desc
 * コメントがデータベースに登録されてい良いか確認
 * ついでにmongoDBにデータを追加する。
 * @param req HTTP Request
 * NextApiRequestのdefault
 *
 * @param res HTTP Response
 * @param eventId eventPageのID
 * Type: Success | Failed | { comment: Input }
 * とある。
 *
 * @return Promise<void>
 */
const createComment = async (
  req: NextApiRequest,
  res: NextApiResponse<Success | Failed | { comment: Input }>,
  eventId: string
): Promise<void> => {
  const { email, name, text } = req.body;

  const validate: boolean =
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !text ||
    text.trim() === "";

  if (validate) {
    res.status(422).json({ error: "Invalid input." });
    return;
  }

  const commentData: Input = {
    _id: "",
    eventId,
    email,
    name,
    text,
  };
  const client = await connectDatabase();
  await insertDocument(client, "comments", commentData);
  await client.close();

  res.status(200).json({
    message: "Added comment.",
    comment: commentData,
  });
};

/**
 * @desc
 * req.methodがPOSTの場合、createComment(req,res)
 * req.methodがGETの場合、commentが返却 (未実装
 * req.methodがPOSTかGET以外の場合 errorが返却される
 * @param req NextApiRequest
 * @param res NextApiResponse<Success | Failed | { comment: Comment } | { comments: Comment[] }>
 * @return void
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    Success | Failed | { comment: Input } | { comments: Output }
  >
): Promise<void> => {
  const eventId =
    typeof req.query.eventId === "string" ? req.query.eventId : "";

  if (req.method === "POST") {
    await createComment(req, res, eventId);
    return;
  }

  if (req.method === "GET") {
    try {
      const client = await connectDatabase();
      const document = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      await client.close();
      res.status(200).json({ message: "success", comments: document });
    } catch (error) {
      const { statusCode, message } = error;
      console.error(error);
      res.status(statusCode).json({ message });
      return;
    }
    return;
  }

  if (req.method !== "POST" || "GET") {
    res.status(400).json({ error: "request method not POST or GET" });
    return;
  }
};

export default handler;
