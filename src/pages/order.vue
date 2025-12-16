<template>
  <main>
    <div class="container mb-5">
      <ui-title tag="h1" class="ui-title-1">
        {{ title }}
      </ui-title>

      <p v-if="step === 2" class="mb-3">
        Для самовывоза или дополнительных услуг: доставка, замер, установка
      </p>
      <div v-if="cartItems.length" class="row">
        <div class="col-md-8">
          <div v-if="step === 1" class="row">
            <div v-for="(item, i) in cartItems" :key="i" class="col-12">
              <cart-item-card
                v-if="item.type !== 'karniz'"
                :item="item"
                :i="i"
                @showAllParams="showAllParams(item, i)"
              />
              <cart-item-card-cornice
                v-else
                :item="item"
                :i="i"
                @showAllParams="showAllParams(item, i)"
              />
            </div>
          </div>

          <div v-if="step === 2" class="row">
            <div class="col-6 ui-sticky">
              <shops-map
                class="ui-sticky"
                ref="cartSalesPointsShopsMap"
                uniq-id="cart-sales-points-map"
                style="height: 500px; top: 12px"
              />
            </div>
            <div class="col-6">
              <shops-search
                class="ui-mb-3"
                ref="cartSalesPointShopsSearch"
                @search="searchShop"
              />

              <shop-card
                v-for="shop in shops"
                :key="shop.id"
                :shop="shop"
                :show-button="true"
                button-text="Оформить заказ"
                background-color="#ffffff"
                class="shop-card"
                @selectShop="selectShop"
                @buttonClick="toForm()"
              />

              <button class="show-more-button" @click="showMore">Показать еще</button>
            </div>
          </div>

          <div v-if="step === 3" class="row">
            <div class="col-md-6 mb-4">
              <cart-order-form
                :items="items"
                :mainItems="mainItems"
                @clearCart="clearCart"
              />
            </div>
            <div class="col-md-6">
              <cart-selected-shop @setStep="step = 2" />
            </div>
          </div>
        </div>

        <div class="col-md-4 ui-sticky">
          <cart-check
            class="ui-sticky"
            :step="step"
            @setStep="step = 1"
            @nextStep="step = 2"
          />
        </div>
      </div>

      <ui-empty v-if="!cartItems.length">
        <p class="ui-mb-1">Ваша корзина пуста</p>
        <p>
          Заказать в
          <nuxt-link to="/buy" class="ui-link ui-link_orange"> КОНСТРУКТОРЕ </nuxt-link>
        </p>
      </ui-empty>
    </div>
    <cart-item-params-modal
      v-if="itemParams"
      :itemParams="itemParams"
      @close="itemParams = null"
    />
  </main>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from "nuxt-property-decorator";

import { cartStore, shopsStore } from "@/utils/store-accessor";

import CartCheck from "@/components/Cart/CartCheck.vue";
import CartItemCard from "@/components/Cart/CartItemCard.vue";
import ShopsMap from "@/components/common/Shops/ShopsMap.vue";
import ShopCard from "@/components/common/Shops/ShopCard.vue";
import ShopsSearch from "@/components/common/Shops/ShopsSearch.vue";

import { Shop } from "@/types/Shops/Shop";
import CartSelectedShop from "@/components/Cart/CartSelectedShop.vue";
import CartOrderForm from "@/components/Cart/CartOrderForm.vue";
import UiEmpty from "@/components/UI/UI-Empty.vue";
import CartItemParamsModal from "@/components/Cart/CartItemParamsModal.vue";
import CartItemCardCornice from "@/components/Cart/CartItemCardCornice.vue";

@Component({
  components: {
    CartItemCardCornice,
    CartItemParamsModal,
    CartOrderForm,
    CartSelectedShop,
    ShopsSearch,
    ShopCard,
    ShopsMap,
    CartItemCard,
    CartCheck,
    UiEmpty,
  },
})
export default class OrderPage extends Vue {
  head() {
    return {
      title:
        "Купить жалюзи на окна по доступной цене от отечественного производителя FOROOM. ",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Для покупки жалюзи на окна добавьте товар в корзину с помощью онлайн-конструктора на сайте FOROOM. ",
        },
      ],
    };
  }

  step: number = 1;
  shopsCount: number = 3;
  items = [];
  mainItems = [];
  steps = [
    {
      num: 1,
      title: "Ваш заказ",
    },
    {
      num: 2,
      title: "Выберите магазин",
    },
    {
      num: 3,
      title: "Заполните Ваши данные",
    },
  ];
  itemParams = null;

  mounted() {
    this.getCartItems();
  }

  getCartItems() {
    const items = localStorage.getItem("cartItemsParams");
    const mainItems = localStorage.getItem("cartItems");

    this.items = items ? JSON.parse(items) : [];
    this.mainItems = mainItems ? JSON.parse(mainItems) : [];
  }

  toForm() {
    this.step = 3;
    window.scrollTo(0, 0);
  }

  showAllParams(item, i) {
    this.itemParams = this.cartItemsParams[i];
    // console.log(this.cartItemsParams[i], i)
  }

  showMore() {
    this.shopsCount += 3;
  }

  async searchShop(coords) {
    coords = coords.map((coord) => parseFloat(coord));
    this.$refs.cartSalesPointsShopsMap.setCenter(coords);
    this.$refs.cartSalesPointsShopsMap.clearRoutes();

    await shopsStore.setUserLocation(coords);
    await shopsStore.selectShop(this.shops[0].id);
  }

  selectShop(coords) {
    coords = coords.map((coord) => parseFloat(coord));
    this.$refs.cartSalesPointsShopsMap.setCenter(coords);
    this.$refs.cartSalesPointsShopsMap.clearRoutes();
    this.$refs.cartSalesPointsShopsMap.printRoute(false, coords);
  }

  clearCart() {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartItemsParams");

    this.items = [];
    this.mainItems = [];

    cartStore.clearCart();

    // this.$store.dispatch('promocodes/remove')
    localStorage.removeItem("promo");
  }

  get shops(): Shop[] {
    return shopsStore.shopsGetter.slice(0, this.shopsCount);
  }

  get title() {
    return this.steps.find((step) => step.num === this.step).title;
  }

  get cartItems() {
    return cartStore.cartItemsGetter;
  }

  get cartItemsParams() {
    return cartStore.cartItemsRusGetter;
  }
}
</script>

<style lang="scss" scoped>
.show-more-button {
  width: 100%;
  margin-top: 8px;
  border-radius: 4px;
  padding: 4px 0;
  background-color: #f9a134;
  text-transform: uppercase;
  color: #fff;
  font-weight: 400;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: $brand-orange-light;
  }
}
</style>
