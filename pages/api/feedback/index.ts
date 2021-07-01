import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Feedbackタイプを指定している。
 * id,email,feedbackはそれぞれstring型
 */
export type Index = {
  id: string;
  email: string;
  feedback: string;
};

/**
 * feedback.jsonというファイルの場所を明示するための関数。
 * Nodeで実行される。引数をファイル名などで設定しても良いかもしれない。
 * @desc process.cwd() {@link https://nodejs.org/api/process.html#process_process_cwd}
 *
 * @return filePath:string
 *
 */
export const buildFeedbackPath = (): string => {
  return path.join(process.cwd(), "data", "feedback.json");
};

/**
 * @param filePath
 *
 * @desc 非同期関数でjson形式で格納された情報を読取ることができる。
 * 引数はファイルの場所をstring形式で渡す。
 * buildFeedbackPathを直接入力することもできる。
 *
 * @example
 * const filePath = buildFeedbackPath()
 * const data = extractFeedback(filePath)
 * e.g.
 * const data = extractFeedback(buildFeedbackPath())
 *
 * @return return JSON.parse(fileData)
 */
export const extractFeedback = async (filePath: string): Promise<Index[]> => {
  const fileData = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileData);
};

const newFeedback = (email: string, feedback: string): Index => {
  return {
    id: new Date().toISOString(),
    email,
    feedback,
  };
};

/**
 * このファイルのexport defaultで、expressのように動作することができる。
 * @param req
 * @param res
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const feedback = newFeedback(req.body.email, req.body.feedback);
    // store that in a database or in a file
    const feedbackPath = buildFeedbackPath();
    const data = await extractFeedback(feedbackPath);
    data.push(feedback);
    await fs.writeFile(feedbackPath, JSON.stringify(data), "utf8");
    res.status(201).json({
      message: "Success!",
      feedbacks: [feedback],
    });
  } else {
    const feedbackPath = buildFeedbackPath();
    const feedbacks = await extractFeedback(feedbackPath);
    res.status(200).json({
      message: "Success!",
      feedbacks,
    });
  }
};

// noinspection JSUnusedGlobalSymbols
export default handler;
