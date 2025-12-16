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
            class="row step-content _hrz-scroll"
        >
            <div
                v-for="radio in options"
                :key="radio.val"
                class="col-sm-4 col-6 _full-size mb-3"
            >
                <RadioButton
                    name="MountType"
                    :param="radio"
                    :label="radio.name"
                    :imgPath="imgUrl(radio.val)"
                    :disableImg="data.disableImg"
                    :zoom="true"
                    :selectedValue="template.MountType"
                    @input="setMountType(radio.val)"
                />
            </div>
        </div>

        <!--
        <div class="row step-content">
            <div class="col-12">
                <p
                    v-if="system.attachmentPoint === 'flap' && system.box == 1 && template.MountType == 1"
                    @mouseover="shtapik = true"
                    @mouseleave="shtapik = false"
                    class="info"
                >
                    При выборе данного вида крепления глубина штапика должна быть равна или более 1 см
                    <i class="fa fa-exclamation-circle ml-1"></i>
                    <img v-if="shtapik" class="shtapik" :src="publicPath + 'shtapik.jpg'" alt="">
                </p>
            </div>
        </div>
        -->
    </div>
</template>

<script>
    export default {
        name: 'MountType',
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        data: function () {
            return {
                publicPath: `/_images/constructor/MountType/${this.systemName}-`,
                showText: false,
                shtapik: false,
            }
        },
        props: [
            'systemName',
            'data'
        ],
        methods: {
            setMountType: function (val) {
                this.template.MountType = val
                this.$store.dispatch('calcCore/calculate', this.template)
            },
            imgUrl: function (val) {
                const box = (this.system.box !== undefined) ? this.system.box + '-' : ''
                return this.publicPath + box + val + '.jpg'
            }
        },
        computed: {
            templates: function () {
                return this.$store.getters['calcCore/templates']
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            systems: function () {
                return this.$store.getters['calcLibs/systems'][this.systemName]
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            options: function () {
                // return this.$getParams('MountType')
                const opts = this.$getParams('MountType')
                for (let key in opts) {
                    opts[key].name = opts[key].name.replace(/ *\([^)]*\) */g, "")
                }
                return opts
            }
        }
    }
</script>


<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/mount-type-step"
</style>
