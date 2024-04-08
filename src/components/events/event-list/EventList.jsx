import { useState } from 'react';
import eventsData from '../../../data/events.json';
import EventItem from '../event-item/EventItem';
import EventForm from '../event-form/EventForm';

function EventList() {
  const [events, setEvents] = useState(eventsData);

  const handleDeleteEvent = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
  }

  const handleToggleFav = (event) => {
    setEvents(events.map((e) => {
      if (e.id === event.id) {
        return {
          ...e,
          fav: !e.fav
        };
      } else {
        return e;
      }
    }));
  }

  const handleCreateEvent = (event) => {
    setEvents([...events, {...event, id: self.crypto.randomUUID()}]);
  }

  return (
    <>
      <EventForm className="mb-2" onCreate={handleCreateEvent}/>
      <div className="row row-cols-4 g-2">
        {events.map((event) => (
          <div key={event.id} className="col">
            <EventItem 
              event={event} 
              onDelete={handleDeleteEvent}
              onToggleFav={handleToggleFav}
              />
          </div>
        ))}
      </div>
    </>
  )
}

export default EventList;
