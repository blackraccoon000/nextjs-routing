import { NextApiRequest, NextApiResponse } from "next";
import { mongoClient } from "../../../helpers/dbUtilities";

type Success = {
  message: string;
};

type Failed = {
  error: string;
};

export type Input = {
  eventId: string;
  email: string;
  name: string;
  text: string;
};

export type Output =
  | {
      _id: string;
      eventId: string;
      email: string;
      name: string;
      text: string;
    }[]
  | undefined;

type MongoResult = {
  eventId: string;
  name: string;
  id: string;
  text: string;
  email: string;
};

/**
 * Use MongoClient input Comment
 * @param comment - Input - クライアントから取得したInput情報を送信
 * @return  Promise<MongoResult>
 */
const mongoCommentInsert = async (comment: Input): Promise<MongoResult> => {
  const client = await mongoClient();
  const db = await client.db();
  const result = await db.collection("comments").insertOne(comment);
  await client.close();
  return {
    id: result.insertedId,
    ...comment,
  };
};

/**
 * Use MongoClient Get Comments
 * @return document - Promise<Output>
 */
const mongoCommentFinder = async (): Promise<Output> => {
  const client = await mongoClient();
  const db = await client.db();
  const document: Output = await db
    .collection("comments")
    .find() //
    .sort({ _id: -1 }) //時系列順？
    .toArray();
  await client.close();
  return document;
  // return {
  // 	id: result.insertedId,
  // 	...comment,
  // };
};

/**
 * @desc
 * コメントがデータベースに登録されてい良いか確認
 * ついでにmongoDBにデータを追加する。
 * @param req HTTP Request
 * NextApiRequestのdefault
 *
 * @param res HTTP Response
 * @param eventId eventPageのID
 * Type: Success | Failed | { comment: Comment }
 * とある。
 *
 * @return Promise<void>
 */
const createComment = async (
  req: NextApiRequest,
  res: NextApiResponse<Success | Failed | { comment: MongoResult }>,
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
    eventId,
    email,
    name,
    text,
  };
  const newComment = await mongoCommentInsert(commentData);

  res.status(200).json({
    message: "Added comment.",
    comment: newComment,
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
    Success | Failed | { comment: MongoResult } | { comments: Output }
  >
): Promise<void> => {
  const eventId =
    typeof req.query.eventId === "string" ? req.query.eventId : "";

  if (req.method === "POST") {
    await createComment(req, res, eventId);
    return;
  }

  if (req.method === "GET") {
    const document = await mongoCommentFinder();
    console.log(document);
    // const dummyList: Output = [
    //   { id: "1", name: "Y", text: "programing" },
    //   { id: "2", name: "S", text: "work" },
    //   { id: "3", name: "N", text: "study" },
    // ];
    res.status(200).json({ message: "success", comments: document });
    return;
  }

  if (req.method !== "POST" || "GET") {
    res.status(400).json({ error: "request method not POST or GET" });
    return;
  }
};

export default handler;
