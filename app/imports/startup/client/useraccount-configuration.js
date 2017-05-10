import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profile/ProfileCollection.js';

/**
 * Define a callback to be run when after a user logs in to redirect them to their home page.
 * This is not straightforward because this callback is invoked even on a page refresh, and we don't want to do
 * anything on a page refresh.
 */
Accounts.onLogin(function onLogin() {
  const id = Meteor.userId();
  const onLandingPage = FlowRouter.current().path && (FlowRouter.current().path === '/');
  const initialLogin = (id && onLandingPage);

  if (initialLogin) {
    const username = Meteor.user().profile.name;
    if (!Profiles.isDefined(username)) {
      Profiles.define({ username });
    }
    FlowRouter.go(`/${username}/profile`);
  }
});

Accounts.onLogout(function logout() {
  FlowRouter.go('/');
});
