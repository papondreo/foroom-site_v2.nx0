<template>
    <div>
        <div class="row"
             v-for="row in params"
             :key="row.alias"
        >
                <div class="col-auto">
                    <p :class="{'font_fatty': row.val === ''}">
                        {{$ucFirst(row.name)}}<template v-if="row.mes">, {{row.mes.replace(/\./g, "")}}</template>:
                    </p>
                </div>
                <div class="col right">
                    <p
                        class="selected-item"
                        :class="{'ttu': parseInt(stepNum) === 0}"
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
                </div>
        </div>
        <hr/>
    </div>
</template>

<script>
    export default {
        name: 'FullInfoRowKarniz',
        props: [
            'data',
            'group',
            'stepNum'
        ],
        
        computed: {
            params: function () {
                if (!this.data || !Array.isArray(this.data.params)) {
                    console.log('params не массив', this.data.params);
                return []
            }
                const key = this.data.fullInfoParams ? 'fullInfoParams' : 'params'
                let params = {}
                if(this.group != 2){
                    params = this.data.params.filter(key => {
                        if (!this.$store.getters['calcCore/templateRus'][key]) {
                            let arrKey = ['sizes', 'ArchType', 'NumberOfRows'];
                            if (this.dataCornices.NumberOfRows == 2) {
                                arrKey.push('group1')
                            }
                            if (arrKey.includes(key)) {
                                return true
                            } else {
                                return false
                            }
                        }else if(key === 'EndBracket' && this.dataCornices.currentTemplates[0].ArchType && this.dataCornices.currentTemplates[0].ArchType != 4){
                            return false
                        }else if(this.$store.getters['calcCore/templateRus'][key].val == 0){
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
                        if (i === 'ArchType'){
                            let at = this.$store.getters['calcCore/templateRus']['ArchType']
                            if(at){
                                at.name = 'Форма карниза'
                                if(at.val === 'Нет')at.val = 'Прямой'
                            }else{
                                at = {
                                    alias: i,
                                    name: 'Форма карниза',
                                    val: 'Прямой'
                                }
                            }
                            return at
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
                        if(i === 'width' && this.dataCornices.currentTemplates[0] && this.dataCornices.currentTemplates[0].ArchType && this.dataCornices.currentTemplates[0].ArchType == 4){
                            return {
                                alias: i,
                                name: 'Габаритная длина изделия',
                                val: this.$store.getters['calcCore/templateRus']['Segment2'].val
                            }
                        }
                        let temp = this.$store.getters['calcCore/templateRus'][i]
                        return temp
                    })
                }else{
                    params = this.data.params.filter(key => {
                        if (!this.dataCornices.templateRus[key]) {
                            let arrKey = ['sizes','group1'];
                            if (arrKey.includes(key)) {
                                return true
                            } else {
                                return false
                            }
                        }else if (['AnglesCount','ArchType'].includes(key)){
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

                        if (i === 'group1'){
                            return {
                                alias: i,
                                name: 'Второй ряд',
                                val: ''
                            }
                        }
                        let temp = this.dataCornices.templateRus[i]
                        return temp
                    })
                }
                return params
            },
            sizes: function () {
                return this.$store.getters['calcCore/sizes']
            },
            cartTemplates:  function () {
                return this.$store.getters['calcCore/cartTemplates'].templates
            },
            dataCornices () {
                return this.$store.getters['calcCornices/data']
            }
        }
    }
</script>

<style lang="sass" scoped>

    .font_fatty
      font-weight: 600

</style>

