<template>
    <div class="col-12 step step-2" >
<!--        <div class="col-12">-->
<!--            <div class="row">-->
<!--                <p class="info_header">На этом шаге выберете Диаметр, длину, цвет и тип трубы</p>-->
<!--            </div>-->
<!--        </div>-->
        <template v-if="template.MountPoint === 1">
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
                    v-for="radio in diameter"
                    :key="radio.val"
                    class="col-sm-2 col-6 full-size mb-3"
                >
                    <button class="button"
                            v-bind:class="{'active': template.karniz.karn_tube1_diameter == radio.val}"
                            v-on:click="setKarn_tube1_diameter(radio.val)">
                        <span class="diamI">&#8960;</span>{{radio.name}}
                    </button>
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
                    class="col-12 contur1" style="border-top-left-radius: 0">
                    <header class="constructor-header">
                        <p class="constructor-header__title">
                            {{data.title}} ТРУБЫ 1го РЯДА, мм
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
                            v-for="radio in diameter"
                            :key="radio.val"
                            class="col-sm-2 col-6 full-size mb-3"
                        >
                            <button class="button"
                                    v-bind:class="{'active': template.karniz.karn_tube1_diameter == radio.val}"
                                    v-on:click="setKarn_tube1_diameter(radio.val)">
                                <span class="diamI">&#8960;</span>{{radio.name}}
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="row == 2"
                    class="col-12 contur2">
                    <header class="constructor-header">
                        <p class="constructor-header__title">
                            {{data.title}} ТРУБЫ 2го РЯДА, мм
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
                            v-for="radio in diameter2"
                            :key="radio.val"
                            class="col-sm-2 col-6 full-size mb-3"
                        >
                            <button class="button"
                                    v-bind:class="{'active': template.karniz.karn_tube2_diameter == radio.val}"
                                    v-on:click="setKarn_tube2_diameter(radio.val)">
                                <span class="diamI">&#8960;</span>{{radio.name}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <header class="constructor-header">
            <p class="constructor-header__title">
                Длина
                <button @click="showTextW = !showTextW" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
            </p>
            <transition name="slide">
                <div v-if="showTextW">
                    <p
                        class="mb-3"
                    >
                        Длинна трубы без учета длинны наконечника, в см
                    </p>
                </div>
            </transition>
        </header>
        <div class="row step-content hrz-scroll">
            <div
                v-for="radio in kLength"
                :key="radio"
                class="col-sm-2 col-6 full-size mb-3"
            >
                <button class="button"
                        v-bind:class="{'active': materialList[template.karniz.karn_tube1_type].len == radio}"
                        v-on:click="setkLength(radio)"
                        :disabled="row == 2">
                    {{String(radio/10).replace('.',',') + ' cм.'}}
                </button>
            </div>
        </div>
        <template v-if="template.MountPoint === 1">
            <header class="constructor-header">
                <p class="constructor-header__title">
                    Цвет и тип
                    <button @click="showTextC = !showTextC" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
                </p>
                <transition name="slide">
                    <div v-if="showTextC">
                        <p
                            class="mb-3"
                        >
                            Если возникнут трудности обратитесь к официальным представителям БРЕНДА
                        </p>
                    </div>
                </transition>
            </header>
            <div class="row step-content hrz-scroll">
                <div
                    v-for="radio in kType"
                    :key="radio.tid"
                    class="col-sm-3 col-6 full-size mb-3"
                >
                    <RadioButton
                        name="karn_tube1_color"
                        :param="{val:radio.tid}"
                        :label="radio.name"
                        :imgPath="publicPath + radio.name + '.jpg'"
                        :zoom="false"
                        :selectedValue="materialList[template.karniz.karn_tube1_type].tid"
                        @input="setColor(radio.tid)"
                    />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row">
                <div v-if="row == 1"
                    class="col-12 contur1">
                    <header class="constructor-header">
                        <p class="constructor-header__title">
                            Цвет и тип трубы 1го ряда
<!--                            <button @click="showTextC = !showTextC" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>-->
                        </p>
<!--                        <transition name="slide">-->
<!--                            <div v-if="showTextC">-->
<!--                                <p-->
<!--                                    class="mb-3"-->
<!--                                >-->
<!--                                    Если возникнут трудности обратитесь к официальным представителям БРЕНДА-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </transition>-->
                    </header>
                    <div class="row step-content hrz-scroll">
                        <div
                            v-for="radio in kType"
                            :key="radio.tid"
                            class="col-sm-3 col-6 full-size mb-3"
                        >
                            <RadioButton
                                name="karn_tube1_color"
                                :param="{val:radio.tid}"
                                :label="radio.name"
                                :imgPath="publicPath + radio.name + '.jpg'"
                                :zoom="false"
                                :selectedValue="materialList[template.karniz.karn_tube1_type].tid"
                                @input="setColor(radio.tid)"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="row == 2"
                    class="col-12 contur2">
                    <header class="constructor-header">
                        <p class="constructor-header__title">
                            Цвет и тип трубы 2го ряда
<!--                            <button @click="showTextC = !showTextC" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>-->
                        </p>
<!--                        <transition name="slide">-->
<!--                            <div v-if="showTextC">-->
<!--                                <p-->
<!--                                    class="mb-3"-->
<!--                                >-->
<!--                                    Если возникнут трудности обратитесь к официальным представителям БРЕНДА-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </transition>-->
                    </header>
                    <div class="row step-content hrz-scroll">
                        <div
                            v-for="radio in kType2"
                            :key="radio.tid"
                            class="col-sm-3 col-6 full-size mb-3"
                        >
                            <RadioButton
                                name="karn_tube2_color"
                                :param="{val:radio.tid}"
                                :label="radio.name"
                                :imgPath="publicPath + radio.name + '.jpg'"
                                :zoom="false"
                                :selectedValue="materialList[template.karniz.karn_tube2_type].tid"
                                @input="setColor2(radio.tid)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div v-if="row == 1 || template.MountPoint === 1"
            class="row">
            <div class="col-6">
                <header class="constructor-header">
                    <p class="constructor-header__title">
                        Тип кронштейнов
                        <button @click="showTextD = !showTextD" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
                    </p>
                    <transition name="slide">
                        <div v-if="showTextD">
                            <p
                                class="mb-3"
                            >
                                Выберите тип кронштейна визуально по фотографии снизу
                            </p>
                        </div>
                    </transition>
                </header>
                <div class="row step-content hrz-scroll">
                    <div
                        v-for="radio in bracketList"
                        :key="radio.val"
                        class="col-sm-4 col-6 full-size mb-3"
                    >
                        <RadioButton
                            name="karn_tube1_bracket"
                            :param="radio"
                            :label="radio.name"
                            :imgPath="publicPathBracket + radio.val + '.jpg'"
                            :zoom="false"
                            :selectedValue="template.karniz.karn_bracket_type"
                            @input="setBracket(radio.val)"
                        />
                    </div>
                </div>
            </div>
            <div class="col-6">
                <header class="constructor-header">
                    <p class="constructor-header__title">
                        Количество кронштейнов
                        <button @click="showTextA = !showTextA" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
                    </p>
                    <transition name="slide">
                        <div v-if="showTextA">
                            <p
                                class="mb-3"
                            >
                                Укажите количество кронштейнов
                            </p>
                        </div>
                    </transition>
                </header>
                <div class="col-12">
                    <fieldset class="fieldset-input tac mb-3">
                        <div>
                            <p>от: {{minBracket}} шт</p>
                            <input @keyup="setBracketAmount($event)" v-model="bracket" type="text" class="text" :class="{'invalid': error.Bracket}" id="Bracket">
<!--                            <p>до: {{maxBracket}} шт</p>-->
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>


<!--        <pre>{{mountPoint}}</pre>-->
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

        created: function () {
            //this.size[0].EndBracket = this.template.EndBracket
            this.setMinMax()
        },

        data: function () {
            return {
                publicPath: `/_images/constructor/cornices/Color/the`,
                publicPathBracket: `/_images/constructor/cornices/bracket/the`,
                imgPath: `//foroom.ru/img/___res_w600_q70/images/calculator/materials/ico/ico_`,
                showText: false,
                showTextW: false,
                showTextC: false,
                showTextA: false,
                showTextD: false,
                minBracket: 2,
                maxBracket: 999,
                bracket: 0,
                error:{
                    Bracket: false
                },
                row:1
            }
        },

        methods: {
            setKarn_tube1_diameter (type) {
                if (!this.calcCornices.selectParamUser.includes('karn_tube1_diameter')) this.calcCornices.selectParamUser.push('karn_tube1_diameter')
                this.template.karniz.karn_tube1_diameter = type
                let matTip1 = Object.keys(this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip1_type']['materials'])
                    .map(key => this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip1_type']['materials'][key])
                    .filter(material => material.diameter1 === type)
                this.template.karniz.karn_tip1_type = matTip1[0].tid

                let materials = Object.keys(this.materialList)
                    .map(key => this.materialList[key])
                    .filter(material => material.diameter1 === type)
                materials = this.$findMin(materials, 'len')
                this.template.karniz.karn_tube1_type = materials.tid
                //изменим материал колец
                let matsRing = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_ring1_type']['materials']
                let matRing = Object.keys(matsRing)
                    .map(key => matsRing[key])
                    .filter(material => material.diameter1 === type)
                matRing = this.$findMin(matRing, 'cost')
                this.template.karniz.karn_ring1_type = matRing.tid
                this.template.karniz.karn_ring1_amount = materials.len/100

                this.template.karniz.karn_hook_amount = this.template.karniz.karn_ring1_amount

                if (this.template.MountPoint == 2) {
                    let materials = Object.keys(this.materialList2)
                        .map(key => this.materialList[key])
                        .filter(material => this.diameter2.map(key => key.val).includes(material.diameter1) && material.len >= this.materialList[this.template.karniz.karn_tube1_type].len)
                    materials = this.$findMin(materials, 'len')
                    this.template.karniz.karn_tube2_type = materials.tid
                    this.template.karniz.karn_tube2_diameter = materials.diameter1
                    this.template.karniz.karn_ring2_amount = materials.len/100
                    let matTip2 = Object.keys(this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip2_type']['materials'])
                        .map(key => this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip2_type']['materials'][key])
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube2_diameter)
                        .filter(material => material.name.includes('заглушка'))
                    this.template.karniz.karn_tip2_type = matTip2[0].tid

                    let matsRing = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_ring2_type']['materials']
                    let matRing = Object.keys(matsRing)
                        .map(key => matsRing[key])
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube2_diameter)
                    matRing = this.$findMin(matRing, 'cost')
                    this.template.karniz.karn_ring2_type = matRing.tid
                    this.template.karniz.karn_hook_amount = this.template.karniz.karn_ring2_amount + this.template.karniz.karn_ring1_amount
                }

                let matBrek1 = this.bracketList[0]
                this.template.karniz.karn_bracket_type = matBrek1.val
                this.$store.dispatch('calcCore/setSizes', this.template)
                this.$store.dispatch('calcCore/calculate', this.template)

            },
            setKarn_tube2_diameter(type){
                if(!this.calcCornices.selectParamUser.includes('karn_tube2_diameter')) this.calcCornices.selectParamUser.push('karn_tube2_diameter')
                this.template.karniz.karn_tube2_diameter = type
                let matTip2 = Object.keys(this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip2_type']['materials'])
                    .map(key => this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip2_type']['materials'][key])
                    .filter(material => material.diameter1 === type)
                    .filter(material => material.name.includes('заглушка'))
                this.template.karniz.karn_tip2_type = matTip2[0].tid
                this.$store.dispatch('calcCore/setSizes', this.template)

                    let materials = Object.keys(this.materialList2)
                        .map(key => this.materialList2[key])
                        .filter(material => material.diameter1 === type && material.len == this.materialList[this.template.karniz.karn_tube1_type].len)
                    materials = this.$findMin(materials, 'len')
                    this.template.karniz.karn_tube2_type = materials.tid

                    let matBrek1 = this.bracketList[0]
                    this.template.karniz.karn_bracket_type = matBrek1.val

                    let matsRing = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_ring2_type']['materials']
                    let matRing = Object.keys(matsRing)
                        .map(key => matsRing[key])
                        .filter(material => material.diameter1 === type)
                    matRing = this.$findMin(matRing, 'cost')
                    this.template.karniz.karn_ring2_type = matRing.tid
                this.template.karniz.karn_hook_amount = this.template.karniz.karn_ring2_amount + this.template.karniz.karn_ring1_amount
                    this.$store.dispatch('calcCore/calculate', this.template)

            },
            setkLength (val) {
                let materials =  Object.keys(this.materialList)
                    .map(key => this.materialList[key])
                    .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                    .filter(material => material.len === val)
                this.template.karniz.karn_tube1_type = materials[0].tid
                this.template.karniz.karn_ring1_amount = materials[0].len/100
                this.template.karniz.karn_hook_amount = this.template.karniz.karn_ring1_amount
                if(this.template.MountPoint == 2){
                    let mat2 = Object.keys(this.materialList2)
                        .map(key => this.materialList2[key])
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube2_diameter)
                        .filter(material => material.len === val)
                    this.template.karniz.karn_tube2_type = mat2[0].tid
                    this.template.karniz.karn_ring2_amount = mat2[0].len/100
                    this.template.karniz.karn_hook_amount = this.template.karniz.karn_ring2_amount + this.template.karniz.karn_ring1_amount
                }
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            setColor (val) {
                let materials =  Object.keys(this.materialList)
                    .map(key => this.materialList[key])
                    .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                    .filter(material => material.len === this.materialList[this.template.karniz.karn_tube1_type].len)
                    .filter(material => material.tid === val)
                this.template.karniz.karn_tube1_type = materials[0].tid
                this.$store.dispatch('calcCore/setMaterial', materials)
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            setColor2 (val) {
                let materials =  Object.keys(this.materialList2)
                    .map(key => this.materialList2[key])
                    .filter(material => material.diameter1 === this.template.karniz.karn_tube2_diameter)
                    .filter(material => material.len === this.materialList[this.template.karniz.karn_tube1_type].len)
                    .filter(material => material.tid === val)
                this.template.karniz.karn_tube2_type = materials[0].tid
                this.$store.dispatch('calcCore/setMaterial', materials)
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            setBracket (val) {
                this.template.karniz.karn_bracket_type = val
                this.$store.dispatch('calcCore/calculate', this.template)
                if(this.materialBracket[val].name.includes('торцевой')){
                    let matTip1 = Object.keys(this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip1_type']['materials'])
                        .map(key => this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tip1_type']['materials'][key])
                        .filter(material => material.diameter1 === this.template.karniz.karn_tube1_diameter)
                        .filter(material => material.name.includes('заглушка'))
                    this.template.karniz.karn_tip1_type = matTip1[0].tid
                }
            },
            setMinMax(){
                this.bracket = this.template.karniz.karn_bracket_amount
            },
            setBracketAmount (e) {
                let nameParam = e.target.id
                const lastChar = e.target.value.slice(-1)
                if (lastChar !== '.' && lastChar !== ',') {
                    this.error.Bracket = false
                    this.error.Bracket = this.bracket >= this.minBracket && this.bracket <= this.maxBracket ? false : true
                    if (!this.error.Bracket) {
                        this.$store.dispatch('common/clearError')
                        if(!this.calcCornices.selectParamUser.includes('karn_bracket_amount') && nameParam === 'bracket') this.calcCornices.selectParamUser.push('karn_bracket_amount')
                        this.template.karniz.karn_bracket_amount = this.bracket
                        this.$store.dispatch('calcCore/calculate', this.template)
                    }else {
                        this.$store.dispatch('common/setError','')
                    }
                }
            },
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
            diameter () {
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube1_diameter']['options']
            },
            diameter2 () {
                let arr = [], index = []
                const materials = this.materialBracket
                for(let obj in materials) {
                    if (materials[obj].diameter1 == this.template.karniz.karn_tube1_diameter && materials[obj].diameter2 != 0) {
                        if (!index.includes(materials[obj].diameter2)) {
                            index.push(materials[obj].diameter2)
                            arr.push({val:materials[obj].diameter2, name:materials[obj].diameter2})
                        }
                    }
                }
                arr.sort((a,b)=>{
                    return a - b
                })
                return arr
                // return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube2_diameter']['options']
            },
            materialList (){
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube1_type']['materials']
            },
            materialList2 (){
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube2_type']['materials']
            },
            kLength () {
                let arr = []
                const materials = this.materialList
               for(let obj in materials) {
                   if (materials[obj].diameter1 == this.template.karniz.karn_tube1_diameter) {
                       if (!arr.includes(materials[obj].len)) {
                           arr.push(materials[obj].len)
                       }
                   }
               }
                arr.sort((a,b)=>{
                    return a - b
                })
                return arr
            },
            calcCornices () {
                return this.$store.getters['calcCornices/data']
            },
            kType() {
                let arr = [], index = []
                const materials = this.materialList
                for(let obj in materials) {
                    if (materials[obj].diameter1 == this.template.karniz.karn_tube1_diameter && materials[obj].len == this.materialList[this.template.karniz.karn_tube1_type].len) {
                        let name = materials[obj].name.slice(materials[obj].name.indexOf('м'), materials[obj].name.length).split(',')
                        let obj2 = {
                            val: materials[obj].color,
                            tid: materials[obj].tid,
                            name: name.length > 2 ? name[name.length-1] + ',' + name[name.length-2] : name[name.length-1]
                        }
                        // if (!index.includes(materials[obj].color)) {
                            arr.push(obj2)
                            index.push(materials[obj].color)
                        // }
                    }
                }
                return arr
            },
            kType2() {
                let arr = [], index = []
                const materials = this.materialList2
                for(let obj in materials) {
                    if (materials[obj].diameter1 == this.template.karniz.karn_tube2_diameter && materials[obj].len == this.materialList[this.template.karniz.karn_tube1_type].len) {
                        let name = materials[obj].name.slice(materials[obj].name.indexOf('м'), materials[obj].name.length).split(',')
                        let obj2 = {
                            val: materials[obj].color,
                            tid: materials[obj].tid,
                            name: name.length > 2 ? name[name.length-1] + ',' + name[name.length-2] : name[name.length-1]
                        }
                        // if (!index.includes(materials[obj].color)) {
                            arr.push(obj2)
                            index.push(materials[obj].color)
                        // }
                    }
                }
                return arr
            },
            materialBracket () {
                return this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_bracket_type']['materials']
            },
            bracketList () {
                let arr = [], index = []
                const materials = this.materialBracket
                for(let obj in materials) {
                    if (materials[obj].diameter1 == this.template.karniz.karn_tube1_diameter) {
                        if(this.template.MountPoint == 1){
                            if(materials[obj].diameter2 == 0){
                                let obj2 = {
                                    val: materials[obj].tid,
                                    name: materials[obj].name
                                }
                                if (!index.includes(materials[obj].tid)) {
                                    arr.push(obj2)
                                    index.push(materials[obj].tid)
                                }
                            }
                        }else{
                            if(materials[obj].diameter2 == this.template.karniz.karn_tube2_diameter){
                                let obj2 = {
                                    val: materials[obj].tid,
                                    name: materials[obj].short_name
                                }
                                if (!index.includes(materials[obj].tid)) {
                                    arr.push(obj2)
                                    index.push(materials[obj].tid)
                                }
                            }
                        }
                    }
                }
                return arr

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
        &:disabled
            border-color: #eee !important
            color: #aaa !important

    .diamI
        font-size: 30px
        padding-right: 5px

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
