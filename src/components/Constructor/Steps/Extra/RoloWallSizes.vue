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
          <p>от: 25</p>
          <input
            @blur="setSize('width')"
            v-model="size.width"
            type="text"
            class="text"
            :class="{
              invalid:
                error.width || size.width < 25 || size.width > size.maxWidth
            }"
            id="width"
          />
          <p>до: {{ size.maxWidth }}</p>
        </div>
        <p
          v-if="
            recommendedDimensions.dim_height &&
            recommendedDimensions.dim_height < size.height
          "
          class="sizes-desc"
        >
          для выбора ширины до
          {{ dimensions.width }} {{ params.width.mesure }}<br />
          уменьшите высоту до
          {{ recommendedDimensions.dim_height }} {{ params.width.mesure }}
        </p>
      </fieldset>

      <fieldset class="fieldset-input tac mb-4">
        <label for="height">Высота, {{ params.width.mesure }}</label>
        <div>
          <p>от: 30</p>
          <input
            @blur="setSize('height')"
            v-model="size.height"
            :class="{
              invalid:
                error.height || size.height < 30 || size.height > size.maxHeight
            }"
            type="text"
            class="text"
            id="height"
          />
          <p>до: {{ size.maxHeight }}</p>
        </div>

        <p
          v-if="
            recommendedDimensions.dim_width &&
            recommendedDimensions.dim_width < size.width
          "
          class="sizes-desc"
        >
          для выбора высоты до
          {{ dimensions.height }} {{ params.width.mesure }}<br />
          уменьшите ширину до
          {{ recommendedDimensions.dim_width }} {{ params.width.mesure }}
        </p>
      </fieldset>

      <div class="col-12 ui-mt-1">
        <p class="tac">
          Габаритные размеры (Ш х В, {{ params.width.mesure }}):
        </p>
        <p class="gab-sizes">
          {{ parseSizesMeasure(params.width.gab) }} x
          {{ parseSizesMeasure(params.height.gab) }}
        </p>
      </div>
    </div>

<!--    <pre class="col-12">-->
<!--      {{ products }}-->
<!--    </pre>-->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import {
  calculatorStore,
  catalogStore,
  siteComponentStatesStore
} from '@/store'
import ProductScheme from '@/components/Constructor/Steps/ProductScheme.vue'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'
import { findMin } from '@/libs/findMin'

@Component({
  components: { ProductScheme }
})
export default class RoloWallSizes extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  public calcParams
  public measure: string = 'cm'

  public size = {
    width: 0,
    height: 0,
    minWidth: 0,
    maxWidth: 0,
    minHeight: 0,
    maxHeight: 0
  }

  public dimensions = {
    width: 0,
    height: 0
  }

  public error = {
    width: false,
    height: false
  }

  public recommendedDimensions = {
    width: 0,
    height: 0,
    dim_width: 0,
    dim_height: 0
  }

  async mounted() {
    this.calcParams = await this.calc(this.template)
    this.measure = this.calcParams.oParams.width.cm ? 'cm' : 'mm'

    this.dynamicSizeLimits()
  }

  calc(template) {
    const api = calculatorStore.apiGetter
    return new Promise((resolve) => {
      api.foroomApi.init_calc((calc) => {
        calc.load_template(template)
        calc.current_item.calcPrice()
        calc.current_item.release()

        resolve(calc.current_item)
      })
    })
  }

  dynamicSizeLimits() {
    const dimensions = this.calcParams.getRecommendDimentions()

    this.dimensions = {
      width: this.parseSizesMeasure(this.calcParams.max_dimentions.width),
      height: this.parseSizesMeasure(this.calcParams.max_dimentions.height)
    }

    this.recommendedDimensions = {
      width: this.parseSizesMeasure(dimensions.max_to.width),
      height: this.parseSizesMeasure(dimensions.max_to.height),
      dim_width: this.parseSizesMeasure(dimensions.reduce_to.width),
      dim_height: this.parseSizesMeasure(dimensions.reduce_to.height)
    }

    this.size = {
      width: this.parseSizesMeasure(this.template.width),
      height: this.parseSizesMeasure(this.template.height),
      minWidth: this.parseSizesMeasure(this.params.width.min),
      maxWidth: this.parseSizesMeasure(this.calcParams.max_dimentions.width),
      // maxWidth: this.parseSizesMeasure(5000),
      minHeight: this.parseSizesMeasure(this.params.height.min),
      maxHeight: this.parseSizesMeasure(this.calcParams.max_dimentions.height)
    }

    if (!this.product.box) {
      this.$set(this.size, 'maxWidth', this.parseSizesMeasure(3800))
    }
  }

  parseSizesMeasure(val: number) {
    return this.measure === 'cm' ? val / 10 : val
  }

  reparseSizesMeasure = (val: number) => {
    return this.measure === 'cm' ? val * 10 : val
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

  changeTemplate() {
    const productIds = this.products.map((product) => product.productId)

    const filteredTemplates = this.templates!.filter((template) =>
      productIds.includes(template.type + template.subtype)
    )

    return filteredTemplates.length ? findMin(filteredTemplates, 'price') : null
  }

  async setControlType() {
    const template = calculatorStore.calculatedItem
    const product = catalogStore.catalogGetter.find(
      (product) => product.productId === template.type + template.subtype
    )
    await calculatorStore.setControlType(product.controls.default)
  }

  async setSize(type = false) {
    const error = this.checkSizesError()

    if (!error) {
      this.parseSizesCostType('width')
      this.parseSizesCostType('height')

      if (this.products.length) {
        if (this.materials) {
          let template = this.changeTemplate()
          if (template) {
            let { width, height } = this.size
            width = this.reparseSizesMeasure(width)
            height = this.reparseSizesMeasure(height)

            template = {
              ...template,
              material: this.template.material,
              width,
              height
            }

            const res: any = await calculatorStore.calculate(template)
            await this.setControlType()

            if (!res.hasError) {
              const d = res.calcCurrentItem.getRecommendDimentions()
            } else {
              // siteComponentStatesStore.setNotify({
              //   title: 'Error',
              //   message: '!!!',
              //   type: 'error'
              // })
            }
          } else {
            this.$set(
              this.size,
              'width',
              this.parseSizesMeasure(this.calcParams.initial_template.width)
            )
            this.$set(
              this.size,
              'height',
              this.parseSizesMeasure(this.calcParams.initial_template.height)
            )
            siteComponentStatesStore.setNotify({
              title: 'Внимание!',
              message: 'Система не найдена. Измените размеры',
              type: 'warn'
            })
          }
        } else {
          siteComponentStatesStore.setNotify({
            title: 'Внимание!',
            message: 'Материалов под заданные размеры не найдено!',
            type: 'warn'
          })
        }
      } else {
        this.$set(
          this.size,
          'width',
          this.parseSizesMeasure(this.calcParams.initial_template.width)
        )
        this.$set(
          this.size,
          'height',
          this.parseSizesMeasure(this.calcParams.initial_template.height)
        )

        siteComponentStatesStore.setNotify({
          title: 'Внимание!',
          message: 'Система не найдена. Размеры были изменены',
          type: 'warn'
        })
      }
    } else {
      siteComponentStatesStore.setNotify({
        title: 'Внимание!',
        message:
          'Неправильно введены размеры. Исправьте в соответствии с допустимым интервалом.',
        type: 'warn'
      })
    }
  }

  get products() {
    let { width, height } = this.size
    width = this.reparseSizesMeasure(width)
    height = this.reparseSizesMeasure(height)

    const condition = (product) => {
      return (
        product.system === 'rolo' &&
        product.attachmentPoint === 'wall' &&
        product.box === this.product.box &&
        product.minHeight <= height &&
        product.maxHeight >= height &&
        product.minWidth <= width &&
        product.maxWidth >= width
      )
    }

    return catalogStore.catalogGetter
      .filter((product) => condition(product))
      .map((product) => ({
        productId: product.productId,
        title: product.title
      }))
  }

  get templates() {
    return calculatorStore.templatesGetter
  }

  get currentItemFullParams() {
    return calculatorStore.calcCurrentItemGetter
  }

  get maxDimensions() {
    return this.currentItemFullParams.max_dimentions
  }

  get params() {
    return calculatorStore.calculatedItemParamsGetter
  }

  get materials() {
    const materials = calculatorStore.calculatedItemMaterialsGetter
    let { width, height } = this.size
    width = this.reparseSizesMeasure(width, 'width')
    height = this.reparseSizesMeasure(this.size.height, 'height')

    return materials
      ? materials.filter((material) => {
          if (!material.disabled) {
            if (
              parseFloat(material.minWidth) <= width &&
              parseFloat(material.maxWidth) >= width &&
              parseFloat(material.minHeight) <= height &&
              parseFloat(material.maxHeight) >= height
            ) {
              material.matCalc = 1
              return material
            } else if (
              parseFloat(material.minWidth) <= width &&
              parseFloat(material.maxWR) >= width &&
              parseFloat(material.minHeight) <= height &&
              parseFloat(material.maxHR) >= height
            ) {
              material.matCalc = 2
              return material
            }
          }
        })
      : null
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
