<template>
  <div class="constructor__preview">
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
    <div class="main-img" style="background-image: url('/_images/constructor/window-bg.jpg')">
      <!--// :style="`background-image: url('${publicPath}img/preview/designer-pic.jpg')`"-->
    </div>
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
      :style="`backgroundImage: url(${config.rootPath}img/${material.img.prv1})`"
    ></div>

    <div v-if="Object.keys(material).length">
      <button
        @click="materialPreview =! materialPreview"
        class="button zoom-material"
      >
        <i v-if="!materialPreview" class="fa fa-search-plus" aria-hidden="true"></i>
        <i v-else class="fa fa-search-minus" aria-hidden="true"></i>
      </button>

      <button @click="$emit('previewModal')" class="button zoom-material_desktop">
        <i class="fa fa-search-plus" aria-hidden="true"></i>
      </button>
    </div>

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
  name: 'WoodPreview',
  components: {},
  props: {},
  data: function () {
    return {
      config,
      publicPath: process.env.BASE_URL,
      fullSizeImgUrl: 'https://media.foroom.ru/docs/kons/load/',
      rotate: false,
      materialPreview: false
    }
  },
  created: function () {

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
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    system: function () {
      return this.$store.getters['calcLibs/systems'].wood.find(system => system.name === this.template.type + this.template.subtype) || ''
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
