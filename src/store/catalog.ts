import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'

import config from '@/config'
import Vue from 'vue'
import { $axios } from '@/utils/axios-accessor'
import FormData from 'form-data'
// const FormData = require('form-data')
@Module({
  name: 'catalog',
  namespaced: true,
  stateFactory: true
})

export default class CatalogModule extends VuexModule {
  products: any | null = null
  productsSEO: productsSEOItem[] = []
  similarProducts: any | null = {}
  currentSimilarProduct: any | null = {}

  @VuexMutation
  SET_PRODUCTS(products) {
    // удалить этот костыль после замены урлов в апи
    products = products.map(p => ({
      ...p,
      img: p.img.replace('/img/', '/img-new/'),
      productImages: p.productImages ? p.productImages.map(i => i.replace('/img/', '/img-new/')) : [],
      windowImg: p.windowImg ? p.windowImg.replace('/img/', '/img-new/') : null,
      measure: {
        ...p?.measure,
        photo: p.measure && p.measure.photo ? p.measure.photo.replace('/img/', '/img-new/') : null
      },
      productInfo: p.productInfo?.map(i => ({
        ...i,
        img: i.img ? i.img.replace('/img/', '/img-new/') : ''
      }))
    }))
    // удалить этот костыль после замены урлов в апи
    this.products = products
  }

  @VuexMutation
  SET_PRODUCTS_SEO(productsSEO: productsSEOItem[]) {
    this.productsSEO = productsSEO
  }

  @VuexMutation
  SET_SIMILAR_PRODUCTS({ productId, data }) {
    Vue.set(this.similarProducts, productId, data)
  }

  @VuexMutation
  SET_CURRENT_SIMILAR_PRODUCT(product) {
    this.currentSimilarProduct = product
  }

  @VuexAction({ commit: 'SET_PRODUCTS', rawError: true }) // Картинки Профильные карнизы

  async getCatalog(): Promise<any> {
    const { data } = await $axios.get(config.api.url + 'api/catalog')
    return data
  }

  @VuexAction({ commit: 'SET_PRODUCTS_SEO', rawError: true })
  async getProductsSEO(): Promise<any> {
    const { data } = await $axios.get(config.api.url + 'api/catalog/productsSEO')
    return data
  }

  @VuexAction({ commit: 'SET_SIMILAR_PRODUCTS', rawError: true })
  async getSimilarProducts(productId: string): Promise<any> {
    const { data } = await $axios.get(
      `${config.api.url}api/goods/system/${productId}`
    )
    return { productId, data }
  }

  @VuexAction({ commit: 'SET_CURRENT_SIMILAR_PRODUCT', rawError: true })
  setCurrentSimilarProduct(product) {
    return product
  }

  get catalogGetter() {
    //console.log('ffffffff',this.products)
    return this.products
    // return this.products?.filter((product) =>
    //   productsStore.availableProductsIds.includes(product.productId)
    // )
  }

  get catalogProductsSEOGetter() {
    return this.productsSEO
  }

  get currentProductGetter() {
    return (productId) => {
      return this.catalogGetter.find((item) => item.productId === productId)
    }
  }

  get allCatalogSimilarProductsGetter() {
    return this.similarProducts
  }

  get catalogSimilarProductsGetter() {
    return (productId) => {
      return this.similarProducts[productId]
    }
  }

  get currentSimilarProductGetter() {
    return this.currentSimilarProduct
  }
}

export interface productsSEOItem {
  system?: string,
  systemName?: string,
  metaTitle?: string, 
  metaDescription?: string, 
  metaKeywords?: string,
  metaRobots?: string,
  url: string,
  h1?: string,
  metaScript?: {
    type: string,
    innerHTML: string
  }

}
