<template>
  <div class="ui-empty">
    <p class="ui-empty-message">
      {{ message }}
    </p>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class UiEmpty extends Vue {
  @Prop()
  message!: string
}
</script>

<style lang="scss" scoped>
.ui-empty {
  padding: 48px 16px;

  text-align: center;

  &-message {
    font-size: 18px;
  }
}
</style>
