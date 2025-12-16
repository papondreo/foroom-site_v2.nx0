<template>
  <div>
    <p v-for="param in productParams" :key="param.alias">
      <span class="ui-font-weight-200">{{ param.name }}:</span>
      {{ param.val }} {{ param.mes }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { CatalogProduct } from "@/types/Catalog";
import { calculatorStore, catalogStore } from "@/utils/store-accessor";

@Component
export default class ProductParams extends Vue {
  get product(): CatalogProduct {
    let fullPath =
      this.$route.path[this.$route.path.length - 1] === "/"
        ? this.$route.path.trim().slice(0, -1)
        : this.$route.path;
    return catalogStore.catalogGetter.find(
      (product: CatalogProduct) => product.catalogUrl === fullPath
    );
  }

  get productParams() {
    const params = calculatorStore.calculatedItemRusGetter;
    return this.product.catalogParams
      .map((key) => {
        return params![key] ? params![key] : null;
      })
      .filter((param) => param);
  }
}
</script>

<style lang="scss" scoped></style>
