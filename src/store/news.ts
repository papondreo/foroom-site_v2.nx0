import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
import { News } from '@/types/News'

@Module({
  name: 'news',
  namespaced: true,
  stateFactory: true
})
export default class ProductsModule extends VuexModule {
  news: News[] | null = null

  @VuexMutation
  SET_NEWS(news: News[]) {
    this.news = news
  }

  @VuexAction({ commit: 'SET_NEWS', rawError: true })
  async getNews(): Promise<News[]> {
    const { data } = await $axios.get(config.api.url + 'api/news')
    return data
  }

  get newsGetter() {
    return this.news
  }
}
