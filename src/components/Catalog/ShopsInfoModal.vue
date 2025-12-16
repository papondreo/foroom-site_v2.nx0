<template>
    <div>
      <div class="row">
        <div class="col-12 mb-4">
          <ui-title tag="h2" class="ui-title-2">Почему выбирают рулонные шторы?</ui-title>
          <p>
            Однотонные модели тканей помогут подчеркнуть лаконичность дизайна интерьера, а текстиль с узорами добавит дополнительную изюминку в окружающее пространство.
            Быстрый монтаж и удобное управление позволяют поддерживать комфортный уровень освещения внутри помещения, не отвлекаясь от важных дел.
            Фурнитура выполнена из качественных материалов с использованием металлических элементов, что гарантирует долгий срок службы изделия при правильной эксплуатации.
            Широкий ассортимент тканей включает в себя все популярные оттенки: белый, серый, черный, коричневый и другие.
          </p>
        </div>
      </div>
  
      <div class="row">
        <div class="col-12 mb-4">
          <ui-title tag="h2" class="ui-title-2">
            Где купить рулонные шторы в Москве и Санкт-Петербурге
          </ui-title>
          <p>
            На нашем сайте можно оформить заказ с помощью удобного онлайн-конструктора...
          </p>
        </div>
      </div>
  
      <div class="row ui-mt-4">
      <div class="col-md-6 ui-sticky map">
        <div class="block-wrapper ui-sticky">
          <shops-map
            ref="salesPointsShopsMap"
            uniq-id="sales-points-map"
            style="height: 500px"
            class="sales-points-map"
          />
          <div
            v-if="showCallbackForm"
            id="callback-form"
            class="callback-form-wrapper"
          >
            <header class="callback-form-header">
              <ui-title
                tag="p"
                class="ui-title-2"
              >
                Обратный звонок
              </ui-title>
              <button @click="showCallbackForm = false">Закрыть</button>
            </header>

            <callback-form />
          </div>
        </div>
      </div>
      <div class="col-md-6 list">
        <shops-search
          class="ui-mb-3"
          ref="salesPointShopsSearch"
          @search="searchShop"
        />
        <shop-card
          v-for="shop in shops"
          :key="shop.id"
          :shop="shop"
          :show-button="true"
          button-text="Заказать звонок"
          background-color="#ffffff"
          class="shop-card"
          @selectShop="selectShop"
          @buttonClick="showForm"
        />
        <button
          v-if="fullShopsCount > shopsCount"
          class="show-more-button"
          @click="showMore"
        >Показать ещё</button>
      </div>
    </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Ref } from 'nuxt-property-decorator'
  import ShopsMap from '@/components/common/Shops/ShopsMap.vue'
  import CallbackForm from '@/components/Forms/CallbackForm.vue'
  import ShopsSearch from '@/components/common/Shops/ShopsSearch.vue'
  import ShopCard from '@/components/common/Shops/ShopCard.vue'
  import { shopsStore } from '@/store'
  import { Shop } from '@/types/Shops/Shop'
  @Component({
    components: {
      CallbackForm,
      ShopsSearch,
      ShopCard,
      ShopsMap
    }
  })
  export default class ShopsInfoModal extends Vue {
    @Ref('salesPointsShopsMap') readonly salesPointsShopsMap!: any
    showCallbackForm = false
  

    showCallbackForm = false

    shopsCount = 3

    get shops(): Shop[] {
    return shopsStore.shopsGetter
      ? shopsStore.shopsGetter.slice(0, this.shopsCount)
      : []
  }


    get fullShopsCount(): number {
      return shopsStore.shopsGetter ? shopsStore.shopsGetter.length : 0
    }

  

    async searchShop(coords: string[]) {
    const parsed = coords.map(parseFloat)

    const map = this.$refs.salesPointsShopsMap as any
    map.setCenter(parsed)
    map.clearRoutes()
    await shopsStore.setUserLocation(parsed)
    await shopsStore.selectShop(this.shops[0].id)
  }

  selectShop(coords: string[]) {
    const parsed = coords.map(parseFloat)
    const map = this.$refs.salesPointsShopsMap as any
    map.setCenter(parsed)
    map.clearRoutes()
    map.printRoute(false, parsed)
  }


  showForm() {
    this.showCallbackForm = true
    this.$nextTick(() => {
      const el = document.getElementById('callback-form')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  }


  showMore() {
    this.shopsCount += 3
  }


  }
  </script>
  