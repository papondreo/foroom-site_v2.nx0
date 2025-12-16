<template>
  <div class="ui-mb-3 row">
    <div class="col-12">
      <button
        v-for="tab in tabs"
        :key="tab.alias"
        class="material-tabs__tab mr-2"
        :class="{ 'material-tabs__tab_disactive': tab.alias !== selectedTab }"
        :style="{ backgroundColor: tab.colors.bgr, color: tab.colors.txt }"
        @click="selectTab(tab.alias)"
      >
        {{ tab.name }}
        <span class="material-tabs__count">
          ({{ getCountMaterials(tab.alias) }})
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'
import { calculatorStore } from '@/utils/store-accessor'
import { Material } from "@/types/Materials";

@Component
export default class MaterialGroupTabs extends Vue {
  @Prop()
  filteredMaterials: Material[]

  selectedTab = null

  mounted() {
    this.setTabBySelectedMaterial()
  }

  setTabBySelectedMaterial() {
    const { material } = calculatorStore.calculatedItemGetter

    if (this.materials?.length) {
      const { tabAlias } = this.materials?.find((mat) => mat.tid === material)

      this.selectTab(tabAlias.split('_')[0])
    }
  }

  selectTab(alias) {
    this.selectedTab = alias
    this.$emit('input', alias)
  }

  getCountMaterials(alias) {
    return this.filteredMaterials?.filter((mat) => mat.tabAlias.split('_')[0] === alias).length
  }

  get params() {
    return calculatorStore.calculatedItemParamsGetter
  }

  get materials() {
    return calculatorStore.calculatedItemMaterialsGetter
  }

  get tabs() {
    const actions = {}

    this.materials?.forEach((mat) => {
      if (mat.isCurrentAction) {
        const alias = mat.currentActionInfo.alias.split('_')[0]
        if (!actions[alias]) {
          mat.currentActionInfo.alias = alias
          actions[alias] = mat.currentActionInfo
        }
      }
    })

    const tabs = Object.values(actions)

    if (this.materials?.some((mat) => !mat.isCurrentAction)) {
      tabs.push({
        alias: 'mainCollection',
        name: 'Основная коллекция',
        perc: 0,
        colors: {
          txt: '#fff',
          bgr: '#e38839'
        }
      })
    }

    return tabs
  }
}
</script>

<style lang="scss" scoped>
.material-tabs {
  margin-top: 0 !important;
  &__tab {
    padding: 3px 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    min-width: max-content;
    font-weight: 300;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    &:hover,
    &_active {
      color: $text-light-color;
      background-color: $brand-orange;
    }
    &:last-of-type {
      margin-right: 0;
    }
    &_disactive {
      background: #ebebeb !important;
      color: $text-color !important;
    }
    &_perc {
      margin-left: 7px;
      padding: 3px 7px;
      border-radius: 5px;
      background: #de0000;
      color: #fff;
    }
  }
  &__count {
    font-family: $brand-orange-light;
  }
}
</style>
