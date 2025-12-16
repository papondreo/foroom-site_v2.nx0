<template>
    <div>
      <p
        v-if="stepNum"
        class="step-title"
        @click="open = !open"
      >
        Шаг {{ stepNum }}
        <i
          class="fa"
          :class="{'fa-angle-down' : open, 'fa-angle-up' : !open}"
        />
      </p>
      <div :class="{'check-step-block' : stepNum, 'check-step-block_hidden':  !open }">
        <div
            v-for="row in params"
            :key="row.alias"
            v-if="row.alias !== 'rol_width' || sizes.length === 1"
            class="row"
        >
            <div class="col-6">
                <p :class="{'not-selected-item': step < stepNum, 'font_fatty': row.val === ''}">
                    {{$ucFirst(row.name)}}<template v-if="row.mes">,
                         {{row.mes.replace(/\./g, "")}}</template>
                         <span v-if="dataCornices.NumberOfRows == 2 && row.alias == 'name'" class="font_fatty"> первый ряд</span>:
                </p>
            </div>
            <div class="col right">
                <p
                    v-if="!loading"
                    :class="[step < stepNum ? 'not-selected-item' : 'selected-item', {'system-title': parseInt(stepNum) === 0}]"
                >
                    <a
                        v-if="row.alias === 'MaterialCalc'"
                        href="https://sale.foroom.ru/adv_uploads/rotateMaterial.pdf"
                        target="_blank"
                        class="tdu"
                    >
                        <i class="fa fa-info-circle mr-1"></i>
                        {{row.val}}
                    </a>
                    <template v-else>
                        {{row.val}}
                    </template>
                </p>
                <Loader v-else/>
            </div>
            <template v-if="dataCornices.NumberOfRows == 2 && row.alias == 'name'">
                <div class="col-6">
                    <p :class="{'not-selected-item': step < stepNum, 'font_fatty': row.val === ''}">
                        {{$ucFirst('Изделие')}}<span class="font_fatty"> второй ряд</span>:
                    </p>
                </div>
                <div class="col right">
                    <p
                        v-if="!loading"
                        :class="[step < stepNum ? 'not-selected-item' : 'selected-item', {'system-title': parseInt(stepNum) === 0}]"
                    >    
                            {{getName2()}}
                    </p>
                    <Loader v-else/>
                </div>
            </template>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'CheckRowKarniz',
        components: {
            Loader: () => import('../../../components/ConstructorCornices/Loader')
        },
        props: [
            'data',
            'systemTitle',
            'stepNum',
            'group'
        ],
      data: () => ({
        open: false
      }),
      created () {
        this.open = this.stepNum <= this.step
      },
      watch: {
        step: function (val) {
          this.open = this.stepNum <= val
        }
      },
        methods: {
            getName2(){ 
                console.log("this.dataCornices.templateRus.name.val:", this.dataCornices.templateRus.name.val);
                return this.dataCornices.templateRus.name.val
            }
        },
        computed: {
            params: function () {
                if (!this.data || !Array.isArray(this.data.params)) {
                    // console.log('params не массив или undefined', this.data?.params)
                    return []
                }

                    let params = this.data.params.filter(key => {
                    let disParam = ['CutHalf','ConnectorCornerAmount','ConnectorUniAmount','EndBracketAmount', 'MountTypeAmount']
                    if(this.dataCornices.currentTemplates[0]){
                        disParam.push('width')
                    }else{
                        disParam.push('AnglesCount')
                    }
                        if (!this.$store.getters['calcCore/templateRus'][key]) {
                            let arrKey = ['sizes', 'NumberOfRows'];
                            if (arrKey.includes(key)) {
                                return true
                            } else {
                                // console.log('notice:', `${this.systemTitle.toUpperCase()} - Undefined key ${key} in step ${this.stepNum}`)
                            }
                        }else if(key === 'EndBracket'){
                            return false
                        }else if(this.$store.getters['calcCore/templateRus'][key].val == 0 || disParam.includes(key)){
                            return false
                        } else {
                            return true
                        }
                    }).map(i => {
                        if (i === 'sizes') {
                            const params = this.sizes.map((size, i) => {
                                return {
                                    name: i === 0 && this.sizes.length === 1 ? `размеры по замеру (Ш х В, ${this.$store.getters['calcCore/templateRus']['width'].mes.replace(/\./g, "")}):` : `створка ${i+1}:`,
                                    val: `${size.width / 10} x ${size.height / 10}`
                                }
                            })
                            return {
                                alias: i,
                                name: `размеры по замеру (Ш х В, ${this.$store.getters['calcCore/templateRus']['width'].mes.replace(/\./g, "")})`,
                                params
                            }
                        }
                        if (i === 'NumberOfRows'){
                            return {
                                alias: i,
                                name: 'Количество рядов',
                                val: this.dataCornices.NumberOfRows
                            }
                        }
                        if (i === 'group1'){
                            return {
                                alias: i,
                                name: 'Первый ряд',
                                val: ''
                            }
                        }
                        if (i === 'width' && this.dataCornices.currentTemplates[0]) {
                                const segmentValue = this.dataCornices.currentTemplates[0].Segment2;
                                
                                if (!segmentValue || segmentValue === 0) {
                                    console.warn("⚠️ Значение Segment2 отсутствует или равно 0:", segmentValue);
                                    return {
                                        alias: i,
                                        name: 'Габаритная длина изделия, см',
                                        val: "Не задано"
                                    };
                                }
                                
                                return {
                                    alias: i,
                                    name: 'Габаритная длина изделия, см',
                                    val: segmentValue / 10
                                };
                            }
                        let temp = this.$store.getters['calcCore/templateRus'][i]
                        return temp
                    })
                     console.log("Выбранные параметры карниза:", params);
                return params
            },
            loading: function () {
                return this.$store.getters['common/loading']
            },
            step: function () {
            console.log("Текущий шаг:", this.$store.getters['calcSteps/step']);
            return this.$store.getters['calcSteps/step'];
            },
            sizes: function () {
                console.log("Размеры карниза:", this.$store.getters['calcCore/sizes']);
                return this.$store.getters['calcCore/sizes'];
            },
            dataCornices() {
                console.log("Объект карниза:", this.$store.getters['calcCornices/data']);
                return this.$store.getters['calcCornices/data'];
            }
            }
    }
</script>

<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    @import "@/assets/sass/constructor/check"
</style>
