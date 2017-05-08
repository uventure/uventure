import { Adventures } from '../../api/adventure/AdventureCollection.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Adventures to pre-fill the Collection.
 * @type {*[]}
 */
const adventureSeed = [
  {
    adventureName: 'Super Moon Viewing Party',
    organizerName: 'Unreal Hawaii',
    type: 'Viewing Party',
    location: 'Ala Moana Beach Park',
    contactInfo: '808-321-2331',
    picture: 'http://www.unrealhawaii.com/wp-content/uploads/2013/06/IMG_9622-2.jpg',
    description: 'Come down this Saturday for food and drinks at Ala Moana Beach park to see the super moon.',
  },
  {
    adventureName: 'Maunalua Bay',
    organizerName: 'UH Manoa Vietnamese Club',
    type: 'Hike',
    location: 'Maunalua Bay',
    contactInfo: '808-311-2331 or vsouh@hawaii.edu',
    picture: 'http://www.unrealhawaii.com/wp-content/uploads/2013/06/DSC_4803.jpg',
    description: 'Join the VSOUH for a morning around-the-island drive. All members welcome. No fees. RSVP by  June 7th.',
  },
  {
    adventureName: 'Laie Beach Cleanup',
    organizerName: 'John Anderson',
    type: 'Beach Cleanup',
    location: 'Laie Beach Park',
    contactInfo: 'ljohnson@hawaii.edu',
    picture: 'http://www.unrealhawaii.com/wp-content/uploads/2010/06/laiebeachpark-cover.jpg',
    description: 'Beach cleanup community service event at Laie Beach. Everyone invited. BYOB and bags.',
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
