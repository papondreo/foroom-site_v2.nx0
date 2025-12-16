<template>
  <nuxt-link
    class="order-now"
    :to="getUrl()"
  >
    <ui-img
      class="img"
      src="/img-new/catalog/order-now.jpg"
      :alt="this.$route.path.toLowerCase() === '/catalog/gorizontalnye-derevyannie-zhalyuzi' ? 'собрать деревянные жалюзи за 2 минуты ' : ''"
      :title="this.$route.path.toLowerCase() === '/catalog/gorizontalnye-derevyannie-zhalyuzi' ? 'Онлайн-конструктор деревянных жалюзи ' : ''"
    />
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class OrderNow extends Vue {
  getUrl(): string {
    return this.$route.path.replace('catalog', 'buy')
  }
}
</script>

<style lang="scss" scoped>
.order-now {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
}

::v-deep .img {
  width: 100%;
  height: 100%;
  display: flex;
  object-position: center;
  object-fit: cover;
  justify-content: center;
  align-items: center;

  img {
    vertical-align: middle;
    //height: 350px;
    border-radius: $img-border-radius;
    object-fit: cover;
    object-position: center;
  }
}
</style>
