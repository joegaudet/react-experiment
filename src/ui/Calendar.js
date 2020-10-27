import React, { useState } from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';
import { range } from '../util/array';

const MINUTES_PER_BLOCK = 15;
const BLOCKS_PER_HOUR = 60 / MINUTES_PER_BLOCK;
const HOURS_PER_DAY = 24;
const GRID_OFFSET = 1;

/**
 * Render a single calendar event
 * @param {RdyEvent} event
 * @param {RdyCalendar} calendar
 * @return {JSX.Element}
 * @constructor
 */
export function CalendarEvent({event, calendar}) {
  const day = event.start.day();
  const startMinute = Math.round(event.start.minute() / MINUTES_PER_BLOCK);
  const endMinute = Math.round(event.end.minute() / MINUTES_PER_BLOCK);

  let gridRowStart;
  let gridRowEnd;

  if (event.allDay) {
    gridRowStart = 1;
    gridRowEnd = HOURS_PER_DAY * BLOCKS_PER_HOUR + GRID_OFFSET;
  } else {
    gridRowStart = event.start.hour() * BLOCKS_PER_HOUR + startMinute + GRID_OFFSET;
    gridRowEnd = event.end.hour() * BLOCKS_PER_HOUR + endMinute + GRID_OFFSET;
  }

  return (
    <div
      data-testid={`rdy-calendar-${calendar.id}-event-${event.id}`}
      className="rdy-calendar__events-event"
      style={{
        // css is 0 indexed, computers are 1 indexed
        gridColumnStart: day + GRID_OFFSET,
        gridColumnEnd: day + 1 + GRID_OFFSET,
        backgroundColor: calendar.color,
        // move the event left based on it's local intersection index
        marginLeft: event.localIntersectionIndex * 15,
        borderSize: event.localIntersectionIndex > 0 ? 1 : 0,
        gridRowStart,
        gridRowEnd
      }}
    >
      <h1>
        {event.allDay ? 'All Day -' : ''}
        {event.name}
      </h1>
      {
        !event.allDay
          ? <h2>{event.start.format('h:M A')} - {event.start.format('h:M A')}</h2>
          : null
      }
    </div>
  );
}

/**
 *  Render a single calendar in the grid
 * @param {RdyCalendar} calendar
 * @return {JSX.Element}
 * @constructor
 */
function CalendarEvents({calendar}) {
  return (
    <div className="rdy-calendar__events">
      {(calendar.events ?? []).map(event => <CalendarEvent event={event} calendar={calendar} key={event.key}/>)}
    </div>
  );
}

/**
 * The main calendar body
 *
 * @param {ApiClient[]}clients
 * @return {JSX.Element}
 * @constructor
 */
function Calendar({clients}) {
  const [calendars, setCalendars] = useState([]);

  // TODO use something like immer, or immutable JS, since this selection mechnaism is pretty noisy

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

  // sunday at 00:00
  const startOfWeek = dayjs().startOf('week');

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
          {clients.map((client) => (
              <>
                <li key={`calendar-client-${client.name}`}>
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
                              <li key={`selection-${calendar.id}`}>
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
            // Build the week header out of 7 dates
            range(7, startOfWeek)
              .map((startOfWeek, i) => {
                const day = startOfWeek.add(i, 'day');
                // this isn't exactly the right way to compare dates
                // but since we can assume that the week is only going to have
                // days from his week DOW is fine.
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
                // build the Y axis labels, 24h hours in a day
                range(24, startOfWeek)
                  .map((startOfWeek, i) => {
                    const time = startOfWeek.add(i, 'hour');
                    const shouldRenderLabel = time.hour() === 0 || time.hour() === 24;

                    return (
                      <div
                        key={`day-hour-${i}`}
                        className="rdy-calendar__body-y-axis-cell"
                      >
                        <span> {shouldRenderLabel ? '' : time.format('h A')} </span>
                      </div>
                    )
                  })
              }
            </div>
            <div className="rdy-calendar__body-grid">
              {
                range(7 * 24, startOfWeek)
                  .map((startOfWeek, i) => (
                      <div
                        key={`day-hour-${i}`}
                        className="rdy-calendar__body-grid-cell"
                      >
                      </div>
                    )
                  )
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
