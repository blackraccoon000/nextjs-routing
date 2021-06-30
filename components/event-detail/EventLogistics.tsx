import Image from "next/image";
import LogisticsItem from "./LogisticsItem";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import classes from "./EventLogistics.module.css";
import PropTypes from "prop-types";

type Props = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

function EventLogistics({
  date,
  address,
  image,
  imageAlt,
}: Props): JSX.Element {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={300} height={300} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

EventLogistics.propTypes = {
  date: PropTypes.string,
  address: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default EventLogistics;
