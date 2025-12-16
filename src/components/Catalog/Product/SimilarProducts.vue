<template>
  <section v-if="products && products.length">
    <ui-title tag="h2" class="ui-title-1"> Смотрите также </ui-title>

    <div class="row">
      <similar-product-card
        class="col-xl-2 col-md-3 col-sm-4 col-6"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { catalogStore } from "@/store";

import SimilarProductCard from "@/components/Catalog/Product/SimilarProductCard.vue";

@Component({
  components: { SimilarProductCard }
})
export default class SimilarProducts extends Vue {
  @Prop({ required: true })
  readonly productId: string;

  get products() {
    return catalogStore.catalogSimilarProductsGetter(this.productId);
  }
}
</script>

<style lang="scss" scoped></style>
