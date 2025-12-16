<template>
    <div class="col-12 step step-2" >
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
            <div
                v-for="radio in mountPoint"
                :key="radio.val"
                class="col-sm-4 col-6 _full-size mb-3"
            >
                <RadioButton
                    name="attachmentPoint"
                    :param="radio"
                    :label="radio.name"
                    :imgPath="publicPath + system.lamellaMaterial + radio.val + '.jpg'"
                    :zoom="true"
                    :selectedValue="template.MountPoint"
                    @input="setMountPoint(radio.val)"
                />
            </div>
        </div>

        <div class="row">
            <MountType :systemName="systemName" :data="info" v-if="template.MountType"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VblindsAttachmentPoint',

        components: {
            MountType: () => import('@/components/ConstructorCornices/steps/MountType'),
            RadioButton: () => import('@/components/ConstructorCornices/RadioButton.vue')
        },

        props: [
            'systemName',
            'data'
        ],

        data: function () {
            return {
                publicPath: `/_images/constructor/AttachmentPoint/${this.systemName}-`,
                showText: false,
                info: {
                    name: 'MountType',
                    disableImg: true,
                    title: 'Тип крепления',
                    description: ['Выберите необходимый размер кронштейна для выноса изделия от стены'],
                }
            }
        },

        methods: {
            setMountPoint: function (type) {
                this.template.MountPoint = type
                if (type === 2) {
                    this.template.MountType = 1
                }
                this.$store.dispatch('calcCore/calculate', this.template)
            },

            setMountType: function (type) {
                this.template.MountType = type
                this.$store.dispatch('calcCore/calculate', this.template)
            }
        },
        computed: {
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            systems: function () {
                return this.$store.getters['calcLibs/systems'][this.systemName]
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            mountPoint: function () {
                return this.$getParams('MountPoint')
                //return this.$store.getters.mountPoint
            },
            // mountType: function () {
            //     return this.$store.getters.mountType
            // }
        }

    }
</script>
