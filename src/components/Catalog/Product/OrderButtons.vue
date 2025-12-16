<template>
  <div class="buttons">
    <div class="row">
      <div class="col-8">
        <a
          :href="createURL()"
          class="buy"
        >
          <span class="title">заказать в конструкторе</span>
          <span class="desc">по индивидуальным параметрам</span>
        </a>
<!--        <div class="buy disabled" v-if="product.system === 'karniz'" >-->
<!--          <span class="title">заказ в конструкторе</span>-->
<!--          <span class="desc">сейчас не доступен</span>-->
<!--        </div>-->
      </div>
      <div class="col-4 pl-0">
        <button
          class="buy buy_one-click"
          @click="showCallbackModal()"
        >
          <span class="title">купить</span>
          <span class="desc">в 1 клик</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { calculatorStore, siteComponentStatesStore } from "@/utils/store-accessor";
import { Product } from '@/types/Products/Product'

@Component
export default class OrderButtons extends Vue {
  @Prop({ required: true })
  readonly product: Product

  @Prop({ default: 0 })
  readonly width: number

  @Prop({ default: 0 })
  readonly height: number

  createURL() {
    if (this.product.system !== 'karniz') {
      let url = `/buy/${this.$route.params.system}?template=${this.product.productId}`

      if (this.width && this.height) {
        url += `&sizes=${this.width}x${this.height}`
      } else {
        url += `&sizes=${this.product.minWidth}x${this.product.minHeight}`
      }

      if (this.product.material) {
        url += `&material=${this.product.material}`
      }
      return url
    }
    return `/buy/${this.$route.params.system}`
  }

  showCallbackModal() {
    siteComponentStatesStore.setCallbackModal('buyOneClick')

    this.$saleForoomCounter('NF_openBuyOneClickForm')
    this.$yandexMetrika.reachGoal('NF_openBuyOneClickForm')
  }
}
</script>

<style lang="scss" scoped>
//.buttons {
//  display: flex;
//  justify-content: space-evenly;
//  .order-button {
//    text-transform: uppercase;
//    text-align: center;
//    font-weight: 300;
//  }
//  span {
//    display: block;
//  }

.buttons {
  .buy {
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px 15px;
    background: #f9a134;
    border-radius: 5px;
    color: $text-light-color;
    text-align: center;
    transition: 0.3s ease-in-out;
    border: 2px solid #f9a134;
    &:hover {
      border-color: #ff920c;
      background: #ff920c;
    }
    &.disabled {
      background: #cccccc;
      border-color: #cccccc;
    }
    span {
      display: block;
    }
    .title {
      font-size: 19px;
      text-transform: uppercase;
      font-weight: 400;
      line-height: 1.2;
      margin-bottom: 2px;
    }
    .desc {
      margin-top: 0;
      text-transform: uppercase;
      line-height: 1.2;
      font-size: 14px;
      font-weight: 400;
    }
    &_one-click {
      padding-left: 10px;
      padding-right: 10px;
      color: $brand-deep-blue;
      background: $text-light-color;
      border-color: $brand-deep-blue !important;
      &:hover {
        background: $brand-deep-blue;
        color: $text-light-color;
      }
      .title {
        font-size: 17px;
      }
      &__disabled {
        color: #aaa !important;
        background: #fff !important;
        border-color: #aaa !important;
      }
    }
  }
}
//}
</style>
