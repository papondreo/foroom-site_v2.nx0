<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <ui-title
      tag="h2"
      class="ui-title-2 ui-mb-2"
    >
      Схема системы {{ product.title }}
      <button
        @click="showDescription = !showDescription"
        class="ml-1 show-text"
      >
        <i class="fa fa-question-circle"></i>
      </button>
    </ui-title>

    <transition name="slide">
      <p v-if="showDescription" class="ui-mb-3">
        Ознакомьтесь со схемой полученной конструкции и подтвердите параметры Вашего изделия.<br/>
        Обращаем внимание, данные вашего предварительного заказа не являются публичной офертой.
      </p>
    </transition>

    <template v-if="productId === 'introma1'">
      <div class="col-6">
        <img class="scheme" src="/img-new/constructor/Schemes/introma-main.jpg" alt="">
      </div>

      <div class="col-6">
        <img class="scheme" :src="`/img-new/constructor/Schemes/introma-mt${template.MountType}.jpg`" alt="">
      </div>
    </template>

    <template v-else-if="productId === 'plisse1' && parseInt(template.MountType) === 4">
      <div class="col-6">
        <img class="scheme" src="/img-new/constructor/MountType/plisse_mansard_a.jpg" alt="">
      </div>

      <div class="col-6">
        <img class="scheme" src="/img-new/constructor/MountType/plisse_mansard_b.jpg" alt="">
      </div>
    </template>

    <template v-else-if="productId === 'rolo12'">
      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/rolo7/scheme1.jpeg" alt="">
      </div>

      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/rolo7/scheme2.jpeg" alt="">
      </div>
    </template>

    <template v-else-if="productId === 'wood1' && template.ControlType === 3 ">
      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/wood/scheme1-3.jpg" alt="">
      </div>

      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/wood/scheme2-3.jpg" alt="">
      </div>
    </template>

    <template v-else-if="productId === 'wood1' && template.ControlType === 5 ">
      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/wood/scheme1-5.jpg" alt="">
      </div>

      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/wood/scheme2-5.jpg" alt="">
      </div>
    </template>

    <template v-else-if="productId === 'wood1' && template.ControlType === 6 ">
      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/wood/scheme1-6.jpg" alt="">
      </div>

      <div class="col-6">
        <img class="scheme" src="https://media.foroom.ru/images/wood/scheme2-6.jpg" alt="">
      </div>
    </template>

    <template v-else>
      <div class="col-6">
        <img class="scheme" :src="'https://media.foroom.ru/images/sxems/' + product.productId + 'A.jpg'" alt="">
      </div>

      <div class="col-6">
        <img class="scheme" :src="'https://media.foroom.ru/images/sxems/' + product.productId + 'B.jpg'" alt="">
      </div>
    </template>

    <ui-title
      tag="h2"
      class="ui-title-2 ui-mt-3 ui-mb-2"
    >
      Параметры Вашего изделия
    </ui-title>

    <div class="col-12">
      <info-row
        v-for="(step, i) in calcSteps"
        :params="step.params"
        :key="i"
      />
    </div> 

    <div class="col-12 ui-mt-3">
      <div class="row">
        <div
          v-if="template.old_price"
          class="col-12"
        >
          <p class="old-price">{{ $priceSet(template.old_price) }}</p>
        </div>
        <div class="col-6">
          <p class="price-title">Цена:</p>
          <p class="price-description">за 1 изделие, без доп.услуг (замер, доставка, монтаж)</p>
        </div>
        <div class="col-6">
          <p
            :class="{ sale_price: template.old_price }"
            class="price"
          >
            {{ $priceSet(template.price) }}
          </p>
          <p
            class="sale-perc"
            v-if="template.perc"
          >
            Ваша скидка {{ template.perc }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { calculatorStore } from '@/utils/store-accessor'

import CheckParamsRow from '@/components/Constructor/ConstructorCheck/CheckParamsRow.vue'
import InfoRow from '@/components/Constructor/Steps/SystemInfo/InfoRow.vue'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: { InfoRow, CheckParamsRow }
})
export default class SystemInfo extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  mounted() {
  // console.log('template:', this.template);
  // console.log('product:', this.product);
}


  showDescription: boolean = false

  get calcSteps() {
    return calculatorStore.calcStepsGetter[this.productId].filter(
      (step) => step.inCheck
    )
  }
  get productId() {
    const { type, subtype } = calculatorStore.calculatedItem
    return type + subtype
  }
}
</script>

<style lang="scss" scoped>
.scheme {
  width: 100%;
  border-radius: 4px;
}

.old-price {
  text-decoration: line-through;
  text-align: right;
  font-size: 16px !important;
  color: #aaa;
}

.price {
  font-size: 20px;
  font-weight: 500;
  text-align: right;
  &.sale_price {
    color: #ff0000;
  }
}

.price-title {
  font-size: 20px;
  font-weight: 500;
}

.price-description {
  font-size: 14px;
  font-weight: 300;
  color: #4d4d4d;
}

.sale-perc {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  text-align: right;
  color: #ff0000;
}
</style>
