<template>
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1 ui-text-uppercase"
    >
      Акции
    </ui-title>

    <div
      v-if="filteredActions?.length"
      class="row"
    >
      <aside class="d-none d-lg-block col-lg-3 col-xl-2 ui-sticky">
        <actions-products-filter
          :products="filteredActions"
          v-model="filteredSystems"
          ref="productsFilter"
          class="ui-sticky"
        />
      </aside>

      <div class="col-lg-9 col-xl-10">
        <div class="row">
          <div class="col-12">
            <action-promo
              :action="filteredActions"
              style="height: 130px"
            />
          </div>

          <action-card
            v-for="(product, k) in filteredSystems"
            :key="k"
            :product="product"
            class="col-xl-2 col-md-3 col-sm-4 col-6 product"
          />
        </div>
      </div>
    </div>

    <ui-empty v-else>В текущее время акций нет</ui-empty>
  </main>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { actionsStore, productsStore, showcaseStore, systemsStore } from "@/store";
import ProductsFilter from '@/components/common/ProductsFilter.vue'
import ActionCard from '@/components/Actions/ActionCard.vue'
import ActionPromo from '@/components/Actions/ActionPromo.vue'
import { Showcase } from '@/types/Showcase/Showcase'
import { Product } from '@/types/Products/Product'
import ActionsProductsFilter from '@/components/Actions/ActionsProductsFilter.vue'
import UiEmpty from '@/components/UI/UI-Empty.vue'

@Component({
  components: {
    ActionsProductsFilter,
    ActionPromo,
    ProductsFilter,
    ActionCard,
    UiEmpty
  }
})
export default class ActionsPage extends Vue {
  head() {
    return {
      title: 'Акции',
      meta: [{ hid: 'description', name: 'description', content: 'Акция' }]
    }
  }

  filteredSystems = []

  @Getter('products/productsGetter') products: Product[]
  @Getter('showcase/showcaseGetter') showcase: Showcase[]

  async asyncData() {
    if (!showcaseStore.showcase) {
      await showcaseStore.getShowcase()
    }

    if (!productsStore.products) {
      await productsStore.getProducts()
    }

    if (!actionsStore.availableMaterials) {
      const items = productsStore.products.map((p) => p.type + p.subtype)
      await actionsStore.getAvailableMaterials(items)
    }
  }

  created() {
    // this.filteredSystems = this.actionCards
    this.filteredSystems = this.filteredActions
  }

  get actionCards() {
    const getItem = (systemType) => {
      const obj = systemsStore.systemProductsMap

      let type
      if (systemType === 'karniz' || systemType === 'zebra') {
        type = systemType
      } else {
        Object.keys(obj).forEach((key) => {
          if (obj[key].includes(systemType)) {
            type = key
          }
        })
      }
      return this.showcase.find((item) => item.systemType === type)
    }

    const actions = actionsStore.currentActions?.filter((a) => !a.disabled)

    let res = []

    actions!.map((action) => {
      let cards = this.products.filter(
        (p) =>
          action.izd_ids_json.includes(p.id) &&
          Object.keys(action.constructor_images).length
      )

      cards = cards.map((card) => ({
        ...card,
        ...getItem(card.type),
        // consImg: action.constructor_images,
        consImg: action.constructor_images[card.type + card.subtype],
        name: card.name,
        attachmentPoint: card.attachmentPoint,
        actionAlias: action.alias,
        actionName: action.name,
        actionPerc: action.perc,
        actionStart: action.begin_date,
        actionEnd: action.end_date,
        actionColors: action.colors
      }))
      res = res.concat(cards)
    })

    return res.filter((card) => card.consImg)
  }

  get actions() {
    return actionsStore.currentActions?.filter((action) => !action.disabled)
  }

  get filteredActions() {
    const getItem = (systemType) => {
      const obj = systemsStore.systemProductsMap

      let type
      if (systemType === 'karniz' || systemType === 'zebra') {
        type = systemType
      } else {
        Object.keys(obj).forEach((key) => {
          if (obj[key].includes(systemType)) {
            type = key
          }
        })
      }
      return this.showcase.find((item) => item.systemType === type)
    }

    const productsArr = this.products.map((p) => p.type + p.subtype)

    const actions = this.actions.map((a) => ({
      perc: a.perc,
      name: a.name,
      actionColors: a.colors,
      types: a.izd_types_json,
      materials: a.mat_ids_json,
      actionStart: a.begin_date,
      actionEnd: a.end_date
    }))

    return productsArr
      .map((id) => {
        const arr = actions
          .filter((a) => a.types.includes(id))
          .sort((a, b) => b.perc - a.perc)

        const product = this.products.find((p) => p.type + p.subtype === id)

        const { url, systemType, systemTypeName, position } = getItem(
          product.type
        )

        if (arr.length) {
          const {
            perc,
            materials,
            name,
            actionColors,
            actionStart,
            actionEnd
          } = arr[0]

          const availableMaterialsIds = this.availableMaterials
            .filter((item) => item.systemType + item.systemSubtype === id)
            .map((item) => item.materialId)

          const availableMaterials = materials.filter((mat) =>
            availableMaterialsIds.includes(mat)
          )

          const material =
            availableMaterials[
              Math.floor(Math.random() * (availableMaterials.length-1))
            ]

          return {
            product: id,
            actionPerc: perc,
            actionName: name,
            actionColors,
            actionStart,
            actionEnd,
            attachmentPoint: product.attachmentPoint,
            url: `${url}?template=${id}&material=${material}`,
            name: product.name,
            type: product.type,
            subtype: product.subtype,
            systemType,
            systemTypeName,
            material,
            position,
            cover: id + '-' + material + '.png'
          }
        }
      })
      .filter((product) => product)
      .sort((a, b) => b.position - a.position)
  }

  get availableMaterials() {
    if (actionsStore.availableMaterialsGetter?.length) {
      return actionsStore.availableMaterialsGetter
    }
    return []
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

@media only screen and (min-width: 1199px) {
  .product {
    width: 20% !important;
  }
}
</style>
