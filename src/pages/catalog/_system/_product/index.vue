<template>
  <main class="container">
    <div class="row">
      <product-images
        :images="product.productImages"
        :seo="product.imagesSeoText"
        class="col-sm-6"
      />
      <div class="col-sm-6">
        <div class="row">
          <div class="col-12">
            <ui-title tag="h1" class="ui-title-1 mb-1">
              {{ product.systemName }}
            </ui-title>

            <p style="text-transform: uppercase" class="mb-4">{{ product.title }}</p>
          </div>

          <div v-if="!calcProcess && calculatedItem" class="col-12">
            <product-price
              :price="calculatedItem.price"
              :old-price="calculatedItem.old_price"
            />

            <product-params />
          </div>
        </div>

        <installation-info
          :product="product"
          :links="product.measure"
          :installation-page-url="product.setupUrl"
          class="col-12"
        />

        <order-buttons
          v-if="calculatedItem"
          calculator-url=""
          class="col-12 ui-mt-6"
          :product="product"
          :width="calculatedItem.width"
          :height="calculatedItem.height"
        />
      </div>

      <div class="col-sm-12" v-if="product.system === 'Gwood'">
        <button class="img-new" @click="toggleRequestModal()">
          <img src="@/static/img-new/моторизация-в-подарок.png" alt="моторизация-в-подарок" />
        </button>
        <div class="toggle-block">
          <button class="toggle-button" @click="isOpen = !isOpen">
            <span class="arrow-icon">➔</span>
            <span class="wave-text">Условия акции «МОТОРИЗАЦИЯ В ПОДАРОК»</span>

          </button>

          <ul v-if="isOpen" class="toggle-content">
            <li>Уважаемые покупатели, мы запускаем акцию «Моторизация в подарок».</li>
            <li>Условия акции:</li>
            <li>Разместите заказ на 4 или более изделий G-FORM WOOD 50 (от 1 м² каждое) и получите:</li>
            <li>1 привод 6/18, 220V в подарок на первую моторизацию!</li>
            <li>Дополнительная скидка на остальные приводы:</li>
            <li>10% – если моторизируете часть изделий в заказе.</li>
            <li>20% – если моторизируете все изделия в заказе!</li>
            <li>Важно:</li>
            <b>В акции участвует только привод 6/18, 220V.</b>
            <li>Пульт управления в акции не участвует и приобретается отдельно.</li>
            <li>В заказе по акции должна быть только система G-FORM WOOD 50 – другие изделия не учитываются.</li>
          </ul>
        </div>
      </div>

      <product-info
        class="offset-1 col-sm-10 ui-mt-6 FIX-CLASS"
        :text="product.productInfo"
      />
      <!-- <div v-if="product.system !== 'wood'"> -->
      <similar-products :productId="product.productId" class="col-12" />
      <!-- </div> -->
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { calculatorStore, catalogStore } from "@/utils/store-accessor";
import UiButton from "@/components/UI/UI-Button.vue";
import ProductImages from "@/components/Catalog/Product/ProductImages.vue";
import ProductPrice from "@/components/Catalog/Product/ProductPrice.vue";
import ProductParams from "@/components/Catalog/Product/ProductParams.vue";
import InstallationInfo from "@/components/Catalog/Product/InstallationInfo.vue";
import OrderButtons from "@/components/Catalog/Product/OrderButtons.vue";
import ProductInfo from "@/components/Catalog/Product/ProductInfo.vue";
import SimilarProducts from "@/components/Catalog/Product/SimilarProducts.vue";

import { CatalogProduct } from "@/types/Catalog";
import { Template } from "@/types/Calculator/Template";
import FormData from "form-data";
import { $axios } from "@/utils/axios-accessor";

@Component({
  components: {
    SimilarProducts,
    ProductInfo,
    ProductImages,
    ProductPrice,
    ProductParams,
    OrderButtons,
    UiButton,
    InstallationInfo,
  },
})
export default class ProductPage extends Vue {
  data() {
    return {
      isOpen: false
    }
  }

  head() {
    let title = "";
    let description = "";
    let _script = [];

    let fullPath =
      this.$route.params.product[this.$route.params.product.length - 1] === "/"
        ? this.$route.params.product.trim().slice(0, -1)
        : this.$route.params.product;

    const meta = catalogStore.catalogProductsSEOGetter?.find((i) => i?.url === fullPath);
    if (meta) {
      title = meta.metaTitle;
      description = meta.metaDescription;

      let G_meta = [{ hid: "description", name: "description", content: description }];
      if (typeof meta.metaKeywords !== "undefined") {
        G_meta.push({ hid: "keywords", name: "keywords", content: meta.metaKeywords });
      }
      if ("metaRobots" in meta)
        G_meta.push({ hid: "robots", name: "robots", content: meta.metaRobots });
      if ("metaViewport" in meta)
        G_meta.push({ hid: "viewport", name: "viewport", content: meta.metaViewport });
      if ("metaScript" in meta)
        _script.push({
          type: meta.metaScript.type,
          innerHTML: meta.metaScript.innerHTML,
        });
      return {
        title,
        meta: G_meta,
        script: _script,
        __dangerouslyDisableSanitizers: ["script"],
      };
    }
  }

  async asyncData({ store, route }) {
    if (!store.getters["calculator/templatesGetter"]) {
      await calculatorStore.getTemplates();
    }

    // if(route.path[route.path.length - 1] === '/'){
    //   await navigateTo('/');
    // }

    let fullPath =
      route.path[route.path.length - 1] === "/"
        ? route.path.trim().slice(0, -1)
        : route.path;
        

    const { productId } = catalogStore.catalogGetter.find(
      (product: CatalogProduct) => product.catalogUrl === fullPath
    );

    if (!store.getters["catalog/catalogSimilarProductsGetter"][productId]) {
      await catalogStore.getSimilarProducts(productId);
    }
  }

  async mounted() {
    const { template } = this;
    if (template) {
      await calculatorStore.calculate(template);

      if (template.type !== "karniz") {
        template.material = this.minPriceMaterial.tid;
        template.width = this.minPriceMaterial.min.width;
        template.height = this.minPriceMaterial.min.height;
        await calculatorStore.calculate(template);
      }
    }
  }

  get product(): CatalogProduct {
    let fullPath =
      this.$route.path[this.$route.path.length - 1] === "/"
        ? this.$route.path.trim().slice(0, -1)
        : this.$route.path;
    return catalogStore.catalogGetter?.find(
      (product: CatalogProduct) => product.catalogUrl === fullPath
    );
  }

  toggleRequestModal() {
    this.$router.push('/buy/gorizontalnye-derevyannie-zhalyuzi')
  }

  get calcProcess(): boolean {
    return calculatorStore.calcProcessGetter;
  }

  get calculatedItem() {
    return calculatorStore.calculatedItemGetter;
  }

  get template(): Template | undefined {
    return calculatorStore.templatesGetter?.find(
      (template: Template) => template.type + template.subtype === this.product.productId
    );
  }
  get materials() {
    return calculatorStore.calculatedItemMaterialsGetter;
  }
  get minPriceMaterial() {
    return calculatorStore.minPriceMaterialGetter;
  }
}
</script>

<style lang="scss" scoped>
.FIX-CLASS {
  margin-left: 0 !important;
  width: 100% !important;
}
.img-new {

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;



  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.98);
  }

  img {
    padding: 8px;
    box-sizing: border-box;
    max-width: 100%;
    height: auto;
    border-radius: 20px;
  }
}


.arrow-icon {
  font-size: 20px;
  animation: arrow-glow 1.5s infinite;
}

@keyframes arrow-glow {
  0% {
    color: #d38f2c;
    text-shadow: 0 0 5px rgba(211, 143, 44, 0.5);
  }
  50% {
    color: #ffb347;
    text-shadow: 0 0 10px rgba(211, 143, 44, 0.8);
  }
  100% {
    color: #d38f2c;
    text-shadow: 0 0 5px rgba(211, 143, 44, 0.5);
  }
}


.wave-text {
  color: black;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, black 0%, #d38f2c 20%, black 40%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: wave-animation 3s infinite linear;
}

@keyframes wave-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
