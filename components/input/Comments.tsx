import { useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";
import { Output } from "../../pages/api/comments/[eventId]";

export type CommentData = {
  email: string;
  name: string;
  text: string;
};

const Comments = ({ eventId }: { eventId: string }): JSX.Element => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Output | undefined>();

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
    if (!showComments) {
    }
  };

  /**
   * NewCommentコンポーネントにHandlerを渡す。
   * @param commentData
   */
  const addCommentHandler = async (commentData: CommentData): Promise<void> => {
    // send data to API
    const init: RequestInit = {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/comments/${eventId}`, init);
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
