<template>
  <nav class="top-navigation">
    <nuxt-link
      v-for="page in pages"
      :key="page.url"
      :to="page.url"
      active-class="active"
    >
      {{ page.menuTitle }}
      <span
        v-if="page.url === '/compare' && compareCount"
        class="compare-count"
      >
        {{ compareCount }}
      </span>
    </nuxt-link>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { compareProductsStore, pagesStore } from "@/utils/store-accessor";
import { Page } from '@/types/Page'

@Component({})
export default class TopNavigation extends Vue {
  get pages(): Page[] {
    return pagesStore.pages
      ? pagesStore.pages.filter((page: Page) => page.showInMenu)
      : []
  }
  get compareCount() {
    return compareProductsStore.comparedProductsGetter
      ? Object.values(compareProductsStore.comparedProductsGetter).filter(c => c.view).length
      : null
  }
}
</script>

<style lang="scss" scoped>
.top-navigation {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  a {
    margin-left: 20px;
    font-size: 14px;
    letter-spacing: 0.2px;
    color: #4d4d4d;

    transition: color 0.3s ease-in-out;
    &:hover,
    &.active {
      color: $brand-orange-light;
    }

    &:first-of-type {
      margin-left: 0;
    }
  }

  .compare-count {
    display: inline-block;
    width: 19px;
    height: 19px;
    background: $brand-orange-light;
    text-align: center;
    color: #f5f5f5;
    border-radius: 10px;
  }
}
</style>
