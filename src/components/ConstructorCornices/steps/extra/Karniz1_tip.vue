<template>
    <div class="col-12 step step-3" >
<!--        <div class="col-12">-->
<!--            <div class="row">-->
<!--                <p class="info_header">На этом шаге выберете цвет и форму наконечника</p>-->
<!--            </div>-->
<!--        </div>-->
        <template v-if="template.MountPoint === 1">
            <header class="constructor-header">
                <p class="constructor-header__title">
                    цвет наконечника
<!--                    <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>-->
                </p>
<!--                <transition name="slide">-->
<!--                    <div v-if="showText">-->
<!--                        <p-->
<!--                            v-for="(text, i) in data.description"-->
<!--                            :key="`desc${i}`"-->
<!--                            class="mb-3"-->
<!--                        >-->
<!--                            {{text}}-->
<!--                        </p>-->
<!--                    </div>-->
<!--                </transition>-->
            </header>
            <div class="row step-content hrz-scroll">
                <div
                    v-for="radio in color"
                    :key="radio.val"
                    class="col-sm-2 col-6 full-size mb-3"
                >
                    <RadioButton
                        name="color"
                        :param="radio"
                        :label="radio.name"
                        :imgPath="publicPath + radio.alias + '.png'"
                        :zoom="false"
                        :selectedValue="material[template.karniz.karn_tip1_type].color"
                        @input="setColor(radio.val)"
                    />
                </div>
            </div>
            <header class="constructor-header">
                <p class="constructor-header__title">
                    Форма наконечника
                    <button v-if="data.description.length" @click="showTextF = !showTextF" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
                </p>
                <transition name="slide">
                    <div v-if="showTextF">
                        <p>
                            Выберите форму наконечника
                        </p>
                    </div>
                </transition>
            </header>
            <div class="row step-content hrz-scroll">
                <div
                    v-for="radio in materialList"
                    :key="radio.tid"
                    class="col-sm-2 col-6 full-size mb-3"
                >
                    <RadioButton
                        name="karn_tip1_type"
                        :param="{val:radio.tid}"
                        :label="radio.name"
                        :imgPath="publicPath + radio.tid + '.png'"
                        :zoom="false"
                        :selectedValue="template.karniz.karn_tip1_type"
                        @input="setMaterial(radio.tid)"
                    />
                </div>
            </div>
        </template>

        <template v-else>
            <div class="row step-content hrz-scroll rowKarniz">
                <div
                    class="col-sm-5 col-6 full-size contur1 butRad"
                >
                    <button class="button"
                            v-bind:class="{'active': row == 1}"
                            v-on:click="row = 1">
                        ПАРАМЕТРЫ 1-ОЙ ТРУБЫ
                    </button>
                </div>
                <div
                    class="col-sm-5 col-6 full-size contur2 butRad"
                >
                    <button class="button"
                            v-bind:class="{'active': row == 2}"
                            v-on:click="row = 2">
                        ПАРАМЕТРЫ 2-ОЙ ТРУБЫ
                    </button>
                </div>
            </div>
            <div class="row">
                <div v-if="row == 1"
                    class="col-12 contur1">
                    <header class="constructor-header">
                        <p class="constructor-header__title">
                            цвет наконечника 1-го ряда
<!--                            <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>-->
                        </p>
<!--                        <transition name="slide">-->
<!--                            <div v-if="showText">-->
<!--                                <p-->
<!--                                    v-for="(text, i) in data.description"-->
<!--                                    :key="`desc${i}`"-->
<!--                                    class="mb-3"-->
<!--                                >-->
<!--                                    {{text}}-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </transition>-->
                    </header>
                    <div class="row step-content hrz-scroll">
                        <div
                            v-for="radio in color"
                            :key="radio.val"
                            class="col-sm-3 col-6 full-size mb-3"
                        >
                            <RadioButton
                                name="color"
                                :param="radio"
                                :label="radio.name"
                                :imgPath="publicPath + radio.alias + '.png'"
                                :zoom="false"
                                :selectedValue="material[template.karniz.karn_tip1_type].color"
                                @input="setColor(radio.val)"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="row == 2"
                    class="col-12 contur2">
                    <header class="constructor-header">
                        <p class="constructor-header__title">
                            цвет наконечника 2-го ряда
<!--                            <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>-->
                        </p>
<!--                        <transition name="slide">-->
<!--                            <div v-if="showText">-->
<!--                                <p-->
<!--                                    v-for="(text, i) in data.description"-->
<!--                                    :key="`desc${i}`"-->
<!--                                    class="mb-3"-->
<!--                                >-->
<!--                                    {{text}}-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </transition>-->
                    </header>
                    <div class="row step-content hrz-scroll">
                        <div
                            v-for="radio in color2"
                            :key="radio.val"
                            class="col-sm-3 col-6 full-size mb-3"
                        >
                            <RadioButton
                                name="color2"
                                :param="radio"
                                :label="radio.name"
                                :imgPath="publicPath + radio.alias + '.png'"
                                :zoom="false"
                                :selectedValue="material[template.karniz.karn_tip2_type].color"
                                @input="setColor2(radio.val)"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="row == 1"
                    class="col-12 contur1">
                    <header class="constructor-header">
                        <p class="constructor-header__title">
                            Форма наконечника 1-го ряда
<!--                            <button v-if="data.description.length" @click="showTextF = !showTextF" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>-->
                        </p>
<!--                        <transition name="slide">-->
<!--                            <div v-if="showTextF">-->
<!--                                <p>-->
<!--                                    Выберите форму наконечника-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </transition>-->
                    </header>
                    <div class="row step-content hrz-scroll">
                        <div
                            v-for="radio in materialList"
                            :key="radio.tid"
                            class="col-sm-3 col-6 full-size mb-3"
                        >
                            <RadioButton
                                name="karn_tip1_type"
                                :param="{val:radio.tid}"
                                :label="radio.name"
                                :imgPath="publicPath + radio.tid + '.png'"
                                :zoom="false"
                                :selectedValue="template.karniz.karn_tip1_type"
                                @input="setMaterial(radio.tid)"
                            />
                        </div>
                    </div>
                </div>
<!--                <div v-if="row == 2"-->
<!--                    class="col-12">-->
<!--                    <header class="constructor-header">-->
<!--                        <p class="constructor-header__title">-->
<!--                            Форма наконечника 2-го ряда-->
<!--&lt;!&ndash;                            <button v-if="data.description.length" @click="showTextF = !showTextF" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>&ndash;&gt;-->
<!--                        </p>-->
<!--&lt;!&ndash;                        <transition name="slide">&ndash;&gt;-->
<!--&lt;!&ndash;                            <div v-if="showTextF">&ndash;&gt;-->
<!--&lt;!&ndash;                                <p>&ndash;&gt;-->
<!--&lt;!&ndash;                                    Выберите форму наконечника&ndash;&gt;-->
<!--&lt;!&ndash;                                </p>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        </transition>&ndash;&gt;-->
<!--                    </header>-->
<!--                    <div class="row step-content hrz-scroll">-->
<!--                        <div-->
<!--                            v-for="radio in materialList2"-->
<!--                            :key="radio.tid"-->
<!--                            class="col-sm-3 col-6 full-size mb-3"-->
<!--                        >-->
<!--                            <RadioButton-->
<!--                                name="karn_tip2_type"-->
<!--                                :param="{val:radio.tid}"-->
<!--                                :label="radio.name"-->
<!--                                :imgPath="publicPath + radio.tid + '.png'"-->
<!--                                :zoom="false"-->
<!--                                :selectedValue="template.karniz.karn_tip2_type"-->
<!--                                @input="setMaterial2(radio.tid)"-->
<!--                            />-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'Karniz1_tip',

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
                publicPath: `/_images/constructor/cornices/ico/ico_`,
                imgPath: `//foroom.ru/img/___res_w600_q70/images/calculator/materials/ico/ico_`,
                showText: false,
                showTextF: false,
                row: 1
            }
        },

        methods: {
            setColor (val) {
                let materials =  Object.keys(this.material)
                    .map(key => this.material[key])
                    .filter(material => material.color === val)
                    .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                this.template.karniz.karn_tip1_type = materials[0].tid
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            setColor2 (val) {
                let materials =  Object.keys(this.material2)
                    .map(key => this.material2[key])
                    .filter(material => material.color === val)
                    .filter(material => material.diameter1 === this.template.karniz.karn_tube2_diameter)
                    .filter(material => material.name.includes('заглушка'))
                this.template.karniz.karn_tip2_type = materials[0].tid
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            setMaterial (tid) {
                this.template.karniz.karn_tip1_type = tid
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            setMaterial2 (tid) {
                this.template.karniz.karn_tip2_type = tid
                this.$store.dispatch('calcCore/calculate', this.template)
            }
        },
        computed: {
            template: function () {
                console.log(this.$store.getters['calcCore/params'])
                console.log('=====>>>>>')
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
            material () {
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip1_type']['materials']
            },
            material2 () {
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip2_type']['materials']
            },
            materialBracket () {
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_bracket_type']['materials']
            },
            color () {
                let arr = [], index = []
                let materials = [];
                if(this.materialBracket[this.template.karniz.karn_bracket_type].name.includes('торцевой')){
                    materials =  Object.keys(this.material)
                        .map(key => this.material[key])
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                        .filter(material => material.name.includes('заглушка'))
                        .map(obj => {
                            let name = obj.name.split(',')
                            let obj2 = {
                                val: obj.color,
                                name: name[name.length-1]
                            }
                            if (!index.includes(obj.color)) {
                                arr.push(obj2)
                                index.push(obj.color)
                            }
                        })
                }else{
                    materials =  Object.keys(this.material)
                        .map(key => this.material[key])
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                        .map(obj => {
                            let name = obj.name.split(',')
                            let obj2 = {
                                val: obj.color,
                                name: name[name.length-1]
                            }
                            if (!index.includes(obj.color)) {
                                arr.push(obj2)
                                index.push(obj.color)
                            }
                        })
                }

                return arr
            },
            color2 () {
                let arr = [], index = []
                const materials =  Object.keys(this.material2)
                    .map(key => this.material2[key])
                    .filter(material => material.diameter1 === this.template.karniz.karn_tube2_diameter)
                    .filter(material => material.name.includes('заглушка'))
                    .map(obj => {
                        let name = obj.name.split(',')
                        let obj2 = {
                            val: obj.color,
                            name: name[name.length-1]
                        }
                        if (!index.includes(obj.color)) {
                            arr.push(obj2)
                            index.push(obj.color)
                        }
                    })
                return arr
            },
            materialList () {
                let materials = [];
                if(this.materialBracket[this.template.karniz.karn_bracket_type].name.includes('торцевой')){
                    materials =  Object.keys(this.material)
                        .map(key => this.material[key])
                        .filter(material => material.color === this.material[this.template.karniz.karn_tip1_type].color)
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                        .filter(material => material.name.includes('заглушка'))
                }else{
                    materials =  Object.keys(this.material)
                        .map(key => this.material[key])
                        .filter(material => material.color === this.material[this.template.karniz.karn_tip1_type].color)
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                }
                return materials
            },
            materialList2 () {
                let materials =  Object.keys(this.material2)
                    .map(key => this.material2[key])
                    .filter(material => material.color === this.material2[this.template.karniz.karn_tip2_type].color)
                    .filter(material => material.diameter1 === this.template.karniz.karn_tube2_diameter)
                return materials
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

    .button
        background: #ffffff !important
        color: #f9a134 !important
        border: 1px solid #f9a134 !important
        width: 100% !important
        &.active
            background: #ffc77e !important
            color: #ffffff !important

    .rowKarniz
        margin-top: 15px
        margin-bottom: 0

    .contur1
        border-radius: 5px
        background: #ffffff !important
    .contur2
        border-radius: 5px
        background: #dee2eb !important

    .butRad
        padding-bottom: 1rem
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0

</style>
