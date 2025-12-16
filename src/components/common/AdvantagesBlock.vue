<template>
  <div class="advantages">
    <div class="row">
      <div class="col-md-4 col-sm-6 col-12 mb-4">
        <div class="advantages__item">
          <ui-title
            tag="p"
            class="ui-title-2 ui-text-center"
          >
            Современное<br />технологичное производство
          </ui-title>
          <p class="advantages__text">
            Автоматизированное высокотехнологичное производство, позволяющее
            выпускать более 840 тыс. изделий FOROOM® в год.
          </p>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-4">
        <div class="advantages__item">
          <ui-title
            tag="p"
            class="ui-title-2 ui-text-center"
          >
            Индивидуальное решение<br />по доступной цене
          </ui-title>
          <p class="advantages__text">
            Солнцезащитные изделия FOROOM® производятся на заказ с учетом
            клиентских предпочтений по размерам, способам управления, цветам
            комплектации, выбранным из коллекции материалам.
          </p>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-4">
        <div class="advantages__item">
          <ui-title
            tag="p"
            class="ui-title-2 ui-text-center"
          >
            Заказ<br />из любой точки России
          </ui-title>
          <p class="advantages__text">
            Заказать изделия FOROOM® можно через
            <a
              href="/buy"
              class="link tdu"
            >
              КОНСТРУКТОР
            </a>
            на сайте online или в магазинах официальных Представителей бренда.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class AdvantagesBlock extends Vue {}
</script>

<style lang="scss" scoped>
.advantages {
  margin-bottom: 48px;

  &__item {
    height: 100%;
    padding: 40px 40px 30px;

    border-radius: $img-border-radius;
    //box-shadow: 0 4px 40px rgba(219, 215, 215, 0.3);

    background: linear-gradient(#f5f5f8, #fff);
  }
}
</style>
