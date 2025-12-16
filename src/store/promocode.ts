import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'

import config from '@/config'
import Vue from 'vue'
import { $axios } from '@/utils/axios-accessor'
import { calculatorStore, productsStore } from "@/utils/store-accessor";

@Module({
  name: 'promocode',
  namespaced: true,
  stateFactory: true
})
export default class PromocodeModule extends VuexModule {
  allPromocodes: any = null
  promocode: any = null
  promocodeParams: any = null

  @VuexMutation
  SET_ALL_PROMOCODES(allPromocodes) {
    this.allPromocodes = allPromocodes
  }

  @VuexMutation
  SET_PROMOCODE(promocode) {
    this.promocode = promocode
  }

  @VuexMutation
  SET_PROMOCODE_PARAMS(promocodeParams) {
    this.promocodeParams = promocodeParams
  }

  @VuexAction({ commit: 'SET_ALL_PROMOCODES', rawError: true })
  async setAllPromocodes(promocodes) {
    return promocodes
  }

  @VuexAction
  async set(promocode) {
    let api: any = calculatorStore.apiGetter
    if (!api) {
      api = await calculatorStore.initApi()
    }

    const hashedPromocode = api.md5(promocode)
    if (
      !this.allPromocodesGetter ||
      !this.allPromocodesGetter[hashedPromocode]
    ) {
      this.SET_PROMOCODE(null)
      localStorage.removeItem('promo')
      return { error: 'Промокод не действителен' }
    }

    this.SET_PROMOCODE(promocode)
    this.SET_PROMOCODE_PARAMS(this.allPromocodesGetter[hashedPromocode])

    return { error: null }
  }

  // @VuexAction
  // async calc(templates) {
  //   let api: any = calculatorStore.apiGetter
  //   if (!api) {
  //     api = await calculatorStore.initApi()
  //   }
  //
  //   return new Promise((resolve, reject) => {
  //     const result = {}
  //     api.init_calc((calc) => {
  //       Object.keys(templates).forEach((key) => {
  //         const template = templates[key]
  //
  //         calc.load_template(template)
  //         calc.apply_promo(template.promoCode)
  //         calc.current_item.calcPrice()
  //         const item = calc.current_item.release()
  //         const itemRus = calc.convert_item_to_preview(item)
  //
  //         result[key] = { item, itemRus }
  //       })
  //
  //       resolve(result)
  //     })
  //   })
  // }

  @VuexAction
  async remove() {
    this.SET_PROMOCODE(null)
    this.SET_PROMOCODE_PARAMS(null)
  }

  get allPromocodesGetter() {
    return this.allPromocodes
  }

  get promocodeParamsGetter() {
    return this.promocodeParams
  }
}
