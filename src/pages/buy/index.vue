<template>
  <main class="container">
    <ui-title tag="h1" class="ui-title-1 ui-text-uppercase">
      Жалюзи на заказ
    </ui-title>

    <div class="row">
      <aside class="d-none d-lg-block col-lg-3 col-xl-2 ui-sticky">
        <products-filter
          :filter-by="filterBy"
          :products="systems"
          v-model="filteredSystems"
          ref="productsFilter"
          class="pt-0 ui-sticky"
        />
      </aside>

      <section class="col-lg-9 col-xl-10">
        <showcase
          :products="filteredSystems"
          @reset-filter="$refs.productsFilter.resetFilter()"
        />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import ProductsFilter from "@/components/common/ProductsFilter.vue";
import { Showcase } from "@/types/Showcase/Showcase";

import { showcaseStore } from "@/store";

@Component({
  components: { ProductsFilter },
})
export default class ConstructorPage extends Vue {
  head() {
    return {
      title: "Жалюзи на заказ - изготовление жалюзи на пластиковые окна",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Жалюзи на заказ - изготовление жалюзи на пластиковые окна – купить в интернет-магазине FOROOM. Доступные цены. Недорого. Широкий ассортимент. Свое производство. Гарантия. Быстрая доставка. Успейте заказать онлайн!",
        },
      ],
    };
  }

  filteredSystems: Showcase[] | null = null;
  filterBy = ["systemType"];

  async asyncData() {
    if (!showcaseStore.showcase) {
      await showcaseStore.getShowcase();
    }
  }

  created() {
    this.filteredSystems = this.systems;
  }

  get systems() {
    return showcaseStore.showcaseGetter;  //Берутся карточки жалюзи
  }
}
</script>
