import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
@Module({
  name: 'oneClickProducts',
  namespaced: true,
  stateFactory: true
})
export default class OneClickProductsModule extends VuexModule {
  oneClickProducts: any = null;


  @VuexMutation
  SET_ONE_CLICK_PRODUCTS({ data }) {
    this.oneClickProducts = data
  }


  @VuexAction({ commit: 'SET_ONE_CLICK_PRODUCTS', rawError: true })
  async getOneClickProducts() {

    const { data } = await $axios.get(config.api.url + 'api/one-click')
    

    return { data }
  }





  get oneClickProductsGetter() {
    return this.oneClickProducts
  }

}
