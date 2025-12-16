<template>
  <div>
<!--    <div-->
<!--      v-if="!userLocation && location"-->
<!--      class="nearest-shop"-->
<!--    >-->
<!--      <p-->
<!--        class="city"-->
<!--        @click="setLocation(true)"-->
<!--      >-->
<!--        <i class="fa fa-map-marker blink"></i>-->
<!--        Показать ближайший магазин-->
<!--      </p>-->
<!--    </div>-->

    <shops-map
      v-if="locationConfirmed"
      ref="shopsMap"
      class="d-none"
      uniqId="nearest-shop-map"
    />

    <div
      class="nearest-shop"
      v-if="userLocation"
      @mouseenter="showMap"
    >
      <div class="nearest-shop-block overflow-hidden">
        <p class="nearest-shop-description">ближайший к Вам магазин</p>
        <p class="nearest-shop-title">
          {{ shop.name }}
        </p>
      </div>
      <div class="nearest-shop-block">
        <p class="nearest-shop-description nearest-shop-description-phone">
          заказать звонок
        </p>
        <p
          class="nearest-shop-phone"
          @click="showCallbackModal"
        >
          {{ shop.phones[0] }}
        </p>
      </div>
      <div class="nearest-shop__details">
        <p class="nearest-shop__address">
          г. {{ shop.city }}, {{ shop.address }}
        </p>

        <shop-schedule :schedule="shop.schedule_json" />
        <nuxt-link to="/sale-points" class="tar link">Все магазины</nuxt-link>
      </div>
    </div>

    <div
      class="confirm-modal"
      v-if="showConfirmModal"
    >
      <p>Ваш город {{ location.city }}?</p>
      <div class="buttons">
        <button @click="setLocation(false)">Нет</button>
        <button class="confirm" @click="setLocation(true)">Да</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'

import ShopSchedule from '@/components/common/Shops/ShopSchedule.vue'
import ShopsMap from '@/components/common/Shops/ShopsMap.vue'
import { shopsStore, siteComponentStatesStore } from '@/store'
// import regions from '@/assets/js/regions'
import config from '@/config'
import { getDistance } from 'geolib'
@Component({
  components: {
    ShopSchedule,
    ShopsMap
  }
})
export default class NearestShop extends Vue {
  @Getter('shops/shopsGetter') shops: any
  map: boolean = false
  show: boolean = false
  location: any = null
  locationConfirmed: boolean = false
  showConfirmModal: boolean = false

  async mounted() {
    // console.log('ref', this.$refs.shopsMap)
    // const { data } = await this.$axios.get(`${config.api.url}api/user-location`)

    // console.log(data);

    let data = {
city
: 
"Cherepovets",
country
: 
"Russia",
countryCode
: 
"RU",
isp
: 
"PJSC \"Vimpelcom\"",
lat
: 
59.1264,
lon
: 
37.9012,
org
: 
"Beeline Broadband",
query
: 
"128.74.188.223",
region
: 
"VLG",
regionName
: 
"Vologda Oblast",
status
: 
"success",
timezone
: 
"Europe/Moscow",
zip
: 
"162600"}
    

    const res = await this.$axios.get('/regions.json')
    const regions = res.data

    // shopsStore.setUserLocation([data.lat, data.lon])
    const sortedRegions = regions
      .map((region) => ({
        ...region,
        distance: getDistance(
          {
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon)
          },
          {
            latitude: parseFloat(region.latitude),
            longitude: parseFloat(region.longitude)
          }
        )
      }))
      .sort((a, b) => (a.distance < b.distance ? -1 : 1))

    this.location = sortedRegions[0]

    this.setLocation(true)
  }

  setLocation(flag) {
    if (flag) {
      shopsStore.setUserLocation([
        this.location.latitude,
        this.location.longitude
      ])
    }
    this.locationConfirmed = true
    this.showConfirmModal = false
  }
  showMap() {
    if (!this.map) {
      this.map = true
    }
  }

  showCallbackModal() {
    if (window.innerWidth < 768) {
      this.$router.push('/sale-points')
    } else {
      siteComponentStatesStore.setCallbackModal('callBack')

      this.$saleForoomCounter('openOneClick')
      this.$yandexMetrika.reachGoal('NF_openCallbackForm')
    }
  }

  get shop() {
    return this.shops[0]
  }

  get userLocation() {
    return shopsStore.userLocationGetter
  }
}
</script>

<style lang="scss" scoped>
.nearest-shop {
  display: flex;
  justify-content: flex-end;
  position: relative;

  z-index: 1;

  .city {
    font-weight: 300;
    cursor: pointer;
    color: $brand-orange-light;
    i {
      margin-right: 5px;
    }
  }
  &-block {
    &.overflow-hidden {
      width: 100%;
      overflow: hidden;
    }
    margin-left: 32px;
    &:first-of-type {
      margin-left: 0;
    }
  }
  &-description {
    font-size: 13px;
    color: #b6b4b1;
    text-align: right;

    //display: none;
    &-phone {
      padding: 0 12px;
      margin-right: -12px;

      transition: 0.3s ease-in-out;
    }
  }
  &-title {
    font-size: 16px;
    text-align: right;
    color: #3b3a49;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;

    span {
      font-weight: 300;
      font-size: 14px;
      color: #757373;
    }
  }

  &:hover .nearest-shop__details {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }

  &-phone {
    padding: 0 12px;
    margin-right: -12px;

    font-size: 16px;
    text-align: right;
    color: $brand-orange-light;
    font-weight: 500;
    white-space: nowrap;

    cursor: pointer;

    transition: 0.3s ease-in-out;
  }

  &:hover {
    .nearest-shop-phone {
      color: #ffffff;
      background-color: $brand-orange-light;
      border-radius: 0 0 0 4px;

      animation-delay: 400ms;
    }

    .nearest-shop-description-phone {
      color: #ffffff;
      background-color: $brand-orange-light;
      border-radius: 0 4px 0 0;

      animation-delay: 400ms;
    }
  }

  &__details {
    position: absolute;
    top: -1px;
    right: -12px;
    width: 100%;
    max-width: 450px;

    padding: 56px 12px 12px;

    border: 1px solid rgba(219, 215, 215, 0.4);
    border-radius: 8px;
    background: #ffffff;

    box-shadow: 0 4px 20px rgba(219, 215, 215, 0.5);

    transform: scale(0);
    transform-origin: 50% 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s ease-in-out;

    z-index: -1;
  }

  &__address {
    margin-bottom: 8px;

    font-weight: 300;
    text-align: right;
  }
}
.confirm-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  height: min-content;
  border-radius: 12px;
  background: #fff;
  margin: auto;
  padding: 12px;
  text-align: center;
  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);

  p {
    font-size: 18px;
    font-weight: 400;
  }

  .buttons {
    justify-content: space-between;

    button {
      font-size: 20px;
      padding: 8px 30px;
      border-radius: 8px;
      background: #eee;
      margin: 10px;

      &.confirm {
        background: #f9a134;
        color: #fff;
      }
    }
  }
}
.link {
  color: #df771c;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
}
.blink {
  animation: flicker 3s infinite; /* Параметры анимации */
}
@keyframes flicker {
  from { opacity: 1; /* Непрозрачный текст */ }
  to { opacity: 0; /* Прозрачный текст */ }
}
</style>
