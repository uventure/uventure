import { Adventures } from '/imports/api/adventure/AdventureCollection.js';
import { Profiles } from '/imports/api/profile/ProfileCollection.js';
import { Interests } from '/imports/api/interest/InterestCollection.js';

// Adventures.publish();
Profiles.publish();
Interests.publish();

Meteor.publish('Adventures', function publishAdventureData(){
  return Adventures.find();
});

