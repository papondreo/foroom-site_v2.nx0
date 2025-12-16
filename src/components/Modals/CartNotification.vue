<template>
  <transition name="el-fade-in">
    <div
      class="cart-notification"
      v-if="show"
    >
      <div class="cart-notification__wrapper">
        <div
          class="cart-notification__bg"
          :class="{ show: showBg }"
        >
          <img
            class="bg__lines bg__lines_left"
            src="/img-new/cart-notify-lines-left.png"
            alt=""
          />
          <img
            class="bg__lines bg__lines_right"
            src="/img-new/cart-notify-lines-right.png"
            alt=""
          />
        </div>
        <div class="container-lg">
          <button
            class="close-button"
            :class="{ show: showCloseButton }"
            @click="show = false"
          >
            Закрыть
          </button>
          <div class="row">
            <div
              class="col-lg-2 col-md-3 col-sm-3 offset-1 offset-lg-0 cart-image__wrapper"
            >
              <img
                src="/img-new/cart.png"
                alt=""
                class="cart-image"
                :class="{ show: showCart }"
              />
            </div>
            <div class="col cart-notification__content">
              <div class="row">
                <div
                  class="col cart-notification__slogan"
                  :class="{ show: showSlogan }"
                >
                  <p>{{ sloganArr[sloganIndex] }}</p>
                </div>

                <div class="col-auto cart-notification__info">
                  <div class="mr-5">
                    <p :class="{ show: showInfo }">
                      Товаров в корзине: <span>{{ cartCount }}</span>
                    </p>
                    <p :class="{ show: showInfo }">
                      На сумму: <span>{{ fullPrice }} ₽</span>
                    </p>
                  </div>
                  <nuxt-link
                    to="/order"
                    class="cart-button"
                    :class="{ show: showButton }"
                    @click.native="show = false"
                  >
                    Оформить заказ
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from 'nuxt-property-decorator'
import { cartStore } from '@/utils/store-accessor'

@Component
export default class CartNotification extends Vue {
  public cartItems = []
  public fullPrice = 0
  public sloganArr = [
    'Обновить интерьер с FOROOM легко',
    'Поиск жалюзи заканчивается здесь'
  ]
  public sloganIndex = 0
  public disabledUrls = [
    '/buy/shtory-plisse',
    '/buy/rulonnye-shtory',
    '/buy/rulonnye-shtory-duo',
    '/buy/vertikalnye-zhalyuzi',
    '/buy/gorizontalnye-zhalyuzi',
    '/buy/rimskie-shtory',
    '/order'
  ]
  public timeBeforeShow = 60000
  public show = false
  public showBg = false
  public showCart = false
  public showSlogan = false
  public showButton = false
  public showCloseButton = false
  public showInfo = false

  mounted() {
    this.checkCartItems()
  }

  checkCartItems() {
    const items = localStorage.getItem('cartItemsParams')
    if (items) {
      this.cartItems = JSON.parse(items)
      setTimeout(() => {
        this.showBanner()
      }, this.timeBeforeShow)
    }
  }

  showBanner() {
    this.fullPrice = this.cartItems.reduce((sum, item) => {
      return sum + item.amount.val * item.price.val
    }, 0)

    if (!this.disabledUrls.includes(this.$route.path)) {
      this.show = true
      this.animateBanner()
    } else {
      const checkUrl = setInterval(() => {
        if (!this.disabledUrls.includes(this.$route.path)) {
          this.show = true
          this.animateBanner()
          clearInterval(checkUrl)
        }
      }, 3000)
    }
  }

  animateBanner() {
    setTimeout(() => (this.showBg = true), 200)
    setTimeout(() => (this.showCart = true), 500)
    setTimeout(() => (this.showButton = true), 500)
    setTimeout(() => (this.showSlogan = true), 1000)
    setTimeout(() => (this.showInfo = true), 1000)
    setTimeout(() => (this.showCloseButton = true), 1500)
    setInterval(() => {
      if (this.sloganIndex < this.sloganArr.length - 1) {
        this.sloganIndex++
      } else {
        this.sloganIndex = 0
      }
    }, 4000)
  }

  get cartCount() {
    return cartStore.cartItemsGetter.length
  }
}
</script>

<style lang="scss" scoped>
.container-lg {
  position: relative;
}
.close-button {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 14px;
  transition: color .3s ease-in-out, opacity .5s ease-in-out;
  opacity: 0;
  z-index: 9999;
  &:hover {
    color: #df771c;
  }
}
.cart-image {
  min-width: 115px;
  transition: transform .8s ease-in-out;
  transform: translateX(-1000%);
}
.cart-notification {
  position: relative;
  margin-top: 10px;
  margin-bottom: -43px;
  overflow: hidden;
  &__bg {
    background: #3b3a49;
    position: absolute;
    top: 35px;
    bottom: 45px;
    width: 100%;
    display: flex;
    border-radius: 8px;
    justify-content: space-between;
    opacity: 0;
    transition: opacity .5s ease-in-out;
  }
  .bg__lines {
    height: 100%;
    opacity: .1;
  }
  &__content {
    padding-top: 35px;
    padding-bottom: 45px;
    & > .row {
      height: 100%;
    }
  }
  &__slogan {
    display: flex;
    align-items: center;
    transition: transform .5s ease-in-out;
    transform: translateX(-1000%);
    p {
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 500;
      color: #f5f5f5;
    }
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 10px;
    padding-bottom: 10px;
    p {
      color: #f5f5f5;
      transition: transform .5s ease-in-out;
      transform: translateX(1000%);
      span {
        font-weight: 500;
      }
    }
    .cart-button {
      padding: 7px 15px 5px;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 15px;
      color: #f5f5f5;
      border: 1px solid #f5f5f5;
      border-radius: 20px;
      transition: transform .8s ease-in-out, color .3s ease-in-out, background .3s ease-in-out;
      transform: translateX(1000%);
      &:hover {
        color: #3b3a49;
        background: #f5f5f5;
      }
    }
  }
}
.show {
  transform: translateX(0) !important;
  opacity: 1 !important;
}
.mr-5 {
  margin-right: 25px;
}
@media only screen and (max-width: $colLg) {
  .close-button {
    top: 2px;
  }
  .cart-image {
    max-width: 125px;
  }
  .cart-notification {
    margin-bottom: -25px;
    &__bg {
      top: 25px;
      bottom: 30px;
    }
    &__content {
      padding-top: 25px;
      padding-bottom: 30px;
    }
  }
  .cart-notification__slogan p {
    display: none;
  }
}

@media only screen and (max-width: 640px) {
  .close-button {
    color: #f5f5f5;
    top: 5px;
  }
  .cart-notification {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin-bottom: 0;
    z-index: 9999;
    &__wrapper {
      position: absolute;
      width: 70vw;
      height: auto;
    }
    &__bg {
      top: 0;
      bottom: 0;
      flex-direction: column;
      border-radius: 10px;
    }
    &__content {
      padding-top: 0;
      padding-left: 40px;
      padding-right: 40px;
    }
    &__info {
      width: 100%;
      flex-direction: column;
      .mr-5 {
        margin-right: 0 !important;
      }
      & > div {
        margin-top: 20px;
        margin-bottom: 20px;
        p {
          font-size: 19px;
          text-align: center;
        }
      }
      .cart-button {
        width: 70%;
        margin: 40px auto 0;
        text-align: center;
      }
    }
    &__slogan {
      p {
        width: 100%;
        text-align: center;
        font-size: 16px;
        display: block;
      }
    }
    .bg__lines {
      height: 90px;
    }
  }
  .cart-image {
    max-width: 100%;
    &__wrapper {
      margin-left: -5vw !important;
      margin-top: -5vh !important;
      max-width: 70%;
      flex: 0 0 70%;
    }
  }
}
@media only screen and (max-width: $colXs) {
  .cart-notification__wrapper {
    width: 80vw;
    height: auto;
  }
  .cart-image {
    max-width: 100%;
  }
  .cart-notification__info .cart-button {
    width: 100%;
  }
}
</style>
