import Person from './Person';

export default interface FamilyMember {
  id: number;
  familyTreeId: number | undefined;
  memberId: number | undefined;

  member?: Person | undefined;
}
