<template>
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1 ui-text-uppercase"
    >
      FOROOM ПРИГЛАШАЕТ В ГОСТИ!
    </ui-title>
    <div class="row ui-mb-4">
      <div class="col-12">
        <p>Уважаемые коллеги и партнеры!</p>
        <p>Многие из вас, отправляясь на строительные и дизайнерские выставки в Москве, стремятся провести время с максимальной пользой и выгодой для развития бизнеса. Чтобы сделать ваш визит в столицу более продуктивным, мы рады пригласить вас на экскурсию в производственно-складской комплекс FOROOM — лидера российского рынка солнцезащитных изделий.</p>
        <p>FOROOM — это более 30 лет опыта, высокотехнологичный завод площадью 9000 м², инновационные производственные технологии и тысячи довольных заказчиков и представителей по всей России.</p>
      </div>
    </div>
    <button class="request-btn" @click="toggleRequestModal()">Предварительная регистрация</button>

    <ui-title
      tag="h2"
      class="ui-title-2 ui-text-uppercase"
    >
      Что вас ждет на экскурсии?
    </ui-title>
    <div class="row ui-mb-5">
      <div class="col-12">
        <p>1. Знакомство с полным ассортиментом продукции</p>
        <p>- Вы сможете вживую увидеть, как работают все модели солнцезащитных систем, а также ознакомитесь с каталогами
          тканей для штор и ламелей для жалюзи.</p>
        <p>2. Экскурсия на крупнейшее производство</p>
        <p>- Вы увидите полный цикл создания солнцезащитных систем — от получения заказа до упаковки изделия.</p>
        <p> - Познакомитесь с новейшими производственными технологиями, которые позволяют нам
          оставаться одним из лидеров рынка.
        </p>
        <p>3. Живое общение с экспертами
        </p>
        <p> - Встреча с ведущими профессионалами отрасли, которые поделятся своими наработками и
          свежими идеями для развития вашего бизнеса.
        </p>
        <p> - Возможность задать вопросы и получить индивидуальные рекомендации.
        </p>
        <p>4. Демонстрация трендовых новинок
        </p>
        <p> - Узнайте о последних трендах в области солнцезащитных систем, чтобы всегда быть на шаг
          впереди конкурентов.
        </p>
        <p>- Получите подробную информацию о наших новинках для премиальных сегментов рынка:
        </p>
        <p>• Рулонные шторы с электроприводом для офисов и других помещений в сегменте HoReCa
        </p>
        <p>• Горизонтальные деревянные жалюзи с дистанционным управлением
        </p>
        <p>• Умный карниз для штор с возможностью управления через пульт, приложение или голосовой
          помощник

        </p>
      </div>
    </div>
    <div class="row ui-mb-5">
      <div class="col-12">
        <p>Мы уверены, что посещение
          производственно-складского комплекса FOROOM станет важным шагом в развитии вашего бизнеса и откроет перед вами
          новые горизонты.
        </p>
        <p>FOROOM — ваш надежный партнер в мире солнцезащитных систем.
        </p>
        <p>Дата: 1–4 апреля 2025 года
        </p>
        <p>Мы находимся по адресу: Московская обл., г.о. Раменский, с. Михайловская Слобода, ул.
          Шоссейная, строение 55 в 30 минутах езды от МКАД.
        </p>
      </div>
    </div>
    <ModalContainer v-if="showDealerRequestModal" @close="showDealerRequestModal = false">
      <DealersRequestForm class="form" @close="showDealerRequestModal = false" />
    </ModalContainer>
    <button class="request-btn" @click="toggleRequestModal()">Предварительная регистрация</button>
    <div class="mapContainer">
      <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/firma_kalita/146354444766/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Фирма Калита</a><a href="https://yandex.ru/maps/1/moscow-and-moscow-oblast/category/blinds_and_roller_blinds/184107989/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Жалюзи и рулонные шторы в Москве и Московской области</a><a href="https://yandex.ru/maps/1/moscow-and-moscow-oblast/category/wholesale_company/184108065/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Оптовая компания в Москве и Московской области</a><iframe src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=38.087930%2C55.534750&mode=search&oid=146354444766&ol=biz&z=18" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
    </div>
  </main>
</template>

<script lang="ts">

import { Vue, Component } from "nuxt-property-decorator";
import DealersRequestForm from "@/components/Forms/DealersReqToForoomForm.vue";
import ModalContainer from "@/components/Modals/ModalContainer.vue";

@Component({
  components: { ModalContainer, DealersRequestForm },
})
export default class dayOpenForoom25Page extends Vue {
  public showDealerRequestModal = false;

  public showImage = false;
  public activeShowImage = '';
  head() {
    return {
      title:
          "Приглашаем посетить Крупнейший завод по производству Штор",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
              "Станьте партнером производителя рулонных штор и жалюзи. Экскурсия по производству",
        },
      ],
    };
  }

  async mounted() {

  }

  toggleRequestModal() {
    this.showDealerRequestModal = !this.showDealerRequestModal;
    this.$saleForoomCounter("NF_openDayClickForm");
    this.$yandexMetrika.reachGoal("NF_openDayClickForm");
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
  p {
    font-size: 20px;
    font-weight: 400;
  }
}

.request-btn{
  margin-bottom: 3rem;
  padding: 10px 30px;
  width: 100%;
  border: 2px solid #fff;
  border-radius: 8px;
  text-transform: uppercase;
  color: #fff;
  font-size: 24px;
  background-color: rgba(211, 143, 44, 0.9);
  &:hover{
    background-color: #e38839;
  }
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

.mapContainer{
  gap: 10px;

  iframe{
    width: 100%;
    min-height: 600px;
  }
}

</style>
