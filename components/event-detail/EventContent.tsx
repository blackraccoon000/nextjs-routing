import classes from "./EventContent.module.css";
import PropTypes from "prop-types";
import React from "react";

function EventContent({ children }: { children: React.ReactNode }) {
  return <section className={classes.content}>{children}</section>;
}

EventContent.propTypes = {
  children: PropTypes.node,
};

export default EventContent;
