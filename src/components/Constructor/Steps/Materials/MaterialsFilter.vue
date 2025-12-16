<template>
  <div class="ui-mb-3 row">
    <div class="filters-row mb-2">
      <input
        type="text"
        v-model="materialsFilter.search"
        class="search-input"
        placeholder="Поиск по названию материала"
      />
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
          :class="{ multiselect_clearable: materialsFilter.priceGroup.length }"
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
              <i
                class="fa fa-check-square-o"
                v-if="materialsFilter.priceGroup.includes(props.option)"
              ></i>
              <i
                class="fa fa-square-o"
                v-else
              ></i>
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
          :class="{ multiselect_clearable: materialsFilter.colorGroup.length }"
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
              <i
                class="fa fa-check-square-o"
                v-if="materialsFilter.colorGroup.includes(props.option)"
              ></i>
              <i
                class="fa fa-square-o"
                v-else
              ></i>
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
        v-if="!['hblinds', 'ks25', 'roma'].includes(template.type)"
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
          :class="{
            multiselect_clearable: materialsFilter.blackoutGroup.length
          }"
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
              <i
                class="fa fa-square-o"
                v-else
              ></i>
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
        <ui-checkbox v-model="materialsFilter.new">
          Новинки
        </ui-checkbox>
      </div>
      <div v-if="ecoMaterialsEnabled">
        <ui-checkbox v-model="materialsFilter.eco">
          Эко материалы Oeko-Tex
          <i
            class="fa fa-leaf ml-1"
            style="color: #18c139"
          ></i>
        </ui-checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

import { calculatorStore } from '@/utils/store-accessor'
import Multiselect from 'vue-multiselect'
import { Material } from '@/types/Materials'
import UiCheckbox from '@/components/UI/UI-Checkbox.vue'

@Component({
  components: { UiCheckbox, Multiselect }
})
export default class MaterialsFilter extends Vue {
  @Prop({ required: true, default: null })
  tab

  @Watch('materialsFilter', { immediate: false, deep: true })
  onModelChange() {
    this.$emit('input', this.materialsFilter)
  }

  mounted() {
    this.$set(this.materialsFilter, 'sortBy', this.sortGroups[0])
    this.$emit('input', this.materialsFilter)
  }

  materialsFilter = {
    search: '',
    sortBy: null,
    priceGroup: [],
    colorGroup: [],
    blackoutGroup: [],
    actionsGroup: [],
    eco: false,
    new: false
  }

  colorGroups = [
    { id: '1', class: 'red', title: 'Красный' },
    { id: '2', class: 'orange', title: 'Оранжевый' },
    { id: '3', class: 'yellow', title: 'Жетый' },
    { id: '4', class: 'green', title: 'Зеленый' },
    { id: '5', class: 'blue', title: 'Синий' },
    { id: '8', class: 'white', title: 'Белый' },
    { id: '6', class: 'purple', title: 'Розовый' },
    { id: '7', class: 'black', title: 'Черный' },
    { id: '10', class: 'gray', title: 'Серый' },
    { id: '9', class: 'beige', title: 'Бежевый' },
    { id: '11', class: 'brown', title: 'Коричневый' }
  ]

  blackoutGroups = [
    // {id: ['0', '1', '2', '3', '4'], title: 'светопропускающие'},
    // {id: ['5'], title: 'непрозрачные (blackout)'}
    {
      id: [0, 1],
      title: '70%',
      class: '70p'
    },
    {
      id: [2, 3],
      title: '50%',
      class: '50p'
    },
    {
      id: [4],
      title: '20%',
      class: '20p'
    },
    {
      id: [5],
      title: 'Blackout',
      class: '0p'
    }
  ]

  clearFilter(key) {
    this.$set(this.materialsFilter, key, [])
  }

  setSortBy(sortBy) {
    if (sortBy) {
      this.$set(this.materialsFilter, 'sortBy', sortBy)
    } else {
      this.$set(this.materialsFilter, 'sortBy', this.sortGroups[0])
    }
  }

  get template() {
    return calculatorStore.calculatedItemGetter
  }

  get materials() {
    return calculatorStore.calculatedItemMaterialsGetter
  }

  get ecoMaterialsEnabled() {
    return this.materials
      .filter((mat) => mat.tabAlias.split('_')[0] === this.tab)
      .some((mat) => mat.eco)
  }

  get newMaterialsEnabled() {
    return this.materials
      .filter((mat) => mat.tabAlias.split('_')[0] === this.tab)
      .some((mat) => mat.new)
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
    if (this.tab !== 'mainCollection') {
      return sortGroups
    }
    return sortGroups.filter((sg) => sg.type !== 'byDiscountSize')
  }

  get priceGroups() {
    const priceGroups: number[] = []
    this.materials!.forEach((material: Material) => {
      if (
        !priceGroups.includes(material.priceGroup) &&
        material.priceGroup <= 8
      ) {
        priceGroups.push(material.priceGroup)
      }
    })
    return priceGroups.sort((a, b) => a - b)
  }
}
</script>

<style lang="scss" scoped>
.filters-row {
  display: flex;
  flex-wrap: wrap;
}
.search-input {
  font-size: 14px;
  height: 34px;
  min-height: 34px;
  border-radius: 5px;
  border: 1px solid #c7c7c7;
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
  max-width: 338px;
  color: rgb(77, 77, 77);
}
.multiselect-wrapper {
  margin-bottom: 8px;
  margin-right: 8px;
}
.multiselect-option {
  font-size: 14px;
  display: flex;
  align-items: center;
  i {
    width: 20px;
  }
  img.blackout-ico {
    width: 15px;
    height: 15px;
    margin: -2px 5px 0 0 !important;
  }
  .color-icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: -2px 5px 0 0 !important;
    border-radius: 4px;
    &.red {
      background: #ff0000;
    }
    &.orange {
      background: #d38f2c;
    }
    &.yellow {
      background: #ffff00;
    }
    &.green {
      background: #7ed321;
    }
    &.blue {
      background: #4990e2;
    }
    &.white {
      background: #f5f5f5;
    }
    &.black {
      background: #000;
    }
    &.purple {
      background: #8f13fd;
    }
    &.gray {
      background: #9b9b9b;
    }
    &.beige {
      background: #e4b388;
    }
    &.brown {
      background: #8c572b;
    }
  }
}

.mr-3 {
  margin-right: 12px;
}
.multiselect-wrapper {
  min-width: 20%;
  display: flex;
  flex-shrink: 0;
}
.multiselect-button-clear {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 0 5px 5px 0;
  background: #ccc;
  color: #fff;
  font-size: 15px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #aaa;
  }
}
/deep/ {
  .multiselect {
    height: 34px;
    min-height: 34px;
    color: #4d4d4d;
    .multiselect__option {
      min-height: 34px;
      padding: 10px 12px;
      font-size: 14px;
    }
    .multiselect__option--highlight {
      background: $brand-orange-light;
    }
    .multiselect__option--highlight.multiselect__option--selected {
      background: $brand-orange-light;
    }
    .multiselect__option--selected {
      background: #f5f5f5;
    }

    .multiselect__placeholder,
    .multiselect,
    .multiselect__input,
    .multiselect__single {
      font-size: 14px;
      white-space: nowrap;
    }
    .multiselect__placeholder {
      padding-top: 1px;
    }
    .multiselect__tags {
      height: 34px;
      min-height: 34px;
      padding: 5px 40px 0 8px;
      border-color: #ccc;
    }
    .multiselect__select {
      width: 25px;
    }
  }
  .multiselect_clearable .multiselect__tags {
    border-right: #ccc;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>
