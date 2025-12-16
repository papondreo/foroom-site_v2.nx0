<template>
  <div class="constructor__preview" :class="{constructor__preview_action : actionInfo}">
<!--    <pre style="z-index: 999; position: relative">{{ videos }}</pre>-->
    <div v-if="actionInfo" class="item-card__label">
      <p
        class="item-card__label-title item-card__label-title_celebration"
        :style="{
                    backgroundColor: actionInfo.colors.bgr,
                    color: actionInfo.colors.txt,
               }"
      >
        АКЦИЯ «{{ actionInfo.name }}»
      </p>
      <p class="item-card__label-perc item-card__label-perc_celebration"
         :style="{
                    backgroundColor: actionInfo.colors.bgr,
                    color: actionInfo.colors.txt,
                    opacity: '.8'
               }"
      >ВАША СКИДКА {{ calcSale() }}%</p>
    </div>
    <div
      v-if="template.Color && !loading"
      :style="'background-image: url(' + colorImg + ')'"
      class="complColor-preview"
    ></div>
    <div
      v-if="materialPreview"
      :style="'background-image: url('+ fullSizeImgUrl + materialPreviewImg + ')'"
      class="material-preview"
    ></div>
    <div class="main-img"
         :style="'background-image: url(' + publicPath + 'window-bg.jpg)'"
    ></div>
    <div class="main-img" v-if="wallColor"
         :style="'background-image: url(' + wallColor.url + ')'"
    ></div>
    <div
      v-if="system.windowImg && !loading"
      class="system-img"
      :style="'background-image: url(' + system.windowImg + ')'"
    ></div>
    <div
      v-if="!loading"
      class="material-img"
      :style="`backgroundImage: url(${config.rootPath}img/${material.img['prv' + template.MaterialCalc]})`"
    ></div>

    <div v-if="Object.keys(material).length && materialCalc.visible">
      <button
        v-if="material.rev != 1 && material.rev != 2 && step == 5"
        @click="rotateMaterial()"
        class="button rotate-material"
      >
        <i class="fa fa-repeat" :class="{'fa-rotate-90': template.MaterialCalc == 2}"></i>Разворот ткани
      </button>
    </div>
    <button
      @click="materialPreview = !materialPreview"
      class="button zoom-material"
    >
      <i v-if="!materialPreview" class="fa fa-search-plus" aria-hidden="true"></i>
      <i v-else class="fa fa-search-minus" aria-hidden="true"></i>
    </button>

    <button @click="$emit('previewModal')" class="button zoom-material_desktop">
      <i class="fa fa-search-plus" aria-hidden="true"></i>
    </button>

    <div class="media-buttons">
      <button
        v-if="gallery.length"
        class="button"
        @click="showMediaModal('gallery')"
      >
        <i class="fa fa-image"></i>
      </button>
      <button
        v-if="videos.length"
        class="button"
        @click="showMediaModal('videos')"
      >
        <i class="fa fa-video-camera"></i>
      </button>
    </div>
  </div>
</template>

<script>
import config from '@/config'
export default {
  name: 'RoloPreview',
  components: {},
  props: {},
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
    showMediaModal (type) {
      const params = {
        type,
        system: this.template.type + this.template.subtype,
      }
      if (type === 'videos') {
        params.videos = this.videos
      }
      if (type === 'gallery') {
        params.gallery = this.gallery
      }

      this.$emit('mediaModal', params)
    },
    rotateMaterial: function () {
      this.template.MaterialCalc = this.template.MaterialCalc == 1 ? 2 : 1

      this.$store.dispatch('calcCore/calculate', this.template).then(
        res => {
          this.$store.dispatch('common/clearError')
        },
        rej => {
          this.$store.dispatch('common/setError', 'По заданным размерам для выбранной ткани разворот невозможен')
          setTimeout(() => {
            this.rotateMaterial()
          }, 3000)
        }
      )
    },
    calcSale: function () {
      const old_price = this.template.old_price
      const price = this.template.price

      if (old_price > price) {
        return Math.round(100 - 100 * price / old_price);
      } else {
        return Math.round(100 - 100 * old_price / price);
      }
    }
  },
  computed: {
    step: function () {
      return this.$store.getters['calcSteps/step']
    },
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    system: function () {
      return this.$store.getters['calcLibs/systems'].rolo.find(system => system.name === this.template.type + this.template.subtype) || ''
    },
    colorImg: function () {
      const prod = this.$store.getters['calcCore/products'].filter(product => product.ptype + product.category === this.system.name)
      return 'https://media.foroom.ru/docs/kons/color/' + prod[0].id + '_Color' + this.template.Color + '.png'
    },
    wallColor: function () {
      return this.$store.getters['calcCore/wallColor']
    },
    material: function () {
      return this.$store.getters['calcCore/material']
    },
    materialImg: function () {
      const pic = this.template.MaterialCalc == 1 ? this.material.pic_turn : this.material.pic
      if (pic == '0.jpg') {
        return this.material.pic_turn
      }
      return pic
      // return this.template.MaterialCalc == 1 ? this.material.pic_turn : this.material.pic
    },
    materialPreviewImg: function () {
      const pic = this.template.MaterialCalc == 1 ? this.material.icos : this.material.icoturn
      if (pic == '0.jpg') {
        return this.material.icos
      }
      return pic
      //return this.template.MaterialCalc == 2 ? this.material.icoturn : this.material.icos
    },
    sizes: function () {
      const obj = this.$store.getters['calcCore/params'].oParams
      return {
        min: {
          width: obj.width.min,
          height: obj.height.min
        },
        max: {
          width: obj.width.max,
          height: obj.height.max
        },
        gab: {
          width: obj.width.gab,
          height: obj.height.gab
        }
      }
    },

    materialCalc: function () {
      return this.$store.getters['calcCore/params'].oParams.MaterialCalc
    },
    // actionName: function () {
    //     if (this.$store.getters.params.oParams && this.$store.getters.params.oParams.material.currentActionInfo) {
    //         return this.$store.getters.params.oParams.material.currentActionInfo.name
    //     }
    // },
    actionInfo: function () {
      if (this.$store.getters['calcCore/params'].oParams && this.$store.getters['calcCore/params'].oParams.material.isCurrentAction && Object.keys(this.$store.getters['calcCore/params'].oParams.material.currentActionInfo).length) {
        return this.$store.getters['calcCore/params'].oParams.material.currentActionInfo
      }
      return false
    },
    loading: function () {
      return this.$store.getters['common/loading']
    },
    gallery () {
      const system = this.$store.getters['systems/systems'].find(item => item.system === this.template.type + this.template.subtype)
      if (!system) {
        return []
      }

      return this.$store.getters['calcLibs/systemImages'][system.system]
    },
    videos () {
      const system = this.$store.getters['systems/systems'].find(item => item.system === this.template.type + this.template.subtype)
      if (!system) {
        return []
      }

      return this.$store.getters['videos/videos']
        .filter(video => video.type === 'system' && video.parentId === system.key)
        .map(video => ({
          ...video,
          url: 'https://www.youtube.com/embed/' + video.code
        }))
    }
  }
}
</script>


<style lang="sass" scoped>
  @import "@/assets/sass/utils/vars"
  @import "@/assets/sass/constructor/check"

  .media-buttons
    position: absolute
    bottom: 10px
    left: 10px
    z-index: 99
    button
      display: inline-flex
      margin-right: 5px
      padding: 0 5px
      background: rgba(#ffffff, .8)
      color: $brandMainColorLight
      transition: .3s ease-in-out
      &:hover
        background: #ffffff
</style>
