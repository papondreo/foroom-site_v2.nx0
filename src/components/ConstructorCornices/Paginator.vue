<template>
    <div class="row" v-if="system">
        <div class="col-sm-12 paginator">
            <button
                v-for="(st, i) in stepsMap"
                :key="`step-${i}`"
                v-if="st.inPaginator"
                @click="changeStep(i)"
                :class="{'completed': step >= i, 'action': action && st.actionLabel, 'disabled': i <= startStep}"
                :disabled="loading || error || i <= startStep"
                class="paginator__button"
                v-tooltip.bottom="{
                    content: st.tooltip,
                    delay: 150,
                    offset: 5,
                    class: 'paginator-tooltip'
                }"
            >
                <div>
                    <p class="num">{{i}}</p>
                    <p v-if="action && st.actionLabel" class="perc">{{action}}</p>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
    import Tooltip from 'vue-directive-tooltip';
    import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css';
    import Vue from "vue";

    export default {
        name: 'Paginator',
        props: [
            'systemName'
        ],
        data: () => ({
          hideFirstSteps: false, // скрытие первых шагов конструктора, при переходе в него с конкретного изделия каталога
          startStep: 0, // номер шага, до которого надо скрыть
          publicPath: process.env.BASE_URL,

        }),
        created() {
            Vue.use(Tooltip, {
                delay: 300,
                placement: 'left',
                class: 'tooltip-red',
                triggers: ['hover'],
                offset: 0
            });

          const { sizes, template } = this.$route.query
          if (sizes && template) {
            this.startStep = this.step - 1
          }

        },
        methods: {
            changeStep (num) {
                if (this.step !== num) {
                    this.$store.dispatch('common/setComponentLoading', true)
                    this.$store.dispatch('calcSteps/setStep', num)
                    setTimeout(() => {
                        this.$store.dispatch('common/setComponentLoading', false)
                    }, 700)
                }
            }
        },
        computed: {
            step: function () {
                return this.$store.getters['calcSteps/step']
            },
            loading: function () {
                return this.$store.getters['common/loading']
            },
            error: function () {
                return this.$store.getters['common/error']
            },
            system: function () {
                return this.$getSystem(this.systemName)
            },
            template: function () {
                return this.$store.getters['calcCore/template']
            },
            stepsMap: function () {
                return this.$store.getters['calcSteps/stepsMap'][this.system.productId]
            },
            action: function () {
                const materials = this.$getMaterials()
                const percents = []
                materials.filter(material => material.isCurrentAction).map(material => {
                    if (!percents.includes(material.currentActionInfo.perc)) {
                        percents.push(material.currentActionInfo.perc)
                    }
                })
                if (percents.length) {
                    percents.sort((a, b) => a - b)
                    if (percents.length > 1) {
                        return '-' + parseInt(percents[0] * 100) + '% -' + parseInt(percents[percents.length-1] * 100) + '%'
                    }
                    return '-' + parseInt(percents[0] * 100) + '%'
                }
                return false
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/constructor/paginator"
    .paginator__button.disabled
      background: #ddd
      border-color: #ddd
      cursor: default
      pointer-events: none
</style>
