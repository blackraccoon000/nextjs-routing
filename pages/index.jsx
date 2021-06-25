import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/EventList";

const Homepage = () => {
  const featureEvents = getFeaturedEvents();
  return (
    <div>
      <EventList events={featureEvents} />
    </div>
  );
};

export default Homepage;
