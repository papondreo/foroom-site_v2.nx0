<template>
  <div class="check">
    <div class="check-wrapper">
      <header>
        <p class="title">Ваш заказ</p>
        <button
          v-if="step > 1"
          @click="$emit('setStep')"
        >
          изменить
        </button>
      </header>

      <div class="count">
        <button @click="showGoods = !showGoods">
          Товаров ({{ goodsCount }})
          <i
            :class="{ 'fa-angle-down': !showGoods, 'fa-angle-up': showGoods }"
            class="fa ui-ml-1"
          />
        </button>
        <span>{{ fullPrice }}₽</span>
      </div>

      <template v-if="showGoods">
        <div
          class="item-row"
          v-for="item in cartItemsParams"
          :key="item.alias"
        >
          <p>
            {{ item.name.val }} x {{ item.amount.val }} {{ item.amount.mes }}
          </p>
          <p class="row-price">
            <span
              v-if="item.old_price"
              class="old-price"
            >
              {{ $priceSet(item.old_price.val * item.amount.val) }}
            </span>
            <span>{{ $priceSet(item.price.val * item.amount.val) }}</span>
          </p>
        </div>
      </template>

      <promo-input />

      <p
        v-if="fullSale"
        class="sale"
      >
        Скидка на товары <span>{{ fullSale }}₽</span>
      </p>

      <p class="total">
        Итого <span>{{ totalPrice }}₽</span>
      </p>
    </div>

    <ui-button
      class="apply-order"
      v-if="step === 1"
      @click="$emit('nextStep')"
    >
      Оформить заказ
    </ui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { cartStore } from '@/utils/store-accessor'

import PromoInput from '@/components/Cart/PromoInput.vue'
import UiButton from '@/components/UI/UI-Button.vue'

@Component({
  components: { PromoInput, UiButton }
})
export default class CartCheck extends Vue {
  @Prop({ required: true })
  step: number

  public showGoods: boolean = false

  get cartItems() {
    return cartStore.cartItemsGetter
  }

  get cartItemsParams() {
    return cartStore.cartItemsRusGetter
  }

  get goodsCount() {
    return this.cartItems.reduce((acc, item) => acc + item.amount, 0)
  }

  get totalPrice() {
    const fullPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    )
    return this.$priceSet(fullPrice)
  }

  get fullPrice() {
    const fullPrice = this.cartItems.reduce((acc, item) => {
      const price = item.old_price ? item.old_price : item.price
      return acc + price * item.amount
    }, 0)
    return this.$priceSet(fullPrice)
  }

  get fullSale() {
    const fullSale = this.cartItems.reduce((acc, item) => {
      const price = item.old_price ? item.old_price - item.price : 0
      return acc + price * item.amount
    }, 0)
    return this.$priceSet(fullSale)
  }
}
</script>

<style lang="scss" scoped>
.check {
  top: 12px;
}
.check-wrapper {
  padding: 16px 12px;
  background: #f5f5f8;
  border-radius: 4px;
  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  button {
    color: #aaa;
    transition: 0.3s ease-in-out;
    &:hover {
      color: $text-color;
    }
  }
}
.title {
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 400;
}
.item-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 14px;
  .row-price {
    span {
      margin-left: 8px;
      font-weight: 400;
    }
    span.old-price {
      color: #aaaaaa;
      text-decoration: line-through;
      font-weight: 300;
      margin-left: 0;
    }
  }
}

.count {
  margin-bottom: 8px;
}
.count,
.sale,
.total {
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 400;
  }
}
.sale {
  margin-top: 20px;
  span {
    color: #de0000;
  }
}

.total {
  margin-top: 8px;
  font-size: 20px;
  font-weight: 500;
}
.apply-order {
  width: 100%;
  margin-top: 12px;

  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
}
</style>
