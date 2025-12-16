<template>
  <component :is="tag"><slot></slot></component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class UiTitle extends Vue {
  @Prop({ required: true })
  tag!: string
}
</script>

<style lang="scss" scoped>
.ui {
  &-title {
    &-1 {
      margin-bottom: 16px;

      font-size: 22px;
      font-weight: 400;
      text-transform: uppercase;
      color: #d38f2c;
    }
    &-2 {
      margin-bottom: 16px;

      font-size: 19px;
      font-weight: 400;
      text-transform: uppercase;
      color: #d38f2c;
    }
    &-3 {
      font-size: 16px;

      margin-bottom: 8px;
    }
    &-4 {
      font-size: 18px;

      margin-bottom: 4px;
    }
    &-5 {
      font-size: 16px;
      line-height: 1.4;

      margin-bottom: 4px;
    }
  }
}
</style>
