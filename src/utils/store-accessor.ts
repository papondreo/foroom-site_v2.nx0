import { getModule } from 'nuxt-property-decorator'

import PagesModule from '@/store/pages'
import CurrentActionsModule from '@/store/currentActions'
import SystemsModule from '@/store/systems'
import SystemsCarouselModule from '@/store/systemsCarousel'
import ProductsModule from '@/store/products'
import ShowcaseModule from '@/store/showcase'
import CatalogModule from '@/store/catalog'
import ProductsFilterModule from '@/store/productsFilter'
import CalculatorModule from '@/store/calculator'
// import CalcCornicesModule from '@/store/calcCornices'
import CartModule from '@/store/cart'
import OneClickProductsModule from '@/store/oneClickProducts'
import PromocodeModule from '@/store/promocode'
import CompareProductsModule from '@/store/compareProducts'
import ShopsModule from '@/store/shops'
import RegionsModule from '@/store/regions'
import NewsModule from '@/store/news'
import SiteComponentStatesModule from '@/store/siteComponentStates'
import TextsModule from '@/store/texts'

let pagesStore: PagesModule
let actionsStore: CurrentActionsModule
let systemsStore: SystemsModule
let systemsCarouselStore: SystemsCarouselModule
let productsStore: ProductsModule
let showcaseStore: ShowcaseModule
let catalogStore: CatalogModule
let oneClickProductsStore: OneClickProductsModule
let compareProductsStore: CompareProductsModule
let productsFilterStore: ProductsFilterModule
let calculatorStore: CalculatorModule
// let calcCornicesStore: CalcCornicesModule
let cartStore: CartModule
let promocodeStore: PromocodeModule
let shopsStore: ShopsModule
let regionsStore: RegionsModule
let newsStore: NewsModule
let siteComponentStatesStore: SiteComponentStatesModule
let textsStore: TextsModule

function initialiseStores(store: never) {
  pagesStore = getModule(PagesModule, store)
  actionsStore = getModule(CurrentActionsModule, store)
  systemsStore = getModule(SystemsModule, store)
  systemsCarouselStore = getModule(SystemsCarouselModule, store)
  productsStore = getModule(ProductsModule, store)
  showcaseStore = getModule(ShowcaseModule, store)
  catalogStore = getModule(CatalogModule, store)
  oneClickProductsStore = getModule(OneClickProductsModule, store)
  productsFilterStore = getModule(ProductsFilterModule, store)
  calculatorStore = getModule(CalculatorModule, store)
  // calcCornicesStore = getModule(CalcCornicesModule, store)
  cartStore = getModule(CartModule, store)
  promocodeStore = getModule(PromocodeModule, store)
  compareProductsStore = getModule(CompareProductsModule, store)
  shopsStore = getModule(ShopsModule, store)
  regionsStore = getModule(RegionsModule, store)
  newsStore = getModule(NewsModule, store)
  siteComponentStatesStore = getModule(SiteComponentStatesModule, store)
  textsStore = getModule(TextsModule, store)
}

export {
  initialiseStores,
  pagesStore,
  actionsStore,
  systemsStore,
  systemsCarouselStore,
  productsStore,
  showcaseStore,
  catalogStore,
  productsFilterStore,
  calculatorStore,
  oneClickProductsStore,
  // calcCornicesStore,
  cartStore,
  promocodeStore,
  compareProductsStore,
  shopsStore,
  regionsStore,
  newsStore,
  siteComponentStatesStore,
  textsStore
}
