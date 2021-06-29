import EventItem from "./EventItem";
import classes from "./EventList.module.css";
import { Event } from "../../helpers/apiUtile";

type Props = { events: Event[] };

const EventList = ({ events }: Props) => {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
};

export default EventList;
