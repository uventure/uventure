import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Adventures, AdventureCollection } from '/imports/api/adventure/AdventureCollection.js';

// Used to remove ESLint errors associated with dburles:google-maps and Google Maps API
/*  eslint-disable no-define, no-alert, no-unused-vars, object-shorthand, no-undef, no-console  */

const displayErrorMessages = 'displayErrorMessages';
const displaySuccessMessage = 'displaySuccessMessage';

Template.Edit_Adventure_Page.onCreated(function onCreated() {
  this.subscribe('Adventures');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(displaySuccessMessage, false);
  this.context = AdventureCollection.namedContext('Edit_Adventure_Page');
});

Template.Edit_Adventure_Page.helpers({
  adventureDataField(fieldName) {
    const adventureData = Adventures.findOne(FlowRouter.getParam('_id'));
    return adventureData && adventureData[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
});

Template.Edit_Adventure_Page.events({
  'submit .adventure-data-form'(event, instance) {
    event.preventDefault();
    const adventureName = event.target.Name.value;
    const organizerName = event.target.Organizer.value;
    const type = event.target.Type.value;
    const location = event.target.Location.value;
    const time = event.target.Time.value;
    const contactInfo = event.target.Contact.value;
    const picture = event.target.Picture.value;
    const description = event.target.Description.value;
    const updatedData = { adventureName, organizerName, type, location, time, contactInfo, picture, description };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedData reflects what will be inserted.
    AdventureCollection.clean(updatedData);
    // Determine validity.
    instance.context.validate(updatedData);
    if (instance.context.isValid()) {
      Adventures.update(FlowRouter.getParam('_id'), { $set: updatedData });
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      FlowRouter.go('Find_Adventure_Page');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
    console.log(Adventures.find({}).fetch());
  },

  'click .delete'(event) {
    event.preventDefault();
    if (confirm('Do you really want to delete this adventure?')) {
      Adventures.remove(FlowRouter.getParam('_id'));
      FlowRouter.go('Find_Adventure_Page');
    }
  },
});
