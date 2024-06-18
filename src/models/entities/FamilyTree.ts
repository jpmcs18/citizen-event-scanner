import FamilyMember from './FamilyMember';
import Person from './Person';

export default interface FamilyTree {
  id: number;
  headId: number | undefined;
  isConfirm: boolean | undefined;

  head?: Person;
  members?: FamilyMember[] | undefined;
}
