import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/find', {
  name: 'Find_Stuff_Page',
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

FlowRouter.route('/profile', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
