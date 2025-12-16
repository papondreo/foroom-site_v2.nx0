<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div
      class="col-sm-4"
      v-for="opt in colors"
      :key="opt.value"
      style="width: 20%"
    >
      <ui-radio-button
        v-model="model"
        :label="opt.name"
        :value="opt.val"
        :image-src="`/img-new/constructor/BandColor/${product.system}-${
          colorGroupsComplImgs[product.productId][opt.alias]
        }`"
        uniq-id="BandColor"
        @change="calculate(opt.val)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'
import { calculatorStore } from '@/utils/store-accessor'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'

@Component({
  components: { UiRadioButton }
})
export default class BandColor extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  model: number | undefined = 0

  colorGroupsComplImgs = {
    plisse1: {
      BandColor_1: 'complWhite.jpg',
      BandColor_2: 'complBrown.jpg',
      BandColor_3: 'complSilver.jpg',
      BandColor_4: 'gold-oak.jpg',
      BandColor_5: 'graphite.jpg'
    }
  }

  mounted() {
    this.model = this.template.BandColor
  }

  get colors() {
    return calculatorStore.calculatedItemParamsGetter.BandColor.options
  }

  calculate(val) {
    const template = {
      ...this.template,
      BandColor: val
    }
    calculatorStore.calculate(template)
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  .img-container {
    width: 100%;
    height: auto;
    padding-bottom: 100%;
    position: relative;
    border-width: 2px !important;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}
</style>
