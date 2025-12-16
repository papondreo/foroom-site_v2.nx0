<template>
  <div v-show="show">
    <div
      class="nearest-shop-modal"
      v-if="shop"
    >
      <button
        class="close"
        @click="show = false"
      >
        x
      </button>
      <p class="shop-distance">
        Ближайший магазин представителя в {{ filterDistance(shop.distance) }} от
        Вас
      </p>

      <p class="shop-name">{{ shop.name }}</p>
      <p class="shop-contacts">
        <span>Адрес:</span>
        {{ shop.city }}, {{ shop.address }}
      </p>
      <div class="shop-contacts">
        <span>Время работы:</span>
        <div
          :key="`r${i}`"
          v-for="(row, i) in shop.schedule_json"
        >
          <template v-if="row.title">
            {{ row.title.replace(':', '') }}: с
            <template v-if="row.time">
              {{ row.time.from }}
            </template>
            по
            <template v-if="row.time">
              {{ row.time.to }}
            </template>

            <div
              style="margin-left: 10px"
              v-if="row.break.from && row.break.to"
            >
              Перерыв:
              <template v-if="row.break">
                {{ row.break.from }}
              </template>
              по
              <template v-if="row.break">
                {{ row.break.to }}
              </template>
            </div>
            <br />
          </template>
          <template v-if="row.dayOff"> Выходной: {{ row.dayOff }} </template>
        </div>
      </div>

      <div class="buttons">
        <button
          @click="showCallbackModal()"
          class="button button-outline"
        >
          Заказать звонок
        </button>
        <nuxt-link
          to="/buy"
          @click.native="show = false"
          class="button button-main"
        >
          Заказать ONLINE
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { siteComponentStatesStore } from '@/store'

@Component
export default class NearestShop extends Vue {
  @Getter('shops/shopsGetter') shops: any
  show = false
  timeBeforeOpen = 20000 // min 5000
  disabledUrls = [
    '/buy',
    '/buy/shtory-plisse',
    '/buy/rulonnye-shtory',
    '/buy/rulonnye-shtory-duo',
    '/buy/vertikalnye-zhalyuzi',
    '/buy/gorizontalnye-zhalyuzi',
    '/buy/gorizontalnye-derevyannie-zhalyuzi',
    '/buy/rimskie-shtory',
    '/order',
    '/gdekupit',
    '/sale-points',
    '/actions',
    '/partneram-foroom'
  ]

  created() {
    this.showModal()
  }

  filterDistance(distance) {
    return distance >= 1000
      ? Math.round(distance / 1000) + ' км'
      : distance + ' м'
  }

  showModal() {
    setTimeout(() => {
      if (!this.disabledUrls.includes(this.$route.path)) {
        this.show = true
      } else {
        const checkUrl = setInterval(() => {
          if (!this.disabledUrls.includes(this.$route.path)) {
            this.show = true
            clearInterval(checkUrl)
          }
        }, 3000)
      }
    }, this.timeBeforeOpen)
  }
  showCallbackModal() {
    siteComponentStatesStore.setCallbackModal('callBack')

    this.$saleForoomCounter('openOneClick')
    this.$yandexMetrika.reachGoal('NF_openCallbackForm')

    this.show = false
  }
  get shop() {
    return this.shops[0]
  }
}
</script>

<style lang="sass" scoped>
.nearest-shop-modal
  position: fixed
  bottom: 35px
  left: 35px
  width: 370px
  padding: 10px 15px 15px
  color: #fff
  border-radius: 15px
  background: #f9a134
  box-shadow: 0 7px 26px 0 rgba(0, 0, 0, 0.3)
  z-index: 999

  p
    color: #fff

.shop
  &-distance
    font-size: 14px

  &-name
    margin-bottom: 10px
    font-size: 22px
    font-family: $boldFont

  &-contacts
    margin-bottom: 10px

    span
      display: block
      font-family: $boldFont
      font-size: 16px

.close
  color: #fff
  position: absolute
  right: 7px
  top: -2px
  font-size: 20px

.buttons
  display: flex
  justify-content: center
  margin-top: 20px

.button
  display: flex
  align-items: center
  padding: 5px 8px 4px
  margin-right: 15px
  border-radius: 8px
  text-align: center
  text-transform: uppercase
  font-family: $boldFont
  font-size: 15px

  &:last-child
    margin-right: 0

  &-main
    background: #fff
    color: #f9a134

  &-outline
    background: #f9a134
    color: #fff
    border: 2px solid #fff

@media only screen and (max-width: 480px)
  .shop-distance
    padding-right: 10px
  .nearest-shop-modal
    left: 15px
    width: 270px
    .buttons
      flex-direction: column
      button
        margin-bottom: 10px
      .button
        justify-content: center
        text-align: center
        width: 100%
</style>
