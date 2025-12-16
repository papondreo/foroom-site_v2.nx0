<template>
  <div v-if="productId && calcSteps && currentStep">
    <div class="col">
      <div class="row">
        <paginator class="col-12" style="margin-top: -48px;" />
      </div>
      <div class="row">
        <div
          v-for="component in currentStep.components"
          :key="component.name"
          class="col-12"
        >
          <constructor-component :component-data="component" />
        </div>
        <div class="col-12 ui-mt-4">
          <constructor-footer />
        </div>
      </div>
    </div>
    <div
      class="col-md-5 ui-sticky check-cons"
      :class="{ show: showConsCheck }"
      style="margin-top: -48px"
    >
      <constructor-check class="ui-sticky" style="top: 12px" />
    </div>

    <div class="show-check" @click="showCheck">
      <i class="fa fa-angle-left" v-if="!showConsCheck"></i>
      <span> параметры изделия </span>
      <i class="fa fa-angle-right" v-if="showConsCheck"></i>
    </div>
  </div>
  <div v-else>
    <p>Загрузка данных...</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { calculatorStore } from '@/store'
import Paginator from '@/components/Constructor/Paginator.vue'
import ConstructorComponent from '@/components/Constructor/ConstructorComponent.vue'
import ConstructorCheck from '@/components/Constructor/ConstructorCheck/ConstructorCheck.vue'
import ConstructorFooter from '@/components/Constructor/ConstructorFooter.vue'

@Component({
  components: {
    ConstructorFooter,
    ConstructorCheck,
    ConstructorComponent,
    Paginator
  }
})
export default class ConstructorContainer extends Vue {
  @Prop({ required: true })
  system!: string

  showConsCheck = false

  showCheck() {
    this.showConsCheck = !this.showConsCheck
  }

  get calcSteps() {
  if (calculatorStore.calcStepsGetter) {
    // console.log("calcSteps для текущего изделия:", this.productId, calculatorStore.calcStepsGetter[this.productId]);
    return calculatorStore.calcStepsGetter[this.productId]?.filter(
      (step) => step.inPaginator
    );
  }
  return null;
}



  get productId() {
    // console.log(" productId:", calculatorStore.calculatedItem)
    if (calculatorStore.calculatedItem) {
      const { type, subtype } = calculatorStore.calculatedItem
      return type + subtype
    }
    console.warn("⚠ Нет calculatedItem, productId = false")
    return false
  }

  get currentStep() {
  // console.log("currentStep:", this.calcSteps[this.currentStepNumber]);
  return this.calcSteps[this.currentStepNumber];
}

  get currentStepNumber() {
    return calculatorStore.currentPaginatorStepGetter
  }


}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}

.show-check {
  display: none;
}

@media screen and (max-width: $colMd) {
  .check-cons {
    width: 400px;
    margin-top: 0 !important;
    top: 0;
    position: fixed;
    background: #fff;
    bottom: 0;
    right: -400px;
    padding: 16px;
    z-index: 999;
    transition: right 0.3s ease-in-out;

    &.show {
      right: 0;
    }
  }

  .show-check {
    display: flex;
    align-items: center;
    position: fixed;
    padding: 12px;
    right: 0;
    top: 340px;
    width: 140px;
    background: #f9a134;
    z-index: 999;
    border-radius: 4px 0 0 4px;
    line-height: 1.2;
    color: #fff;
    text-align: right;
    text-transform: uppercase;
    box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
    cursor: pointer;
    i {
      font-size: 20px;
      margin-right: 8px;
      margin-left: 8px;
    }

  }
}
</style>
