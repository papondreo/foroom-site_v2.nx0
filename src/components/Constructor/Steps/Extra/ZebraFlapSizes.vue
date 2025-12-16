<template>
  <div class="ui-mb-3 ui-mt-3 row">
    <product-scheme
      :product="product"
      :template="template"
      class="col-sm-5"
    />
    <div class="col-sm-7">
      <fieldset class="fieldset-input tac mb-3">
        <label for="width">Ширина, {{ params.width.mesure }}</label>
        <div>
          <p>от: {{ size.minWidth }}</p>
          <input
            @blur="setSize()"
            v-model="size.width"
            type="text"
            class="text"
            :class="{ invalid: error.width }"
            id="width"
          />
          <p>до: {{ size.maxWidth }}</p>

          <p
            v-if="params.width.max < size.maxWidth"
            class="sizes-desc"
          >
            Для материала <b>{{ params.material.mat_name }}</b> до
            {{ params.width.max }} {{ params.width.mesure }}
          </p>
        </div>
      </fieldset>

      <fieldset class="fieldset-input tac mb-4">
        <label for="height">Высота, {{ params.width.mesure }}</label>
        <div>
          <p>от: {{ size.minHeight }}</p>
          <input
            @blur="setSize()"
            v-model="size.height"
            :class="{ invalid: error.height }"
            type="text"
            class="text"
            id="height"
          />
          <p>до: {{ size.maxHeight }}</p>

          <p
            v-if="params.height.max < size.maxHeight"
            class="sizes-desc"
          >
            Для материала
            <b>{{ params.material.mat_name }}</b> до {{ params.height.max }}
            {{ params.width.mesure }}
          </p>
        </div>
      </fieldset>

      <div class="col-12 ui-mt-1">
        <p class="tac">
          Габаритные размеры (Ш х В, {{ params.width.mesure }}):
        </p>
        <p class="gab-sizes">
          {{ parseSizesMeasure(params.width.gab, 'width') }} x
          {{ parseSizesMeasure(params.height.gab, 'height') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { calculatorStore } from '@/store'
import ProductScheme from '@/components/Constructor/Steps/ProductScheme.vue'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: { ProductScheme }
})
export default class ZebraFlapSizes extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  size = {
    width: 0,
    height: 0,
    minWidth: 0,
    maxWidth: 0,
    minHeight: 0,
    maxHeight: 0
  }

  error = {
    width: false,
    height: false
  }

  created() {
    this.size = {
      width: this.parseSizesMeasure(this.template.width, 'width'),
      height: this.parseSizesMeasure(this.template.height, 'height'),
      minWidth: this.parseSizesMeasure(this.params.width.min, 'width'),
      maxWidth: this.parseSizesMeasure(this.params.width.max, 'width'),
      minHeight: this.parseSizesMeasure(this.params.height.min, 'height'),
      maxHeight: this.parseSizesMeasure(this.params.height.max, 'height')
    }
  }

  parseSizesMeasure(val: number, paramKey: string) {
    return this.params[paramKey].cm ? val / 10 : val
  }

  reparseSizesMeasure(val: number, paramKey: string) {
    return this.params[paramKey].cm ? val * 10 : val
  }

  parseSizesCostType(key) {
    const value = this.size[key].toString().replace(',', '.').replace(' ', '')
    return this.params[key].costtype === 1
      ? Math.round(parseFloat(value) * 10) / 10
      : Math.round(parseInt(value) * 10) / 10
  }

  checkSizesError() {
    const checkError = (paramKey: string): boolean => {
      return (
        this.size[paramKey] < this.size[`min${this.$ucFirst(paramKey)}`] ||
        this.size[paramKey] > this.size[`max${this.$ucFirst(paramKey)}`]
      )
    }

    this.error = {
      width: checkError('width'),
      height: checkError('height')
    }

    return Object.values(this.error).some((err) => err)
  }

  async setSize() {
    const error = this.checkSizesError()
    if (!error) {
      this.parseSizesCostType('width')
      this.parseSizesCostType('height')

      const { width, height } = this.size

      const template = {
        ...JSON.parse(JSON.stringify(this.template)),
        width: this.reparseSizesMeasure(width, 'width'),
        height: this.reparseSizesMeasure(height, 'height')
      }

      const res = await calculatorStore.calculate(template)

      if (res.hasError) {
        const material = this.$cheapestMaterial(true)
        template.material = material.tid

        await calculatorStore.calculate(template)
      }
    } else {
      // Сообщение: "Введите размеры"
    }
  }

  get params() {
    return calculatorStore.calculatedItemParamsGetter
  }
}
</script>

<style lang="scss" scoped>
.fieldset-input {
  margin-top: 5px;
  input {
    text-align: center;
    font-weight: 300;
    font-size: 17px;
    max-width: 100px;
    padding: 4px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &.invalid {
      border-color: #de0000;
      background: rgba(#de0000, 0.05);
    }
  }
  div {
    margin-top: 5px;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    justify-content: center;
    p {
      font-size: 16px;
      margin: 10px 15px;
    }
  }
}
.step-content p {
  margin-bottom: 10px;
  text-align: left;
  span {
    font-weight: 400;
  }
  &.subtitle {
    margin-bottom: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
  }
}
img {
  max-width: 300px;
  width: 100%;
}
.sizes-desc {
  margin-top: 10px;
  text-align: center !important;
  font-style: italic;
}
.gab-title {
  color: $brand-orange;
  font-weight: 400;
  margin-bottom: 10px;
  font-size: 17px;
  text-align: center !important;
}
.gab-sizes {
  font-size: 18px;
  text-align: center !important;
}
.tac {
  text-align: center !important;
}
.buttons {
  .button {
    display: block;
    padding: 10px 20px;
    background: none;
    text-transform: uppercase;
    color: $brand-orange;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      background: none !important;
      color: $brand-orange !important;
    }
  }
}
.shtapik {
  position: absolute;
  width: 250px;
  top: -225px;
  left: 150px;
  border-radius: 50%;
  border: 3px solid #f5f5f5;
  box-shadow: -7px 6px 16px 0px rgba(217, 217, 217, 1);
  z-index: 9;
}
.fa-question-circle {
  cursor: pointer;
}
.link {
  color: $brand-orange;
  text-decoration: none;
  text-align: center;
  margin-left: 5px;
  transition: 0.3s ease-in-out;
  &:hover {
    text-decoration: underline;
    color: $brand-orange-light;
  }
}
.material-tabs__tab_disactive {
  background: none !important;
  &:hover {
    background: #ebebeb !important;
  }
}
.material-tabs__tab_active {
  color: $text-light-color !important;
  background: #ffa845 !important;
}
</style>
