<template>
    <div class="col-12 step step-2" >
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

        <div class="row step-content _hrz-scroll">
            <div
                v-for="radio in mountPoint"
                :key="radio.val"
                class="col-sm-4 col-6 _full-size mb-3"
            >
                <RadioButton
                    name="MountPoint"
                    :param="radio"
                    :label="radio.name"
                    :imgPath="publicPath + radio.val + '.png'"
                    :zoom="true"
                    :selectedValue="template.MountPoint"
                    @input="setMountPoint(radio.val)"
                />
            </div>
        </div>

        <div class="row" @click="checkMt()">
            <MountType :systemName="systemName" :data="info" v-if="template.MountType"/>
            <div v-if="template.MountType" class="col-12">
                <header class="constructor-header">
                    <p class="constructor-header__title">
                        Количество кронштейнов
                    </p>
                </header>
                <div class="row">
                    <div class="col-sm-5 col-6 full-size mb-3">
                        <fieldset class="fieldset-input tac mb-3">
                            <div>
                                <p>от: {{size[flap].minMountTypeAmount}} шт</p>
                                <input @keyup="setParams($event)" v-model="size[flap].MountTypeAmount" type="text" class="text" :class="{'invalid': error.MountTypeAmount}" id="MountTypeAmount">
                                <p>до: {{size[flap].maxMountTypeAmount}} шт</p>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-sm-7 col-6 full-size mb-3">
                        <p>Рекомендуемое количество {{size[flap].defaultValue}} шт.</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="template.EndBracket && template.ArchType == 4"
             class="step-content">
            <header class="constructor-header">
                <p class="constructor-header__title">
                    Торцевой кронштейн
                    <button @click="showTextE = !showTextE" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
                </p>
            </header>
            <transition name="slide">
                <div v-if="showTextE">
                    <p>Вы можете добавить в заказ Торцевой кронштейн .Этот кронштейн  рекомендуется устанавливать для фиксации карниза с эркером к стене.</p>
                </div>
            </transition>
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <silent-box
                                class="link system-scheme__link d-block d-md-none"
                                :thumbnail="false"
                                :image="{ src: `/_images/constructor/MountType/karniz-stap.jpg`}"
                            >ПРОСМОТР ТОРЦЕВОЙ КРОНШТЕЙН</silent-box>
                        </div>
                        <div class="col-5 d-none d-md-block">
                            <img :src="`/_images/constructor/MountType/karniz-stap.jpg`" alt="">
                        </div>
                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-12">
                                    <fieldset class="fieldset-input tac mb-3">
                                      <div class="row">
                                        <div class="col-6">
                                          <button class="button"
                                                  v-bind:class="{'active': addEbInfo}"
                                                  v-on:click="setEndBracket(2)">
                                            Добавить в заказ
                                          </button>
                                        </div>
                                        <div class="col-6">
                                          <button class="button"
                                                  v-bind:class="{'active': !addEbInfo}"
                                                  v-on:click="setEndBracket(1)">
                                            Убрать из заказа
                                          </button>
                                        </div>
                                      </div>
                                    </fieldset>
                                </div>
<!--                                <div v-if="template.ArchType && template.ArchType == 4"-->
<!--                                     class="col-12">-->
<!--                                    <p class="tac">-->
<!--                                        Рекомендуется добавить в заказ {{template.AnglesCount}} шт.-->
<!--                                    </p>-->
<!--                                </div>-->
                                <div v-if="addEbInfo"
                                     class="col-12">
                                    <p class="tac attention">
                                        В заказ успешно добавлено {{EndBracketAm}} торцевых  кронштейна!
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'KarnizMountPoint',

        components: {
            MountType: () => import('@/components/ConstructorCornices/steps/extra/MountTypeKarniz'),
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
                publicPath: `/_images/constructor/cornices/MountPoint/${this.systemName}-`,
                showText: false,
                showTextE: false,
                size: [{
                    EndBracket: 0,
                    minEndBracket: 0,
                    maxEndBracket: 10,
                    MountTypeAmount: 0,
                    minMountTypeAmount: 0,
                    maxMountTypeAmount: 10,
                    defaultValue: 0
                }],
                error:{
                    EndBracket: false,
                    MountTypeAmount: false
                },
                info: {
                    name: 'MountType',
                    disableImg: false,
                    title: 'Тип крепления',
                    description: ['Выберите необходимый размер кронштейна для выноса изделия от стены'],
                },
                EndBracketAm: '',
                flap: 0,
                addEbInfo: false,
            }
        },

        methods: {
          parseSize(key) {
            if (this.$store.getters['calcCore/params'].oParams[key].costtype === 1) {
              return Math.round((parseFloat(this.size[this.flap][key].toString().replace(',','.').replace(' ',''))) * 10) / 10 || ''
            } else {
              return Math.round((parseInt(this.size[this.flap][key].toString().replace(',','.').replace(' ',''))) * 10) / 10 || ''
            }
          },
            setMinMaxSizes(){
                let material = this.$store.getters['calcCore/params']['oParams']
                let defaultValue = Math.trunc(this.template.width / 600)
                this.size[0].maxMountTypeAmount = material.MountTypeAmount.max
                this.size[0].minMountTypeAmount = material.MountTypeAmount.min
                this.size[0].defaultValue = defaultValue < parseFloat(this.size[0].minMountTypeAmount) ? this.size[0].minMountTypeAmount : defaultValue
                if(this.size[0].MountTypeAmount == 0) {
                    this.size[0].MountTypeAmount = this.size[0].defaultValue
                }
            },
            setMountPoint: function (type) {
                if(!this.calcCornices.selectParamUser.includes('MountPoint')) this.calcCornices.selectParamUser.push('MountPoint')
                this.template.MountPoint = type
                if (type === 2) {
                    let arrMt = this.$getParams('MountType')
                    if(this.template.ArchType && this.template.ArchType == 4){
                        arrMt = arrMt.filter(key => {
                            let size = parseInt(key.name.match(/\d+/))
                            if(this.template.Segment1 && this.template.Segment1<=(size*10)){
                                return true
                            }else{
                                return false
                            }
                        })
                    }
                    this.template.MountType = arrMt[0].val
                    this.template.MountTypeAmount = this.size[0].defaultValue
                }else{
                    this.template.MountTypeAmount = 0
                }
                this.$store.dispatch('calcCore/calculate', this.template).then(res => {
                    this.calcCornices.currentTemplates[0] = Object.assign({}, this.template)
                    this.setMinMaxSizes()
                })
            },
            checkMt(){
                if(!this.calcCornices.selectParamUser.includes('MountType')) this.calcCornices.selectParamUser.push('MountType')
            },
            setParams (e) {
                const lastChar = e.target.value.slice(-1)
                if (lastChar !== '.' && lastChar !== ',') {
                    this.error.EndBracket = false
                    this.error.MountTypeAmount = false
                    this.size[this.flap].EndBracket = this.template.EndBracket ? this.parseSize('EndBracket') || '0': 0
                    this.size[this.flap].MountTypeAmount = this.template.MountTypeAmount ? this.parseSize('MountTypeAmount') || '0': 0
                    const EndBracket = this.size[this.flap].EndBracket
                    const MountTypeAmount = this.size[this.flap].MountTypeAmount
                    this.error.EndBracket = this.template.EndBracket ? (EndBracket >= this.size[this.flap].minEndBracket && EndBracket <= this.size[this.flap].maxEndBracket ? false : true) : false
                    this.error.MountTypeAmount = this.template.MountTypeAmount ? (MountTypeAmount >= this.size[this.flap].minMountTypeAmount && MountTypeAmount <= this.size[this.flap].maxMountTypeAmount ? false : true) : false
                    if (!this.error.EndBracket && !this.error.MountTypeAmount) {
                        if(!this.calcCornices.selectParamUser.includes('EndBracketAmount')) this.calcCornices.selectParamUser.push('EndBracketAmount')
                        if(!this.calcCornices.selectParamUser.includes('MountTypeAmount')) this.calcCornices.selectParamUser.push('MountTypeAmount')
                        this.$store.dispatch('common/clearError')
                        this.EndBracketAm = EndBracket
                        const tmpl = Object.assign({}, this.template)
                        if(tmpl.EndBracket){
                            if(EndBracket > 0){
                                tmpl.EndBracket = 2
                                tmpl.EndBracketAmount = EndBracket
                                this.addEbInfo = true
                            }else{
                                tmpl.EndBracket = 1
                                this.addEbInfo = false
                            }
                        }
                        if(tmpl.MountTypeAmount){
                                tmpl.MountTypeAmount = MountTypeAmount
                        }
                        this.$store.dispatch('calcCore/calculate', tmpl).then(res =>{
                            this.calcCornices.currentTemplates[0] = Object.assign({}, this.template)
                        })
                    } else {
                        this.$store.dispatch('common/setError','')
                    }
                }
            },
          setEndBracket(e){
            const tmpl = this.template
              if(e == 2){
                if(tmpl.EndBracket)tmpl.EndBracket = 2;
                if(tmpl.EndBracketAmount)tmpl.EndBracketAmount = 2;
                this.EndBracketAm = 2;
                this.addEbInfo = true;
                if(!this.calcCornices.selectParamUser.includes('EndBracketAmount')) this.calcCornices.selectParamUser.push('EndBracketAmount')
              }else{
                this.EndBracketAm = 0;
                tmpl.EndBracket = 1;
                tmpl.EndBracketAmount = 0;
                this.addEbInfo = false;
              }

            this.$store.dispatch('calcCore/calculate', tmpl).then(res =>{
              this.calcCornices.currentTemplates[0] = Object.assign({}, this.template)
            })
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
            brackets: function () {
                return this.$getParams('MountType')
            },
            calcCornices () {
                return this.$store.getters['calcCornices/data']
            },
            // mountType: function () {
            //     return this.$store.getters.mountType
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

    .button
      background: #ffffff !important
      color: #f9a134 !important
      border: 1px solid #f9a134 !important
      &.active
        background: #ffc77e !important
        color: #ffffff !important

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


</style>
