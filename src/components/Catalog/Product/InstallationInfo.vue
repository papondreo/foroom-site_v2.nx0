<template>
  <section>
    <ui-title
      tag="p"
      class="ui-title-2 mb-2 ui-mt-6"
    >
      Информация по замеру и монтажу
    </ui-title>

    <template v-if="product.system !== 'karniz'">
      <p>
        Вы можете подробно ознакомиться с инструкциями по замеру и установке,
        просмотрев данные материалы:
      </p>

      <CoolLightBox
        :items="items"
        :index="index"
        :effect="'fade'"
        @close="index = null"
      />

      <div class="links ui-mt-4">
        <div
          v-if="links.photo"
          class="link"
          @click="index = 0"
        >
          <i class="fa fa-picture-o"></i>
          Фото,<br />как сделать замер
        </div>

        <div
          v-if="links.video"
          class="link"
          @click="index = 1"
        >
          <i class="fa fa-video-camera"></i>
          Видео,<br />как сделать замер
        </div>
        <div v-if="installationPageUrl && setupUrl">
          <nuxt-link
            :to="setupUrl"
            class="link"
          >
            <i class="fa fa-wrench"></i>
            Инструкция<br />по установке
          </nuxt-link>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="links ui-mt-4">
        <div
          class="link"
        >
          <a
            :href="`/_images/catalog/karniz/${product.productId}/passport.pdf`"
            target="_blank"
          >
            <i class="fa fa-file-text-o"></i>
            Паспорт<br />изделия
          </a>
        </div>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

interface Links {
  photo?: string
  video?: string
}

@Component({
  components: {
    CoolLightBox
  }
})
export default class InstallationInfo extends Vue {
  @Prop({ required: true })
  readonly product: any

  @Prop({ required: true })
  readonly links: string[]

  @Prop({ required: true })
  readonly installationPageUrl: string

  index = null
  setupUrl = ''

  created() {
    if (this.installationPageUrl) {
      const a = this.installationPageUrl.split('/')
      this.setupUrl = `/catalog/${a[1]}/${a[2]}/ustanovka`
    }
  }

  get items() {
    return Object.values(this.links).filter((link) => link)
  }
}
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  justify-content: space-around;
}
.link {
  display: inline-block;
  text-align: center;
  font-weight: 400;

  cursor: pointer;

  transition: color 0.3s ease-in-out;

  i {
    display: block;
    margin-bottom: 12px;
    font-size: 28px;
    color: #7e7b7b;
    transition: color 0.3s ease-in-out;
  }
  &:hover {
    color: $brand-orange-light;
    i {
      color: $brand-orange-light;
    }
  }
}
</style>
