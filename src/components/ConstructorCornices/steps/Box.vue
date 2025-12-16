<template>
    <div class="col-12">
        <header class="constructor-header">
            <p class="constructor-header__title">
                {{data.title}}
                <button v-if="data.description.length" @click="showText = !showText" class="ml-1 show-text"><i class="fa fa-question-circle"></i></button>
            </p>
            <transition name="slide">
                <div v-if="showText">
                    <div v-if="showText">
                        <p
                            v-for="(text, i) in data.description"
                            :key="`desc${i}`"
                            class="mb-3"
                        >
                            {{text}}
                        </p>
                    </div>
                </div>
            </transition>
        </header>

        <div class="row step-content _hrz-scroll">
            <!--
            <div
                v-if="system.type !== 'zebra' || system.attachmentPoint !== 'wall' || radio.val !== 0"
                v-for="radio in options"
                :key="radio.val"
                class="col-md-4 col-6 full-size"
            >
            -->
            <div
                v-for="radio in options"
                :key="radio.val"
                class="col-sm-4 col-6 mb-3 _full-size"
            >
                <RadioButton
                    name="box"
                    :param="radio"
                    :label="radio.title"
                    :imgPath="`${publicPath}${system.attachmentPoint}-${radio.val}.jpg`"
                    :selectedValue="system.box"
                    @input="setBox(radio.val)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Box',
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        data: function () {
            return {
                publicPath: `/_images/constructor/Box/${this.systemName}-`,
                showText: false
            }
        },
        props: [
            'systemName',
            'data'
        ],
        methods: {
            setBox: function (val) {
                this.filterTemplates(val)
            },

            filterTemplates: function (val) {
                const ids = this.systems.filter(system => system.attachmentPoint === this.system.attachmentPoint && system.box == val).map(sys => sys.name)
                const templates = this.templates.filter(template => ids.indexOf(template.type + template.subtype) !== -1)
                const template = this.$findMin(templates, 'price')

                this.$store.dispatch('calcCore/calculate', template).then(res => {
                    this.$store.dispatch('calcCore/setControlType', this.system.controls.default)

                    const material = this.$minPriceMaterial()
                    template.material = material.tid

                    this.$store.dispatch('calcCore/setMaterial', material)
                    this.$store.dispatch('calcCore/calculate', template)
                })
            }
        },
        computed: {
            templates () {
                return this.$store.getters['calcCore/templates'].filter(template => template.enabled)
            },
            template () {
                return this.$store.getters['calcCore/template']
            },
            systems () {
                return this.$store.getters['calcLibs/systems'][this.systemName]
            },
            system () {
                return this.$getSystem(this.systemName)
            },
            options: function () {
                return this.$store.getters['calcLibs/box']
            },
        }
    }
</script>


<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/mount-type-step"
</style>
