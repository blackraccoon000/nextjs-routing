import { GetStaticProps } from "next";
import fs from "fs/promises";
import { buildFeedbackPath, Feedback } from "../api/feedback";

type Props = {
  feedbackItems: Feedback[];
};

/**
 * api/feedback から取得する情報をSSGで取得する。
 * @param feedbackItems
 * api/feedbackから受け取ることのできるfeedbacksを返す。
 * getStaticPropsにより、サーバーサイドからpropsを受け取ることができる。
 */
const FeedbackPage = ({ feedbackItems }: { feedbackItems: any }) => {
  return (
    <ul>
      {feedbackItems.map((item: any) => (
        <ul key={item.id}>
          <li>{item.email}</li>
          <li>{item.feedback}</li>
        </ul>
      ))}
    </ul>
  );
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<Props> = async () => {
  const feedbackPath = buildFeedbackPath();
  const fileData = await fs.readFile(feedbackPath, "utf8");
  const feedbacks: Feedback[] = JSON.parse(fileData);
  return {
    props: {
      feedbackItems: feedbacks,
    },
    revalidate: false,
  };
};

// noinspection JSUnusedGlobalSymbols
export default FeedbackPage;
