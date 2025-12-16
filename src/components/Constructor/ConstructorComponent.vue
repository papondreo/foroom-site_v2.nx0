<template>
  <div class="ui-mb-3">
    <!-- Заголовок компонента, если есть название и опции -->
    <ui-title
      v-if="componentData.title && optionsLength > 0"
      tag="h2"
      class="ui-title-2 ui-mb-2"
    >
      {{ componentData.title }}

      <!-- Кнопка для показа описания компонента -->
      <button
        v-if="componentData.description.length"
        @click="showDescription = !showDescription"
        class="ml-1 show-text"
      >
        <i class="fa fa-question-circle"></i>
      </button>
    </ui-title>


<!--    <p style="font-size: 13px">product ID: {{ productId }}</p>-->
<!--    <p style="font-size: 13px">product: {{ currentProduct.title }}</p>-->
<!--    <p-->
<!--      class="mb-3"-->
<!--      style="font-size: 13px"-->
<!--    >-->
<!--      component: {{ componentData.name }} / type: {{ componentData.type }}-->
<!--    </p>-->


    <!--    <pre>{{ currentTemplate }}</pre>-->
    <!--    <pre>{{ currentProduct }}</pre>-->

    <!-- Анимация показа описания, если оно есть -->
    <transition name="slide">
      <template v-if="componentData.description.length && showDescription">
        <p
          v-for="(p, key) in componentData.description"
          :key="key"
        >
          {{ p }}
        </p>
      </template>
    </transition>

    <!-- Динамически рендерим нужный компонент шага -->
    <component
      :key="'component' + productId"
      :is="component" 
      :template="currentTemplate"
      :product="currentProduct"
      @get-method="newMethod"
    />
    <!-- :key="'component' + productId" Определяем, какой компонент загружать -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'nuxt-property-decorator'
import Paginator from '@/components/Constructor/Paginator.vue'
import { calculatorStore, catalogStore } from '@/store'


@Component({
  components: {
    Paginator, // Компонент переключения шагов

    // Динамическая загрузка компонентов
    AttachmentPoint: () => import('@/components/Constructor/Steps/AttachmentPoint'),
    Box: () => import('@/components/Constructor/Steps/Box'),
    MountType: () => import('@/components/Constructor/Steps/MountType')
   
  }
})
export default class ConstructorComponent extends Vue {
  @Prop({ required: true }) // Принимает `componentData` от родителя
  componentData

  showDescription: boolean = false // Флаг для отображения описания

  @Provide() optionsLength = 1 // Количество доступных опций в компоненте

  mounted() {
    // console.log("ConstructorComponent Монтирован");
    // console.log("componentData:", this.componentData);
    // console.log("productId:", this.productId);
    // console.log("currentTemplate:", this.currentTemplate);
    // console.log("currentProduct:", this.currentProduct);
  }

  // Метод обновления количества опций
  newMethod(el){
    this.optionsLength = el.length
  }

  // 🔹 Выбор компонента для рендера
  get component() {
  const registeredComponents = Object.keys(this.$options.components)
  const folder = this.componentData?.type === 'common' ? 'Steps' : 'Steps/Extra'
  const componentName =
    this.componentData.type === 'common'
      ? this.componentData.name
      : this.$ucFirst(calculatorStore.calculatedItem?.type) + this.componentData.name


  if (registeredComponents.includes(componentName)) {
    // console.log("Компонент найден в `components`:", componentName)
    return componentName
  }

  // console.log("⚡ Динамическая загрузка:", `@/components/Constructor/${folder}/${componentName}`)
  return () => import(`@/components/Constructor/${folder}/${componentName}`)
}


  // 🔹 Получаем ID текущего товара
  get productId() {
    if (calculatorStore.calculatedItem) {
      const { type, subtype } = calculatorStore.calculatedItem
      // console.log("productId:", type + subtype)
      return type + subtype
    }
    // console.warn("Нет calculatedItem в calculatorStore")
    return false
  }

  // 🔹 Получаем шаблон текущего товара
  get currentTemplate() {
    // console.log("шаблон текущего товара currentTemplate:", calculatorStore.calculatedItem)
    return calculatorStore.calculatedItem
  }

  // 🔹 Получаем текущий товар из каталога
  get currentProduct() {
    // console.log("currentProduct:", catalogStore.currentProductGetter(this.productId))
    return catalogStore.currentProductGetter(this.productId)
  }
}


</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}
</style>

function useState(arg0: string) {
  throw new Error('Function not implemented.')
}

function useState(arg0: string) {
  throw new Error('Function not implemented.')
}
