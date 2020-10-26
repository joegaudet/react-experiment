import React from 'react';
import { render } from '@testing-library/react';

const exampleResponse = [
  {
    "kind": "calendar#event",
    "etag": "\"3207363466596000\"",
    "id": "_84s30c1i851k8ba16114ab9k64rj6b9p88sjgb9o6p132h228os42ci664",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Xzg0czMwYzFpODUxazhiYTE2MTE0YWI5azY0cmo2YjlwODhzamdiOW82cDEzMmgyMjhvczQyY2k2NjQgam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:13.000Z",
    "updated": "2020-10-26T03:08:53.298Z",
    "summary": "3:30 PM",
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
  },
  {
    "kind": "calendar#event",
    "etag": "\"3207355716142000\"",
    "id": "_8ork6ha668s30ba68opjib9k8923cba18osj2b9o6gq46da56csjchi18c",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Xzhvcms2aGE2NjhzMzBiYTY4b3BqaWI5azg5MjNjYmExOG9zajJiOW82Z3E0NmRhNTZjc2pjaGkxOGMgam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:18.000Z",
    "updated": "2020-10-26T02:04:18.071Z",
    "summary": "New Event",
    "creator": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "organizer": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "start": {
      "dateTime": "2020-10-27T13:30:00-07:00"
    },
    "end": {
      "dateTime": "2020-10-27T14:30:00-07:00"
    },
    "iCalUID": "F7CEF280-FF39-4BD6-AF91-844C5E396FAC",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  },
  {
    "kind": "calendar#event",
    "etag": "\"3207355727536000\"",
    "id": "_750jgca260rk8b9h751j4b9k8d0jeba26d336ba56srkcdpj6srk8ghn8c",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Xzc1MGpnY2EyNjByazhiOWg3NTFqNGI5azhkMGplYmEyNmQzMzZiYTU2c3JrY2RwajZzcms4Z2huOGMgam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:23.000Z",
    "updated": "2020-10-26T02:04:23.768Z",
    "summary": "New Event",
    "creator": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "organizer": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "start": {
      "dateTime": "2020-10-28T14:30:00-07:00"
    },
    "end": {
      "dateTime": "2020-10-28T16:00:00-07:00"
    },
    "iCalUID": "9A81B07D-19C2-4CA7-B3F3-E77F7377DB7C",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  },
  {
    "kind": "calendar#event",
    "etag": "\"3207355758882000\"",
    "id": "_88s46chi6p2jeb9o8l1j8b9k8op3eb9p6gr36b9h74pk4c9n6spk2h1i60",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Xzg4czQ2Y2hpNnAyamViOW84bDFqOGI5azhvcDNlYjlwNmdyMzZiOWg3NHBrNGM5bjZzcGsyaDFpNjAgam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:39.000Z",
    "updated": "2020-10-26T02:04:39.441Z",
    "summary": "New Event",
    "creator": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "organizer": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "start": {
      "dateTime": "2020-10-28T15:15:00-07:00"
    },
    "end": {
      "dateTime": "2020-10-28T17:30:00-07:00"
    },
    "iCalUID": "B8C226E7-8EC4-4F27-9463-193B1773AD20",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  },
  {
    "kind": "calendar#event",
    "etag": "\"3207355772486000\"",
    "id": "_84oj0dpp64q42b9p74qjgb9k8d0k8ba2651j8b9h64p4adpo74pjgd248o",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Xzg0b2owZHBwNjRxNDJiOXA3NHFqZ2I5azhkMGs4YmEyNjUxajhiOWg2NHA0YWRwbzc0cGpnZDI0OG8gam9zZXBoLmdhdWRldEBt",
    "created": "2020-10-26T02:04:46.000Z",
    "updated": "2020-10-26T02:04:46.243Z",
    "summary": "New Event",
    "creator": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "organizer": {
      "email": "joseph.gaudet@gmail.com",
      "self": true
    },
    "start": {
      "dateTime": "2020-10-28T16:45:00-07:00"
    },
    "end": {
      "dateTime": "2020-10-28T18:30:00-07:00"
    },
    "iCalUID": "A107914A-9958-4CAD-B1C4-112E789384DF",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  },
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
]

test('test transformation of single day events', () => {
});

test('test transformation of multi day events', () => {
});

test('test transformation of full day events', () => {
});

test('test transformation of full day multi day events', () => {
});
