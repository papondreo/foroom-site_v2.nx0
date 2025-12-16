<template>
  <div>
    <p
      v-for="param in productParams"
      :key="param.key"
    >
      <span class="ui-font-weight-200">{{ param.name }}:</span>
      {{ param.val }}
      <template v-if="['width', 'height'].includes(param.key)">
        {{ param.mes }}
      </template>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { CatalogProduct } from '@/types/Catalog'
import { catalogStore } from '@/utils/store-accessor'

@Component
export default class SimilarProductParams extends Vue {
  @Prop()
  readonly params: any

  get product(): CatalogProduct {
    return catalogStore.catalogGetter.find(
      (product: CatalogProduct) =>
        product.catalogUrl ===
        this.$route.path.split('/').slice(0, -1).join('/')
    )
  }

  get productParams() {
    return this.product.catalogParams

      .map((key) => {
        return this.params[key]
          ? {
              key,
              name: this.params[key].name,
              val: this.params[key].val,
              mes: this.params[key].mes
            }
          : null
      })
      .filter((param) => param)
  }
}
</script>

<style lang="scss" scoped></style>
