import { Adventures } from '/imports/api/adventure/AdventureCollection.js';
import { Profiles } from '/imports/api/profile/ProfileCollection.js';
import { Interests } from '/imports/api/interest/InterestCollection.js';
import { EventData } from '/imports/api/eventdata/eventdata.js';
import { Meteor } from 'meteor/meteor';

Profiles.publish();
Interests.publish();

Meteor.publish('Adventures', function publishAdventureData() {
  return Adventures.find();
});

Meteor.publish('EventData', function publishEventData() {
  return EventData.find();
});
