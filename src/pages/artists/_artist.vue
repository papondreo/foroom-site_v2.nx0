<template>
  <div class="container-xl">
    <div class="row">!</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
// import { MetaInfo } from 'vue-meta'

// import { artistsStore } from '@/store'
// import { Artist } from '@/types/Artist'

@Component
export default class ArtistsPage extends Vue {
  // public head(): MetaInfo {
  //   const { title } = this.$nuxt.$options.head
  //   return {
  //     title: `${title} - ${this.artist.title}`,
  //     meta: [{ hid: 'description', name: 'description', content: '' }]
  //   }
  // }
  //
  // get artist(): Artist {
  //   return artistsStore.artists.find(
  //     (artist) => artist.url === this.$route.params.artist
  //   )
  // }
}
</script>
