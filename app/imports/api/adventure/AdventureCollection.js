import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

/*  eslint-disable no-unused-vars */
export const Adventures = new Mongo.Collection('Adventures');

const adventures = Adventures;

export const AdventureCollection = new SimpleSchema({
  adventureName: { label: 'Name', type: String, optional: false },
  organizerName: { label: 'Organizer', type: String, optional: false },
  type: { label: 'Type', type: String, optional: false },
  location: { label: 'Location', type: String, optional: false },
  contactInfo: { label: 'Contact', type: String, optional: false },
  picture: { label: 'Picture', type: SimpleSchema.RegEx.Url, optional: false },
  description: { label: 'Description', type: String, optional: false },
});


Adventures.attachSchema(AdventureCollection);
