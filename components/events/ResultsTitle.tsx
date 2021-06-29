import Button from "../ui/Button";
import classes from "./ResultsTitle.module.css";
import PropTypes from "prop-types";

const ResultsTitle = ({ date }: { date: Date }) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
};

ResultsTitle.propTypes = {
  date: PropTypes.object,
};

export default ResultsTitle;
