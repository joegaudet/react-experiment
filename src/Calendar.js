import React, { useState, useEffect } from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';

function Day() {
  return <div></div>;
}

function Calendar() {
  return (
    <div className="rdy-calendar">
      <div className="rdy-calendar__selector">
        <h2>
          Calendars
        </h2>
        <ul>
          <li className="active">
            Cal 1
          </li>
          <li>
            Cal 2
          </li>
          <li>
            Cal 3
          </li>
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
                      <span> {time.hour() === 0 || time.hour() === 24 ? '' : time.format('H A')} </span>
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
        </div>
      </div>
    </div>
  );
}

export default Calendar;
