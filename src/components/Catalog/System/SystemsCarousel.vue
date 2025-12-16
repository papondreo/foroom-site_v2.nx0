<template>
  <div class="slideshow-container">
    <div
      class="slide fade"
      v-for="slide in slides"
      :key="slide.id"
    >
      <nuxt-link
        v-if="slide.redirect && slide.linkText"
        :to="slide.redirect"
      >
<!--        <div class="desc-text">-->
<!--          <span class="title">-->
<!--            Реклама-->
<!--          </span>-->
<!--          <p class="desc-text-hidden">-->
<!--            ООО "Фирма "КАЛИТА"<br>-->
<!--            ИНН: 7724024023<br/>-->
<!--            <span v-if="slide.erid">ERID: {{ slide.erid }}</span>-->
<!--          </p>-->
<!--        </div>-->
        <ui-img
          class="img"
          :src="`img/images/nf_foroom/system_slides/${slide.img}`"
          :alt="slide.img === 'slider-wood.jpg' ? 'деревянные жалюзи по вашим размерам' : ''"
          :title="slide.img === 'slider-wood.jpg' ? 'рассчитать стоимость деревянных жалюзи' : ''"
        />
        <button class="card-button">{{ slide.linkText }}</button>
      </nuxt-link>

      <ui-img
        v-else
        class="img"
        :src="`img/images/nf_foroom/system_slides/${slide.img}`"
       
      />

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
  readonly slides: Slide[] | null

  mounted() {
    this.showSlides()
  }

  beforeDestroy() {
    clearTimeout(this.timeout)
  }

  showSlides() {
    let i
    const slides = document.getElementsByClassName('slide')

    for (i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement
      slide.style.display = 'none'
    }

    this.slideIndex++
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1
    }

    const firstSlide = slides[this.slideIndex - 1] as HTMLElement
    firstSlide.style.display = 'block'

    this.timeout = setTimeout(this.showSlides, 5000)
  }
}
</script>

<style lang="scss" scoped>
.desc-text {
  position: absolute;
  right: 12px;
  top: 12px;
  text-align: right;
  .title {
    display: inline-block;
    padding: 3px 6px;
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.4);
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

.slide .card-button {
  position: absolute;
  bottom: 24px;
  right: 36px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  background: #d48b3d;
  border: 2px solid #fff;
  padding: 7px 22px;
  font-size: 22px;
  opacity: 0.8;
  border-radius: 6px;
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
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
  max-height: 350px;

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

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .text {
    font-size: 11px;
  }
}
</style>
