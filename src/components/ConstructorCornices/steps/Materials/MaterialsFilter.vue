<template>
  <div>
    <div class="filters-row mb-2">
      <input
        type="text"
        v-model="materialsFilter.search"
        class="search-input"
        placeholder="Поиск по названию материала"
      >
    </div>
    <div class="filters-row mb-2">
      <div class="multiselect-wrapper mr-2">
        <multiselect
          v-model="materialsFilter.sortBy"
          :options="sortGroups"
          :multiple="false"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Сортировка"
          :showLabels="false"
          :searchable="false"
          :allow-empty="false"
          label="title"
          track-by="type"
        >
          <template
            slot="selection"
            slot-scope="{ values, isOpen }"
          >
            <span
              class="multiselect__single"
              v-if="values.length"
            >
              {{ values.title }}
            </span>
          </template>
        </multiselect>
      </div>
      <div class="multiselect-wrapper mr-2">
        <multiselect
          v-model="materialsFilter.priceGroup"
          :options="priceGroups"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          :preselect-first="false"
          :showLabels="false"
          :searchable="false"
          :class="{'multiselect_clearable': materialsFilter.priceGroup.length }"
          placeholder="Ценовая категория"
        >
          <template
            slot="selection"
            slot-scope="{ values, isOpen }"
          >
            <span
              class="multiselect__single"
              v-if="values.length"
            >
              Ценовая категория ({{ values.length }})
            </span>
          </template>

          <template
            slot="option"
            slot-scope="props"
          >
            <span class="multiselect-option">
              <i class="fa fa-check-square-o" v-if="materialsFilter.priceGroup.includes(props.option)"></i>
              <i class="fa fa-square-o" v-else></i>
              {{ props.option }}
            </span>
          </template>
        </multiselect>
        <button
          v-if="materialsFilter.priceGroup.length"
          class="multiselect-button-clear"
          @click="clearFilter('priceGroup')"
        >
          <i class="el-icon-close"></i>
        </button>
      </div>

      <div class="multiselect-wrapper mr-2">
        <multiselect
          v-model="materialsFilter.colorGroup"
          :options="colorGroups"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Цвет"
          :preselect-first="false"
          :showLabels="false"
          :searchable="false"
          :class="{'multiselect_clearable': materialsFilter.colorGroup.length }"
          label="title"
          track-by="id"
          style="min-width: 145px"
        >
          <template
            slot="selection"
            slot-scope="{ values, isOpen }"
          >
            <span
              class="multiselect__single"
              v-if="values.length"
            >
              Цвет ({{ values.length }})
            </span>
          </template>

          <template
            slot="option"
            slot-scope="props"
          >
            <span class="multiselect-option">
              <i class="fa fa-check-square-o" v-if="materialsFilter.colorGroup.includes(props.option)"></i>
              <i class="fa fa-square-o" v-else></i>
              <span
                class="color-icon"
                :class="props.option.class"
              />
              {{ props.option.title }}
            </span>
          </template>
        </multiselect>
        <button
          v-if="materialsFilter.colorGroup.length"
          class="multiselect-button-clear"
          @click="clearFilter('colorGroup')"
        >
          <i class="el-icon-close"></i>
        </button>
      </div>


      <div
        v-if="!['hblinds', 'ks25', 'roma', 'wood'].includes(template.type)"
        class="multiselect-wrapper"
      >
        <multiselect
          v-model="materialsFilter.blackoutGroup"
          :options="blackoutGroups"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Светопроницаемость"
          :preselect-first="false"
          :showLabels="false"
          :searchable="false"
          :class="{'multiselect_clearable': materialsFilter.blackoutGroup.length }"
          label="title"
          track-by="id"
        >
          <template
            slot="selection"
            slot-scope="{ values, isOpen }"
          >
            <span
              class="multiselect__single"
              v-if="values.length"
            >
              Светопроницаемость ({{ values.length }})
            </span>
          </template>

          <template
            slot="option"
            slot-scope="props"
          >
            <span class="multiselect-option">
              <i
                class="fa fa-check-square-o"
                v-if="materialsFilter.blackoutGroup.includes(props.option)"
              ></i>
              <i class="fa fa-square-o" v-else></i>
              <img
                class="blackout-ico"
                :src="`/_images/ico/${props.option.class}.svg`"
              />
              {{ props.option.title }}
            </span>
          </template>
        </multiselect>
        <button
          v-if="materialsFilter.blackoutGroup.length"
          class="multiselect-button-clear"
          @click="clearFilter('blackoutGroup')"
        >
          <i class="el-icon-close"></i>
        </button>
      </div>
    </div>

    <div class="filters-row">
      <div
        v-if="newMaterialsEnabled"
        class="mr-3"
      >
        <fieldset class="filter__fieldset fieldset__checkbox">
          <input
            v-model="materialsFilter.new"
            id="new"
            type="checkbox"
          >
          <label for="new">Новинки</label>
        </fieldset>
      </div>
      <div
        v-if="ecoMaterialsEnabled"
      >
        <fieldset class="filter__fieldset fieldset__checkbox">
          <input
            v-model="materialsFilter.eco"
            id="eco"
            type="checkbox"
          >
          <label for="eco">Эко материалы Oeko-Tex<i class="fa fa-leaf ml-1" style="color: #18c139"></i></label>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: "MaterialsFilter",
  components: { Multiselect },
  data: () => ({
    materialsFilter: {
      search: '',
      sortBy: null,
      priceGroup: [],
      colorGroup: [],
      blackoutGroup: [],
      actionsGroup: [],
      eco: false,
      new: false
    },
  }),
  props: ['tab'],
  mounted() {
    this.$set(this.materialsFilter, 'sortBy', this.sortGroups[0])
    this.$emit('input', this.materialsFilter)
  },

  methods: {
    clearFilter (key) {
      this.$set(this.materialsFilter, key, [])
    },
    setSortBy(sortBy) {
      if (sortBy) {
        this.$set(this.materialsFilter, 'sortBy', sortBy)
      } else {
        this.$set(this.materialsFilter, 'sortBy', this.sortGroups[0])
      }
    }
  },

  computed: {
    template () {
      return this.$store.getters['calcCore/template']
    },
    ecoMaterialsEnabled () {
      const materials = this.$getMaterials()
      return materials
        .filter(mat => mat.tabAlias.split('_')[0] === this.tab)
        .some(mat => mat.eco)
    },
    newMaterialsEnabled () {
      const materials = this.$getMaterials()
      return materials
        .filter(mat => mat.tabAlias.split('_')[0] === this.tab)
        .some(mat => mat.new)
    },
    sortGroups () {
      const sortGroups = this.$store.getters['calcLibs/sortGroups']
      if (this.tab !== 'mainCollection') {
        return sortGroups
      }
      return sortGroups.filter(sg => sg.type !== 'byDiscountSize')
    },
    priceGroups () {
      const materials = this.$getMaterials()
      const priceGroups = []
      materials.forEach(material => {
        if (!priceGroups.includes(material.priceGroup) && material.priceGroup <= 8) {
          priceGroups.push(material.priceGroup)
        }
      })
      return priceGroups.sort((a, b) => a - b)
    },
    colorGroups () {
      return this.$store.getters['calcLibs/colorGroups']
    },
    blackoutGroups () {
      return this.$store.getters['calcLibs/blackoutGroups']
    },
  }
}
</script>

<style lang="sass" scoped>
  .filters-row
    display: flex
    flex-wrap: wrap
  .search-input
    font-size: 14px
    height: 34px
    min-height: 34px
    border-radius: 5px
    border: 1px solid #c7c7c7
    padding-left: 5px
    padding-right: 5px
    width: 100%
    max-width: 338px
    color: rgb(77, 77, 77)
  .multiselect-wrapper
    margin-bottom: 5px
  .multiselect-option
    display: flex
    align-items: center
    i
      width: 20px

    img.blackout-ico
      width: 15px
      height: 15px
      margin: -2px 5px 0 0 !important

    .color-icon
      display: inline-block
      width: 15px
      height: 15px
      margin: -2px 5px 0 0 !important
      border-radius: 4px
      &.red
        background: #ff0000
      &.orange
        background: #d38f2c
      &.yellow
        background: #ffff00
      &.green
        background: #7ed321
      &.blue
        background: #4990e2
      &.white
        background: #f5f5f5
      &.black
        background: #000
      &.purple
        background: #8f13fd
      &.gray
        background: #9b9b9b
      &.beige
        background: #e4b388
      &.brown
        background: #8c572b


  .fieldset__checkbox [type="checkbox"]:not(:checked) + label,
  .fieldset__checkbox [type="checkbox"]:checked + label
    font-size: 15px

  .fieldset__checkbox [type="checkbox"]:not(:checked) + label::before,
  .fieldset__checkbox [type="checkbox"]:checked + label::before
    border: 1px solid #bbb
    box-shadow: none
  .fieldset__checkbox label:hover::before
    border-width: 1px !important

  .multiselect-wrapper
    min-width: 20%
    display: flex
    flex-shrink: 0

  .multiselect-button-clear
    display: flex
    justify-content: center
    align-items: center
    width: 34px
    height: 34px
    border-radius: 0 5px 5px 0
    background: #ccc
    color: #fff
    font-size: 15px
    transition: background-color .3s ease-in-out
    &:hover
      background-color: #aaa

  /deep/
    .multiselect
      .multiselect__option--highlight
        background: $mainButtonColor

      .multiselect__option--highlight.multiselect__option--selected
        background: $mainButtonColor

      .multiselect__option--selected
        background: #f5f5f5

    .multiselect__placeholder,
    .multiselect, .multiselect__input, .multiselect__single
      font-size: 14px
      white-space: nowrap
    .multiselect__placeholder
      padding-top: 1px
    .multiselect__tags
      padding-left: 5px
      padding-right: 25px
    .multiselect__select
      width: 25px
    .multiselect_clearable .multiselect__tags
      border-right: #ccc
      border-top-right-radius: 0 !important
      border-bottom-right-radius: 0 !important

</style>
