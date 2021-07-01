import { NextApiRequest, NextApiResponse } from "next";

type Success = {
  message: string;
};

type Failed = {
  error: string;
};

export type Input = {
  id: string;
  email: string;
  name: string;
  text: string;
};

export type Output =
  | {
      id: string;
      name: string;
      text: string;
    }[]
  | undefined;

/**
 * @desc
 * コメントがデータベースに登録されてい良いか確認し、問題なければ返却する。
 * @param req HTTP Request
 * NextApiRequestのdefault
 *
 * @param res HTTP Response
 * Type: Success | Failed | { comment: Comment }
 * とある。
 *
 * @return void
 */
const createComment = (
  req: NextApiRequest,
  res: NextApiResponse<Success | Failed | { comment: Input }>
): void => {
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

  const newComment: Input = {
    id: new Date().toISOString(),
    email,
    name,
    text,
  };
  console.log(newComment);

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
const handler = (
  req: NextApiRequest,
  res: NextApiResponse<
    Success | Failed | { comment: Input } | { comments: Output }
  >
): void => {
  const eventId = req.query.eventId;
  console.log(eventId);

  if (req.method === "POST") {
    createComment(req, res);
    return;
  }

  if (req.method === "GET") {
    const dummyList: Output = [
      { id: "1", name: "Y", text: "programing" },
      { id: "2", name: "S", text: "work" },
      { id: "3", name: "N", text: "study" },
    ];
    res.status(200).json({ message: "success", comments: dummyList });
    return;
  }

  if (req.method !== "POST" || "GET") {
    res.status(400).json({ error: "request method not POST or GET" });
    return;
  }
};

export default handler;
