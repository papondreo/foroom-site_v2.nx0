<template>
  <div
    v-if="!check"
    class="constructor__check_mobile"
    @click="showCheck()"
  >
    <div class="constructor__check_mobile-wr">
      <div
        :class="{'constructor__check_mobile-blink_release' : blinkCheck}"
        class="constructor__check_mobile-blink"
      ></div>
      <p class="constructor__check_mobile-system">
        <span>Нажмите для просмотра на окне</span>
        {{ system.title }}
      </p>
      <div class="constructor__check_mobile-price">
        <p class="old-price" v-if="prices.oldPrice && !loading">{{ $priceSet(prices.oldPrice) }} ₽</p>
        <p class="price" v-if="!loading" :class="{'red': prices.oldPrice}">{{ $priceSet(prices.price) }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileCheckButton",
  props: {
    systemName: {
      type: String,
      required: true
    }
  },
  computed: {
    blinkCheck () {
      return this.$store.getters['common/blinkCheck']
    },
    check () {
      return this.$store.getters['common/showCheck']
    },
    prices () {
      return this.$store.getters['calcCore/prices']
    },
    loading () {
      return this.$store.getters['common/loading']
    },
    system () {
      return this.$getSystem(this.systemName)
    },
  },
  methods: {
    showCheck() {
      this.$store.dispatch('common/toggleCheck', true)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/sass/utils/vars"
  @import "@/assets/sass/constructor/check"
  .constructor__check_mobile
    position: sticky
    width: 50%
  @media screen and (max-width: $colMd)
    .constructor__check_mobile
      width: 65%

  @media screen and (max-width: $colXs)
    .constructor__check_mobile
      width: 100%
</style>
