<template>
  <div class="row cursor-pointer" @click="openCallbackModal">
    <div class="col-12 d-none d-sm-block">
      <div class="callme-container">
        <ui-img
          src="/img-new/callback-promo-block/callme.png"
          alt="заказать обратный звонок"
          title="получить консультацию по солнцезащитным системам FOROOM"

        />
      </div>
    </div>
    <div class="col-12 d-sm-none">
      <div class="system-banner">
        <div class="row">
          <div class="col-sm-8 col-xl-9 system-banner__background">
            <p>
              необходима консультация?<br />
              мы вам перезвоним!
            </p>
          </div>
          <div class="col-sm-4 col-xl-3 system-banner__button-container">
            <button>ОСТАВИТЬ ЗАЯВКУ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { siteComponentStatesStore } from "@/utils/store-accessor";

@Component
export default class CallbackPromoBlock extends Vue {
  openCallbackModal() {
    siteComponentStatesStore.setCallbackModal('callBack')

    this.$saleForoomCounter('openOneClick')
    this.$yandexMetrika.reachGoal('NF_openCallbackForm')
  }
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
