<template>
    <div class="col-12 step step-2">
        <div v-if='!template.ArchType || template.ArchType == 1'
            class="row step-content mb-0">
            <div class="col-12">
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
            </div>
            <div class="col-12 mb-3">
<!--                <silent-box-->
<!--                    class="link system-scheme__link d-block d-md-none"-->
<!--                    :thumbnail="false"-->
<!--                    :image="{ src: `${publicPath}-size.jpg`}"-->
<!--                >СХЕМА СИСТЕМЫ</silent-box>-->
            </div>
            <div class="col-5 d-none d-md-block">
                <img :src="`${publicPath}-size.jpg`" alt="">
            </div>
            <div class="col-md-7">
                <div class="row">
                    <div class="col-12">
                        <p class="tac">Введите длинну изделия</p>
                    </div>


                    <div class="col-12">
                        <fieldset class="fieldset-input tac mb-3">
                            <label for="width">Длинна, см</label>
                            <div>
                                <p>от: {{size[flap].minWidth / 10}}</p>
                                <input @keyup="setSize($event)" v-model="size[flap].width" type="text" class="text" :class="{'invalid': error.width}" id="width">
                                <p>до: {{size[flap].maxWidth / 10}}</p>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="template.ArchType == 4">
            <header class="constructor-header">
                <p class="constructor-header__title">
                    Kоличество углов
                </p>
            </header>
            <div class="row step-content mb-0">
                <div
                    class="col-md-4 col-6 full-size mb-sm-3"
                >
                    <RadioButton
                        name="AnglesCount"
                        :param="{val: '1'}"
                        label="Один угол"
                        :imgPath="`${publicPath}-size1.jpg`"
                        :disableImg="false"
                        :selectedValue="system.AnglesCount"
                        @input="setAnglesCount(1)"
                    />
                </div>
                <div
                    class="col-md-4 col-6 full-size mb-sm-3"
                >
                    <RadioButton
                        name="AnglesCount"
                        :param="{val: '2'}"
                        label="Два угла"
                        :imgPath="`${publicPath}-size2.jpg`"
                        :disableImg="false"
                        :selectedValue="system.AnglesCount"
                        @input="setAnglesCount(2)"
                    />
                </div>
            </div>
            <header class="constructor-header">
                <p class="constructor-header__title">
                    Длина сегментов
                </p>
            </header>
            <div class="row step-content mb-0">
                <div class="col-12 mb-3">
<!--                    <silent-box-->
<!--                        class="link system-scheme__link d-block d-md-none"-->
<!--                        :thumbnail="false"-->
<!--                        :image="{ src: `${publicPath}-segment1${system.AnglesCount}mb.jpg`}"-->
<!--                    >СХЕМА СИСТЕМЫ</silent-box>-->
                </div>
                <div class="col-5 d-none d-md-block wrapper">
                    <img :src="`${publicPath}-segment1${system.AnglesCount}.jpg`" alt="">
                </div>
                <div class="col-md-7">
                    <div class="row">
                        <div class="col-12">
                            <fieldset class="fieldset-input tac mb-3">
                                <label for="Segment1">Длинна сегмента 1, см</label>
                                <div>
                                    <p>от: {{size[flap].minSegment1 / 10}}, см</p>
                                    <input @keyup="setSize($event)" v-model="size[flap].Segment1" type="text" class="text" :class="{'invalid': error.Segment1}" id="Segment1">
                                    <p>до: {{size[flap].maxSegment1 / 10}}, см</p>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div v-if="template.AnglesCount === 2"
                         class="row">
                        <div class="col-12">
                            <div class="col-12">
                                <p class="tac">Длинна сегмента 1 = длинне сегмента 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row step-content mb-0">
                <div class="col-5 d-none d-md-block wrapper">
                    <img :src="`${publicPath}-segment2${system.AnglesCount}.jpg`" alt="">
                </div>
                <div class="col-md-7">
                    <div class="row">
                        <div class="col-12">
                            <fieldset class="fieldset-input tac mb-3">
                                <label for="Segment2">Длинна сегмента 2, см</label>
                                <div>
                                    <p>от: {{size[flap].minSegment2 / 10}}, см</p>
                                    <input @keyup="setSize($event)" v-model="size[flap].Segment2" type="text" class="text" :class="{'invalid': error.Segment2}" id="Segment2">
                                    <p>до: {{size[flap].maxSegment2 / 10}}, см</p>
                                </div>
                            </fieldset>
                        </div>
                        <div class="col-12">
                            <p class="tac">Длинна сегмента 2 = габаритной длине изделия</p>
                        </div>
                    </div>
                </div>
            </div>

<!--            <div class="col-12">-->
<!--                <div class="attention" @mouseover="glazingBead = true" @mouseleave="glazingBead = false">-->
<!--                    <p class="position-relative">-->
<!--                        Угол между сегментами составит 270 градусов. В случае, если вы хотите  сделать более сложный заказ, изменить градус угла - обратитесь в магазин ближайщего к вам официального Представителя FOROOM-->
<!--                        <i class="fa fa-info-circle ml-1"></i>-->
<!--                        <img v-if="glazingBead" class="shtapik" :src="'/_images/constructor/MountType/karniz-270.png'" alt="">-->
<!--                    </p>-->
<!--                </div>-->
<!--            </div>-->
        </div>

        <div v-else
            class="row step-content mb-0">
            <div class="col-12">
                <header class="constructor-header">
                    <p class="constructor-header__title">
                        Укажите размер карниза
                        <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
                    </p>
                    <transition name="slide">
                        <div v-if="showText">
                           <p>На этом шаге укажите размер Базы и размер Прогиба</p>
                        </div>
                    </transition>
                </header>
            </div>

            <div class="col-12 mb-3">
<!--                <silent-box-->
<!--                    class="link system-scheme__link d-block d-md-none"-->
<!--                    :thumbnail="false"-->
<!--                    :image="{ src: `${publicPath}-${system.sizesScheme}`}"-->
<!--                >СХЕМА СИСТЕМЫ</silent-box>-->
            </div>
            <div class="col-5 d-none d-md-block">
                <img :src="`${publicPath}-${system.sizesScheme}`" alt="">
            </div>
            <div class="col-md-7">
                <div class="row">
                    <div class="col-12">
                        <p class="tac">Введите размеры</p>
                    </div>


                    <div class="col-12">
                        <fieldset class="fieldset-input tac mb-3">
                            <label for="width">База, см</label>
                            <div>
                                <p>от: {{size[flap].minWidth / 10}}</p>
                                <input @keyup="setSize($event)" v-model="size[flap].width" type="text" class="text" :class="{'invalid': error.width}" id="width">
                                <p>до: {{size[flap].maxWidth / 10}}</p>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-12">
                        <fieldset class="fieldset-input tac mb-3">
                            <label for="Deflection">Прогиб, см</label>
                            <div>
                                <p>от: {{size[flap].minDeflection / 10}}</p>
                                <input @keyup="setSize($event)" v-model="size[flap].Deflection" type="text" class="text" :class="{'invalid': error.Deflection}" id="Deflection">
                                <p>до: {{size[flap].maxDeflection / 10}}</p>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

        </div>


       <div class="row step-content">
           <div v-if="toNag()"
                class="col-12">
               <p  class="constructor-header__title">
                   Разделить на две равные части
               </p>
               <div class="col-12">
                   <div class="row attention">
                       <i class="fa fa-info-circle ml-1"></i>
                       <p class="position-relative">
                           Вы можете заказать распил карниза пополам для удобной транспортировки изделий от 2м. В этом случае, в ваш заказ будет добавлен соединитель универсальный для совмещения частей карниза при монтаже
                       </p>
                   </div>
               </div>
               <div class="row">
                       <div class="col-12 mb-3">
<!--                           <silent-box-->
<!--                               class="link system-scheme__link d-block pos-left"-->
<!--                               :thumbnail="false"-->
<!--                               :image="{ src: `/_images/constructor/MountType/karniz-ConnectorUni.jpg`}"-->
<!--                           >Схема использования универсального соеденителя <i class="fa fa-eye ml-1"></i></silent-box>-->
                       </div>
                       <div class="col-6">
                           <div class="row">
                               <div class="col-6">
                                   <button class="button"
                                       v-bind:class="{'active': system.CutHalf == 1}"
                                       v-on:click="setCutHalf(1)">
                                       Не разделять
                                   </button>
                               </div>
                               <div class="col-6">
                                   <button class="button"
                                           v-bind:class="{'active': system.CutHalf == 2}"
                                           v-on:click="setCutHalf(2)">
                                       Разделить
                                   </button>
                               </div>
                           </div>
                       </div>
                   <div class="col-6">
                       <div v-if="system.CutHalf == 2" class="row attention" style="margin-top: 0">
                           <p class="position-relative">
                               Ваше изделие будет разделено на 2 равные части.
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       </div>

<!--        <div v-if="template.ConnectorCorner"-->
<!--             class="row step-content">-->
<!--            <div class="col-12">-->
<!--                <header class="constructor-header">-->
<!--                    <p class="constructor-header__title">-->
<!--                        Угловой соединитель-->
<!--                    </p>-->
<!--                </header>-->
<!--            </div>-->
<!--            <div class="col-12">-->
<!--                <div class="row">-->
<!--                    <div class="col-12">-->
<!--                        <p>Вы можете заказать дополнительно угловой соеденитель, если вам нужно образовать прямой угол при сопоставлении двух изделий</p>-->
<!--                    </div>-->
<!--                    <div class="col-12 mb-3">-->
<!--                        <silent-box-->
<!--                            class="link system-scheme__link d-block pos-left"-->
<!--                            :thumbnail="false"-->
<!--                            :image="{ src: `/_images/constructor/MountType/karniz-ConnectorCorner.jpg`}"-->
<!--                        >Схема использования углового соеденителя <i class="fa fa-eye ml-1"></i></silent-box>-->
<!--                    </div>-->
<!--                    <div class="col-6">-->
<!--                        <div class="row">-->
<!--                            <div class="col-6">-->
<!--                                <button class="button"-->
<!--                                        v-bind:class="{'active': template.ConnectorCorner == 1}"-->
<!--                                        v-on:click="setConnectorCorner(1)">-->
<!--                                    Не добавлять-->
<!--                                </button>-->
<!--                            </div>-->
<!--                            <div class="col-6">-->
<!--                                <button class="button"-->
<!--                                        v-bind:class="{'active': template.ConnectorCorner == 2}"-->
<!--                                        v-on:click="setConnectorCorner(2)">-->
<!--                                    Добавить-->
<!--                                </button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col-6">-->
<!--                        <div v-if="template.ConnectorCorner == 2" class="row attention" style="margin-top: 0">-->
<!--                            <p class="position-relative">-->
<!--                                В заказ добавлен 1 угловой соеденитель.-->
<!--                            </p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "KarnizSizesLong",
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        props: [
            'systemName',
            'data'
        ],

        data: function () {
            return {
                publicPath: `/_images/constructor/Sizes/${this.systemName}`,
                showText: false,
                showTextCC: false,
                size: [{
                    width: '',
                    Deflection: '',
                    ConnectorCorner: 0,
                    ConnectorUni: 0,
                    Segment1: 15,
                    Segment2: 30,
                    Segment3: 15,
                    minWidth: 0,
                    maxWidth: 0,
                    minDeflection: 0,
                    maxDeflection: 0,
                    EndBracket: 0,
                    minEndBracket: 0,
                    maxEndBracket: 0,
                    minConnectorUni: 0,
                    maxConnectorUni: 10,
                    minConnectorCorner: 0,
                    maxConnectorCorner: 10
                }],
                error: {
                    width: false,
                    height: false,
                    Deflection: false,
                    EndBracket: false,
                    Segment1: false,
                    Segment2: false,
                    ConnectorUni: false,
                    ConnectorCorner: false
                },
                flap: 0,
                glazingBead: false,
                glazingBead2: false,
            }
        },
        created: function () {
            this.size[0].width = this.template.width / 10
            this.size[0].Deflection = this.template.Deflection ? this.template.Deflection / 10 : 10
            this.size[0].EndBracket = this.template.EndBracketAmount ? this.template.EndBracketAmount : 0
            this.size[0].Segment1 = this.template.Segment1 ? this.template.Segment1 / 10 : 0
            this.size[0].Segment2 = this.template.Segment2 ? this.template.Segment2 / 10 : 0
            this.size[0].CutHalf = this.template.CutHalf ? this.template.CutHalf : 0
            this.size[0].ConnectorUni = this.template.ConnectorUni ? (this.template.ConnectorAmount ? this.template.ConnectorAmount : 0) : 0
            this.size[0].ConnectorCorner = this.template.ConnectorCorner ? (this.template.ConnectorCornerAmount ? this.template.ConnectorCornerAmount : 0) : 0
            this.setMinMaxSizes()
        },

        methods: {
          parseSize(key) {
            if (this.$store.getters['calcCore/params'].oParams[key].costtype === 1) {
              return Math.round((parseFloat(this.size[this.flap][key].toString().replace(',','.').replace(' ',''))) * 10) / 10 || ''
            } else {
              return Math.round((parseInt(this.size[this.flap][key].toString().replace(',','.').replace(' ',''))) * 10) / 10 || ''
            }
          },
            setMinMaxSizes: function () {
               //let material = this.$getMaterials()[0]
                let material = this.$store.getters['calcCore/params']['oParams']
                // console.log(material)
                this.size[0].maxWidth = material.width.max;
                this.size[0].minWidth = material.width.min;
                this.size[0].maxDeflection = material.Deflection ? material.Deflection.max : 0;
                this.size[0].maxSegment1 = 300;
                this.size[0].maxSegment2 = material.Segment2 ? material.Segment2.max : 0;
                this.size[0].minDeflection = material.Deflection ? material.Deflection.min : 0;
                this.size[0].minSegment1 = material.Segment1 ? material.Segment1.min : 0;
                if(this.calcCornices.NumberOfRows == 2){
                    this.size[0].minSegment2 = 730;
                }else{
                    this.size[0].minSegment2 = 580;
                }
                this.size[0].minEndBracket = 0;
                this.size[0].maxEndBracket = material.EndBracket ? material.EndBracket.max : 0;
                this.size[0].minConnectorUni = 0;
                this.size[0].maxConnectorUni = material.ConnectorUni ? material.ConnectorUni.max - 1 : 0;
                this.size[0].minConnectorCorner = 0;
                this.size[0].maxConnectorCorner = material.ConnectorCorner ? material.ConnectorCorner.max - 1 : 0;
            },

            setSize: function (e) {
                let nameParam = e.target.id
                const lastChar = e.target.value.slice(-1)
                if (lastChar !== '.' && lastChar !== ',') {
                    this.error.width = false
                    this.error.Deflection = false
                    this.error.EndBracket = false
                    this.error.Segment1 = false
                    this.error.Segment2 = false
                    this.error.ConnectorUni = false
                    this.error.ConnectorCorner = false
                    this.size[this.flap].width = this.parseSize('width') || ''
                    this.size[this.flap].Deflection = this.template.Deflection ? this.parseSize('Deflection') || '': 10
                    this.size[this.flap].EndBracket = this.template.EndBracket ? this.parseSize('EndBracket') || '0': 0
                    this.size[this.flap].Segment1 = this.template.Segment1 ? this.parseSize('Segment1') || '' : 0
                    this.size[this.flap].Segment2 = this.template.Segment2 ? this.parseSize('Segment2') || '' : 0
                    this.size[this.flap].ConnectorUni = this.template.ConnectorUni ? this.parseSize('ConnectorUni') || '0' : 0
                    this.size[this.flap].ConnectorCorner = this.template.ConnectorCorner ? this.parseSize('ConnectorCorner') || '0' : 0
                    this.$store.dispatch('calcCore/setSizes', this.size).then(res => {

                        const width = this.size[this.flap].width * 10
                        const Deflection = this.size[this.flap].Deflection * 10
                        const EndBracket = this.size[this.flap].EndBracket
                        const Segment1 = this.size[this.flap].Segment1 * 10
                        const Segment2 = this.size[this.flap].Segment2 * 10
                        const ConnectorCorner = this.size[this.flap].ConnectorCorner
                        const ConnectorUni = this.size[this.flap].ConnectorUni

                        this.error.width = width >= this.size[0].minWidth && width <= this.size[0].maxWidth ? false : true
                        this.error.Deflection = this.template.Deflection ? (Deflection >= this.size[0].minDeflection && Deflection <= this.size[0].maxDeflection ? false : true) : false
                        this.error.EndBracket = this.template.EndBracket ? (EndBracket >= this.size[0].minEndBracket && EndBracket <= this.size[0].maxEndBracket ? false : true) : false
                        this.error.Segment1 = this.template.Segment1 ? (Segment1 >= this.size[0].minSegment1 && Segment1 <= this.size[0].maxSegment1 ? false : true) : false
                        this.error.Segment2 = this.template.Segment1 ? (Segment2 >= this.size[0].minSegment2 && Segment2 <= this.size[0].maxSegment2 ? false : true) : false
                        this.error.ConnectorCorner = this.template.ConnectorCorner ? (ConnectorCorner >= this.size[0].minConnectorCorner && ConnectorCorner <= this.size[0].maxConnectorCorner ? false : true) : false
                        this.error.ConnectorUni = this.template.ConnectorUni ? (ConnectorUni >= this.size[0].minConnectorUni && ConnectorUni <= this.size[0].maxConnectorUni ? false : true) : false
                        if (!this.error.width && !this.error.Deflection && !this.error.EndBracket && !this.error.Segment1 && !this.error.Segment2 && !this.error.ConnectorUni && !this.error.ConnectorCorner) {
                            this.setMinMaxSizes()
                            if(!this.calcCornices.selectParamUser.includes('width') && nameParam === 'width') this.calcCornices.selectParamUser.push('width')
                            if(!this.calcCornices.selectParamUser.includes('Deflection') && nameParam === 'Deflection') this.calcCornices.selectParamUser.push('Deflection')
                            if(!this.calcCornices.selectParamUser.includes('EndBracket') && nameParam === 'EndBracket') this.calcCornices.selectParamUser.push('EndBracket')
                            if(!this.calcCornices.selectParamUser.includes('Segment1') && nameParam === 'Segment1') this.calcCornices.selectParamUser.push('Segment1')
                            if(!this.calcCornices.selectParamUser.includes('Segment2') && nameParam === 'Segment2') this.calcCornices.selectParamUser.push('Segment2')
                            if(!this.calcCornices.selectParamUser.includes('ConnectorCornerAmount') && nameParam === 'ConnectorCorner') this.calcCornices.selectParamUser.push('ConnectorCornerAmount')
                            if(!this.calcCornices.selectParamUser.includes('ConnectorUniAmount') && nameParam === 'ConnectorUni') this.calcCornices.selectParamUser.push('ConnectorUniAmount')

                            this.$store.dispatch('common/clearError')

                            const tmpl = Object.assign({}, this.template)
                            tmpl.width = width
                            if(tmpl.Deflection)tmpl.Deflection = Deflection
                            if(tmpl.EndBracket){
                                if(EndBracket > 0){
                                    tmpl.EndBracket = 2
                                    tmpl.EndBracketAmount = EndBracket
                                }else{
                                    tmpl.EndBracket = 1
                                }
                            }
                            if(tmpl.ConnectorUni){
                                if(ConnectorUni > 0){
                                    tmpl.ConnectorUni = 2
                                    tmpl.ConnectorUniAmount = ConnectorUni
                                }else{
                                    tmpl.ConnectorUni = 1
                                    tmpl.ConnectorUniAmount = 0
                                }
                            }
                            if(tmpl.ConnectorCorner){
                                if(ConnectorCorner > 0){
                                    tmpl.ConnectorCorner = 2
                                    tmpl.ConnectorCornerAmount = ConnectorCorner
                                }else{
                                    tmpl.ConnectorCorner = 1
                                    tmpl.ConnectorCornerAmount = 0
                                }
                            }
                            if(tmpl.ArchType && tmpl.ArchType == 4){
                                if((Segment2 - - Segment1)>=2000 && tmpl.CutHalf && tmpl.CutHalf != 2){
                                    this.system.CutHalf = 1
                                }
                                if((Segment2 - - Segment1)<2000) {
                                    this.system.CutHalf = 1
                                    if(tmpl.CutHalf)tmpl.CutHalf = 1
                                    if(tmpl.ConnectorUni)tmpl.ConnectorUni = 1
                                    if(tmpl.ConnectorCorner)tmpl.ConnectorCorner = 1
                                }
                            }else{
                                if(width>=2000 && tmpl.CutHalf && tmpl.CutHalf != 2){
                                    this.system.CutHalf = 1
                                }
                                if(width<2000) {
                                    this.system.CutHalf = 1
                                    if(tmpl.CutHalf)tmpl.CutHalf = 1
                                    if(tmpl.ConnectorUni)tmpl.ConnectorUni = 1
                                    if(tmpl.ConnectorCorner)tmpl.ConnectorCorner = 1
                                }
                            }
                            this.size[0].Segment3 = this.size[0].Segment1
                            if(tmpl.Segment1)tmpl.Segment1 = Segment1
                            if(tmpl.Segment2)tmpl.Segment2 = Segment2
                            if(tmpl.Segment3)tmpl.Segment3 = Segment1
                          if(tmpl.Segment3 && (tmpl.Segment1 * 2 - - tmpl.Segment2) > 4000) {
                            tmpl.Segment2 = 4000 - tmpl.Segment1 * 2
                            this.size[this.flap].Segment2 = Math.round(tmpl.Segment2/10)
                            alert('Максимальная длинна профиля 4 метра для увеличения габаритной ширины изделия уменьшите длинну сегмета 1')
                          }
                            this.$store.dispatch('calcCore/calculate', tmpl).then(res => {
                                if(this.calcCornices.NumberOfRows == 2){
                                    this.calcCornices.currentTemplates[0] = Object.assign({}, this.template)
                                    let temp2 = Object.assign({}, this.calcCornices.currentTemplates[1])
                                    if(this.calcCornices.currentTemplates[0].ArchType){
                                        if(this.calcCornices.currentTemplates[0].ArchType == 1){
                                            temp2.width = width

                                        }else if(this.calcCornices.currentTemplates[0].ArchType == 4){
                                            let sizeCalc = tmpl.Segment2-30
                                            temp2.width = sizeCalc

                                            if(temp2.ConnectorUni){
                                                if(ConnectorUni > 0){
                                                    temp2.ConnectorUni = 2
                                                    temp2.ConnectorUniAmount = ConnectorUni
                                                }else{
                                                    temp2.ConnectorUni = 1
                                                }
                                            }
                                            if(temp2.ConnectorCorner){
                                                if(ConnectorCorner > 0){
                                                    temp2.ConnectorCorner = 2
                                                    temp2.ConnectorCornerAmount = ConnectorCorner
                                                }else{
                                                    temp2.ConnectorCorner = 1
                                                }
                                            }
                                        }
                                    }else{
                                        temp2.width = width
                                    }
                                    this.$store.dispatch('calcCore/setSizes', [{width: temp2.width/10}]).then(()=>{
                                        this.$store.dispatch('calcCore/calculate', temp2).then(res => {
                                            this.calcCornices.currentTemplates[1] = Object.assign({}, Object.assign({}, this.template))
                                            this.calcCornices.templateRus = res.item_rus
                                            this.calcCornices.oldPrice = this.$store.getters['calcCore/prices'].oldPrice
                                            this.calcCornices.price = this.$store.getters['calcCore/prices'].price
                                            this.$store.dispatch('calcCore/calculate', this.calcCornices.currentTemplates[0]).then(res => {
                                                this.calcCornices.currentTemplates[0] = Object.assign({}, this.template)
                                            })
                                        })
                                    })
                                }
                            })
                        } else {
                            this.$store.dispatch('common/setError','')
                        }
                    })
                }


            },
            setCutHalf (val){
                this.template.CutHalf = val
                this.system.CutHalf = val
                if(val == 2){
                    if(this.template.ConnectorUni)this.template.ConnectorUni = 2
                    if(this.template.ConnectorUniAmount)this.template.ConnectorUniAmount = 1
                }else{
                    if(this.template.ConnectorUni)this.template.ConnectorUni = 1
                    if(this.template.ConnectorUniAmount)this.template.ConnectorUniAmount = 0
                }
                if(!this.calcCornices.selectParamUser.includes('CutHalf')) this.calcCornices.selectParamUser.push('CutHalf')
                if(this.calcCornices.NumberOfRows == 2){
                    this.calcCornices.currentTemplates[0] = Object.assign({}, this.template)
                    let temp2 = this.calcCornices.currentTemplates[1]
                    this.$store.dispatch('calcCore/setSizes', [{width: temp2.width/10}]).then(()=>{
                        if(temp2.CutHalf)temp2.CutHalf = val
                        if(val == 2){
                            if(temp2.ConnectorUni)temp2.ConnectorUni = val
                            if(temp2.ConnectorUniAmount)temp2.ConnectorUniAmount = 1
                        }else{
                            if(temp2.ConnectorUni)temp2.ConnectorUni = val
                            if(temp2.ConnectorUniAmount)temp2.ConnectorUniAmount = 0
                        }
                        this.$store.dispatch('calcCore/calculate', temp2).then(res => {
                            this.calcCornices.currentTemplates[1] = Object.assign({}, this.template)
                            this.calcCornices.templateRus = res.item_rus
                            this.calcCornices.oldPrice = this.$store.getters['calcCore/prices'].oldPrice
                            this.calcCornices.price = this.$store.getters['calcCore/prices'].price
                            let temp = this.calcCornices.currentTemplates[0];
                            this.$store.dispatch('calcCore/setSizes', [{width: temp.width/10}]).then(()=>{
                                this.$store.dispatch('calcCore/calculate', temp).then(res => {
                                    this.calcCornices.currentTemplates[0] = Object.assign({}, this.template)
                                })
                            })
                        })
                    })
                }else{
                    this.$store.dispatch('calcCore/calculate', this.template)
                }
            },
            setAnglesCount (val){
                this.template.AnglesCount = val
                this.system.AnglesCount = val
                if(val == '2'){
                    this.template.Angle2 = this.template.Angle1
                    this.template.Segment3 = this.template.Segment1
                }else{
                    this.template.Angle2 = 0
                    this.template.Segment3 = 0
                }
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            toNag(){
                if(this.template.ArchType == 4 && this.template.CutHalf){
                    if(this.template.Segment2 >= 2000 && this.calcCornices.currentTemplates[1].subtype !== '10'){
                        return true
                    }else{
                        return false
                    }
                }else{
                    if(this.template.CutHalf && this.template.width >= 2000 && this.template.ArchType != 2 && this.template.ArchType != 3 && this.calcCornices.currentTemplates[1].subtype != '10'){
                        return true
                    }else{
                        return false
                    }
                }

            },
            setConnectorCorner(val){
                this.template.ConnectorCorner = val
                this.$store.dispatch('calcCore/calculate', this.template)
            }
        },
        computed: {
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            sizesArray: function () {
                return this.$store.getters['calcCore/width']
            },
            material () {
                return this.$getMaterials()[0]
            },
            calcCornices () {
                return this.$store.getters['calcCornices/data']
            }
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
        margin-top: 15px
        border-radius: 5px
        padding: 15px
        border-left: 5px solid #df771c
        background: rgba(255,155,0,0.3098)
        font-size: .85rem

    .endBracketBt
        top: 20px

    .toRightDo
        position: absolute
        right: 30px
        top: 60%

    .container p
        margin-top: 0

    .wrapper
        overflow: hidden
        display: flex
        justify-content: center
        align-items: center
        border-radius: 20px

    .button
        background: #ffffff !important
        color: #f9a134 !important
        border: 1px solid #f9a134 !important
        &.active
            background: #ffc77e !important
            color: #ffffff !important

    .pos-left
        text-align: left

    .info_header
        position: absolute
        font-weight: bold
        font-size: 14px

    .system-scheme__link .silentbox-item
        overflow: hidden

</style>
