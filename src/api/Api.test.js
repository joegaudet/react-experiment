import React from "react";
import dayjs from "dayjs";
import { AbstractClient, API, RdyCalendar, RdyEvent } from './Api';

test("intersection of n events", () => {

  const sut = new RdyCalendar("id", "name", "white", "America/Vancouver", [
    new RdyEvent(
      "id1",
      "name",
      dayjs().startOf('day'),
      dayjs().endOf('day'),
      true
    ),
    new RdyEvent(
      "id2",
      "name",
      dayjs().startOf('day').add(1, 'hour'),
      dayjs().startOf('day').add(4, 'hour'),
      false
    ),
    new RdyEvent(
      "id3",
      "name",
      dayjs().startOf('day').add(2, 'hour'),
      dayjs().startOf('day').add(6, 'hour'),
      false
    ),
    new RdyEvent(
      "id3",
      "name",
      dayjs().startOf('day').add(5, 'hour'),
      dayjs().startOf('day').add(6, 'hour'),
      false
    ),
    new RdyEvent(
      "id4",
      "name",
      dayjs().startOf('day').add(6, 'hour'),
      dayjs().startOf('day').add(8, 'hour'),
      false
    ),
  ])

  expect(sut.events[0].localIntersectionIndex).toEqual(0);
  expect(sut.events[1].localIntersectionIndex).toEqual(1);
  expect(sut.events[2].localIntersectionIndex).toEqual(2);
  expect(sut.events[3].localIntersectionIndex).toEqual(3);
  expect(sut.events[4].localIntersectionIndex).toEqual(1);
});

test("Registry", function () {

  class MockClient extends AbstractClient {
    name = 'mock-client';
  }

  API.registerClient(MockClient)

  // apparently you can't have custom messages inside of JEST expects. Normally I would use BDD style for this.
  expect(API.clientFor('mock-client') instanceof MockClient).toBeTruthy();
})
