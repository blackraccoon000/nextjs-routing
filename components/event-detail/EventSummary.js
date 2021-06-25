import classes from "./EventSummary.module.css";
import PropTypes from "prop-types";

function EventSummary({ title }) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

EventSummary.propTypes = {
  title: PropTypes.string,
};

export default EventSummary;
