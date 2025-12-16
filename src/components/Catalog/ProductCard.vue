<template>
  <div class="card">
    <nuxt-link :to="product.catalogUrl" class="card-link">
      <div class="card-cover_wrapper">
        <ui-img
          :src="product.img"
          :alt="product?.img_alt"
          :title="product?.img_title"
          class="card-cover"
        />
        <img
          :src="`/img-new/brand/${product.system}-ico.svg`"
          class="system-ico"
          alt=""
        />
      </div>

      <p v-html="product.title" class="card-title" />
      <p v-html="product.systemName" class="card-subtitle" />

      <div class="d-flex align-items-baseline justify-content-between">
        <div class="card-compare">
          <button
            type="button"
            class="card-compare-button"
            :class="{ active: isActive }"
            @click.prevent="compare(product.productId)"
            :disabled="loading"
            title="Добавить к сравнению"
          >
            <span class="icon"></span>
          </button>
        </div>
        <ui-button class="card-button">Заказать</ui-button>
      </div>


    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiButton from '@/components/UI/UI-Button.vue'
import UiImg from '@/components/UI/UI-Img.vue'
import { calculatorStore, compareProductsStore, siteComponentStatesStore } from '@/store'

@Component({
  components: {
    UiButton,
    UiImg
  }
})
export default class ProductCard extends Vue {
  @Prop({ required: true }) product!: {
    productId: string
    catalogUrl: string
    img: string
    img_alt: string
    img_title: string
    system: string
    title: string
    systemName: string
  }

  @Prop({ required: true })
  price: string | number

 
  mounted() {
  //   console.log('ProductCard mounted → product:', {
  //     productId: this.product.productId,
  //     catalogUrl: this.product.catalogUrl,
  //     img: this.product.img,
  //     system: this.product.system,
  //     title: this.product.title,
  //     systemName: this.product.systemName
  //  })
  }

  loading = false

  get isActive(): boolean {
    return Object.values(compareProductsStore.comparedProductsGetter)
      .some(p => p.view && p.productId === this.product.productId)
  }

  async compare(productId: string) {
    const existing = compareProductsStore.comparedProductsGetter[productId]

    if (!this.isActive) {
      if (!existing) {
        const template = calculatorStore.templatesGetter.find(
          t => t.type + t.subtype === productId
        )
        if (template) {
          this.loading = true
          const { params, itemRus } = await calculatorStore.calculate(template)
          this.loading = false
          await compareProductsStore.add({
            [productId]: { productId, params, itemRus, view: true }
          })
          siteComponentStatesStore.setCompareModal(true)
        }
      } else {
        await compareProductsStore.setView({ productId, flag: true })
        siteComponentStatesStore.setCompareModal(true)
      }
    } else {
      await compareProductsStore.setView({ productId, flag: false })
    }

    const comparedIds = Object.values(compareProductsStore.comparedProductsGetter)
      .filter(p => p.view)
      .map(p => p.productId)

    localStorage.setItem('comparedProductsIds', JSON.stringify(comparedIds))
  }
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
    display: flex;
    width: 100%;
    height: 100%;

    border-radius: 4px;
  }

  &-title {
    margin-bottom: 4px;

    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
  }

  &-subtitle {
    margin-bottom: 16px;
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

  &-compare {
    display: flex;
    align-items: center;
  }
  &-compare-button {
    padding: 8px 4px 4px;
    .icon {
      display: flex;
      width: 16px;
      height: 20px;
      background-color: #b7b5b5;
      -webkit-mask: url('/img-new/icons/bar-chart.svg') no-repeat center;
      mask: url('/img-new/icons/bar-chart.svg') no-repeat center;

      transition: 0.3s ease-in-out;
    }

    &:hover .icon {
      background-color: $brand-deep-blue;
    }

    &.active .icon {
      background-color: #dd0a0a !important;
    }
  }

  &-button {
    padding: 6px 12px;
    //margin-top: 2px;
    font-weight: 400;
  }
}
</style>
