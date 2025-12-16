<template>
  <div class="constructor__preview">
    <div v-if="actionInfo" class="item-card__label">
      <p
        class="item-card__label-title item-card__label-title_celebration"
        :style="{
                    backgroundColor: '#de1000',
          color: '#ffffff'
               }"
      >
        АКЦИЯ «{{ actionInfo.name }}»
      </p>
      <p class="item-card__label-perc item-card__label-perc_celebration"
         :style="{
                    backgroundColor: '#de1000',
          color: '#ffffff',
                    opacity: '.8'
               }"
      >ВАША СКИДКА {{ calcSale() }}%</p>
    </div>
    <div class="main-img" style="background-image: url('/_images/constructor/cornices-bg.png')">
      <!--// :style="`background-image: url('${publicPath}img/preview/designer-pic.jpg')`"-->
    </div>


      <div
          v-for="(radio) in imagesArr"
          :key="radio.val"
      >
          <div
              class="material-img"
              :style="`backgroundImage: url('${radio.url}'); background-size: 100%;`"
          ></div>
      </div>


<!--      <button-->
<!--          @click="materialPreview =! materialPreview"-->
<!--          class="button zoom-material"-->
<!--      >-->
<!--          <i v-if="!materialPreview" class="fa fa-search-plus" aria-hidden="true"></i>-->
<!--          <i v-else class="fa fa-search-minus" aria-hidden="true"></i>-->
<!--      </button>-->

<!--      <button @click="$emit('previewModal')" class="button zoom-material_desktop">-->
<!--          <i class="fa fa-search-plus" aria-hidden="true"></i>-->
<!--      </button>-->
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'PreviewKarniz',
  data: function () {
    return {
      config,
      publicPath: '/_images/constructor/',
      fullSizeImgUrl: 'https://media.foroom.ru/docs/kons/load/',
      rotate: false,
      materialPreview: false
    }
  },
  methods: {
    calcSale: function () {
      let old_price = this.template.old_price
      let price = this.template.price
      if(this.calcCornices.NumberOfRows == 2 && this.actionInfo){
        if(!old_price)old_price = price;
        let price2 = this.calcCornices.price
        let oldPrice2 = this.calcCornices.oldPrice
        let megaUltraSuperOldPrise = parseFloat(old_price ? old_price : price) - - parseFloat(oldPrice2 ? oldPrice2 : price2)
        old_price = (old_price || price.oldPrice2) ? megaUltraSuperOldPrise : old_price - - price.oldPrice2
        price += parseFloat(this.calcCornices.price)
      }

      if (old_price > price) {
        return Math.round(100 - 100 * price / old_price);
      } else {
        return Math.round(100 - 100 * old_price / price);
      }
    }
  },
  computed: {
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    material: function () {
      return this.$store.getters['calcCore/material']
    },
    actionInfo: function () {
      if (this.$store.getters['calcCore/params'].oParams && this.$store.getters['calcCore/params'].oParams.material.isCurrentAction && Object.keys(this.$store.getters['calcCore/params'].oParams.material.currentActionInfo).length) {
        let cai = this.$store.getters['calcCore/params'].oParams.material.currentActionInfo;
          if(this.calcCornices.NumberOfRows == 2 && !cai){
            cai = this.calcCornices.currentActionInfo
        }
        return cai
      }else{
        if(this.calcCornices.NumberOfRows == 2 && this.calcCornices.currentActionInfo){
         return this.calcCornices.currentActionInfo
        }
        return false
      }
    },

      imagesArr () {
        let arr = [];
        if(this.template.subtype != 1){
            let at = this.template.ArchType ? this.template.ArchType : 1
            if(this.template.MountPoint == 2 && at!= 2 && at!= 3){
                arr.push({url:this.publicPath+'cornices/bracket.png', val:1})
            }

            if(this.calcCornices.NumberOfRows == 2){
                arr.push({url:this.publicPath+'cornices/'+this.calcCornices.currentTemplates[1].type+this.calcCornices.currentTemplates[1].subtype+'-1_2.png', val:2})
            }
            arr.push({url:this.publicPath+'cornices/'+this.template.type+this.template.subtype+'-'+at+'_1.png', val:3})
        }else{
            // Первый слой труба
            let materials = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube1_type']['materials']
            let name = materials[this.template.karniz.karn_tube1_type].name.slice(materials[this.template.karniz.karn_tube1_type].name.indexOf('м'), materials[this.template.karniz.karn_tube1_type].name.length).split(',')
            name =  name.length > 2 ? name[name.length-1] + ',' + name[name.length-2] : name[name.length-1]
            arr.push({url:this.publicPath+'cornices/check/tube'+name+'.png', val:0})
            // Затем кронштейн
            arr.push({url:this.publicPath+'cornices/check/bracket_'+this.template.karniz.karn_bracket_type+'.png', val:1})
            //Затем наконечник
            arr.push({url:this.publicPath+'cornices/check/tip_'+this.template.karniz.karn_tip1_type+'.png', val:2})
            //Затем кольца
            arr.push({url:this.publicPath+'cornices/check/ring_'+this.template.karniz.karn_ring1_type+'.png', val:3})
        }
          return arr
      },
      calcCornices () {
          return this.$store.getters['calcCornices/data']
      },
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"
@import "@/assets/sass/constructor/check"

</style>
