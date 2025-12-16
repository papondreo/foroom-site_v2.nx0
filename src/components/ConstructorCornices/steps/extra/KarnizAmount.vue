<template>
    <div class="col-12">
        <header class="constructor-header">
            <p class="constructor-header__title">
                Количество рядов
                <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
            </p>
            <transition name="slide">
                <div v-if="showText">
                    <p
                        v-for="(text, i) in data.description"
                        :key="`desc${i}`"
                        class="mb-3"
                    >
                        Выберите предпочтительное количество рядов. Для заказа 3х рядов и сложной формы карнизов обратитесь в ближайший к вам магазин официального Представителя FOROOM
                    </p>
                </div>
            </transition>
        </header>
        <div v-if="template.ArchType == 1 || template.ArchType == 4 || !template.ArchType" class="row step-content hrz-scroll">
            <div
                class="col-md-4 col-6 full-size">
                <RadioButton
                    name="NumberOfRows"
                    :param="{val: '1'}"
                    label="один ряд"
                    :class="true"
                    :imgPath="`${getImg(1)}.jpg`"
                    :selectedValue="calcCornices.NumberOfRows"
                    @input="setAmount('1')"
                />
            </div>

            <div class="col-md-4 col-6 full-size">
                <RadioButton
                    name="NumberOfRows"
                    :param="{val: '2'}"
                    label="два ряда"
                    :imgPath="`${getImg(2)}.jpg`"
                    :selectedValue="calcCornices.NumberOfRows"
                    @input="setAmount('2')"
                />
            </div>
           <!-- <div class="col-md-4 col-6 full-size" @mouseover="glazingBead = true" @mouseleave="glazingBead = false">
                <RadioButton
                    name="NumberOfRows"
                    :param="{val: '3'}"
                    label="три ряда"
                    :imgPath="`${publicPath}3.jpg`"
                    :selectedValue="system.NumberOfRows"
                    :disabled="true"
                    @input="setAmount('3')"
                />
                <div class="col-12 mb-3">
                    <silent-box
                        class="link system-scheme__link d-block d-md-none"
                        :thumbnail="false"
                        :image="{ src: `${publicPath}3.jpg`}"
                    >Для заказа 3х рядов и сложной формы карнизов (угла, лекала), обратитесь в ближайший к вам магазин официального Представителя FOROOM</silent-box>
                </div>
            </div>-->

       <!--     <div class="col-12">
                <div v-if="glazingBead" class="attention">
                    <p class="position-relative">
                        Для заказа 3х рядов и сложной формы карнизов (угла, лекала), обратитесь в ближайший к вам магазин официального Представителя FOROOM
                    </p>
                    <i class="fa fa-info-circle ml-1 toRightDo"></i>
                </div>
            </div>-->

        </div>
    </div>
</template>

<script>
    export default {
        name: "KarnizAmount",
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        props: [
            'systemName',
            'data'
        ],

        data: function () {
            return {
                publicPath: `/_images/constructor/cornices/ofRows-`,
                showText: false,
                glazingBead: false
            }
        },

        methods: {
            setAmount: function (type) {
                if(!this.calcCornices.selectParamUser.includes('NumberOfRows')) this.calcCornices.selectParamUser.push('NumberOfRows')
                this.template.NumberOfRows = type
                this.system.NumberOfRows = type
                this.calcCornices.NumberOfRows = type
                if(type == 2){
                    if(this.template.Segment2) {
                        this.template.Segment2 = parseFloat(this.calcCornices.currentTemplates[1].width) - - 30
                    }
                }else{
                    if(this.template.Segment2){
                        this.template.Segment2 = 550
                    }
                }
                this.calcCornices.currentTemplates[0] = JSON.parse(JSON.stringify(this.template))
                    let templates = this.calcCornices.currentTemplates[1]
                    if(templates.ArchType)templates.ArchType = 1
                    this.$store.dispatch('calcCore/setSizes', [{width: templates.width/10}]).then(()=>{
                    this.$store.dispatch('calcCore/calculate', templates).then(res => {
                        this.calcCornices.templateRus = res.item_rus
                      this.calcCornices.oldPrice = res.item.old_price
                      this.calcCornices.price = res.item.price
                      this.calcCornices.currentActionInfo = res.params.material.currentActionInfo;
                        this.calcCornices.currentTemplates[1] = res.item
                        if(templates.AnglesCount)this.system.AnglesCount = this.template.AnglesCount
                        let baseTemplate = this.calcCornices.currentTemplates[0]
                        this.$store.dispatch('calcCore/calculate', baseTemplate).then(res => {
                            this.calcCornices.currentTemplates[0] = res.item
                        })
                    })
                })

            },
            getImg(val){
                if(val == 1){
                    return '/_images/constructor/cornices/ofRows-'+val+'-'+this.system.ArchType+'-'+this.template.subtype
                }else{
                    return '/_images/constructor/cornices/ofRows-'+val+'-'+this.system.ArchType+'-'+this.template.subtype+'-'+this.calcCornices.currentTemplates[1].subtype
                }
            }
        },

        computed: {
            templates: function () {
                return this.$store.getters['calcCore/templates']
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            systems: function () {
                return this.$store.getters['calcLibs/systems'][this.systemName]
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            calcCornices () {
                return this.$store.getters['calcCornices/data']
            },
            // option () {
            //     return this.$getParams('amount')
            // }
        }
    }
</script>

<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/sizes-step"

    .position-relative
        position: relative
    .shtapik
        position: absolute
        width: 250px
        top: -225px
        right: 30px
        border-radius: 50%
        border: 3px solid #f5f5f5
        box-shadow: -7px 6px 16px 0px rgba(217,217,217,1)
        z-index: 9

    .attention
        position: fixed
        bottom: 20px
        z-index: 999
        margin-top: 15px
        border-radius: 5px
        padding: 15px
        border-left: 5px solid #df771c
        background: #f9a134
        font-size: .85rem

    .toRightDo
        position: absolute
        right: 30px
        top: 60%
</style>
