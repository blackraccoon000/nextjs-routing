import Head from "next/head";
import Link from "next/link";
import { getFeaturedEvents } from "../helpers/apiUtile";
import EventList from "../components/events/EventList";
import { Event } from "../helpers/apiUtile";
import { GetStaticProps } from "next";
import NewsletterRegistration from "../components/input/NewsLetterRegistration";

type Props = {
  featureEvents: Event[];
};

const Homepage = ({ featureEvents }: { featureEvents: Event[] }) => {
  return (
    <div>
      <Head>
        <title>Next JS Generate</title>
        <meta
          name={"description"}
          content={"Find a lot of great events that allow you to evolve..."}
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={featureEvents} />
      <ul>
        <li>
          <Link href="/portfolio">
            <a>Portfolio</a>
          </Link>
        </li>
        <li>
          <Link href="/clients">
            <a>Clients</a>
          </Link>
        </li>
        <li>
          <Link href="/api/feedback">
            <a>API/Feedback</a>
          </Link>
        </li>
        <li>
          <Link href="/feedback">
            <a>Feedback</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<Props> = async () => {
  const featureEvents = await getFeaturedEvents();
  return {
    props: {
      featureEvents,
    },
    revalidate: 1800,
  };
};

// noinspection JSUnusedGlobalSymbols
export default Homepage;
