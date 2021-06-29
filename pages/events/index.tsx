import { Fragment } from "react";
import { NextRouter, useRouter } from "next/router";

import { getAllEvents, Event } from "../../helpers/apiUtile";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { GetStaticProps } from "next";

type Props = {
  events: Event[];
};

const AllEventPage = ({ events }: { events: Event[] }) => {
  const router: NextRouter = useRouter();

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = await getAllEvents();
  return { props: { events }, revalidate: 60 };
};

export default AllEventPage;
