<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div class="col-12 text-right ui-mb-3">
      <ui-checkbox
        v-if="!inCart"
        v-model="confirm"
      >
        Я проверил(а), всё верно
      </ui-checkbox>
      <button
        v-else
        class="ui-link ui-link_orange"
        @click="toSizes"
      >
        Добавить такое же изделие
        <span class="ui-text-uppercase">{{ product.title }}</span>
        с другими размерами
      </button>
    </div>
    <div class="col-6">
      <ui-button
        class="ui-button_border"
        @click="backward"
      >
        <i class="fa fa-angle-left ui-mr-1"></i> Назад
      </ui-button>
    </div>
    <div class="col-6 text-right">
      <ui-button
        v-if="!inCart"
        @click="addToCart()"
        :disabled="confirmError && !confirm"
      >
        Добавить в корзину
      </ui-button>
      <div v-else>
        <nuxt-link
          to="/order"
          class="ui-button mb-2"
        >
          Перейти в корзину
        </nuxt-link>
        <p class="in-cart">Изделие добавлено в корзину</p>
      </div>
    </div>
    <div
      v-if="confirmError && !confirm"
      class="col-12 ui-mt-1"
    >
      <p class="confirm-error">
        {{ confirmError }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { calculatorStore, cartStore } from '@/utils/store-accessor'

import UiCheckbox from '@/components/UI/UI-Checkbox.vue'
import UiButton from '@/components/UI/UI-Button.vue'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: { UiButton, UiCheckbox }
})
export default class OrderConfirm extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  inCart: boolean = false
  confirm: boolean = false
  confirmError = null

  async backward() {
    const step = this.currentStep - 1
    await calculatorStore.setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  async toSizes() {
    await calculatorStore.setCurrentStep(this.sizesStep)
    window.scrollTo(0, 0)
  }

  async addToCart() {
    this.confirmError = null
    if (!this.confirm) {
      this.confirmError = 'Подтвердите параметры Вашего изделия'
      return false
    }

    const order = {
      ...this.template,
      window_img: this.product.windowImg,
      izd_ico: 'https://media.foroom.ru/' + this.prvImg,
      material_ico: 'https://media.foroom.ru/' + this.materialImg,
      color_ico: 'https://media.foroom.ru/2012/images/null.png',
      wall_ico: 'https://media.foroom.ru/2012/images/null.png',
      lambr_ico: 'https://media.foroom.ru/2012/images/null.png',
      aspMatt: '',
      amount: 1,
      aspTName: this.product.systemName
    }

    await cartStore.updateCart({
      item: order,
      itemRus: calculatorStore.calculatedItemRusGetter
    })

    this.inCart = true
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    localStorage.setItem('cartItemsParams', JSON.stringify(this.cartItemsRus))

    this.$saleForoomCounter('addbusket')
    this.$yandexMetrika.reachGoal('NF_addToCart');
  }

  get cartItems() {
    return cartStore.cartItemsGetter
  }

  get cartItemsRus() {
    return cartStore.cartItemsRusGetter
  }

  get material() {
    return calculatorStore.calculatedItemMaterialsGetter?.find(
      (material) => material.tid === this.template.material
    )
  }

  get prvImg() {
    const pic =
      this.template.MaterialCalc == 2
        ? this.material.img.prv2
        : this.material.img.prv1
    if (pic === '0.jpg') {
      return this.material.img.prv2
    }
    return pic
  }

  get materialImg() {
    const pic =
      this.template.MaterialCalc == 2
        ? this.material.img.ico2
        : this.material.img.ico1
    if (pic === '0.jpg') {
      return this.material.img.ico2
    }
    return pic
  }

  get currentStep() {
    return calculatorStore.currentPaginatorStepGetter
  }

  get sizesStep() {
    return calculatorStore.calcStepsGetter[this.product.productId]
      .filter((step) => step.inPaginator)
      .findIndex((step) => step.params.includes('sizes'))
  }
}
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}
.confirm-error {
  text-align: right;
  color: #de1000;
}
.in-cart {
  color: #818181;
  font-weight: 200;
}
</style>
