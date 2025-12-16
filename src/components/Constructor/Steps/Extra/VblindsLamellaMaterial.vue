<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div
      class="col-sm-4 ui-mb-4"
      v-for="opt in options"
      :key="opt.value"
    >
      <ui-radio-button
        v-model="model"
        :label="opt.title"
        :value="opt.value"
        :image-src="`/img-new/constructor/MountType/${product.system}-${opt.value}.jpg`"
        uniq-id="LamellaMaterial"
        @change="calculate(opt.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { calculatorStore, catalogStore } from '@/store'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'
import { findMin } from '@/libs/findMin'

@Component({
  components: { UiRadioButton }
})
export default class VblindsLamellaMaterial extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public model = ''
  public options = [
    {
      title: 'Ткань',
      value: 'cloth'
    },
    {
      title: 'Пластик',
      value: 'plastic'
    }
  ]

  mounted() {
    this.model = this.product.lamellaMaterial
  }

  async calculate(value) {
    const productsIds = this.products
      .filter((product) => product.lamellaMaterial === value)
      .map((product) => product.productId)

    const filteredTemplates = this.templates.filter((template) => {
      const { type, subtype } = template
      return productsIds.includes(type + subtype)
    })

    const template = findMin(filteredTemplates, 'price')

    await calculatorStore.calculate(template)
    const material = calculatorStore.minPriceMaterialGetter

    template.material = material.tid
    await calculatorStore.calculate(template)
  }

  get templates() {
    return calculatorStore.templatesGetter
  }
  get products() {
    return catalogStore.catalogGetter
  }
}
</script>

<style lang="scss" scoped></style>
