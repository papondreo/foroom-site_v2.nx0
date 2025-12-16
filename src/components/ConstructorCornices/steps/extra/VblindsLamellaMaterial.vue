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

        <div class="row step-content _hrz-scroll">
            <div class="col-sm-4 col-6 _full-size">
                <RadioButton
                    name="lamellaMaterial"
                    :param="{val: 'cloth'}"
                    label="ткань"
                    :imgPath="`${publicPath}fabric.jpg`"
                    :selectedValue="system.lamellaMaterial"
                    @input="setLamellaMaterial('cloth')"
                />
            </div>

            <div class="col-sm-4 col-6 _full-size">
                <RadioButton
                    name="lamellaMaterial"
                    :param="{val: 'plastic'}"
                    label="пластик"
                    :imgPath="`${publicPath}plastic.jpg`"
                    :selectedValue="system.lamellaMaterial"
                    @input="setLamellaMaterial('plastic')"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VblindsLamellaMaterial',
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        props: [
            'systemName',
            'data'
        ],

        data: function () {
            return {
                publicPath: `/_images/constructor/${this.systemName}-`,
                showText: false
            }
        },

        methods: {
            setLamellaMaterial: function (type) {
                this.filterTemplates(type)
            },

            filterTemplates: function (val) {
                const ids = this.systems.filter(system => system.lamellaMaterial === val).map(sys => sys.name)
                const templates = this.templates.filter(template => ids.indexOf(template.type + template.subtype) !== -1)
                const template = this.$findMin(templates, 'price')

                this.$store.dispatch('calcCore/calculate', template).then(res => {
                    const material = this.$minPriceMaterial()
                    template.material = material.tid
                    this.$store.dispatch('calcCore/setMaterial', material)

                    this.$store.dispatch('calcCore/calculate', template)
                })
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
            }
        }
    }
</script>

