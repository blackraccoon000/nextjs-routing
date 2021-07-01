import { GetStaticPaths, GetStaticProps } from "next";
import { selectedFeedback } from "../api/feedback/[feedbackId]";
import { buildFeedbackPath, extractFeedback, Index } from "../api/feedback";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";

type Props = {
  feedback: Index;
  flag: boolean;
};

type Params = {
  feedbackId: string;
};

const FeedbackIdPage = ({ feedback, flag }: Props) => {
  if (!flag)
    return (
      <div className={"center"}>
        <ErrorAlert>
          <p>No Feedback found</p>
        </ErrorAlert>
        <Button link={"/feedback"}>Show All Feedbacks</Button>
      </div>
    );

  return (
    <div>
      <ul key={feedback.id}>
        <li>{feedback.email}</li>
        <li>{feedback.feedback}</li>
      </ul>
      <Button link={"/feedback"}>Show All Feedbacks</Button>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const feedbackId = params?.feedbackId ? params.feedbackId : "";
  if (typeof feedbackId !== "string") {
    return {
      props: {
        feedback: {
          id: "",
          feedback: "",
          email: "",
        },
        flag: false,
      },
      revalidate: false,
    };
  }

  const result = await selectedFeedback(feedbackId);
  if (result === undefined)
    return {
      props: {
        feedback: {
          id: "",
          feedback: "",
          email: "",
        },
        flag: false,
      },
      revalidate: false,
    };

  return {
    props: {
      feedback: result,
      flag: true,
    },
    revalidate: false,
  };
};

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const feedbackPath = buildFeedbackPath();
  const feedbackAllData = await extractFeedback(feedbackPath);
  const paths: { params: Params }[] = feedbackAllData.map((feedback) => ({
    params: { feedbackId: feedback.id },
  }));
  return {
    paths,
    fallback: true,
  };
};

// noinspection JSUnusedGlobalSymbols
export default FeedbackIdPage;
