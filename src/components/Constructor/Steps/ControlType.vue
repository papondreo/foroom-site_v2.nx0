<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div
      class="col-sm-4"
      v-for="opt in options"
      :key="opt.val"
    >
      <ui-radio-button
        v-model="model"
        :label="opt.name"
        :value="opt.val"
        :image-src="imgUrl(opt.val)"
        uniq-id="ControlType"
        zoom-image="true"
        @change="calculate(opt.val)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'

import { calculatorStore } from '@/store'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: { UiRadioButton }
})
export default class ControlType extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public model = ''

  created() {
    this.model = this.template.ControlType
  }

  async calculate(val) {   
    const template = {
      ...this.template,
      ControlType: val
    }
 
    
    await calculatorStore.calculate(template)
  }

  imgUrl(val) {
    const box = (this.product.box !== undefined) ? this.product.box + '-' : ''
    // const box = this.template.box !== undefined ? this.product.box + '-' : '0-'
    return (
      '/img-new/constructor/ControlType/' +
      this.product.system +
      '-' +
      box +
      val +
      '.jpg'
    )
  }

  get options() {
    const params = calculatorStore.calculatedItemParamsGetter
    return Object.values(params.ControlType.options).map((param) => ({
      ...param,
      name: param.name.replace(/ *\([^)]*\) */g, '')
    }))
  }
}
</script>

<style lang="scss" scoped></style>
