<template>
  <div>
    <button
      class="ui-button"
      @click="index = 0"
    >
      <i class="fa fa-image"></i>
    </button>
    <CoolLightBox
      :items="images"
      :index="index"
      :effect="'fade'"
      @close="index = null"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

@Component({
  components: { CoolLightBox }
})
export default class CheckGallery extends Vue {
  @Prop({ required: true })
  readonly images: string[]

  public index = null

  showGallery() {
    // console.log(this.images);
  }
}
</script>

<style lang="scss" scoped>
button {
  display: inline-flex;
  margin-right: 5px;
  padding: 8px 12px;
  background: rgba(#ffffff, .8);
  font-size: 20px;
  color: $brand-orange-light;
  transition: .3s ease-in-out;
  &:hover {
    background: #ffffff;
  }
}
</style>
