<template>
  <div>
    <ui-title
      tag="h2"
      class="ui-title-1"
      v-if="this.$route.path.toLowerCase() === '/catalog/gorizontalnye-derevyannie-zhalyuzi/wood'"
    >
      Основные преимущества деревянных жалюзи
    
    </ui-title>

    <ui-title
    tag="h2"
    class="ui-title-1"
    v-else
  >
    Основные преимущества
  
  </ui-title>
<!--
    <div
      v-for="(block, i) in text"
      :key="i"
      class="row ui-mb-4"
    >
      <div class="col-md-9">
        <ui-title
          v-if="block.title"
          tag="h3"
          class="ui-title-2 ui-mb-1"
        >
          {{ block.title }}
        </ui-title>
        <p
          v-for="(p, n) in block.text"
          :key="n"
        >
          {{ p }}
        </p>
      </div>
      <div class="col-md-3">
        <ui-img
          v-if="block.img"
          :src="block.img"
        />
      </div>
    </div>
-->
    <div class="row">
      <div
        v-for="(block, i) in text.filter((block, i) => !i)"
        :key="i"
        class="col-12 ui-mb-4"
      >
        <ui-img
          v-if="block.img"
          :src="block.img"
          :alt="block.seoAlt ? block.seoAlt : ''"
          :title="block.seoTitle ? block.seoTitle : ''"
          class="ui-mb-4"
        />
        <ui-title
          v-if="block.title"
          tag="h3"
          class="ui-title-2 ui-mb-1 ui-mt-3"
        >
          {{ block.title }}
        </ui-title>
        <p
          v-for="(p, n) in block.text"
          :key="n"
        >
          {{ p }}
        </p>
      </div>

      <div
        v-for="(block, i) in text.filter((block, i) => i)"
        :key="`n-${i}`"
        class="col-sm-6 col-md-3 ui-mb-4"
      >
        <ui-img
          v-if="block.img"
          :src="block.img"
          :alt="block.alt ? block.alt : block.seoAlt ? block.seoAlt : ''"
          :title="
            block.imgTitle
              ? block.imgTitle
              : block.seoTitle
              ? block.seoTitle
              : ''
          "
          class="ui-mb-4"
        />
        <ui-title
          v-if="block.title"
          tag="h3"
          class="ui-title-2 ui-mb-1 ui-mt-3"
        >
          {{ block.title }}
        </ui-title>
        <p
          v-for="(p, n) in block.text"
          :key="`z-${n}`"
        >
          {{ p }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

interface TextBlock {
  img: string
  title: string
  text: string[]
}

@Component
export default class ProductInfo extends Vue {
  @Prop({ required: true })
  text: TextBlock[]
 

}
</script>

<style lang="scss" scoped>

</style>
