<template>
  <button
    :disabled="disabled"
    class="ui-button"
    @click="click"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class UiButton extends Vue {
  @Prop()
  disabled: boolean

  @Emit()
  click() {
    return true
  }
}
</script>

<style lang="scss" scoped>
.ui {
  &-button {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #f9a134;
    transition: 0.3s ease-in-out;
    //box-shadow: 0 10px 20px -10px rgba(#f9a134, 1);

    font-weight: 300;
    letter-spacing: 0.2px;
    color: #f5f5f5;
    &:hover {
      background-color: $brand-orange-light;
    }

    &[disabled] {
      cursor: not-allowed;
      background: #aaa;
    }

    &_border {
      background-color: #ffffff;
      color: #f9a134;
      border: 1px solid #f9a134;

      &:hover {
        color: #ffffff;
        background-color: $brand-orange-light;
        border-color: $brand-orange-light;
      }
    }
  }
}
</style>
