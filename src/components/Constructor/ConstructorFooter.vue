<template>
  <footer
    v-if="currentStep < calcSteps.length - 1"
    class="constructor-footer row"
  >
    <div class="col-6">
      <ui-button
        v-if="currentStep > 0"
        class="ui-button_border"
        @click="backward"
      >
        <i class="fa fa-angle-left ui-mr-1"></i> Назад
      </ui-button>
    </div>
    <div class="col-6 ui-text-right">
      <ui-button
        class="ui-button"
        @click="next"
      >
        Продолжить <i class="fa fa-angle-right ui-ml-1"></i>
      </ui-button>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import UiButton from '@/components/UI/UI-Button.vue'

import { calculatorStore } from '@/store'

@Component({
  components: { UiButton }
})
export default class ConstructorFooter extends Vue {
  async backward() {
    const step = this.currentStep - 1
    await calculatorStore.setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  async next() {
    const step = this.currentStep + 1
    await calculatorStore.setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  get productId() {
    if (calculatorStore.calculatedItem) {
      const { type, subtype } = calculatorStore.calculatedItem
      return type + subtype
    }
    return false
  }

  get currentStep() {
    return calculatorStore.currentPaginatorStepGetter
  }

  get calcSteps() {
    return calculatorStore.calcStepsGetter[this.productId].filter(
      (step) => step.inPaginator
    )
  }
}
</script>

<style lang="scss" scoped>
.constructor-footer {
  display: flex;
  justify-content: space-between;
}
</style>
