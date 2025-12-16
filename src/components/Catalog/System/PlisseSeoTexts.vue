<template>
  <div class="col-12">
<!--
    <ui-title
      tag="h2"
      class="ui-title-2"
    >
      Ассортимент продукции FOROOM. Часто задаваемые вопросы
    </ui-title>

    <p class="mb-2">На данный момент в ассортименте нашей компании представлены солнцезащитные
      системы и системы профильных карнизов. В зависимости от назначения продукция
      делится на такие группы:</p>

    <p class="mb-3">
      - на пластиковые окна<br />
      - для полного перекрытия оконного проема
    </p>

    <p class="mb-5">
      Ознакомиться с полным ассортиментом продукции и сравнить системы можно на
      нашем сайте в разделе «Каталог», купить шторы плиссе в Москве или любом другом
      городе России можно либо с помощью удобного «Конструктора» на сайте, либо в
      торговых точках продаж, которые представлены во многих городах. А найти
      ближайший к вам магазин официального Представителя можно на карте в разделе
      <nuxt-link
        to="/gdekupit"
        class="ui-color-brand-orange__light ui-link">
        «Где купить»
      </nuxt-link>.
    </p>
-->
    <ui-title
      tag="h3"
      class="ui-title-2 hide-on-click"
      @click.native="toggleBlock(0)"
    >
      КАК ВЫБРАТЬ ШТОРЫ ПЛИССЕ
      <i
        class="fa"
        :class="`fa-angle-${blocks[0] ? 'down' : 'up'}`"
      />
    </ui-title>
    <p
      class="mb-5"
      v-if="blocks[0]"
    >
      Шторы плиссе INTEGRA PLISSE устанавливаются на оконные створки, поэтому вам
      остается выбрать всего лишь способ крепления и ткань. Вы можете выбрать установку
      на мансардные окна с углом наклона не больше 60 градусов.
    </p>
    <ui-title
      tag="h3"
      class="ui-title-2 hide-on-click"
      @click.native="toggleBlock(1)"
    >
      СПОСОБЫ КРЕПЛЕНИЯ ШТОР ПЛИССЕ
      <i
        class="fa"
        :class="`fa-angle-${blocks[1] ? 'down' : 'up'}`"
      />
    </ui-title>
    <p class="mb-5" v-if="blocks[1]">
      Шторы плиссе крепятся на саморезы или на навесные пластиковые кронштейны без
      сверления. При заказе изделия необходимо выбрать предпочитаемый способ
      крепления.
    </p>
    <ui-title
      tag="h3"
      class="ui-title-2 hide-on-click"
      @click.native="toggleBlock(2)"
    >
      ФУНКЦИОНАЛЬНЫЕ ОТЛИЧИЯ ТКАНЕЙ ДЛЯ ШТОР ПЛИССЕ
      <i
        class="fa"
        :class="`fa-angle-${blocks[2] ? 'down' : 'up'}`"
      />
    </ui-title>
    <p class="mb-5" v-if="blocks[2]">
      Ткани для штор плиссе имеют разную светопроницаемость, от которой зависит
      уровень света в помещении. Материал blackout полностью не пропускает свет,
      благодаря чему пространство можно затемнить полностью.
    </p>
    <ui-title
      tag="h3"
      class="ui-title-2 hide-on-click"
      @click.native="toggleBlock(3)"
    >
      УХОД, ИЛИ КАК СТИРАТЬ ШТОРЫ ПЛИССЕ
      <i
        class="fa"
        :class="`fa-angle-${blocks[3] ? 'down' : 'up'}`"
      />
    </ui-title>
    <template v-if="blocks[3]">
      <p class="mb-2">
        Плиссированная ткань изделий легко чистится. Материал для INTEGRA PLISSE
        разделяется на тот, который можно стирать и который можно только протирать
        влажной губкой.
      </p>

      <p class="mb-2">Инструкция для изделий с тканями, которые можно стирать при температуре 30:</p>
      <p class="mb-5">
        - Опустите штору в мыльный раствор с температурой не выше 30С.<br />
        - Хорошо прополощите, дайте воде стечь.<br />
        - Протрите мягкой губкой. Со шторы не должно капать.<br />
        - После этого подвесьте ее влажной и дайте высохнуть в сложенном состоянии.<br />
        - В процессе сушки не забывайте открывать и закрывать штору, чтобы складки не
        склеивались.<br />
        - Гладить изделие не нужно.<br />
        - Используйте штору через 12 часов.<br />
      </p>
    </template>

    <ui-title
      tag="h3"
      class="ui-title-2 hide-on-click"
      @click.native="toggleBlock(4)"
    >
      КАЧЕСТВО И ДОЛГОВЕЧНОСТЬ
      <i
        class="fa"
        :class="`fa-angle-${blocks[4] ? 'down' : 'up'}`"
      />
    </ui-title>
    <p class="mb-3" v-if="blocks[4]">
      Все изделия INTEGRA PLISSE перед отправкой покупателю проверяются службой
      контроля качества на работоспособность и отсутствие внешних дефектов. Поэтому мы
      уверены в том, что покупатель получит качественную продукцию высокого уровня,
      которая прослужит длительное время.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PlisseSeoTexts extends Vue {
  public blocks = [false, false, false, false, false]

  toggleBlock(n) {
    this.$set(this.blocks, n, !this.blocks[n])
  }
}
</script>

<style lang="scss" scoped>
::v-deep .img {
  width: 100%;
  height: 100%;
  display: flex;

  img {
    vertical-align: middle;
    height: 350px;
    border-radius: $img-border-radius;
    object-fit: cover;
    object-position: center;
  }
}
.hide-on-click {
  transition: .3s ease-out;
  i {
    transition: .3s ease-out;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    i {
      color: $brand-orange-light;
      transform: rotate(180deg);
    }
  }
}
</style>
