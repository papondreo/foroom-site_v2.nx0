<template>
    <div>
        <section class="factory">
            <div class="container">
                <div class="row">
                    <div class="col-md">
                        <div class="about__text">
                            <h1 class="main-title about__main-title">Доставка</h1>
                            <p class="mb-3">Солнцезащитные системы FOROOM доставляются в большинство регионов России через
                                представительскую сеть производителя. Вы можете получить заказанный товар у Официального
                                Представителя FOROOM в магазине или можете заказать доставку продукции у Официального
                                Представителя FOROOM.</p>
                            <p class="mb-5">Если в Вашем городе нет точки продаж солнцезащитных систем FOROOM, то в разделе «Где
                                купить» можно выбрать Официального Представителя из соседних регионов, который доставит
                                вам заказанные изделия.</p>

                            <div class="attention">
                                <p>Стоимость и условия доставки изделий до магазина официального Представителя или до
                                    покупателя согласовывается с Официальным Представителем производителя
                                    солнцезащитных изделий FOROOM напрямую без участия производителя.</p>
                                <p>Производитель не регламентирует стоимость услуги и не несет прямой
                                    ответственности за качество предоставления сервиса.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-5">
                        <img
                            src="/img-new/delivery.png"
                            alt="Доставка"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "DeliveryPage",
        components: {
        },
        head () {
            return {
                title: 'Доставка жалюзи, плиссе, рулонных и римских шторы FOROOM',
                meta: [
                    { hid: 'description', name: 'description', content: 'Информация по доставке всех видов жалюзи FOROOM на сайте производителя'}
                ]
            }
        },
        data: () => ({
            breadcrumbs: [{
                name: 'Доставка'
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
