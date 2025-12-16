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

        <div class="checkbox-group checkbox-group__compl">
            <fieldset
                :key="`color-${color.val}`"
                v-for="color in bandColors"
                class="fieldset-checkbox-img fieldset-checkbox-img_left"
            >
                <input
                    :id="color.alias"
                    :checked="template.BandColor == color.val"
                    @change="setBandColor(color.val)"
                    type="radio"
                    name="bandcolor"
                    class="checkbox"
                >
                <label :for="color.alias">
                    <div class="img" :style="{backgroundImage: 'url(' + publicPath + colorGroupsComplImgs[system.name][color.alias] + ')'}"></div>
                    <span>{{color.name}}</span>
                </label>
            </fieldset>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BandColor',
        props: [
            'systemName',
            'data'
        ],
        data: function () {
            return {
                publicPath: `/_images/constructor/BandColor/${this.systemName}-`,
                showText: false
            }
        },

        methods: {
            setBandColor: function (color) {
                this.template.BandColor = color
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
            colorGroupsComplImgs: function () {
                return this.$store.getters['calcLibs/colorGroupsComplImgs']
            },
            bandColors: function () {
                return this.$getParams('BandColor')
            }
        }
    }
</script>
