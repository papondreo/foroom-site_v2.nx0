<template>
    <div class="col-12">
        <div class="row">
            <template v-if="template.type !== 'karniz'">
                <header class="constructor-header col-12">
                    <p class="constructor-header__title">Схема системы <span>{{system.title}}</span> <button @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button></p>

                    <transition name="slide">
                        <div v-if="showText">
                            <p class="mb-3">
                                Ознакомьтесь со схемой полученной конструкции и подтвердите параметры Вашего изделия.<br/>
                                Обращаем внимание, данные вашего предварительного заказа не являются публичной офертой.
                            </p>
                        </div>
                    </transition>
                </header>

                <template v-if="system.name === 'introma1'">
                  <div class="col-6">
                    <img class="scheme" :src="`${publicPath}introma-main.jpg`" alt="">
                  </div>

                  <div class="col-6">
                    <img class="scheme" :src="`${publicPath}introma-mt${template.MountType}.jpg`" alt="">
                  </div>
                </template>

                <template v-else-if="system.name === 'plisse1' && parseInt(template.MountType) === 4">
                  <div class="col-6">
                    <img class="scheme" src="/_images/constructor/MountType/plisse_mansard_a.jpg" alt="">
                  </div>

                  <div class="col-6">
                    <img class="scheme" src="/_images/constructor/MountType/plisse_mansard_b.jpg" alt="">
                  </div>
                </template>

                <template v-else>
                  <div class="col-6">
                    <img class="scheme" :src="'https://media.foroom.ru/images/sxems/' + system.name + 'A.jpg'" alt="">
                  </div>

                  <div class="col-6">
                    <img class="scheme" :src="'https://media.foroom.ru/images/sxems/' + system.name + 'B.jpg'" alt="">
                  </div>
                </template>
            </template>

            <div class="col-12 mt-4">
                <p class="constructor-header__title">Параметры Вашего изделия</p>
                <div class="table">
                    <template v-if="template.type !== 'karniz'">
                        <FullInfoRow
                            v-for="(step, i) in stepsMap" v-if="step.inCheck"
                            :key="'row' + i"
                            :data="step"
                            :stepNum="i"
                        />
                    </template>

                    <template v-else>
                        <FullInfoRowKarniz
                            v-for="(step, i) in stepsMap" v-if="step.inCheck"
                            :key="'row' + i"
                            :data="step"
                            :stepNum="i"
                            :group = 1
                        />
                        <template v-if="dataCornices.NumberOfRows=='2'">
                            <FullInfoRowKarniz
                                v-for="(step, i) in stepsMap" v-if="step.inCheck && step.tooltip!=='Форма карниза'"
                                :key="'row' + i + 'gr2'"
                                :data="step"
                                :stepNum="i"
                                :group = 2
                            />
                        </template>
                    </template>


                    <div class="row">
                        <div class="col-6 mb-4 aie">
                            <div>
                                <p class="bold">Цена:</p>
                                <p class="min">за {{sizes.length}} {{$declOfNum(sizes.length,  ['изделие', 'изделия', 'изделий'])}}, без доп.услуг (замер, доставка, монтаж)</p>
                            </div>
                        </div>

                        <div v-if="!prices.oldPrice" class="col-6">
                            <p class="selected-item bold">{{ $priceSet(prices.price) }} ₽</p>
                        </div>

                        <div v-if="prices.oldPrice" class="col-6 mb-4">
                            <p class="old-price">{{ $priceSet(prices.oldPrice) }} ₽</p>
                            <p class="red">{{ $priceSet(prices.price) }} ₽</p>
                            <p class="action-sale">ВАША СКИДКА {{calcSale()}}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SystemInfo',
        components: {
            FullInfoRow: () => import('../../../components/ConstructorCornices/FullInfoRow'),
            FullInfoRowKarniz: () => import('../../../components/ConstructorCornices/FullInfoRowKarniz'),
        },
        props: [
            'systemName',
            'data'
        ],
        data: function () {
            return {
                publicPath: `/_images/constructor/Schemes/`,
                count: 1,
                showText: false
            }
        },

        created() {
            console.log('Пропсы systemName:', this.systemName)
            console.log('Пропсы data:', this.data)
        },
        methods: {
            calcSale: function () {
                const old_price = this.prices.oldPrice
                const price = this.prices.price

                if (old_price>price) {
                    return Math.round(100-100*price/old_price);
                } else {
                    return Math.round(100-100*old_price/price);
                }
            },
        },
        computed: {
            template: function () {
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', this.$store.getters['calcCore/template'])
                return this.$store.getters['calcCore/template']
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            stepsMap: function () {
                let obj = this.$store.getters['calcSteps/stepsMap'][this.system.productId]
                // console.log(obj)
                return obj
            },
            prices: function () {
                return this.$store.getters['calcCore/prices']
            },
            sizes: function () {
                return this.$store.getters['calcCore/sizes']
            },
            dataCornices () {
                return this.$store.getters['calcCornices/data']
            }
        }
    }
</script>

<style lang="sass" scoped>
    /deep/
        @import "@/assets/sass/utils/vars"
        @import "@/assets/sass/constructor/scheme-system-step"
</style>
