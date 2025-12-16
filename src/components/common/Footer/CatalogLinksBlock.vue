<template>
  <ul>
    <li>
<!--      <nuxt-link-->
<!--        :to="currentSystem.catalogUrl"-->
<!--        class="link_medium"-->
<!--        no-prefetch-->
<!--      >-->
<!--        {{ currentSystem.name }}-->
<!--      </nuxt-link>-->
    </li>
    <li
      v-for="product in products"
      :key="product.productId"
    >
      <a
        :href="getUrl(product)"
        class="ttu"
      >
        {{ product.title }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { catalogStore, systemsStore } from '@/store'
import { System } from '@/types/Systems'
import { CatalogProduct } from '@/types/Catalog'

type UrlType = 'catalog' | 'calculator'

@Component
export default class CatalogLinksBlock extends Vue {
  @Prop({ required: true })
  readonly system: string

  @Prop({ required: true })
  readonly type: UrlType

  getUrl(product: CatalogProduct): string {
    const key = this.type + 'Url'
    if (key === 'catalogUrl') {
      return product[key]
    }

    if (key === 'calculatorUrl') {
      if (product) {
        const url = product[key].split('/')
        return `/buy/${url[2]}?template=${product.productId}`
      }
    }
  }

  get currentSystem(): System {
    return systemsStore.systems.find((system: System) =>
      system.aliases.includes(this.system)
    )
  }

  get products(): CatalogProduct[] {
    return catalogStore.products
      ? catalogStore.products.filter(
          (product: CatalogProduct) => product.system === this.system
        )
      : []
  }
}
</script>

<style lang="sass" scoped>
.link_medium
  font-weight: 400
  margin-bottom: 5px

.ttu
  text-transform: uppercase
</style>
