<template>
    <div class="constructor__check">
        <button class="hide-check hamburger hamburger--arrowalt-r is-active" v-if="check" @click="hideCheck()">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>

<!--
        <div v-if="!check" @click="showCheck()" class="constructor__check_mobile">
            <div class="constructor__check_mobile-arrow">
                <i v-if="!check" class="fa fa-angle-up" aria-hidden="true"></i>
                <i v-else class="fa fa-angle-down" aria-hidden="true"></i>
            </div>
            <div class="constructor__check_mobile-wr">
                <div
                    :class="{'constructor__check_mobile-blink_release' : blinkCheck}"
                    class="constructor__check_mobile-blink"
                ></div>
                <p class="constructor__check_mobile-system">
                    {{system.title}}
                </p>
                <div class="constructor__check_mobile-price">
                    <p class="old-price" v-if="prices.oldPrice && !loading">{{ $priceSet(prices.oldPrice) }} ₽</p>
                    <p class="price" v-if="!loading" :class="{'red': prices.oldPrice}">{{ $priceSet(prices.price) }} ₽</p>
                </div>
            </div>
            <button>Визуализация в интерьере</button>
        </div>
-->

<!--
      <div v-if="!check" @click="showCheck()" class="constructor__check_mobile">
        <div class="constructor__check_mobile-wr">
          <div
            :class="{'constructor__check_mobile-blink_release' : blinkCheck}"
            class="constructor__check_mobile-blink"
          ></div>
          <p class="constructor__check_mobile-system">
            <span>Просмотр не окне</span>
            {{system.title}}
          </p>
          <div class="constructor__check_mobile-price">
            <p class="old-price" v-if="prices.oldPrice && !loading">{{ $priceSet(prices.oldPrice) }} ₽</p>
            <p class="price" v-if="!loading" :class="{'red': prices.oldPrice}">{{ $priceSet(prices.price) }} ₽</p>
          </div>
        </div>
      </div>

-->

            <CheckRow
                v-for="(step, i) in stepsMap"
                v-if="step.inCheck"
                :key="'row' + i"
                :data="step"
                :systemTitle="system.name"
                :stepNum="i"
            />


        <div class="row">
            <div class="col-lg-12" v-if="step < stepsMap.filter(s => s.inPaginator).length">
                <button
                    @click="$emit('open')"
                    :disabled="loading"
                    class="underline more-link"
                >
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Подробнее о Вашей системе
                </button>
            </div>
            <div class="col-lg-4">
                <p
                    v-tooltip.left="{
                        content: `за ${sizes.length} ${$declOfNum(sizes.length,  ['изделие', 'изделия', 'изделий'])}, без доп. услуг (замер, доставка, монтаж)`,
                        class: 'price-tooltip'
                    }"
                    class="underline more-link more-link__price"
                >
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Цена
                </p>
            </div>
            <div class="col-lg-8 pl-0 right">
                <div class="price">
                    <p class="old-price" v-if="prices.oldPrice && !loading">{{ $priceSet(prices.oldPrice) }} ₽</p>
                    <p v-if="!loading" :class="{'red': prices.oldPrice}">{{ $priceSet(prices.price) }} ₽</p>
                    <Loader v-if="loading"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tooltip from 'vue-directive-tooltip';
    import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css';
    import Vue from "vue";

    export default {
        name: 'Check',
        components: {
            Loader: () => import('../../../components/ConstructorCornices/Loader'),
            CheckRow: () => import('../../../components/ConstructorCornices/check/CheckRow'),
        },
        props: [
            'systemName'
        ],
        created() {
            Vue.use(Tooltip, {
                delay: 300,
                placement: 'left',
                class: 'tooltip-red',
                triggers: ['hover'],
                offset: 0
            });
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

                if (old_price>price) {
                    return Math.round(100-100*price/old_price);
                } else {
                    return Math.round(100-100*old_price/price);
                }
            }
        },

        computed: {
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            step: function () {
                return this.$store.getters['calcSteps/step']
            },
            check: function () {
                // console.log(this.$store.getters.params.oParams);
                // console.log(this.$store.getters.templateRus);
                return this.$store.getters['common/showCheck']
            },
            stepsMap: function () {
                return this.$store.getters['calcSteps/stepsMap'][this.system.name]
            },
            loading: function () {
                return this.$store.getters['common/loading']
            },
            blinkCheck: function () {
                return this.$store.getters['common/blinkCheck']
            },
            prices: function () {
                return this.$store.getters['calcCore/prices']
            },
            sizes: function () {
                return this.$store.getters['calcCore/sizes']
            },
        }
    }
</script>

<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/check"
</style>
