import { Event } from "../../helpers/apiUtile";
import EventList from "../../components/events/EventList";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";

const FilteredEventPage = (): JSX.Element => {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>();
  const router: NextRouter = useRouter();
  const filterData = router.query.slug ? router.query.slug : "";
  const year = parseFloat(filterData[0]);
  const month = parseFloat(filterData[1]);

  const date = new Date(year, month - 1);

  const { data, error } = useSWR(
    "https://nextjs-afc54-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    if (data) {
      const orEvents: Event[] = [];
      Object.keys(data).map((key) => {
        orEvents.push({
          id: key,
          ...data[key],
        });
      });
      setLoadedEvents(orEvents);
    }
  }, [data]);

  const filteredEvents = loadedEvents?.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  const check =
    isNaN(year) ||
    isNaN(month) ||
    year < 2021 ||
    2030 < year ||
    month < 1 ||
    12 < month ||
    error;

  if (check)
    return (
      <div className={"center"}>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );

  if (!loadedEvents) return <p className="center">Loading...</p>;

  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <div className={"center"}>
        <ErrorAlert>
          <p>No Result Events</p>
        </ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />;
    </Fragment>
  );
};

// noinspection JSUnusedGlobalSymbols
export default FilteredEventPage;
