import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
<<<<<<< HEAD
// import { AdventureCollection } from '../../api/adventure/AdventureCollection.js';
// import { ReactiveDict } from 'meteor/reactive-dict';
// import { _ } from 'meteor/underscore';
=======
>>>>>>> origin/master

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe('Adventures');
});

/* eslint-disable object-shorthand */

Template.Home_Page.helpers({
  /**
   * @returns {String} Returns the user who's logged in
   */
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
});
