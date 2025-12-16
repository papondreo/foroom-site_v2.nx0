<template>
  <div class="header-middle">
    <div class="col-6 col-sm-5 col-md-4 col-sm col-lg-3 col-xl logo-container">
      <nuxt-link
        to="/"
        class="logo"
      >
        <img
          src="/img-new/brand/logo.svg"
          alt="производитель солнцезащитных систем"
          title="Солнцезащитные системы от производителя FOROOM"
        />
      </nuxt-link>
    </div>

    <div class="col-6 col-sm-10 col-xl-6 col-md-4 col-lg-5 d-none d-lg-block">
      <div class="brand-tagline">
        <p class="d-block d-sm-none d-md-none d-lg-block col-lg-4 d-xl-block slogan">ваши окна<br />в полной комплектации</p>
        <search-field class="d-none d-sm-block"/>
        <img
          src="/img-new/brand/brand-lines.svg"
          alt=""
        />
      </div>
    </div>

    <nav class="col-6 col-sm-7 col-md-8 col-xl-4 col-lg-4 header-main-links">
      <nuxt-link to="/sale-points" class="d-sm-block d-none">
        <img
          src="/img-new/icons/shops.png"
          alt="магазины FOROOM в России"
          title="карта магазинов FOROOM"
        />
        <span>Магазины</span>
      </nuxt-link>

      <nuxt-link to="/actions" class="d-sm-block d-none">
        <img
          src="/img-new/icons/actions.png"
          alt="акции производителя FOROOM"
          title="актуальные скидки на изделия"
        />
        <span>Акции</span>
      </nuxt-link>

      <nuxt-link to="/buy">
        <img
          src="/img-new/icons/calc.png"
          alt="рассчитать стоимость изделия "
          title="онлайн-конструктор солнцезащитной системы"
        />
        <span>Конструктор</span>
        <span class="min">онлайн заказ</span>
      </nuxt-link>

      <cart-link />
<!--      <nuxt-link to="/order">-->
<!--        <img-->
<!--          src="/img/icons/cart.png"-->
<!--          alt=""-->
<!--        />-->
<!--        <span>Корзина</span>-->
<!--      </nuxt-link>-->
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import SearchField from '@/components/common/Header/SearchField.vue'
import CartLink from '@/components/common/Header/CartLink.vue'

@Component({
  components: { CartLink, SearchField }
})
export default class MainHeader extends Vue {}
</script>

<style lang="scss" scoped>
.header-middle {
  margin-bottom: 24px;
}

.logo-container {
  display: flex;
  align-items: center;

  img {
    width: 100%;
    max-width: 160px;
  }
}

.brand-tagline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
  background-color: $brand-orange;
  padding: 8px 12px 8px 20px;
  border-radius: 8px;
  p {
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.2px;
    color: #fff;
    text-transform: uppercase;
  }
  img {
    position: absolute;
    left: 0;
    top: 4px;
    height: 56px;
  }
}

/deep/ {
  .header-main-links {
    display: flex;
    justify-content: space-between;

    a {
      height: 72px;
      text-align: center;
      font-size: 15px;
      font-weight: 300;

      transition: color 0.3s ease-in-out;

      &:hover {
        color: $brand-orange-light;
      }

      img {
        width: 52px;
        display: block;
        margin: 0 auto 2px;
      }

      .min {
        display: block;
        font-size: 13px;
        margin-top: -4px;
      }
    }
  }
}

@media screen and (max-width: $colXl) {
  .logo-container {
    padding-left: 50px;
  }
}
@media screen and (max-width: $colMd) {

  .header-main-links {
    margin-top: 14px;
  }
  .slogan {
    font-size: 12px;
  }
}

@media screen and (max-width: $colXs) {
  .slogan {
    font-size: 12px;
  }
}
</style>
