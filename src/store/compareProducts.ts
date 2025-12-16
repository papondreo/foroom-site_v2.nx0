import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'

import Vue from 'vue'

@Module({
  name: 'compareProducts',
  namespaced: true,
  stateFactory: true
})
export default class CompareProductsModule extends VuexModule {
  comparedProducts = {}

  @VuexMutation
  ADD_TO_COMPARED_PRODUCTS(comparedProduct) {
    this.comparedProducts = {
      ...this.comparedProducts,
      ...comparedProduct
    }
  }

  @VuexMutation
  SET_VIEW({ productId, flag }) {
    Vue.set(this.comparedProducts[productId], 'view', flag)
  }

  @VuexAction({ commit: 'ADD_TO_COMPARED_PRODUCTS', rawError: true })
  async add(item) {
    return item
  }

  @VuexAction({ commit: 'SET_VIEW', rawError: true })
  async setView({ productId, flag }) {
    return { productId, flag }
  }

  get comparedProductsGetter() {
    return this.comparedProducts
  }
}
