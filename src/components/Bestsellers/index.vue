<template>
  <div>
    <div
      v-for="point in attachmentPoints"
      :key="point.value"
      class="row"
    >
      <div
        class="col-12"
        v-if="productsFilter(point.value) && productsFilter(point.value).length"
      >
        <ui-title
          tag="h2"
          class="ui-title-2 ui-text-uppercase"
        >
          {{ point.fullName }}
        </ui-title>
      </div>

      <div
        class="col-xl-2 col-md-3 col-sm-4 col-6 bestseller"
        v-for="item in productsFilter(point.value)"
        :key="item.id"
      >
        <bestseller-card :bestseller="item" />
      </div>
    </div>

    <ui-empty
      message="Не найдено ни одной системы"
      v-if="!products || !products.length"
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
import BestsellerCard from '@/components/Bestsellers/BestsellerCard.vue'
import ProductsFilter from '@/components/common/ProductsFilter.vue'
import UiEmpty from '@/components/UI/UI-Empty.vue'
import UiButton from '@/components/UI/UI-Button.vue'

@Component({
  components: { UiEmpty, UiButton, BestsellerCard, ProductsFilter }
})
export default class Bestsellers extends Vue {
  @Getter('systems/attachmentPointsGetter') attachmentPoints

  @Prop()
  readonly products: any[]

  @Emit()
  resetFilter() {
    return true
  }

  productsFilter(value) {
    return this.products
      ? this.products.filter((b) => b.attachmentPoint === value)
      : []
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 1199px) {
  .bestseller {
    width: 20% !important;
  }
}
</style>
