<template>
  <div class="slideshow-container">
    <div class="slide fade">
      <img
        src="https://www.foroom.ru/img/images/nf_foroom/slides/slide_b2d86763e6b5749e1e6d.jpg"
        style="width: 100%"
      />
      <!--      <div class="text">-->
      <!--        Выберите ближайший магазин или закажите online в КОНСТРУКТОРЕ-->
      <!--      </div>-->
    </div>

<!--    <div class="slide fade">-->
<!--      <img-->
<!--        src="https://www.foroom.ru/img/images/nf_foroom/slides/slide_5e0a769c17119708342e.jpg"-->
<!--        style="width: 100%"-->
<!--      />-->
<!--      &lt;!&ndash;      <div class="text">Caption Two</div>&ndash;&gt;-->
<!--    </div>-->

<!--    <div class="slide fade">-->
<!--      <img-->
<!--        src="https://www.foroom.ru/img/images/nf_foroom/slides/slide_24c3d6a3122145e2d62d.jpg"-->
<!--        style="width: 100%"-->
<!--      />-->
<!--      &lt;!&ndash;      <div class="text">Caption Three</div>&ndash;&gt;-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Carousel extends Vue {
  slideIndex: number = 0
  timeout

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
.slides {
  display: none;
}
.slide {
  position: absolute;
  width: 100%;
  height: 100%;
}
img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  //height: 350px;
  border-radius: $img-border-radius;
  object-fit: cover;
  object-position: center;
}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
  padding-bottom: 48.5%;
  //height: 350px;

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
