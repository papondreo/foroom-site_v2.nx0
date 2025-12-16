<template>
  <section
    class="design-grid"
    style=""
  >
    <div class="container">
      <div class="row">
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
        <div class="col">
          <div></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class DesignGrid extends Vue {}
</script>

<style lang="scss" scoped>
.design-grid {
  position: fixed;
  top: 0;
  left: 12px;
  right: 12px;
  height: 100vh;
  z-index: -100;
  opacity: 0.3;

  //display: none;
}

.col {
  background: #f5f5f8;
  border-right: 1px dashed rgba(#ff0000, 0.5);

  &:last-of-type {
    border-right: none;
  }

  div {
    height: 100vh;
    background: rgba(#ff0000, 0.1);
  }
}
</style>
