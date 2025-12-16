<template>
  <div class="promo" v-if="action && action.length">
    <div
      class="bg1"
      :style="`background: #de1000`"
    ></div>
    <div
      class="bg2"
      :style="`background: #de1000`"
    ></div>
    <div
      class="bg3"
      :style="`background: #de1000`"
    ></div>

    <p
      class="action-name"
      :style="`color: #ffffff`"
    >
      Акция «{{ action[0].actionName }}»
    </p>
    <p
      v-if="sale.min && sale.max"
      class="action-percs"
      :style="`color: #ffffff`"
    >
      Скидки от {{ sale.min }} до {{ sale.max }}%
    </p>
    <!--    <p-->
    <!--      class="action-main-text"-->
    <!--      :style="`color: ${action[0].actionColors.txt}`"-->
    <!--    >-->
    <!--      Спешите!!!<br />-->
    <!--      До конца предложения месяца<br />-->
    <!--      осталось 15 дней-->
    <!--    </p>-->
    <p
      class="action-period"
      :style="`color: ${action[0].actionColors.txt}`"
    >
      Действует с {{ getDate(action[0].actionStart) }} до
      {{ getDate(action[0].actionEnd) }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ActionPromo extends Vue {
  @Prop()
  readonly action

  public sale = {
    min: 0,
    max: 0
  }

  created() {
    this.sale = {
      min: this.action[0]?.actionPerc,
      max: this.action[0]?.actionPerc
    }

    for (let i = 1; i < this.action.length; ++i) {
      if (this.action[i]?.actionPerc > this.sale.max) this.sale.max = this.action[i].actionPerc;
      if (this.action[i]?.actionPerc < this.sale.min) this.sale.min = this.action[i].actionPerc;
    }
  }

  getDate(dateString) {
    const dateObj = new Date(dateString)
    let date, month

    date = dateObj.getDate()
    month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()

    date = date.toString().padStart(2, '0')

    month = month.toString().padStart(2, '0')

    return `${date}.${month}.${year}`
  }
}
</script>

<style lang="scss" scoped>
.promo {
  position: relative;
  //display: flex;
  //justify-content: center;
  //align-items: center;

  height: 300px;
  margin-bottom: 24px;

  background: #f5f5f8;
  border-radius: 8px;

  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
  overflow: hidden;

  .bg1 {
    position: absolute;
    left: -100px;
    right: -100px;
    top: -50px;
    height: 200px;
    width: auto;
    opacity: 0.6;

    transform: rotate(-7deg);
  }

  .bg2 {
    position: absolute;
    left: -100px;
    right: -1233px;
    top: -50px;
    height: 300px;
    width: auto;
    opacity: 0.8;
    transform: rotate(150deg);
  }

  .bg3 {
    position: absolute;
    left: -1287px;
    right: -45px;
    top: -171px;
    height: 300px;
    width: auto;
    opacity: 0.5;
    transform: rotate(-16deg);
  }

  p {
    position: relative;
    z-index: 1;

    &.action-period {
      position: absolute;
      bottom: 4px;
      right: 8px;

      font-size: 13px;
    }

    &.action-main-text {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      text-align: center;
      line-height: 1.2;
      font-size: 28px;
      font-weight: 600;
      justify-content: center;
      display: flex;
      align-items: center;
    }

    &.action-name {
      position: absolute;
      transform: rotate(-6deg);
      top: 22px;
      left: 25px;
      font-weight: 400;
      font-size: 22px;
    }

    &.action-percs {
      position: absolute;
      transform: rotate(-11deg);
      top: 59px;
      left: 63px;
      font-weight: 400;
      font-size: 25px;
    }
  }
}
</style>
