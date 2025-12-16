<template>
  <footer
    v-if="system && step < stepsMap.filter((s) => s.inPaginator).length"
    class="constructor-footer row"
  >
    <div class="col-6">
      <button
        v-if="step > 1"
        @click="toPrevStep()"
        :disabled="loading || error"
        class="button button-prev"
      >
        <i
          class="fa fa-angle-left"
          aria-hidden="true"
        ></i>
        Назад
      </button>
    </div>
    <div class="col-6 tar">
      <button
        @click="toNextStep()"
        :disabled="loading || error"
        class="button button-next"
      >
        Продолжить
        <i
          class="fa fa-angle-right"
          aria-hidden="true"
        ></i>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ConstructorFooter',
  props: ['systemName'],
  data: function () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
    toNextStep() {
      this.$store.dispatch('common/setComponentLoading', true)
      this.step < this.stepsMap.filter((s) => s.inPaginator).length
        ? this.$store.dispatch('calcSteps/setStep', this.step + 1)
        : false

      setTimeout(() => {
        this.$store.dispatch('common/setComponentLoading', false)
      }, 600)

      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    toPrevStep() {
      this.$store.dispatch('common/setComponentLoading', true)
      this.step > 1
        ? this.$store.dispatch('calcSteps/setStep', this.step - 1)
        : false

      setTimeout(() => {
        this.$store.dispatch('common/setComponentLoading', false)
      }, 600)

      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  computed: {
    loading: function () {
      return this.$store.getters['common/loading']
    },
    error: function () {
      return this.$store.getters['common/error']
    },
    system: function () {
      return this.$getSystem(this.systemName)
    },
    stepsMap: function () {
      return this.$store.getters['calcSteps/stepsMap'][this.system.productId]
    },
    step: function () {
      return this.$store.getters['calcSteps/step']
    }
  }
}
</script>


<style lang="sass" scoped>
.constructor-footer
  margin-top: 40px

.constructor .button
  height: 35px
  border-radius: 4px
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  transition: 0.3s ease-in-out
  padding: 0 12px
  background: #f9a134
  color: #ffffff

.constructor .button-next
  padding-right: 5px
  background: #f9a134
  color: #ffffff

.constructor .button-prev
  padding-left: 5px
  border: 1px solid #f9a134
  background: #ffffff
  color: #f9a134

.tar
  text-align: right
  justify-content: flex-end
  display: flex
</style>
