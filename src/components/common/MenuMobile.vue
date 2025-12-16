<template>
  <div>
    <button
      class="toggle-menu hamburger hamburger--arrowalt"
      id="toggle-menu-button"
      @click="toggleMenu()"
      :class="{ 'is-active': menu }"
      type="button"
      aria-label="ГМеню"
    >
      <span class="hamburger-box"> <span class="hamburger-inner"></span></span>
    </button>
    <nav
      class="main-menu-mobile"
      id="main-menu-mobile"
      :class="{ 'main-menu-mobile_opened': menu }"
    >
      <div class="main-menu-mobile__container">
        <ul>
          <li>
            <nuxt-link to="/actions" active-class="active" @click.native="toggleMenu()"
              >Акции</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/sale-points"
              active-class="active"
              @click.native="toggleMenu()"
              >Где купить</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/buy" active-class="active" @click.native="toggleMenu()"
              >Конструктор<span>ONLINE-ЗАКАЗ</span></nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/catalog" active-class="active" @click.native="toggleMenu()"
              >Каталог</nuxt-link
            >
            <ul>
              <li>
                <nuxt-link
                  to="/catalog/shtory-plisse"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Шторы плиссе</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/catalog/rulonnye-shtory"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Рулонные шторы</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/catalog/rulonnye-shtory-duo"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Рулонные шторы DUO</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/catalog/vertikalnye-zhalyuzi"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Вертикальные жалюзи</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/catalog/gorizontalnye-zhalyuzi"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Горизонтальные жалюзи</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/catalog/gorizontalnye-derevyannie-zhalyuzi"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Горизонтальные деревянные жалюзи</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/catalog/rimskie-shtory"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Римские шторы</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/catalog/profileCornices"
                  active-class="active"
                  @click.native="toggleMenu()"
                  >Профильные карнизы</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li>
            <nuxt-link
              to="/about-foroom"
              active-class="active"
              @click.native="toggleMenu()"
              no-prefetch="no-prefetch"
              >О FOROOM</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/proizvodstvo-foroom"
              active-class="active"
              @click.native="toggleMenu()"
              no-prefetch="no-prefetch"
              >Производство</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/news"
              active-class="active"
              @click.native="toggleMenu()"
              no-prefetch="no-prefetch"
              >Новости</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/service-centres"
              active-class="active"
              @click.native="toggleMenu()"
              no-prefetch="no-prefetch"
              >Сервисные центры</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/new-products"
              active-class="active"
              @click.native="toggleMenu()"
              no-prefetch="no-prefetch"
              >Наши новинки</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/download-3d-models"
              active-class="active"
              @click.native="toggleMenu()"
              no-prefetch="no-prefetch"
              >Дизайнерам</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/partneram-foroom"
              active-class="active"
              @click.native="toggleMenu()"
              no-prefetch="no-prefetch"
              >Партнерам</nuxt-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class MenuMobile extends Vue {
  menu = false;
  toggleMenu() {
    this.menu = !this.menu;
  }
}
</script>

<style lang="scss" scoped>
.toggle-menu {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  align-items: center;
  z-index: 1002;
  border-bottom-right-radius: 5px;
}
.toggle-menu .hamburger-box {
  width: 26px;
  height: 26px;
}
.toggle-menu.hamburger {
  opacity: 1 !important;
  padding: 15px;
  background: #df771c;
}
.toggle-menu.hamburger.is-active {
  background: none;
}
.toggle-menu.hamburger.is-active .hamburger-inner,
.toggle-menu.hamburger.is-active .hamburger-inner:after,
.toggle-menu.hamburger.is-active .hamburger-inner:before {
  background-color: #949494;
}
.toggle-menu.hamburger.is-active .hamburger-inner:before {
  top: 4px;
}
.toggle-menu.hamburger.is-active .hamburger-inner:after {
  bottom: 4px;
}
.toggle-menu.hamburger.is-active:hover .hamburger-inner,
.toggle-menu.hamburger.is-active:hover .hamburger-inner:after,
.toggle-menu.hamburger.is-active:hover .hamburger-inner:before {
  transition: 0.3s ease-in-out;
  background-color: #e38839;
}
.toggle-menu .hamburger-inner,
.toggle-menu .hamburger-inner:after,
.toggle-menu .hamburger-inner:before {
  height: 3px;
  width: 26px;
  background-color: #fff;
}
.toggle-menu .hamburger-inner:before {
  top: -9px;
}
.toggle-menu .hamburger-inner:after {
  bottom: -9px;
}
.toggle-menu:hover {
  transition: 0.3s ease-in-out;
  background: #e38839;
}
.main-menu-mobile {
  display: flex;
  margin-top: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 1001;
  width: 40%;
  box-shadow: 2px 0 8px 0 rgba(0, 0, 0, 0.37);
  transform: translateX(-110%);
  transition: transform 0.5s ease-in-out;
}
.main-menu-mobile__logo {
  position: absolute;
  height: 48px;
  top: 12px;
  left: 70px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.main-menu-mobile__logo img {
  max-width: 200px;
  max-height: 100%;
}
.main-menu-mobile__container {
  position: absolute;
  top: 65px;
  right: 0;
  bottom: 15px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
}
.main-menu-mobile ul {
  margin: 0;
  padding: 0 15px;
}
.main-menu-mobile li {
  display: block;
  padding-bottom: 10px;
}
.main-menu-mobile li a {
  display: block;
  font-size: 14px;
  color: #606060;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.4s ease-in-out;
}
.main-menu-mobile li a.active {
  color: #e38839;
}
.main-menu-mobile li a span {
  display: inline-block;
  margin: 0 0 0 5px;
  padding: 2px 3px 1px;
  font-size: 10px;
  letter-spacing: 0;
  background-color: #df771c;
  color: #fff;
  border-radius: 3px;
}
.main-menu-mobile li:hover > a {
  color: #df771c !important;
}
.main-menu-mobile li > ul {
  text-align: left;
  z-index: 999;
  padding: 15px 15px 0 10px;
  display: block;
  position: relative;
  left: 0;
  right: 0;
}
.main-menu-mobile li > ul li {
  display: block;
}
.main-menu-mobile li > ul li a {
  color: #949494;
}
.main-menu-mobile li:hover > ul {
  display: block;
}
@media only screen and (max-width: 1199px) {
  .toggle-menu {
    display: flex;
  }
  .main-menu-mobile_opened {
    transform: translateX(0);
  }
  .site-header__top-line {
    margin-top: 0;
  }
}
@media only screen and (max-width: 991px) {
}
@media only screen and (max-width: 575px) {
  .main-menu-mobile {
    width: 50%;
  }
}
@media only screen and (max-width: 479px) {
  .main-menu-mobile {
    width: 85% !important;
  }
}
</style>
