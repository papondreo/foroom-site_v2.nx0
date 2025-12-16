<template>
  <nuxt-link :to="getUrl()">
    <div class="card">
      <div class="card-cover_wrapper">
        <ui-img
          :src="`img/images/nf_foroom/goods-static/${bestseller.productId}-${bestseller.materialId}.png`"
          class="card-cover"
          alt=""
        />
        <img
          :src="`/img-new/brand/${bestseller.system}-ico.svg`"
          class="system-ico"
          alt=""
        />
      </div>
      <p class="card-title">{{ bestseller.productName }}</p>
      <p class="card-subtitle">{{ bestseller.systemName }}</p>

      <p class="card-char">
        Материал: <span>{{ bestseller.materialName }}</span>
      </p>
      <p class="card-char">
        Ширина: <span>{{ bestseller.width / 10 }} см</span>
      </p>
      <p class="card-char">
        Высота: <span>{{ bestseller.height / 10 }} см</span>
      </p>

      <div class="d-flex align-bestsellers-lg-baseline justify-content-between">
        <p class="card-price">{{ bestseller.price }} ₽</p>
        <ui-button class="card-button">Заказать</ui-button>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop, Getter } from 'nuxt-property-decorator'
import UiButton from '@/components/UI/UI-Button.vue'
import { CatalogProduct } from '@/types/Catalog'
import { Bestseller } from '@/types/Bestsellers'

@Component({
  components: {
    UiButton
  }
})
export default class BestsellerCard extends Vue {
  @Prop({ required: true })
  readonly bestseller: Bestseller

  @Getter('catalog/catalogGetter') products: CatalogProduct[]

  getUrl(): string {
    let url = this.products.find(
      (product) => product.productId === this.bestseller.productId
    )?.calculatorUrl

    if (url) {
      url = url?.split('/')
      url.pop()
      url = url.join('/')

      const { productId, width, height, materialId } = this.bestseller

      return `${url}?template=${productId}&sizes=${width}x${height}&material=${materialId}`
    }
    return ''
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 36px;

  .card-cover_wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 140%;
    margin-bottom: 12px;
  }
  .system-ico {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 20px;
    height: 20px;
  }
  .card-cover {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;

    object-fit: cover;
    object-position: center;

    border-radius: 4px;
  }

  &-title {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
  }

  &-subtitle {
    margin-bottom: 8px;
    line-height: 1;
    font-size: 15px;
    color: #666;
  }

  &-char {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &-price {
    margin-top: 8px;

    font-size: 18px;
    font-weight: 600;
  }

  &-button {
    padding: 6px 12px;
    //margin-top: 2px;
    font-weight: 400;
  }
}
</style>
