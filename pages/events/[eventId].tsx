import { NextRouter, useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

const EventDetailPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const eventId = router.query.eventId;
  const event = typeof eventId === "string" ? getEventById(eventId) : undefined;

  if (!event)
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
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
};

export default EventDetailPage;
