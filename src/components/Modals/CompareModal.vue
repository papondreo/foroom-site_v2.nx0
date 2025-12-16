<template>
  <div v-if="compareProducts && compareProducts.length >=2 " class="compare-modal p-2">
    <div class="content">
      <div
        v-for="product in compareProducts"
        :key="product.productId"
        class="row mb-2 align-items-center"
      >
        <div class="col-3">
          <img
            :src="product.img"
            alt=""
            class="compare-img"
          />
        </div>
        <div class="col">
          <p class="title">{{ product.title }}</p>
          <p class="system">{{ product.systemName }}</p>
        </div>
      </div>
    </div>

    <nuxt-link to="/compare" class="compare-link">Сравнить</nuxt-link>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { catalogStore, compareProductsStore } from "@/utils/store-accessor";

@Component
export default class CompareModal extends Vue {
  get compareProducts() {
    const products = catalogStore.catalogGetter
    const ids = Object.values(compareProductsStore.comparedProductsGetter).filter((item) => item.view).map((item) => item.productId)

    return products.filter(item => ids.includes(item.productId))
  }
}
</script>

<style lang="scss" scoped>
.compare-modal {
  position: fixed;
  right: 24px;
  top: 8px;
  width: 300px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
  z-index: 9999;
}
.content {
  max-height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
}
.compare-img {
  width: 100%;
  border-radius: 4px;
}
.title {
  text-transform: uppercase;
  font-weight: 400;
}
.system {
  font-size: 14px;
}

.compare-link {
  display: block;
  background: #f9a134;
  border-radius: 4px;
  text-align: center;
  padding: 4px;
  color: #fff;
  font-weight: 400;
}
</style>
