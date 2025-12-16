<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{ width: width }">
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12">
                    <div class="modal_image">
                        <div class="main-img" :style="`backgroundImage: url('${backList[indexBack].img}')`">
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
                    </div>
                </div>
              </div>
            </div>
          </div>
            <div class="col-12">
                <p class="title">Цвет фона</p>
                <div class="wall-colors">
                    <div v-for="(color, i) of backList"
                         @click="setWallColor(color)"
                         :key="`color-${i}`"
                         class="wall_color"
                         :class="{'active': color.val == indexBack}"
                         :style="{backgroundColor: color.color}"
                    >
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
  name: 'PreviewModalKarniz',
  data: () => ({
    config,
    publicPath: '/_images/constructor/',
      indexBack: 0,
      backList: [
          {
              val: 0,
              img: '/_images/constructor/cornices-bg.png',
              color: 'white'
          },
          {
              val: 1,
              img: '/_images/constructor/cornices-bg-grey.png',
              color: 'grey'
          }
      ]
  }),
  props: [
    'width',
    'systemName'
  ],
  methods: {
      setWallColor(color){
          this.indexBack = color.val
      }
  },
  computed: {
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    system: function () {
      return this.$getSystem(this.systemName)
      // this.$store.getters.systems[this.systemName].find(system => system.name === this.template.type + this.template.subtype)
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
    max-width: 800px
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
    /*max-height: 480px*/
    font-size: 18px
    padding: 15px 0
    overflow: hidden

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
  border: 1px solid rgba(21, 18, 15, 0.7)

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
