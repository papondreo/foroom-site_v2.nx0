<template>
  <div class="filter">
    <div
      v-for="(char, key) in params"
      v-show="char.params"
      :key="key"
      class="filter-group"
    >
      <ui-title
        tag="p"
        class="ui-title-5 ui-font-weight-400"
      >
        {{ char.title }}
      </ui-title>

      <fieldset
        v-for="item in char.params"
        :key="item.name"
      >
        <ui-checkbox
          v-if="item.value.join(',') !== 'karniz,profileCornices'"
          v-model="model[key]"
          :label="item.name"
          :value="item.value"
        />
      </fieldset>

      <ui-title
        tag="p"
        class="ui-title-5 ui-font-weight-400 mt-4"
      >
        Карнизы для штор
      </ui-title>

      <fieldset>
        <ui-checkbox
          v-model="model.systemType"
          label="Профильные карнизы"
          :value="['karniz', 'profileCornices']"
        />
      </fieldset>
    </div>

<!--
    <p
      v-if="filteredProducts && filteredProducts.length"
      class="filter-results"
    >
      Найдено изделий:
      <span class="ui-font-weight-400">
        {{ filteredProducts.length }}
      </span>
    </p>
-->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Getter } from 'nuxt-property-decorator'
import UiCheckbox from '@/components/UI/UI-Checkbox.vue'
import UiButton from '@/components/UI/UI-Button.vue'

interface FilterModel {
  [key: string]: string[]
}

@Component({
  components: { UiCheckbox, UiButton }
})
export default class ProductsFilter extends Vue {
  public model: FilterModel = {}

  @Prop()
  readonly filterBy: string[]

  @Prop()
  readonly products: any[]

  @Getter('productsFilter/filterParamsGetter') params
  @Getter('systems/systemsGetter') systems
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

  created() {
    // console.log('filterBy', this.filterBy)
  }

  mounted() {
    this.createModel()
    this.createParams()
  }

  createModel() {
    this.filterBy.forEach((char) => this.$set(this.model, char, []))
  }

  // !!!!тут косяк!!!!
  createParams() {
    this.filterBy.map((value: string) => {
      if (value === 'systemType') {
        const currentSystems = this.getCurrentSystemsArray()

        this.params.systemType.params = Object.values(this.systems)
          .filter((item: any) => currentSystems.includes(item.system))
          .map((system: any) => ({
            name: system.name,
            value: this.systemProductsMap[system.system]
          }))
      }

      if (value === 'actionPerc') {
        const array = this.products.map((product) => product.actionPerc)
        const params = [...new Set(array)].sort()
        this.params.actionPerc.params = params.map((param) => ({
          name: `${param}%`,
          value: param
        }))
      }

      if (value === 'attachmentPoint') {
        this.params.attachmentPoint.params = this.attachmentPoint
      }
      // return this.params
    })
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

  // Отфильтровывает ненужные параметры из списка в фильтре.
  // Допустим, если во входящем массиве изделий нет карнизов,
  // то в фильтре так же карнизы не отобразятся
  getCurrentSystemsArray() {
    const systemTypes = [...new Set(this.products.map((p) => p.systemType))]
    const currentSystems: string[] = []
    systemTypes.map((system) => {
      Object.keys(this.systemProductsMap).map((key) => {
        if (this.systemProductsMap[key].includes(system)) {
          currentSystems.push(key)
        }
      })
    })
    return currentSystems
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
