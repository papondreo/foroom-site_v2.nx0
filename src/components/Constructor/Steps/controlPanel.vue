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
        uniq-id="controlPanel"
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
export default class controlPanel extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public model = ''

  created() {
    this.model = this.template.controlPanel
  }

  async calculate(val) {
    const template = {
      ...this.template,
      controlPanel: val
    }
    await calculatorStore.calculate(template)
  }

  imgUrl(val) {
    const box = (this.product.box !== undefined) ? this.product.box + '-' : ''
    // const box = this.template.box !== undefined ? this.product.box + '-' : '0-'
    return (
      '/img-new/constructor/controlPanel/' +
      this.product.system +
      '-' +
      box +
      val +
      '.jpg'
    )
  }


    getUsers(e) {
      this.$emit('get-method', e)
    }

  get options() {
    const params = calculatorStore.calculatedItemParamsGetter
    /// ПЕРЕБОР ЗАВИСИМОСТЕЙ ДЛЯ ДИНАМИЧЕСКОГО ВЫВОДА ПАРАМЕТРОВ
    const relateArr = {};
    const unfilteredParams = [];
    for(let paramsItem of Object.values(params)){
      if(paramsItem.options){
        for(let option of Object.values(paramsItem.options)){
          if(Object.values(option.relate).length){
            relateArr[option.alias] = [];
            for(let key in option.relate){
              if(option.relate[key] === 0){
                relateArr[option.alias].push(key);
              }
            }
          }
        }
      }
    }

    for(let key in this.template){
      let alias = `${key}_${this.template[key]}`
      
      if(relateArr[alias] && relateArr[alias].length){
        unfilteredParams.push(...relateArr[alias])
      }
    }

    const resultOptions = Object.values(params.controlPanel.options).map((param) => ({
      ...param,
      name: param.name.replace(/ *\([^)]*\) */g, '')
    }))


    this.getUsers(resultOptions.filter(option => !unfilteredParams.includes(option.alias)))
    return resultOptions.filter(option => !unfilteredParams.includes(option.alias))
  }
}
</script>

<style lang="scss" scoped></style>
