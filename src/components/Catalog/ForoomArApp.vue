<template>
  <section>
    <div class="foroom-ar-block">
      <div class="foroom-ar-block__content">
        <div class="foroom-ar-block__header">
          <p class="foroom-ar-block__title">Загрузите приложение FOROOM AR 2.0</p>
          <p class="foroom-ar-block__subtitle">AR примерка систем жалюзи на окно в вашем интерьере</p>
        </div>

        <div class="content-wrapper">
          <div class="foroom-ar-block__qr-wrapper">
            <div class="foroom-ar-block__qr">
              <p class="qr-subtitle">Для Android</p>
              <img
                src="/img-new/app-qr-gp.png"
                alt=""
              >
            </div>
            <div class="foroom-ar-block__qr">
              <p class="qr-subtitle">Для iOS</p>
              <img
                src="/img-new/app-qr-as.png"
                class="foroom-ar-block__qr"
                alt=""
              >
            </div>
          </div>

          <p class="text-description">
            <span>Подбирайте материалы онлайн и создавайте идеальное дизайн-решение</span>
            <span>Рассчитайте стоимость изделия и закажите в ближайшем магазине</span>
          </p>

          <div class="app-links">
            <a href="https://apps.apple.com/ru/app/foroom-ar-2-0/id1543856014?platform=iphone" target="_blank">
              <img src="/img-new/ico/appstore.png" alt="">
            </a>
            <a href="https://play.google.com/store/apps/details?id=ru.foroom.arnew&hl=ru&gl=US" target="_blank">
              <img src="/img-new/ico/googleplay.png" alt="">
            </a>
          </div>
        </div>
      </div>

      <div class="foroom-ar-block__image">
        <img src="/img-new/foroom-ar-phone.png" alt="">
      </div>
      <div class="foroom-ar-block__bg"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ForoomArApp extends Vue {}
</script>

<style lang="scss" scoped>
.foroom-ar-block {
  position: relative;
  background: #ffad65;
  border-radius: 5px;
  margin-top: 5%;

  &__content {
    position: relative;
    width: 64%;
    padding: 35px 45px;
    z-index: 99;

    p {
      margin-bottom: 15px;
      color: #f5f5f5;
    }
  }
  &__header {
    margin-bottom: 25px;
  }
  &__title {
    margin-bottom: 5px !important;
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff !important;
  }
  &__subtitle {
    font-size: 21px;
  }

  &__qr-wrapper {
    width: 48%;
    display: flex;
    justify-content: space-between;
  }
  &__qr {
    width: 48%;
    .qr-subtitle {
      width: 100%;
      font-weight: 600;
      margin-bottom: 10px;
    }
    img {
      width: 100%;
    }
  }
  &__image {
    position: absolute;
    width: 23%;
    right: 0;
    bottom: 0;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    z-index: 1;
  }
  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 0;

    &::before {
      content: '';
      position: absolute;
      width: 33%;
      height: 407px;
      right: -91px;
      top: -53px;
      //background: rgba(255, 255, 255, 0.3)
      background: #f8f8f8;
      transform: rotate(20deg);
      border-radius: 25px;
    }
  }
}
.content-wrapper {
  display: flex;
  justify-content: space-between;
  .text-description {
    margin: 0;
    padding-top: 30px;
    padding-left: 35px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    span {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
  p {
    width: 54%;
  }
}
.app-links {
  display: none;
}
@media screen and (max-width: $colLg) {
  .foroom-ar-block__content {
    width: 75%;
  }
  .content-wrapper .text-description span {
    font-size: 15px;
  }
}

@media screen and (max-width: $colMd) {
  .foroom-ar-block__content {
    padding: 20px 25px;
    width: 100%;
  }
  .content-wrapper {
    flex-direction: column;
  }
  .app-links {
    margin-top: 15px;
    display: flex;
    justify-content: space-evenly;
    a {
      max-width: 150px;
      margin: 0 15px;
    }
  }
  .content-wrapper .text-description {
    padding: 0;
    width: 100%;
    align-items: flex-start;
  }
  .foroom-ar-block__qr-wrapper,
  .foroom-ar-block__image,
  .foroom-ar-block__bg {
    display: none;
  }
};
</style>
