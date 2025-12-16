<template>
  <div class="container mt-3 mb-4">
    <div class="breadcrumbs">
      <template v-for="(page, i) in breadcrumbs">
        <nuxt-link
          :to="createUrl(page.url)"
          :key="page.url"
          v-if="i < breadcrumbs.length - 1"
          class="breadcrumb__link"
        >
          {{ page.breadcrumbsTitle }}
        </nuxt-link>
        <span
          :key="`separator${page.url}`"
          v-if="i < breadcrumbs.length - 1"
          class="breadcrumb__separator"
        >
          /
        </span>
        <span
          :key="`current-page${page.url}`"
          v-else
          class="current-page"
        >
          {{ page.breadcrumbsTitle }}
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { Page } from '@/types/Page'

@Component
export default class PageBreadcrumbs extends Vue {
  @Getter('pages/breadcrumbsGetter') breadcrumbs: Page[]

  createUrl(pageUrl: string): string {
    let url = ''
    this.breadcrumbs.some((pageItem: Page) => {
      url += pageItem.url
      if (pageItem.url === pageUrl) {
        return true
      }
    })

    return url !== '/' ? url.slice(1) : url
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  font-size: 14px;
  //color: #7f828b;
}
.breadcrumb__separator {
  margin: 0 10px;
}
.breadcrumb__link {
  color: $brand-orange;
}
</style>
