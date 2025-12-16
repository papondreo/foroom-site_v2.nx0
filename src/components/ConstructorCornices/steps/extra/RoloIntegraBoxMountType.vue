<template>
    <div class="col-12">
        <header class="constructor-header">
            <p class="constructor-header__title">
                {{data.title}}
                <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
            </p>
            <transition name="slide">
                <div v-if="showText">
                    <p
                        v-for="(text, i) in data.description"
                        :key="`desc${i}`"
                        class="mb-3"
                    >
                        {{text}}
                    </p>
                </div>
            </transition>
        </header>

        <div
            class="row step-content _hrz-scroll"
        >
            <div
                v-for="radio in options"
                :key="radio.val"
                class="col-sm-4 col-6 _full-size mb-3"
            >
                <fieldset class="radioButton">
                    <silent-box
                        class="zoom-image"
                        :image="{src: imgUrl(radio.val), description: ''}"
                        :thumbnail="false"
                        :thumbnailWidth="0"
                    >
                        <i class="fa fa-search-plus"></i>
                    </silent-box>
                    <input
                        :id="name+radio.val"
                        :name="name"
                        type="radio"
                        :checked="checked(radio.val)"
                        :class="{'checked': checked(radio.val)}"
                        @change="setMountType(radio.val)"
                    >
                    <label :for="name+radio.val">
                        <div
                            class="img-container"
                        >
                            <img
                                :src="imgUrl(radio.val)"
                                :alt="radio.name"
                            />
                        </div>
                        <span>
                            <i class="fa fa-check-square-o" v-if="checked(radio.val)"></i>
                            <i class="fa fa-square-o" v-else></i>
                            {{$ucFirst(radio.name)}}
                        </span>
                        <span class="desc" v-if="checked(radio.val)">{{radio.desc}}</span>
                    </label>
                </fieldset>
            </div>
        </div>
        <div class="attention" @mouseover="glazingBead = true" @mouseleave="glazingBead = false">
            <p class="position-relative">
                Замерьте расстояние от плоскости поверхности стекла до плоскости лицевой грани штапика
                <i class="fa fa-info-circle ml-1"></i>
                <img v-if="glazingBead" class="shtapik" :src="'/_images/constructor/MountType/rolo-shtapik.jpg'" alt="">
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MountType',
        data: function () {
            return {
                publicPath: `/_images/constructor/MountType/${this.systemName}-`,
                showText: false,
                glazingBead: false,
                name: 'MountType',
                selectedValue: 0,
                options: [
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
            }
        },
        props: [
            'systemName',
            'data'
        ],
        methods: {
            checked (val) {
                return (this.system.name === 'rolo2' && parseInt(val) === parseInt(this.template.MountType)) || (this.system.name === 'rolo3' && parseInt(val) === 3)
            },
            setMountType: function (val) {
                this.selectedValue = val
                if (parseInt(val) !== 3) {
                    this.changeSystem('rolo2')
                    this.template.MountType = val
                    this.$store.dispatch('calcCore/calculate', this.template)
                } else {
                    this.template.MountType = 2
                    this.changeSystem('rolo3')
                }
            },

            findTemplate (system) {
                const template = this.templates.find(template => template.type + template.subtype === system)
                return template ? template : false
            },

            changeSystem (system) {
                this.$store.dispatch('common/clearError')

                const template = this.findTemplate(system)
                if (template) {
                    const mountType = this.template.MountType
                    template.MountType = mountType

                    this.$store.dispatch('calcCore/calculate', template).then(
                        res => {
                            const template = res.item
                            this.$set(this.template, template)
                            this.$store.dispatch('calcCore/setControlType', this.system.controls.default)
                        },
                        rej => {

                        })
                }
            },
            imgUrl: function (val) {
                const box = (this.system.box !== undefined) ? this.system.box + '-' : ''
                return this.publicPath + box + val + '.jpg'
            }
        },
        computed: {
            templates: function () {
                return this.$store.getters['calcCore/templates']
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            systems: function () {
                return this.$store.getters['calcLibs/systems'][this.systemName]
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            // options: function () {
            //     // return this.$getParams('MountType')
            //     const opts = this.$getParams('MountType')
            //     for (let key in opts) {
            //         opts[key].name = opts[key].name.replace(/ *\([^)]*\) */g, "")
            //     }
            //     return opts
            // }
        }
    }
</script>


<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"
.position-relative
  position: relative

.shtapik
  position: absolute
  width: 250px
  top: -225px
  right: 30px
  border-radius: 50%
  border: 3px solid #f5f5f5
  box-shadow: -7px 6px 16px 0px rgba(217, 217, 217, 1)
  z-index: 9

.radioButton
  position: relative
  height: 100%

  label
    height: 100%
    border-radius: 5px
    cursor: pointer
    text-align: center
    display: block
    color: $lightFontColor

    &:hover
      .img-container
        border-color: rgba($brandMainColorLight, 0.4)
    i
      position: absolute
      top: 8px
      left: 10px
      color: $brandMainColorLight
      font-size: 20px

      &.fa-square-o
        color: #eee

    .desc
      display: block
      margin-top: 5px
      font-size: 15px
      color: $lightFontColor !important

  .img-container
    // padding-bottom: calc(100% - 4px)
    margin-bottom: 10px
    border-radius: 5px
    border: 3px solid #eee
    transition: $transition

  .zoom-image
    position: absolute
    padding: 2px 8px 0
    top: 3px
    right: 3px
    color: $lightFontColor !important
    border-radius: 0 3px 0 3px
    background: rgba(#fff, .7)
    transition: $transition
    /*opacity: 0*/

    &:hover
      color: $brandMainColorLight !important

  img
    display: block
    // position: absolute
    width: 100%
    // height: 100%
    margin-bottom: 0
    background: $default-color
    //object-fit: cover
    border-radius: 2px


  /* Base for label styling */

  [type="radio"]:not(:checked),
  [type="radio"]:checked
    position: absolute
    left: -9999px

  [type="radio"] label span
    position: relative
    cursor: pointer
    display: inline-block
    transition: $transition


  [type="radio"]:disabled + label .img-container
    border-color: #eee !important

    & img
      filter: grayscale(100%)

  [type="radio"]:disabled + label span
    color: #aaa

  [type="radio"].checked + label span
    color: $brandMainColor

  [type="radio"].checked + label .img-container
    border-color: rgba($brandMainColorLight, 0.7)

  @media screen and (max-width: $colSm)
    .zoom-image
      display: none

.attention
  margin-top: 15px
  border-radius: 5px
  padding: 15px
  border-left: 5px solid #df771c
  background: rgba(255, 155, 0, 0.3098)
  font-size: .85rem

</style>
