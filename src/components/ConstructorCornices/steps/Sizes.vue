<template>
    <div class="col-12 step step-3">
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

            <p v-if="Object.keys(system.measure).length">Как сделать замер
                <silent-box
                    v-if="system.measure.photo"
                    class="link"
                    :thumbnail="false"
                    :image="{src: system.measure.photo}"
                >
                    Фото
                </silent-box>
                <silent-box
                    v-if="system.measure.video"
                    class="link"
                    :autoplay="true"
                    :thumbnail="false"
                    :hide-controls="true"
                    :image="{src: 'https://' + system.measure.video}"
                >
                    Видео
                </silent-box>
            </p>
        </header>

        <div class="row step-content mb-0">
            <div class="col-12 mb-3">
                <silent-box
                    class="link system-scheme__link d-block d-md-none"
                    :thumbnail="false"
                    :image="{ src: `${publicPath}-${system.sizesScheme}`}"
                >СХЕМА СИСТЕМЫ</silent-box>
            </div>
            <div class="col-5 d-none d-md-block">
                <img :src="`${publicPath}-${system.sizesScheme}`" alt="">
            </div>
            <div class="col-md-7">
                <div class="row">
                    <div class="col-12">
                        <p class="tac">Введите размеры по замеру</p>
                    </div>

                    <div v-if="flapsCount.length > 1" class="tac mb-3 mt-2 w-100">
                        <button
                            v-for="(f, i) in flapsCount"
                            :key="`flap-${i}`"
                            :class="flap === i ? 'material-tabs__tab_active' : 'material-tabs__tab_disactive'"
                            @click="flap = i"
                            class="material-tabs__tab"
                        >
                            Створка {{i+1}}
                        </button>
                    </div>

                    <div class="col-12">
                        <fieldset class="fieldset-input tac mb-3">
                            <label for="width">Ширина, см</label>
                            <div>
                                <p>от: {{size[flap].minWidth / 10}}</p>
                                <input
                                  @blur="setSize($event)"
                                  v-model="size[flap].width"
                                  type="text"
                                  class="text"
                                  :class="{'invalid': error.width || size[flap].width < size[flap].minWidth / 10 || size[flap].width > size[flap].maxWidth / 10 }"
                                  id="width"
                                >
                                <p>до: {{size[flap].maxWidth / 10}}</p>
                            </div>
                        </fieldset>
                    </div>

                    <div class="col-12">
                        <fieldset class="fieldset-input tac mb-4">
                            <label for="height">Высота, см</label>
                            <div>
                                <p>от: {{size[flap].minHeight / 10}}</p>
                                <input
                                  @blur="setSize($event)"
                                  v-model="size[flap].height"
                                  :class="{'invalid': error.height}"
                                  type="text"
                                  class="text"
                                  id="height"
                                >
                                <p>до: {{size[flap].maxHeight / 10}}</p>
                            </div>
                        </fieldset>
                    </div>

                    <div class="col-12 mt-1">
                        <p class="tac">Габаритные размеры (Ш х В, см):</p>
                        <p class="gab-sizes">{{sizesArray[flap].gab_width}} х {{sizesArray[flap].gab_height}}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sizes',
        props: [
            'systemName',
            'data'
        ],

        data: function () {
            return {
                publicPath: `/_images/constructor/Sizes/${this.systemName}`,
                showText: false,
                size: [{
                    width: '',
                    height: '',
                    minWidth: 0,
                    maxWidth: 0,
                    minHeight: 0,
                    maxHeight: 0
                }],
                error: {
                    width: false,
                    height: false
                },
                flap: 0
            }
        },
        created: function () {
            this.size[0].width = this.template.width / 10
            this.size[0].height = this.template.height / 10

            this.setMinMaxSizes()
        },

        methods: {
            setMinMaxSizes: function () {
                const sizes = this.$setSizeLimits()
                for (let i = 0; i < this.flapsCount.length; i++) {
                    this.size[i] = {...this.sizesArray[i], ...sizes}
                }
            },

            setSize: function (e) {
                const lastChar = e.target.value.slice(-1)

                if (lastChar !== '.' && lastChar !== ',') {
                    this.error.width = false

                    this.size[this.flap].width = this.$parseSize('width') || ''
                    this.size[this.flap].height = this.$parseSize('height') || ''

                    this.$store.dispatch('calcCore/setSizes', this.size)

                    const width = this.size[this.flap].width * 10
                    const height = this.size[this.flap].height * 10

                    this.error.width = width >= this.size[0].minWidth && width <= this.size[0].maxWidth ? false : true
                    this.error.height = height >= this.size[0].minHeight && height <= this.size[0].maxHeight ? false : true

                    if (this.systemName === 'hblinds' && width * height / 1000000 > 6) {
                        this.$store.dispatch('common/setError','Площадь изделия не должна превышать 6 кв.м')
                    } else {
                        if (!this.error.height && !this.error.width) {
                            this.$store.dispatch('common/clearError')

                            const tmpl = Object.assign({}, this.template)
                            tmpl.width = width
                            tmpl.height = height

                            this.$store.dispatch('calcCore/calculate', tmpl)
                        } else {
                          this.$store.dispatch('common/setError','Неправильно введены размеры. Исправьте в соответствии с допустимым интервалом.')
                        }
                    }
                }

            },
        },
        computed: {
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            gabSizes: function () {
                const obj = this.$store.getters['calcCore/params'].oParams
                return {
                    width: obj.width.gab,
                    height: obj.height.gab
                }
            },
            sizesArray: function () {
                return this.$store.getters['calcCore/sizes'].map(size => {
                    return {
                        width: size.width / 10,
                        height: size.height / 10,
                        gab_width: size.gab_width / 10,
                        gab_height: size.gab_height / 10,
                    }
                })
            },
            flapsCount: function () {
                return new Array(this.$store.getters['calcCore/flapsCount'])
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/sizes-step"
</style>
