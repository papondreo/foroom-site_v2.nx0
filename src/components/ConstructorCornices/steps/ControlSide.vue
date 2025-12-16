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

        <div
            class="row step-content"
            :class="{'_hrz-scroll' : controlSide.length > 2}"
        >
            <div
                v-for="control in controlSide"
                :key="control.val"
                class="col-sm-4 col-6 mb-3"
                :class="{'_full-size' : controlSide.length > 2}"
            >
                <RadioButton
                    name="ControlSide"
                    :param="control"
                    :label="control.name"
                    :imgPath="imgUrl(control.val)"
                    :selectedValue="template.ControlSide"
                    @input="setControlSide(control.val)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ControlSide',
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        props: [
            'systemName',
            'data'
        ],
        data: function () {
            return {
                publicPath: `/_images/constructor/ControlSide/${this.systemName}-`,
                showText: false
            }
        },

        methods: {
            setControlSide: function (type) {
                this.template.ControlSide = type
                this.$store.dispatch('calcCore/calculate', this.template)
            },

            imgUrl: function (val) {
                const attachmentPoint = (this.system.attachmentPoint !== undefined) ? this.system.attachmentPoint + '-' : ''
                return this.publicPath + attachmentPoint + val + '.jpg'
            }
        },

        computed: {
            system: function () {
                return this.$getSystem(this.systemName)
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            controlSide: function () {
                return this.$getParams('ControlSide')
            }
        }
    }
</script>
