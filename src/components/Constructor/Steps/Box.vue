<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div
      class="col-sm-4"
      v-for="opt in options"
      :key="opt.value"
    >
      <ui-radio-button
        v-model="model"
        :label="opt.title"
        :value="opt.value"
        :image-src="`/img-new/constructor/Box/${product.system}-${product.attachmentPoint}-${opt.value}.jpg`"
        uniq-id="Box"
        @change="calculate()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'

import { calculatorStore, catalogStore, systemsStore } from '@/store'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: { UiRadioButton }
})
export default class Box extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  model: string | number = ''
  attachmentPoint: string = ''

  created() {
    this.model = this.product.box
    this.attachmentPoint = this.product.attachmentPoint
  }

  async calculate() {
    if (this.matchedTemplates && this.matchedTemplates.length) {
      const template = this.matchedTemplates[0]
      await calculatorStore.calculate(template)

      const product = catalogStore.catalogGetter.find(
        (product) => product.productId === template.type + template.subtype
      )
      if (product.controls) {
        await calculatorStore.setControlType(product.controls.default)
      }

      const material = this.$cheapestMaterial(true)
      // await calculatorStore.setMaterialToTemplate(material.tid)

      template.material = material.tid
      await calculatorStore.calculate(template)
    }
  }

  get options() {
    return systemsStore.boxGetter
  }

  get productsIdsByAttachmentPointAndBox() {
    return catalogStore.catalogGetter
      .filter(
        (product) =>
          product.system === this.product.system &&
          product.attachmentPoint === this.attachmentPoint &&
          product.box === this.model
      )
      .map((product) => product.productId)
  }

  get matchedTemplates() {
    return calculatorStore.templatesGetter?.filter((template) =>
      this.productsIdsByAttachmentPointAndBox.includes(
        template.type + template.subtype
      )
    )
  }
}
</script>

<style lang="scss" scoped></style>
