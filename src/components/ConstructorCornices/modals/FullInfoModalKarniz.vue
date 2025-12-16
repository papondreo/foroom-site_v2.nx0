<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" :style="{ width: width + 'px' }">
                    <div class="modal-body">
                       <div class="container">
                           <div class="row">
                               <div class="col-4">
                                   <img class="scheme" :src="getImg()" alt="">
                               </div>

                               <div class="col-8 table">

                                   <FullInfoRow
                                       v-for="(step, i) in stepsMap" v-if="step.inCheck"
                                       :key="'row' + i"
                                       :data="step"
                                       :stepNum="i"
                                       :group="1"
                                   />
                                 <div class="row" v-if="dataCornices.NumberOfRows=='2'">
                                   <div class="col-4 aie mb-4">
                                     <div>
                                       <p>Цена первого ряда</p>
                                     </div>
                                   </div>
                                   <div class="col-8 mb-4">
                                     <div v-if="!dataCornices.currentTemplates[0].old_price">
                                       <p class="selected-item bold">{{ $priceSet(dataCornices.currentTemplates[0].price) }} ₽</p>
                                     </div>
                                     <div v-else>
                                       <p style="text-align: right">
                                         <span class="action-sale">ВАША СКИДКА {{calcSale2(dataCornices.currentTemplates[0].old_price,dataCornices.currentTemplates[0].price)}}%</span>
                                         <span class="old-price">{{ $priceSet(dataCornices.currentTemplates[0].old_price) }} ₽</span>
                                         <span class="red"> {{ $priceSet(dataCornices.currentTemplates[0].price) }} ₽</span>
                                       </p>
                                     </div>
                                   </div>
                                 </div>
                                   <template v-if="dataCornices.NumberOfRows=='2'">
                                       <FullInfoRow
                                           v-for="(step, i) in stepsMap" v-if="step.inCheck"
                                           :key="'rows' + i"
                                           :data="step"
                                           :stepNum="i"
                                           :group="2"
                                       />
                                   </template>
                                 <div class="row" v-if="dataCornices.NumberOfRows=='2'">
                                   <div class="col-4 aie mb-4">
                                     <div>
                                       <p>Цена второго ряда</p>
                                     </div>
                                   </div>
                                   <div class="col-8 mb-4">
                                     <div v-if="!dataCornices.currentTemplates[1].old_price">
                                       <p class="selected-item bold">{{ $priceSet(dataCornices.currentTemplates[1].price) }} ₽</p>
                                     </div>
                                     <div v-else>
                                       <p style="text-align: right">
                                         <span class="action-sale">ВАША СКИДКА {{calcSale2(dataCornices.currentTemplates[1].old_price,dataCornices.currentTemplates[1].price)}}%</span>
                                         <span class="old-price">{{ $priceSet(dataCornices.currentTemplates[1].old_price) }} ₽</span>
                                         <span class="red"> {{ $priceSet(dataCornices.currentTemplates[1].price) }} ₽</span>
                                       </p>
                                     </div>
                                   </div>
                                 </div>
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
                                           <p class="action-sale">ВАША СКИДКА {{calcSale2(prices.oldPrice,prices.price)}}%</p>
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
        name: 'FullInfoModalKarniz',
        components: {
            FullInfoRow: () => import('../../../components/ConstructorCornices/FullInfoRowKarniz'),
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
          calcSale2: function (a,b){
            if (a>b) {
              return Math.round(100-100*b/a);
            } else {
              return Math.round(100-100*a/b);
            }
          },
            getImg(){
                if(this.template.ArchType && this.template.ArchType != 1){
                    if(this.template.ArchType == 4){
                        if(this.template.AnglesCount && this.template.AnglesCount == 2){
                            return '/_images/constructor/Sizes/karniz-size2.jpg'
                        }else{
                            return '/_images/constructor/Sizes/karniz-size1.jpg'
                        }
                    }else{
                        return '/_images/constructor/Sizes/karniz-karniz2.png'
                    }
                }else{
                    return '/_images/constructor/Sizes/karniz-size.jpg'
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
            stepsMap: function () {
                return this.$store.getters['calcSteps/stepsMap'][this.system.name]
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

<style lang="sass">
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/more-modal"
</style>

