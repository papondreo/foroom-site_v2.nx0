<template>
  <div>
    <CoolLightBox
      :items="items"
      :index="index"
      :effect="'fade'"
      @close="index = null"
    />

    <p>
      Как сделать замер:
      <button
        class="button ui-link ui-link_orange"
        v-for="(button, key) in buttons"
        :key="button.id"
        @click="index = key"
      >
        {{ button.title }}
      </button>
    </p>

    <img
      :src="`/img-new/constructor/Sizes/${product.system}-${product.sizesScheme}`"
      class="ui-mt-3"
      alt=""
      style="width: 100%"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component({
  components: {
    CoolLightBox
  }
})
export default class Box extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct

  index = null

  buttons = [
    { id: 1, title: 'Фото' },
    { id: 2, title: 'Видео' }
  ]

  created() {
    if (!this.product.measure.photo) {
      this.buttons = this.buttons.filter((button) => button.id !== 1)
    }

    if (!this.product.measure.video) {
      this.buttons = this.buttons.filter((button) => button.id !== 2)
    }
  }

  get items() {
    return Object.values(this.product.measure)
  }
}
</script>

<style lang="scss" scoped>
.button {
  margin: 0 4px;
}
</style>
