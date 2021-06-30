import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

type Feedback = {
  id: string;
  email: string;
  feedback: string;
};

const buildFeedbackPath = (): string => {
  return path.join(process.cwd(), "data", "feedback.json");
};

const extractFeedback = async (feedbackPath: string): Promise<Feedback[]> => {
  const fileData = await fs.readFile(feedbackPath, "utf8");
  const data: Feedback[] = JSON.parse(fileData);
  return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const newFeedback: Feedback = {
      id: new Date().toISOString(),
      email: req.body.email,
      feedback: req.body.feedback,
    };

    // store that in a database or in a file
    const feedbackPath = buildFeedbackPath();
    const data = await extractFeedback(feedbackPath);
    data.push(newFeedback);
    await fs.writeFile(feedbackPath, JSON.stringify(data), "utf8");
    res.status(201).json({
      message: "Success!",
      feedback: newFeedback,
    });
  } else {
    const feedbackPath = buildFeedbackPath();
    const fileData = await fs.readFile(feedbackPath, "utf8");
    const feedback: Feedback[] = JSON.parse(fileData);
    res.status(200).json({ feedback });
  }
};

// noinspection JSUnusedGlobalSymbols
export default handler;
