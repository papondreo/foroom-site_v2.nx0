<template>
  <div class="">
    <!-- <div class="row">
      <div class="col-12 mb-4">
        <ui-title
            tag="h2"
            class="ui-title-2"
        >
          Почему выбирают рулонные шторы?
        </ui-title>
        <p>Однотонные модели тканей помогут подчеркнуть лаконичность дизайна интерьера, а текстиль с узорами добавит дополнительную изюминку в окружающее пространство.
      Быстрый монтаж и удобное управление позволяют поддерживать комфортный уровень освещения внутри помещения, не отвлекаясь от важных дел.
      Фурнитура выполнена из качественных материалов с использованием металлических элементов, что гарантирует долгий срок службы изделия при правильной эксплуатации.
        Широкий ассортимент тканей включает в себя все популярные оттенки: белый, серый, черный, коричневый и другие.</p>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="col-12 mb-4">
        <ui-title
            tag="h2"
            class="ui-title-2"
        >
          Где купить рулонные шторы в Москве и Санкт-Петербурге
        </ui-title>
        <p>На нашем сайте можно оформить заказ с помощью удобного онлайн-конструктора. Если вы планируете сделать покупку немного позже, добавьте понравившиеся модели в избранное. В качестве альтернативного варианта можно посетить розничный магазин официального представителя FOROOM в вашем городе. Вы получите профессиональную консультацию, оплатите товар удобным способом: наличными или банковской картой. Наши партнеры помогут решить любую проблему с товаром в случае ее возникновения или оформить товар в случае необходимости.</p>
      </div>
    </div> -->
    <!-- <div class="row ui-mt-4">
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
    </div> -->
    <div v-if="systems?.items?.length">
    <h2 class="section-title">Дополнительная информация</h2>
    <p>Рекомендуем ознакомиться с подробностями каждого товара. В ассортименте — стандартные и индивидуальные размеры.</p>

    
    <h2 class="text-center"> {{systems.titleName}}</h2>
    <div class="comparison-wrapper">
      <div class="comparison-fixed-column">
        <div class="value"></div>
        <div class="field-group" v-for="(label, i) in labels" :key="i">
          <div class="param"><strong>{{ label }}</strong></div>
        </div>
    </div>

  <div class="comparison-scrollable" ref="scrollable">
    <div class="system" v-for="(sys, idx) in systems.items" 
      :key="idx">
      <div class="image-wrapper">
        <img :src="sys.image" :alt="sys.alt" class="system-img" />
        <div class="button-container">
          <a v-if="sys.buttonLink" :href="sys.buttonLink" target="_blank" class="button-overlay">
            Подробнее
          </a>
        </div>
      </div>

      <div class="field-group"><div class="value">{{ sys.maxWidth }}</div></div>
      <div class="field-group">
      <div class="value">
        <ul>
          <li v-for="(mount, i) in sys.mounting" :key="i">{{ mount }}</li>
        </ul>
      </div>
      </div>
      <div class="field-group"><div class="value">{{ sys.hasBox ? 'Да' : 'Нет' }}</div></div>
      <div class="field-group"><div class="value">{{ sys.hasGuides ? 'Да' : 'Нет' }}</div></div>
      <div class="field-group">
      <div class="value">
        <ul>
          <li v-for="(mount, i) in sys.control" :key="i">{{ mount }}</li>
        </ul>
      </div>
      </div>
      <div class="field-group">
        <div class="value">
          <ul>
            <li v-for="(adv, j) in sys.advantages" :key="j">{{ adv }}</li>
          </ul>
        </div>
      </div>
      
    </div>
  </div>

  <!-- ВАЖНО: Стрелки вынесены из потока и позиционируются абсолютом -->
  <button class="arrow arrow-left" @click="scrollLeft" type="button">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
</button>
<button class="arrow arrow-right" @click="scrollRight" type="button">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
</button>
    </div>
  </div>
  </div>

</template>


<script lang="ts">
import { Vue, Component ,Prop, Ref } from 'nuxt-property-decorator'
import { mapGetters } from "vuex";
import CallbackForm from '@/components/Forms/CallbackForm.vue'
import ShopsSearch from '@/components/common/Shops/ShopsSearch.vue'
import ShopCard from '@/components/common/Shops/ShopCard.vue'
import ShopsMap from '@/components/common/Shops/ShopsMap.vue'
import { shopsStore } from '@/store'
import { Shop } from '@/types/Shops/Shop'

@Component({
  components: {
    CallbackForm,
    ShopsSearch,
    ShopCard,
    ShopsMap
  } ,
  computed: {
    ...mapGetters("productSystems", ["getProduct"]),
  },
})
export default class ProductComparison extends Vue {


   @Ref('scrollable') readonly scrollable!: HTMLDivElement

  labels: string[] = [
    'Макс. ширина',
    'Крепление',
    'Короб',
    'Направляющие',
    'Управление',
    'Преимущества'
  ]

  showCallbackForm = false

  shopsCount = 3

  get currentSystem() {
    return this.$parent?.currentSystem || null;
  }


// ✅ Актуальные системы на основе currentSystem
  get systems() {
      if (this.currentSystem === "rolo") return this.getProduct[0];
      if (this.currentSystem === "wood") return this.getProduct[1];
      return [];
    }


    mounted() {
    // console.log("currentSystem:", this.currentSystem);
    // console.log("getProduct:", this.getProduct);
  }


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


  // onWheel(event: WheelEvent) {
  //   const el = this.$refs.scrollable as HTMLElement
  //   el.scrollLeft += event.deltaY
  // }


   // Новое: прокрутка ВЛЕВО по кнопке
   scrollLeft() {
  const el = this.scrollable as HTMLElement
  if (el) el.scrollLeft -= 800
}

scrollRight() {
  const el = this.scrollable as HTMLElement
  if (el) el.scrollLeft += 800
}
}
</script>


<style scoped>
.image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding-bottom: 60px;

}

.system-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}



.button-container {
  margin-top: -45px;
  display: flex;
  justify-content: center;
  width: 100%;
  right: 20px;
  transform: translateX(25%);
  position: relative;
  z-index: 20;
}


.button-overlay {
  background: #d38f2c;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
  transition: 0.3s ease;
  pointer-events: auto;
}


.button-overlay:hover {
  background: #b77a22;
}

@media (max-width: 700px) {
  .button-container {
    margin-top: -30px;
  }
}


.text-center{
    padding-top: 20px;
    margin-bottom: 16px;
    font-size: 19px;
    font-weight: 400;
    text-transform: uppercase;
    color: #d38f2c;
    text-align: left;
}

.field-group {
  display: flex;
  flex-direction: column;
  height: 200px;
}

.showroom-map { margin-top: 2rem; }
.map-container { border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
.system-image { position: relative; }
.system-image::after {
  content: attr(title);
  position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
  color: white; padding: 5px; border-radius: 4px;
  visibility: hidden; opacity: 0; transition: opacity 0.3s ease;
}
.system-image:hover::after { visibility: visible; opacity: 1; }

.section-title {
  padding-top: 20px; margin-bottom: 16px;
  font-size: 19px; font-weight: 400;
  text-transform: uppercase; color: #d38f2c;
  text-align: left;
}


.comparison-wrapper {
  height: 1700px;
  position: relative;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;


}

.comparison-wrapper { display: flex;  }
.comparison-fixed-column {

  padding-top: 380px;
  z-index: 2;



}


.comparison-scrollable {
  flex: 1 1 auto;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  scroll-behavior: smooth;
  max-width: 100%;;
}

.comparison-scrollable::-webkit-scrollbar {
  display: none;
}

.comparison-scrollable {
  scrollbar-width: none;    /* Firefox */
  -ms-overflow-style: none; /* IE и Edge */
}

.system {

  min-width: 480px
}

/* Стили для кнопок-стрелок */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.arrow-left {
  left: 10px;
}

.arrow-right {
  right: 10px;
}

.comparison-fixed-column {
  position: absolute;
  top: 0;
  left: 0;


  width: 100%;
  max-width: 1450px;

  display: flex;
  flex-direction: column;
  z-index: 2;
}


.param {
  color:rgb(252, 246, 246);
  background-color:#b9b8b8;
  position: sticky;
  padding-left: 10px;

}



/*
.system {
  flex: 0 0 auto;
  min-width: 200px;

} */

.system:not(:last-child) {
  border-right: 3px solid #b9b8b8;
}

.value {
  padding: 42px 12px;
  color: #3B3A49;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.2px;
}

.system-img {
  width: 500px;
  max-height: 400px;
  object-fit: contain;
}

ul {
  padding-left: 20px;
  text-align: left;
}

@media (max-width: 700px) {

  .comparison-wrapper {
  height: 760px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;


}


}



@media (max-width: 1200px) {
  .section-title,
  .text-center {
    font-size: 17px;
  }
  .comparison-wrapper {
  height: 1000px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;


}
  .comparison-fixed-column {
    padding-top: 280px;

    .comparison-fixed-column {
  position: absolute;
  top: 0; left: 0;
  display: flex;
  flex-direction: column;


  z-index: 2;

}

  }
  .value{
    font-size: 10px;
  }
  .param {
    font-size: 10px;
    padding: 3px 10px;
  }

  .system {
    width: 260px;
  }
  .system-img {
    max-height: 300px;
  }
}


@media (max-width: 991px) {
  .section-title,
  .text-center {
    font-size: 16px;
  }
  .comparison-wrapper { display: flex;  }
  .comparison-fixed-column {
    padding-top: 240px;



  }
  .value{
    font-size: 10px;
  }
  .param {
    font-size: 10px;
    padding: 1px 10px;
  }
  .comparison-fixed-column {
  position: absolute;
  top: 0; left: 0;
  display: flex;
  flex-direction: column;


  z-index: 2;
}
  .system {
    width: 220px;
  }
  .system-img {
    max-height: 250px;
  }
}




</style>