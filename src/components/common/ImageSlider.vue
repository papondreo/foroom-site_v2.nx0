<template>
  <div class="slider">Слайдер</div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ImageSlider extends Vue {}
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 300px;
  margin-bottom: 24px;

  background: #f5f5f8;
  border-radius: 8px;

  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
}
</style>
