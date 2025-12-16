import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'

import { $axios } from '@/utils/axios-accessor'
import { getDistance } from 'geolib'

import { LocationByIP } from '@/types/UserLocation/LocationByIP'
import { Shop } from '@/types/Shops/Shop'

@Module({
  name: 'shops',
  namespaced: true,
  stateFactory: true
})
export default class ShopsModule extends VuexModule {
  shops: Shop[] | null = null
  selectedShopId: number = 0
  userLocation: LocationByIP | null = null
  routes: any[] = []

  @VuexMutation
  SET_SHOPS(shops: Shop[]) {
    this.shops = shops
  }

  @VuexMutation
  SET_USER_LOCATION(location: LocationByIP) {
    this.userLocation = location

    const shops = this.shops?.map((shop: Shop) => {
      shop.distance = getDistance(
        {
          latitude: parseFloat(shop.coords_geo[0]),
          longitude: parseFloat(shop.coords_geo[1])
        },
        {
          latitude: location.lat,
          longitude: location.lon
        }
      )
      return shop
    })
    if (shops) {
      this.shops = shops.sort((a, b) => (a.distance < b.distance ? -1 : 1))
    }
  }

  @VuexMutation
  SELECT_SHOP(shopId: number) {
    this.selectedShopId = shopId
  }

  @VuexMutation
  SET_MAP_ROUTE(route) {
    this.routes.push(route)
  }

  @VuexMutation
  CLEAR_MAP_ROUTES() {
    this.routes = []
  }

  @VuexAction({ commit: 'SET_MAP_ROUTE', rawError: true })
  setMapRoute(route) {
    return route
  }

  @VuexAction({ commit: 'CLEAR_MAP_ROUTES', rawError: true })
  clearMapRoutes() {
    return true
  }

  @VuexAction({ commit: 'SET_SHOPS', rawError: true })
  async getShops(): Promise<Shop[]> {
    const { data } = await $axios.get(
      'https://www.foroom.ru/_proxy/uploads/open/json/get_map_items.json'
    )

    return Object.keys(data.data).map((id) => ({
      id: parseInt(id),
      ...data.data[id]
    }))
  }

  @VuexAction
  // async getUserLocationByIP(): Promise<LocationByIP> {
  //   const { data } = await $axios.get('https://siteapi.foroom.ru/user-location')
  //
  //   if (data.status === 'success') {
  //     this.SET_USER_LOCATION({
  //       lat: data.lat,
  //       lon: data.lon
  //     })
  //   }
  //   return data
  // }

  @VuexAction
  setUserLocation(coords: number[]) {
    this.SET_USER_LOCATION({ lat: coords[0], lon: coords[1] })
  }

  @VuexAction({ commit: 'SELECT_SHOP', rawError: true })
  selectShop(shopId: number) {
    return shopId
  }

  get shopsGetter() {
    return this.shops
  }

  get selectedShopGetter() {
    if (this.shops) {
      return this.selectedShopId
        ? this.shops?.find((shop) => shop.id === this.selectedShopId)
        : this.shops[0]
    }
    return null
  }

  get userLocationGetter() {
    return this.userLocation
  }

  get mapRoutesGetter() {
    return this.routes
  }
}
