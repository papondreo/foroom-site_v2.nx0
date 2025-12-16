<template>
<!--  <main>-->
<!--    <page-component :pageName="$route.params.product" />-->
<!--    <pre>{{ templates }}</pre>-->
<!--  </main>-->
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1"
    >
      {{ page.h1 }}
    </ui-title>
    <constructor-container
      v-if="!processing"
      :system="currentSystem"
      class="row"
    />
  </main>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import PageComponent from '@/components/PageComponent.vue'
import { calculatorStore, catalogStore, pagesStore, systemsStore } from "@/store";

@Component({
  components: { PageComponent }
})
export default class ConstructorProductPage extends Vue {
  async mounted() {
    if (!calculatorStore.templatesGetter) {
      await calculatorStore.getTemplates()
    }

    if (!calculatorStore.calcStepsGetter) {
      await calculatorStore.getCalcSteps()
    }

    await calculatorStore.setCurrentStep(0)

    await calculatorStore.calculate(this.template)

    if (this.template?.type === 'rolo' || this.template?.type === 'zebra') {
      const product = catalogStore.catalogGetter.find(
        (product) =>
          product.productId === this.template.type + this.template.subtype
      )
      await calculatorStore.setControlType(product.controls.default)
    }

    if (this.template?.type !== 'karniz') {
      const material = await this.$cheapestMaterial(true)
      await calculatorStore.setMaterialToTemplate(material.tid)
      await calculatorStore.calculate(calculatorStore.calculatedItem)
    }
  }

  get page() {
    return pagesStore.currentPageGetter
      ? pagesStore.currentPageGetter
      : { h1: '' }
  }

  get template() {
    const productsIds = systemsStore.productsByUrlGetter(
      this.$route.params.systemName
    )

    const templates = calculatorStore.templatesGetter

    return templates
      ? templates.filter((template) => productsIds?.includes(template.type))[0]
      : null
  }

  get urlMap() {
    return systemsStore.systemUrlMapGetter
  }

  get currentSystem() {
    return this.urlMap.find(
      (item) => item.routeParam === this.$route.params.systemName
    ).system
  }

  get processing() {
    return calculatorStore.calcProcessGetter
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
