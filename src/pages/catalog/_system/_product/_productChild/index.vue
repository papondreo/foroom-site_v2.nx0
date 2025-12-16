<template>
  <main class="container">
    <div class="row">
      <product-images
        :images="[`img/images/nf_foroom/goods-static/${currentProduct.cover}`]"
        class="col-sm-6"
      />

      <div class="col-sm-6">
        <div class="row">
          <div class="col-12">
            <ui-title tag="h1" class="ui-title-1 mb-1">
              {{ currentProduct?.systemName }}
            </ui-title>

            <p class="mb-4">{{ currentProduct.systemTypeName }}</p>
          </div>
          <div class="col-12">
            <product-price
              :price="currentProduct.price"
              :old-price="currentProduct.oldPrice"
            />
            <similar-product-params :params="currentProduct.params" />
          </div>
        </div>

        <installation-info
          :product="product"
          :links="product.measure"
          :installation-page-url="product.setupUrl"
          class="col-12"
        />

        <order-buttons :product="currentProduct" class="col-12 ui-mt-6" />
      </div>

      <product-info class="col-sm-12 ui-mt-6" :text="product.productInfo" />

      <similar-products :productId="product?.productId" class="col-12" />
    </div>
  </main>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from "nuxt-property-decorator";
import { catalogStore, pagesStore } from "@/store";

import ProductImages from "@/components/Catalog/Product/ProductImages.vue";
import ProductPrice from "@/components/Catalog/Product/ProductPrice.vue";
import SimilarProductParams from "@/components/Catalog/Product/SimilarProductParams.vue";
import InstallationInfo from "@/components/Catalog/Product/InstallationInfo.vue";
import OrderButtons from "@/components/Catalog/Product/OrderButtons.vue";
import ProductInfo from "@/components/Catalog/Product/ProductInfo.vue";
import SimilarProducts from "@/components/Catalog/Product/SimilarProducts.vue";

import { CatalogProduct } from "@/types/Catalog";

@Component({
  components: {
    ProductImages,
    ProductPrice,
    SimilarProductParams,
    InstallationInfo,
    OrderButtons,
    ProductInfo,
    SimilarProducts,
  },
})
export default class ProductChildPage extends Vue {
  head() {
    return {
      title: `Купить ${this.currentProduct.systemTypeName.toLowerCase()} ${this.currentProduct.systemName.toUpperCase()} по доступной цене в интернет-магазине FOROOM`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Купить ${this.currentProduct.systemTypeName.toLowerCase()} ${this.currentProduct.systemName.toUpperCase()} ${
            this.currentProduct.width
          } x ${
            this.currentProduct.height
          } по выгодной цене в интернет-магазине FOROOM. Свое производство. Гарантия. Быстрая доставка по всей России. Оформляйте заказ онлайн!`,
        },
      ],
    };
  }

  async validate({ params, store }) {
    
    if (!Object.keys(catalogStore.similarProducts).length) {
      const productId = catalogStore.catalogGetter.find(
        (item) => item.url === `/${params.product}`
      )?.productId;
      if (!productId) {
        
        return false;
      }

      const { data } = await catalogStore.getSimilarProducts(productId);
      const prod = data.find((product) => {
        return product.url === params.productChild;
      });

      if (!prod) {
        return false;
      }
    }
    return true;
  }

  async asyncData({ route, redirect }) {


    let productId = null;

    const data = catalogStore.catalogGetter.find(
      (product: CatalogProduct) =>
        product?.catalogUrl === route.path.split("/").slice(0, -1).join("/")
    );

    if(data && data.productId){
      productId = data.productId
    }
    else{
      redirect('/catalog')
    }



    const getProduct = async (productId) => {
      const { data } = await catalogStore.getSimilarProducts(productId);
      return data.find((product) => {
        return product.url === route.params.productChild;
      });
    };

  

    const product = !catalogStore.catalogSimilarProductsGetter[productId]
      ? await getProduct(productId)
      : catalogStore.catalogSimilarProductsGetter[productId].find((product) => {
          return product.url === route.params.productChild;
        });

    catalogStore.setCurrentSimilarProduct(product);

    pagesStore.pushToPagesTree({
      id: 0,
      parentId: 0,
      public: 1,
      showInMenu: 0,
      positionInMenu: null,
      breadcrumbsTitle: product.systemName.toUpperCase(),
      menuTitle: null,
      h1: product.systemName.toUpperCase(),
      url: "/",
      cover: null,
      seoTitle: product.systemName.toUpperCase(),
      seoDescription: product.systemName.toUpperCase(),
      seoKeywords: null,
    });
  }

  get product(): CatalogProduct {
    return catalogStore.catalogGetter.find(
      (product: CatalogProduct) =>
        product?.catalogUrl === this.$route.path.split("/").slice(0, -1).join("/")
    );
  }

  get currentProduct() {
    const currentProduct = catalogStore.currentSimilarProductGetter;
    if (currentProduct) {
      currentProduct.productId = currentProduct.system;
      currentProduct.minWidth = currentProduct.template.width;
      currentProduct.minHeight = currentProduct.template.height;
      currentProduct.material = currentProduct.template.material;
    }
    return currentProduct;
  }
}
</script>

<style lang="scss" scoped></style>
