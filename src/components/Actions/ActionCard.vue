<template>
  <div class="card">
    <nuxt-link :to="getUrl()">
      <div class="card-cover_wrapper">
        <p
          class="card-action-name"
          :style="`color: ${product.actionColors.txt}; background: ${product.actionColors.bgr}`"
        >
        <p
          class="card-action-name"
          :style="`color: #ffffff; background: #de0000`"
        >
          Акция «{{ product.actionName }}»
        </p>
        <p
          class="card-action-perc"
          :style="`color: #ffffff; background: #de0000`"
        >
          скидка {{ product.actionPerc }}%
        </p>
        <ui-img
          :src="`img/images/nf_foroom/goods-static/${product.cover}`"
          class="card-cover"
          alt=""
        />
<!--        <img-->
<!--          :src="`https://www.foroom.ru/img/images/nf_foroom/goods-static/${product.cover}`"-->
<!--          class="card-cover"-->
<!--          alt=""-->
<!--        />-->

        <img
          :src="`/img-new/brand/${product.systemType}-ico.svg`"
          class="system-ico"
          alt=""
        />
      </div>

      <p class="card-title">{{ product.name }}</p>
      <p class="card-subtitle">{{ product.systemTypeName }}</p>

      <div class="d-flex align-bestsellers-lg-baseline justify-content-end">
        <ui-button class="card-button">Заказать</ui-button>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiButton from '@/components/UI/UI-Button.vue'
import { catalogStore } from "@/utils/store-accessor";

@Component({
  components: {
    UiButton
  }
})
export default class ActionCard extends Vue {
  @Prop()
  readonly product: any

  mounted() {
    //console.log(this.product.type + this.product.subtype, this.product.consImg)
  }

  getUrl(): string {
    // const { productId, width, height, materialId } = this.product
    // return ''
    return `${this.product.url}`
    // return `${this.product.url}//?template=${productId}&sizes=${width}x${height}&material=${materialId}`
  }

  get catalogProduct() {
    return catalogStore.catalogGetter.find(p => p.productId === this.product.type + this.product.subtype)
  }
}
</script>

<style lang="scss" scoped>
.card {
  //width: 20%;
  margin-bottom: 36px;

  .card-cover_wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 135%;
    margin-bottom: 12px;
    overflow: hidden;
  }

  .card-action-name {
    position: absolute;
    top: 24px;
    left: -5px;
    right: -5px;
    width: auto;
    display: block;
    padding: 5px 12px 3px;
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    transform: rotate(8deg);
    z-index: 2;
  }

  .card-action-perc {
    position: absolute;
    top: 40px;
    left: -5px;
    right: -5px;
    width: auto;
    display: block;

    padding: 10px 12px 3px;

    text-align: right;
    font-size: 13px;
    font-weight: 400;

    transform: rotate(10deg);

    opacity: 0.7;
    z-index: 1;
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
    margin-bottom: 4px;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 15px;
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

@media only screen and (min-width: 1199px) {
  .card {
    //width: 20% !important;
  }
}
</style>
