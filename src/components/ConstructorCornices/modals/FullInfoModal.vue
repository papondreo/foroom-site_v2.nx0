<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" :style="{ width: width + 'px' }">
                    <div class="modal-body">
                       <div class="container">
                           <div class="row">
                               <div class="col-4">
                                   <img class="scheme" :src="'https://media.foroom.ru/images/sxems/' + system.name + 'A.jpg'" alt="">
                                   <img class="scheme" :src="'https://media.foroom.ru/images/sxems/' + system.name + 'B.jpg'" alt="">
                               </div>

                               <div class="col-8 table">

                                   <FullInfoRow
                                       v-for="(step, i) in stepsMap" v-if="step.inCheck"
                                       :key="'row' + i"
                                       :data="step"
                                       :stepNum="i"
                                   />

                                   <div class="row">
                                       <div class="col-7 aie mb-4">
                                           <div>
                                               <p class="bold mb-1">Цена:</p>
                                               <p class="min">за {{sizes.length}} {{$declOfNum(sizes.length,  ['изделие', 'изделия', 'изделий'])}}, без доп.услуг (замер, доставка, монтаж)</p>
                                           </div>
                                       </div>

                                       <div v-if="!prices.oldPrice" class="col-5">
                                           <p class="selected-item bold">{{ $priceSet(prices.price) }} ₽</p>
                                       </div>
                                       <div v-else class="col-5 mb-4">
                                           <p class="old-price">{{ $priceSet(prices.oldPrice) }} ₽</p>
                                           <p class="red">{{ $priceSet(prices.price) }} ₽</p>
                                           <p class="action-sale">ВАША СКИДКА {{calcSale()}}%</p>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="$emit('close')" class="button modal-button">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'FullInfoModal',
        components: {
            FullInfoRow: () => import('../../../components/ConstructorCornices/FullInfoRow'),
        },
        props: [
            'width',
            'systemName'
        ],
        methods: {
            calcSale: function () {
                const old_price = this.template.old_price
                const price = this.template.price

                if (old_price>price) {
                    return Math.round(100-100*price/old_price);
                } else {
                    return Math.round(100-100*old_price/price);
                }
            },
        },
        computed: {
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            stepsMap: function () {
                return this.$store.getters['calcSteps/stepsMap'][this.system.name]
            },
            prices: function () {
                return this.$store.getters['calcCore/prices']
            },
            sizes: function () {
                return this.$store.getters['calcCore/sizes']
            }
        }
    }
</script>

<style lang="sass">
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/more-modal"
</style>

