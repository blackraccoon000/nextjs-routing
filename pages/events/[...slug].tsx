import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import { NextRouter, useRouter } from "next/router";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

const FilteredEventPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const data = router.query.slug;
  if (!data) return <p className="center">Loading...</p>;

  const year = parseFloat(data[0]);
  const month = parseFloat(data[1]);
  const check =
    isNaN(year) ||
    isNaN(month) ||
    year < 2021 ||
    2030 < year ||
    month < 1 ||
    12 < month;

  if (check)
    return (
      <div className={"center"}>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );

  const date = new Date(year, month - 1);

  const events = getFilteredEvents({ year, month });
  if (!events || events.length === 0)
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
      <EventList events={events} />;
    </Fragment>
  );
};

export default FilteredEventPage;
