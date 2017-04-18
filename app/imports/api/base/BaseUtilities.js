import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Adventures } from '/imports/api/adventure/AdventureCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Adventures.removeAll();
}