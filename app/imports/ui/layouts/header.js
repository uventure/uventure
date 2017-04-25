import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
});

Template.Header.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});
