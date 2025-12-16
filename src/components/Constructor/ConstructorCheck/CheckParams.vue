<template>
  <div>

<!--
    <div
      v-for="(step, i) in calcSteps"
      :key="i"
    >
      <p v-if="i">Шаг {{ i }}</p>
      <check-params-row :params="step.params" />
    </div>
-->
    <p class="ui-mt-3 d-flex justify-content-between">
      <span>
        Изделие:
        <span class="product-title">{{ product.title }}</span>
      </span>
      <span
        class="ui-link ui-link_orange ui-ml-1 cursor-pointer"
        @click="showParams"
      >
        Просмотр всех параметров вашего изделия
      </span>
    </p>

    <p
      v-if="product.system === 'rolo' && step >= 4"
      class="ui-mt-1"
    >
      Раскрой ткани:
      <a href="https://sale.foroom.ru/adv_uploads/rotateMaterial.pdf" target="_blank" class="ui-link">{{ materialCalc }}</a>
    </p>
    <p class="ui-mt-1">
      <i
        class="fa fa-info-circle"
        v-tooltip.left="{
          content: 'за 1 изделие, без доп. услуг (замер, доставка, монтаж)',
          delay: 150,
          offset: 5,
          class: 'paginator-tooltip'
        }"
      ></i>
      Цена:
      <span style="font-weight: 400; font-size: 20px">
        {{ $priceSet(template.price) }} ₽
      </span>
      <span
        v-if="template.old_price"
        style="font-weight: 300; text-decoration: line-through"
      >
        {{ $priceSet(template.old_price) }} ₽
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CheckParamsRow from '@/components/Constructor/ConstructorCheck/CheckParamsRow.vue'
import { calculatorStore, catalogStore, siteComponentStatesStore } from "@/store";
import CheckParamsModal from '@/components/Constructor/ConstructorCheck/Modals/CheckParamsModal.vue'

@Component({
  components: { CheckParamsModal, CheckParamsRow }
})
export default class CheckParams extends Vue {
  public params = false
  showParams() {
    siteComponentStatesStore.setCheckParamsModal(true)
  }

  get template() {
    return calculatorStore.calculatedItemGetter
  }
  get calcSteps() {
    return calculatorStore.calcStepsGetter[this.productId].filter(
      (step) => step.inCheck
    )
  }
  get product() {
    return catalogStore.catalogGetter.find(
      (item) => item.productId === this.productId
    )
  }
  get productId() {
    const { type, subtype } = calculatorStore.calculatedItem
    return type + subtype
  }

  get materialCalc() {
    return calculatorStore.calculatedItemRusGetter['MaterialCalc'].val
  }

  get step() {
    return calculatorStore.currentPaginatorStepGetter
  }
}
</script>

<style lang="scss" scoped>
.product-title {
  text-transform: uppercase;
  font-weight: 400;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
