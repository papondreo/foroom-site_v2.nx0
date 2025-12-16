<template>
  <div class="ui-mb-4 ui-mt-3 row">
<!--    <material-group-tabs-->
<!--      v-model="tabAlias"-->
<!--      :filteredMaterials="materials"-->
<!--      class="col-12"-->
<!--    />-->
    <materials-filter
      v-model="materialsFilter"
      :tab="tabAlias"
      class="col-12"
    />
    <material-card
      v-for="material in materialsPaginator"
      :key="material.tid"
      :material="material"
    />
    <div
      v-if="materialsCount < materialsByTab.length"
      class="col-12"
    >
      <div class="row">
        <div class="col-6">
          <button
            class="ui-button paginator-button"
            @click="showAll"
          >
            Показать все
          </button>
        </div>
        <div class="col-6">
          <button
            class="ui-button paginator-button"
            @click="showMore"
          >
            Показать ещё
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { calculatorStore } from '@/utils/store-accessor'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

import MaterialCard from '@/components/Constructor/Steps/Materials/MaterialCard.vue'
import MaterialGroupTabs from '@/components/Constructor/Steps/Materials/MaterialGroupTabs.vue'
import MaterialsFilter from '@/components/Constructor/Steps/Materials/MaterialsFilter.vue'

@Component({
  components: { MaterialsFilter, MaterialGroupTabs, MaterialCard }
})
export default class Materials extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  @Watch('tabAlias')
  onTabChange(tabAlias) {
    if (
      tabAlias === 'mainCollection' &&
      this.materialsFilter?.sortBy.type === 'byDiscountSize'
    ) {
      this.$set(this.materialsFilter, 'sortBy', this.sortGroups[0])
    }

    // при смене вкладки при активном фильтре "ЭКО",
    // проверяем есть ли Эко материалы на переключаемой вкладке,
    // если их нет - сбрасываем фильтр
    if (this.materialsFilter?.eco && !this.ecoMaterialsEnabled) {
      this.$set(this.materialsFilter, 'eco', false)
    }

    if (this.materialsFilter?.new && !this.newMaterialsEnabled) {
      this.$set(this.materialsFilter, 'new', false)
    }
  }

  public tabAlias = null
  public materialsFilter = {
    search: '',
    sortBy: null,
    priceGroup: [],
    colorGroup: [],
    blackoutGroup: [],
    actionsGroup: [],
    eco: false,
    new: false
  }
  public materialsCount = 10

  showMore() {
    this.materialsCount += 5
  }

  showAll() {
    this.materialsCount = 99999999999
  }

  get params() {
    return calculatorStore.calculatedItemParamsGetter
  }

  get materialsPaginator() {
    return this.materialsByTab.slice(0, this.materialsCount)
  }

  get materialsByTab() {
    return this.materials
      //?.filter((mat) => mat.tabAlias.split('_')[0] === this.tabAlias)
  }

  get sortGroups() {
    const sortGroups = [
      {
        type: 'byDiscountSize',
        title: 'По величине скидки'
      },
      {
        type: 'cheapFirst',
        title: 'Сначала дешевые'
      },
      {
        type: 'expensiveFirst',
        title: 'Сначала дорогие'
      }
    ]
    if (this.tabAlias !== 'mainCollection') {
      return sortGroups
    }
    return sortGroups.filter((sg) => sg.type !== 'byDiscountSize')
  }

  ecoMaterialsEnabled() {
    const materials = calculatorStore.calculatedItemMaterialsGetter
    return materials
      ?.filter((mat) => mat.tabAlias === this.tabAlias)
      .some((mat) => mat.eco)
  }

  newMaterialsEnabled() {
    const materials = calculatorStore.calculatedItemMaterialsGetter
    return materials
      ?.filter((mat) => mat.tabAlias === this.tabAlias)
      .some((mat) => mat.new)
  }

  get materials() {
    let materials = calculatorStore.calculatedItemMaterialsGetter

    if (materials) {
      if (
        this.materialsFilter &&
        this.materialsFilter.search &&
        this.materialsFilter.search.trim() !== ''
      ) {
        return materials.filter((material) =>
          material.name
            .toString()
            .toLowerCase()
            .includes(this.materialsFilter.search.toString().toLowerCase())
        )
      }

      if (this.materialsFilter.priceGroup.length) {
        materials = materials.filter((material) =>
          this.materialsFilter.priceGroup.includes(material.priceGroup)
        )
      }

      if (this.materialsFilter.colorGroup.length) {
        const colorGroup = this.materialsFilter.colorGroup.map((cg) => cg.id)
        materials = materials.filter((material) =>
          colorGroup.includes(material.colorGroup.toString())
        )
      }

      if (this.materialsFilter.blackoutGroup.length) {
        const bg = this.materialsFilter.blackoutGroup
          .map((bg) => bg.id)
          .toString()
          .split(',')
        materials = materials.filter((material) =>
          bg.includes(material.blackoutGroup.toString())
        )
      }

      if (this.materialsFilter.actionsGroup.length) {
        materials = materials.filter(
          (material) =>
            material.isCurrentAction &&
            this.materialsFilter.actionsGroup.includes(
              material.currentActionInfo.perc * 100
            )
        )
      }

      if (this.materialsFilter.eco) {
        materials = materials.filter((material) => material.eco)
      }

      if (this.materialsFilter.new) {
        materials = materials.filter((material) => material.new)
      }

      if (this.materialsFilter.sortBy) {
        switch (this.materialsFilter.sortBy.type) {
          // от дешевых к дорогим
          case 'cheapFirst':
            return materials.sort((a, b) => {
              const priceGroupA = a.priceGroup
              const priceGroupB = b.priceGroup
              if (priceGroupA < priceGroupB) return -1
              if (priceGroupA > priceGroupB) return 1
              return 0
            })
          // от дорогих к дешевым
          case 'expensiveFirst':
            return materials.sort((a, b) => {
              const priceGroupA = a.priceGroup
              const priceGroupB = b.priceGroup
              if (priceGroupA > priceGroupB) return -1
              if (priceGroupA < priceGroupB) return 1
              return 0
            })
          // по размеру скидки
          case 'byDiscountSize':
            materials = materials.map((mat) => ({
              ...mat,
              discountPercent: mat.isCurrentAction
                ? mat.currentActionInfo.perc
                : 0
            }))
            return materials.sort((a, b) => {
              const percentA = a.discountPercent
              const percentB = b.discountPercent
              if (percentA > percentB) return -1
              if (percentA < percentB) return 1
              return 0
            })
          // от дешевых к дорогим
          default:
            return materials.sort((a, b) => {
              const priceGroupA = a.priceGroup
              const priceGroupB = b.priceGroup
              if (priceGroupA < priceGroupB) return -1
              if (priceGroupA > priceGroupB) return 1
              return 0
            })
        }
      }
    }

    return materials
  }
}
</script>

<style lang="scss" scoped>
.paginator-button {
  width: 100%;
  padding: 6px 16px;
  background-color: #ffffff;
  border: 1px solid #f9a134;
  color: #f9a134;

  &:hover {
    background-color: #f9a134;
    color: #fff;
  }
}
</style>
