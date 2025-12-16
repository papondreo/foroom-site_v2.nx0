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
        uniq-id="ControlSide"
        @change="calculate(opt.val)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'
import { calculatorStore } from '@/store'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'

@Component({
  components: { UiRadioButton }
})
export default class ControlSide extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public model = ''

  created() {
    this.model = this.template.ControlSide
  }

  async calculate(val) {
    const template = {
      ...this.template,
      ControlSide: val
    }

    await calculatorStore.calculate(template)
  }

  imgUrl(val) {
    const attachmentPoint =
      this.product.attachmentPoint !== undefined
        ? this.product.attachmentPoint + '-'
        : ''

    return (
      '/img-new/constructor/ControlSide/' +
      this.product.system +
      '-' +
      attachmentPoint +
      val +
      '.jpg'
    )
  }

  get options() {
    const params = calculatorStore.calculatedItemParamsGetter
    return Object.values(params.ControlSide.options).map((param) => ({
      ...param,
      name: param.name.replace(/ *\([^)]*\) */g, '')
    }))
  }
}
</script>

<style lang="scss" scoped></style>
