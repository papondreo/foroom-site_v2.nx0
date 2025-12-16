<template>
  <div
    class="shop-card"
    :class="{ 'shop-card__selected': shop.id === selectedShop.id }"
    :style="{ 'background-color': backgroundColor }"
    @click="selectShop(shop)"
  >
    <shop-card-header :shop="shop" />

    <p class="shop-card_title">{{ shop.name }}</p>
    <p class="shop-card_address">г. {{ shop.city }}, {{ shop.address }}</p>

    <template v-if="shop.id === selectedShop.id">
      <p class="shop-card_phone">
        <span>Телефон:</span>
        <a
          :href="`tel:${clearPhone(shop.phones[0])}`"
          class="phone-link"
          title="Позвонить"
        >
          {{ clearPhone(shop.phones[0]) }}
        </a>
        <button
          class="copy ml-3"
          @click.stop="copy(clearPhone(shop.phones[0]))"
          title="Копировать"
        >
          <i class="fa fa-copy"></i>
        </button>
      </p>

      <p
        class="shop-card_phone"
        v-if="shop.isService"
      >
        <span>E-mail:</span>
        {{ shop.email }}
      </p>

      <p class="shop-card_work-time-title">Время работы:</p>

      <p class="shop-card_work-time">
        <span
          :key="`r${i}`"
          v-for="(row, i) in shop.schedule_json"
        >
          <template v-if="row.title">
            {{ row.title.replace(':', '') }}: с
            <template v-if="row.time">
              {{ row.time.from }}
            </template>
            по
            <template v-if="row.time">
              {{ row.time.to }}
            </template>

            <span
              style="margin-left: 10px"
              v-if="row.break.from && row.break.to"
            >
              Перерыв:
              <template v-if="row.break">
                {{ row.break.from }}
              </template>
              по
              <template v-if="row.break">
                {{ row.break.to }}
              </template>
            </span>
            <br />
          </template>
          <template v-if="row.dayOff"> Выходной: {{ row.dayOff }} </template>
        </span>
      </p>
    </template>

    <button
      v-if="shop.id === selectedShop.id && showButton"
      class="shop-card_call-button"
      @click.stop="buttonClick"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { shopsStore } from '@/store'
import { Shop } from '@/types/Shops/Shop'

import ShopCardHeader from '@/components/common/Shops/ShopCardHeader.vue'

@Component({
  components: { ShopCardHeader }
})
export default class ShopCard extends Vue {
  @Prop()
  shop: Shop

  @Prop({ default: false })
  showButton: boolean

  @Prop({ default: '' })
  buttonText: string

  @Prop({ default: '#f5f5f5' })
  backgroundColor: string

  async selectShop(shop: Shop): void {
    await shopsStore.selectShop(shop.id)
    this.$emit('selectShop', shop.coords_geo)
  }

  buttonClick(): void {
    this.$emit('buttonClick')
  }

  clearPhone(phone) {
    const clear = (phone) => {
      if (phone) {
        let a = phone.replace(/\D+/g, '')
        if (parseInt(a[0]) === 8) {
          a = 7 + a.slice(1)
        }
        return `+${a[0]} ${a.substring(1, 4)} ${a.substring(
          4,
          7
        )}-${a.substring(7, 9)}-${a.substring(9, 11)}`
      }
      return ''
    }

    if (phone) {
      phone = phone.replace(/\D+/g, '')
      const arr = phone.length > 11 ? phone.match(/.{1,11}/g) : [phone]
      return arr.map((p) => clear(p)).join('<br/>')
    }
    return ''
  }

  copy(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.log('Something went wrong', err)
      })
  }

  get selectedShop(): number {
    return shopsStore.selectedShopGetter
  }
}
</script>

<style lang="scss" scoped>
.shop-card {
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: $img-border-radius;
  margin-bottom: 8px;


  cursor: pointer;

  &_title {
    text-transform: uppercase;
    font-weight: 400;
    line-height: 1;
    margin-top: 8px;
    margin-bottom: 4px;
  }

  &_address {
    font-size: 15px;
  }

  &_phone {
    margin-top: 4px;
    font-size: 15px;
    span {
      color: #f5f5f8;
    }
    a {
      text-decoration: underline;
      color: #fff;
    }
    i {
      margin-left: 8px;
      color: #fff;
    }
  }

  &_work-time-title {
    margin-top: 4px;
    font-size: 15px;
    color: #f5f5f8;
  }

  &_work-time {
    font-size: 14px;
  }

  &_call-button {
    width: 100%;
    margin-top: 8px;
    border-radius: 4px;
    padding: 4px 0;
    background-color: #fff;
    text-transform: uppercase;
    color: $brand-orange-light;
    font-weight: 400;
  }

  &__selected {
    background-color: #f9a134 !important;
    &::v-deep p,
    &::v-deep span {
      color: #ffffff;
    }
  }
}



</style>
