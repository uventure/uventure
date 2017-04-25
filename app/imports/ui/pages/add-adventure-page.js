import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Adventures, AdventureCollection } from '/imports/api/adventure/AdventureCollection';

if (Meteor.isClient) {
  Template.map.onCreated(function () {
        GoogleMaps.ready('map', function (map) {
          var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            animation: google.maps.Animation.DROP,
            draggable: true,
          });

          google.maps.event.addListener(map.instance, 'rightclick', function (event) {
                var addedMarker = new google.maps.Marker({
                  position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
                  map: GoogleMaps.maps.map.instance,
                  animation: google.maps.Animation.BOUNCE,
                  draggable: true,
                })
              }
          );
        });
      }
  );

  Meteor.startup(function () {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: function () {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(21.2969676, -157.821814),
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.HYBRID,
        };
      }
    }
  });
}

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Add_Adventure_Page.onCreated(function onCreated() {

  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  // this.context = ContactsSchema.namedContext('Add_Contact_Page');

  // this.subscribe(Adventures.getPublicationName());
  // this.messageFlags = new ReactiveDict();
  // this.messageFlags.set(displaySuccessMessage, false);
  // this.messageFlags.set(displayErrorMessages, false);
  console.log(Adventures);
  this.context = Adventures.getSchema().namedContext('Add_Adventure_Page');
});

Template.Add_Adventure_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
})
;

Template.Add_Adventure_Page.events({
  'submit .adventure-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.NAME.value;
    const lastName = event.target.ORGANIZER.value;
    const title = event.target.TYPE.value;
    const picture = event.target.LOCATION.value;
    const github = event.target.CONTACT.value;
    const facebook = event.target.PICTURE.value;
    const instagram = event.target.DESCRIPTION.value;

    const updatedProfileData = { firstName, lastName, title, picture, github, facebook, instagram };
    console.log(updatedProfileData);

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Adventures.getSchema().clean(updatedProfileData);
    console.log(Adventures.getSchema());
    // Determine validity.
    instance.context.validate(updatedProfileData);
    console.log(instance.context.validate(updatedProfileData));

    // SORTA VALID NOT REALLY It's failing the validate check
    //if (instance.context.isValid()) {

    //ADVENTURES . INSERT IS NOT A FUNCTION
    Adventures.insert(updatedProfileData);
    console.log("Profile Data: " + updatedProfileData);
    console.log(Adventures);
    instance.messageFlags.set(displayErrorMessages, false);
    instance.find('form').reset();
    FlowRouter.go('Home_Page');
  },
   // } else {
   //   instance.messageFlags.set(displayErrorMessages, true);
  //  }
 // },

  //   const docID = Adventures.findDoc(FlowRouter.getParam('adventureName'))._id;
  //  const id = Adventures.insert(updatedProfileData);

  //  Adventures.insert(updatedProfileData);
//      FlowRouter.go('Home_Page');
//
  //    instance.messageFlags.set(displaySuccessMessage, id);
  //  instance.messageFlags.set(displayErrorMessages, false);
  // } else {
  //  instance.messageFlags.set(displaySuccessMessage, false);
  // instance.messageFlags.set(displayErrorMessages, true);
  //}
  //},
});