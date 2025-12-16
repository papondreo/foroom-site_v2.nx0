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

        <div
            v-if="template.Drive === 1 || !template.Drive"
            class="row step-content"
        >
            <div
                v-for="radio in controlSide"
                :key="`cs-${radio.val}`"
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
                :key="`dt-${radio.val}`"
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
        name: 'DuoControls',
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
                this.checked = val

                this.$store.dispatch('calcCore/setControlType', val)
                this.template.Drive = (val === 'remote') ? this.system.controlParams.remote[0] : 1
                this.$store.dispatch('calcCore/calculate', this.template).then(res => {
                    // console.log(this.$store.getters.params.oParams);
                })
            },

            setControlSide: function (val) {
                this.template.ControlSide = val
                this.$store.dispatch('calcCore/calculate', this.template)
            },

            setDriveType: function (val) {
                this.template.Drive = val
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
            controlType: function () {
                return this.$store.getters['calcCore/controlType']
            },
            controls: function () {
                let controls = this.system.controls.checkboxes
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
            }
        }
    }
</script>

