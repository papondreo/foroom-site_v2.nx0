<template>
  <div v-if="hasImages">
    <ui-img
      :src="images[0]"
      :alt="seoSafe[0].alt"
      :title="seoSafe[0].title"
    />

    <div class="row mt-4" v-if="thumbs.length">
      <div class="col-4" v-for="(src, idx) in thumbs" :key="src || idx">
        <ui-img
          :src="src"
          :alt="seoSafe[idx + 1].alt"
          :title="seoSafe[idx + 1].title"
        />
      </div>
    </div>
  </div>

  <div v-else class="empty">Нет изображений</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

type SeoItem = { alt?: string; title?: string; seo?: string }

const isDevClient = process.client && process.env.NODE_ENV !== 'production'

@Component
export default class ProductImages extends Vue {
  @Prop({ required: true }) readonly images!: string[]
  @Prop({ default: () => [] }) readonly seo!: SeoItem[]

  get hasImages(): boolean {
    return Array.isArray(this.images) && this.images.length > 0
  }

  get thumbs(): string[] {
    return this.hasImages ? this.images.slice(1) : []
  }

  get seoSafe(): { alt: string; title: string }[] {
    const imgs = Array.isArray(this.images) ? this.images : []
    const s = Array.isArray(this.seo) ? this.seo : []
    return imgs.map((_, i) => ({
      alt: s[i]?.alt ?? '',
      title: s[i]?.title ?? s[i]?.seo ?? ''
    }))
  }

  mounted() {

  }
}
</script>

<style scoped>
.empty { padding: 1rem; opacity: .7; }
</style>

<style lang="scss" scoped>
.price {
  font-size: 28px;
  color: $brand-deep-blue;
  span.bold {
    font-weight: 400;
  }
}
.old-price {
  text-decoration: line-through;
  font-size: 15px;
  margin-left: 5px;
  position: relative;
  top: -9px;
  font-weight: 300;
  color: #606060;
}
</style>
