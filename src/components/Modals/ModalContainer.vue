<template>
  <div>
    <slot />
    <div
      class="overlay"
      @click="$emit('close')"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class ModalContainer extends Vue {
  // @Prop()
  // style: object
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.6);

  z-index: 9998;
}
</style>
