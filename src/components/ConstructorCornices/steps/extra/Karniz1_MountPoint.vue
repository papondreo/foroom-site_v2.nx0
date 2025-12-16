<template>
    <div class="col-12 step step-1" >
<!--        <div class="col-12">-->
<!--            <div class="row">-->
<!--                <p class="info_header">На этом шаге выберете КОЛИЧЕСТВО РЯДОВ</p>-->
<!--            </div>-->
<!--        </div>-->
        <header class="constructor-header">
            <p class="constructor-header__title">
                {{data.title}}
                <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
            </p>
            <transition name="slide">
                <div v-if="showText">
                    <p
                        v-for="(text, i) in data.description"
                        :key="`desc${i}`"
                        class="mb-3"
                    >
                        {{text}}
                    </p>
                </div>
            </transition>
        </header>
        <div class="row step-content hrz-scroll">
            <div
                v-for="radio in mountPoint"
                :key="radio.val"
                class="col-sm-4 col-6 full-size mb-3"
            >
                <RadioButton
                    name="MountPoint"
                    :param="radio"
                    :label="radio.name"
                    :imgPath="publicPath + radio.alias + '.png'"
                    :zoom="false"
                    :selectedValue="template.MountPoint"
                    @input="setMountPoint(radio.val)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Karniz1_MountPoint',

        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },

        props: [
            'systemName',
            'data'
        ],

        // created: function () {
        //     //this.size[0].EndBracket = this.template.EndBracket
        //     this.setMinMaxSizes()
        // },

        data: function () {
            return {
                publicPath: `/_images/constructor/cornices/MountPoint/${this.systemName}1-`,
                showText: false
            }
        },

        methods: {
            setMountPoint: function (type) {
                if(!this.calcCornices.selectParamUser.includes('MountPoint')) this.calcCornices.selectParamUser.push('MountPoint')
                this.template.MountPoint = type
                this.template.MountType = type
                if(type == 2){
                    let matsBracket = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_bracket_type']['materials']
                    let matBracket = Object.keys(matsBracket)
                        .map(key => matsBracket[key])
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter && material.diameter2 != 0)
                    matBracket = this.$findMin(matBracket, 'cost')
                    this.template.karniz.karn_bracket_type = matBracket.tid

                    let matsTube = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube2_type']['materials']
                    let matTube = Object.keys(matsTube)
                        .map(key => matsTube[key])
                        .filter(material => material.diameter1 === matBracket.diameter2)
                        .filter(material => material.len === this.materialList[this.template.karniz.karn_tube1_type].len)
                    matTube = this.$findMin(matTube, 'cost')
                    this.template.karniz.karn_tube2_diameter = matTube.diameter1
                    this.template.karniz.karn_tube2_type = matTube.tid

                    let matsTip = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip2_type']['materials']
                    let matTip = Object.keys(matsTip)
                        .map(key => matsTip[key])
                        .filter(material => material.diameter1 === matTube.diameter1)
                    matTip = this.$findMin(matTip, 'cost')
                    this.template.karniz.karn_tip2_type = matTip.tid
                    this.template.karniz.karn_ring2_amount = this.template.karniz.karn_ring1_amount
                    let matsRing = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_ring2_type']['materials']
                    let matRing = Object.keys(matsRing)
                        .map(key => matsRing[key])
                        .filter(material => material.diameter1 === matTube.diameter1)
                    matRing = this.$findMin(matRing, 'cost')
                    this.template.karniz.karn_ring2_type = matRing.tid

                    this.template.karniz.karn_hook_amount = this.template.karniz.karn_ring2_amount + this.template.karniz.karn_ring1_amount
                }
                this.$store.dispatch('calcCore/setSizes', this.template)
                this.$store.dispatch('calcCore/calculate', this.template)
            }
        },
        computed: {
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            systems: function () {
                return this.$store.getters['calcLibs/systems'][this.systemName]
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            mountPoint: function () {
                return this.$getParams('MountPoint')
                //return this.$store.getters.mountPoint
            },
            calcCornices () {
                return this.$store.getters['calcCornices/data']
            },
            materialList (){
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube1_type']['materials']
            }
        }

    }
</script>

<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/sizes-step"

    .info_header
        position: absolute
        font-weight: bold
        font-size: 14px

</style>
