import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
import { Product } from '@/types/Products/Product'
import { Bestseller } from '@/types/Bestsellers'

@Module({
  name: 'products',
  namespaced: true,
  stateFactory: true
})
export default class ProductsModule extends VuexModule {
  products: Product[] | null = null
  bestsellers: Bestseller[] | null = null

  @VuexMutation
  SET_PRODUCTS(products: Product[]) {
    this.products = products
      .filter((product: Product) => product.publicOnSite)
      .sort((a, b) => (a.positionOnSiteMenu < b.positionOnSiteMenu ? -1 : 1))
  }

  @VuexMutation
  SET_BESTSELLERS(bestsellers: Bestseller[]) {
    this.bestsellers = bestsellers
  }

  @VuexAction({ commit: 'SET_PRODUCTS', rawError: true })
  async getProducts(): Promise<Product[]> {
    // const { data } = await $axios.post('https://api.foroom.ru/', {
    //   auth: {},
    //   data: {},
    //   module: 'materialAdmin',
    //   cmd: 'get_izds',
    //   key: 'W5pRNSx8Dx3tGY65xx3BOgAAAAE'
    // })
    const { data } = await $axios.get(config.api.url + 'api/products')
    
    
    // console.log('karniz', data.filter(i => i.type === 'karniz'));
    return data
  }

  @VuexAction({ commit: 'SET_BESTSELLERS', rawError: true })
  async getBestsellers(): Promise<Bestseller[]> {
    const { data } = await $axios.get(config.api.url + 'api/bestsellers')
    return data
  }

  get productsGetter() {
    return this.products?.filter((product) => product.publicOnSite && !product.disabled)
  }

  get availableProductsIds() {
    if (this.products) {
      return this.products
        .filter((product) => product.publicOnSite && !product.disabled)
        .map((product) => product.type + product.subtype)
    }
    return []
  }

  get bestsellersGetter() {
    return this.bestsellers
  }
}
