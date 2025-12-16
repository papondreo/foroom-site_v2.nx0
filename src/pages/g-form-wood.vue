<template>
  <main>
    <section class="info-page">
      <div class="container">
        <div class="row mb-5">
          <div class="col-sm-12">
            <ui-title tag="h1" class="ui-title-1"
              >Горизонтальные деревянные жалюзи по вашим размерам
            </ui-title>

            <h2>Интернет-магазин FOROOM это:</h2>
            <ul>
              <li>
                &#128077; Более 30 текстур и оттенков деревянных жалюзи от 8114.4 рублей
              </li>
              <li>
                &#128077; Изготовление 2-3 рабочих дня, доставка и установка по всей
                России
              </li>
              <li>
                &#128077; Возможность дистанционного управления с помощью голосового
                помощника
              </li>
            </ul>
            <div class="buttons">
              <button class="buy buy_one-click" @click="showCallbackModal('callback')">
                Обратный звонок
              </button>
              <button class="buy buy_one-click" @click="showCallbackModal('one-click')">
                Купить в 1 клик
              </button>
              <a
                href="/buy/gorizontalnye-derevyannie-zhalyuzi?template=wood1&sizes=485x400"
                class="buy buy_one-click"
              >
                Заказать в конструкторе
              </a>
            </div>

            <modal-container v-if="callbackModalMinimal" @close="closeCallbackModal">
              <callback-modal-minimal :isOneClick="isOneClick" />
            </modal-container>
            <div class="row">
              <similar-product-card
                class="col-xl-2 col-md-3 col-sm-4 col-6"
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Getter } from "nuxt-property-decorator";
import SimilarProductCard from "@/components/Catalog/Product/SimilarProductCard.vue";
import { catalogStore, oneClickProductsStore } from "@/utils/store-accessor";
import CallbackModalMinimal from "@/components/Modals/CallbackModalMinimal.vue";
import ModalContainer from "@/components/Modals/ModalContainer.vue";
import { siteComponentStatesStore } from "@/store";
@Component({ components: { SimilarProductCard, CallbackModalMinimal, ModalContainer } })
export default class GFormWood50 extends Vue {
  @Getter("siteComponentStates/callbackModalMinimalStateGetter") callbackModalMinimal;
  public isOneClick: boolean = false;
  async asyncData() {
    await catalogStore.getSimilarProducts("wood1");
    await oneClickProductsStore.getOneClickProducts()
  }
  head() {
    return {
      meta: [
        {
          hid: "og:image",
          name: "og:image",
          content:
            "https://www.foroom.ru/img/images/nf_foroom/goods-static/wood1-30006176.png",
        },
        {
          hid: "og:url",
          name: "og:url",
          content: "https://www.foroom.ru/g-form-wood",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:title",
          name: "og:title",
          content:
            "Деревянные жалюзи купить в Москве и Санкт-Петербурге недорого по вашим размерам в интернет-магазине FOROOM по доступной цене от производителя",
        },
        {
          hid: "og:description",
          name: "og:description",
          content:
            "Деревянные жалюзи в Москве и Санкт-Петербурге по цене от ⭐ 7728 руб. ⭐ в интернет магазине FOROOM ✅ Замер и установка по России ☎ +7 995 785 1300 ✅ Более 30 лет на рынке солнцезащитных систем",
        },
      ],
    };
  }

  get products() {
    return catalogStore.catalogSimilarProductsGetter("wood1");
  }

  closeCallbackModal(): void {
    siteComponentStatesStore.setCallbackModalMinimal(false);
  }

  showCallbackModal(type: string): void {
    if (type === "callback") {
      this.isOneClick = false;
    } else {
      this.isOneClick = true;
    }

    siteComponentStatesStore.setCallbackModalMinimal(true);

    this.$saleForoomCounter("NF_openBuyOneClickForm");
    this.$yandexMetrika.reachGoal("NF_openBuyOneClickForm");
  }
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex-direction: row;

  gap: 20px;
  margin-bottom: 20px;
  .buy {
    display: block;
    width: 30%;
    padding: 8px 15px;
    background: #f9a134;
    border-radius: 5px;
    font-size: 19px;
    font-weight: 400;
    text-transform: uppercase;
    color: $text-light-color;
    text-align: center;
    transition: 0.3s ease-in-out;
    border: 2px solid #f9a134;
    &:hover {
      border-color: #ff920c;
      background: #ff920c;
    }
    &.disabled {
      background: #cccccc;
      border-color: #cccccc;
    }
    span {
      display: block;
    }
    .title {
      line-height: 1.2;
      margin-bottom: 2px;
    }
    .desc {
      margin-top: 0;
      text-transform: uppercase;
      line-height: 1.2;
      font-size: 14px;
      font-weight: 400;
    }
    &_one-click {
      padding-left: 10px;
      padding-right: 10px;
      color: $brand-deep-blue;
      background: $text-light-color;
      border-color: $brand-deep-blue !important;
      &:hover {
        background: $brand-deep-blue;
        color: $text-light-color;
      }
      .title {
        font-size: 17px;
      }
      &__disabled {
        color: #aaa !important;
        background: #fff !important;
        border-color: #aaa !important;
      }
    }
  }
}

@media only screen and (max-width: 700px) {
  .buttons {
    flex-direction: column;

    .buy {
      width: 100%;
    }
  }
}

ul {
  list-style: none;
  margin-bottom: 20px;
}
img {
  margin-bottom: 15px;
  border: 2px solid #d38f2c;
  border-radius: 8px;
}
</style>
