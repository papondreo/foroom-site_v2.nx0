<template>
  <section>
    <div
      v-for="systemType in systemTypes"
      :key="systemType.id"
      class="row"
    >
      <div
        v-for="attachmentPoint in attachmentPoints"
        :key="attachmentPoint.id"
        class="col-12"
      >
        <ui-title
          v-if="
            getCatalogProducts(systemType.systems, attachmentPoint.value).length
          "
          tag="h2"
          class="ui-title-2"
        >
          <template v-if="!systemType.systems.includes('karniz')">
            {{ attachmentPoint.fullName }}
          </template>
          <template v-else>{{ systemType.name }}</template>
        </ui-title>

        <div class="row">
          <product-card
            v-for="product in getCatalogProducts(
              systemType.systems,
              attachmentPoint.value
            )"
            :key="product.productId"
            :product="product"
            class="col-xl-2 col-md-3 col-sm-4 col-6 product"
          />
        </div>
      </div>
    </div>

    <ui-empty
      message="Не найдено ни одной системы"
      v-if="false"
    >
      <ui-button
        class="ui-mt-3"
        @click="resetFilter()"
      >
        Очистить параметры фильтра
      </ui-button>
    </ui-empty>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Getter, Emit, Prop } from "nuxt-property-decorator";
import UiEmpty from '@/components/UI/UI-Empty.vue'
import UiButton from '@/components/UI/UI-Button.vue'
import ProductCard from '@/components/Catalog/ProductCard.vue'
import { AttachmentPoint } from '@/types/Systems'
import { CatalogProduct } from '@/types/Catalog'
@Component({
  components: { ProductCard, UiEmpty, UiButton }
})
export default class Products extends Vue {
  @Getter('systems/systemTypesGetter') systemTypes
  @Getter('systems/attachmentPointsGetter') attachmentPoints: AttachmentPoint[]
  @Getter('catalog/catalogGetter') catalogProducts: CatalogProduct[]

  @Prop()
  products

  @Emit()
  resetFilter() {
    return true
  }

  getCatalogProducts(systems, attachmentPoint) {
    return this.products.filter(
      (product) =>
        product.attachmentPoint === attachmentPoint &&
        systems.includes(product.system)
    )
  }

  productsFilter(arr: string[]) {
    return this.catalogProducts.filter((product) =>
      arr.includes(product.system)
    )
  }
}
</script>

<style lang="scss" scoped>
.product {
  margin-bottom: 36px;
}
@media only screen and (min-width: 1199px) {
  .product {
    width: 20% !important;
  }
}
</style>
