import FwsmSubsector from './fwsm-subsector'

export default interface FwsmSector {
  id: string,
  name: string,
  tags?: Array<string>,
  description?: string,
  fwsmSubsectors: Array<FwsmSubsector>
}