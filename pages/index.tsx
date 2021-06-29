import { getFeaturedEvents } from "../helpers/apiUtile";
import EventList from "../components/events/EventList";
import { Event } from "../helpers/apiUtile";
import { GetStaticProps } from "next";

type Props = {
  featureEvents: Event[];
};

const Homepage = ({ featureEvents }: { featureEvents: Event[] }) => {
  return (
    <div>
      <EventList events={featureEvents} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const featureEvents = await getFeaturedEvents();
  return {
    props: {
      featureEvents,
    },
    revalidate: 1800,
  };
};

export default Homepage;
