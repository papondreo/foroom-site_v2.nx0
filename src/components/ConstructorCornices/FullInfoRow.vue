<template>
    <div>
        <div class="row"
             v-for="row in params"
             :key="row.alias"
        >
            <div class="col-12" v-if="row.alias === 'sizes'">
                <div
                    v-for="(params, i) in row.params"
                    :key="`p${i}`"
                    class="row"
                >
                    <div class="col-12" v-if="row.params.length > 1">
                        <p class="selected-item pull-left bold">{{$ucFirst(row.name)}} {{i+1}}</p>
                    </div>

                    <div class="col-12">
                        <div
                            v-for="param in params"
                            :key="param.alias"
                            class="row"
                        >
                            <div class="col-auto">
                                <p v-if="param.alias !== 'price'">
                                    {{$ucFirst(param.name.toLowerCase())}}<template v-if="param.mes">, {{param.mes.replace(/\./g, "")}}</template>:
                                </p>
                                <p class="price-title" v-else>
                                    {{$ucFirst(param.name.toLowerCase())}}:
                                </p>
                            </div>
                            <div class="col right">
                                <p v-if="param.alias !== 'price'" class="selected-item">
                                    {{param.val / 10}}
                                </p>
                                <p v-else class="price-value selected-item">
                                    {{$priceSet(param.val)}} ₽
                                </p>
                            </div>
                        </div>
                        <hr v-if="i < row.params.length - 1"/>
                    </div>

                </div>
            </div>

            <template v-else>
                <div class="col-auto">
                    <p>
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
            </template>
            <div v-if="row.alias === 'material'" class="col-12 mt-1">
                <p class="min">точный оттенок материала определяется по каталогу</p>
            </div>
        </div>
        <hr/>
    </div>
</template>

<script>
    export default {
        name: 'FullInfoRow',
        props: [
            'data',
            'stepNum'
        ],
        computed: {
            params: function () {
                const key = this.data.fullInfoParams ? 'fullInfoParams' : 'params'
                const params = this.data[key].filter(key => {
                    if (!this.$store.getters['calcCore/templateRus'][key]) {
                        if (key === 'sizes') {
                            return true
                        } else {
                            return false
                            // console.log('notice:', `${this.systemTitle.toUpperCase()} - Undefined key ${key} in step ${this.stepNum}`)
                        }
                    } else {
                        return true
                    }
                }).map(i => {
                    if (i === 'sizes') {
                        const params = this.sizes.map((size, n) => {
                            const keys = Object.keys(size)

                            if (this.sizes.length > 1) {
                                keys.push("price")
                            }

                            return keys.filter(key => this.$store.getters['calcCore/templateRus'][key]).map(key => {
                                return {
                                    alias: key,
                                    name: this.$store.getters['calcCore/templateRus'][key].name,
                                    mes: this.$store.getters['calcCore/templateRus'][key].mes,
                                    val: key !== 'price' ? size[key] : this.cartTemplates[n].price
                                }
                            })
                        })

                        return {
                            alias: i,
                            name: 'Створка ',
                            params
                        }
                    }
                    return this.$store.getters['calcCore/templateRus'][i]
                })

                return params
            },
            sizes: function () {
                return this.$store.getters['calcCore/sizes']
            },
            cartTemplates:  function () {
                return this.$store.getters['calcCore/cartTemplates'].templates
            }
        }
    }
</script>

