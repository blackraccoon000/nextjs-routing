import { useContext, useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";
import { Output } from "../../pages/api/comments/[eventId]";
import {
  ntfCtxShowError,
  ntfCtxShowPending,
  ntfCtxShowSuccess,
} from "../../helpers/ctxUtilites";
import NotificationContext from "../../store/NotificationContext";

export type CommentData = {
  email: string;
  name: string;
  text: string;
};

const Comments = ({ eventId }: { eventId: string }): JSX.Element => {
  const [showComments, setShowComments] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [comments, setComments] = useState<Output | undefined>();
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments]);

  useEffect(() => {
    if (reloadComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => setComments(data.comments));
    }
    return () => {
      setReloadComments(false);
    };
  }, [reloadComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
    if (!showComments) {
      /**
       * ここってやりかけ？
       */
    }
  };

  /**
   * NewCommentコンポーネントにHandlerを渡す。
   * @param commentData
   */
  const addCommentHandler = async (commentData: CommentData): Promise<void> => {
    ntfCtxShowPending(notificationCtx);
    console.log(commentData);
    // send data to API
    const init: RequestInit = {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    /**
     * エラーメッセージなどは後で修正
     */
    try {
      const response = await fetch(`/api/comments/${eventId}`, init);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      } else {
        setReloadComments(true);
        ntfCtxShowSuccess(notificationCtx);
      }
    } catch (e) {
      console.error(e);
      ntfCtxShowError(notificationCtx, e);
    }
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
