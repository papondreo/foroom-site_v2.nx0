<template>
    <div class="col-12">
<!--      <pre>{{ templates.filter(t => t.type === 'introma' || t.type === 'roma') }}</pre>-->
        <header class="constructor-header">
            <p class="constructor-header__title">
                {{data.title}}
                <button
                    v-if="data.description.length"
                    @click="showText = !showText"
                    class="ml-1 show-text"><i class="fa fa-question-circle"></i>
                </button>
            </p>
            <transition name="slide">
                <div v-if="showText">
                    <p
                        v-for="(text, i) in data.description"
                        :key="`desc-${i}`"
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
                    name="attachmentPoint"
                    :param="radio"
                    :label="radio.title"
                    :imgPath="`${publicPath}${radio.val}.jpg`"
                    :selectedValue="system.attachmentPoint"
                    @input="setAttachmentPoint(radio.val)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AttachmentPoint',
        components: {
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },
        props: [
            'systemName',
            'data'
        ],

        data: function () {
            return {
                publicPath: `/_images/constructor/AttachmentPoint/${this.systemName}-`,
                showText: false
            }
        },

        methods: {
            setAttachmentPoint: function (val) {
                if (val === 'wall') {
                    this.$store.dispatch('calcCore/setFlapsCount', 1)
                }
                this.filterTemplates(val)
            },

            filterTemplates: function (val) {
                // console.log(val);
                const ids = this.systems.filter(system => system.attachmentPoint === val).map(sys => sys.name)
                const templates = this.templates.filter(template => template.enabled).filter(template => ids.indexOf(template.type + template.subtype) !== -1)
                const template = this.$findMin(templates, 'price')
                this.$store.dispatch('calcCore/setSizes', template)

                this.$store.dispatch('calcCore/calculate', template).then(res => {
                    // rolo & duo
                    if (this.system.controls) {
                        this.$store.dispatch('calcCore/setControlType', this.system.controls.default)
                    }

                    const material = this.$minPriceMaterial()
                    template.material = material.tid
                    this.$store.dispatch('calcCore/setMaterial', material)

                    this.$store.dispatch('calcCore/calculate', template)
                })
            }
        },

        computed: {
            templates () {
                return this.$store.getters['calcCore/templates']
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
            options () {
                return this.$store.getters['calcLibs/attachmentPoints']
            }
        }
    }
</script>
