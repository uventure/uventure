import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

/** @module Interest */

/**
 * Represents a specific interest, such as "Software Engineering".
 * @extends module:Base~BaseCollection
 */
class AdventureCollection extends BaseCollection {

  /**
   * Creates the Interest collection.
   */
  constructor() {
    super('Adventure', new SimpleSchema({
      adventureName: { type: String },
      organizerName: { type: String },
      type: { type: [String], optional: true },
      contact: { type: String, optional: true },
      location: { type: String, optional: true },
      description: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
    }));
  }

  /**
   * Defines a new Interest.
   * @example
   * Interests.define({ name: 'Software Engineering',
   *                    description: 'Methods for group development of large, high quality software systems' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the interest definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ adventureName, organizerName, type, contact, location, description, picture }) {
    check(adventureName, String);
    check(description, String);
    check(picture, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another adventure`);
    }
    return this._collection.insert({ adventureName, organizerName, type, contact, location, description, picture });
  }

  /**
   * Returns the Interest name corresponding to the passed interest docID.
   * @param interestID An interest docID.
   * @returns { String } An interest name.
   * @throws { Meteor.Error} If the interest docID cannot be found.
   */
  findName(adventureID) {
    this.assertDefined(adventureID);
    return this.findDoc(adventureID).name;
  }

  /**
   * Returns a list of Interest names corresponding to the passed list of Interest docIDs.
   * @param interestIDs A list of Interest docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(adventureIDs) {
    return adventureIDs.map(adventureID => this.findName(adventureID));
  }

  /**
   * Throws an error if the passed name is not a defined Interest name.
   * @param name The name of an interest.
   */
  assertName(adventureName) {
    this.findDoc(adventureName);
  }

  /**
   * Throws an error if the passed list of names are not all Interest names.
   * @param names An array of (hopefully) Interest names.
   */
  assertNames(adventureNames) {
    _.each(adventureNames, adventureName => this.assertName(adventureName));
  }

  /**
   * Returns the docID associated with the passed Interest name, or throws an error if it cannot be found.
   * @param { String } name An interest name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Interest.
   */
  findID(adventureName) {
    return (this.findDoc(adventureName)._id);
  }

  /**
   * Returns the docIDs associated with the array of Interest names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of interest names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Interest name.
   */
  findIDs(adventureNames) {
    return (adventureNames) ? adventureNames.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Interest docID in a format acceptable to define().
   * @param docID The docID of an Interest.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const adventureName = doc.adventureName;
    const organizerName = doc.organizerName;
    const type = doc.type;
    const contact = doc.contact;
    const location = doc.location;
    const description = doc.description;
    const picture = doc.picture;
    return { adventureName, organizerName, type, contact, location, description, picture };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Adventures = new AdventureCollection();