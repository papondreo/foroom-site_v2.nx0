<template>
  <div class="ui-checkbox">
    <label>
      <input
        v-model="model"
        :value="value"
        type="checkbox"
      />
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, ModelSync, Prop } from 'nuxt-property-decorator'

@Component
export default class UiRadioButton extends Vue {
  @ModelSync('checked', 'change')
  readonly model!: boolean

  @Prop()
  readonly label!: string

  @Prop()
  readonly value!: string
}
</script>

<style lang="scss" scoped>
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  .ui-checkbox label{
    cursor: pointer;
  }
  .ui-checkbox input[type='checkbox'] {
    --active: #ffa73e;
    --active-inner: #fff;
    --focus: 2px rgba(#efa955, 0.3);
    --border: #ccc;
    --border-hover: #efa955;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 16px;
    outline: none;
    display: inline-block;
    vertical-align: sub;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
  }
  .ui-checkbox input[type='checkbox']:after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
      opacity var(--d-o, 0.2s);
  }
  .ui-checkbox input[type='checkbox']:checked {
    --b: var(--active);
    --bc: var(--active);
    --d-o: 0.3s;
    --d-t: 0.6s;
    --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }
  .ui-checkbox input[type='checkbox']:disabled {
    --b: var(--disabled);
    cursor: not-allowed;
    opacity: 0.9;
  }
  .ui-checkbox input[type='checkbox']:disabled:checked {
    --b: var(--disabled-inner);
    --bc: var(--border);
  }
  .ui-checkbox input[type='checkbox']:disabled + label {
    cursor: not-allowed;
  }
  .ui-checkbox input[type='checkbox']:hover:not(:checked):not(:disabled) {
    --bc: var(--border-hover);
  }
  .ui-checkbox input[type='checkbox']:focus {
    box-shadow: 0 0 0 var(--focus);
  }
  .ui-checkbox input[type='checkbox']:not(.switch) {
    width: 16px;
  }
  .ui-checkbox input[type='checkbox']:not(.switch):after {
    opacity: var(--o, 0);
  }
  .ui-checkbox input[type='checkbox']:not(.switch):checked {
    --o: 1;
  }
  .ui-checkbox input[type='checkbox'] + label {
    display: inline;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 4px;
    font-size: 15px;
  }

  .ui-checkbox input[type='checkbox']:not(.switch) {
    border-radius: 4px;
  }
  .ui-checkbox input[type='checkbox']:not(.switch):after {
    width: 5px;
    height: 9px;
    border: 2px solid var(--active-inner);
    border-top: 0;
    border-left: 0;
    left: 5px;
    top: 2px;
    transform: rotate(var(--r, 20deg));
  }
  .ui-checkbox input[type='checkbox']:not(.switch):checked {
    --r: 43deg;
  }
}

.ui-checkbox * {
  box-sizing: inherit;
}
.ui-checkbox *:before,
.ui-checkbox *:after {
  box-sizing: inherit;
}
</style>
