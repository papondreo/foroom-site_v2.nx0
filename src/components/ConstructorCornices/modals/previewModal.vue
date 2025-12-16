<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{ width: width }">
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-7">
                  <div class="row">
                    <div class="col-12">
                      <div class="modal_image">

                        <template v-if="systemName === 'rolo' && Object.keys(material).length && materialCalc.visible">
                          <button
                            v-if="material.rev != 1 && material.rev != 2"
                            @click="rotateMaterial()"
                            class="button rotate-material"
                          >
                            <i class="fa fa-repeat" :class="{'fa-rotate-90': template.MaterialCalc == 2}"></i>Разворот
                            ткани
                          </button>
                        </template>

                        <div class="main-img"
                             :style="'background-image: url(' + publicPath + 'window-bg.jpg)'"
                        ></div>
                        <div class="main-img" v-if="wallColor"
                             :style="'background-image: url(' + wallColor.url + ')'"
                        ></div>
                        <div class="main-img"
                             v-if="systemName === 'vblinds'"
                             :style="`background-image: url('img/constructor/1441976311b.png')`"
                        ></div>
                        <div
                          v-if="system.windowImg"
                          class="system-img"
                          :style="'background-image: url(' + system.windowImg + ')'"
                        ></div>

                        <div v-if="!!materialImg" class="material-img" :style="`background-image: url(${config.rootPath}img/${materialImg})`"></div>
                        <div
                          v-if="template.Color"
                          :style="'background-image: url(' + colorImg + ')'"
                          class="complColor-preview"
                        ></div>
                      </div>
                    </div>
                    <div class="col-12">
                      <p class="title">Цвет стены</p>
                      <div class="wall-colors">
                        <div v-for="(color, i) of wallColors"
                             @click="setWallColor(color)"
                             :key="`color-${i}`"
                             class="wall_color"
                             :class="{'active': color.url == wallColor.url}"
                             :style="{backgroundColor: color.color}"
                        >
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="col-5 pl-0">
                  <div
                    class="material"
                    :class="{'contain': systemName === 'duo'}"
                    :style="`background-image: url(${config.rootPath}img/${materialPreviewImg})`"
                  >
                  </div>
                  <p class="title">
                    Материал: {{ material.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="$emit('close')" class="button modal-button">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import config from '@/config'
export default {
  name: 'PreviewModal',
  data: () => ({
    config,
    publicPath: '/_images/constructor/',
    iconUrl: 'https://media.foroom.ru/docs/kons/load/',
    iconMiniUrl: 'https://media.foroom.ru/docs/kons/mini/',
    fullSizeImgUrl: 'https://media.foroom.ru/docs/kons/load/',
  }),
  props: [
    'width',
    'systemName'
  ],
  methods: {
    setWallColor: function (color) {
      this.$store.dispatch('calcCore/setWallColor', color)
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
  },
  computed: {
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    system: function () {
      return this.$getSystem(this.systemName)
      // this.$store.getters.systems[this.systemName].find(system => system.name === this.template.type + this.template.subtype)
    },
    colorImg: function () {
      const prod = this.$store.getters['calcCore/products'].filter(product => product.ptype + product.category === this.system.name)
      return 'https://media.foroom.ru/docs/kons/color/' + prod[0].id + '_Color' + this.template.Color + '.png'
    },
    material: function () {
      return this.$store.getters['calcCore/material']
    },

    materialImg: function () {
      const pic = this.template.MaterialCalc == 2 ? this.material.img.prv2: this.material.img.prv1
      if (pic === '0.jpg') {
        return this.material.img.prv2
      }
      return pic
    },

    materialCalc: function () {
      return this.$store.getters['calcCore/params'].oParams.MaterialCalc
    },

    materialPreviewImg: function () {
      const pic = this.template.MaterialCalc == 2 ? this.material.img.ico2 : this.material.img.ico1
      if (pic === '0.jpg') {
        return this.material.img.ico2
      }
      return pic
    },

    wallColors: function () {
      return this.$store.getters['calcLibs/wallColors']
    },
    wallColor: function () {
      return this.$store.getters['calcCore/wallColor']
    },
  }
}
</script>


<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"

.container
  margin: 0
  min-width: 100%

.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .6)
  display: table
  transition: opacity .3s ease

  .modal-wrapper
    display: table-cell
    vertical-align: middle

  .modal-container
    max-width: 1080px
    margin: 0 auto
    height: auto
    background-color: #fff
    border-radius: 10px
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
    transition: all .3s ease, height 0s

  .modal-body
    display: flex
    /*height: 80vh*/
    height: 100%
    max-height: 480px
    font-size: 18px
    padding: 15px 0
    overflow: auto

  .modal-footer
    padding: 10px 15px
    text-align: right

  .button
    width: fit-content
    padding: 0 20px

.modal-top
  width: 100%
  display: flex

.modal_image
  height: 0
  position: relative
  padding-bottom: 58%
  margin-bottom: 15px
  flex-shrink: 0

p.title
  margin-left: 5px
  margin-bottom: 10px

  span
    color: #aaaaaa
    font-family: $lightFont
    font-size: 15px

.wall-colors
  width: 100%

.wall_color
  display: inline-block
  flex-shrink: 0
  width: calc(5% - 8px)
  padding-bottom: 4%
  margin: 0 4px 2px
  border-radius: 5px
  cursor: pointer
  transition: transform .3s ease-in-out, opacity .3s ease-in-out

  &.active
    transform: scale(1.15)
    box-shadow: 0px 2px 8px rgba(#000, .35)

  &:hover
    opacity: .8
    transform: scale(1.15)

.main-img,
.system-img,
.material-img,
.material-preview,
.complColor-preview
  position: absolute
  width: 100%
  top: 0
  bottom: 0
  border-radius: 8px
  background-size: cover
  background-position: top
  background-repeat: no-repeat

.material
  position: relative
  padding-left: 0
  padding-bottom: 80%
  margin-bottom: 15px
  background-size: cover
  background-position: top
  background-repeat: no-repeat
  border-radius: 8px

  &.contain
    background-size: contain


.material-preview
  top: 0 !important
  bottom: 0 !important
  left: 0
  right: 0
  background-size: cover
  background-color: #fff
  z-index: 9
  width: auto

.rotate-material
  position: absolute
  bottom: 10px
  right: 10px
  z-index: 99
</style>
