<template>
  <main>
    <section class="info-page">
      <div class="container">
        <div class="row mb-5">
          <div class="col-sm-8 mb-5">
            <ui-title tag="h1" class="ui-title-1">
              Откройте свой собственный бизнес<br />
              по продаже жалюзи и рулонных штор
            </ui-title>

            <div class="text-block mt-4 fz-16">
              <p>
                1. Средняя прибыль партнеров в месяц составляет
                <span class="bold fz24">от 300 000</span> рублей.
              </p>
              <p>
                2. Вложения на старте <span class="bold fz24">около 80 000</span> рублей.
              </p>
              <p>3. Выручка с продаж составляет <span class="bold fz24">115%</span>.</p>
              <p>
                4. О нас говорят СМИ. Бренд участвует в телевизионных проектах
                <span class="bold">«Квартирный вопрос»</span> и
                <span class="bold">«Дачный ответ»</span>.
              </p>
              <p>5. Уже открыто более 300 представительств в разных городах России.</p>
            </div>

            <p class="mt-5 ttu fw-400">
              Начать продажи можно как через интернет-магазин, так и арендовать помещение
              в городе.
            </p>
          </div>
          <div class="col-sm-4">
            <ui-img
              src="/img-new/stend.jpg"
              alt=""
              style="max-height: 400px; display: flex"
              class="of-contain"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-sm-8">
            <ui-title tag="h2" class="ui-title-2">
              Преимущества сотрудничества с нами
            </ui-title>

            <div class="text-block">
              <p>
                1. На рынке более 30 лет. Компания пережила все кризисы и успешно
                развивается.
              </p>
              <p>
                2. Крупнейшее автоматизированное производство. Площадь ПСК FOROOM – 9000
                кв.м.
              </p>
              <p>3. Федеральная сеть. Открыть бизнес можно и в небольшом городе.</p>
              <p>4. Выгодная ценовая политика для партнеров.</p>
              <p>5. Высокий спрос на солнцезащитные системы.</p>
              <p>
                6. Поддержка производителя: проведение обучающих семинаров / тренингов.
                Предоставление бесплатно полиграфической продукции. Для размещения рекламы
                создание для партнеров в фирменном стиле дизайн-макетов.
              </p>
              <p>7. Продвинутая экосистема бренда:</p>
              <ul class="pl-3 mb-4">
                <li>
                  <p>
                    • Клиентское мобильное приложение FOROOM-партнер для расчетов,
                    оформления и отслеживания заказов.
                  </p>
                </li>
                <li>
                  <p>
                    • Клиентское мобильное приложение дополненной реальности FOROOM AR
                    2.0, с помощью которого можно увидеть, как выглядят солнцезащитные
                    изделия на окне своего интерьера.
                  </p>
                </li>
                <li>
                  <p>• Готовые IT-инструменты для качественной и удобной работы.</p>
                </li>
              </ul>

              <p>8. Без вступительных и ежемесячных взносов</p>
              <p>
                9. Мы аттестованы и внесены в реестр МИНПРОМТОРГА как производители
                промышленной продукции, произведенной на территории Российской Федерации.
              </p>
              <p>
                10. Мы не осуществляем розничных продаж и не являемся конкурентами своим
                партнерам на розничном рынке.
              </p>
            </div>
          </div>

          <div class="col">
            <ui-img
              src="/_images/app.jpg"
              alt="Приложение Foroom-Партнер"
              class="app-img of-contain"
              style="max-height: 400px; display: flex"
            />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col d-flex justify-content-center">
            <button class="ui-button ttu button" @click="toggleRequestModal()">
              оставить заявку на сотрудничество
            </button>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12">
            <ui-img src="/img-new/factory.jpg" alt="завод FOROOM" />
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-sm-6">
            <ui-img src="/img-new/map.png" alt="завод FOROOM" />
          </div>
          <div class="col">
            <ui-title tag="h2" class="ui-title-2"> Почему мы? </ui-title>

            <div class="text-block">
              <p>
                Огромный завод, специально созданный для производства жалюзи, обеспечен
                современным автоматизированным высокотехнологичным оборудованием, которое
                позволяет выпускать солнцезащитные изделия высокого качества. Благодаря
                минимизации производственных издержек мы реализуем продукцию по низкой
                цене.
              </p>
              <p>Таким образом, мы гарантируем качественные изделия и высокий доход.</p>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12">
            <ui-title tag="h2" class="ui-title-2"> 2 варианта сотрудничества </ui-title>

            <div class="row">
              <div class="col-sm-12 mb-4">
                <ui-title tag="h3" class="ui-title-3 brand-color">
                  Официальный Представитель
                </ui-title>

                <p>
                  Это компания, которая закупает у нас солнцезащитные системы и реализует
                  их конечным покупателям. Процесс сотрудничества строится следующим
                  образом: вы принимаете заказы от покупателей, отправляете их нам на
                  производство, мы изготавливаем продукцию, отгружаем изделия вам, а вы
                  доставляете их покупателям. При этом изделия изготавливаются на заказ
                  для каждого клиента.
                </p>
              </div>

              <div class="col-sm-12">
                <ui-title tag="h3" class="ui-title-3 brand-color">
                  Партнер FOROOM PRO
                </ui-title>

                <p>
                  Это компания, которая закупает у нас комплектующие для производства
                  солнцезащитных систем и самостоятельным изготавливает продукцию под
                  собственным брендом. Партнеры FOROOM PRO также могут реализовывать
                  оригинальные солнцезащитные системы FOROOM, которые не производят
                  самостоятельно, соблюдая ценовую политику бренда FOROOM.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col d-flex justify-content-center">
            <button class="ui-button ttu button" @click="toggleRequestModal()">
              Получить консультацию
            </button>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col">
            <ui-title tag="h2" class="ui-title-2">
              Вы можете продавать жалюзи на маркетплейсах
            </ui-title>

            <ui-title tag="h3" class="ui-title-3 brand-color">
              OZON, WILDBERRIES, Яндекс.Маркет, Сбермаркет
            </ui-title>

            <div class="row">
              <div class="col-sm-6">
                <div class="text-block">
                  <p>
                    Широкий размерный ряд и популярная цветовая гамма готовых изделий для
                    поставок на маркетплейсы.
                  </p>
                  <p>Специальная упаковка, которая подходит для торговых площадок.</p>
                  <p>Быстрая отгрузка с нашего склада.</p>
                  <p>Выгодная закупочная стоимость для получения высокой прибыли.</p>
                </div>
              </div>
              <div class="col-sm-6">
                <ui-img src="/img-new/screens.png" alt="завод FOROOM" />
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col d-flex justify-content-center">
            <button class="ui-button ttu button" @click="toggleRequestModal()">
              Узнать подробнее
            </button>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12">
            <ui-title tag="h2" class="ui-title-2">
              Интервью с официальным представителем FOROOM.<br />Компания "Инстиль"
            </ui-title>
          </div>
          <div class="col-sm-6">
            <p class="mb-3">
              Видеоматериал будет особенно полезен тем, кто планирует посвятить свой
              бизнес солнцезащитным системам и решает в каком направлении двигаться –
              производить изделия самостоятельно или реализовывать готовую продукцию. А
              также тем, кто уже имеет свой розничный магазин жалюзи и хочет с пользой
              использовать площади, находящиеся в их распоряжении.
            </p>

            <p class="mb-2">
              Надежда и Владимир из компании «Инстиль» поделятся своим опытом и расскажут,
              с чего начинали развитие своего бизнеса и чего достигли, начав
              сотрудничество с тм FOROOM. Подробно поведают о преимуществах экосистемы
              FOROOM в развитии розничной и дилерской сетей. Раскроют тему организации
              системы хранения солнцезащитных изделий и поделятся другой полезной
              информацией.
            </p>
          </div>
          <div class="col-sm-6">
            <YoutubeVideo
              :data="{ url: 'https://www.youtube.com/embed/keUvnwKELE4' }"
              class="mb-3"
            />
          </div>
        </div>
      </div>
    </section>

    <ModalContainer v-if="showDealerRequestModal" @close="showDealerRequestModal = false">
      <DealersRequestForm class="form" @close="showDealerRequestModal = false" />
    </ModalContainer>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import YoutubeVideo from "@/components/common/YoutubeVideo.vue";
import DealersRequestForm from "@/components/Forms/DealersRequestForm.vue";
import ModalContainer from "@/components/Modals/ModalContainer.vue";

@Component({
  components: { ModalContainer, YoutubeVideo, DealersRequestForm },
})
export default class PartneramForoomPage extends Vue {
  public showDealerRequestModal = false;
  head() {
    return {
      title:
        "Сотрудничество с заводом жалюзи FOROOM: стать дилером жалюзи оптом от производителя",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Завод жалюзи FOROOM приглашает к сотрудничеству: стать дилером жалюзи оптом напрямую от производителя. Низкие цены. Работаем более 25 лет. Автоматизированное производство. Комфортное дилерство. Звоните!",
        },
      ],
    };
  }

  toggleRequestModal() {
    this.showDealerRequestModal = !this.showDealerRequestModal;
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}
::v-deep .of-contain {
  img {
    object-fit: contain;
  }
}
.text-block {
  &.fz-16 p {
    font-size: 18px;
  }
  p {
    margin-bottom: 10px;
  }
  .pl-3 {
    padding-left: 12px;
  }
  .bold {
    font-weight: 400;
  }
  .fz24 {
    font-size: 24px;
    font-weight: 600;
  }
}
.ttu {
  text-transform: uppercase;
}
button {
  padding: 10px 30px;
  font-weight: 400;
  font-size: 18px;
}
.brand-color {
  text-transform: uppercase;
  font-size: 16px;
}
.fw-400 {
  font-weight: 400;
  font-size: 18px;
}
.brand-color {
  color: #d38f2c;
}
.form {
  z-index: 99999999;
  background: #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 350px;
  height: min-content;
  margin: auto;
}
.sticky {
  position: sticky;
  top: 16px;
}
</style>
