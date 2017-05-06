import { Template } from 'meteor/templating';
import { Adventures } from '/imports/api/adventure/AdventureCollection.js';

Template.Find_Adventure_Page.onCreated(function onCreated() {
  // this.subscribe(Profiles.getPublicationName());
  this.subscribe('Adventures');
});

Template.Find_Adventure_Page.helpers({
  adventure() {
    console.log(Adventures.find({}).fetch());
    return Adventures.find().fetch();
  },
});