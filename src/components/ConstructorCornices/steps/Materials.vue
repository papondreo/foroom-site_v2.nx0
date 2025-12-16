<template>
  <div class="col-12">
    <header class="constructor-header">
      <div class="row">
        <div class="col-6">
          <p class="constructor-header__title">
            {{ data.title }}
            <button
              v-if="data.description.length"
              class="ml-1 show-text"
              @click="showText = !showText"
            >
              <i class="fa fa-question-circle"></i>
            </button>
          </p>
        </div>
      </div>

      <transition name="slide">
        <div v-if="showText">
          <p
            v-for="(text, i) in data.description"
            :key="`desc${i}`"
            class="mb-3"
          >
            {{ text }}
          </p>
          <p class="eco-description">
            <i class="fa fa-leaf"></i> – материалы, помеченные данным значком, имеют международный сертификат
            экологической безопасности Oeko-Tex Standard 100. Сертификат свидетельствует о том, что материалы абсолютно
            безопасны для здоровья человека и их производство не наносит вред окружающей среде.
          </p>
        </div>
      </transition>
    </header>

    <div class="row step-content mb-0">
      <MaterialGroupTabs
        class="col-12"
        v-model="tabAlias"
        :materials="materials"
      />

      <MaterialsFilter
        class="col-12 mt-2"
        v-model="materialsFilter"
        :tab="tabAlias"
      />
    </div>

    <div class="row">
      <div class="col-12">
        <div class="checkbox-group checkbox-group__materials mt-3">
          <MaterialCard
            v-for="(material, i) in filteredMaterials"
            v-if="i < countMaterialsShow"
            :key="material.tid"
            :material="material"
          />
        </div>

        <p
          v-if="!filteredMaterials.length"
          class="empty mt-5 mb-5"
        >
          По выбранным параметрам материалов не найдено
        </p>
      </div>
    </div>

    <div
      v-if="filteredMaterials.length > countMaterialsShow"
      class="row"
    >
      <div class="col-6">
        <button
          class="filter__success-button d-block mt-2"
          @click="showAll()"
        >
          Показать все
        </button>
      </div>
      <div class="col-6">
        <button
          @click="showMore()"
          class="filter__success-button d-block mt-2"
        >
          Показать ещё
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Materials',
  components: {
    MaterialGroupTabs: () => import('@/components/ConstructorCornices/steps/Materials/MaterialGroupsTabs'),
    MaterialsFilter: () => import('@/components/ConstructorCornices/steps/Materials/MaterialsFilter'),
    MaterialCard: () => import('@/components/ConstructorCornices/steps/Materials/MaterialCard')
  },
  props: [
    'systemName',
    'data'
  ],
  data: () => ({
    filters: false,
    showText: false,
    tabAlias: null,
    materialsFilter: null,
    countMaterialsShow: 12,
    showMoreStep: 12
  }),

  watch: {
    tabAlias(alias) {
      // при переходе на вкладку "Основная коллекция" переключаем сортировку на "По возрастанию цены"
      if (alias === 'mainCollection' && this.materialsFilter?.sortBy.type === 'byDiscountSize') {
        this.$set(this.materialsFilter, 'sortBy', this.sortGroups[0])
      }

      // при смене вкладки при активном фильтре "ЭКО", проверяем есть ли Эко материалы на переключаемой вкладке,
      // если их нет - сбрасываем фильтр
      if (this.materialsFilter?.eco && !this.ecoMaterialsEnabled) {
        this.$set(this.materialsFilter, 'eco', false)
      }

      if (this.materialsFilter?.new && !this.newMaterialsEnabled) {
        this.$set(this.materialsFilter, 'new', false)
      }
    }
  },

  methods: {
    showMore () {
      this.countMaterialsShow = this.countMaterialsShow + this.showMoreStep
    },

    showAll () {
      this.countMaterialsShow = this.materials.length
    },
  },

  computed: {
    materials () {
      const materials = this.$getMaterials()
      return this.$materialsFilter(materials, this.materialsFilter)
    },

    filteredMaterials () {
      let materials = this.materials.filter(mat => mat.tabAlias.split('_')[0] === this.tabAlias)
      if (this.materialsFilter && this.materialsFilter.search && this.materialsFilter.search.trim() !== '') {
        return materials.filter(material => material.name.toString().toLowerCase().includes(this.materialsFilter.search.toString().toLowerCase()))
      }
      return materials
    },

    sortGroups () {
      const sortGroups = this.$store.getters['calcLibs/sortGroups']
      if (this.tabAlias !== 'mainCollection') {
        return sortGroups
      }
      return sortGroups.filter(sg => sg.type !== 'byDiscountSize')
    },

    ecoMaterialsEnabled () {
      const materials = this.$getMaterials()
      return materials.filter(mat => mat.tabAlias === this.tabAlias).some(mat => mat.eco)
    },
    newMaterialsEnabled () {
      const materials = this.$getMaterials()
      return materials.filter(mat => mat.tabAlias === this.tabAlias).some(mat => mat.new)
    },
  }
}
</script>

<style lang="sass" scoped>
.empty
  width: 100%
  display: block
  text-align: center

.checkbox-group__materials
  margin-right: -15px
</style>
