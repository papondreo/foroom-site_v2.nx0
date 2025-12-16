<template>
  <div v-if="filteredProducts && filteredProducts.length" class="container-pl">
    <img v-if="attachmentPoint.name == 'Изделия для створок окна'"
        :src="`/img-new/brand/1_.png`"
        :alt="attachmentPoint.name"
        :title="attachmentPoint.name"
         class="background-image"
    />
    <img v-else
         :src="`/img-new/brand/2_.png`"
         :alt="attachmentPoint.name"
         :title="attachmentPoint.name"
         class="background-image"
    />
    <ul class="dropdown__list">
      <li v-for="product in filteredProducts" :key="product.id">
        <nuxt-link
          v-if="getUrl(product)"
          :to="getUrl(product)"
          @click.native="$emit('closeMenu')"
        >
          {{ product.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Prop, Getter } from "nuxt-property-decorator";
import { Product } from "@/types/Products/Product";
import { AttachmentPoint } from "@/types/Systems";

@Component({})
export default class ProductsList extends Vue {
  @Prop()
  products: Product[];

  @Prop()
  attachmentPoint: AttachmentPoint;

  @Prop()
  type: string;

  @Getter("catalog/catalogGetter") catalogProducts;

  getUrl(product: Product): string | null {
    const productId = product.type + product.subtype;
    const key = this.type + "Url";

    if (productId) {
      if (key === "catalogUrl") {
        const p = this.catalogProducts.find((item) => item.productId === productId);
        return p ? p[key] : null;
      }

      if (key === "calculatorUrl") {
        const p = this.catalogProducts.find((item) => item.productId === productId);
        if (p) {
          const url = p[key].split("/");
          return `/buy/${url[2]}?template=${p.productId}`;
        }
      }
    }
    return null;
  }

  get filteredProducts(): Product[] {
    return this.products
      ? this.products.filter(
          (product: Product) => product.attachmentPoint === this.attachmentPoint.value
        )
      : this.products;
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  &__link-description {
    color: #959391;
    font-size: 14px;
    font-weight: 200;
  }
  &__list {
    min-height: 100px;
    margin-top: 4px;

    li {
      margin-bottom: 4px;
      &:last-of-type {
        margin-bottom: 0;
      }

      a {
        font-size: 15px;
        font-weight: 400;

        transition: 0.3s ease-in-out;

        &:hover {
          color: $brand-orange-light;
        }
      }
    }
  }
}
.container-pl{
  position: relative; /* Делаем контейнер относительным для позиционирования */
  overflow: hidden; /* Скрываем всё, что выходит за пределы контейнера */
}
.background-image {
  position: absolute; /* Абсолютное позиционирование */
  top: 0;
  left: 0;
  height: 100%; /* Высота изображения на весь контейнер */
  object-fit: cover; /* Масштабируем изображение, чтобы оно покрывало весь контейнер */
  z-index: -1; /* Отправляем изображение на задний план */
  opacity: 0.2; /* Прозрачность изображения (по желанию) */
  filter: hue-rotate(40deg) saturate(2);
}
</style>
