<template>
  <div class="ui-checkbox">
    <input
      v-model="model"
      :value="value"
      type="radio"
      :id="value"
    />
    <label :for="value">
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, ModelSync, Prop } from 'nuxt-property-decorator'

@Component
export default class UiCheckbox extends Vue {
  @ModelSync('checked', 'change', { type: String | Number })
  readonly model!: string

  @Prop()
  readonly label!: string

  @Prop()
  readonly value!: string
}
</script>

<style lang="scss" scoped></style>
