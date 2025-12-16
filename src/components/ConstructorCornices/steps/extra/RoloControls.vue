<template>
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

        <div class="row step-content mb-4">
            <div
                v-for="radio in controls"
                :key="radio.val"
                class="col-sm-4 col-6"
            >
                <template v-if="radio.val !== 'remote'">
                    <RadioButton
                        name="Controls"
                        :param="radio"
                        :label="radio.title"
                        :imgPath="`${publicPath}Controls/${radio.img}`"
                        :selectedValue="controlType"
                        @input="setControl(radio.val)"
                    />
                </template>

                <template v-else>
<!--                    {{template.width}} >= {{params.oParams.width.min}} +300 = {{template.width >= params.oParams.width.min + 300}}-->
                    <RadioButton
                        v-if="template.width >= parseInt(system.minWidth) + 300"
                        name="Controls"
                        :param="radio"
                        :label="radio.title"
                        :imgPath="`${publicPath}Controls/${radio.img}`"
                        :selectedValue="controlType"
                        @input="setControl(radio.val)"
                    />
                </template>


            </div>
        </div>

        <!--header class="constructor-header">
            <p class="constructor-header__title" v-html="template.Drive === 1 || !template.Drive ? 'Сторона управления' : 'Моторизация'"></p>
        </header-->

        <div
            v-if="template.Drive === 1 || !template.Drive"
            class="row step-content"
        >
            <div
                v-for="(radio, i) in controlSide"
                :key="`c-${i}`"
                class="col-sm-4 col-6"
            >
                <RadioButton
                    name="ControlSide"
                    :param="radio"
                    :label="radio.val == 1 ? 'слева' : 'справа'"
                    :imgPath="`${publicPath}ControlSide/${systemName}-${system.attachmentPoint}-${system.box}-${radio.val}.jpg`"
                    :selectedValue="template.ControlSide"
                    @input="setControlSide(radio.val)"
                />
            </div>
        </div>

        <div
            v-if="template.Drive !== 1"
            class="row step-content"
        >
            <div
                v-for="radio in driveTypes"
                :key="`drt-${radio}`"
                class="col-sm-4 col-6"
            >
                <RadioButton
                    name="Drive"
                    :param="{val: radio}"
                    :label="radio == 2 ? 'от сети' : 'от аккумулятора'"
                    :imgPath="`${publicPath}ControlSide/${systemName}-${radio}.jpg`"
                    :selectedValue="template.Drive"
                    @input="setDriveType(radio)"
                />
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'RoloControls',
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        props: [
            'systemName',
            'data'
        ],

        data: function () {
            return {
                publicPath: `/_images/constructor/`,
                showText: false
            }
        },
        methods: {
            setControl: function (val) {
                // console.log(this.system.title, this.controlsLib);
                this.$store.dispatch('calcCore/setControlType', val)

                // костыль для систем на стену без короба
                if (this.system.attachmentPoint === 'wall' && !this.system.box) {
                    if (this.template.width <= 1500) {
                        if (val === 'rope') {
                            // console.log('clic');
                            this.changeSystem('rolo30', val)
                        } else if (val === 'plasticChain') {
                            // console.log('roll');
                            this.changeSystem('rolo4', val)
                        }
                    } else if (this.template.width > 1500 && this.template.width <= 2000) {
                        if (val === 'rope') {
                            // console.log('clic');
                            this.changeSystem('rolo30', val)
                        } else if (val === 'metalChain' || val === 'remote') {
                            // console.log('grande');
                            this.changeSystem('rolo6', val)
                        }
                    } else {
                        this.template.Drive = (val === 'remote') ? this.system.controlParams.remote[0] : 1
                        this.$store.dispatch('calcCore/calculate', this.template)
                    }
                } else {
                    this.template.Drive = (val === 'remote') ? this.system.controlParams.remote[0] : 1
                    this.$store.dispatch('calcCore/calculate', this.template)
                }
            },

            setControlSide: function (val) {
                this.template.ControlSide = val
                this.$store.dispatch('calcCore/calculate', this.template)
            },

            setDriveType: function (val) {
                this.template.Drive = val
                this.$store.dispatch('calcCore/calculate', this.template)
            },

            changeSystem(system, type = false) {
                const template = this.templates.filter(template => template.type + template.subtype === system)[0]

                template.width = this.template.width
                template.height = this.template.height
                template.Drive = (type === 'remote') ? 2 : 1
                this.$store.dispatch('calcCore/calculate', template).then(res => {
                    this.template.Drive = (type === 'remote') ? 2 : 1
                })
            }
        },
        computed: {
            templates: function () {
                return this.$store.getters['calcCore/templates'].filter(template => template.enabled)
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            controlType: function () {
                return this.$store.getters['calcCore/controlType']
            },
            controls: function () {
                let controls = this.system.controls.checkboxes
                // костыль для систем на стену без короба
                if (this.system.attachmentPoint === 'wall' && !this.system.box) {
                    if (this.template.width <= 1500) {
                        // ROPE - добавить когда появится CLIC
                        controls = ['rope', 'plasticChain']
                        // controls = ['plasticChain']
                    }
                    else if (this.template.width > 1500 && this.template.width <= 2000) {
                        // ROPE - добавить когда появится CLIC
                        controls = ['rope', 'metalChain', 'remote']
                        // controls = ['metalChain', 'remote']
                    }
                }
                // костыль для систем на стену без короба
                return this.$store.getters['calcLibs/controls'].filter(control => controls.includes(control.val))
            },
            driveTypes: function () {
                return this.system.controlParams.remote
            },
            controlSide: function () {
                return this.$getParams('ControlSide')
            },
            params: function () {
                return this.$store.getters['calcCore/params']
            },
            controlsLib: function () {
                const controls = {}
                this.$store.getters['calcCore/products'].filter(p => p.ptype === 'rolo').map(prod => {
                    const arr = ['ControlSide', 'ControlDevice', 'Drive']
                    const system = prod.ptype + prod.category
                    controls[system] = {}
                    prod.params.filter(param => arr.includes(param.alias)).map(param => {
                        controls[system][param.alias] = param.options.filter(opt => opt.visible)
                    })
                })
                return controls[this.system.name]
            }
        }
    }
</script>
