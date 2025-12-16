<template>
  <div class="constructor__check">
    <button
      class="hide-check hamburger hamburger--arrowalt-r is-active"
      v-if="check"
      @click="hideCheck()"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

    <CheckRowKarniz
      v-for="(step, i) in stepsMap"
      v-if="step.inCheck"
      :key="'row' + i"
      :data="step"
      :systemTitle="system.name"
      :stepNum="i"
      :group="1"
    />

    <div class="row">
      <div
        class="col-lg-12"
        v-if="step < stepsMap.filter((s) => s.inPaginator).length"
      >
        <button
          @click="$emit('open')"
          :disabled="loading"
          class="underline more-link"
        >
          <i
            class="fa fa-info-circle"
            aria-hidden="true"
          ></i>
          Подробнее о Вашей системе
        </button>
      </div>
      <div class="col-lg-4">
        <p
          v-tooltip.left="{
            content: `за ${sizes.length} ${$declOfNum(sizes.length, [
              'изделие',
              'изделия',
              'изделий'
            ])}, без доп. услуг (замер, доставка, монтаж)`,
            class: 'price-tooltip'
          }"
          class="underline more-link more-link__price"
          @click="open_price()"
        >
          <i
            class="fa fa-info-circle"
            aria-hidden="true"
          ></i>
          Цена
          <span v-if="dataCornices.NumberOfRows == 2"
            ><i
              @click="open_price()"
              data-v-5b2ebeec=""
              class="fa"
              :class="{
                'fa-angle-down': hidden_price,
                'fa-angle-up': !hidden_price
              }"
            ></i
          ></span>
        </p>
      </div>
      <div class="col-lg-8 pl-0 right">
        <div class="price">
          <p
            class="old-price"
            v-if="prices.oldPrice && !loading"
          >
            {{ $priceSet(prices.oldPrice) }} ₽
          </p>
          <p
            v-if="!loading"
            :class="{ red: prices.oldPrice }"
          >
            {{ $priceSet(prices.price) }} ₽
          </p>
          <Loader v-if="loading" />
        </div>
      </div>
      <template v-if="dataCornices.NumberOfRows == 2 && hidden_price">
        <div class="col-lg-4">
          <p>первый ряд</p>
        </div>
        <div class="col-lg-8 pl-0 right">
          <div class="price">
            <p
              class="discount"
              v-if="actionInfo[0]"
            >
              - {{ calcSale2(prices.oldPrice1, prices.price1) }} %&nbsp; &nbsp;
            </p>
            <p
              class="old-price"
              v-if="prices.oldPrice1 && !loading"
            >
              {{ $priceSet(prices.oldPrice1) }} ₽
            </p>
            <p
              v-if="!loading"
              :class="{ red: prices.oldPrice1 }"
            >
              {{ $priceSet(prices.price1) }} ₽
            </p>
            <Loader v-if="loading" />
          </div>
        </div>
        <div
          class="col-lg-4"
          v-if="dataCornices.NumberOfRows == 2"
        >
          <p>второй ряд</p>
        </div>
        <div class="col-lg-8 pl-0 right">
          <div class="price">
            <p
              class="discount"
              v-if="actionInfo[1]"
            >
              - {{ calcSale2(prices.oldPrice2, prices.price2) }} %&nbsp; &nbsp;
            </p>
            <p
              class="old-price"
              v-if="prices.oldPrice2 && !loading"
            >
              {{ $priceSet(prices.oldPrice2) }} ₽
            </p>
            <p
              v-if="!loading"
              :class="{ red: prices.oldPrice2 }"
            >
              {{ $priceSet(prices.price2) }} ₽
            </p>
            <Loader v-if="loading" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Tooltip from 'vue-directive-tooltip'
import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css'
import Vue from 'vue'

export default {
  name: 'CheckKarniz',
  components: {
    Loader: () => import('../../../components/ConstructorCornices/Loader'),
    CheckRowKarniz: () =>
      import('../../../components/ConstructorCornices/check/CheckRowKarniz')
  },
  props: ['systemName'],
  data: function () {
    return {
      hidden_price: false
    }
  },
  created() {
    Vue.use(Tooltip, {
      delay: 300,
      placement: 'left',
      class: 'tooltip-red',
      triggers: ['hover'],
      offset: 0
    })
    console.log("systemName in created:", this.systemName); 
  },
  methods: {
    showCheck: function () {
      this.$store.dispatch('common/toggleCheck', true)
    },
    hideCheck: function () {
      this.$store.dispatch('common/toggleCheck', false)
    },
    calcSale: function () {
      const old_price = this.template.old_price
      const price = this.template.price

      if (old_price > price) {
        return Math.round(100 - (100 * price) / old_price)
      } else {
        return Math.round(100 - (100 * old_price) / price)
      }
    },
    calcSale2: function (a, b) {
      if (a > b) {
        return Math.round(100 - (100 * b) / a)
      } else {
        return Math.round(100 - (100 * a) / b)
      }
    },
    open_price: function () {
      this.hidden_price = !this.hidden_price
    }
  },

  computed: {
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    system: function () {
  console.log("Передан systemName:", this.systemName);
  const systemData = this.$getSystem(this.systemName);
  console.log("Полученные данные system:", systemData);
  
  if (!systemData) {
    console.error("❌ Ошибка: systemData не найден!");
  } else if (!systemData.name) {
    console.error("⚠️ Внимание: systemData.name отсутствует!", systemData);
  }

  return systemData;
}

    ,
    step: function () {
      return this.$store.getters['calcSteps/step']
    },
    check: function () {
      // console.log(this.$store.getters.params.oParams);
      // console.log(this.$store.getters.templateRus);
      return this.$store.getters['common/showCheck']
    },
    stepsMap: function () {
    return this.$store.getters['calcSteps/stepsMap'][this.system.productId];
    },
    loading: function () {
      return this.$store.getters['common/loading']
    },
    blinkCheck: function () {
      return this.$store.getters['common/blinkCheck']
    },
    prices: function () {
      const price = this.$store.getters['calcCore/prices']
      if (this.dataCornices.NumberOfRows == 2) {
        price.oldPrice1 = price.oldPrice
        price.price1 = price.price
        price.oldPrice2 = parseFloat(this.dataCornices.oldPrice)
        price.price2 = parseFloat(this.dataCornices.price)
        const megaUltraSuperOldPrise =
          parseFloat(price.oldPrice ? price.oldPrice : price.price) -
          -parseFloat(price.oldPrice2 ? price.oldPrice2 : price.price2)
        price.oldPrice =
          price.oldPrice || price.oldPrice2
            ? megaUltraSuperOldPrise
            : price.oldPrice
        price.price += parseFloat(this.dataCornices.price)
      }
      return price
    },
    sizes: function () {
      return this.$store.getters['calcCore/sizes']
    },
    dataCornices() {
      return this.$store.getters['calcCornices/data']
    },
    actionInfo: function () {
      const arr = [false, false]
      if (
        this.$store.getters['calcCore/params'].oParams &&
        this.$store.getters['calcCore/params'].oParams.material
          .isCurrentAction &&
        Object.keys(
          this.$store.getters['calcCore/params'].oParams.material
            .currentActionInfo
        ).length
      ) {
        arr[0] =
          this.$store.getters[
            'calcCore/params'
          ].oParams.material.currentActionInfo
      }
      if (
        this.dataCornices.NumberOfRows == 2 &&
        this.dataCornices.currentActionInfo
      ) {
        arr[1] = this.dataCornices.currentActionInfo
      }
      return arr
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"
@import "@/assets/sass/constructor/check"
</style>
