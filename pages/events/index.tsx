import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

import EventList from "../../components/events/EventList";
import { Fragment } from "react";
import EventsSearch from "../../components/events/EventsSearch";

const AllEventPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = async (
    year: string,
    month: string
  ): Promise<void> => {
    const fullPath = `/events/${year}/${month}`;
    await router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
};

export default AllEventPage;
