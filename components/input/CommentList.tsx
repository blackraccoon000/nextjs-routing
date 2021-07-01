import classes from "./CommentList.module.css";
import { Output } from "../../pages/api/comments/[eventId]";

const CommentList = ({ comments }: { comments: Output }): JSX.Element => (
  <ul className={classes.comments}>
    {/* Render list of comments - fetched from API */}
    {comments &&
      comments.map((comment) => {
        return (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
  </ul>
);

export default CommentList;
