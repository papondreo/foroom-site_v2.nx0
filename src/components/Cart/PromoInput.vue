<template>
  <fieldset class="promo">
    <label for="promo">Промокод</label>
    <input
      v-model="promocode"
      id="promo"
      type="text"
    />
    <ui-button
      class="apply"
      @click="applyPromo"
    >
      Применить
    </ui-button>

    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
  </fieldset>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import UiButton from '@/components/UI/UI-Button.vue'
import { actionsStore, calculatorStore, cartStore, promocodeStore } from "@/store";

@Component({
  components: { UiButton }
})
export default class PromoInput extends Vue {
  promocode: string = ''
  error: string | null = false
  sendProcess: boolean = false
  templates = null

  async mounted() {
    const promocode = localStorage.getItem('promo')
    if (promocode) {
      this.promocode = promocode
      await promocodeStore.set(promocode)
      await this.calc()
    }
  }

  async applyPromo() {
    this.error = null
    if (!this.promocode.trim()) {
      this.error = 'Введите промокод'
      return false
    }

    this.sendProcess = true
    const { error } = await promocodeStore.set(this.promocode)
    if (error) {
      this.error = error
      this.sendProcess = false
      return
    }

    localStorage.setItem('promo', this.promocode)

    await this.calc()

    this.sendProcess = false
  }

  async calc() {
    if (!this.actions) {
      await actionsStore.getCurrentActions()
    }

    const templates = localStorage.getItem('cartItems')
    this.templates = templates ? JSON.parse(templates) : []

    const actions = Object.values(this.actions)
    const { izd_types_json } = this.promocodeParams
    const filteredTemplates = {}

    this.templates.forEach((template, i) => {
      const productId = template.type + template.subtype
      const currentAction = actions.filter((action) =>
        action.izd_types_json.includes(productId)
      )
      const materials = currentAction.reduce((arr, action) => {
        return arr.concat(action.mat_ids_json)
      }, [])

      if (
        izd_types_json.includes(productId) &&
        !materials.includes(template.material)
      ) {
        template.promoCode = this.promocode
        filteredTemplates[i] = template
      }
    })

    const calc = (templates) => {
      const api = calculatorStore.apiGetter
      return new Promise((resolve, reject) => {
        const result = {}
        api.foroomApi.init_calc((calc) => {
          Object.keys(templates).forEach((key) => {
            const template = templates[key]

            calc.load_template(template)
            calc.apply_promo(template.promoCode)
            calc.current_item.calcPrice()
            const item = calc.current_item.release()
            const itemRus = calc.convert_item_to_preview(item)

            result[key] = { item, itemRus }
          })

          resolve(result)
        })
      })
    }

    const res = await calc(filteredTemplates)

    let items = localStorage.getItem('cartItems')
    if (items) {
      items = JSON.parse(items)
    }

    let itemsRus = localStorage.getItem('cartItemsParams')
    if (itemsRus) {
      itemsRus = JSON.parse(itemsRus)
    }

    Object.keys(res).forEach((key) => {
      const { item, itemRus } = res[key]

      this.$set(items, key, {
        ...items[key],
        ...item
      })

      this.$set(itemsRus, key, {
        ...itemsRus[key],
        ...itemRus
      })
    })

    localStorage.setItem('cartItems', JSON.stringify(items))
    localStorage.setItem('cartItemsParams', JSON.stringify(itemsRus))

    await cartStore.setCart()
  }

  get promocodeParams() {
    return promocodeStore.promocodeParamsGetter
  }

  get actions() {
    return actionsStore.currentActionsGetter
  }
}
</script>

<style lang="scss" scoped>
.promo {
  position: relative;
  margin-bottom: 16px;
  margin-top: 16px;
  label {
    display: block;
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 400;
  }
  input {
    width: 100%;
    display: block;
    padding: 4px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .apply {
    position: absolute;
    height: 34px;
    top: 33px;
    right: 0;
    padding: 6px 24px;
    border-radius: 0 4px 4px 0;
    font-weight: 400;
  }
  .error {
    margin-top: 4px;
    font-size: 13px;
    color: #de0000;
  }
}
</style>
