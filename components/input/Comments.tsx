import { useContext, useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";
import { Output } from "../../pages/api/comments/[eventId]";
import {
  errorCommentData,
  ntfCtxShowError,
  ntfCtxShowPending,
  ntfCtxShowSuccess,
  pendingCommentData,
  successCommentData,
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
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [comments, setComments] = useState<Output | undefined>();
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
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
  };

  /**
   * NewCommentコンポーネントにHandlerを渡す。
   * @param commentData
   */
  const addCommentHandler = async (commentData: CommentData): Promise<void> => {
    ntfCtxShowPending(notificationCtx, pendingCommentData);
    console.log(commentData);
    // send data to API
    const init: RequestInit = {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api/comments/${eventId}`, init);
    await response.json().catch(() => {
      ntfCtxShowError(
        notificationCtx,
        errorCommentData({ message: "server side error" })
      );
    });
    if (response.ok) {
      setReloadComments(true);
      ntfCtxShowSuccess(notificationCtx, successCommentData);
    } else {
      ntfCtxShowError(notificationCtx, errorCommentData());
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
