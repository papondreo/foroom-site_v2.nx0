<template>
  <div>
    <input
      type="text"
      v-model="search"
      ref="suggest"
      id="searchCity"
      placeholder="Введите адрес для поиска магазина"
      class="search-input"
      @keyup.enter="searchCity()"
    />
<!--    <button type="button" @click="clearSearch">Clear</button>-->
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from 'nuxt-property-decorator'
import { shopsStore } from '@/utils/store-accessor'

interface YMaps {
  multiRouter: any
  modules: any
  geolocation: any
}
interface Map {
  geoObjects: any
}

@Component
export default class ShopsSearch extends Vue {
  search: string = ''
  yMaps: any = {}
  // readonly apiKey: string = '49b703ae-b1f3-4b42-bc45-dc0860f1af3c'
  readonly apiKey: string = 'fd261ce4-b879-4d4a-a897-bb15cf1371e0'

  mounted() {
    const int = setInterval(() => {
      if (window.ymaps) {
        this.yMaps = window.ymaps

        const init = () => {
          const suggestView = new this.yMaps.SuggestView(this.$refs.suggest)
          suggestView.events.add('select', (e) => {
            this.search = e.originalEvent.item.value
            this.searchCity()
          })
        }
        this.yMaps.load(init)
        clearInterval(int)
      }
    }, 500)
  }

  async clearSearch() {
    const { geoObjects } = await this.yMaps!.geolocation.get({
      provider: 'browser',
      mapStateAutoApply: true
    })
    // geoObjects.position = [55.747358, 37.556495]
    shopsStore.setUserLocation(geoObjects.position)
    this.search = ''
  }

  async searchCity() {
    if (this.search.trim()) {
      const { response } = await this.$axios.$get(
        'https://geocode-maps.yandex.ru/1.x/?apikey=' +
          this.apiKey +
          '&format=json&geocode=' +
          this.search
      )
      const data = response.GeoObjectCollection.featureMember
      if (data.length) {
        const yaLocation = data
          .map((i) => ({
            name: i.GeoObject.name,
            description: i.GeoObject.description,
            coords: i.GeoObject.Point.pos.split(' ')
          }))
          .sort((a, b) => {
            if (a.distance < b.distance) return -1
            if (a.distance > b.distance) return 1
            return 0
          })

        const location = [yaLocation[0].coords[1], yaLocation[0].coords[0]]

        this.$emit('search', location)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  display: block;
  padding: 4px 10px;
  font-size: 16px;
  font-weight: 300;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
