<template>
  <div class="col-12">
    <header class="constructor-header mb-3">
      <p class="constructor-header__title d-flex align-items-center">
        Дополнительные настройки
        <button
          v-if="data.description.length"
          @click="showText = !showText"
          class="ml-2 btn btn-sm btn-outline-secondary"
          title="Описание"
        >
          <i class="fa fa-question-circle"></i>
        </button>
      </p>
      <transition name="slide">
        <div v-if="showText" class="alert alert-info mt-2">
          <p v-for="(text, i) in data.description" :key="`desc${i}`" class="mb-1">
            {{ text }}
          </p>
        </div>
      </transition>
    </header>

    <div v-if="template.subtype === '11'" class="step-content">
      <div class="mb-3">
        <h5>Сторона управления</h5>
        <div class="row step-content hrz-scroll">
          <div
            v-for="side in sides"
            :key="side.val"
            class="col-md-4 col-6 mb-3 full-size"
          >
            <RadioButton
              name="ControlSide"
              :param="{ val: side.val }"
              :imgPath="imgPathSide(side.val)"
              :zoom="false"
              :label="side.label"
              :selectedValue="controlSideLabel"
              @input="onControlSide(side.val)"
            />
            <div class="infoBloc">
              <span class="desc" v-if="controlSideLabel === side.val">{{ side.desc }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <h5>Тип управления</h5>
        <div class="row step-content hrz-scroll">
          <div
            v-for="type in types"
            :key="type.val"
            class="col-md-4 col-6 mb-3 full-size"
          >
            <RadioButton
              name="ControlType"
              :param="{ val: type.val }"
              :imgPath="imgPathType(type.val)"
              :zoom="false"
              :label="type.label"
              :selectedValue="controlTypeLabel"
              @input="onControlType(type.val)"
            />
            <div class="infoBloc">
              <span class="desc" v-if="controlTypeLabel === type.val">{{ type.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning">
      <strong>Дополнительные настройки на данной системе отсутствуют</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: "KarnizAddiType",

  components: {
    RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
  },

  props: ['systemName', 'data'],

  data() {
    return {
      showText: false,
      sides: [
        { val: 'left', label: 'Левая сторона', desc: 'Механизм слева' },
        { val: 'right', label: 'Правая сторона', desc: 'Механизм справа' }
      ],
      types: [
        { val: 'manual', label: 'К механизму управления', desc: 'Ручное управление' },
        { val: 'electric', label: 'От центра в две стороны', desc: 'Электропривод' }
      ]
    }
  },

  computed: {
    template() {
      return this.$store.getters['calcCore/template']
    },
    controlSideLabel() {
      return this.template.ControlSide === 1 ? 'left' : 'right'
    },
    controlTypeLabel() {
      return this.template.ControlType === 3 ? 'manual' : 'electric'
    }
  },

  methods: {
    imgPathSide(val) {
      return `/_images/constructor/karniz-img/karniz11/${val}.jpg`
    },
    imgPathType(val) {
      return `/_images/constructor/karniz-img/karniz11/${val}.jpg`
    },
    onControlSide(val) {
      this.template.ControlSide = val === 'left' ? 1 : 2
      this.updateCalc()
    },
    onControlType(val) {
      this.template.ControlType = val === 'manual' ? 3 : 2
      this.updateCalc()
    },
    updateCalc() {
      this.$store.dispatch('calcCore/setSizes', this.template)
      this.$store.dispatch('calcCore/calculate', this.template)
    }
  },

  mounted() {
    console.log('🛠 template при монтировании:', JSON.stringify(this.template))
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"
@import "@/assets/sass/constructor/sizes-step"

.desc
  display: block
  margin-top: 0px
  font-size: 15px
  color: $lightFontColor !important

.infoBloc
  position: relative
  top: -90px
  height: 90px
</style>
