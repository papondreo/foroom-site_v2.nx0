<template>
  <div>
    <button
      v-for="tab in tabs"
      :key="tab.alias"
      class="material-tabs__tab mr-2"
      :class="{'material-tabs__tab_disactive': tab.alias !== selectedTab}"
      :style="{ backgroundColor: tab.colors.bgr, color: tab.colors.txt }"
      @click="selectTab(tab.alias)"
    >
      {{ tab.name }}
      <span class="material-tabs__count">
        ({{ getCountMaterials(tab.alias) }})
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "MaterialGroupsTabs",
  data: () => ({
    tabTooltip: true,
    selectedTab: null
  }),
  props: {
    materials: {
      type: Array,
      required: true
    }
  },
  computed: {
    tabs () {
      const materials = this.$getMaterials()
      const actions = {}

      materials.forEach(mat => {
        if (mat.isCurrentAction) {
          const alias = mat.currentActionInfo.alias.split('_')[0]
          if (!actions[alias]) {
            mat.currentActionInfo.alias = alias
            actions[alias] = mat.currentActionInfo
          }
        }
      })

      const tabs = Object.values(actions)

      if (materials.some(mat => !mat.isCurrentAction)) {
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
  },

  mounted () {
    this.setTabBySelectedMaterial()
  },

  methods: {
    setTabBySelectedMaterial () {
      const { material } = this.$store.getters['calcCore/template']
      const { tabAlias } = this.materials.find(mat => mat.tid === material)

      this.selectTab(tabAlias.split('_')[0])
    },
    selectTab (alias) {
      this.selectedTab = alias
      this.$emit('input', alias)
    },
    getCountMaterials (alias) {
      return this.materials.filter(mat => mat.tabAlias.split('_')[0] === alias).length
    }
  },
}
</script>
