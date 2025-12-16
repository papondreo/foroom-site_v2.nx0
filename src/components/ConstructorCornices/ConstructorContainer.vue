<template>
  <div class="row" v-if="!loading">
    <div class="col-12">
      <Paginator :systemName="systemName" />
    </div>
    <transition-group
      tag="div"
      class="w-100"
      name="fade"
      mode="out-in"
    >
      <template v-for="(component, key) in components">
        <component
          v-if="!componentLoading"
          :key="'component' + key"
          :is="component"
          :systemName="systemName"
          :data="stepsMap.components[key]"
        />
      </template>

      <div
        class="col-12"
        v-if="!componentLoading"
        key="constructorFooter"
      >
        <ConstructorFooter
          :systemName="systemName"
          v-if="!componentLoading"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
// import Vue from 'vue'
// import VueSilentbox from 'vue-silentbox'

import { catalogStore } from '../../utils/store-accessor'

export default {
  name: 'ConstructorContainer',
  props: ['systemName'],
  components: {
    Paginator: () => import('../../components/ConstructorCornices/Paginator'),
    ConstructorFooter: () =>
      import('../../components/ConstructorCornices/ConstructorFooter'),
    // extra
    KarnizArchType: () =>
      import('../../components/ConstructorCornices/steps/extra/KarnizArchType'),
    KarnizAmount: () =>
      import('../../components/ConstructorCornices/steps/extra/KarnizAmount'),
    KarnizName: () => import('../../components/ConstructorCornices/steps/extra/KarnizName'),
    KarnizSizesLong: () =>
      import('../../components/ConstructorCornices/steps/extra/KarnizSizesLong'),
    Karniz1_MountPoint: () =>
      import('../../components/ConstructorCornices/steps/extra/Karniz1_MountPoint'),
    KarnizAddiType: () =>
    import('../../components/ConstructorCornices/steps/extra/KarnizAddiType.vue'),  
    Karniz1_size: () =>
      import('../../components/ConstructorCornices/steps/extra/Karniz1_size')
  },
  data: function () {
    return {
      sys: null,
      loading: true
    }
  },
  mounted() {
    const { type, subtype } = this.$store.getters['calcCore/template']
    this.sys = catalogStore.catalogGetter.find(
      (product) => product.productId === type + subtype
    )
    this.loading = false
  },
  computed: {
    componentLoading: function () {
      return this.$store.getters['common/componentLoading']
    },
    step: function () {
      return this.$store.getters['calcSteps/step']
    },
    system: function () {
      // return null
      return this.$getSystem(this.systemName)
    },
    stepsMap() {
      const map = this.$store.getters['calcSteps/stepsMap']
      const productId = this.sys?.productId

      // console.log('🧩 [stepsMap] sys:', this.sys)
      // console.log('🧩 [stepsMap] productId:  Карниз', productId)
      // console.log('🧩 [stepsMap] map:', map?.[productId])

      if (!map || !productId || !map[productId]) {
        return { components: [] }
      }

      const paginatorSteps = map[productId].filter((step) => step.inPaginator)
      // console.log('🧩 [stepsMap] paginatorSteps шаги в Пагинации:', paginatorSteps)
      // console.log('🧩 [stepsMap] current step index индекс шаг в калькуляторе:', this.step - 1)

      return paginatorSteps[this.step - 1] || { components: [] }
    },
    components: function () {
  const registeredComponents = Object.keys(this.$options.components)
  const currentStep = this.stepsMap

  // constsole.log('🧩 [components] currentStep:', currentStep)

  if (!currentStep?.components) return []

  return currentStep.components.map((component) => {
    const folder = component.type === 'common' ? 'steps' : 'steps/extra'

    const componentName = component.type === 'common'
      ? component.name
      : this.$ucFirst(this.systemName) + component.name
      // console.log('🧩 [components] componentName Kомпонент:', componentName)

    const isRegistered = registeredComponents.includes(componentName)

    // console.log('🧩 [components] component:', component)
    // console.log('🧩 [components] folder:', folder)
    // console.log('🧩 [components] componentName:', componentName)
    // console.log('🧩 [components] isRegistered:', isRegistered)

    if (isRegistered) {
      // console.log(`✅ Компонент ${componentName} уже зарегистрирован`)
      return componentName
    }

    // console.log(`📦 Динамический импорт: ../../components/ConstructorCornices/${folder}/${componentName}.vue`)

    return () =>
      import(`../../components/ConstructorCornices/${folder}/${componentName}.vue`)
        .then(module => {
          // console.info(`✅ [Динамический импорт] ${componentName}`, module.default?.__file || '[файл не найден]')
          return module.default
        })
        .catch(err => {
          console.error(`❌ Ошибка при импорте компонента "${componentName}" для системы ${this.systemName}:`, err)
        })
  })
}
  },
  watch: {
  //   step(newStep) {
  //   console.log('Шаг изменен на', newStep)
  //   console.log('Текущий template:', this.$store.getters['calcCore/template'])
  // }
    system(val) {
      if (this.sys.name !== val.name) {
        
        this.$set(this, 'sys', val)
      }
    }
  }
}
</script>

<style lang="sass">
@import "@/assets/sass/constructor/main"
</style>
