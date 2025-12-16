<template>
  <div class="systems-menu__dropdown">
    <p
      class="system-title"
      :class="`ui-color-brand-${system.system}`"
    >
      {{ system.title }}
    </p>

    <div class="row z2">
      <div class="col-4">
        <nuxt-link
          :to="system.catalogUrl"
          @click.native="$emit('closeMenu')"
          class="dropdown__main-link"
        >
          Каталог
        </nuxt-link>
        <hr class="main-link__separator" />

        <div class="col-12">
          <div class="row">
            <template v-if="system.system !== 'profileCornices'">
              <products-list
                v-for="attachmentPoint in attachmentPoints"
                :key="attachmentPoint.value"
                :products="systemProducts"
                :attachment-point="attachmentPoint"
                @closeMenu="$emit('closeMenu')"
                type="catalog"
                class="col-6"
              />
            </template>
            <template v-else>
              <products-list
                v-for="attachmentPoint in attachmentPoints"
                :key="attachmentPoint.value"
                :products="cornices"
                :attachment-point="attachmentPoint"
                @closeMenu="$emit('closeMenu')"
                type="catalog"
                class="col-6"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="col-4 offset-1">
        <nuxt-link
          :to="system.calculatorUrl"
          @click.native="$emit('closeMenu')"
          class="dropdown__main-link dropdown__main-link_uppercase"
        >
          Конструктор <span>(онлайн заказ по Вашим параметрам)</span>
        </nuxt-link>
        <hr class="main-link__separator" />

        <div class="col-12">
          <div class="row">
            <products-list
              v-for="attachmentPoint in attachmentPoints"
              :key="attachmentPoint.value"
              :products="systemProducts"
              :attachmentPoint="attachmentPoint"
              @click.native="$emit('closeMenu')"
              type="calculator"
              class="col-6"
            />
          </div>
        </div>
      </div>
      <div
        class="col-3"
        style="text-align: right; display: none"
      >
        <nuxt-link
          to="/"
          @click.native="$emit('closeMenu')"
          class="dropdown__main-link"
        >
          Каталог материалов
        </nuxt-link>
        <hr class="main-link__separator main-link__separator_hidden" />

        <!--        <p class="dropdown__link-description">Полезная информация</p>-->
        <ul class="dropdown__list">
          <!--          <li>-->
          <!--            <nuxt-link-->
          <!--              to="/"-->
          <!--              @click.native="$emit('closeMenu')"-->
          <!--            >-->
          <!--              Галерея-->
          <!--            </nuxt-link>-->
          <!--          </li>-->
          <!--
          <li>
            <nuxt-link
              to="/"
              @click.native="$emit('closeMenu')"
            >
              Инструкции по установке
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              @click.native="$emit('closeMenu')"
            >
              3D модели для дизайнеров
            </nuxt-link>
          </li>
-->
        </ul>
      </div>
    </div>

    <img
      :src="`/img-new/brand/${system.system}-ico.svg`"
      class="dropdown__brand-ico z1"
      alt=""
    />
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Prop, Getter } from 'nuxt-property-decorator'

import ProductsList from '@/components/common/Header/SystemsNavigation/ProductsList.vue'

import { Product } from '@/types/Products/Product'
import { System } from '@/types/Systems'
import { AttachmentPoint } from '@/types/Systems/AttachmentPoint'
import { catalogStore } from '@/utils/store-accessor'

@Component({
  components: { ProductsList }
})
export default class SystemsNavigationDropdown extends Vue {
  @Prop()
  readonly system: System

  @Getter('systems/systemProductsMapGetter') productsMap: any
  @Getter('systems/attachmentPointsGetter') attachmentPoints: AttachmentPoint[]
  @Getter('products/productsGetter') products: any

  get systemProducts(): Product[] {
    const productTypes = this.productsMap[this.system.system]
    return this.products
      ? this.products.filter((product: Product) =>
          productTypes.includes(product.type)
        )
      : this.products
  }

  get cornices() {
    return catalogStore.catalogGetter
      ? catalogStore.catalogGetter
          .filter((i) => i.system === 'karniz')
          .map((i) => ({
            ...i,
            name: i.title,
            type: i.productId.replace(/[^a-z]/g, ''),
            subtype: i.productId.replace(/[^0-9]/g, '')
          }))
      : []
  }
}
</script>

<style lang="scss" scoped>
.systems-menu__dropdown {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  padding: 32px 16px 48px;

  background: #f5f5f8;
  box-shadow: 0 15px 15px rgba(219, 215, 215, 0.2);
  border-radius: 0 0 8px 8px;

  opacity: 0;
  visibility: hidden;

  overflow: hidden;
  z-index: 999;

  transition: 0.3s ease-in-out;

  .main-link__separator {
    height: 1px;
    display: block;
    border: none;
    background-color: #d9d9d9;

    &_hidden {
      opacity: 0;
      background: none;
    }
  }

  .z1 {
    z-index: 1;
  }

  .z2 {
    position: relative;
    z-index: 2;
  }
}

.system-title {
  margin-bottom: 12px;

  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
}

.dropdown {
  &__main-link {
    font-size: 18px;
    font-weight: 400;

    transition: color 0.3s ease-in-out;

    &_uppercase {
      text-transform: uppercase;
    }

    span {
      font-size: 14px;
      font-weight: 300;
      text-transform: none;

      color: #959391 !important;
    }

    &:hover {
      color: $brand-orange-light;
    }
  }

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

  &__brand-ico {
    width: 20%;
    position: absolute;
    right: -25px;
    bottom: -50px;
    opacity: 0.07;
  }
}
</style>
