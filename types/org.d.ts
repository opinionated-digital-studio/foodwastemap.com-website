import Address from './address'

export default interface Org {
  orgName: string;
  sectorId: string;
  subsectorId: string;
  address: Address;
  modifiedOn: number;
}