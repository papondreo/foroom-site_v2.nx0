import {
  Module,
  VuexModule
  // VuexMutation,
  // VuexAction
} from 'nuxt-property-decorator'

@Module({
  name: 'productsFilter',
  namespaced: true,
  stateFactory: true
})
export default class ProductsModule extends VuexModule {
  filterParams: any = {
    attachmentPoint: {
      title: 'Точка крепления',
      params: null
    },
    systemType: {
      title: 'Солнцезащитная система',
      params: null
    },
    actionPerc: {
      title: 'Скидка',
      params: null
    }
  }
  // filter: any[] | null = null
  //
  // @VuexMutation
  // SET_FILTER(filter: any[]) {
  //   this.filter = filter
  // }
  //
  // @VuexAction({ commit: 'SET_FILTER', rawError: true })
  // setFilter(filter) {
  //   return filter
  // }
  //
  // get filterGetter() {
  //   return this.filter
  // }

  get filterParamsGetter() {
    return this.filterParams
  }
}
