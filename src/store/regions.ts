import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'

import { $axios } from '@/utils/axios-accessor'

@Module({
  name: 'regions',
  namespaced: true,
  stateFactory: true
})
export default class ShopsModule extends VuexModule {
  regions: any[] | null = null

  @VuexMutation
  SET_REGIONS(regions) {
    const arr: any[] = []

    Object.keys(regions).map((key) => {
      regions[key].regions.map((region) => {
        arr.push({
          managerId: key,
          managerName: regions[key].name,
          value: region.replace(/\d/g, '').trim(),
        })
      })
    })
    this.regions = arr
  }

  @VuexAction({ commit: 'SET_REGIONS', rawError: true })
  async getRegions() {
    const { data } = await $axios.$post('/get_regions/')
    if (data && !data.errors) {
      return data
    }
  }

  get regionsGetter() {
    return this.regions
  }
}
