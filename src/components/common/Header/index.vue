<template>
  <header class="container">
    <div class="row header-top-line d-none d-xl-flex">
      <top-navigation class="col-md-12 col-xl-8 d-none d-xl-block" />

      <nearest-shop class="col-md-12 col-xl-4 d-none d-xl-block" />
    </div>

    <main-header class="row" />

    <div
      v-if="$route.path.split('/')[1] !== 'buy'"
      class="row"
    >
      <div class="col-12 d-none d-xl-block">
        <systems-navigation />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TopNavigation from '@/components/common/Header/TopNavigation.vue'
import NearestShop from '@/components/common/Header/NearestShop.vue'
import SystemsNavigation from '@/components/common/Header/SystemsNavigation/index.vue'
import MainHeader from '@/components/common/Header/MainHeader.vue'

@Component({
  components: { MainHeader, SystemsNavigation, TopNavigation, NearestShop }
})
export default class PageHeader extends Vue {}
</script>

<style lang="scss" scoped>
.header-top-line {
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;

  z-index: 9;
}
</style>
