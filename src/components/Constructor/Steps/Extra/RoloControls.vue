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
<!--            <pre>{{ opt.val }} {{ opt.val === controlType }}</pre>-->
            <ui-radio-button
              v-model="modelControlType"
              :label="opt.title"
              :value="opt.val"
              :image-src="`/img-new/constructor/Controls/${opt.img}`"
              uniq-id="RoloControls"
              @change="setControl(opt.val)"
              :class="{ checked: opt.val === controlType }"
            />
          </template>
          <template v-else>
<!--            <pre> e {{ opt.val }} {{ opt.val === controlType }}</pre>-->
            <ui-radio-button
              v-if="template.width >= parseInt(product.minWidth) + 300"
              v-model="modelControlType"
              :label="opt.title"
              :value="opt.val"
              :image-src="`/img-new/constructor/Controls/${opt.img}`"
              uniq-id="RoloControls2"
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
            v-model="modelControlSide"
            :label="opt.val === 1 ? 'слева' : 'справа'"
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
            v-model="modelControlDrive"
            :label="opt === 2 ? 'от сети' : 'от аккумулятора'"
            :value="opt"
            :image-src="`/img-new/constructor/ControlSide/${product.system}-${opt}.jpg`"
            uniq-id="ControlDrive"
            :class="{ checked: parseInt(opt) === parseInt(template.Drive) }"
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

import { calculatorStore, catalogStore } from '@/store'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: { UiRadioButton }
})
export default class RoloControls extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  modelControlType: string | number = ''
  modelControlSide: string | number = ''
  modelControlDrive: string | number = ''

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

  created() {
    // this.modelControlType = this.product.controls.default
    this.modelControlType = this.controlType
    this.modelControlSide = this.template.ControlSide
    this.modelControlDrive = this.template.Drive || 0
    // console.log('this.product', this.template)
  }

  async setControl(val) {
    await calculatorStore.setControlType(val)
    this.modelControlType = val
    const product = catalogStore.catalogGetter.find(
      (product) =>
        product.productId === this.template.type + this.template.subtype
    )

    if (product.attachmentPoint === 'wall' && !product.box) {
      if (this.template.width <= 1500) {
        if (val === 'rope' || val === 'metalChain') {
          // console.log('clic');
          await this.changeProduct('rolo30', val)
        } else if (val === 'plasticChain') {
          // console.log('roll');
          await this.changeProduct('rolo4', val)
        }
      } else if (this.template.width > 1500 && this.template.width <= 2000) {
        if (val === 'rope') {
          // console.log('clic');
          await this.changeProduct('rolo30', val)
        } else if (val === 'metalChain' || val === 'remote') {
          // console.log('grande');
          await this.changeProduct('rolo6', val)
        }
      } else {
        const drive = val === 'remote' ? product.controlParams.remote[0] : 1
        this.$set(this.template, 'Drive', drive)
        await calculatorStore.calculate(this.template)
      }
    } else {
      const drive = val === 'remote' ? product.controlParams.remote[0] : 1
      this.$set(this.template, 'Drive', drive)
      await calculatorStore.calculate(this.template)
    }
  }

  async changeProduct(productId, type = false) {

    const drive = type === 'remote' ? 2 : 1
    const template = calculatorStore.templatesGetter.filter(
      (template) => template.type + template.subtype === productId
    )[0]

    if (template) {
      this.modelControlType = drive
      template.width = this.template.width
      template.height = this.template.height
   

      if(['30', '31'].includes(template.subtype)){
        template.ControlType = type === 'rope' ? 1 : 3;
      }
      else{
        template.Drive = drive
      }
      await calculatorStore.calculate(template)
    }
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
    this.modelControlDrive = val
    await calculatorStore.calculate(template)
  }

  async calculate(val) {
    const template = {
      ...this.template,
      MountType: val
    }

    await calculatorStore.calculate(template)
  }

  get controls() {
    let controls = this.product.controls.checkboxes
    // костыль для систем на стену без короба
    if (this.product.attachmentPoint === 'wall' && !this.product.box) {
      if (this.template.width <= 1500) {
        controls = ['rope', 'plasticChain', 'metalChain']
      } else if (this.template.width > 1500 && this.template.width <= 2000) {
        controls = ['rope', 'metalChain', 'remote']
      }
    }
    // костыль для систем на стену без короба
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
