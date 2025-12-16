<template>
    <div>
        <section class="factory">
            <div class="container">
                <div class="row">
                    <div class="col-md">
                        <div class="about__text">
                            <h1 class="main-title about__main-title">Гарантия</h1>
                            <p class="mb-3">Гарантийный срок службы изделия FOROOM составляет 1 год.</p>
                            <p class="mb-2"><b>Гарантия не распространяется в случае:</b></p>
                            <p class="mb-3 ml-3">Несоблюдения пользователем эксплуатационной документации<br/>
                                Механического повреждения, вызванного внешним ударом или иными воздействиями<br/>
                                Ремонта изделия неуполномоченной сервисной организацией или частным лицом
                            </p>
                            <p class="mb-4">Срок службы изделий при правильной эксплуатации составляет 3 года.</p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-5">

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "WarrantyPage",
        components: {
        },
        head () {
            return {
                title: 'Гарантия на жалюзи, пилиссе, рулонные и римские шторы FOROOM',
                meta: [
                    { hid: 'description', name: 'description', content: 'Гарантия производителя жалюзи, плиссе, рулонных и римских штор FOROOM'}
                ]
            }
        },
        data: () => ({

        })
    }
</script>

<style lang="sass" scoped>
    .factory::before
        top: 50px
    .about__text
        margin-top: 17px
</style>
