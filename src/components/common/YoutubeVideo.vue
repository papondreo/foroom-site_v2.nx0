<template>
  <div>
    <transition name="fade">
      <div
        class="youtube"
        v-if="loaded"
        key="youtube-container"
      >
        <img
          v-if="!play"
          :src="loadPreview(data.url)"
          @click.prevent="playVideo()"
          alt=""
        />
        <div
          class="play-button"
          v-if="!play"
          @click.prevent="playVideo()"
        ></div>
        <iframe
          v-if="play"
          :src="`${data.url}?showinfo=0&amp;autoplay=1`"
          width="100%"
          height="315"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div
        class="youtube youtube_loading"
        v-else
        key="youtube-loader"
      >
        <div class="play-button"></div>
      </div>
    </transition>
    <h3
      class="mt-3 main-subtitle main-subtitle_brand on-tv__subtitle"
      v-if="data.manual"
      key="youtube-title"
    >
      {{ data.title }}
    </h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

interface Data {
  url: string
  title: string
  manual: string
}

@Component
export default class YoutubeVideo extends Vue {
  loaded = false
  play = false

  @Prop()
  readonly data: Data

  mounted() {
    setTimeout(() => {
      this.loaded = true
    }, 2000)
  }

  loadPreview(link: string): string {
    const linkArr = link.split('/')
    return `https://img.youtube.com/vi/${
      linkArr[linkArr.length - 1]
    }/sddefault.jpg`
  }

  playVideo(): void {
    this.play = true
  }
}
</script>

<style lang="scss" scoped>
.youtube {
  background-color: #000;
  position: relative;
  padding-top: 56.25%;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
.youtube_loading {
  background-color: #ddd !important;
  position: relative;
  padding-top: 56.25%;
  border-radius: 5px;
  width: 100%;
}

.youtube:hover .play-button {
  background: red;
  opacity: 1;
}

.youtube img {
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.7;
  object-fit: cover;
  height: 100%;
  border-radius: 5px;
}

.youtube .play-button {
  width: 90px;
  height: 60px;
  background-color: #333;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
  z-index: 1;
  opacity: 0.8;
  border-radius: 6px;
  transition: 0.2s ease;
}

.youtube .play-button:before {
  content: '';
  border-style: solid;
  border-width: 15px 0 15px 26px;
  border-color: transparent transparent transparent #fff;
}

.youtube img,
.youtube .play-button {
  cursor: pointer;
}

.youtube img,
.youtube iframe,
.youtube .play-button,
.youtube .play-button:before {
  position: absolute;
}

.youtube .play-button,
.youtube .play-button:before {
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.youtube iframe {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>

<style lang="sass" scoped>
.fade-enter-active
  transition: opacity 1s

.fade-leave-active
  transition: opacity 0s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
