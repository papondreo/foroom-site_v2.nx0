<template>
  <p
    class="price mb-4"
    itemprop="offers"
    itemscope
    itemtype="http://schema.org/Offer"
  >
    от
    <span
      itemprop="price"
      class="bold"
    >
      {{ $priceSet(price) }}
    </span>
    ₽
    <span
      itemprop="priceCurrency"
      class="d-none"
    >
      RUB
    </span>
    <span
      class="old-price"
      v-if="oldPrice"
    >
      {{ $priceSet(oldPrice) }} ₽
    </span>
  </p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ProductPrice extends Vue {
  @Prop({ required: true })
  price: string | number

  @Prop()
  oldPrice: string | number
}
</script>

<style lang="scss" scoped>
.price {
  font-size: 28px;
  color: $brand-deep-blue;
  span.bold {
    font-weight: 400;
  }
}
.old-price {
  text-decoration: line-through;
  font-size: 15px;
  margin-left: 5px;
  position: relative;
  top: -9px;
  font-weight: 300;
  color: #606060;
}
</style>
