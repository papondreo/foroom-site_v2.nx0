<template>
  <div class="cart-item-card">
    <div class="preview-img">
      <div
        v-if="itemParams.current_action"
        class="action"
      >
        <p class="action-title">
          АКЦИЯ «{{ itemParams.current_action.val }}»
        </p>
        <p class="action-perc">
          ВАША СКИДКА {{ itemParams.perc.val }}%
        </p>
      </div>
      <img v-if="product.system !== 'wood'"  src="/img-new/constructor/window-bg.jpg" />
      <img v-else src="/img-new/constructor/WOOD_50_9.jpg" />
      <img
        v-if="item.window_img"
        class="img"
        :src="item.window_img"
        alt=""
      />
      <img
        v-if="product.system === 'vblinds'"
        class="img"
        src="/img-new/constructor/1441976311b.png"
      />
      <img
        class="img"
        :src="item.izd_ico"
        alt=""
      />
    </div>
    <div class="item-params">
      <div class="d-flex justify-content-between align-items-start">
        <ui-title
          tag="p"
          class="ui-title-2 title"
        >
          {{ product.title }}
        </ui-title>
        <button
          class="show-all-params"
          @click="$emit('showAllParams')"
        >
          Все характеристики
        </button>
      </div>

      <p class="item-system">{{ product.systemName }}</p>
      <p class="item-param">
        {{ itemParams.material.name }}: {{ itemParams.material.val }}
      </p>
      <p class="item-param">
        {{ itemParams.width.name }}: {{ itemParams.width.val }}
        {{ itemParams.width.mes }}
      </p>
      <p class="item-param" v-if="itemParams.height">
        {{ itemParams.height.name }}: {{ itemParams.height.val }}
        {{ itemParams.width.mes }}
      </p>

      <footer>
        <div class="price">
          <p
            :class="{ 'item-price_sale': item.old_price }"
            class="item-price"
          >
            {{ $priceSet(item.price * item.amount) }}₽
          </p>
          <p
            v-if="item.old_price"
            class="item-old-price"
          >
            {{ $priceSet(item.old_price * item.amount) }}₽
          </p>
        </div>
        <div class="amount">
          <button
            :disabled="item.amount === 1"
            @click="setAmount(-1)"
          >
            <i class="fa fa-minus-circle"></i>
          </button>
          <span>{{ item.amount }} шт</span>
          <button @click="setAmount(1)">
            <i class="fa fa-plus-circle"></i>
          </button>
        </div>
        <div class="del ui-text-right">
          <button @click="removeItem">удалить</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { cartStore, catalogStore } from '@/store'

import { Template } from '@/types/Calculator/Template'

@Component
export default class CartItemCard extends Vue {
  @Prop({ required: true })
  readonly item: Template

  @Prop({ required: true })
  readonly i: number

  async setAmount(n) {
    if (this.item.amount > 1 || n > 0) {
      const amount = this.item.amount + n

      const items = cartStore.cartItemsGetter
      const itemsRus = cartStore.cartItemsRusGetter

      items[this.i].amount = amount
      itemsRus[this.i].amount.val = amount

      localStorage.setItem('cartItems', JSON.stringify(items))
      localStorage.setItem('cartItemsParams', JSON.stringify(itemsRus))

      await cartStore.setCart()
    }
  }

  async removeItem() {
    const items = cartStore.cartItemsGetter.filter((item, i) => i !== this.i)
    const itemsRus = cartStore.cartItemsRusGetter.filter(
      (item, i) => i !== this.i
    )

    localStorage.setItem('cartItems', JSON.stringify(items))
    localStorage.setItem('cartItemsParams', JSON.stringify(itemsRus))

    await cartStore.setCart()
  }

  get itemParams() {
    return cartStore.cartItemsRusGetter[this.i]
  }

  get product() {
    const { type, subtype } = this.item
    return catalogStore.catalogGetter.find(
      (product) => product.productId === type + subtype
    )
  }
}
</script>

<style lang="scss" scoped>
.cart-item-card {
  margin-bottom: 24px;
  display: flex;
  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
  border-radius: 4px;
}
.action {
  position: absolute;
  left: -20px;
  right: -20px;
  z-index: 3;
  &-title {
    position: relative;
    transform: rotate(-1deg);
    padding: 2px 30px;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    background-color: #de0000;
    z-index: 1;
  }
  &-perc {
    transform: rotate(-2.5deg);
    padding: 3px 30px;
    font-weight: 400;
    font-size: 13px;
    color: #ffffff;
    top: -4px;
    position: relative;
    background-color: rgba(#de1000, .7);
  }
}
.preview-img {
  flex-shrink: 0;
  position: relative;
  width: 30%;
  min-height: 180px;
  margin-right: 16px;
  border-radius: 4px;
  overflow: hidden;
  img {
    width: 102%;
    height: 102%;
    object-position: center;
    object-fit: cover;
  }

  .img {
    position: absolute;
    width: 102%;
    height: 102%;
    left: 0;
    top: 0;
    object-position: center;
    object-fit: cover;
  }
}
.show-all-params {
  font-size: 14px;
  color: #7f828b;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: $brand-orange-light;
  }
}
.item-params {
  padding: 8px;
  width: 100%;
  .title {
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .item-system {
    margin-bottom: 8px;
  }
  .item-param {
    font-size: 14px;
  }
  .price {
    display: flex;
    align-items: baseline;
    width: 50%;
    margin-top: 12px;
  }
  .item-old-price {
    margin-right: 8px;
    text-decoration: line-through;
    color: #aaa;
  }
  .item-price {
    margin-right: 8px;
    font-size: 20px;
    font-weight: 500;
    &_sale {
      color: #de1000;
    }
  }
}
footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .amount {
    display: flex;
    align-items: center;
    span {
      margin: 0 16px;
      font-weight: 500;
      font-size: 20px;
      color: #585858;
    }
    button {
      color: #aaa;
      transition: 0.3s ease-in-out;
      font-size: 14px;
      &:hover {
        color: $brand-orange-light;
      }
      &:disabled {
        color: #dddddd;
        cursor: default;
      }
    }
  }
  .del {
    width: 20%;
    margin-right: 12px;
    button {
      color: #aaa;
      transition: 0.3s ease-in-out;
      &:hover {
        color: $text-color;
      }
    }
  }
}
</style>
