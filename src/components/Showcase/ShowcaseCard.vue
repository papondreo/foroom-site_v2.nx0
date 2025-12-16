<template>
  <div class="card">
    <nuxt-link :to="product.url">
      <div class="card-cover_wrapper">
        <img
          :src="`https://www.foroom.ru/img/images/nf_foroom/constructor_cards/${product.cover}`"
          class="card-cover"
          alt=""
        />
        <img
          :src="`/img-new/brand/${product.systemType}-ico.svg`"
          class="system-ico"
          alt=""
        />
      </div>
      <p
        v-html="product.systemTypeName"
        class="card-title"
      />

      <div class="d-flex align-bestsellers-lg-baseline justify-content-between">
        <p class="card-price">от {{ product.price }} ₽</p>
        <ui-button class="card-button">Заказать</ui-button>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiButton from '@/components/UI/UI-Button.vue'

@Component({
  components: {
    UiButton
  }
})
export default class ShowcaseCard extends Vue {
  @Prop()
  readonly product: any
}
</script>

<style lang="scss" scoped>
.card {
  //width: 20%;
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

    object-fit: cover;
    object-position: center;

    border-radius: 4px;
  }

  &-title {
    min-height: 44px;
    margin-bottom: 8px;

    text-transform: uppercase;
    font-weight: 400;
    font-size: 15px;
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
