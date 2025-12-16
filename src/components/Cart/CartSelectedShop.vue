<template>
  <div class="check">
    <div class="check-wrapper">
      <header>
        <p class="title">Магазин</p>
        <button @click="$emit('setStep')">выбрать другой</button>
      </header>

      <p class="shop-title">{{ selectedShop.name }}</p>
      <p class="ui-mb-2">{{ selectedShop.city }}, {{ selectedShop.address }}</p>
      <p class="shop-card_phone">
        <span>Телефон:</span>
        <a
          :href="`tel:${clearPhone(selectedShop.phones[0])}`"
          class="ui-link ui-link_orange phone-link"
          title="Позвонить"
        >
          {{ clearPhone(selectedShop.phones[0]) }}
        </a>
        <button
          class="copy ui-ml-1"
          @click.stop="copy(clearPhone(selectedShop.phones[0]))"
          title="Копировать"
        >
          <i class="fa fa-copy"></i>
        </button>
      </p>

      <shop-schedule
        class="ui-text-left ui-mt-2"
        :schedule="selectedShop.schedule_json"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { shopsStore } from "@/utils/store-accessor";
import { Shop } from "@/types/Shops/Shop";
import UiButton from '@/components/UI/UI-Button.vue'
import ShopSchedule from "@/components/common/Shops/ShopSchedule.vue";

@Component({
  components: { ShopSchedule, UiButton }
})
export default class CartSelectedShop extends Vue {
  get selectedShop(): Shop {
    return shopsStore.selectedShopGetter
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

.shop-title {
  font-size: 18px;
  font-weight: 400;
}
.shop-card_phone span {
  font-weight: 400;
}
</style>
