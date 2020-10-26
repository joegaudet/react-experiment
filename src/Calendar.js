import React, { useState } from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';
import { API } from './api/Api';

function Day(events) {
  return <div></div>;
}

function Event({event}) {
  // TODO test this bizzo
  const day = event.start.day();
  const startMinute = Math.round(event.start.minute() / 15);
  const endMinute = Math.round(event.end.minute() / 15);

  let gridRowStart = dayjs(event.start).hour() * 4 + startMinute + 1;
  let gridRowEnd = dayjs(event.end).hour() * 4 + endMinute + 1;
  if (event.allDay) {
    gridRowStart = 1;
    gridRowEnd = 24 * 4 + 1;
  } else {
    gridRowStart = event.start.hour() * 4 + startMinute + 1;
    gridRowEnd = event.end.hour() * 4 + endMinute + 1;
  }

  return (
    <div
      className="rdy-calendar__events-event"
      style={{
        gridColumnStart: day + 1,
        gridColumnEnd: day + 2,
        gridRowStart, gridRowEnd
      }}
    >
      <h1>
        {event.allDay ? 'All Day -' : ''}
        {event.name}
      </h1>
      {
        !event.allDay
          ? <h2>{event.start.format('H:M A')} - {event.start.format('H:M A')}</h2>
          : null
      }
    </div>
  );
}

function Events({events}) {
  return (
    <div className="rdy-calendar__events">
      {events.map(event => <Event event={event} keu={event.id}/>)}
    </div>
  );
}

function Calendar() {
  const [events, setEvents] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);


  // Generify this
  async function load() {
    setCalendars(await API.registry['Google'].calendars())
    setEvents(await API.registry['Google'].events());
  }

  load();

  function isSelected(calendar) {
    return selectedCalendars.includes(calendar);
  }

  function toggleCalendar(calendar) {
    console.log('Toggle? ' + calendar.name);
    console.log('Toggle? ' + isSelected(calendar));

    if (isSelected(calendar)) {
      setSelectedCalendars(selectedCalendars.filter(_ => _ !== calendar));
    } else {
      setSelectedCalendars([...selectedCalendars, calendar]);
    }
  }

  return (
    <div className="rdy-calendar">
      <div className="rdy-calendar__header">
        <h1>
          {dayjs().format('MMM, YYYY')}
        </h1>
      </div>
      <div className="rdy-calendar__selector">
        <h2>
          Calendars
        </h2>
        <ul>
          {
            calendars.map((calendar) => {
              console.log(`${calendar.name} Is Selected: ${isSelected(calendar)}`)
              return (
                <li key={calendar.id}>
                  <button
                    className={isSelected(calendar) ? 'active' : 'inactive'}
                    onClick={() => toggleCalendar(calendar)}
                  >
                    <span style={{backgroundColor: calendar.color}}></span>
                    {calendar.name}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="rdy-calendar__main">
        <div>

        </div>
        <div className="rdy-calendar__main-header">
          <div className="rdy-calendar__main-header-y-axis-spacer"></div>
          {
            new Array(7)
              .fill(dayjs().startOf('week'))
              .map((startOfWeek, i) => {
                const day = startOfWeek.add(i, 'day');
                const isToday = day.day() === dayjs().day();

                return (
                  <div
                    key={`week-day-${i}`}
                    className={`rdy-calendar__main-header-day ${isToday ? 'rdy-calendar__main-header-day--today' : ''}`}
                  >
                    <span className="day-of-month">{day.format('D')}</span>
                    <span className="day-of-week">{day.format('dddd')}</span>
                  </div>
                )
              })
          }
          <div className="rdy-calendar__main-header-scroll-spacer"></div>
        </div>
        <div className="rdy-calendar__body">
          <div className="rdy-calendar__body-container">
            <div className="rdy-calendar__body-y-axis">
              {
                new Array(24)
                  .fill(dayjs().startOf('week'))
                  .map((startOfWeek, i) => {
                    // not sure if we need this
                    const time = startOfWeek.add(i, 'hour');

                    return (
                      <div
                        key={`day-hour-${i}`}
                        className="rdy-calendar__body-y-axis-cell"
                      >
                        <span> {time.hour() === 0 || time.hour() === 24 ? '' : time.format('h A')} </span>
                      </div>
                    )
                  })
              }
            </div>
            <div className="rdy-calendar__body-grid">
              {
                new Array(7 * 24)
                  .fill(dayjs().startOf('week'))
                  .map((startOfWeek, i) => {
                    // not sure if we need this
                    const time = startOfWeek.add(i, 'hour');

                    return (
                      <div
                        key={`day-hour-${i}`}
                        className="rdy-calendar__body-grid-cell"
                      >
                      </div>
                    )
                  })
              }
            </div>
            <Events events={events}/>
          </div>
        </div>
      </div>
      <div className="rdy-calendar__header">
      </div>
    </div>
  );
}

export default Calendar;
