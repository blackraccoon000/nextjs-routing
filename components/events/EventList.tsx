import EventItem from "./EventItem";
import classes from "./EventList.module.css";
import { DummyEvent } from "../../dummy-data";

type Props = { events: DummyEvent[] };

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
