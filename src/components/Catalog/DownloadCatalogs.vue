<template>
  <section class="ui-mt-5">
    <ui-title
      tag="h2"
      class="ui-title-1"
    >
      Скачать каталоги солнцезащитных систем FOROOM
    </ui-title>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-6 overflow-x-hidden">
        <a href="/_downloads/cat_gp_electronic_version25.pdf" target="_blank" class="card card_textures">
          <div class="card__img">
            <img
              src="/img-new/catalog/catalog-cover25.png"
              alt="Каталог готовой продукции FOROOM"
            />
          </div>
          <footer class="card__footer">
            <h3 class="item-card__title">Каталог готовой продукции</h3>
            <p class="item-card__description mt-3"><span><i class="fa fa-file-pdf-o"></i></span></p>
            <div class="card__button">
              <span>20,5 Mb</span>
              <i class="fa fa-download" aria-hidden="true"></i>
            </div>
          </footer>
        </a>
      </div>

      <div class="col-lg-3 col-md-4 col-sm-6 col-6 overflow-x-hidden">
        <a href="/_downloads/cat_motors_version25.pdf" target="_blank" class="card card_textures">
          <div class="card__img">
            <img
              src="/img-new/catalog/motors-cover25.png"
              alt="моторизированные системы FOROOM"
            />
          </div>
          <footer class="card__footer">
            <h3 class="item-card__title">Каталог моторизированные системы</h3>
            <p class="item-card__description mt-3"><span><i class="fa fa-file-pdf-o"></i></span></p>
            <div class="card__button">
              <span>10,6 Mb</span>
              <i class="fa fa-download" aria-hidden="true"></i>
            </div>
          </footer>
        </a>
      </div>

      <div class="col-lg-6 about__text mb-3">
        <p class="mb-2">
          Вы можете скачать в формате pdf каталог готовой продукции FOROOM с подробным описанием каждой системы, а также каталог систем FOROOM с электроприводом.
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class DownloadCatalogs extends Vue {}
</script>

<style lang="scss" scoped>
.product {
  width: 20% !important;
  margin-bottom: 36px;
}
.card {
  display: block;
  margin-bottom: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;

  &__img {
    border-radius: 5px;
    position: relative;
    padding-bottom: 80%;
    background: #ffffff;
    img {
      position: absolute;
      object-fit: contain;
      object-position: center;
      transition: 1s ease-in-out;
    }
  }
  &__button {
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    justify-content: right;
    align-items: center;
    width: 70px;
    height: 70px;
    right: -25px;
    bottom: -15px;
    border-radius: 40px;
    background: #f9a134;
    color: #fff;
    border: 10px solid #f8f8f8;
    box-sizing: border-box;
    overflow: hidden;
    transition: .4s ease-in-out;
    z-index: 3;
    span {
      font-size: 15px;
      margin-right: 5px;
      white-space: nowrap;
    }
    i {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      width: 50px;
      height: 40px;
      transition: .4s ease-in-out;
    }
  }
  &__footer {
    position: relative;
    padding: 15px;
  }
  &:hover {
    .card__button {
      background: #ff920c;
      width: 150px;
      i {
        padding-top: 5px;
      }
    }
  }
}
.about__text {
  margin-top: 24px;
  font-size: 17px;
}
</style>
