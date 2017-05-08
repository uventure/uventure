import { EventData } from '../../api/eventdata/eventdata.js';
import { Meteor } from 'meteor/meteor';
import { Adventures } from '/imports/api/adventure/AdventureCollection.js';
// import { Profile } from '/imports/api/profile/ProfileCollection';
// Adventures.publish();
// Profile.publish();
Meteor.publish('Adventures', function publishAdventureData() {
  return Adventures.find();
});

Meteor.publish('EventData', function publishStudentData() {
  return EventData.find();
});

