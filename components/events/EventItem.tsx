import classes from "./EventItem.module.css";
import PropTypes from "prop-types";
import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

type Props = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
};

const EventItem = ({
  id,
  title,
  location,
  date,
  image,
}: Props): JSX.Element => {
  const humanReadableDate = new Date(date).toLocaleDateString("ja-JP", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

EventItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
};

export default EventItem;
