<template>
  <!--    <page-component pageName="Sale Points" />-->
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1"
    >
      {{ page.h1 }}
    </ui-title>

    <p>
      Уважаемые покупатели, ниже на карте представлены официальные сервисные центры FOROOM,
      где вам окажут профессиональную помощь в случае неисправности вашего солнцезащитного изделия.
    </p>

    <div class="row ui-mt-4">
      <div class="col-md-6 ui-sticky map">
        <div class="block-wrapper ui-sticky">
          <shops-map
            v-if="serviceCentres"
            ref="serviceCentersMap"
            uniq-id="service-centers-map"
            style="height: 500px"
            class="sales-points-map"
            :sc="serviceCentres"
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
      <div class="col-md-6 list" style="display: flex; flex-direction: column;">
<!--
        <shops-search
          class="ui-mb-3"
          ref="salesPointShopsSearch"
          @search="searchShop"
        />
-->
        <shop-card
          v-for="shop in serviceCentres"
          :key="shop.id"
          :shop="shop"
          :show-button="true"
          button-text="Заказать звонок"
          background-color="#ffffff"
          :class="shop.name === 'ИЗБА' ? 'shop-card top-card' : 'shop-card'"
          @selectShop="selectShop"
          @buttonClick="showForm"
        />

        <!-- <span  v-for="shop in serviceCentres"
        :key="shop.id">
        {{ shop.name }}
        </span> -->

        <button
          v-if="serviceCentres.length > shopsCount"
          class="show-more-button"
          @click="showMore"
        >
          Показать еще
        </button>
      </div>
    </div>

    <div class="row ui-mt-5">
      <div class="col-12 mb-5">
        <ui-title
          tag="h2"
          class="ui-title-2"
        >
          Какие услуги оказывают
        </ui-title>

        <p class="mb-2">
          •	Восстановление работоспособности солнцезащитных изделий в период гарантийного* срока эксплуатации<br/>
          •	Восстановление работоспособности солнцезащитных изделий после истечения гарантийного срока<br/>
          •	Монтаж солнцезащитных изделий<br/>
          •	Техническое обслуживание солнцезащитных изделий
        </p>

        <p class="mb-5" style="font-size: 15px;">*Сервисное гарантийное обслуживание производится в соответствии с
          <a href="/docs/quality-regulations-of-goods-sold.pdf" class="ui-link" target="_blank">Положением о качестве продаваемых товаров</a>
        </p>

        <ui-title
          tag="h2"
          class="ui-title-2"
        >
          Возможные причины обращения в сервисные центры
        </ui-title>

        <ui-title
          tag="h3"
          class="ui-title-3"
        >
          Рулонные шторы
        </ui-title>

        <p class="mb-4">
          •	Переклейка ткани на вал<br/>
          •	Замена элементов управления<br/>
          •	Наклейка ленты крепления отвеса ткани/фиксации на валу<br/>
          •	Установка отвеса
        </p>


        <ui-title
          tag="h3"
          class="ui-title-3"
        >
          Вертикальные жалюзи
        </ui-title>

        <p class="mb-4">
          •	Замена цепи управления<br/>
          •	Замена шнура управления<br/>
          •	Замена бегунка<br/>
          •	Изменение типа раздвижки<br/>
          •	Замена механизма управления
        </p>

        <ui-title
          tag="h3"
          class="ui-title-3"
        >
          Горизонтальные жалюзи
        </ui-title>

        <p class="mb-4">
          •	Замена лесенки<br/>
          •	Замена шнура управления<br/>
          •	Замена цепи управления<br/>
          •	Замена замка корда<br/>
          •	Замена поворотного механизма
        </p>

        <ui-title
          tag="h3"
          class="ui-title-3"
        >
          Шторы плиссе
        </ui-title>

        <p class="mb-4">
          •	Замена корда<br/>
          •	Замена заглушки профиля<br/>
          •	Замена башмака шнура
        </p>


        <div class="attention mb-5">
          <ui-title
            tag="h3"
            class="ui-title-3"
          >
            Обратите внимание!
          </ui-title>
          <p class="mb-1"><b>Гарантия не распространяется в случае:</b></p>
          <p>
            •	Несоблюдения пользователем предписаний эксплуатационной документации, вложенной в заказ с изделием<br/>
            •	Механического повреждения, вызванного внешним ударом или иными воздействиями<br/>
            •	Ремонта изделия неуполномоченной сервисной организацией или частным лицом
          </p>
        </div>

      </div>
    </div>
  </main>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from 'nuxt-property-decorator'
import PageComponent from '@/components/PageComponent.vue'
import ShopsMap from '@/components/common/Shops/ShopsMap.vue'
import ShopCard from '@/components/common/Shops/ShopCard.vue'

import { pagesStore, shopsStore } from '@/store'

import { Shop } from '@/types/Shops/Shop'
import ShopsSearch from '@/components/common/Shops/ShopsSearch.vue'
import CallbackForm from '@/components/Forms/CallbackForm.vue'
import CallbackFormCatalog  from "@/components/Catalog/CallbackFormCatalog.vue";

@Component({
  components: { CallbackForm, ShopsSearch, ShopCard, ShopsMap, PageComponent,CallbackFormCatalog }
})
export default class ServiceCentresPage extends Vue {
  coords: number[] | null = null
  showCallbackForm: boolean = false
  shopsCount = 3

  head () {
    return {
      title: 'Где можно купить жалюзи на окна - заказать в магазинах официальных представителей TM FOROOM',
      meta: [
        { hid: 'description', name: 'description', content: 'Где можно купить жалюзи на окна - заказать в магазинах официальных представителей торговой марки FOROOM. Долговечность. Собственное производство. Акции. Под ключ. Быстрая доставка. Заказывайте!'}
      ]
    }
  }

  mounted() {
    setTimeout(() => {
      shopsStore.selectShop(this.serviceCentres.find(el=> el.name === 'ИЗБА').id)
      this.selectShop(this.serviceCentres.find(el=> el.name === 'ИЗБА')?.coords_geo)
    }, 1000)
  }

  async searchShop(coords) {
    coords = coords.map((coord) => parseFloat(coord))
    this.$refs.serviceCentersMap.setCenter(coords)
    this.$refs.serviceCentersMap.clearRoutes()

    await shopsStore.setUserLocation(coords)
    await shopsStore.selectShop(this.serviceCentres[0].id)
  }

  selectShop(coords) {
    coords = coords.map((coord) => parseFloat(coord))
    this.$refs.serviceCentersMap.setCenter(coords)
    this.$refs.serviceCentersMap.clearRoutes()
    this.$refs.serviceCentersMap.printRoute(false, coords)
  }

  showForm() {
    this.showCallbackForm = true
    setTimeout(() => {
      const el = document.getElementById('callback-form')
      if (el) {
        el.scrollIntoView()
      }
    }, 50)
  }

  showMore() {
    this.shopsCount += 3
  }

  get page() {
    return pagesStore.currentPageGetter
  }

  get shops(): Shop[] {
    return this.serviceCentres.slice(0, this.shopsCount)
  }

  get serviceCentres(): Shop[] {

    return shopsStore.shopsGetter
      ? shopsStore.shopsGetter.filter((shop) => shop.isService)
      : []
  }
}
</script>

<style lang="scss" scoped>
.block-wrapper {
  height: 500px;
  position: sticky;
  top: 12px;
}
.callback-form-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 4px;
}
.callback-form-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.show-more-button {
  width: 100%;
  margin-top: 8px;
  border-radius: 4px;
  padding: 4px 0;
  background-color: #f9a134;
  text-transform: uppercase;
  color: #fff;
  font-weight: 400;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: $brand-orange-light;
  }
}

.top-card{
  order: -6;
}


.title-cell {
  padding: 8px 0px;
  color: #444350;
  text-align: right;
}
.cell {
  padding: 8px 16px;
  background-color: #fff;
  height: 100%;
  border-radius: 5px;
}
.sales-points-map {
  order: 1;
}
.callback-form-wrapper {
  order: 2;
}

.attention {
  margin-top: 15px;
  border-radius: 5px;
  padding: 15px;
  border-left: 5px solid #df771c;
  background: rgba(255, 155, 0, 0.3098);
  font-size: .85rem;
  cursor: pointer;
}
.ui-link {
  color: #d38f2c;
}
@media screen and (max-width: $colMd) {
  .block-wrapper {
    position: relative;
    height: auto;
  }
  .map {
    order: 2;
  }
  .list {
    order: 1;
  }
  .callback-form-wrapper {
    position: relative;
    margin-top: 12px;
  }
  //::v-deep .sales-points-map,
  //::v-deep .sales-points-map>ymaps {
  //  height: 300px !important;
  //}
}
</style>
