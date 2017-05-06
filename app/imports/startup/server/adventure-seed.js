import { Adventures } from '../../api/adventure/AdventureCollection.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const adventureSeed = [
  {
    adventureName: 'Koolau Hike',
    organizerName: 'Unreal Hawaii',
    type: 'Hike',
    location: 'Koolau Ridge',
    contactInfo: '808-321-2331',
    picture: 'http://jugssports.com/images/products/s3000.jpg',
    description: 'Club Hike for UH Manoa',
  },
  {
    adventureName: 'Koolau Hike12',
    organizerName: 'Unreal Hawaii',
    type: 'Hike',
    location: 'Koolau Ridge',
    contactInfo: '808-321-2331',
    picture: 'http://jugssports.com/images/products/s3000.jpg',
    description: 'Club Hike for UH Manoa',
  },
  {
    adventureName: 'Koolau Hike113',
    organizerName: 'Unreal Hawaii',
    type: 'Hike',
    location: 'Koolau Ridge',
    contactInfo: '808-321-2331',
    picture: 'http://jugssports.com/images/products/s3000.jpg',
    description: 'Club Hike for UH Manoa',
  },
];

/**
 * Initialize the Profile collection if empty with seed data.
 */
if (Adventures.find().count() === 0) {
  _.each(adventureSeed, function seedAdventure(adventure) {
    Adventures.insert(adventure);
  });
}
