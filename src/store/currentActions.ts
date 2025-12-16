import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'

@Module({
  name: 'currentActions',
  namespaced: true,
  stateFactory: true
})
export default class CurrentActionsModule extends VuexModule {
  currentActions: any[] | null = null
  currentActionInfo: any[] | null = null
  availableMaterials: any[] | null = null

  @VuexMutation
  SET_ACTIONS(currentActions: any[]) {
    this.currentActions = currentActions
  }

  @VuexMutation
  SET_ACTION_INFO(currentActionInfo: any[]) {
    this.currentActionInfo = currentActionInfo
  }

  @VuexMutation
  SET_AVAILABLE_MATERIALS(materials: any[]) {
    this.availableMaterials = materials
  }

  @VuexAction({ commit: 'SET_ACTIONS', rawError: true })
  async getCurrentActions(): Promise<any[]> {
    const { data } = await $axios.get(config.api.url + 'api/actions/current')
    return data
  }

  @VuexAction({ commit: 'SET_ACTION_INFO', rawError: true })
  async getCurrentActionInfo(): Promise<any[]> {
    const { data } = await $axios.get(config.api.url + 'api/actions/info')
    return data
  }

  @VuexAction({ commit: 'SET_AVAILABLE_MATERIALS', rawError: true })
  async getAvailableMaterials(items): Promise<any[]> {
    const payload = {
      auth: {},
      data: {
        items
      },
      module: 'foroomService',
      cmd: 'getMaterialsList',
      key: 'W5pRNSx8Dx3tGY65xx3BOgAAAAE'
    }
    const { data } = await $axios.post('https://www.foroom.ru/proxy/', payload)
    if (data?.data?.length) {
      return data.data
    }
    return []
  }

  get currentActionsGetter() {
    return this.currentActions
  }

  get currentActionInfoGetter() {
    return this.currentActionInfo
  }

  get availableMaterialsGetter() {
    return this.availableMaterials
  }
}
