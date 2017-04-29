import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Adventures, AdventureCollection } from '/imports/api/adventure/AdventureCollection';
import { Meteor } from 'meteor/meteor';
import { GoogleMaps } from 'meteor/dburles:google-maps';

// Used to remove ESLint errors associated with dburles:google-maps and Google Maps API syntha
/*  eslint-disable no-define, no-unused-vars, object-shorthand, no-undef, no-console  */

if (Meteor.isClient) {
  Template.map.onCreated(function startingMarker() {
    GoogleMaps.ready('map', function makeMarker(map) {
      const marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance,
        animation: google.maps.Animation.DROP,
        draggable: true,
      });

      google.maps.event.addListener(map.instance, 'rightclick', function addMarker(event) {
        const addedMarker = new google.maps.Marker({
          position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
          map: GoogleMaps.maps.map.instance,
          animation: google.maps.Animation.BOUNCE,
          draggable: true,
        });
      }
      );
    });
  });

  Meteor.startup(function loadMap() {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: function mapProperties() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(21.2969676, -157.821814),
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.HYBRID,
        };
      }
      return false;
    },
  });
}

const displayErrorMessages = 'displayErrorMessages';
const displaySuccessMessage = 'displaySuccessMessage';

Template.Add_Adventure_Page.onCreated(function onCreated() {
  this.subscribe('Adventures');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(displaySuccessMessage, false);
  this.context = AdventureCollection.namedContext('Add_Adventure_Page');
});

Template.Add_Adventure_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  successClass(){
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage(){
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  adventureId(){
    return Adventures.findOne(FlowRouter.getParam('_id'));
  },
});

Template.Add_Adventure_Page.events({
  'submit .adventure-data-form'(event, instance) {
    event.preventDefault();
    const adventureName = event.target.NAME.value;
    const organizerName = event.target.ORGANIZER.value;
    const type = event.target.TYPE.value;
    const location = event.target.LOCATION.value;
    const contactInfo = event.target.CONTACT.value;
    const picture = event.target.PICTURE.value;
    const description = event.target.DESCRIPTION.value;

    const updatedData = { adventureName, organizerName, type, location, contactInfo, picture, description };
    console.log(updatedData);
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedData reflects what will be inserted.
    AdventureCollection.clean(updatedData);
    console.log(AdventureCollection);
    // Determine validity.
    instance.context.validate(updatedData);
    console.log(instance.context.validate(updatedData));
    if (instance.context.isValid()) {
      console.log(FlowRouter.getParam('_id'), { $set: updatedData });
      const id = Adventures.update(FlowRouter.getParam('_id'), { $set: updatedData });
      console.log("Id: " + id);
      console.log(updatedData);
      console.log(Adventures);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      FlowRouter.go('Home_Page');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
