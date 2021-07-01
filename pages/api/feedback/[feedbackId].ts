import { NextApiRequest, NextApiResponse } from "next";
import { buildFeedbackPath, extractFeedback, Index } from "./index";

type Feedback = {
  feedback: Index | undefined;
};

type Failed = {
  message: string;
};

/**
 * feedback.jsonから該当のIDを見つけ、返す。
 * @param feedbackId
 * @desc feedbackIdはURLベースで取得される。
 * @example
 *     const resultFeedback = selectedFeedback(req.query.feedbackId);
 *     res.status(200).json({ feedback: resultFeedback });
 * @return Index | undefined
 */
export const selectedFeedback = async (
  feedbackId: string
): Promise<Index | undefined> => {
  const filePath = buildFeedbackPath();
  const feedbacksData = await extractFeedback(filePath);
  return feedbacksData.find((feedback) => feedback.id === feedbackId);
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Feedback | Failed>
) => {
  if (typeof req.query.feedbackId === "string") {
    const resultFeedback = await selectedFeedback(req.query.feedbackId);
    res.status(200).json({ feedback: resultFeedback });
  } else {
    res.status(400).json({ message: "400 Bad Request" });
  }
};

export default handler;
