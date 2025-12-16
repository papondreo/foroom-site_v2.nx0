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

        <div class="row _hrz-scroll">
            <div
                v-for="radio in options"
                :key="radio.val"
                class="col-sm-4 col-6 mb-3 _full-size"
            >
                <RadioButton
                    name="flapsCount"
                    :param="radio"
                    :label="radio.title"
                    :imgPath="`${publicPath}${radio.val}.png`"
                    :selectedValue="flapsCount"
                    @input="setFlapsCount(radio.val)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FlapsCount',
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        props: [
            'systemName',
            'data'
        ],

        data: () => ({
            publicPath: `/_images/constructor/FlapsCount/`,
            showText: false
        }),

        methods: {
            setFlapsCount: function (val) {
                this.$store.dispatch('calcCore/setFlapsCount', val)
                this.$store.dispatch('calcCore/setSizes', this.template)

                this.$store.dispatch('calcCore/calculate', this.template)
            },
        },

        computed: {
            options () {
                return this.$store.getters['calcLibs/flaps']
            },
            flapsCount () {
                return this.$store.getters['calcCore/flapsCount']
            },
            template () {
                return this.$store.getters['calcCore/template']
            }
        }
    }
</script>
