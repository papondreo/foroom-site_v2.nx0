<template>
  <div class="card">
    <nuxt-link :to="getUrl()">
      <div class="card-cover_wrapper">
        <ui-img
          :src="product.img"
          class="card-cover"
        />
        <img
          :src="`/img-new/brand/${product.system}-ico.svg`"
          class="system-ico"
          alt=""
        />
      </div>
      <p
        v-html="product.title"
        class="card-title"
      />
      <p
        v-html="product.systemName"
        class="card-subtitle"
      />

      <div class="d-flex align-bestsellers-lg-baseline justify-content-between">
        <div class="card-compare">
          <button
            type="button"
            class="card-compare-button"
            :class="{ active: isActive }"
            @click.prevent="compare(product.productId)"
            :disabled="loading"
          >
            <span class="icon"></span>
          </button>
        </div>
        <ui-button class="card-button">Заказать</ui-button>
      </div>
    </nuxt-link>

    <div class="params mt-3">
      <div
        class="param"
        v-for="param in product.params"
        :key="param.paramKey"
      >
        <p class="param-title">{{ param.name }}</p>
        <p
          v-for="(option, key) in param.options"
          :key="key"
          class="param-text"
        >
          {{ option }}
        </p>
      </div>

      <div class="param">
        <p class="param-title">Преимущества</p>
        <p
          v-for="(p, k) in product.productAdvantages.description"
          :key="k"
          class="advantages-text"
        >
          {{ p }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UiButton from '@/components/UI/UI-Button.vue'
import { compareProductsStore } from '@/store'

@Component({
  components: {
    UiButton
  }
})
export default class CompareCard extends Vue {
  @Prop({ required: true })
  product

  isActive = true
  loading = false

  async compare(productId) {
    await compareProductsStore.setView({ productId, flag: false })

    this.isActive = !this.isActive

    const compared = compareProductsStore.comparedProductsGetter
    const comparedProductsIds = Object.values(compared)
      .filter((item) => item.view)
      .map((item) => item.productId)

    localStorage.setItem(
      'comparedProductsIds',
      JSON.stringify(comparedProductsIds)
    )
  }

  getUrl() {
    const parts = this.product.calculatorUrl.split('/')
    return `/${parts[1]}/${parts[2]}?template=${this.product.productId}`
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

  .param {
    margin-bottom: 8px;
  }
  .param-title {
    font-weight: 400;
  }

  .param-text {
    font-size: 14px;
  }
  .advantages-text {
    font-size: 14px;
    margin-bottom: 4px;
  }
}
</style>
