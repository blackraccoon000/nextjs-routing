import classes from "./EventContent.module.css";
import PropTypes from "prop-types";

function EventContent({ children }) {
  return <section className={classes.content}>{children}</section>;
}

EventContent.propTypes = {
  children: PropTypes.node,
};

export default EventContent;
