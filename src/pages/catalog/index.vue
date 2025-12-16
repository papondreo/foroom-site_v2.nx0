<template>
  <main class="container">
    <ui-title tag="h1" class="ui-title-1 ui-text-uppercase"> Жалюзи на окна </ui-title>

    <div class="row">
      <aside class="d-none d-lg-block col-lg-3 col-xl-2 ui-sticky">
        <div ref="productsFilter" class="pt-0 ui-sticky">
          <catalog-products-filter
            :products="products"
            v-model="filteredProducts"
            ref="productsFilter"
            class="ui-sticky"
          />

          <p v-if="compareCount">
            Сравнить изделия:
            <nuxt-link to="/compare" class="ui-link ui-link_orange">{{
              compareCount
            }}</nuxt-link>
          </p>
        </div>
      </aside>

      <products
        :products="filteredProducts"
        class="col-lg-9 col-xl-10"
        @resetFilter="resetFilter"
      />
    </div>

    <div class="row">
      <download-catalogs />
      <foroom-vr />
      <foroom-ar-app />
      <catalog-seo-text class="ui-mt-5" />
      <callback-promo-block class="ui-mt-5" />
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import PageComponent from "@/components/PageComponent.vue";
import { calculatorStore, catalogStore, compareProductsStore, oneClickProductsStore } from "@/store";
import { productsStore } from "@/store";
import Products from "@/components/Catalog/Products.vue";
import DownloadCatalogs from "@/components/Catalog/DownloadCatalogs.vue";
import CatalogProductsFilter from "@/components/Catalog/CatalogProductsFilter.vue";
import ForoomVr from "@/components/Catalog/ForoomVr.vue";
import ForoomArApp from "@/components/Catalog/ForoomArApp.vue";
import CatalogSeoText from "@/components/Catalog/CatalogSeoText.vue";
// import PromoBlock from "@/components/common/PromoBlock.vue";
import CallbackPromoBlock from "@/components/common/Promo/CallbackPromoBlock.vue";

@Component({
  components: {
    CallbackPromoBlock,
    CatalogSeoText,
    ForoomArApp,
    ForoomVr,
    CatalogProductsFilter,
    DownloadCatalogs,
    Products,
    PageComponent,
  },
})
export default class CatalogPage extends Vue {
  filteredProducts = [];

  filterBy = ["attachmentPoint"];
  head() {
    return {
      title: "Жалюзи на окна - купить жалюзи от производителя, каталог с ценами",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Жалюзи на окна - купить тканевые жалюзи на пластиковые окна по доступным ценам производителя в интернет-магазине FOROOM. Недорого. Большой каталог солнцезащитных систем. Гарантия на изделия. Быстрая доставка. Заказывайте!",
        },
      ],
    };
  }
  created() {
    this.filteredProducts = this.products;
  }

  async asyncData() {

    
    if (!catalogStore.products) {
      await catalogStore.getCatalog();
    }


    if (!catalogStore.productsSEO) {
      await catalogStore.getProductsSEO();
    }

    if (!productsStore.products) {
      await productsStore.getProducts();
    }

    if (!calculatorStore.templates) {
      await calculatorStore.getTemplates();
    }
  }

  resetFilter() {
    return;
  }

  get products() {
    return catalogStore.catalogGetter;
  }

  get compareCount() {
    return compareProductsStore.comparedProductsGetter
      ? Object.values(compareProductsStore.comparedProductsGetter).filter((c) => c.view)
          .length
      : null;
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}
</style>
