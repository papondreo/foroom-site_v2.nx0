<template>
    <div>
        <section class="factory">
            <div class="container">
                <div class="row">
                    <div class="col-md">
                        <div class="about__text">
                            <h1 class="main-title about__main-title">Установка рулонных штор на пластиковые окна</h1>
                            <p class="mb-3">Произвести замер и установку солнцезащитных изделий FOROOM можно самостоятельно легко и быстро. На
                                странице каждой системы есть подробная инструкция, как это сделать. </p>
                            <p class="mb-5">Также Вы можете обратиться к Официальному Представителю FOROOM с целью получения профессиональных услуг
                                по замеру и монтажу солнцезащитных систем FOROOM.</p>

                            <div class="attention">
                                <p>Стоимость замера и установки согласовывается с Официальным Представителем FOROOM напрямую без
                                    участия производителя. В большинстве случаев услуги по замеру бесплатны.</p>
                                <p>Производитель не регламентирует стоимость услуги и не несет прямой
                                    ответственности за качество предоставления сервиса.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-5">
                        <img
                            src="/img-new/dimension.jpg"
                            alt="Замер и установка"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "InstallationPage",
        head () {
            return {
                title: 'Установка рулонных штор на пластиковые окна - заказать в интернет-магазине FOROOM',
                meta: [
                    { hid: 'description', name: 'description', content: 'Установка рулонных штор на пластиковые окна - заказать по доступной цене в интернет-магазине FOROOM. Опытные мастера. Замерим перед вашим заказом. Быстрое производство. Оперативная доставка. Оформляйте заказ онлайн!'}
                ]
            }
        },
        data: () => ({
            breadcrumbs: [{
                name: 'Установка рулонных штор на пластиковые окна'
            }]
        })
    }
</script>

<style lang="sass" scoped>
    .factory::before
        top: 50px
    .about__text
        margin-top: 17px
    .attention
        border-radius: 5px
        padding: 15px
        border-left: 5px solid #d38f2c
        background: #ff9b004f
        font-size: .85rem
        p
            margin-bottom: 5px
            &:last-of-type
                margin-bottom: 0
    /deep/
        .factory img
            border-radius: 5px
</style>
