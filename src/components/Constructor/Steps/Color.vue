<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div
      class="col-sm-4"
      v-for="opt in filteredColors"  
      :key="opt.value"
      style="width: 20%"
    >
      <ui-radio-button
        v-model="model"
        :label="opt.name"
        :value="opt.val"
        :image-src="`/img-new/constructor/Color/${product.system}-${
          colorGroupsImgs[product.productId][opt.alias]
        }`"
        uniq-id="Color"
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
export default class Color extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  model: number | undefined = 0

  colorGroupsImgs = {
    rolo1: {
      Color_1: 'white3.jpg',
      Color_2: 'brown.jpg',
      Color_22: 'graphite.jpg',
    },

    rolo2: {
      Color_1: 'white2.jpg',
      Color_2: 'light-oak2.jpg',
      Color_22: 'gold-oak2.jpg',
      Color_23: 'mahogany2.jpg'
    },
    rolo3: {
      Color_1: 'white2.jpg',
      Color_22: 'BOX+22.jpg',
      // Color_2: 'BOX+7.jpg',
      Color_23: 'BOX+7.jpg'
    },  
    rolo31: {
      Color_1: 'white.jpg',
      Color_6: 'gray.jpg'
    },
    zebra22: {
      Color_1: 'white2.jpg',
      Color_2: 'light-oak2.jpg',
      Color_3: 'gold-oak2.jpg',
      Color_4: 'mahogany2.jpg'
    },
    zebra33: {
      Color_1: 'white.jpg',
      Color_6: 'gray.jpg'
    },
    ks251: {
      Color_1: 'white2.jpg',
      Color_2: 'gold-oak2.jpg',
      Color_3: 'mahogany2.jpg',
      Color_4: 'light-oak2.jpg',
      Color_5: 'dark-oak2.jpg'
    },
    hblinds1: {
      Color_1: 'white.jpg',
      Color_2: 'light-oak.jpg',
      Color_3: 'gold-oak.jpg',
      Color_4: 'mahogany.jpg'
    },
    vblinds1: {
      Color_1: 'white.jpg',
      Color_2: 'gold-oak.jpg',
      Color_3: 'mahogany.jpg',
      Color_4: 'light-oak.jpg',
      Color_5: 'dark-oak.jpg'
    },
    vblinds2: {
      Color_1: 'white.jpg',
      Color_2: 'light-oak.jpg',
      Color_3: 'gold-oak.jpg',
      Color_4: 'mahogany.jpg'
    },
    roma1: {},
    introma1: {},
    plisse1: {
      Color_1: 'white.jpg',
      Color_2: 'brown.jpg',
      Color_3: 'gray.jpg',
      Color_4: 'gold-oak.jpg',
      Color_5: 'graphite.jpg'
    }
  }

  mounted() {
    this.model = this.template.Color
  }

  get colors() {
    // console.log('Color',calculatorStore.calculatedItemParamsGetter?.Color?.options)
    //return calculatorStore.calculatedItemParamsGetter.Color.options
    const opts = calculatorStore.calculatedItemParamsGetter?.Color?.options
    if (Array.isArray(opts)) return opts
    if (opts && typeof opts === 'object') return Object.values(opts)
    return []
  }
  get filteredColors() {
    return this.colors.filter(opt => opt.name !== "Светлый дуб")
  }

  calculate(val) {
    const template = {
      ...this.template,
      Color: val
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
