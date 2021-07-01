import { GetStaticProps } from "next";
import fs from "fs/promises";
import { buildFeedbackPath, Index } from "../api/feedback";
import { MouseEventHandler, useState } from "react";
// import { useRouter } from "next/router";

type Props = {
  feedbackItems: Index[];
};

/**
 * @param feedbackItems
 * api/feedbackから受け取ることのできるfeedbacksを返す。
 * getStaticPropsにより、サーバーサイドからpropsを受け取ることができる。
 *
 * @desc
 * api/feedback から取得する情報をSSGで取得する。
 * 個別情報は/api/${id}から情報を取得する
 *
 * @return
 * JSX.Element
 */
const FeedbackPage = ({
  feedbackItems,
}: {
  feedbackItems: any;
}): JSX.Element => {
  const [feedbackData, setFeedbackData] = useState<Index>();
  // const router = useRouter();
  const loadFeedbackHandler: MouseEventHandler<HTMLButtonElement> | undefined =
    async (id) => {
      const response = await fetch(`/api/feedback/${id}`);
      const data = await response.json();
      const result: Index = data.feedback;
      setFeedbackData(result);
      // await router.push(`/feedback/${id}`);
    };

  return (
    <div>
      {feedbackData && <p>{feedbackData.email}</p>}
      {feedbackItems.map((item: any) => (
        <ul key={item.id}>
          <li>{item.feedback}</li>
          <button onClick={loadFeedbackHandler.bind(null, item.id)}>
            Show Details
          </button>
        </ul>
      ))}
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<Props> = async () => {
  const feedbackPath = buildFeedbackPath();
  const fileData = await fs.readFile(feedbackPath, "utf8");
  const feedbacks: Index[] = JSON.parse(fileData);
  return {
    props: {
      feedbackItems: feedbacks,
    },
    revalidate: false,
  };
};

// noinspection JSUnusedGlobalSymbols
export default FeedbackPage;
