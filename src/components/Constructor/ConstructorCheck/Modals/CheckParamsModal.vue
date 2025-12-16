<template>
  <div>
    <div
      class="overlay"
      @click="closeModal"
    ></div>
    <div class="params-modal">
      <div class="row m-0">
        <div class="col-12">
          <button
            class="close-button"
            @click="closeModal"
          >
            Закрыть
          </button>

          <ui-title
            tag="h2"
            class="ui-title-2 ui-mt-3 ui-mb-2"
          >
            Параметры Вашего изделия
          </ui-title>

          <p class="action-desc">Вы выбрали</p>
          <div
            v-for="(step, i) in calcSteps"
            :key="i"
          >
            <p class="action-desc moved" v-if="currentStep === i -2">Вам осталось выбрать</p>
            <p class="step-title" v-if="i > 0">Шаг {{ i }}</p>
            <info-row
              class="block"
              :class="{ activeBlock: currentStep >= i-1 }"
              :params="step.params"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from 'nuxt-property-decorator'
import {
  calculatorStore,
  siteComponentStatesStore
} from '@/utils/store-accessor'
import InfoRow from '@/components/Constructor/Steps/SystemInfo/InfoRow.vue'
@Component({
  components: { InfoRow }
})
export default class CheckParamsModal extends Vue {
  closeModal() {
    siteComponentStatesStore.setCheckParamsModal(false)
  }

  get calcSteps() {
    return calculatorStore.calcStepsGetter[this.productId].filter(
      (step) => step.inCheck
    )
  }
  get productId() {
    const { type, subtype } = calculatorStore.calculatedItem
    return type + subtype
  }

  get currentStep() {
    return calculatorStore.currentPaginatorStepGetter
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10000;
  cursor: pointer;
}
.params-modal {
  position: fixed;
  width: 90%;
  max-width: 500px;
  //min-height: 450px;
  height: fit-content;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 5px;
  background: #fff;
  z-index: 10001;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.25);

  .step-title {
    margin-top: 8px;
    margin-left: 12px;
    font-weight: 400;
  }
  .block {
    background: #f5f5f8;
  }

  .row {
    height: 100%;
  }

  .action-desc {
    text-transform: uppercase;
    text-align: center;
    font-weight: 500;

    &.moved {
      margin-top: 8px;
      margin-bottom: -8px;
    }
  }
  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
  }
}
::v-deep .activeBlock {
  background: #fedab9 !important;
}
</style>
