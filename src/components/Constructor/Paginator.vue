<template>
  <div class="paginator">
    <button
      v-for="(step, i) in calcSteps"
      :key="`step-${i}`"
      @click="changeStep(i)"
      :class="{
        completed: currentStep >= i,
        action: action && step.actionLabel,
        disabled: startStep && i <= startStep
      }"
      :disabled="calcProcess || error"
      class="paginator__button"
      v-tooltip.bottom="{
        content: step.tooltip,
        delay: 150,
        offset: 5,
        class: 'paginator-tooltip'
      }"
    >
      <div>
        <p class="num">{{ i + 1 }}</p>
        <p
          v-if="action && step.actionLabel"
          class="perc"
        >
          {{ action }}
        </p>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { calculatorStore } from '@/store'

@Component()
export default class Paginator extends Vue {
  error = false
  startStep = 0

  async changeStep(num) {
    if (this.currentStep !== num) {
      await calculatorStore.setCurrentStep(num)
    }
  }

  get action() {
    const materials = calculatorStore.calculatedItemMaterials

    const percents = []
    materials
      .filter((material) => material.isCurrentAction)
      .forEach((material) => {
        if (!percents.includes(material.currentActionInfo.perc)) {
          percents.push(material.currentActionInfo.perc)
        }
      })

    if (percents.length) {
      percents.sort((a, b) => a - b)
      if (percents.length > 1) {
        return (
          '-' +
          parseInt(percents[0] * 100) +
          '% -' +
          parseInt(percents[percents.length - 1] * 100) +
          '%'
        )
      }
      return '-' + parseInt(percents[0] * 100) + '%'
    }
    return false
  }

  get productId() {
    const { type, subtype } = calculatorStore.calculatedItem
    return type + subtype
  }

  get calcSteps() {
    return calculatorStore.calcStepsGetter[this.productId].filter(
      (step) => step.inPaginator
    )
  }

  get currentStep() {
    return calculatorStore.currentPaginatorStepGetter
  }

  get calcProcess() {
    return calculatorStore.calcProcessGetter
  }
}
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
}
.paginator__button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  border-radius: 5px;
  border: 1px solid $brand-orange-light;
  background: #fff;
  color: $brand-orange-light;
  font-weight: 600;
  font-size: 16px;
  margin-right: 5px;
  transition: .3s ease-in-out;

  p {
    color: $brand-orange-light;
  }
  &.action {
    width: 75px;
    border: none;
    margin-left: 1px;

    div {
      display: flex;
      align-items: center;
      background: #de0000;
      border-radius: 5px;
      transition: background 0.3s ease-in-out;
    }
    p {
      color: #ffffff;
      width: 35px;
      &.num {
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #de0000;
        color: #de0000;
        transition: background .3s ease-in-out, color .3s ease-in-out;
      }
      &.perc {
        line-height: 1;
        margin-top: 1px;
        font-size: 12px;
        color: #fff;
        margin-left: 2px;
        margin-right: 3px;
      }
    }
    &:hover,
    &.completed {
      .num {
        background: #de0000;
        color: #fff;
      }
      div {
        background: #ff3c3f;
      }
    }
  }
  &.completed {
    background: $brand-orange-light;
    color: #fff !important;
    p {
      color: #fff !important;
    }
  }
  &:hover {
    background: $brand-orange;
    border-color: $brand-orange;
    color: #fff;
    p {
      color: #fff;
    }
  }
  &:last-of-type {
    margin-right: 0;
  }
}
img {
  position: absolute;
  top: -5px;
  left: -6px;
  width: 27px;
}
@media screen and (max-width: $colLg) {
  .paginator {
    margin-top: 0 !important;
    margin-bottom: 12px !important;
    justify-content: flex-start;
  }
}

@media screen and (max-width: $colSm) {
  .paginator {
    justify-content: flex-start;
  }
}
</style>
