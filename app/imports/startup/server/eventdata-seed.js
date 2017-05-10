import { EventData } from '../../api/eventdata/eventdata.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Events to pre-fill the Collection.
 * @type {*[]}
 */
const eventDataSeed = [
  {
    title: 'UHM Finals Week',
    start: '2017-05-08T09:00-10:00',
    end: '2017-05-12T23:00-10:00',
    startValue: '9',
    endValue: '23',
    startString: '9:00AM',
    endString: '11:00PM',
  },
  {
    title: 'Grades Released',
    start: '2017-05-17T09:00-10:00',
    end: '2017-05-17T23:00-10:00',
    startValue: '9',
    endValue: '23',
    startString: '9:00AM',
    endString: '11:00PM',
  },
  {
    title: 'Commencement 1',
    start: '2017-05-13T10:00-10:00',
    end: '2017-05-14T23:00-10:00',
    startValue: '10',
    endValue: '23',
    startString: '10:00AM',
    endString: '11:00PM',
  },
  {
    title: 'Study Days',
    start: '2017-05-04T10:00-10:00',
    end: '2017-05-05T23:00-10:00',
    startValue: '10',
    endValue: '23',
    startString: '10:00AM',
    endString: '11:00PM',
  },
  {
    title: 'Commencement 2',
    start: '2017-05-13T03:00-10:00',
    end: '2017-05-14T23:00-10:00',
    startValue: '3',
    endValue: '23',
    startString: '10:00AM',
    endString: '11:00PM',
  },
  {
    title: 'Spring Break',
    start: '2017-03-27T10:00-10:00',
    end: '2017-03-31T23:00-10:00',
    startValue: '10',
    endValue: '23',
    startString: '10:00AM',
    endString: '11:00PM',
  },
  {
    title: 'Presidents Day',
    start: '2017-02-20T10:00-10:00',
    end: '2017-02-20T23:00-10:00',
    startValue: '10',
    endValue: '23',
    startString: '10:00AM',
    endString: '11:00PM',
  },
  {
    title: 'Good Friday',
    start: '2017-04-14T10:00-10:00',
    end: '2017-04-14T23:00-10:00',
    startValue: '10',
    endValue: '23',
    startString: '10:00AM',
    endString: '11:00PM',
  },
  {
    title: 'MLK Day',
    start: '2017-01-17T10:00-10:00',
    end: '2017-01-17T23:00-10:00',
    startValue: '10',
    endValue: '23',
    startString: '10:00AM',
    endString: '11:00PM',
  },
];

/**
 * Initialize the collection if empty with seed data.
 */
if (EventData.find().count() === 0) {
  _.each(eventDataSeed, function seedIt(event) {
    EventData.insert(event);
  });
}
