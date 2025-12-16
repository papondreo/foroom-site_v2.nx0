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
                        class="mb-3 position-relative"
                    >
                        {{text}}
                        <i class="fa fa-exclamation-circle ml-1" @mouseover="glazingBead = true" @mouseleave="glazingBead = false"></i>
                        <img v-if="glazingBead" class="shtapik" :src="'/_images/constructor/MountType/rolo-shtapik.jpg'" alt="">
                    </p>
                </div>
            </transition>

            <!--
            <p class="constructor-header__title position-relative">{{data.title}}
                <i class="fa fa-question-circle" @mouseover="glazingBead = true" @mouseleave="glazingBead = false"></i>
                <img v-if="glazingBead" class="shtapik" :src="'/_images/constructor/MountType/rolo-shtapik.jpg'" alt="">
            </p>
            -->


        </header>

        <div class="row mb-3">
            <div class="col-12 col-sm-6 col-md-4">
                <fieldset class="fieldset__radio">
                    <input name="step3-2" type="radio" class="checkbox" id="shtap-width2" @change="changeSystem('rolo2')" :checked="system.name === 'rolo2'">
                    <label for="shtap-width2" :class="{'checked' : system.name === 'rolo2'}">1 см и более</label>
                </fieldset>
            </div>
            <div class="col-12 col-sm-6 col-md-4" v-if="parseInt(template.MountType) === 2">
                <fieldset class="fieldset__radio">
                    <input name="step3-2" type="radio" class="checkbox" id="shtap-width" @change="changeSystem('rolo3')" :checked="system.name === 'rolo3'">
                    <label for="shtap-width" :class="{'checked' : system.name === 'rolo3'}">менее 1 см</label>
                </fieldset>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GlazingBead",
        data: () => ({
            glazingBead: true,
            showText: false
        }),
        props: [
            'systemName',
            'data'
        ],
        methods: {
            findTemplate (system) {
                const template = this.templates.find(template => template.type + template.subtype === system)
                return template ? template : false
            },

            changeSystem (system) {
                this.$store.dispatch('common/clearError')

                const template = this.findTemplate(system)
                if (template) {
                    const mountType = this.template.MountType
                    template.MountType = mountType

                    this.$store.dispatch('calcCore/calculate', template).then(
                        res => {
                            const template = res.item
                            this.$set(this.template, template)
                            this.$store.dispatch('calcCore/setControlType', this.system.controls.default)
                        },
                        rej => {

                        })
                }

            }
        },
        computed: {
            templates: function () {
                return this.$store.getters['calcCore/templates'].filter(template => template.enabled)
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            systems: function () {
                return this.$store.getters['calcLibs/systems'][this.systemName]
            },
            system: function () {
                return this.systems.find(system => system.name === this.template.type + this.template.subtype)
            },
        }
    }
</script>

<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/sizes-step"

    .shtapik
        top: -185px
        left: 50px
    label
        border: 2px solid #eeeeee
        &:hover
            border-color: rgba($brandMainColorLight, 0.4)
            transform: none !important
            box-shadow: none !important
    label.checked
        border-color: rgba($brandMainColorLight, 0.7)
</style>
