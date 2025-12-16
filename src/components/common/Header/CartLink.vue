<template>
  <nuxt-link to="/order">
    <img
      :class="{ animate: animate }"
      src="/img-new/icons/cart.png"
      alt="корзина интернет-магазина FOROOM"
      title="корзина с выбранными солнцезащитными изделиями"
    />
    <span>Корзина</span>
    <span
      v-if="cartItemsLength"
      class="cart-count"
    >
      {{ cartItemsLength }}
    </span>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { cartStore } from '@/store'

@Component
export default class CartLink extends Vue {
  animate: boolean = false

  @Watch('cartItemsLength')
  cartUpdated() {
    this.animate = true
    setTimeout(() => {
      this.animate = false
    }, 1000)
  }

  mounted() {
    cartStore.setCart()
  }

  get cartItemsLength() {
    return cartStore.cartItemsGetter.length
  }
}
</script>

<style lang="scss" scoped>
a {
  position: relative;
  .cart-count {
    position: absolute;
    bottom: 24px;
    right: 0;
    height: 20px;
    min-width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 4px 2px;
    background: $brand-orange-light;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 400;
    color: #ffffff;

    //transition: 0.3s ease-in-out;
  }

  //.animate {
  //  transition: 0.3s ease-in-out;
  //  transform: scale(1.3);
  //}
}
</style>
