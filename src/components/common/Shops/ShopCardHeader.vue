<template>
  <header class="shop-card_header">
    <p class="shop-card_type">
      {{ getShopInfo(shop).type }}
      <img
        class="shop-card_logo"
        v-if="getShopInfo(shop).img"
        :src="getShopLogo(shop)"
        alt=""
      />
    </p>

    <span
      v-if="shop.distance"
      class="shop-card_distance"
    >
      ~ {{ filterDistance(shop.distance) }}
    </span>
  </header>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Prop, Getter } from 'nuxt-property-decorator'
import { Shop } from '@/types/Shops/Shop'

interface ShopInfo {
  type: string
  img: string | null
}

@Component()
export default class ShopCard extends Vue {
  @Getter('shops/selectedShopGetter') selectedShop: Shop

  @Prop()
  shop: Shop

  getShopInfo(shop: Shop): ShopInfo {
    if (shop.isWww) {
      return {
        type: 'Интернет магазин',
        img: null
      }
    } else if (shop.isComplect) {
      return {
        type: 'Партнёр по комплектующим ТМ FOROOM',
        img: null
      }
    } else if (shop.isPartner) {
      return {
        type: 'Партнёр',
        img: 'foroom-pro'
      }
    } else {
      return {
        type: 'Представитель',
        img: 'foroom'
      }
    }
  }

  getShopLogo(shop: Shop): string {
    const url = '/img-new/brand/' + this.getShopInfo(shop).img
    return this.shop.id === this.selectedShop.id
      ? url + '_white.svg'
      : url + '.svg'
  }

  filterDistance(distance: number): string {
    return distance >= 1000
      ? Math.round(distance / 1000) + ' км'
      : distance + ' м'
  }
}
</script>

<style lang="scss" scoped>
.shop-card {
  &_header {
    font-size: 14px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  &_type {
    display: flex;
    flex-wrap: nowrap;
  }
  &_logo {
    display: inline-block;
    height: 11px;
    margin-left: 5px;
    margin-top: 3.5px;
  }
  &_distance {
    text-align: right;
  }
}



.top-card{
  .shop-card_type{
    position: relative;
 
    &::before{
      content: '';
      position: absolute;
      top: -8px;
      left: calc(100% + 15px);
      width: 50px;
      height: 50px;
      background-image: url('https://www.foroom.ru/img-new/orange_medal.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  &.shop-card__selected{
    .shop-card_type{
      &::before{
        background-image: url('https://www.foroom.ru/img-new/white_medal.png');
      }
    }
  }

}
</style>
