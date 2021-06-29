import classes from "./EventSummary.module.css";
import PropTypes from "prop-types";

type Props = {
  title: string;
};

function EventSummary({ title }: Props): JSX.Element {
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
