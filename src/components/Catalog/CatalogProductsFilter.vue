<template>
  <div class="filter">
    <ui-title
      tag="p"
      class="ui-title-5 ui-font-weight-400"
    >
      Тип установки
    </ui-title>
    <fieldset>
      <ui-checkbox
        v-model="model['attachmentPoint']"
        label="На створку"
        value="flap"
      />
    </fieldset>
    <fieldset class="mb-4">
      <ui-checkbox
        v-model="model['attachmentPoint']"
        label="На проём"
        value="wall"
      />
    </fieldset>

    <ui-title
      tag="p"
      class="ui-title-5 ui-font-weight-400"
    >
      Система
    </ui-title>

    <fieldset class="mb-4">
      <ui-checkbox
        v-for="system in currentSystemsArray.filter(i => i.system !== 'profileCornices')"
        :key="system.system"
        v-model="model['system']"
        :label="system.name"
        :value="system.aliases"
      />
    </fieldset>

    <ui-title
      tag="p"
      class="ui-title-5 ui-font-weight-400"
    >
      Карнизы для штор
    </ui-title>

    <fieldset class="mb-4">
      <ui-checkbox
        v-for="system in currentSystemsArray.filter(i => i.system === 'profileCornices')"
        :key="system.system"
        v-model="model['system']"
        :label="system.name"
        :value="system.aliases"
      />
    </fieldset>

    <p
      v-if="filteredProducts && filteredProducts.length"
      class="filter-results"
    >
      Найдено изделий:
      <span class="ui-font-weight-400">
        {{ filteredProducts.length }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Getter } from 'nuxt-property-decorator'
import UiCheckbox from '@/components/UI/UI-Checkbox.vue'
import UiButton from '@/components/UI/UI-Button.vue'
import { systemsStore } from "@/utils/store-accessor";

interface FilterModel {
  [key: string]: string[]
}

@Component({
  components: { UiCheckbox, UiButton }
})
export default class CatalogProductsFilter extends Vue {
  public model: FilterModel = {
    attachmentPoint: [],
    system: []
  }

  @Prop()
  readonly products: any[]

  @Getter('productsFilter/filterParamsGetter') params
  @Getter('systems/systemProductsMapGetter') systemProductsMap
  @Getter('systems/attachmentPointsGetter') attachmentPoint

  @Watch('model', { immediate: false, deep: true })
  onModelChange() {
    this.$emit('input', this.filteredProducts)
  }

  get filteredProducts() {
    const updatedModel = {}
    Object.keys(this.model).map((key) => {
      updatedModel[key] = this.model[key].flat()
    })

    return this.filterArray(this.products, updatedModel)
  }

  createModel() {
    this.filterBy.forEach((char) => this.$set(this.model, char, []))
  }

  resetFilter() {
    this.createModel()
  }

  filterArray(array, fields) {
    const keys = Object.keys(fields)
    const usedFilter = keys.map((key) => fields[key].length).some((i) => i)
    if (usedFilter) {
      const filters = keys.map(
        (key) => (data) =>
          !fields[key].length || fields[key].includes(data[key])
      )
      return array.filter((el) => filters.every((fn) => fn(el)))
    }
    return array
  }

  get systems() {
    return systemsStore.systemsGetter
  }

  // Отфильтровывает ненужные параметры из списка в фильтре.
  // Допустим, если во входящем массиве изделий нет карнизов,
  // то в фильтре так же карнизы не отобразятся
  get currentSystemsArray() {
    const systemTypes = [...new Set(this.products.map((p) => p.system))]
    const currentSystems: string[] = []
    systemTypes.map((system) => {
      Object.keys(this.systemProductsMap).map((key) => {
        
        if (this.systemProductsMap[key].includes(system)) {
          currentSystems.push(key)
        }
      })
    })
    return this.systems?.filter((system) =>
      currentSystems.includes(system.system)
    )
  }
}
</script>

<style lang="scss" scoped>
.filter {
  padding: 40px 0 16px;

  &-group {
    margin-bottom: 16px;
  }

  &-results {
    margin-top: 20px;
  }
}
</style>
