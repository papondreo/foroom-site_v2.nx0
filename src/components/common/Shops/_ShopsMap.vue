<template>
  <div ref="yandexMap"></div>
  <!--
  <yandex-map
    v-if="isMounted"
    :coords="shop.coords_geo"
    :style="mapStyle"
    :controls="mapControls"
    zoom="10"
    class="map"
    @map-was-initialized="initHandler"
  >
    <ymap-marker
      v-if="shop.coords_geo[0] && shop.coords_geo[1]"
      :key="shop.id"
      :marker-id="shop.id"
      :coords="shop.coords_geo"
      :hint-content="shop.name"
      :balloon="{
        header: shop.name
      }"
      cluster-name="1"
    ></ymap-marker>
  </yandex-map>
--></template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// import { loadScriptAsync } from '@/libs/loadScriptAsync'

// import YmapPlugin from 'vue-yandex-maps'
// import { yandexMap, loadYmap } from 'vue-yandex-maps'

@Component({})
export default class ShopsMap extends Vue {
  @Prop()
  shop: any

  // isMounted: boolean = false
  loading: boolean = true

  // mapControls = ['zoomControl']
  //
  // mapStyle = {
  //   width: '100%',
  //   height: '200px',
  //   border: '1px solid #f0f0f0',
  //   borderRadius: '5px',
  //   background: '#f8f8f8',
  //   overflow: 'hidden'
  // }

  //
  async created() {
    // console.log(1)
    // const loaded = await loadScriptAsync(
    //   'https://api-maps.yandex.ru/2.1/?apikey=fd261ce4-b879-4d4a-a897-bb15cf1371e0&lang=ru_RU'
    // )
    //
    // if (loaded) {
    //   console.log('ok', window)
    // }
  }

  mounted() {
    // Vue.use(YmapPlugin, {
    //   apiKey: 'fd261ce4-b879-4d4a-a897-bb15cf1371e0',
    //   lang: 'ru_RU',
    //   version: '2.1'
    // })
    //
    // this.isMounted = true
  }

  initHandler() {
    // const loadMap = async () => {
    //   await loadYmap({
    //     coordorder: 'latlong',
    //     version: '2.1',
    //     debug: true
    //   })
    //
    //   window.ymaps.geolocation
    //     .get({
    //       provider: 'yandex',
    //       mapStateAutoApply: true
    //     })
    //     .then(
    //       (result) => {
    //         console.log(
    //           'Location By Yandex: ',
    //           result.geoObjects.position.join(', ')
    //         )
    //       },
    //       (err) => {
    //         console.log('Yandex.geolocation error:', err)
    //       }
    //     )
    // }
    //
    // loadMap()
  }
}
</script>

<style lang="scss" scoped>
.top-navigation {
  //color: #3b3a49;
}
</style>
