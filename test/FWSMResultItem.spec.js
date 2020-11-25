import { mount } from '@vue/test-utils'
import FWSMResultItem from '@/components/search-app/FWSMResultItem.vue'

describe("FWSM result item", () => {
  function makeFakeOrg(overrides) {
    const fakeOrg = {
      orgName: 'Innovation Media',
      productDescription: 'Magazines',
      modifiedOn: Date.now(),
      address: {
        street: 'Leyweg',
        city: 'the hague',
        province: 'zuid holland',
        country: 'the netherlands',
        postcode: '2545gr'
      }
    }
    return {...fakeOrg, ...overrides}
  }
  const fakeOrg = makeFakeOrg()
  it('test', () => {
    const wrapper = mount(FWSMResultItem, {

      propsData: {
        org: { ...fakeOrg }
      }
    })
    console.log(wrapper.html())
  })
})