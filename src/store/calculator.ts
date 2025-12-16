import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
import { loadScriptAsync } from '@/libs/loadScriptAsync'
import { Template } from '@/types/Calculator/Template'
import { productsStore, promocodeStore } from '@/store'
import { Material } from '@/types/Materials'
import Vue from 'vue'

const findMin = (array, key) => {
  let min = array[0]
  for (const i in array) {
    if (parseFloat(array[i][key]) < parseFloat(min[key])) {
      min = array[i]
    }
  }
  return min
}

@Module({
  name: 'calculator',
  namespaced: true,
  stateFactory: true
})
export default class CalculatorModule extends VuexModule {
  calcProcess: boolean = false
  api = null
  templates: Template[] | null = null
  calcSteps: any = null
  currentPaginatorStep: number = 0

  calculatedItem: Template | null = null
  calcCurrentItem: any = null
  calculatedItemParams: any = null
  calculatedItemMaterials: any[] | null = null
  calculatedItemRus: any = null
  // управление выбранной системы
  controlType: string = ''
  sizes: any[] = []

  @VuexMutation
  SET_CALC_PROCESS(val: boolean) {
    this.calcProcess = val
  }

  @VuexMutation
  SET_API(api: any | null) {
    this.api = api
  }

  @VuexMutation
  SET_TEMPLATES(templates: Template[]) {
    this.templates = templates
  }

  @VuexMutation
  SET_CALCULATED_ITEM({
    item,
    materials,
    params,
    itemRus,
    calcCurrentItem
  }: any) {
    this.calculatedItem = item
    this.calculatedItemParams = params
    this.calculatedItemMaterials = materials
    this.calculatedItemRus = itemRus
    this.calcCurrentItem = calcCurrentItem
  }

  @VuexMutation
  SET_CALC_STEPS(calcSteps) {
    
    this.calcSteps = calcSteps
  }

  @VuexMutation
  SET_CURRENT_STEP(step: number) {
    this.currentPaginatorStep = step
  }

  @VuexMutation
  SET_MATERIAL_TO_TEMPLATE(materialId: number) {
    this.calculatedItem!.material = materialId

    const index = this.templates?.findIndex(
      (template) =>
        template.type === this.calculatedItem?.type &&
        template.subtype === this.calculatedItem?.subtype
    )

    if (index && index >= 0) {
      Vue.set(this.templates![index], 'material', materialId)
    }
  }

  @VuexMutation
  SET_CONTROL_TYPE(val: string) {
    this.controlType = val
  }

  @VuexMutation
  SET_SIZES(sizes: any[]) {
    this.sizes = sizes
  }

  @VuexAction({ commit: 'SET_CALC_PROCESS', rawError: true })
  async setCalcProcess(flag: boolean) {
    return flag
  }

  @VuexAction({ rawError: true })
  async initApi() {
    const loaded = await loadScriptAsync(
      'https://api.foroom.ru/uploads/download/js/foroomApi.min.js'
    )

    return new Promise((resolve) => {
      // @ts-ignore
      if (loaded && window.foroomApi) {
        // @ts-ignore
        const api = window.foroomApi.default

        const params = {
          account: { price_margin: 1.4, discounts: [] },
          fullUrl: 'https://api.foroom.ru/uploads/open/js/',
          uploads_url: 'https://api.foroom.ru/uploads/download/zip/',
          console_mode: false,
          destination: 'fr',
          init_data: null
        }

        api.init(params)

        api.load_data((calc: any, init_data: any) => {
          params.init_data = init_data
          promocodeStore.setAllPromocodes(init_data.all_promo)

          api.init(params)

          api.init_calc((calc: any) => {
            this.SET_API(calc)
            resolve(calc)
          })
        })
      }
    })
  }


  @VuexAction({ rawError: true })
  async calculate(template: Template) {
    this.SET_CALC_PROCESS(true)
    if (!this.api) {
      await this.initApi()
    }
    return new Promise((resolve, reject) => {
      const calc: any = Object.assign({}, this.api)
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      calc.load_template(template)
      // if (template.promoCode) {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //   // @ts-ignore
      //   calc.apply_promo(template.promoCode)
      // }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      calc.current_item.calcPrice()

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const item = calc.current_item.release()
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const params = calc.current_item.oParams

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { materialRest } = calc.current_item
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const materialsArr: Material[] = Object.values(
        calc.current_item.materials
      )
      const materials = materialsArr
        .filter(
          (material) =>
            !material.disabled &&
            material.calc_enabled &&
            material.ost > materialRest.red
        )
        .map((material) => {
          material.tabAlias = material.isCurrentAction
            ? material.currentActionInfo.alias
            : 'mainCollection'
          return material
        })
        .sort((a, b) => (a.priceGroup < b.priceGroup ? -1 : 1))
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const itemRus = calc.convert_item_to_preview(item)

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const calcCurrentItem = calc.current_item

      const error = calc.current_item.error
      const errors = calc.current_item.errors

      const result = {
        item,
        materials,
        params,
        itemRus,
        calcCurrentItem
      }

      this.SET_CALCULATED_ITEM(result)
      this.SET_CALC_PROCESS(false)

      if (!error) {
        resolve({
          ...result,
          hasError: false
        })
      } else {
        resolve({
          hasError: true,
          ...result,
          error,
          errors
        })
      }
    })
  }

  @VuexAction({ commit: 'SET_TEMPLATES', rawError: true })
  async getTemplates(): Promise<Template[]> {
    // const { data } = await $axios.post('https://api.foroom.ru/', {
    //   auth: {},
    //   data: {},
    //   module: 'calculator',
    //   cmd: 'get_templates',
    //   key: 'W5pRNSx8Dx3tGY65xx3BOgAAAAE'
    // })
    
    const { data } = await $axios.get(config.api.url + 'api/calc-templates')
    return data
  }

  @VuexAction({ commit: 'SET_CALC_STEPS', rawError: true })
  async getCalcSteps() {
    const { data } = await $axios.get(config.api.url + 'api/calc-steps')
    data.rolo12 = [
      {
        params: [
          "name"
        ],
        inPaginator: false,
        inCheck: true
      },
      {
        params: [
          "InstallPlace"
        ],
        components: [
          {
            name: "AttachmentPoint",
            title: "Место установки",
            description: [
              "Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком."
            ],
            type: "common"
          }
        ],
        inPaginator: true,
        tooltip: "Место установки",
        inCheck: true
      },
      {
        params: [
          "HasBox"
        ],
        components: [
          {
            name: "Box",
            title: "Наличие короба",
            description: [
              "Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов"
            ],
            type: "common"
          }
        ],
        inPaginator: true,
        tooltip: "Наличие короба / Тип крепления",
        inCheck: true
      },
      {
        params: [
          "width",
          "height"
        ],
        fullInfoParams: [
          "width",
          "height",
          "gab_width",
          "gab_height",
          "ControlHeight"
        ],
        components: [
          {
            name: "WallSizes",
            title: "Размеры",
            description: [
              "Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см."
            ],
            type: "extra"
          }
        ],
        inPaginator: true,
        tooltip: "Размеры",
        inCheck: true
      },
      {
        params: [
          "ControlDevice",
          "ControlSide"
        ],
        components: [
          {
            name: "Controls",
            title: "Управление",
            description: [
              "Выберите сторону расположения цепи управления – справа или слева"
            ]
          }
        ],
        inPaginator: true,
        tooltip: "Управление",
        inCheck: true
      },
      {
        params: [
          "material",
          "MaterialCalc",
          "rol_width"
        ],
        components: [
          {
            name: "Materials",
            title: "Материал",
            description: [],
            type: "common"
          }
        ],
        inPaginator: true,
        tooltip: "Материалы",
        actionLabel: true,
        inCheck: true
      },
      {
        components: [
          {
            name: "SystemInfo",
            title: "",
            description: [],
            type: "common"
          },
          {
            name: "OrderConfirm",
            title: "",
            description: [],
            type: "common"
          },
          {
            name: "SystemAdvantages",
            title: "",
            description: [],
            type: "common"
          }
        ],
        params: [],
        inPaginator: true,
        tooltip: "Подтверждение заказа",
        inCheck: false
      }
    ]
    return data
  }

  @VuexAction({ commit: 'SET_CURRENT_STEP', rawError: true })
  async setCurrentStep(step: number): Promise<number> {
    return step
  }

  @VuexAction({ commit: 'SET_MATERIAL_TO_TEMPLATE', rawError: true })
  setMaterialToTemplate(materialId: number): number {
    return materialId
  }

  @VuexAction({ commit: 'SET_CONTROL_TYPE', rawError: true })
  setControlType(type: string): string {
    return type
  }

  @VuexAction({ commit: 'SET_SIZES', rawError: true })
  setSizes(sizes: any[]): any[] {
    return sizes
  }

  get templatesGetter(): Template[] | null {
    if (this.templates) {
      return this.templates
          // .filter((template) =>
          //   productsStore.availableProductsIds.includes(
          //     template.type + template.subtype
          //   )
          // )
          .sort((a: Template, b: Template) => (a.price < b.price ? -1 : 1))
    }
    return this.templates
  }

  get calcStepsGetter() {
    return this.calcSteps
  }

  // get templatesFieldTypesGetter() {
  //   if (this.templates) {
  //     const res = {}
  //     this.templates.forEach((template) => {
  //       const keys = Object.keys(template)
  //       keys.forEach((key) => {
  //         const required = this.templates.every((t) => key in t)
  //         res[key] = {
  //           key,
  //           required,
  //           data: this.templates.map((t) => ({
  //             [t.type + t.subtype]: t[key], // || null,
  //             type: typeof t[key]
  //           }))
  //         }
  //       })
  //     })
  //     return Object.values(res)
  //       .filter((r) => !r.required)
  //       .sort((a, b) => a.key > b.key)
  //   }
  //   return this.templates
  // }

  get apiGetter() {
    return this.api
  }

  get calcProcessGetter() {
    return this.calcProcess
  }

  get calculatedItemGetter() {
    return this.calculatedItem
  }
  get calculatedItemParamsGetter() {
    return this.calculatedItemParams
  }
  get calcCurrentItemGetter() {
    return this.calcCurrentItem
  }

  get calculatedItemMaterialsGetter() {
    return this.calculatedItemMaterials
  }

  get minPriceMaterialGetter() {
    const materials = this.calculatedItemMaterials

    if (materials && Object.keys(materials).length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const actionMaterials = materials.filter(
        (material) => material.isCurrentAction
      )
      const material = actionMaterials.length
        ? findMin(actionMaterials, 'cost')
        : findMin(materials, 'priceGroup')

      return material ? material : null
    }
    return null
  }
  get calculatedItemRusGetter() {
    return this.calculatedItemRus
  }
  get currentPaginatorStepGetter() {
    return this.currentPaginatorStep
  }
  get controlTypeGetter() {
    return this.controlType
  }
}
