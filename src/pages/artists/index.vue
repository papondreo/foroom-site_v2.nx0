<template>
  <section class="container-xl">
    <div class="row"></div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'

// import { artistsStore } from '@/store'

@Component({
  head(): MetaInfo {
    return {
      title: 'Мастера'
    }
  }
})
export default class ArtistsPage extends Vue {}
</script>
