export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export const getAllEvents = async () => {
  const events: Event[] = [];
  await fetch("https://nextjs-afc54-default-rtdb.firebaseio.com/events.json")
    .then((res) => res.json())
    .then((data) => {
      Object.keys(data).map((key) => {
        events.push({
          id: key,
          ...data[key],
        });
      });
    });
  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents: Event[] = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  const allEvents: Event[] = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}): Promise<Event[]> => {
  const { year, month } = dateFilter;
  const allEvents: Event[] = await getAllEvents();

  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
};
