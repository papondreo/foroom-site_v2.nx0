import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'

@Module({
  name: 'cart',
  namespaced: true,
  stateFactory: true
})
export default class CartModule extends VuexModule {
  cartItems: any = []
  cartItemsRus: any = []

  @VuexMutation
  SET_CART({ items, itemsRus }) {
    this.cartItems = items
    this.cartItemsRus = itemsRus
  }

  @VuexMutation
  UPDATE_CART({ item, itemRus }) {
    this.cartItems.push(item)
    this.cartItemsRus.push(itemRus)
  }

  @VuexAction({ commit: 'SET_CART', rawError: true })
  async setCart() {
    const cartItems = localStorage.getItem('cartItems')
    const cartItemsParams = localStorage.getItem('cartItemsParams')

    const items = cartItems ? JSON.parse(cartItems) : []
    const itemsRus = cartItemsParams ? JSON.parse(cartItemsParams) : []

    return { items, itemsRus }
  }

  @VuexAction({ commit: 'SET_CART', rawError: true })
  async clearCart() {
    const items = []
    const itemsRus = []

    return { items, itemsRus }
  }

  @VuexAction({ commit: 'UPDATE_CART', rawError: true })
  async updateCart(cartItems) {
    return cartItems
  }

  get cartItemsGetter() {
    return this.cartItems
  }

  get cartItemsRusGetter() {
    return this.cartItemsRus
  }
}
