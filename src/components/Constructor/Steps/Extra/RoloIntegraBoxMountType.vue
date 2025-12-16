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
        :description="opt.desc"
        :value="opt.val"
        :image-src="imgUrl(opt.val)"
        uniq-id="DuoControls"
        zoom-image="true"
        @change="calculate(opt.val)"
      />
    </div>

    <div class="col-12 ui-mt-3">
      <div
        class="attention"
        @mouseover="glazingBead = true"
        @mouseleave="glazingBead = false"
      >
        <p class="position-relative">
          Замерьте расстояние от плоскости поверхности стекла до плоскости лицевой грани штапика
          <i class="fa fa-info-circle ml-1"></i>
          <img
            v-if="glazingBead"
            class="shtapik"
            :src="'/img-new/constructor/MountType/rolo-shtapik.jpg'"
            alt=""
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiRadioButton from '@/components/Constructor/UI/UiRadioButton.vue'

import { calculatorStore, catalogStore } from "@/store";

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: { UiRadioButton }
})
export default class RoloIntegraBoxMountType extends Vue {
  // @Prop({ required: true })
  // readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public glazingBead = false
  public model = ''
  public options = [
    {
      name: "На саморезы",
      desc: 'Для окон с глубиной штапика 1 см и более',
      alias: "MountType_1",
      val: 1,
    },
    {
      name: "На двусторонний скотч",
      desc: 'Для окон с глубиной штапика 1 см и более',
      alias: "MountType_2",
      val: 2,
    },
    {
      name: "На двусторонний скотч",
      desc: 'Для окон с глубиной штапика менее 1 см',
      alias: "MountType_3",
      val: 3,
    }
  ]

  created() {
    this.model = this.template.MountType
  }

  async calculate(val) {
    if (val !== 3) {
      await this.changeSystem('rolo2')
      const material = this.$cheapestMaterial()
      this.template.material = material.tid
      this.template.MountType = val

      await calculatorStore.calculate(this.template)
    } else {
      this.template.MountType = 2
      await this.changeSystem('rolo3')
    }

    const template = {
      ...this.template,
      MountType: val
    }
    await calculatorStore.calculate(template)
  }

  async changeSystem(productId) {
    const template = this.findTemplate(productId)
    if (template) {
      template.MountType = this.template.MountType
      const material = this.$cheapestMaterial()
      template.material = material.tid
      await calculatorStore.calculate(template)

      const product = catalogStore.catalogGetter.find(
        (product) => product.productId === template.type + template.subtype
      )
      await calculatorStore.setControlType(product.controls.default)
    }
  }

  findTemplate(productId) {
    const template = this.templates.find(
      (template) => template.type + template.subtype === productId
    )
    return template
  }

  imgUrl(val) {
    return (
      '/img-new/constructor/MountType/' + this.template.type + '-1-' + val + '.jpg'
    )
  }

  get template() {
    return calculatorStore.calcCurrentItemGetter.template
  }

  get templates() {
    return calculatorStore.templatesGetter
  }
}
</script>

<style lang="scss" scoped>
.position-relative {
  position: relative;
}
.shtapik {
  position: absolute;
  width: 250px;
  top: -225px;
  right: 30px;
  border-radius: 50%;
  border: 3px solid #f5f5f5;
  box-shadow: -7px 6px 16px 0px rgba(217, 217, 217, 1);
  z-index: 9;
}
.attention {
  margin-top: 15px;
  border-radius: 5px;
  padding: 15px;
  border-left: 5px solid #df771c;
  background: rgba(255,155,0,.3098);
  font-size: .85rem;
  cursor: pointer;
}
</style>
