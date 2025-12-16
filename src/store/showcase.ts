import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
import { Showcase } from '@/types/Showcase/Showcase'

@Module({
  name: 'showcase',
  namespaced: true,
  stateFactory: true
})
export default class ShowcaseModule extends VuexModule {
  showcase: Showcase[] | null = null

  @VuexMutation
  SET_SHOWCASE(showcase: Showcase[]) {
    this.showcase = showcase
  }

  @VuexAction({ commit: 'SET_SHOWCASE', rawError: true })
  async getShowcase(): Promise<Showcase[]> {
    const { data } = await $axios.get(config.api.url + 'api/showcase')

     console.log("API Response (showcase):", data) // Карточки жалюзи
    return data

  }

  get showcaseGetter() {
    return this.showcase
  }
}
