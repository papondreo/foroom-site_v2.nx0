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

        <div class="checkbox-group checkbox-group__compl mb25">
            <fieldset
                v-for="color in colors"
                :key="color.alias"
                class="fieldset-checkbox-img fieldset-checkbox-img_left"
            >
                <input
                    :id="color.alias"
                    :checked="template.Color == color.val"
                    @change="setColor(color.val)"
                    type="radio"
                    name="color"
                    class="checkbox"
                >
                <label :for="color.alias">
                    <div class="img" :style="{backgroundImage: 'url(' + publicPath + colorGroupsImgs[system.name][color.alias] + ')'}"></div>
                    <span>{{color.name}}</span>
                </label>
            </fieldset>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Color',
        props: [
            'systemName',
            'data'
        ],
        data: function () {
            return {
                publicPath: `/_images/constructor/Color/${this.systemName}-`,
                showText: false
            }
        },

        methods: {
            setColor: function (color) {
                this.template.Color = color
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
            colors: function () {
                return this.$getParams('Color')
            },
            colorGroupsImgs: function () {
                return this.$store.getters['calcLibs/colorGroupsImgs']
            }
        }
    }
</script>

