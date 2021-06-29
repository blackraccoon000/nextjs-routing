import { getFilteredEvents, Event } from "../../helpers/apiUtile";
import EventList from "../../components/events/EventList";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { GetServerSideProps } from "next";
// import { NextRouter, useRouter } from "next/router";
// import useSWR from "swr";
import { ParsedUrlQuery } from "querystring";

type Props = {
  hasError: boolean;
  events?: Event[];
  dateObj?: {
    year: number;
    month: number;
  };
};

type Params = {
  params: {
    slug: string[];
  };
} & ParsedUrlQuery;

const FilteredEventPage = ({
  hasError,
  events,
  dateObj,
}: Props): JSX.Element => {
  // const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);
  // const router: NextRouter = useRouter();
  // const filterData = router.query.slug ? router.query.slug : "";
  // const year = parseFloat(filterData[0]);
  // const month = parseFloat(filterData[1]);
  //
  // const { data, error } = useSWR(
  //   "https://nextjs-afc54-default-rtdb.firebaseio.com/events.json"
  // );
  //
  // useEffect(() => {
  //   if (data) {
  //     const orEvents: Event[] = [];
  //     Object.keys(data).map((key) => {
  //       orEvents.push({
  //         id: key,
  //         ...data[key],
  //       });
  //     });
  //     setLoadedEvents(orEvents);
  //   }
  // }, [data]);
  //
  // if (!loadedEvents) return <p className="center">Loading...</p>;
  //
  // const filteredEvents = loadedEvents.filter((event) => {
  //   const eventDate = new Date(event.date);
  //   return (
  //     eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
  //   );
  // });

  // Server Side Rendering
  if (hasError || !dateObj)
    return (
      <div className={"center"}>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );

  const date = new Date(dateObj.year, dateObj.month - 1);

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

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const filterData = params?.slug ? params.slug : "";
  const year = parseFloat(filterData[0]);
  const month = parseFloat(filterData[1]);
  const check =
    isNaN(year) ||
    isNaN(month) ||
    year < 2021 ||
    2030 < year ||
    month < 1 ||
    12 < month;

  if (check)
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };

  const events = await getFilteredEvents({ year, month });

  return {
    props: {
      hasError: false,
      events,
      dateObj: {
        year,
        month,
      },
    },
  };
};

// noinspection JSUnusedGlobalSymbols
export default FilteredEventPage;
