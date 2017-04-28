import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Template } from 'meteor/templating';

/* eslint-disable object-shorthand, no-unused-vars */

AutoForm.hooks({
  EditStuffForm: {
    /**
     * After successful form submission, go to List_Stuff_Page.
     * @param formType The form.
     * @param result The result of form submission.
     */
    onSuccess: function onSuccess(formType, result) {
      FlowRouter.go('Home_Page');
    },
  },
});
