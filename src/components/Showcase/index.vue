<template>
  <div>
    <!--    <pre>{{ products }}</pre>-->
    <div
      v-for="type in systemTypes"
      :key="type.name"
      v-show="productsFilter(type.systems).length"
      class="showcase row mb-3"
    >
      <div class="col-12">
        <ui-title
          tag="h2"
          class="ui-title-2"
        >
          {{ type.name }}
        </ui-title>
      </div>
      <showcase-card
        v-for="product in productsFilter(type.systems)"
        :key="product.id"
        :product="product"
        class="col-xl-2 col-md-3 col-sm-4 col-6 product"
      />
    </div>

    <ui-empty
      message="Не найдено ни одной системы"
      v-if="!products.length"
    >
      <ui-button
        class="ui-mt-3"
        @click="resetFilter()"
      >
        Очистить параметры фильтра
      </ui-button>
    </ui-empty>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Getter, Prop, Emit } from 'nuxt-property-decorator'
import UiEmpty from '@/components/UI/UI-Empty.vue'
import UiButton from '@/components/UI/UI-Button.vue'
import ProductsFilter from '@/components/common/ProductsFilter.vue'
import ShowcaseCard from '@/components/Showcase/ShowcaseCard.vue'

@Component({
  components: { UiEmpty, UiButton, ShowcaseCard, ProductsFilter }
})
export default class Showcase extends Vue {
  @Getter('systems/systemTypesGetter') systemTypes

  @Prop()
  readonly products: any[]

  @Emit()
  resetFilter() {
    return true
  }

  productsFilter(arr: string[]) {
    return this.products
      ? this.products.filter((product) => arr.includes(product.systemType))
      : []
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 1199px) {
  .product {
    width: 20% !important;
  }
}
</style>
