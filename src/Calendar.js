import React, { useState } from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';


function Event({event, calendar}) {
  const day = event.start.day();
  const startMinute = Math.round(event.start.minute() / 15);
  const endMinute = Math.round(event.end.minute() / 15);

  let gridRowStart;
  let gridRowEnd;

  if (event.allDay) {
    gridRowStart = 1;
    // 24 hours * 4 15 minute blocks + 1 offet
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
        backgroundColor: calendar.color,
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

function CalendarEvents({calendar}) {
  return (
    <div className="rdy-calendar__events">
      {(calendar.events ?? []).map(event => <Event event={event} calendar={calendar} keu={event.id}/>)}
    </div>
  );
}

function Calendar({clients}) {
  const [calendars, setCalendars] = useState([]);

  function isSelected(calendar) {
    return calendars.includes(calendar);
  }

  function toggleCalendar(calendar) {
    if (isSelected(calendar)) {
      setCalendars(calendars.filter((_) => _.id !== calendar.id));
    } else {
      setCalendars([...calendars, calendar]);
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
          {clients.map(
            (client) => (
              <>
                <li>
                  <h3>{client.name}</h3>
                </li>
                <li>
                  <ul>
                    {
                      client
                        .calendars
                        .map(
                          (calendar) =>
                            (
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
                        )
                    }
                  </ul>
                </li>
              </>
            )
          )
          }
        </ul>
      </div>
      <div className="rdy-calendar__main">
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

            {
              calendars.map((calendar) => <CalendarEvents key={calendar.id} calendar={calendar}/>)
            }
          </div>
        </div>
      </div>
      <div className="rdy-calendar__header">
      </div>
    </div>
  );
}

export default Calendar;
