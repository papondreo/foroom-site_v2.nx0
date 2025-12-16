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
                    :hide-controls="true"
                    :thumbnail="false"
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
                    :image="{ src: publicPath + system.attachmentPoint + '-' + system.box + '.jpg'}"
                >СХЕМА СИСТЕМЫ</silent-box>
            </div>
            <div class="col-5 d-none d-md-block">
                <img :src="publicPath + system.attachmentPoint + '-' + system.box + '.jpg'" alt="">
            </div>
            <div class="col-md-7">
                <div class="row">
                    <div class="col-12">
                        <p class="tac">Введите размеры по замеру</p>
                    </div>

                    <template v-if="system.attachmentPoint === 'wall'">
                        <div class="col-12">
                            <fieldset class="fieldset-input tac mb-3">
                                <label for="width">Ширина, см</label>
                                <div>
                                    <p>от: {{size[0].minWidth / 10}}</p>
                                    <input
                                      @blur="setSize()"
                                      v-model="size[0].width"
                                      type="text" class="text"
                                      :class="{'invalid': error.width || (size[0].width < size[0].minWidth / 10 || size[0].width > size[0].maxWidth) }"
                                      id="width"
                                    >
                                    <p>до: {{size[0].maxWidth / 10}}</p>

                                    <p v-if="userMaterial && params.oParams.width.max < size[0].maxWidth" class="sizes-desc">Для материала <b>{{params.oParams.material.mat_name}}</b> до {{params.oParams.width.max / 10}} см</p>
                                </div>
                            </fieldset>
                        </div>

                        <div class="col-12">
                            <fieldset class="fieldset-input tac mb-4">
                                <label for="height">Высота, см</label>
                                <div>
                                    <p>от: {{size[0].minHeight / 10}}</p>
                                    <input
                                      @blur="setSize()"
                                      v-model="size[0].height"
                                      :class="{'invalid': error.height || (size[0].height < size[0].minHeight / 10 || size[0].height > size[0].maxHeight / 10)}"
                                      type="text"
                                      class="text"
                                      id="height"
                                    >
                                    <p>до: {{size[0].maxHeight / 10}}</p>

                                    <p v-if="userMaterial && params.oParams.height.max < size[0].maxHeight" class="sizes-desc">Для материала <b>{{params.oParams.material.mat_name}}</b> до {{params.oParams.height.max / 10}} см</p>
                                </div>
                            </fieldset>
                        </div>
                    </template>

                    <template v-else>
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
                                      @blur="setSize()"
                                      v-model="size[0].width"
                                      type="text"
                                      class="text"
                                      :class="{'invalid': error.width || widthError}"
                                      id="width"
                                    >
                                    <p>до: {{size[flap].maxWidth / 10}}</p>

                                    <p v-if="userMaterial && params.oParams.width.max < size[flap].maxWidth" class="sizes-desc">Для материала <b>{{params.oParams.material.mat_name}}</b> до {{params.oParams.width.max / 10}} см</p>
                                </div>
                            </fieldset>
                        </div>

                        <div class="col-12">
                            <fieldset class="fieldset-input tac mb-4">
                                <label for="height">Высота, см</label>
                                <div>
                                    <p>от: {{system.minHeight / 10}}</p>
                                    <input
                                      @blur="setSize()"
                                      v-model="size[flap].height"
                                      :class="{'invalid': error.height || heightError}"
                                      type="text"
                                      class="text"
                                      id="height"
                                    >
                                    <p>до: {{size[flap].maxHeight / 10}}</p>

                                    <p v-if="userMaterial && params.oParams.height.max < size[flap].maxHeight" class="sizes-desc">Для материала <b>{{params.oParams.material.mat_name}}</b> до {{params.oParams.height.max / 10}} см</p>
                                </div>
                            </fieldset>
                        </div>


                    </template>

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
        name: 'DuoSizes',
        props: [
            'systemName',
            'data'
        ],
        data: function () {
            return {
                publicPath: `/_images/constructor/Sizes/${this.systemName}-`,
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

            setSize: function () {
                this.error.width = false
                this.$store.dispatch('common/clearError')

                this.size[this.flap].width = this.$parseSize('width')
                this.size[this.flap].height = this.$parseSize('height')



                const width = this.size[this.flap].width * 10
                const height = this.size[this.flap].height * 10

                this.error.height = height >= this.size[0].minHeight && height <= this.size[0].maxHeight ? false : true

                if (this.system.attachmentPoint === 'wall' && this.system.box && !this.error.height) {
                    if (width >= 250 && width <= 2000) {
                        this.$store.dispatch('calcCore/setSizes', this.size)
                        this.changeSystem('zebra33')
                    } else if (width > 2000 && width <= 2300) {
                        this.$store.dispatch('calcCore/setSizes', this.size)
                        this.changeSystem('zebra23')
                    } else {
                        this.error.width = true
                        this.$store.dispatch('common/setError','Неправильно введены размеры. Исправьте в соответствии с допустимым интервалом.')
                    }
                } else {
                    this.error.width = width >= this.system.minWidth && width <= this.system.maxWidth ? false : true

                    if (!this.error.height && !this.error.width) {
                        this.$store.dispatch('calcCore/setSizes', this.size)
                        this.template.width = width
                        this.template.height = height

                        this.$store.dispatch('calcCore/calculate', this.template).then(res => {
                            this.$store.dispatch('calcCore/setControlType', this.system.controls.default)
                        }, rej => {
                            const material = this.$minPriceMaterial(true)

                            this.template.material = material.tid

                            this.$store.dispatch('calcCore/setMaterial', material)
                            this.$store.dispatch('calcCore/calculate', this.template)
                            this.$store.dispatch('calcCore/setUserMaterial', null)
                        })
                    } else {
                        this.$store.dispatch('common/setError','Неправильно введены размеры. Исправьте в соответствии с допустимым интервалом.')
                    }
                }
            },

            changeSystem(system) {
                const template = this.templates.find(template => template.type + template.subtype === system)

                this.size[this.flap].width = this.$parseSize('width') || ''
                this.size[this.flap].height = this.$parseSize('height') || ''

                template.width = this.size[this.flap].width * 10
                template.height = this.size[this.flap].height * 10
                template.material = this.template.material

                this.$store.dispatch('calcCore/calculate', template).then(res => {
                    this.$store.dispatch('calcCore/setControlType', this.system.controls.default)

                    this.setMinMaxSizes()
                }, rej => {
                    // console.log('change system', rej)
                })
            }
        },
        computed: {
            templates: function () {
                return this.$store.getters['calcCore/templates'].filter(template => template.enabled)
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            system: function () {
                return this.$store.getters['calcLibs/systems'].duo.find(system => system.name === this.template.type + this.template.subtype)
            },
            params: function () {
                return this.$store.getters['calcCore/params']
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
            sizes: function () {
                const obj = this.$store.getters['calcCore/params'].oParams
                return {
                    gab: {
                        width: Math.round(obj.width.gab * 100) / 100,
                        height: Math.round(obj.height.gab * 100) / 100,
                    }
                }
            },
            userMaterial: function () {
                return this.$store.getters['calcCore/userMaterial']
            },
            flapsCount: function () {
                return new Array(this.$store.getters['calcCore/flapsCount'])
            },
            errors: function () {
                return this.$store.getters['common/error']
            },
            widthError () {
              return this.size[this.flap].width < this.size[this.flap].minWidth / 10 || this.size[this.flap].width > this.size[this.flap].maxWidth / 10
            },
            heightError () {
                return this.size[this.flap].height < this.system.minHeight / 10 || this.size[this.flap].height > this.size[this.flap].maxHeight / 10
            }
        }
    }
</script>


<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/sizes-step"
</style>
