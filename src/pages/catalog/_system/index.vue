<template>
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1"
    >
      {{ store_h1 }}
    </ui-title>
    <div class="row">
      <div class="col-md-3">
        <div class="col-12 bacColorF2 mb-4" @click="redirectTo(0)">
          <ui-title
            tag="h2"
            class="ui-title-2"
          >
            ПРОИЗВОДСТВО ПО ВАШИМ РАЗМЕРАМ
          </ui-title>
          <p>Выполняем изделия под заказ в размерах и исполнении заказчика</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="col-12 bacColorF2 mb-4" @click="redirectTo(1)">
          <ui-title
            tag="h2"
            class="ui-title-2"
          >
            ОНЛАЙН-КОНСТРУКТОР ИЗДЕЛИЙ
          </ui-title>
          <p>Рассчитайте точную стоимость изделия за несколько минут</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="col-12 bacColorF2 mb-4" @click="redirectTo(2)">
          <ui-title
            tag="h2"
            class="ui-title-2"
          >
            ЗАМЕР, ДОСТАВКА, МОНТАЖ ПО РОССИИ
          </ui-title>
          <p>
            Представители выполняют все работы “Под ключ” от замера до монтажа
            на объекте
          </p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="col-12 bacColorF2" @click="redirectTo(3)">
          <ui-title
            tag="h2"
            class="ui-title-2"
          >
            РАБОТАЕМ ПО ДОГОВОРУ
          </ui-title>
          <p>Все работы по договору с письменной гарантией качества</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-4" v-if="currentSystem === 'rolo'">
        <p>Рулонные шторы — современное и функциональное изделие для защиты помещения от посторонних взглядов и солнечных лучей. На нашем сайте представлены кассетные шторы для помещений разного назначения: от квартиры и частного дома до офисов, ресторанов и других помещений из сегмента HoReCa.</p>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-md-8">
        <p
          v-for="(p, i) in texts"
          :key="i"
        >
          {{ p }}
        </p>
      </div>
    </div>
    <!--    <div class="row mb-5">-->
    <!--      <div class="col-md-8">-->
    <!--        <systems-carousel :slides="slides" />-->
    <!--      </div>-->
    <!--      <div class="col-md-4 ui-relative">-->
    <!--        <order-now />-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="row">
      <!--      <div class="col-md-2">filter</div>-->
      <div class="col-md-12">
        <div
          v-for="attachmentPoint in attachmentPoints"
          :key="attachmentPoint.id"
          class="row mb-5"
        >
          <div class="col-12">
            <ui-title
              tag="h2"
              class="ui-title-2"
            >
              {{ attachmentPoint.fullName }}
            </ui-title>

            <div class="row">
              <product-card
              v-for="product in attachmentPoint.products"
              :key="product.productId"
              :product="product"
              :price="product.productInfo?.price"
              :old-price="product.productInfo?.oldPrice"
              class="col-xl-2 col-md-3 col-sm-4 col-6 product"
            />



            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12" v-if="currentSystem === 'Gwood'">
      <button class="img-new" @click="toggleRequestModal()">
        <img src="@/static/img-new/моторизация-в-подарок.png" alt="моторизация-в-подарок" />
      </button>
      <div class="toggle-block">
        <button class="toggle-button" @click="isOpen = !isOpen">
          <span class="arrow-icon">➔</span>
          <span class="wave-text">Условия акции «МОТОРИЗАЦИЯ В ПОДАРОК»</span>
           </button>
      </div>
    </div>

    <div class="row mb-5" >
      <MaterialPages />
    </div>
    <ui-title
        tag="h2"
        class="ui-title-2"
    >
      Получить электронный каталог готовой продукции
    </ui-title>
    <div class="row mb-5">
      <ModalCatalog />
    </div>

    <!--    <div class="row mb-5">-->
    <!--      <plisse-advantages-texts v-if="currentSystem === 'plisse'" />-->
    <!--      <rolo-advantages-texts v-if="currentSystem === 'rolo'" />-->
    <!--      <zebra-advantages-texts v-if="currentSystem === 'zebra'" />-->
    <!--      <vblinds-advantages-texts v-if="currentSystem === 'vblinds'" />-->
    <!--      <hblinds-advantages-texts v-if="currentSystem === 'hblinds'" />-->

    <!--      <roma-advantages-texts v-if="currentSystem === 'roma'" />-->
    <!--      <profile-cornices-advantages-texts-->
    <!--        v-if="currentSystem === 'profileCornices'"-->
    <!--      />-->
    <!--    </div>-->
    <Advantages />



    <!-- <wood-advantages-texts v-if="currentSystem === 'wood'" /> -->

    <div class="col-lg-12" v-if="currentSystem === 'wood'">
      <div class="rutube-video-wrapper">
        <div class="responsive-video">
          <iframe
            src="https://rutube.ru/play/embed/932d1938a1fba988ea87e1a9db6fefad"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>


    <div class="row mb-5">
      <div class="col-12 buttonX" v-if="currentSystem === 'rolo'">
        <a href="https://www.foroom.ru/actions" target="_blank">
          <img
            src="/img-new/Актуальная акция на рулонные шторы.png"
            alt="Рулонные шторы по специальной цене – успейте заказать!"
            title="Только сейчас – рулонные шторы по выгодной цене!"
            class="img-fluid"
          />
        </a>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12 buttonX" v-if="currentSystem === 'wood'">
        <a href="https://www.foroom.ru/actions" target="_blank">
          <img
            src="/img-new/Баннер деревянные жалюзи.png"
            alt="Деревянные жалюзи FOROOM по специальной цене – успейте заказать!"
            title="Только сейчас – деревянные жалюзи FOROOM по выгодной цене!"
            class="img-fluid"
          />
        </a>
      </div>
    </div>



   <AdvantagesWorks/>

   <Works :current-system="currentSystem"/>

   <ShopsInfoModal v-if="currentSystem === 'rolo'" />

   <ProductComparison  />


<!--    <div class="row mb-5">-->
<!--      <plisse-advantages-texts v-if="currentSystem === 'plisse'" />-->
<!--      <rolo-advantages-texts v-if="currentSystem === 'rolo'" />-->
<!--      <zebra-advantages-texts v-if="currentSystem === 'zebra'" />-->
<!--      <vblinds-advantages-texts v-if="currentSystem === 'vblinds'" />-->
<!--      <hblinds-advantages-texts v-if="currentSystem === 'hblinds'" />-->
      <wood-advantages-texts v-if="currentSystem === 'wood'" />
<!--      <roma-advantages-texts v-if="currentSystem === 'roma'" />-->
<!--      <profile-cornices-advantages-texts-->
<!--        v-if="currentSystem === 'profileCornices'"-->
<!--      />-->
<!--    </div>-->
    <div class="row">
      <div class="col-12 mb-4">
        <ui-title
          tag="h2"
          class="ui-title-2"
        >
          СЕРТИФИЦИРОВАННЫЕ РУЛОННЫЕ ШТОРЫ С ПИСЬМЕННОЙ ГАРАНТИЕЙ
        </ui-title>
        <p>
          Вся продукция ТМ FOROOM соответствует тебованиям нормативных
          документов, что подтверждено сертификатом соответствия.
        </p>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <ui-img
          src="_images/sert/1.jpg"
          alt="Сертификат FOROOM соответствует нормативам"
          className="info-block__img"
        />
      </div>
      <div class="col-md-3">
        <ui-img
          src="_images/sert/3.jpg"
          alt="Сертификат FOROOM о пожарной безопасности"
          className="info-block__img"
        />
      </div>
      <div class="col-md-3">
        <ui-img
          src="_images/sert/26.jpg"
          alt="Сертификат FOROOM член асоциации рестораторов"
          className="info-block__img"
        />
      </div>
      <div class="col-md-3">
        <ui-img
          src="_images/sert/16_1.jpg"
          alt="Сертификат FOROOM OEKO-TEX"
          className="info-block__img"
        />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-md-6">
        <systems-widget wType="1" />
      </div>
      <div class="col-md-6 widgetS">
        <systems-widget wType="2" />
      </div>
    </div>

    <div class="row mb-5">
      <review-lab data-widgetid="67d3cfea33f1fbe77b7e3434"></review-lab>
      <script
        src="https://app.reviewlab.ru/widget/index-es2015.js"
        defer
      ></script>
      <!--      <div class="col-md-6">-->
      <!--        <div style="width:560px;height:800px;overflow:hidden;position:relative;"><iframe style="width:100%;height:100%;border:1px solid #e6e6e6;border-radius:8px;box-sizing:border-box" src="https://yandex.ru/maps-reviews-widget/146354444766?comments"></iframe><a href="https://yandex.ru/maps/org/firma_kalita/146354444766/" target="_blank" style="box-sizing:border-box;text-decoration:none;color:#b3b3b3;font-size:10px;font-family:YS Text,sans-serif;padding:0 20px;position:absolute;bottom:8px;width:100%;text-align:center;left:0;overflow:hidden;text-overflow:ellipsis;display:block;max-height:14px;white-space:nowrap;padding:0 16px;box-sizing:border-box">Фирма Калита на карте Москвы и Московской области — Яндекс Карты</a></div>-->
      <!--      </div>-->
      <!--      <div class="col-md-6">-->
      <!--        <div id="ivy-google-reviews-widget"></div>-->
      <!--        <script type="text/javascript" src="https://web-widgets.ru/google_reviews/wwwforoom.ru.js" async></script>-->
      <!--      </div>-->
    </div>

    <div class="row mb-5">
      <callback-promo-block />
    </div>

    <!--    <div class="row mb-5">-->
    <!--      <ui-title-->
    <!--        tag="h2"-->
    <!--        class="ui-title-1"-->
    <!--        v-if="['plisse', 'rolo', 'vblinds'].includes(currentSystem)"-->
    <!--      >-->
    <!--        Дополнительная информация-->
    <!--      </ui-title>-->
    <!--      <plisse-seo-texts v-if="currentSystem === 'plisse'" />-->
    <!--      <rolo-seo-texts v-if="currentSystem === 'rolo'" />-->
    <!--      <vblinds-seo-texts v-if="currentSystem === 'vblinds'" />-->
    <!--    </div>-->
    <!-- <div class="row mb-5">
      <ar-promo-block />
    </div> -->
  </main>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { catalogStore } from '@/utils/store-accessor'
import {
  systemsCarouselStore,
  textsStore,
  systemsStore,
  calculatorStore
} from '@/store'
import OrderNow from '@/components/Catalog/System/OrderNow.vue'
import Carousel from '@/components/common/Carousel/Carousel.vue'
import SystemsCarousel from '@/components/Catalog/System/SystemsCarousel.vue'
import SystemsWidget from '@/components/Catalog/System/SystemsWidget.vue'
import ArPromoBlock from '@/components/common/Promo/ArPromoBlock.vue'
import CallbackPromoBlock from '@/components/common/Promo/CallbackPromoBlock.vue'
import Advantages from '@/components/Catalog/System/Advantages.vue'

import { Text } from '@/types/Texts'
import { Page } from '@/types/Page'
import { CatalogProduct } from '@/types/Catalog'
import { SystemsCarouselType as Slide } from '@/types/SystemsCarousel'
import {
  AttachmentPoint,
  SystemProductsMap,
  SystemUrlMap
} from '@/types/Systems'
import ProductCard from '@/components/Catalog/ProductCard.vue'
//import MaterialCard from '@/components/Catalog/MaterialCard.vue'

import MaterialPages from '@/components/Catalog/MaterialPages.vue'
import ModalCatalog from '@/components/Catalog/ModalCatalog.vue'
import RoloAdvantagesTexts from '@/components/Catalog/System/RoloAdvantagesTexts.vue'
import RoloSeoTexts from '@/components/Catalog/System/RoloSeoTexts.vue'
import PlisseAdvantagesTexts from '@/components/Catalog/System/PlisseAdvantagesTexts.vue'
import PlisseSeoTexts from '@/components/Catalog/System/PlisseSeoTexts.vue'
import ZebraAdvantagesTexts from '@/components/Catalog/System/ZebraAdvantagesTexts.vue'
import VblindsSeoTexts from '@/components/Catalog/System/VblindsSeoTexts.vue'
import VblindsAdvantagesTexts from '@/components/Catalog/System/VblindsAdvantagesTexts.vue'
import HblindsAdvantagesTexts from '@/components/Catalog/System/HblindsAdvantagesTexts.vue'
import WoodAdvantagesTexts from '@/components/Catalog/System/WoodAdvantagesTexts.vue'
import RomaAdvantagesTexts from '@/components/Catalog/System/RomaAdvantagesTexts.vue'
import ProfileCornicesAdvantagesTexts from '@/components/Catalog/System/ProfileCornicesAdvantagesTexts.vue'
//import UITitle from '@/components/UI/UI-Title.vue'
import UITitle from "@/components/UI/UI-Title.vue";
import Works from "@/components/Catalog/Works.vue";
import AdvantagesWorks from "@/components/Catalog/AdvantagesWorks.vue";
import  ProductComparison from "@/components/Catalog/ProductComparison.vue";
import ShopsInfoModal from "@/components/Catalog/ShopsInfoModal.vue";
@Component({
  components: {
    ModalCatalog,
    MaterialPages,
    UITitle,
    ProfileCornicesAdvantagesTexts,
    RomaAdvantagesTexts,
    HblindsAdvantagesTexts,
    WoodAdvantagesTexts,
    VblindsAdvantagesTexts,
    PlisseAdvantagesTexts,
    RoloAdvantagesTexts,
    ZebraAdvantagesTexts,

    PlisseSeoTexts,
    RoloSeoTexts,
    VblindsSeoTexts,
    ProductCard,
   // MaterialCard,
    CallbackPromoBlock,
    ArPromoBlock,
    SystemsCarousel,
    SystemsWidget,
    Carousel,
    OrderNow,
    Works,
    OrderNow,
    ProductComparison,
    OrderNow,
    AdvantagesWorks,
    OrderNow,
    Advantages,
    ShopsInfoModal
  }
})
export default class SystemPage extends Vue {
  @Getter('pages/currentPageGetter') page: Page
  @Getter('systems/systemProductsMapGetter')
  systemProductsMap: SystemProductsMap

  @Getter('catalog/catalogGetter') products: CatalogProduct[]
  @Getter('systems/systemUrlMapGetter') urlMap: SystemUrlMap[]

  data() {
    return {
      isOpen: false
    }
  }

 head() {
    if (this.metaData) {
      return this.metaData
    } else {
      return {
        title: 'none',
        meta: [{ hid: 'description', name: 'description', content: '--' }],
        script: '',
        __dangerouslyDisableSanitizers: ['script']
      }
    }
  }

  async asyncData() {
    const checkText = textsStore.texts?.some(
      (text: Text) =>
        text.type === 'catalog' &&
        text.key === 'systemTexts' &&
        text.key === 'H1Texts' &&
        text.key === 'metaData'
    )
    if (!checkText) {
      await textsStore.getTextsByTypeAndKey({
        type: 'catalog',
        key: 'systemTexts'
      })
      await textsStore.getTextsByTypeAndKey({
        type: 'catalog',
        key: 'H1Texts'
      })
      await textsStore.getTextsByTypeAndKey({
        type: 'catalog',
        key: 'metaData'
      })
    }

    if (!systemsCarouselStore.slides) {
      await systemsCarouselStore.getAllSlides()
    }

    if (!calculatorStore.templates) {
      await calculatorStore.getTemplates()
    }
  }

  getProducts(attachmentPoint: string): CatalogProduct[] {
    return this.systemProducts.filter(
      (product) => product.attachmentPoint === attachmentPoint
    )
  }
  redirectTo(id) {
    let to = ''
    switch (id) {
      case 0:
        to = '/proizvodstvo-foroom'
        break
      case 1:
        to = '/buy'
        break
      case 2:
        to = '/sale-points'
        break
      case 3:
        to = '/partneram-foroom'
        break
    }
    this.$router.push(to);
  }
  get currentSystem() {
    return this.urlMap.find(
      (item) => item.routeParam === this.$route.params.system
    )?.system
  }

  get attachmentPoints() {
    const attachmentPoints: AttachmentPoint[] = systemsStore.attachmentPoints
    return attachmentPoints
      .map((attachmentPoint) => ({
        ...attachmentPoint,
        products: this.getProducts(attachmentPoint.value)
      }))
      .filter((attachmentPoint) => attachmentPoint.products.length)
  }

  get systemProducts() {
    const map = Object.values(this.systemProductsMap).find((item) =>
      item.includes(this.currentSystem)
    )

    return this.products?.filter(
      (product): CatalogProduct => map.includes(product.system)
    )
  }

  get slides(): Slide[] {
    return systemsCarouselStore.systemsCarouselGetter?.filter(
      (slide): Slide => slide.type === this.currentSystem
    )
  }

  get texts() {
    if (this.currentSystem) {
      return textsStore.textsByParamsGetter('catalog', 'systemTexts')[
        this.currentSystem
      ]
    }
    return []
  }

  get store_h1() {
    let h1S = ''
    if (this.currentSystem) {
      h1S = textsStore.textsByParamsGetter('catalog', 'h1Texts')[
        this.currentSystem
      ]
    }
    return h1S
  }
  get metaData() {
    let meta = []
    if (this.currentSystem) {
      meta = textsStore.textsByParamsGetter('catalog', 'metaData')[
        this.currentSystem
      ]
    }
    return meta
  }

  toggleRequestModal() {
    this.$router.push('/buy/gorizontalnye-derevyannie-zhalyuzi')
  }

  get calcProcess(): boolean {
    return calculatorStore.calcProcessGetter;
  }

  get calculatedItem() {
    return calculatorStore.calculatedItemGetter;
  }



}
</script>

<style lang="scss" scoped>
.product {

}
.bacColorF2 {
  background: #f9a134;
  min-height: 160px;
  border-radius: 15px;
  opacity: 0.9;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);


  p {
    color: white;
    margin: auto;
    text-align: center;
  }

  .ui-title-2 {
    color: white;
    text-align: center;
    padding-top: 5%;
    min-height: 72.8px;
  }
}


.bacColorF2:hover {
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}


.bacColorF2:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.buttonX img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  transition: all 0.3s ease;
}


.buttonX:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}


.buttonX:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.buttonX:hover img {
  opacity: 0.9;
  filter: brightness(0.95);
}

.widgetS {
  max-height: 500px;
}

.rutube-video-wrapper .responsive-video {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.rutube-video-wrapper .responsive-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 12px;
}

.img-new {

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;



  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.98);
  }

  img {
    padding: 8px;
    box-sizing: border-box;
    max-width: 100%;
    height: auto;
    border-radius: 20px;
  }
}


.arrow-icon {
  font-size: 20px;
  animation: arrow-glow 1.5s infinite;
}

@keyframes arrow-glow {
  0% {
    color: #d38f2c;
    text-shadow: 0 0 5px rgba(211, 143, 44, 0.5);
  }
  50% {
    color: #ffb347;
    text-shadow: 0 0 10px rgba(211, 143, 44, 0.8);
  }
  100% {
    color: #d38f2c;
    text-shadow: 0 0 5px rgba(211, 143, 44, 0.5);
  }
}


.wave-text {
  color: black;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, black 0%, #d38f2c 20%, black 40%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: wave-animation 3s infinite linear;
}

@keyframes wave-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.toggle-content {
  margin-bottom: 15px;
}
.toggle-block {
  margin-bottom: 15px;
}

</style>
