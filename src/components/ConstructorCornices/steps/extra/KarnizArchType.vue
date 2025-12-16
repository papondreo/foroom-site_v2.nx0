<template>
  <div class="col-12">
    <header class="constructor-header">
      <p class="constructor-header__title">
        <!-- {{ data.title }} -->
      </p>
    </header>

    <div class="row step-content hrz-scroll">
      <div
        v-for="radio in optionDef"
        :key="radio.val"
        class="col-md-4 col-6 full-size mb-sm-3"
      >
        <!-- <RadioButton
          name="ArchType"
          :param="radio"
          :label="radio.name"
          :zoom="true"
          :imgPath="`${publicPath}${radio.val}.jpg`"
          :selectedValue="system.ArchType"
        /> -->
      </div>
    </div>
    <div class="row">
      <span ref="component">
        <slot />
      </span>

      <KarnizAmount
        :systemName="systemName"
        :data="info"
        v-if="template.ArchType === 1 || template.ArchType === 4 || !template.ArchType"
      />

      <div
        v-else
        class="col-12"
      >
        <header class="constructor-header">
          <p class="constructor-header__title">
            Количество рядов
            <button
              @click="showText2 = !showText2"
              class="ml-1 show-text"
            >
              <i class="fa fa-question-circle"></i>
            </button>
          </p>
          <transition name="slide">
            <div v-if="showText2">
              <p class="mb-3">
                Заказ такой формы карниза доступен только "Один ряд"
              </p>
            </div>
          </transition>
        </header>
        <div class="row step-content hrz-scroll">
          <div class="col-md-4 col-6 full-size">
            <RadioButton
              name="NumberOfRows"
              :param="{ val: '1' }"
              label="один ряд"
              :class="true"
              :imgPath="`${publicPath2}1-${template.ArchType}.jpg`"
              :selectedValue="system.NumberOfRows"
              @input="setAmount('1')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KarnizArchType',
  components: {
    KarnizAmount: () =>
      import('@/components/ConstructorCornices/steps/extra/KarnizAmount'),
    RadioButton: () =>
      import('@/components/ConstructorCornices/RadioButton.vue')
  },
  props: ['systemName', 'data'],

  data: function () {
    return {
      publicPath: `/_images/constructor/cornices/${this.systemName}-`,
      publicPath2: `/_images/constructor/cornices/ofRows-`,
      showText: false,
      showText2: false,
      info: {
        name: 'ArchType',
        disableImg: true,
        title: 'Форма карниза',
        description: ['Выберите необходимую форму карниза']
      },
      optionDef: [
        { val: 1, name: 'Прямой' }
        // { val: 4, name: 'Эркер' },
        // { val: 2, name: 'Арка' },
        // { val: 3, name: 'Дуга' }
      ]
    }
  },


  created() {
    if (this.calcCornices.currentTemplates.length === 0) {
      const templateKarniz = []
      templateKarniz.push(this.template)
      templateKarniz.push(this.template)
      this.calcCornices.currentTemplates = templateKarniz
      this.calcCornices.templateRus =
        this.$store.getters['calcCore/templateRus']
    }
  },

  methods: {
    // setArchType(val) {
    //   if (!this.calcCornices.selectParamUser.includes('ArchType'))
    //     this.calcCornices.selectParamUser.push('ArchType')
    //   if (
    //     this.template.type + this.template.subtype === 'karniz10' &&
    //     val !== 1
    //   ) {
    //     let template = this.templates.filter((t) => t.type === 'karniz')
    //     template = this.$findMin(template, 'price')
    //     if (this.template.ArchType) {
    //       this.template.ArchType = val
    //       this.system.ArchType = val
    //     }
    //     template.ArchType ? (template.ArchType = val) : ''
    //     switch (val) {
    //       case 1:
    //         break
    //       case 2:
    //       case 3:
    //         template.Deflection = 350
    //         template.NumberOfRows = 1
    //         this.system.NumberOfRows = 1
    //         break
    //       case 4:
    //         this.system.AnglesCount = 1
    //         this.system.EndBracket = 1
    //         template.AnglesCount = 1
    //         template.Segment1 = 150
    //         template.Angle1 = 270
    //         template.Segment2 = 580
    //         break
    //       default:
    //     }
    //     this.calcCornices.NumberOfRows = this.system.NumberOfRows
    //     this.$store.dispatch('calcCore/calculate', template).then((res) => {
    //       if (res.status === 'OK') {
    //         const material = this.$minPriceMaterial()
    //         // console.log('material', material)
    //         res.item.material = material.tid
    //         this.$store.dispatch('calcCore/setMaterial', material)
    //         this.$store
    //           .dispatch('calcCore/calculate', res.item)
    //           .then((res2) => {
    //             if (res.status === 'OK') {
    //               this.calcCornices.currentTemplates[0] = res2.item
    //               if (this.template.ArchType) {
    //                 this.template.ArchType = val
    //                 this.system.ArchType = val
    //               }
    //             }
    //           })
    //       }
    //     })
    //   } else {
    //     if (this.template.ArchType) {
    //       this.template.ArchType = val
    //       this.system.ArchType = val
    //     }
    //     const template = JSON.parse(JSON.stringify(this.template))
    //     if (this.calcCornices.currentTemplates[1].subtype == 10) {
    //       let template2 = this.templates.filter(
    //         (t) => t.type === 'karniz' && t.subtype != '10' && t.subtype != '1'
    //       )
    //       template2 = this.$findMin(template2, 'price')
    //       if (template2.ArchType) template2.ArchType = 1
    //       this.$store.dispatch('calcCore/calculate', template2).then((res) => {
    //         if (res.status === 'OK') {
    //           this.calcCornices.currentTemplates[1] = res.item
    //         }
    //       })
    //     }
    //     template.ArchType ? (template.ArchType = val) : ''
    //     switch (val) {
    //       case 1:
    //         break
    //       case 2:
    //       case 3:
    //         template.Deflection = 350
    //         template.NumberOfRows = 1
    //         this.system.NumberOfRows = 1
    //         break
    //       case 4:
    //         this.system.AnglesCount = 1
    //         this.system.EndBracket = 1
    //         template.AnglesCount = 1
    //         template.Segment1 = 150
    //         template.Angle1 = 270
    //         template.Segment2 =
    //           parseFloat(this.calcCornices.currentTemplates[1].width) - -30
    //         break
    //       default:
    //     }
    //     this.calcCornices.NumberOfRows = this.system.NumberOfRows
    //     this.$store.dispatch('calcCore/calculate', template).then((res) => {
    //       if (res.status === 'OK') {
    //         const material = this.$minPriceMaterial()
    //         // console.log('material', material)
    //         res.item.material = material.tid
    //         this.$store.dispatch('calcCore/setMaterial', material)
    //         this.$store
    //           .dispatch('calcCore/calculate', res.item)
    //           .then((res2) => {
    //             if (res.status === 'OK') {
    //               this.calcCornices.currentTemplates[0] = res2.item
    //             }
    //           })
    //       }
    //     })
    //   }
    // },
    setAmount: function (type) {
      if (!this.calcCornices.selectParamUser.includes('NumberOfRows'))
        this.calcCornices.selectParamUser.push('NumberOfRows')
      this.template.NumberOfRows = type
      this.system.NumberOfRows = type
      this.calcCornices.NumberOfRows = type
      if (this.template.Segment2) {
        this.template.Segment2 = 550
      }
      this.calcCornices.currentTemplates[0] = JSON.parse(
        JSON.stringify(this.template)
      )
      const templates = this.calcCornices.currentTemplates[1]
      if (templates.ArchType) templates.ArchType = 1
      this.$store
        .dispatch('calcCore/setSizes', [{ width: templates.width / 10 }])
        .then(() => {
          this.$store.dispatch('calcCore/calculate', templates).then((res) => {
            if (res.status === 'OK') {
              this.calcCornices.templateRus = res.item_rus
              this.calcCornices.oldPrice = res.item.oldPrice
              this.calcCornices.price = res.item.price
              this.calcCornices.currentTemplates[1] = res.item
              if (templates.AnglesCount)
                this.system.AnglesCount = this.template.AnglesCount
              const baseTemplate = this.calcCornices.currentTemplates[0]
              this.$store
                .dispatch('calcCore/calculate', baseTemplate)
                .then((res) => {
                  if (res.status === 'OK') {
                    this.calcCornices.currentTemplates[0] = res.item
                  }
                })
            }
          })
        })
    }
  },

  computed: {
    templates() {
      return this.$store.getters['calcCore/templates']
    },
    template() {
      return this.$store.getters['calcCore/template']
    },
    systems() {
      return this.$store.getters['calcLibs/systems'][this.systemName]
    },
    system() {
      return this.$getSystem(this.systemName)
    },
    filterTemplates() {
      let templates = catalogStore.catalogGetter
    .filter(i => i.system === 'karniz')
    .filter(key => ['karniz11', 'karniz3', 'karniz2', 'karniz10'].includes(key.productId));


    if (this.calcCornices.NumberOfRows === '2') {
      templates = templates.filter(i => i.productId !== 'karniz11');
    }

      // console.log("🔎 Отфильтрованные шаблоны:", templates);
      
      return templates.sort((a, b) => a.sortId - b.sortId);
    },
    calcCornices() {
      const cornices = this.$store.getters['calcCornices/data']
      return cornices
    },
    options() {
      const arrParam = this.$store.getters['calcCore/params'].oParams
      if ('ArchType' in arrParam) {
        const arr = this.$getParams('ArchType').map((i) => {
          i.name = i.name === 'Нет' ? 'Прямой' : i.name
          return i
        })
        return arr
      }
      return {}
    }
  }
}
</script>

<style lang="sass" scoped>

.info_b
    position: absolute
    font-weight: bold
    font-size: 14px
    top: -25px
</style>
