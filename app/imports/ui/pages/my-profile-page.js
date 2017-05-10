import { Template } from 'meteor/templating';
import { Profiles } from '/imports/api/profile/ProfileCollection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.My_Profile_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
 // this.context = Profiles.getSchema().namedContext('My_Profile_Page');
});

Template.My_Profile_Page.helpers({
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
});
