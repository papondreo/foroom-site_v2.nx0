<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div
      class="col-sm-4 ui-mb-4"
      v-for="opt in mountPoints"
      :key="opt.value"
    >
      <ui-radio-button
        v-model="model"
        :label="opt.name"
        :value="opt.val"
        :image-src="`/img-new/constructor/AttachmentPoint/${product.system}-${product.lamellaMaterial}${opt.val}.jpg`"
        uniq-id="MountPoint"
        zoom-image="true"
        @change="calculate(opt.val)"
      />
    </div>

    <constructor-component
      v-if="template.MountType"
      :componentData="mountTypeData"
      :template="template"
      :product="product"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'
import { calculatorStore } from '@/utils/store-accessor'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'
import ConstructorComponent from '@/components/Constructor/ConstructorComponent.vue'

@Component({
  components: { ConstructorComponent, UiRadioButton }
})
export default class VblindsAttachmentPoint extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public model = ''
  public mountTypeData = {
    name: 'MountType',
    type: 'extra',
    title: 'Тип крепления',
    description: [
      'Выберите необходимый размер кронштейна для выноса изделия от стены'
    ]
  }

  mounted() {
    this.model = this.template.MountPoint
  }

  async calculate(val) {
    const template = {
      ...this.template,
      MountPoint: val
    }

    if (val === 2) {
      template.MountType = 1
    }

    await calculatorStore.calculate(template)
  }

  get mountPoints() {
    return calculatorStore.calculatedItemParamsGetter['MountPoint'].options
  }
}
</script>

<style lang="scss" scoped></style>
