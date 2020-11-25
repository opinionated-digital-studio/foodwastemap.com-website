import Address from './address'

export default interface Org {
  orgName: string;
  productDescription: string;
  address: Address;
  modifiedOn: number;
}