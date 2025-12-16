<template>
    <div
      class="map"
      :id="uniqId"
      :v-show="initialized"
    >
      <CoolLightBox
        :items="[imageSrc]"
        :index="index"
        :effect="'fade'"
        @close="index = null"
      />
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Prop, Getter } from 'nuxt-property-decorator'
import { loadScriptAsync } from '@/libs/loadScriptAsync'

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

import { shopsStore } from '@/utils/store-accessor'
import { Shop } from '@/types/Shops/Shop'

interface YMaps {
  multiRouter: any
  modules: any
  geolocation: any
}
interface Map {
  geoObjects: any
}

@Component({
  components: {
    CoolLightBox
  }
})
export default class ShopsMap extends Vue {
  @Prop()
  readonly uniqId: string

  @Prop()
  readonly sc: Shop[]

  // @Getter('shops/shopsGetter') shops: Shop[]
  @Getter('shops/selectedShopGetter') shop: Shop
  @Getter('shops/userLocationGetter') userLocation
  @Getter('shops/mapRoutesGetter') mapRoutes

  index = null
  imageSrc = null
  listener = null

  initialized: boolean = false
  yMaps: YMaps | null = null
  map: Map | null = null
  // readonly apiKey: string = '49b703ae-b1f3-4b42-bc45-dc0860f1af3c'
  readonly apiKey: string = 'fd261ce4-b879-4d4a-a897-bb15cf1371e0'

  async mounted() {
    const { ymaps } = window as any

    if (!ymaps) {
      await loadScriptAsync(
        `https://api-maps.yandex.ru/2.1/?apikey=${this.apiKey}&lang=ru_RU`
      )
    }
    this.initialized = await this.initMap()

    this.listener = window.addEventListener('click', (e) => {
      if (e.target?.classList && e.target.classList.contains('balloon__img')) {
        // console.log(e.target.dataset.img);
        this.index = 0
        this.imageSrc = `https://foroom.ru/img/images/map_items/${e.target.dataset.img}`
      }
    })
  }

  beforeDestroy() {
    removeEventListener('click', this.listener)
  }

  async initMap() {
    const { ymaps } = window as any

    if (ymaps) {
      this.yMaps = ymaps

      ymaps.ready(async () => {
        const map = new ymaps.Map(this.uniqId, {
          center: this.shops[0].coords_geo,
          zoom: 11,
          controls: ['zoomControl']
        })

        if (map) {
          this.map = map

          await this.getUserLocation()

          this.shops.map((shop) => this.setMarker(shop))

          if (!this.sc) {
            this.printRoute()
          }
        }
      })
    }
    return true
  }

  setCenter(coords) {
    this.map.setCenter(coords, 11)
  }

  setMarker(shop: Shop): void {
    this.yMaps!.modules.require(['Placemark', 'Circle'], (Placemark) => {
      const placemark = new Placemark(
        shop.coords_geo,
        {
          hintContent: shop.name,

          balloonContentHeader: shop.name,
          balloonContentBody: this.balloonContent(shop),
          balloonContentFooter: this.balloonFooter(shop)
        },
        {
          iconLayout: 'default#image',
          iconImageHref: this.markerIcon(shop),
          iconImageSize: [32, 39],
          iconImageOffset: [-16, -39]
        }
      )

      placemark.events.add(['click'], async () => {
        await shopsStore.selectShop(shop.id)
        this.$emit('selectShop', shop.coords_geo)
      })
      this.map!.geoObjects.add(placemark)
    })
  }

  markerIcon(shop: Shop): string {
    const url = '/img-new/icons/'
    if (this.sc && this.sc.length) {
      return url + 'service_marker.svg'
    }
    if (shop.isWww) {
      return url + 'internet_marker.svg'
    } else if (shop.isComplect) {
      return url + 'katris_marker.svg'
    } else if (shop.isPartner) {
      return url + 'foroom-pro_marker.svg'
    } else {
      return url + 'foroom_marker.svg'
    }
  }

  balloonContent(shop: Shop): string {
    return `<div class="row balloon">
              <div class="col-8 balloon__body">
                <p class="shop-type ${(shop.name === 'ИЗБА' && window.location.pathname === '/service-centres') ? 'top-service' : ''}">${this.shopType(shop)}</p>
                <p><span class="d-inline-block">Город:</span> ${shop.city}</p>
                <p><span class="d-inline-block">Адрес:</span> ${shop.address}</p>
                <p><span>Телефон:</span>${this.clearPhone(shop.phones[0])}
                ${shop.phones[1] ? ' <br/>' : ''}
                ${this.clearPhone(shop.phones[1])}</p>
                <p>
                  <span>Время работы:</span>
                  ${this.scheduleRender(shop.schedule_json)}
                </p>
              </div>
              <div class="col-4">
                <div class="balloon__img-container" id="shopImg" data-img="${shop.pic_img}">
                  <img class="balloon__img" src="https://foroom.ru/img/images/map_items/${shop.pic_img}" data-img="${shop.pic_img}" alt="">
                </div>
              </div>
          </div>`
  }

  balloonFooter(shop: Shop): string {
    return shop.site
      ? '<a class="balloon__link" href="' +
          shop.site +
          '" target="_blank">Перейти на сайт</a>'
      : ''
  }

  clearPhone(phone) {
    const clear = (phone) => {
      if (phone) {
        let a = phone.replace(/\D+/g, '')
        if (parseInt(a[0]) === 8) {
          a = 7 + a.slice(1)
        }
        return `+${a[0]} ${a.substring(1, 4)} ${a.substring(
          4,
          7
        )}-${a.substring(7, 9)}-${a.substring(9, 11)}`
      }
      return ''
    }

    if (phone) {
      phone = phone.replace(/\D+/g, '')
      const arr = phone.length > 11 ? phone.match(/.{1,11}/g) : [phone]
      return arr.map((p) => clear(p)).join('<br/>')
    }
    return ''
  }

  showImage() {
    console.log('ok!!!!')
  }

  scheduleRender(sch) {
    let render = ''
    sch.map((row) => {
      if (row.title) {
        render += `${row.title.replace(':', '')}: с ${row.time.from} по ${
          row.time.to
        }<br/>`
        if (row.break && row.break.from && row.break.to) {
          render += ` Перерыв: с ${row.break.from} по ${row.break.to}<br/>`
        }
      }
      if (row.dayOff) {
        render += `Выходной: ${row.dayOff}`
      }
    })
    return render
  }

  async getUserLocation(): Promise<void> {
    const { geoObjects } = await this.yMaps!.geolocation.get({
      provider: 'auto',
      mapStateAutoApply: true
    })
    // console.log(geoObjects.position)

    // navigator.geolocation.getCurrentPosition(
    //   (pos) => {
    //   console.log(pos);
    // },
    //   (err) => {
    //   console.log('err', err);
    // })
    shopsStore.setUserLocation(geoObjects.position)
  }

  clearRoutes() {
    this.mapRoutes.map((route) => {
      this.map!.geoObjects.remove(route)
    })
    shopsStore.clearMapRoutes()
  }

  printRoute(
    userLocation: boolean | number[] = false,
    shopLocation: boolean | number[] = false
  ) {
    if (!userLocation) {
      userLocation = [this.userLocation.lat, this.userLocation.lon]
    }

    if (!shopLocation) {
      shopLocation = this.shop.coords_geo
    }

    const multiRoute = new this.yMaps!.multiRouter.MultiRoute(
      {
        referencePoints: [userLocation, shopLocation],
        params: {
          results: 1
        }
      },
      {
        boundsAutoApply: true
      }
    )

    this.map!.geoObjects.add(multiRoute)
    shopsStore.setMapRoute(multiRoute)
  }

  shopType(shop) {
    if (shop.isWww) {
      return 'Интернет магазин'
    } else if (shop.isComplect) {
      return 'Партнёр по комплектующим ТМ FOROOM'
    } else if (shop.isPartner) {
      return 'Партнёр FOROOM PRO'
    } else {
      return 'Представитель FOROOM'
    }
  }

  get shops(): Shop[] {
    if (this.sc && this.sc.length) {
      return this.sc
    }
    if (shopsStore.shopsGetter) {
      return shopsStore.shopsGetter
    }
    return []
  }
}
</script>

<style lang="scss" scoped>
.map {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;
  background: #d4f2bb;

  border-radius: 4px;

  color: #fff;
  font-weight: 400;

  overflow: hidden;

  ymaps {
    width: 100% !important;
    height: 100% !important;
  }

  
}

/deep/ {
  .shop-type {
    font-weight: 500 !important;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .top-service{
    position: relative;
    display: inline-block;
    &::before{
      content: '';
      position: absolute;
      top: -15px;
      left: calc(100% + 5px);
      width: 50px;
      height: 50px;
      background-image: url('https://www.foroom.ru/img-new/orange_medal.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
   
  }
}


</style>
