<template>
    <div class="col-12 mt-3">
        <div class="row info">
            <div class="col-sm-12">
                <p class="constructor-header__title">Преимущества <span class="ttu">{{system.title}}</span></p>
            </div>
            <div class="col-sm-4 mb-3">
                <img :src="system.img + '.jpg'" alt="">
            </div>
            <div class="col-sm-8" v-if="advantages[system.name]">
                <p
                    v-for="(text, i) of advantages[system.name].description"
                    :key="`row-${i}`"
                >
                    <i class="fa fa-check"></i> {{text}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SystemAdvantages',
        props: [
            'systemName',
            'data'
        ],
        computed: {
            system() {
                return this.$getSystem(this.systemName)
            },
            advantages() {
                return this.$store.getters['calcLibs/advantages']
            }

        }
    }
</script>


<style lang="sass" scoped>
    @import "@/assets/sass/utils/vars"
    /*@import "@/assets/scss/constructor/mount-type-step"*/
</style>
