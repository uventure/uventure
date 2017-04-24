import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class AdventureCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Adventure', new SimpleSchema({
      adventureName: { type: String },
      // Remainder are optional
      organizerName: { type: String, optional: true },
      type: { type: String, optional: true },
      location: { type: String, optional: true },
      contactInfo: { type: [String], optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      description: { type: [String], optional: true },
    }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ adventureName = '', organizerName = '', type = '', location = '', contactInfo = '', picture = '', description = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      adventureName: String,
      organizerName: String,
      type: String,
      location: String,
      contactInfo: String,
      picture: String,
      description: String
    };
    check({ adventureName, organizerName, type, location, contactInfo, picture, description }, checkPattern);

    if (this.find({ adventureName }).count() > 0) {
      throw new Meteor.Error(`${adventureName} is previously defined in another adventure`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    // Interests.assertNames(interests);
    // return this._collection.insert({
    //   firstName, lastName, username, bio, interests, picture, title, github,
    //   facebook, instagram
    // });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const adventureName = doc.adventureName;
    const organizerName = doc.organizerName;
    const type = doc.type;
    const location = doc.location;
    const contactInfo = doc.contactInfo;
    const picture = doc.picture;
    const description = doc.description;

    return { firstName, lastName, username, bio, interests, picture, title, github, facebook, instagram };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Adventures = new AdventureCollection();