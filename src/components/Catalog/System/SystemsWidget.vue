<template>
  <div class="widget-container">
    <div class="widget">
      <nuxt-link
          v-if="dataW().redirect && dataW().textB"
          :to="dataW().redirect"
      >
      <ui-img
        :src="dataW().img"
        :alt="dataW().alt"
        className=""
      />
      <div class="desc-text">
        <div class="col-md-12">
          <div class="row">
            <span class="title">{{ dataW().title }}</span>
            <pre class="">{{ dataW().pre }}</pre>
          </div>
        </div>
      </div>
      <button class="card-button">{{ dataW().textB }}</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { SystemsCarouselType as Slide } from '@/types/SystemsCarousel'
@Component
export default class SystemsCarousel extends Vue {
  slideIndex: number = 0
  timeout

  @Prop({ required: true })
  readonly wType: string | null

  mounted() {
    console.log(this.wType)
  }

  beforeDestroy() {
    clearTimeout(this.timeout)
  }

  dataW() {
    const data = {
      '1': {
        img: '/img-new/catalog/widget1.jpg',
        title: 'Солнцезащитные системы по вашим размерам',
        pre:'Почему  стоит заказывать у нас:\n' +
          '— Изготовим за несколько дней\n' +
          '— Доставка, замер и установка по России\n' +
          '— Онлайн-конструктор\n' +
          '— Более 250 розничных магазинов\n' +
          '— Работа по договору\n' +
          '— Доступная цена ',
        alt:'Купить выгодно сейчас',
        textB:'Оформить заказ',
        redirect:'/buy',
      },
      '2': {
        img: '/img-new/catalog/widget2.jpg',
        title: 'Стать официальным представителем бренда FOROOM',
        pre:'Преимущества работы с нами:\n' +
            '— Высокотехнологичное производство\n' +
            '— Доступ к экосистеме FOROOM\n' +
            '— Возможность принимать участие в тендерах\n' +
            '— Охват различных рынков сбыта\n' +
            '— Возможность продавать изделия на маркетплейсах\n' +
            '— Участие в ежемесячных акциях с реальными скидками\n' +
            '— Не являемся конкурентами нашим партнерам',
        alt:'Купить оптом дешево, Заработать, Готовый бизнес',
        textB:'Оставить заявку',
        redirect:'/partneram-foroom'
      }
    }
    if(this.wType in data){
      return data[this.wType]
    }else{
      return {
        img: '',
        title: '',
        pre: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.desc-text {
  position: absolute;
  padding: 24px;
  top: 10%;
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 420px;

  pre {
    color: #fff;
    font-family: 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
  }

  .title {
    margin: 0;
    color: #fff;
    font-family: 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    //height: 84px;
  }

  .desc-text-hidden {
    padding: 3px 6px;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    display: none;
    background: rgba(0, 0, 0, 0.4);
  }
  &:hover {
    .desc-text-hidden {
      display: block;
      border-radius: 4px 0 4px 4px;
    }

    .title {
      border-radius: 4px 4px 0 0;
    }
  }
}
.slides {
  display: none;
}

.widget .card-button {
  position: absolute;
  bottom: 24px;
  left: 36px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  background: #d48b3d;
  border: 2px solid #fff;
  padding: 7px 22px;
  font-size: 22px;
  border-radius: 6px;
  &:hover {
    font-size: 26px;
  }
}

::v-deep .img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  object-fit: cover;
  object-position: center;

  img {
    display: table;
    vertical-align: middle;
    //height: 350px;
    border-radius: $img-border-radius;
    object-fit: cover;
    object-position: center;
  }
}

/* Slideshow container */
.widget-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
  max-height: 465px;

  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
  overflow: hidden;
  border-radius: $img-border-radius;
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active {
  background-color: #717171;
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .text {
    font-size: 11px;
  }
}
</style>
