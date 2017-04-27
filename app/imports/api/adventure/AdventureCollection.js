import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Adventures = new Mongo.Collection('Adventures');

export const AdventureCollection = new SimpleSchema({
  adventureName: { type: String, optional: false },
  organizerName: { type: String, optional: false },
  type: { type: String, optional: false },
  location: { type: String, optional: false },
  contactInfo: { type: String, optional: false },
  picture: { type: SimpleSchema.RegEx.Url, optional: false },
  description: { type: String, optional: false },
});

Adventures.attachSchema(AdventureCollection);
