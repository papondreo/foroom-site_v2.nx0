<template>
  <section class="ui-mt-5">
    <div class="col-12 mt-4">
      <div class="factory mb-4 row">
        <div class="col-lg">
          <div class="about__text">
            <ui-title
              tag="h2"
              class="ui-title-1"
            >
              Дополненная реальность
            </ui-title>
            <p class="mb-2">Выберите жалюзи с мобильным приложением дополненной реальности FOROOM AR.</p>
            <p class="mb-2">Доступно в App Store и Google Play.</p>
          </div>
        </div>
        <div class="col-lg-6">
          <YoutubeVideo
            :data="{ url: 'https://www.youtube.com/embed/iv_BkTfi99Y' }"
            class="mb-3"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import YoutubeVideo from "@/components/common/YoutubeVideo.vue";
@Component({
  components: { YoutubeVideo }
})
export default class ForoomVr extends Vue {}
</script>

<style lang="scss" scoped>

</style>
