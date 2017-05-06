import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/find', {
  name: 'Find_Adventure_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Find_Adventure_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Adventure_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Adventure_Page' });
  },
});

FlowRouter.route('/edit', {
  name: 'Edit_Adventure_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Adventure_Page' });
  },
});

/* user routes */
function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('App_Body', { main: profilePageRouteName });
  },
});

FlowRouter.route('/suggestion', {
  name: 'Suggestion_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Suggestion_Page' });
  },
});

FlowRouter.route('/faq', {
  name: 'faq_page',
  action() {
    BlazeLayout.render('App_Body', { main: 'faq_page' });
  },
});

FlowRouter.route('/calendar', {
  name: 'Calendar_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Calendar_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
