<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <div class="col-12">
      <div class="row">
        <div
          v-for="opt in controls"
          :key="opt.val"
          class="col-sm-4 col-6"
        >
          <template v-if="opt.val !== 'remote'">
            <ui-radio-button
              :label="opt.title"
              :value="opt.val"
              :image-src="`/img-new/constructor/Controls/${opt.img}`"
              uniq-id="RoloControls"
              @change="setControl(opt.val)"
              :class="{ checked: opt.val === controlType }"
            />
          </template>
          <template v-else>
            <ui-radio-button
              v-if="template.width >= parseInt(product.minWidth) + 300"
              :label="opt.title"
              :value="opt.val"
              :image-src="`/img-new/constructor/Controls/${opt.img}`"
              uniq-id="RoloControls"
              :class="{ checked: opt.val === controlType }"
              @change="setControl(opt.val)"
            />
          </template>
        </div>
      </div>

      <div
        v-if="template.Drive === 1 || !template.Drive"
        class="row mt-3"
      >
        <div
          v-for="(opt, i) in controlSide"
          :key="`c-${i}`"
          class="col-sm-4 col-6"
        >
          <ui-radio-button
            :label="opt.val == 1 ? 'слева' : 'справа'"
            :value="opt.val"
            :image-src="`/img-new/constructor/ControlSide/${product.system}-${product.attachmentPoint}-${product.box}-${opt.val}.jpg`"
            uniq-id="ControlSide"
            :class="{ checked: opt.val === template.ControlSide }"
            @change="setControlSide(opt.val)"
          />
        </div>
      </div>

      <div
        v-if="template.Drive !== 1"
        class="row step-content mt-3"
      >
        <div
          v-for="opt in driveTypes"
          :key="`drt-${opt}`"
          class="col-sm-4 col-6"
        >
          <ui-radio-button
            :label="opt === 2 ? 'от сети' : 'от аккумулятора'"
            :value="opt"
            :image-src="`/img-new/constructor/ControlSide/${product.system}-${opt}.jpg`"
            uniq-id="ControlDrive"
            :class="{ checked: opt === template.Drive }"
            @change="setDriveType(opt)"
          />
        </div>
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
export default class ZebraControls extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public controlsLib = [
    {
      title: 'цепь пластиковая',
      val: 'plasticChain',
      img: 'plastic-chain.jpg'
    },
    {
      title: 'шнур',
      val: 'rope',
      img: 'rope.jpg'
    },
    {
      title: 'цепь металлическая',
      val: 'metalChain',
      img: 'chain-ball.jpg'
    },
    {
      title: 'дистанционное',
      val: 'remote',
      img: 'remote.jpg'
    }
  ]

  async setControl(val) {
    await calculatorStore.setControlType(val)
    const product = catalogStore.catalogGetter.find(
      (product) =>
        product.productId === this.template.type + this.template.subtype
    )

    this.template.Drive = val === 'remote' ? product.controlParams.remote[0] : 1
    await calculatorStore.calculate(this.template)
  }

  async setControlSide(val) {
    const template = {
      ...this.template,
      ControlSide: val
    }
    await calculatorStore.calculate(template)
  }

  async setDriveType(val) {
    const template = {
      ...this.template,
      Drive: val
    }
    await calculatorStore.calculate(template)
  }

  get controls() {
    const product = catalogStore.catalogGetter.find(
      (product) =>
        product.productId === this.template.type + this.template.subtype
    )
    const controls = product.controls.checkboxes
    return this.controlsLib.filter((control) => controls.includes(control.val))
  }

  get controlSide() {
    return calculatorStore.calculatedItemParamsGetter.ControlSide.options
  }

  get driveTypes() {
    const product = catalogStore.catalogGetter.find(
      (product) => product.productId === this.template.type + this.template.subtype
    )
    return product.controlParams.remote
  }

  get controlType() {
    return calculatorStore.controlTypeGetter
  }
}
</script>

<style lang="scss" scoped></style>
