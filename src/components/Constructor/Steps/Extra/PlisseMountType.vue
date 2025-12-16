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
        uniq-id="MountType"
        zoom-image="true"
        @change="calculate(opt.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'
import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'
import { calculatorStore } from '@/utils/store-accessor'

@Component({
  components: { UiRadioButton }
})
export default class PlisseMountType extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  options = [
    {
      title: 'Крепление в штапик',
      desc: 'Для окон с глубиной штапика 15 мм и более',
      alias: 'MountType_1',
      value: 1
    },
    {
      title: 'Кронштейн угловой',
      desc: '',
      alias: 'MountType_2',
      value: 2
    },
    {
      title: 'Кронштейн накидной',
      desc: '',
      alias: 'MountType_3',
      value: 3
    },
    {
      title: 'Мансардное крепление',
      desc: '',
      alias: 'MountType_4',
      value: 4
    }
  ]

  model

  created() {
    this.model = this.template.MountType
  }

  async calculate() {
    const template = {
      ...this.template,
      MountType: this.model
    }

    await calculatorStore.calculate(template)
  }
}
</script>

<style lang="scss" scoped></style>
