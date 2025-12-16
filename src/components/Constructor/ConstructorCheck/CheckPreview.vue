<template>
  <div :class="'preview' + ' ' + product.system">
    <div
      v-if="actionInfo && actionInfo.colors"
      class="action"
    >
      <p
        class="action-title"
        :style="{
          backgroundColor: '#de1000',
          color: '#ffffff'
        }"
      >
        АКЦИЯ «{{ actionInfo.name }}»
      </p>
      <p
        v-if="calcSale"
        class="action-perc"
        :style="{
          backgroundColor: '#de1000',
          color: '#ffffff',
          opacity: '.8'
        }"
      >
        ВАША СКИДКА {{ calcSale }}%
      </p>
    </div>

    <img v-if="product.productId === 'hblinds3'" src="/img-new/constructor/roomg-form-50.jpg" />
    <img v-else-if="product.system !== 'wood'" src="/img-new/constructor/window-bg.jpg" />
    <img v-else src="/img-new/constructor/WOOD_50_9.jpg" />

    <img
      v-if="product.windowImg"
      :src="product.windowImg"
      alt=""
    />

    <img
      v-if="wallColor"
      :src="wallColor.url"
    />
    <img
      :src="materialImg"
      alt=""
    />
    <img
      v-if="template && template.Color"
      :src="colorImg"
      alt=""
    />
    <img
      v-if="product.system === 'vblinds'"
      src="/img-new/constructor/1441976311b.png"
    />

    <div class="media-buttons">
      <check-gallery
        v-if="product.productImages"
        :images="product.productImages"
      />

      <check-video />
    </div>

    <template v-if="material && material.rev && material.rev !== 1 && material.rev !== 2 && step === 4">
      <button
        class="ui-button rotate-material"
        v-if="product.system === 'rolo'"
        @click="rotateMaterial"
      >
        Разворот ткани
        <i
          class="fa fa-repeat"
          :class="{'fa-rotate-90': template.MaterialCalc === 2}"
        />
      </button>
    </template>

    <button
      class="open-preview"
      @click="openPreviewModal"
    >
      <i
        class="fa fa-search-plus"
        aria-hidden="true"
      ></i>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {
  calculatorStore,
  catalogStore,
  siteComponentStatesStore
} from '@/store'

import CheckGallery from '@/components/Constructor/ConstructorCheck/CheckGallery.vue'
import CheckVideo from '@/components/Constructor/ConstructorCheck/CheckVideo.vue'

@Component({
  components: { CheckVideo, CheckGallery }
})
export default class Preview extends Vue {
  openPreviewModal() {
    siteComponentStatesStore.setCheckPreviewModal(true)
  }

  mounted(){

  }

  defaultColor(productId) {
    const defaultWoodColor = {
      name: 'Orange 001',
      color: '#f1e2cf',
      url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_9.jpg'
    };

    const defaultGForm50Color = {
      name: 'Orange 001',
      color: '#f1e2cf',
      url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-13.png'
    };

    const defaultColor = {
      name: 'Orange 005',
      color: '#dd6e29',
      url: 'https://media.foroom.ru/docs/kons/load/1442437400b.png'
    };

    if (productId === 'wood1') {
      siteComponentStatesStore.setWallColor(defaultWoodColor);
    } else if (productId === 'hblinds3') {
      siteComponentStatesStore.setWallColor(defaultGForm50Color);
    } else {
      siteComponentStatesStore.setWallColor(defaultColor);
    }
  }

  async rotateMaterial() {
    this.template.MaterialCalc = this.template.MaterialCalc == 1 ? 2 : 1

    const res = await calculatorStore.calculate(this.template)
    if (!res.error) {

    } else {
      siteComponentStatesStore.setNotify({
        title: 'Внимание!',
        message: 'По заданным размерам для выбранной ткани разворот невозможен',
        type: 'warn'
      })
      await this.rotateMaterial()
    }
  }

  get step() {
    return calculatorStore.currentPaginatorStepGetter
  }

  get materialImg() {
    if (this.material) {
      let material = this.material.img.prv1

      if (this.product.system === 'rolo') {
        if (this.template.MaterialCalc !== 1) {
          material = this.material.img.prv2
        }

        if (material == '0.jpg') {
          material = this.material.img.prv1
        }
        material = material?.replaceAll('rolo12', 'rolo6')
      }
      return 'https://media.foroom.ru/' + material
    }
    return ''
  }

  get calcSale() {
    const { old_price, price } = this.template
    // console.log('eee', old_price, price);
    if (old_price > price) {
      return Math.round(100 - 100 * price / old_price);
    } else {
      return Math.round(100 - 100 * old_price / price);
    }
  }

  get colorImg() {
    const products = calculatorStore.apiGetter?.items
    if (products && products[this.product.productId]) {
      return 'https://media.foroom.ru/docs/kons/color/' + products[this.product.productId].id + '_Color' + this.template.Color + '.png'
    }
    return ''
  }

  get template() {
    return calculatorStore.calculatedItemGetter
  }

  get product() {
    const { type, subtype } = this.template
    const product = catalogStore.currentProductGetter(type + subtype)
    // console.log('product', product);
    this.defaultColor(product.productId)
    return product
  }

  get material() {
    // console.log(this.template.material);
    const material = calculatorStore.calculatedItemMaterialsGetter?.find(
      (material) => material.tid === this.template.material
    )
    // console.log(material);
    return material
  }
  get actionInfo() {
    return this.material && this.material.currentActionInfo
      ? this.material.currentActionInfo
      : null
  }
  get wallColor() {
    return siteComponentStatesStore.wallColorGetter
  }
}
</script>

<style lang="scss" scoped>
.preview {
  position: relative;
  margin-bottom: 12px;
  border-radius: 4px;
  height: 400px;
  overflow: hidden;
  img {
    position: absolute;
    top: -10%;
    left: 0;
    object-fit: cover;
    width: 130%;
    height: 130%;
    border-radius: 4px;
  }
  .action {
    position: absolute;
    left: -20px;
    right: -20px;
    z-index: 9999;
    &-title {
      transform: rotate(-1deg);
      padding: 4px 30px;
      font-weight: 500;
    }
    &-perc {
      transform: rotate(-2.5deg);
      padding: 4px 30px;
      font-weight: 400;
      top: -11px;
      position: relative;
    }
  }
  .rotate-material {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .media-buttons {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    z-index: 99;
    button {
      display: inline-flex;
      margin-right: 5px;
      padding: 8px 12px;
      background: rgba(#ffffff, .8);
      font-size: 20px;
      color: $brand-orange-light;
      transition: .3s ease-in-out;
      &:hover {
        background: #ffffff;
      }
    }
  }
  .open-preview {
    position: absolute;
    width: 50px;
    height: 50px;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    color: #fff;
    border: 3px solid #fff;
    background: #f9a134;
    font-size: 24px;
    opacity: 0.4;
    z-index: 15;
    transition: 0.3s ease-in-out;

    &:hover {
      opacity: 0.9 !important;
      background: #ff920c;
    }
  }
}

.preview.wood{
  img{
    object-fit: contain;
  }
}
</style>
