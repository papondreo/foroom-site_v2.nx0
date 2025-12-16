<template>
  <div>
    <nuxt-link :to="getUrl()">
      <div
        class="card"
        itemprop="offers"
        itemscope=""
        itemtype="https://schema.org/Offer"
      >
        <div class="card-cover_wrapper">
          <ui-img
            :src="`img/images/nf_foroom/goods-static/${product.cover}`"
            class="card-cover"
            :alt="
              product.systemType === 'wood'
                ? images?.wood[product.params.material.key]?.alt
                : ''
            "
            :title="
              product.systemType === 'wood'
                ? images?.wood[product.params.material.key]?.title
                : ''
            "
          />
        </div>
        <p itemprop="name" class="card-title">{{ product.systemName }}</p>

        <p itemprop="model" class="card-char">
          Материал: <span>{{ product.materialName }}</span>
        </p>
        <p class="card-char">
          Ширина: <span>{{ product.width }}</span>
        </p>
        <p class="card-char">
          Высота: <span>{{ product.height }}</span>
        </p>

        <div class="d-flex align-products-lg-baseline justify-content-end">
          <ui-button class="card-button">
            <span itemprop="price">{{ product.price }}</span>
            <span itemprop="priceCurrency" content="RUB">₽</span></ui-button
          >
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import UiButton from "@/components/UI/UI-Button.vue";
import { catalogStore } from "@/store";

@Component({
  components: {
    UiButton,
  },
})
export default class SimilarProductCard extends Vue {
  @Prop({ required: true })
  readonly product;

  data() {
    return {
      images: {
        wood: {
          30006163: {
            name: "G-FORM WOOD 50 50-11, белый глянец",
            alt: "деревянные жалюзи в цвете “белый глянец”",
            title: "деревянные жалюзи от бренда FOROOM",
          },
          30006176: {
            name: "G-FORM WOOD 50 50-20, магнолия",
            alt: "деревянные жалюзи в цвете “магнолия”",
            title: "деревянные жалюзи от FOROOM ",
          },
          30006177: {
            name: "G-FORM WOOD 50 50-31, грейдж",
            alt: "деревянные жалюзи в цвете “грейдж”",
            title: "горизонтальные деревянные жалюзи FOROOM",
          },
          30006178: {
            name: "G-FORM WOOD 50 50-80, светло-серый",
            alt: "деревянные жалюзи в цвете “светло-серый”",
            title: "",
          },
          30006179: {
            name: "G-FORM WOOD 50 50-82, серый",
            alt: "деревянные жалюзи в цвете “серый”",
            title: "деревянные жалюзи на окна от FOROOM ",
          },
          30006180: {
            name: "G-FORM WOOD 50 50-85, антрацит",
            alt: "деревянные жалюзи в цвете “антрацит”",
            title: "горизонтальные деревянные жалюзи от FOROOM",
          },
          30006181: {
            name: "G-FORM WOOD 50 50-43, бук",
            alt: "деревянные жалюзи в цвете “бук”",
            title: "жалюзи из дерева от бренда FOROOM",
          },
          30006182: {
            name: "G-FORM WOOD 50 50-51, молочный шоколад",
            alt: "деревянные жалюзи в цвете “молочный шоколад”",
            title: "деревянные жалюзи из дерева от бренда FOROOM",
          },
          30006183: {
            name: "G-FORM WOOD 50 50-52, тигровый глаз",
            alt: "деревянные жалюзи в цвете “тигровый глаз”",
            title: "жалюзи из дерева на окна от FOROOM",
          },
          30006184: {
            name: "G-FORM WOOD 50 50-73, шоколад",
            alt: "деревянные жалюзи в цвете “шоколад”",
            title: "жалюзи деревянные горизонтальные от FOROOM ",
          },
        },
      },
    };
  }

  getUrl() {
    const product = catalogStore.catalogGetter.find(
      (product) => product.productId === this.product.system
    );
    return product.catalogUrl + "/" + this.product.url;
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 36px;

  .card-cover_wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 140%;
    margin-bottom: 12px;
  }
  .system-ico {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 20px;
    height: 20px;
  }
  .card-cover {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;

    object-fit: cover;
    object-position: center;

    border-radius: 4px;
  }

  &-title {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
  }

  &-subtitle {
    margin-bottom: 8px;
    line-height: 1;
    font-size: 15px;
    color: #666;
  }

  &-char {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &-price {
    margin-top: 8px;

    font-size: 18px;
    font-weight: 600;
  }

  &-button {
    padding: 6px 12px;
    //margin-top: 2px;
    font-weight: 400;
  }
}
</style>
