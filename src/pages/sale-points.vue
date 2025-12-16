<template>
  <!--    <page-component pageName="Sale Points" />-->
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1"
    >
      {{ page.h1 }}
    </ui-title>

    <ui-title
      tag="h2"
      class="ui-title-2"
    >
      Где купить жалюзи и рулонные шторы FOROOM
    </ui-title>

    <p>
      Уважаемые покупатели, на этой странице сайта вы можете выбрать магазин, в
      котором можно приобрести солнцезащитные системы на заказ по своим
      размерам: вертикальные и горизонтальные жалюзи, рулонные и римские шторы,
      шторы плиссе, а также профильные карнизы.
    </p>

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
          На карте представлены магазины партнеров со статусами «Официальный
          Представитель FOROOM» или «Партнер FOROOM PRO»
        </ui-title>

        <div class="row">
          <div class="col-lg-7">
            <h3 class="main-subtitle">Официальный представитель
              <img
                src="https://foroom.ru/_images/foroom.svg"
                style="height: 14px; margin-left: 4px; margin-top: -5px;"
                alt=""
              />
            </h3>
            <p class="mb-3">Компания, которая реализует солнцезащитные системы FOROOM, выпускаемые производителем и правообладателем ТМ FOROOM - компанией ООО "Фирма "КАЛИТА".</p>

            <h3 class="main-subtitle">Партнеры
              <img
                src="https://foroom.ru//_images/foroom-pro-bb.svg"
                style="height: 27px; margin-left: 4px; margin-top: 8px;"
                alt=""
              >
            </h3>
            <p class="mb-5">Производители солнцезащитных систем, выпускающие продукцию под
              собственным брендом из компонентов, используемых для производства систем FOROOM, в
              рамках действующего ассортимента FOROOM. Также могут реализовывать готовые изделия
              FOROOM, если не производят данный тип систем самостоятельно.</p>
          </div>
        </div>

        <p class="mb-5">ООО «Фирма «КАЛИТА» открыта к постоянному сотрудничеству. Каждому партнеру присваивается
          статус в зависимости от вида их деятельности и выполнения обязательств. Вы можете обратиться
          в любую точку продаж, представленную на карте, и приобрести качественные солнцезащитные
          системы на заказ.</p>

        <ui-title
          tag="h2"
          class="ui-title-2"
        >
          Отличия официальных представителей FOROOM от партнёров FOROOM PRO
        </ui-title>

        <div class="row mb-3">
          <div class="col-md-2 col-12"></div>
          <div class="col-md-5 col-6">
            <p style="margin-left: 14px; text-transform:uppercase; font-weight: bold; color: #444350">
              Представители
            </p>
            <img
              src="https://foroom.ru/_images/foroom.svg"
              style="height: 20px; margin-left: 16px;"
              alt=""
            />
          </div>
          <div class="col-md-5 col-6">
            <p style="margin-left: 14px; text-transform:uppercase; font-weight: bold; color: #444350">
              Партнеры
            </p>
            <img
              src="https://foroom.ru/_images/foroom-pro-bb.svg"
              style="height: 39px; margin-left: 16px; margin-top: 3px;"
              alt=""
            >
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Какие изделия вы заказываете / покупаете</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Официальные Представители реализуют солнцезащитные системы TM FOROOM. Все системы изготавливаются на современном производственно- складском комплексе FOROOM правообладателем и производителем торговой марки FOROOM - компанией ООО «Фирма «КАЛИТА».</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Партнеры FOROOM PRO реализуют солнцезащитные системы, изготовленные на собственных производствах компаний из тех же комплектующих, которые используются для производства систем TM FOROOM.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Производство</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>ПСК FOROOM – это один из крупнейших заводов на сегодняшний день, с конвейера которого выпускается более 840 000 качественных изделий в год. Завод оснащен высокотехнологичным оборудованием.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Производство у каждой компании индивидуально и оборудовано на усмотрение партнеров FOROOM PRO.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Цена</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Цены на изделия, приобретаемые у официальных Представителей FOROOM, строго регламентированы компанией-производителем и не могут быть выше рекомендованных. Вы покупаете изделие по той стоимости, которая обозначена на сайте. Проверить цену на изделия FOROOM с учетом предпочитаемых параметров можно в разделе КОНСТРУКТОР.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p class="mb-2">Цены на изделия, изготовленные из комплектующих FOROOM на собственном производстве партнера FOROOM PRO, устанавливает партнер FOROOM PRO самостоятельно. Вам нужно уточнять цену на интересующее вас изделие непосредственно у выбранной компании-партнера.</p>
              <p>Если Партнер FOROOM PRO не производит какие-либо изделия из действующего ассортимента FOROOM и, как следствие, не закупает комплектующие для их изготовления, то он реализует оригинальные изделия TM FOROOM, соблюдая рекомендованную цену производителем и правообладателем ТМ FOROOM ООО «Фирма «КАЛИТА».</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Предложения месяца FOROOM</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Каждый месяц популярные изделия из ассортимента FOROOM с популярными материалами участвуют в акции. Стоимость таких изделий высококонкурентна на рынке. Официальные Представители в обязательном порядке используют акции.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Проведение рекламных акций на изделия, изготовленные из комплектующих FOROOM на собственном производстве компании-партнера, осуществляется на усмотрение компании-партнера Оригинальные системы FOROOM участвуют в предложении месяца обязательно.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Экосистема FOROOM</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Все IT-инструменты заказа
                изделий FOROOM (как для
                партнеров, так и для конечных
                покупателей) представляют
                единую экосистему,
                позволяющую легко и быстро
                узнать стоимость изделия и
                оформить заказ.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Заказать изделия, изготовленные
                из комплектующих FOROOM на
                собственном производстве
                компании-партнера, можно на
                условиях, предоставленных
                компанией-партнёра.
                Оригинальные системы FOROOM
                можно заказать с помощью
                экосистемы FOROOM.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Защита от подделок</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Каждое изделие, произведенное
                на ПСК FOROOM, имеет
                оригинальное
                зарегистрированное название,
                имеет защитную голограмму,
                упаковывается в
                брендированную тару. Имеет
                эксплуатационное руководство.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Наличие у изделий,
                изготовленных из комплектующих
                FOROOM на собственном
                производстве компании-партнера,
                защищающих от подделок
                элементов - на усмотрение
                компании-партнера.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Отгрузка</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Сроки отгрузки со склада
                производителя FOROOM точны и
                заранее известны сотрудникам
                магазинов официальных
                Представителей. Сотрудники
                видят их сразу после оформления
                заказа.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Сроки отгрузки изделий,
                изготовленных из комплектующих
                FOROOM на собственном
                производстве партнера FOROOM
                PRO, определяются компанией-
                партнером FOROOM PRO
                самостоятельно.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Замер</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Единая система замеров для
                оригинальных изделий FOROOM
                (для изделий на створку и на
                проем).
                Инструкции размещены на
                страницах систем и в
                Конструкторе при заказе онлайн.
                Изделия будут изготовлены точно
                по вашим замерам: ±2 мм.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Инструкция по замеру разрабатывается компанией-партнером самостоятельно.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Сертификация</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Все системы имеют сертификат соответствия техническим условиям.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Наличие сертификата на усмотрение компании-партнера.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Сертификат экологической безопасности</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>В коллекции материалов FOROOM® представлены ткани для рулонных штор и штор плиссе, обладающие сертификатом экологической безопасности Oeko-Tex.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Материалы из коллекции FOROOM, применяемые в изготовлении изделий компанией-партнером на собственном производстве, также имеют  сертификат экологической безопасности Oeko-Tex.</p>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Гарантийное обслуживание</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Гарантийное и постгарантийное обслуживание будет осуществлять компания-продавец.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Гарантийное и постгарантийное обслуживание будет осуществлять компания-продавец.</p>
            </div>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-md-2 col-12">
            <div class="title-cell">
              <p>Доверие к компании</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>Компания ООО «Фирма «КАЛИТА» производитель и правообладатель тм FOROOM более 30 лет на рынке солнцезащитных систем.</p>
            </div>
          </div>
          <div class="col-md-5 col-6">
            <div class="cell">
              <p>История компаний-партнеров индивидуальна.</p>
            </div>
          </div>
        </div>

        <p class="mb-2">Если известная вам точка продаж не размещена на карте нашего сайта, то она не является официальным Представителем FOROOM и не является официальным Партнером FOROOM PRO.</p>
        <p class="mb-2">Способы оплаты заказанных изделий покупатель согласовывает с официальным Представителем торговой марки FOROOM и партнером FOROOM PRO напрямую без участия производителя.</p>
        <p class="mb-2">Дополнительные услуги, включающие замер, доставку до магазина или покупателя и установку солнцезащитных изделий FOROOM, оказывают официальные Представители и партнеры FOROOM PRO. Производитель не регламентирует их стоимость и условия предоставления.</p>
        <p class="mb-5">По согласованию с Представителем вы можете приобрести изделия без дополнительных услуг по замеру и установке. Вся информация, как произвести замер и установить солнцезащитные системы FOROOM, размещена на сайте.</p>

        <h2 class="main-subtitle main-subtitle_brand mb-3">Реквизиты компании-производителя и правообладателя тм FOROOM</h2>

        <p>Производитель торговой марки FOROOM – компания ООО «Фирма «КАЛИТА».</p>
        <p>Товарная марка FOROOM была зарегистрирован 26.01.2015.</p>
        <p>Юридическое лицо ООО "Фирма "КАЛИТА" было основано в 1991г.</p>
        <p>Юридический адрес: Московская область, Раменский городской округ, село Михайловская Слобода, улица
          Шоссейная, строение 55</p>
        <p>Почтовый адрес 140073 Московская обл, Люберецкий р-н, п. Томилино-3, а/я 25</p>
        <p>ИНН 7724024023, КПП 502701001, ОГРН 1027700189604</p>
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

@Component({
  components: { CallbackForm, ShopsSearch, ShopCard, ShopsMap, PageComponent }
})
export default class SalePointsPage extends Vue {
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

  async searchShop(coords) {
    coords = coords.map((coord) => parseFloat(coord))
    this.$refs.salesPointsShopsMap.setCenter(coords)
    this.$refs.salesPointsShopsMap.clearRoutes()

    await shopsStore.setUserLocation(coords)
    await shopsStore.selectShop(this.shops[0].id)
  }

  selectShop(coords) {
    coords = coords.map((coord) => parseFloat(coord))
    this.$refs.salesPointsShopsMap.setCenter(coords)
    this.$refs.salesPointsShopsMap.clearRoutes()
    this.$refs.salesPointsShopsMap.printRoute(false, coords)
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
    return shopsStore.shopsGetter
      ? shopsStore.shopsGetter.slice(0, this.shopsCount)
      : []
  }

  get fullShopsCount(): number {
    return shopsStore.shopsGetter ? shopsStore.shopsGetter.length : 0
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
