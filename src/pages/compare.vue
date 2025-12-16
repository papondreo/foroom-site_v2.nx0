<template>
  <main class="container">
    <ui-title tag="h1" class="ui-title-1">
      {{ page.h1 }}
    </ui-title>
    <div class="row" v-if="products && products.length">
      <div class="col-sm-2" v-for="product in products" :key="product.productId">
        <compare-card :product="product" />
      </div>
    </div>
    <p v-else>
      Добавьте изделия для сравнения в
      <nuxt-link to="/catalog" class="link">Каталоге</nuxt-link>
    </p>
  </main>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from "nuxt-property-decorator";
import CompareCard from "@/components/Compare/CompareCard.vue";

import { catalogStore, compareProductsStore, pagesStore } from "@/store";
import { CatalogProduct } from "@/types/Catalog";

@Component({
  components: { CompareCard },
})
export default class ComparePage extends Vue {
  head() {
    return {
      title:
        "Хотите увидеть наглядное отличие рулонных штор GRANDE и GRANDE MAX? Добавьте изделия для сравнения в каталоге.",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Онлайн-сравнение рулонных штор поможет подобрать изделие, которое подходит под ваши задачи и дизайн окружающего интерьера. ",
        },
      ],
    };
  }

  readonly paramsMap = [
    "InstallPlace",
    "MountType",
    "HasBox",
    "maxWidth",
    "ControlDevice",
    // 'advantages'
  ];

  get page() {
    return pagesStore.currentPageGetter;
  }

  get comparedProducts() {
    const products = compareProductsStore.comparedProductsGetter;

    return Object.keys(products)
      .map((key) => ({
        ...products[key],
        view: products[key].view,
      }))
      .filter((product) => product.view);
  }

  get products() {
    const products: CatalogProduct = catalogStore.catalogGetter;

    return this.comparedProducts.map((product) => {
      const id = product.productId;
      const {
        productAdvantages,
        img,
        title,
        systemName,
        system,
        calculatorUrl,
      }: CatalogProduct = products.find((item) => item.productId === id);

      const params = this.paramsMap.map((paramKey) => {
        const options = product.params[paramKey]
          ? Object.values(product.params[paramKey].options).map((opt) => opt.name)
          : null;

        const name = product.params[paramKey] ? product.params[paramKey].name : null;

        return { paramKey, name, options };
      });

      return {
        productId: id,
        img,
        title,
        systemName,
        system,
        calculatorUrl,
        productAdvantages,
        params,
      };
    });
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

.link {
  text-decoration: underline;
  color: #d38f2c;

  &:hover {
    text-decoration: none;
  }
}
</style>
