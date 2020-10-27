import { render, screen } from '@testing-library/react'
import React from 'react';
import { RdyCalendar, RdyEvent } from './api/Api';
import dayjs from 'dayjs';
import { CalendarEvent } from './Calendar';

describe("CalendarEvent", function () {

  it("renders the passed in event and computes the grid offsets by 15min increments", function () {
    const start = dayjs().startOf('week').add(4, 'hour');
    const end = dayjs().startOf('week').add(5, 'hour');
    const calendar = new RdyCalendar("1", "test", "red");
    const event = new RdyEvent("1", "test", start, end)

    render(<CalendarEvent calendar={calendar} event={event}/>);

    const node = screen.getByTestId(`rdy-calendar-${calendar.id}-event-${event.id}`);
    expect(node).toBeVisible();

    // recall that css grids start at 1

    // Render on the right day
    expect(node.style.gridColumnStart).toEqual("1")
    expect(node.style.gridColumnEnd).toEqual("2")

  // Render on the hour grid
    expect(node.style.gridRowStart).toEqual("17")
    expect(node.style.gridRowEnd).toEqual("21")
  });

  it("renders all day events", function () {
    const start = dayjs().startOf('week');
    const end = dayjs().startOf('week').endOf('day');
    const calendar = new RdyCalendar("1", "test", "red", true);
    const event = new RdyEvent("1", "test", start, end)

    render(<CalendarEvent calendar={calendar} event={event}/>);

    const node = screen.getByTestId(`rdy-calendar-${calendar.id}-event-${event.id}`);
    expect(node).toBeVisible();

    // recall that css start grids at 1

    // Render on the right day
    expect(node.style.gridColumnStart).toEqual("1")
    expect(node.style.gridColumnEnd).toEqual("2")

    // Render the entire day
    expect(node.style.gridRowStart).toEqual("1")
    expect(node.style.gridRowEnd).toEqual("97")
  })


});
