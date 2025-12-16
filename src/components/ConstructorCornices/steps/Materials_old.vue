<template>
  <div class="col-12">
    <header class="constructor-header">
      <div class="row mb-3">
        <div class="col-6">
          <p class="constructor-header__title mt-2 mb-1">
            {{ data.title }}
            <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i
              class="fa fa-question-circle"></i></button>
          </p>
        </div>
        <div class="col-6 tar">
          <button class="bestsellers__filters-button d-block mt-0" @click="filters = !filters">
            <i class="fa fa-filter mr-2" aria-hidden="true"></i>
            Фильтры
          </button>
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
      <transition name="slide">
        <div v-if="filters" class="col-12">
          <div class="filters-wrapper">
            <div class="row constructor-filter">
              <div class="col-12">
                <p class="filter__category-title">Поиск</p>
                <input type="text" class="materials-search__input" v-model="materialsFilter.search"
                       placeholder="Введите название материала"/>
              </div>
              <div class="col-sm-6">
                <p class="filter__category-title">Ценовая категория</p>
                <div class="checkbox-group mb25">
                  <fieldset
                    v-for="group in priceGroups"
                    :key="`price-${group}`"
                    class="fieldset__checkbox fieldset__checkbox_label-top"
                  >
                    <input
                      v-model="materialsFilter.priceGroup"
                      @change="updateTab()"
                      :value="group"
                      type="checkbox"
                      class="checkbox"
                      :id="'colorGroup' + group"
                    />
                    <label :for="'colorGroup' + group">{{ group }}</label>
                  </fieldset>
                </div>
              </div>

              <div class="col-sm-6">
                <p class="filter__category-title">Цвет материала</p>
                <div class="checkbox-group mb25">
                  <fieldset
                    v-for="group in colorGroups"
                    :key="`color-${group.class}`"
                    class="fieldset__checkbox fieldset__checkbox_label-top"
                  >
                    <input
                      v-model="materialsFilter.colorGroup"
                      @change="updateTab()"

                      :value="group.id"
                      :id="'color-' + group.class"
                      type="checkbox"
                      class="checkbox"
                    >
                    <label :for="'color-' + group.class">
                      <i :class="group.class"></i>
                    </label>
                  </fieldset>

                </div>
              </div>

              <div v-if="actionsTabs && actionsTabs.length" class="col-sm-6">
                <p class="filter__category-title">Sale</p>
                <div class="checkbox-group mb-0">
                  <fieldset
                    v-for="tab in actionsTabs"
                    :key="`sale-${tab.perc}`"
                    v-if="tab.perc > 0"
                    class="fieldset__checkbox fieldset__checkbox_label-top mr-3"
                  >
                    <input
                      v-model="materialsFilter.actionsGroup"
                      @change="updateTab()"
                      :value="tab.perc"
                      type="checkbox"
                      class="checkbox"
                      :id="tab.alias"
                    />
                    <label :for="tab.alias">{{ tab.perc }}%</label>
                  </fieldset>
                </div>
              </div>

              <div class="col-sm-6">
                <p class="filter__category-title">Светопроницаемость</p>
                <div class="checkbox-group mb-0">
                  <fieldset
                    class="fieldset__checkbox fieldset__checkbox_inline fieldset-checkbox_left"
                  >
                    <input
                      v-model="materialsFilter.blackoutGroup"
                      @change="updateTab()"
                      value="0,1"
                      id="blackoutGroup0"
                      type="checkbox"
                      class="checkbox"
                    >
                    <label for="blackoutGroup0">
                      <img class="blackout-ico" src="/_images/ico/70p.svg" alt="">
                      70%
                    </label>
                  </fieldset>

                  <fieldset
                    class="fieldset__checkbox fieldset__checkbox_inline fieldset-checkbox_left"
                  >
                    <input
                      v-model="materialsFilter.blackoutGroup"
                      @change="updateTab()"
                      value="2,3"
                      id="blackoutGroup2"
                      type="checkbox"
                      class="checkbox"
                    >
                    <label for="blackoutGroup2">
                      <img class="blackout-ico" src="/_images/ico/50p.svg" alt="">
                      50%
                    </label>
                  </fieldset>

                  <fieldset
                    class="fieldset__checkbox fieldset__checkbox_inline fieldset-checkbox_left"
                  >
                    <input
                      v-model="materialsFilter.blackoutGroup"
                      @change="updateTab()"
                      value="4"
                      id="blackoutGroup4"
                      type="checkbox"
                      class="checkbox"
                    >
                    <label for="blackoutGroup4">
                      <img class="blackout-ico" src="/_images/ico/20p.svg" alt="">
                      20%
                    </label>
                  </fieldset>

                  <fieldset
                    class="fieldset__checkbox fieldset__checkbox_inline fieldset-checkbox_left"
                  >
                    <input
                      v-model="materialsFilter.blackoutGroup"
                      @change="updateTab()"
                      value="5"
                      id="blackoutGroup5"
                      type="checkbox"
                      class="checkbox"
                    >
                    <label for="blackoutGroup5">
                      <img class="blackout-ico" src="/_images/ico/0p.svg" alt="">
                      Blackout
                    </label>
                  </fieldset>
                </div>
              </div>

              <div class="col-sm-6" v-if="ecoMaterials">
                <p class="filter__category-title">Экологичность</p>
                <div class="checkbox-group mb-0">
                  <fieldset
                    class="fieldset__checkbox fieldset__checkbox_inline fieldset-checkbox_left"
                  >
                    <input
                      v-model="materialsFilter.eco"
                      @change="updateTab()"
                      type="checkbox"
                      class="checkbox"
                      id="eco"
                    />
                    <label for="eco"> Oeko-Tex <i class="fa fa-leaf ml-1" style="color: #18c139"></i></label>
                  </fieldset>
                </div>
              </div>
            </div>

          </div>
        </div>
      </transition>

      <template v-if="materials.length">
        <div class="col-12 material-tabs">
          <button
            v-for="(tab, i) in tabs.filter(tab => tab.alias === 'actions')"
            :key="`act-tab-${i}`"
            :class="{'material-tabs__tab_disactive': selectedTab === 'mainCollection'}"
            :style="{backgroundColor: tab.background, color: tab.color}"
            @click="selectTab(tab.alias)"
            class="material-tabs__tab"
          >
            {{ tab.title }}
          </button>
          <div class="button-tooltip">
            <button
              v-show="getCountMaterials('mainCollection')"
              v-for="(tab, i) in tabs.filter(tab => tab.alias === 'mainCollection')"
              :key="`tab-${i}`"
              :class="{'material-tabs__tab_disactive': tab.alias !== selectedTab}"
              :style="{backgroundColor: tab.background, color: tab.color}"
              @click="selectTab(tab.alias)"
              class="material-tabs__tab"
            >
              {{ tab.title }}
              <span
                v-if="tab.alias !== 'actions'"
                class="material-tabs__count"
              >
              ({{ getCountMaterials(tab.alias) }})
            </span>
            </button>
            <transition name="fade">
              <div
                v-if="tabTooltip && getCountMaterials('mainCollection')"
                class="material-tabs__tooltip"
              >
                Больше материалов тут!
              </div>
            </transition>
          </div>
        </div>

        <div v-if="selectedTab !== 'mainCollection'" class="col-12 material-tabs" style="margin-top: 10px !important;">
          <button
            v-for="(tab, i) in actionsTabs"
            :key="`tab-${i}`"
            :class="{'material-tabs__tab_disactive': tab.alias !== selectedTab, 'pr-0': tab.perc }"
            :style="{backgroundColor: tab.background, color: tab.color}"
            @click="selectTab(tab.alias)"
            class="material-tabs__tab"
          >
            {{ tab.title }}
            <span
              class="material-tabs__count"
            >
                ({{ getCountMaterials(tab.alias) }})
              </span>
            <span
              class="material-tabs__tab_perc"
              v-if="tab.perc"
            >
                -{{ Math.round(tab.perc * 100) / 100 }}%
              </span>
          </button>
        </div>
      </template>
      <p v-else class="subtitle">По выбранным параметрам материалов не найдено</p>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="checkbox-group checkbox-group__materials mt-3">
          <fieldset
            v-for="(material, key) in materials.filter(m => m.actionAlias === selectedTab)"
            :key="`mat-${key}`"
            v-if="key < countMaterials[selectedTab]"
            class="fieldset-checkbox-img fieldset-checkbox-img_left"
          >
            <input
              @change="setMaterial(material)"
              :id="material.tid"
              name="material"
              type="radio"
              class="checkbox"
              :checked="material.tid == template.material"
            >
            <label :for="material.tid">
              <div class="img" :style="`backgroundImage: url(${getMaterialIcon(material.img)})`">
                <i v-if="material.eco" class="fa fa-leaf eco"></i>
                <p v-if="material.new" class="new">NEW</p>
              </div>

              <p v-if="material.isCurrentAction" class="mark-action">
                {{ parseInt(material.currentActionInfo.perc * 100) }}%</p>
              <span>{{ material.name }}</span>
            </label>
          </fieldset>

          <p v-if="!materials.filter(m => m.actionAlias === selectedTab).length" class="subtitle">По выбранным параметрам материалов не найдено</p>
        </div>

        <div v-if="getCountMaterials(selectedTab) > countMaterials[selectedTab]" class="row">
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
    </div>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'Materials',
  components: {},
  props: [
    'systemName',
    'data'
  ],
  data: function () {
    return {
      config,
      filters: false,
      materialsFilter: {
        search: '',
        priceGroup: [],
        colorGroup: [],
        blackoutGroup: [],
        actionsGroup: [],
        eco: false
      },
      mat: {},
      selectedTab: '',
      tabs: [],
      countMaterials: {},
      tabTooltip: false,
      ecoMaterials: false,
      showMoreStep: 12,
      showText: false,
    }
  },

  mounted () {
    this.tabs = this.$createMaterialTabs()
    // Auto select Action Tab
    const actions = this.tabs.find(tab => tab.alias === 'actions')

    if (actions) {
      const actionTabs = actions.actionsTabs
      const tabs = actionTabs.concat(this.tabs[this.tabs.length - 1])
      if (this.$route.query.action && tabs.some(tab => tab.alias === this.$route.query.action)) {
        this.selectTab(this.$route.query.action)

      } else {

        const materialId = this.template.material
        const material = this.materials.find(mat => mat.tid === materialId)

        this.selectTab(material.actionAlias)
      }

      setTimeout(()  => {
        this.tabTooltip = true
      }, 1500)

      setTimeout(()  => {
        this.tabTooltip = false
      }, 4500)


    } else {
      this.selectTab(this.tabs[0].alias)
    }



    // Костыль от Игоря
    // this.selectTab(this.tabs[this.tabs.length - 1].alias)

    this.setCountMaterials()

    this.checkEcoMaterials()
  },

  methods: {
    checkEcoMaterials() {
      this.ecoMaterials = this.materials.some(material => material.eco)
    },

    getMaterialIcon({ico1, ico2}) {
      const icon = ico1 ? ico1 : ico2
      return `${this.config.rootPath}img/${icon}`
    },

    setMaterial: function (material) {
      this.$store.dispatch('common/blinkCheck')
      this.$store.dispatch('calcCore/setMaterial', material)
      this.$store.dispatch('calcCore/setUserMaterial', material)
      this.template.material = material.tid
      this.$store.dispatch('calcCore/calculate', this.template)
    },

    selectTab (alias) {
      if (alias === 'actions') {
        this.selectedTab = this.tabs.find(tab => tab.alias === 'actions').actionsTabs[0].alias
      } else {
        this.selectedTab = alias
      }
    },

    showMore: function () {
      this.$set(this.countMaterials, this.selectedTab, this.countMaterials[this.selectedTab] += this.showMoreStep)
    },

    showAll: function () {
      const materials = this.$getMaterials().filter(mat => mat.actionAlias === this.selectedTab)

      this.$set(this.countMaterials, this.selectedTab, materials.length)
    },

    setCountMaterials: function () {
      this.tabs.map(tab => {
        if (tab.alias === 'actions') {
          tab.actionsTabs.map(t => {
            this.$set(this.countMaterials, t.alias, this.showMoreStep)
          })
        } else {
          this.$set(this.countMaterials, tab.alias, this.showMoreStep)
        }
      })
    },

    updateTab: function () {
      if (!this.getCountMaterials(this.selectedTab)) {
        for (let tab of this.tabs) {
          if (this.getCountMaterials(tab.alias)) {
            this.selectTab(tab.alias)
            break;
          }
        }
      }
    },

    getCountMaterials: function (alias) {
      return this.materials.filter(material => material.actionAlias === alias).length
    }
  },
  computed: {
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    priceGroups: function () {
      const materials = this.$getMaterials()
      const priceGroups = []
      materials.map(material => {
        if (!priceGroups.includes(material.priceGroup) && material.priceGroup <= 8) {
          priceGroups.push(material.priceGroup)
        }
      })
      return priceGroups.sort((a, b) => a - b)
    },

    colorGroups: function () {
      return this.$store.getters['calcLibs/colorGroups']
    },

    blackoutGroups: function () {
      return this.$store.getters['calcLibs/blackoutGroups']
    },

    materials: function () {
      const materials = this.$getMaterials()
      console.log(this.$materialsFilter(materials));
      return this.$materialsFilter(materials)
    },

    actionsTabs () {
      return this.tabs.find(tab => tab.alias === 'actions')?.actionsTabs
    }
  }
}
</script>

<style lang="sass">
.material-tab-tooltip
  background: #f9a134
  color: #fff
  box-shadow: 2px 2px 3px rgba(#aaa, .4)
  &[x-placement^=right] .tooltip-arrow
    border-right-color: #f9a134 !important
</style>

<style lang="sass" scoped>
.button-tooltip
  position: relative
  display: inline-block
.material-tabs__tooltip
  position: relative
  display: inline-block
  margin-left: 8px
  padding: 2px 12px
  background: #f9a134
  color: #fff
  border-radius: 3px
  box-shadow: 2px 2px 3px rgba(#aaa, .4)
  animation-name: bounceX
  animation-timing-function: ease
  animation-duration: 2s
  animation-iteration-count: infinite
  transition: .3s ease-in-out
  &::before
    content: ""
    width: 0
    height: 0
    border-style: solid
    position: absolute
    border-right-color: #f9a134 !important
    border-width: 5px 5px 5px 0
    border-top-color: transparent !important
    border-left-color: transparent !important
    border-bottom-color: transparent !important
    top: 9px
    left: -5px
    margin-left: 0
    margin-right: 0
@media screen and (max-width: 568px)
  .material-tabs__tooltip
    position: absolute
    right: 0
    left: 0
    bottom: -30px
    width: fit-content
    margin: 0 auto
    text-align: center
    z-index: 99
    animation-name: bounceY
    &::before
      content: ""
      width: 0
      height: 0
      border-style: solid
      position: absolute
      border-width: 0 5px 5px 5px
      border-top-color: transparent !important
      border-right-color: transparent !important
      border-left-color: transparent !important
      border-bottom-color: #f9a134 !important
      top: -5px
      left: calc(50% - 5px)
      margin-left: 0
      margin-right: 0
@keyframes bounceX
  0%
    transform: translateX(7px)
  50%
    transform: translateX(-3px)
  100%
    transform: translateX(7px)

@keyframes bounceY
  0%
    transform: translateY(7px)
  50%
    transform: translateY(-3px)
  100%
    transform: translateY(7px)
.eco
  position: absolute
  bottom: -5px
  left: -5px
  font-size: 24px
  color: #18c139
  background: #f5f5f5
  border-radius: 50%
  padding: 4px 5px 1px 1px

.eco-description
  margin-bottom: 30px
  font-size: 16px

  i
    color: #18c139

.subtitle
  width: 100%
  display: block
  text-align: center
</style>
