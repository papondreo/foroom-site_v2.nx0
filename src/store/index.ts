import type { ActionTree } from 'vuex'
import { initialiseStores } from '@/utils/store-accessor'

export const actions: ActionTree<any, any> = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('pages/getPages')
    await dispatch('currentActions/getCurrentActions')
    await dispatch('currentActions/getCurrentActionInfo')
    await dispatch('systems/getSystems')
    await dispatch('products/getProducts')
    await dispatch('catalog/getCatalog')
    await dispatch('catalog/getProductsSEO')
    
    await dispatch('shops/getShops')
    // await dispatch('shops/getUserLocationByIP')
  }
}

const initializer = (store: never) => initialiseStores(store)
export const plugins = [initializer]

export const strict = false

export * from '@/utils/store-accessor'
