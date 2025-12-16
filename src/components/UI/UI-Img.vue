<template>
  <picture>
    <source
      :srcset="webp"
      type="image/webp"
    />
    <img
      :src="source"
      :class="className"
      :alt="alt"
      :title="title"

    />
  </picture>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class UiImg extends Vue {
  @Prop()
  readonly src: string

  @Prop()
  readonly preview: string

  @Prop()
  readonly className: string

  @Prop()
  readonly alt: string

  @Prop()
  readonly title: string

  readonly domain: string = 'https://www.foroom.ru/'

  mounted() {
    // console.log('🖼️ UiImg mounted')
    // console.log('🔗 src:', this.src)
    // console.log('🧾 alt:', this.alt)
    // console.log('🏷️ title:', this.title)
    // console.log('📷 source:', this.source)
    // console.log('📦 webp:', this.webp)
  }

  get webp() {
    const index = this.source.lastIndexOf('.')
    const ext = this.source.includes('nf_foroom') ? '.jpg' : ''
    const isNfForoom = this.source.includes('nf_foroom')

    return isNfForoom
      ? this.source + '.webp'
      : this.source.substr(0, index) + ext + '.webp'
  }

  get source(): string {

    let src = this.src
    src = src.replace('/img/', '/img-new/')
    return !src.includes('images') ? src : this.domain + src
 
  // if (this.src.startsWith('/_images/bestsellers/')) {             // костыль если приходит старый путь из _images  направляем на новый
  //   const fileName = this.src.split('/').pop() || ''
  //     return `/img-new/catalog/products/${fileName}`
  // }

  // let path = this.src.replace('/img/', '/img-new/')
  // return path.includes('images')
  //   ? this.domain + path
  //   : path
}

}
</script>

<style lang="scss" scoped>
.preview {
  border-radius: 5px 5px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

img {
  border-radius: $img-border-radius;
}

.filter {
  filter: brightness(60%);
}

picture img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
}

.rotateH {
  width: auto;
  height: 100%;
}

</style>
