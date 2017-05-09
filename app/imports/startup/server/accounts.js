import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '/imports/api/profile/ProfileCollection.js';

/* eslint-disable no-console */

/* Create a profile document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    const username = user.services.cas.id;
    if (!Profiles.isDefined(username)) {
      console.log("Defined a profile");
      Profiles.define({ username });
    }
  }
  console.log("user not defined");
  // All UH users are valid for uVenture
  return true;
});
