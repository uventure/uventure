import { Tracker } from 'meteor/tracker';
import { EventData } from '../../api/eventdata/eventdata';

/*  eslint-disable no-define, no-unused-vars, object-shorthand, no-undef, no-param-reassign  */

// Define a function that checks whether a moment has already passed.
const isPast = (date) => {
  const today = moment().format();
  return moment(today).isAfter(date);
};

Template.Calendar_Page.onCreated(() => {
  Template.instance().subscribe('EventData');
});

Template.Calendar_Page.onRendered(() => {
  // Initialize the calendar.
  $('#event-calendar').fullCalendar({
    // Define the navigation buttons.
    header: {
      left: 'title',
      center: '',
      right: 'today prev,next',
    },
    // Add events to the calendar.
    events(start, end, timezone, callback) {
      const data = EventData.find().fetch().map((session) => {
        // Don't allow already past study events to be editable.
        session.editable = !isPast(session.start);
        return session;
      });

      if (data) {
        callback(data);
      }
    },

    // Configure the information displayed for an "event."
    eventRender(session, element) {
      element.find('.fc-content').html(
          `<h4 class="title">${session.title}</h4>
          <p class="time">${session.startString}</p>
          `
      );
    },

    // Allow events to be dragged and dropped.
    eventDrop(session, delta, revert) {
      const date = session.start.format();

      if (!isPast(date)) {
        const update = {
          _id: session._id,
          start: date,
          end: date,
        };

        // Update the date of the event.
        Meteor.call('editEvent', update);
      } else {
        revert();
      }
    },
  });

  // Updates the calendar if there are changes.
  Tracker.autorun(() => {
    EventData.find().fetch();
    $('#event-calendar').fullCalendar('refetchEvents');
  });
});
