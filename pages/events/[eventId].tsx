import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import {
  getEventById,
  getAllEvents,
  Event,
  getFeaturedEvents,
} from "../../helpers/apiUtile";

type Props = {
  selectedEvent: Event | undefined;
};

type Params = {
  eventId: string;
};

const EventDetailPage = ({ selectedEvent }: Props): JSX.Element => {
  if (!selectedEvent)
    return (
      <div className={"center"}>
        <ErrorAlert>
          <p>No Event found</p>
        </ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );

  return (
    <Fragment>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>{selectedEvent.description}</EventContent>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const eventId = params?.eventId;
  const selectedEvent =
    typeof eventId === "string" ? await getEventById(eventId) : undefined;
  return {
    props: {
      selectedEvent,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const events = await getFeaturedEvents();
  const paths: { params: Params }[] = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
