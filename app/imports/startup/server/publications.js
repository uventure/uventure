import { Adventures } from '/imports/api/adventure/AdventureCollection.js';
// import { Profile } from '/imports/api/profile/ProfileCollection';
// Adventures.publish();
// Profile.publish();
Meteor.publish('Adventures', function publishAdventureData(){
  return Adventures.find();
});
