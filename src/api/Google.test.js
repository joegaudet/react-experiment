import React from "react";
import { transformCalendar, transformEvent } from "./Google";
import dayjs from "dayjs";
import { RdyCalendar, RdyEvent } from './Api';

const singleDayEvent =
  {
    "kind": "calendar#event",
    "etag": "\"3207363466596000\"",
    "id": "_84s30c1i851k8ba16114ab9k64rj6b9p88sjgb9o6p132h228os42ci664",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Xzg0czMwYzFpODUxazhiYTE2MTE0YWI5azY0cmo2YjlwODhzamdiOW82cDEzMmgyMjhvczQyY2k2NjQgam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:13.000Z",
    "updated": "2020-10-26T03:08:53.298Z",
    "summary": "Single Day Event",
    "creator": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "organizer": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "start": {
      "dateTime": "2020-10-26T15:30:00-07:00"
    },
    "end": {
      "dateTime": "2020-10-26T16:15:00-07:00"
    },
    "iCalUID": "A8002ACD-A0BE-4173-9B98-86B1DBF8A2F1",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  }

const multiDayEvent =
  {
    "kind": "calendar#event",
    "etag": "\"3207356192676000\"",
    "id": "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=XzcwcTMwZ2ExNjBzM2diYTQ2Z3BrY2I5azYwcGo2YmEyNnNwajJiYTQ4bDE0YWhpNDcwc2owYzI1NmMgam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:31.000Z",
    "updated": "2020-10-26T02:08:16.338Z",
    "summary": "Multi Day Event",
    "creator": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "organizer": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "start": {
      "dateTime": "2020-10-28T20:00:00-07:00"
    },
    "end": {
      "dateTime": "2020-10-29T13:30:00-07:00"
    },
    "iCalUID": "840AA088-D43F-4033-B731-DEBEFD8900E3",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  }
const allDayEvent =
  {
    "kind": "calendar#event",
    "etag": "\"3207356192676000\"",
    "id": "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=XzcwcTMwZ2ExNjBzM2diYTQ2Z3BrY2I5azYwcGo2YmEyNnNwajJiYTQ4bDE0YWhpNDcwc2owYzI1NmMgam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:31.000Z",
    "updated": "2020-10-26T02:08:16.338Z",
    "summary": "All day event",
    "creator": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "organizer": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "start": {
      "date": "2020-10-28"
    },
    "end": {
      "date": "2020-10-28"
    },
    "iCalUID": "840AA088-D43F-4033-B731-DEBEFD8900E3",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  }

const multiDayAllDayEvent = {
  "kind": "calendar#event",
  "etag": "\"3207356192676000\"",
  "id": "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=XzcwcTMwZ2ExNjBzM2diYTQ2Z3BrY2I5azYwcGo2YmEyNnNwajJiYTQ4bDE0YWhpNDcwc2owYzI1NmMgam9zZXBoLmdhdWRldEBt",
  "created": "2020-10-26T02:04:31.000Z",
  "updated": "2020-10-26T02:08:16.338Z",
  "summary": "Multi Day All day event",
  "creator": {
    "email": "joseph.gaudet@gmail.com",
    "self": true
  },
  "organizer": {
    "email": "joseph.gaudet@gmail.com",
    "self": true
  },
  "start": {
    "date": "2020-10-28"
  },
  "end": {
    "date": "2020-10-29"
  },
  "iCalUID": "840AA088-D43F-4033-B731-DEBEFD8900E3",
  "sequence": 1,
  "reminders": {
    "useDefault": true
  }
}

const calendarResponse = {
  "kind": "calendar#calendarListEntry",
  "etag": "\"1603678080051000\"",
  "id": "6bmdlvqal8be0elu24v22jjb58@group.calendar.google.com",
  "summary": "Work",
  "location": "busymac.com#uidA2E75029-BDF4-4058-9070-F61C2016269C",
  "timeZone": "America/Edmonton",
  "colorId": "16",
  "backgroundColor": "#0252d4",
  "foregroundColor": "#ffffff",
  "selected": true,
  "accessRole": "owner",
  "defaultReminders": [],
  "conferenceProperties": {
    "allowedConferenceSolutionTypes": [
      "hangoutsMeet"
    ]
  }
};

test("test transformation of calendar", () => {
  expect(transformCalendar(calendarResponse))
    .toEqual(new RdyCalendar(
      "6bmdlvqal8be0elu24v22jjb58@group.calendar.google.com",
      "Work",
      "#0252d4",
      "America/Edmonton"
    ))
});

test("test transformation of single day events", () => {
  expect(transformEvent(singleDayEvent))
    .toEqual([
      new RdyEvent(
        "_84s30c1i851k8ba16114ab9k64rj6b9p88sjgb9o6p132h228os42ci664",
        "Single Day Event",
        dayjs("2020-10-26T15:30:00-07:00"),
        dayjs("2020-10-26T16:15:00-07:00"),
        false
      )
    ]);
});

test("test transformation of multi day events", () => {
  expect(transformEvent(multiDayEvent))
    .toEqual([
        new RdyEvent(
          "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
          "Multi Day Event",
          dayjs("2020-10-28T20:00:00-07:00"),
          dayjs("2020-10-28T20:00:00-07:00").endOf("day"),
          false
        ),
        new RdyEvent(
          "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
          "Multi Day Event",
          dayjs("2020-10-29T13:30:00-07:00").startOf("day"),
          dayjs("2020-10-29T13:30:00-07:00"),
          false
        )
      ]
    )
});

test("test transformation of full day events", () => {
  expect(transformEvent(allDayEvent))
    .toEqual([
        new RdyEvent(
          "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
          "All day event",
          dayjs("2020-10-28").startOf("day"),
          dayjs("2020-10-28").endOf("day"),
          true
        )
      ]
    )
});

test("test transformation of full day multi day events", () => {
  expect(transformEvent(multiDayAllDayEvent))
    .toEqual([
        new RdyEvent(
          "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
          "Multi Day All day event",
          dayjs("2020-10-28").startOf("day"),
          dayjs("2020-10-28").endOf("day"),
          true
        ),
        new RdyEvent(
          "_70q30ga160s3gba46gpkcb9k60pj6ba26spj2ba48l14ahi470sj0c256c",
          "Multi Day All day event",
          dayjs("2020-10-29").startOf("day"),
          dayjs("2020-10-29").endOf("day"),
          true
        )
      ]
    )
});
