import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
import { SystemsCarouselType as Slide } from '@/types/SystemsCarousel'

@Module({
  name: 'systemsCarousel',
  namespaced: true,
  stateFactory: true
})
export default class SystemsCarouselModule extends VuexModule {
  slides: Slide[] | null = null

  @VuexMutation
  SET_SYSTEMS_SLIDES(slides: Slide[]) {
    this.slides = slides
  }

  @VuexAction({ commit: 'SET_SYSTEMS_SLIDES', rawError: true })
  async getAllSlides(): Promise<Slide[]> {
    const { data } = await $axios.get(config.api.url + 'api/systems-slider')
    return data
  }

  get systemsCarouselGetter() {
    return this.slides
  }
}
