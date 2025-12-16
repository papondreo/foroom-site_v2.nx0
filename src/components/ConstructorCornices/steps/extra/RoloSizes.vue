<template>
  <div class="col-12 mb-3">
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

      <p v-if="Object.keys(system.measure).length">Как сделать замер
        <silent-box
          v-if="system.measure.photo"
          class="link"
          :thumbnail="false"
          :image="{src: system.measure.photo}"
        >
          Фото
        </silent-box>
        <silent-box
          v-if="system.measure.video"
          class="link"
          :autoplay="true"
          :hide-controls="true"
          :thumbnail="false"
          :image="{src: 'https://' + system.measure.video}"
        >
          Видео
        </silent-box>
      </p>
    </header>

    <div class="row">
      <div class="col-12 mb-3">
        <silent-box
          class="link system-scheme__link d-block d-md-none"
          :thumbnail="false"
          :image="{ src: publicPath + systemName + '-' + system.sizesScheme}"
        >
          СХЕМА СИСТЕМЫ
        </silent-box>
      </div>
      <div class="col-5 d-none d-md-block">
        <img :src="publicPath + systemName + '-' + system.sizesScheme" alt="" class="">
      </div>

      <div class="col-md-7">
        <div class="row step-content">
          <div class="col-12">
            <p class="tac">Введите размеры по замеру</p>
          </div>

          <template v-if="system.attachmentPoint === 'wall'">
            <div class="col-12">
              <fieldset class="fieldset-input tac mb-3">
                <label for="width">Ширина, см</label>
                <div>
                  <p>от: 25</p>
                  <input
                    @blur="setSize('width')"
                    v-model="size[0].width"
                    type="text" class="text"
                    :class="{'invalid': error.width || (size[0].width < 25 || size[0].width > size[0].maxWidth)}"
                    id="width">
                  <p>до: {{size[0].maxWidth}}</p>
                </div>
<!--                <p v-if="recomendedDimensions.width < dimensions.width" class="sizes-desc">для выбора ширины до {{dimensions.width}} см<br/> уменьшите высоту до {{ recomendedDimensions.dim_height }} см</p>-->
                <p v-if="recomendedDimensions.dim_height && recomendedDimensions.dim_height < size[0].height" class="sizes-desc">для выбора ширины до {{dimensions.width}} см<br/> уменьшите высоту до {{ recomendedDimensions.dim_height }} см</p>
              </fieldset>
            </div>

            <div class="col-12">
              <fieldset class="fieldset-input tac mb-4">
                <label for="height">Высота, см</label>
                <div>
                  <p>от: 30</p>
                  <input
                    @blur="setSize('height')"
                    v-model="size[0].height"
                    :class="{'invalid': error.height || (size[0].height < 30 || size[0].height > size[0].maxHeight)}"
                    type="text"
                    class="text"
                    id="height">
                  <p>до: {{size[0].maxHeight}}</p>
                </div>
<!--                <p v-if="recomendedDimensions.height < dimensions.height" class="sizes-desc">для выбора высоты до {{dimensions.height}} см<br/> уменьшите ширину до {{ recomendedDimensions.dim_width }} см</p>-->
                <p v-if="recomendedDimensions.dim_width && recomendedDimensions.dim_width < size[0].width" class="sizes-desc">для выбора высоты до {{dimensions.height}} см<br/> уменьшите ширину до {{ recomendedDimensions.dim_width }} см</p>
              </fieldset>
            </div>
          </template>

          <template v-else>
            <div v-if="flapsCount.length > 1" class="tac mb-3 mt-2 w-100">
              <button
                v-for="(f, i) in flapsCount"
                :key="`flap-${i}`"
                :class="flap === i ? 'material-tabs__tab_active' : 'material-tabs__tab_disactive'"
                @click="flap = i"
                class="material-tabs__tab"
              >
                Створка {{i+1}}
              </button>
            </div>

            <div class="col-12">
              <fieldset class="fieldset-input tac mb-3">
                <label for="width">Ширина, см</label>
                <div>
                  <p>от: {{size[flap].minWidth / 10}}</p>
                  <input
                    @blur="setSize()"
                    v-model="size[flap].width"
                    type="text"
                    class="text"
                    :class="{'invalid': error.width }"
                    id="width"
                  >
                  <p>до: {{size[flap].maxWidth / 10}}</p>

                  <p v-if="userMaterial && params.oParams.width.max < size[flap].maxWidth" class="sizes-desc">Для материала <b>{{params.oParams.material.mat_name}}</b> до {{params.oParams.width.max / 10}} см</p>
                </div>
              </fieldset>
            </div>

            <div class="col-12">
              <fieldset class="fieldset-input tac mb-4">
                <label for="height">Высота, см</label>
                <div>
                  <p>от: {{system.minHeight / 10}}</p>
                  <input
                    @blur="setSize()"
                    v-model="size[flap].height"
                    :class="{'invalid': error.height }"
                    type="text"
                    class="text"
                    id="height"
                  >
                  <p>до: {{size[flap].maxHeight / 10}}</p>

                  <p v-if="userMaterial && params.oParams.height.max < size[flap].maxHeight" class="sizes-desc">Для материала <b>{{params.oParams.material.mat_name}}</b> до {{params.oParams.height.max / 10}} см</p>
                </div>
              </fieldset>
            </div>
          </template>

          <div
            v-if="sizesArray[flap].gab_width && sizesArray[flap].gab_height"
            class="col-12 mt-1"
          >
            <p class="tac">Габаритные размеры (Ш х В, см):</p>
            <p class="gab-sizes">{{sizesArray[flap].gab_width}} х {{sizesArray[flap].gab_height}}</p>
          </div>
        </div>
      </div>

      <!--
      <div class="col-12">
          <header v-if="system.attachmentPoint === 'flap' && system.box && template.MountType != 1" class="constructor-header mt-4">
              <p class="constructor-header__title position-relative">Глубина штапика
                  <i class="fa fa-question-circle" @mouseover="shtapik = true" @mouseleave="shtapik = false"></i>
                  <img v-if="shtapik" class="shtapik" :src="'/_images/constructor/MountType/rolo-shtapik.jpg'" alt="">
              </p>
          </header>

          <div class="row mb-3" v-if="system.attachmentPoint === 'flap' && system.box && template.MountType != 1">
              <div class="col-12 col-sm-6 col-md-4">
                  <fieldset class="fieldset__radio">
                      <input name="step3-2" type="radio" class="checkbox" id="shtap-width" @change="changeSystem('rolo3')" :checked="system.name === 'rolo3'">
                      <label for="shtap-width">менее 1 см</label>
                  </fieldset>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                  <fieldset class="fieldset__radio">
                      <input name="step3-2" type="radio" class="checkbox" id="shtap-width2" @change="changeSystem('rolo2')" :checked="system.name === 'rolo2'">
                      <label for="shtap-width2">1 см и более</label>
                  </fieldset>
              </div>
          </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoloSizes',
  props: [
    'systemName',
    'data'
  ],
  data: function () {
    return {
      publicPath: '/_images/constructor/Sizes/',
      showText: false,
      shtapik: false,
      type: false,
      systemChanged: false,
      sizeLimit: false,
      dimensions: {},
      recomendedDimensions: {},
      images: [{
        thumb: 'http://example.com/thumb.jpg',
        src: 'http://foroom.ru/2012/video/integra-box.mp4',
      }],
      size: [{
        width: '',
        height: '',
        minWidth: 0,
        maxWidth: 0,
        minHeight: 0,
        maxHeight: 0
      }],
      error: {
        width: false,
        height: false
      },
      flap: 0
    }
  },
  created: function () {
    this.size[0].width = this.template.width / 10
    this.size[0].height = this.template.height / 10

    this.dynamicSizesLimits()

    if (this.system.attachmentPoint === 'wall') {
      this.size[0].maxWidth = this.params.max_dimentions.width  / 10
      this.size[0].maxHeight = this.params.max_dimentions.height  / 10

      // this.setSize()
    }
  },

  methods: {
    dynamicSizesLimits: function () {
      if (this.system.attachmentPoint === 'wall') {
        this.dimensions = {
          width: this.params.max_dimentions.width  / 10,
          height: this.params.max_dimentions.height  / 10
        }
        // console.log('max_dimentions', this.params.max_dimentions)

        const dimensions = this.params.getRecommendDimentions()

        this.recomendedDimensions = {
          width: dimensions.max_to.width / 10,
          height: dimensions.max_to.height / 10,
          dim_width: dimensions.reduce_to.width / 10,
          dim_height: dimensions.reduce_to.height / 10
        }


        this.size[0].maxWidth = dimensions.max_to.width / 10
        this.size[0].maxHeight = dimensions.max_to.height / 10

      } else {
        this.setMinMaxSizes()
      }
    },

    setMinMaxSizes: function () {
      const sizes = this.$setSizeLimits()
      for (let i = 0; i < this.flapsCount.length; i++) {
        this.size[i] = {...this.sizesArray[i], ...sizes}
      }
    },

    setSize: function (type = false) {
      this.type = type
      this.error.width = false
      this.error.height = false
      this.$store.dispatch('common/clearError')

      this.size[this.flap].width = this.$parseSize('width')
      this.size[this.flap].height = this.$parseSize('height')

      const width = this.size[this.flap].width * 10
      const height = this.size[this.flap].height * 10

      if (this.system.attachmentPoint === 'wall' && !this.error.height) {
        if (!this.error.width) {

          this.$store.dispatch('calcCore/setSizes', this.size)

          const systems = this.systems
            .filter(sys => sys.attachmentPoint === 'wall' && sys.box == this.system.box)
            .filter(sys => {
              return parseFloat(sys.minHeight) <= height && parseFloat(sys.maxHeight) >= height && parseFloat(sys.minWidth) <= width && parseFloat(sys.maxWidth) >= width
            })

          if (systems.length) {
            const materials = this.$getMaterials().filter(m => {
              if (m.disabled == '0') {
                if (parseFloat(m.minWidth) <= this.size[0].width * 10 && parseFloat(m.maxWidth) >= this.size[0].width * 10 && parseFloat(m.minHeight) <= this.size[0].height * 10 && parseFloat(m.maxHeight) >= this.size[0].height * 10) {
                  m.matCalc = 1
                  return m
                } else if (parseFloat(m.minWidth) <= this.size[0].width * 10 && parseFloat(m.maxWR) >= this.size[0].width * 10 && parseFloat(m.minHeight) <= this.size[0].height * 10 && parseFloat(m.maxHR) >= this.size[0].height * 10) {
                  m.matCalc = 2
                  return m
                }
              }
            })

            if (!materials.length) {
              this.$store.dispatch('common/setError', 'Материалов под заданные размеры не найдено!')
            } else {
              this.$store.dispatch('common/clearError')
              // this.changeSystem(systems[0].name)
              this.changeSystem(systems)
            }

          } else {
            this.$store.dispatch('common/setError', 'Система не найдена. Измените размеры')
          }
        } else {

          this.$store.dispatch('common/setError','Неправильно введены размеры. Исправьте в соответствии с допустимым интервалом.')
        }
      } else {
        this.error.width = width >= this.system.minWidth && width <= this.system.maxWidth ? false : true
        this.error.height = height >= this.system.minHeight && height <= this.system.maxHeight ? false : true

        if (!this.error.height && !this.error.width) {

          this.$store.dispatch('calcCore/setSizes', this.size)

          let tmpl = Object.assign({}, this.template)

          this.$store.dispatch('calcCore/calculate', tmpl).then(
            res => {
              // this.$store.dispatch('setControlType', this.system.controls.default)
              this.$store.dispatch('common/clearError')
            },
            rej => {
              const material = this.$minPriceMaterial(true)
              tmpl.material = material.tid
              this.$store.dispatch('calcCore/setMaterial', material)

              this.$store.dispatch('calcCore/calculate', tmpl)
              this.$store.dispatch('calcCore/setUserMaterial', null)
              // this.$store.dispatch('setError', 'Материалов под заданные размеры не найдено!43u5983498573')
            }
          )
        } else {
          this.$store.dispatch('common/setError','Неправильно введены размеры. Исправьте в соответствии с допустимым интервалом.')
        }
      }
    },

    setMountType: function (val) {
      this.template.MountType = val
      this.$store.dispatch('calcCore/calculate', this.template)
    },

    findTemplate (systems) {
      let template
      if (systems.constructor === Array) {
        for (let system of systems) {
          template = this.templates.find(template => template.type + template.subtype === system.name)
          if (template) {
            return template
          }
        }
      } else {
        template = this.templates.find(template => template.type + template.subtype === systems)
        if (template) {
          return template
        }
      }
      return false
    },

    changeSystem(systems) {
      this.$store.dispatch('common/clearError')

      const template = this.findTemplate(systems)

      // console.log('changeSystem', template);

      this.size[this.flap].width = this.$parseSize('width')
      this.size[this.flap].height = this.$parseSize('height')

      template.width = this.size[this.flap].width * 10
      template.height = this.size[this.flap].height * 10
      template.material = this.template.material

      this.$store.dispatch('calcCore/calculate', template).then(
        res => {
          const template = res.item
          this.$set(this.template, template)
          this.$store.dispatch('calcCore/setControlType', this.system.controls.default)

          this.dynamicSizesLimits()
        },
        rej => {
          if (this.size[this.flap].height * 10 > parseFloat(this.system.maxHeight)) {
            this.size[this.flap].height = this.system.maxHeight / 10
            template.height = this.size[this.flap].height * 10

            this.$store.dispatch('calcCore/calculate', template).then(res => {
              this.$store.dispatch('calcCore/setControlType', this.system.controls.default)
              this.$store.dispatch('common/clearError')
            })
          }

          if (rej) {
            const product = this.products.filter(product => product.ptype + product.category === this.system.name)
            const actions = this.$store.getters['calcCore/actions'] // акционные материалы
            const materialRest = this.$store.getters['calcCore/params'].materialRest // остаток на складе

            let materials = product[0].materials

            materials = materials.filter(m => {
              if (m.see == '0') {
                if (parseFloat(m.minWidth) <= template.width && parseFloat(m.maxWidth) >= template.width && parseFloat(m.minHeight) <= template.height && parseFloat(m.maxHeight) >= template.height) {
                  m.matCalc = 1
                  return m
                } else if (parseFloat(m.minWidth) <= template.width && parseFloat(m.maxWR) >= template.width && parseFloat(m.minHeight) <= template.height && parseFloat(m.maxHR) >= template.height) {
                  m.matCalc = 2
                  return m
                }
              }
            })

            let actionsMaterials = []
            Object.keys(actions).map(key => {
              let arr = actions[key].mat_ids_json.map(id => {
                return {id, perc: actions[key].perc}
              })
              actionsMaterials = actionsMaterials.concat(arr)
            })

            materials = materials.filter(material => {
              let m = actionsMaterials.find(mat => mat.id === parseFloat(material.tid))
              material.action = (m) ? m.perc : 0
              if (parseFloat(material.ost) > materialRest.red) {
                return material
              }
            })

            if (!materials.length) {
              this.$store.dispatch('common/setError', 'Материалов под заданные размеры не найдено!')
            } else {
              let min
              if (materials.some(material => material.action)) {
                materials = materials.filter(m => m.action)
                min = this.$findMin(materials, 'priceGroup')
              } else {
                min = this.$findMin(materials, 'priceGroup')
              }

              template.material = min.tid
              template.MaterialCalc = min.matCalc

              this.$store.dispatch('calcCore/calculate', template).then(
                res => {
                  this.$store.dispatch('calcCore/setMaterial', min)
                  this.$store.dispatch('calcCore/setControlType', this.system.controls.default)
                  this.$store.dispatch('common/clearError')

                  this.dynamicSizesLimits()
                },
                rej => {
                  this.$store.dispatch('common/setError', 'Система не найдена. Попробуйте смягчить  условия  подбора')
                }
              )
            }
          }
        })
    }
  },


  computed: {
    templates: function () {
      return this.$store.getters['calcCore/templates'].filter(template => template.enabled)
    },
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    systems: function () {
      return this.$store.getters['calcLibs/systems'].rolo
    },
    system: function () {
      return this.systems.find(system => system.name === this.template.type + this.template.subtype)
    },
    products: function () {
      return this.$store.getters['calcCore/products']
    },
    params: function () {
      // console.log(this.$store.getters['calcCore/params'])
      return this.$store.getters['calcCore/params']
    },
    errors: function () {
      return this.$store.getters['common/error']
    },
    sizesArray: function () {
      return this.$store.getters['calcCore/sizes'].map(size => {
        return {
          width: size.width / 10,
          height: size.height / 10,
          gab_width: size.gab_width / 10,
          gab_height: size.gab_height / 10,
        }
      })
    },
    sizes: function () {
      const obj = this.params.oParams
      return {
        gab: {
          width: Math.round(obj.width.gab * 100) / 100,
          height: Math.round(obj.height.gab * 100) / 100,
        }
      }
    },
    userMaterial: function () {
      return this.$store.getters['calcCore/userMaterial']
    },
    flapsCount: function () {
      return new Array(this.$store.getters['calcCore/flapsCount'])
    }
  }
}
</script>


<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"
@import "@/assets/sass/constructor/sizes-step"
</style>
