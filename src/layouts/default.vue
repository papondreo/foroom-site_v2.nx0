<template>
  <div id="app">
    <menu-mobile />

    <div style="padding-left: 12px; padding-right: 12px">
      <design-grid v-if="false" />
      <cart-notification />

      <page-header />
      <page-breadcrumbs v-if="$route.path !== '/'" />
      <nuxt />
      <modal-container
        v-if="callbackModal"
        @close="closeCallbackModal"
      >
        <callback-modal />
      </modal-container>

      <callback-confirm-modal v-if="callbackConfirmModal" />
      <dealer-request-confirm-modal v-if="dealerRequestConfirmModal" />
      <order-confirm-modal v-if="orderConfirmModal" />
      <check-params-modal v-if="checkParamsModal" />
      <check-preview-modal v-if="checkPreviewModal" />

      <transition name="fade">
        <compare-modal v-if="compareModal" />
      </transition>

      <ui-notify />
    </div>
    <nearest-shop-modal />
    <jivo-site />
    <page-footer />
    <CookieBanner/>
  </div>
</template>
<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { siteComponentStatesStore } from '@/store'

import DesignGrid from '@/components/DesignGrid.vue'
import PageHeader from '@/components/common/Header/index.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import PageFooter from '@/components/common/Footer/index.vue'
import ModalContainer from '@/components/Modals/ModalContainer.vue'
import CallbackModal from '@/components/Modals/CallbackModal.vue'
import { Page } from '@/types/Page'
import CallbackConfirmModal from '@/components/Modals/CallbackConfirmModal.vue'
import UiNotify from '@/components/UI/UiNotify.vue'
import CheckParamsModal from '@/components/Constructor/ConstructorCheck/Modals/CheckParamsModal.vue'
import CheckPreviewModal from '@/components/Constructor/ConstructorCheck/Modals/CheckPreviewModal.vue'
import CartNotification from "@/components/Modals/CartNotification.vue";
import DealerRequestConfirmModal from "@/components/Modals/DealerRequestConfirmModal.vue";
import OrderConfirmModal from "@/components/Modals/OrderConfirmModal.vue";
import MenuMobile from "@/components/common/MenuMobile.vue";
import CompareModal from "@/components/Modals/CompareModal.vue";
import JivoSite from "@/components/common/JivoSite.vue";
import NearestShopModal from "@/components/Modals/NearestShopModal.vue";
import CookieBanner from '@/components/CookieBanner.vue'

@Component({
  components: {
    NearestShopModal,
    JivoSite,
    CompareModal,
    MenuMobile,
    OrderConfirmModal,
    DealerRequestConfirmModal,
    CartNotification,
    CheckPreviewModal,
    CheckParamsModal,
    UiNotify,
    CallbackConfirmModal,
    CallbackModal,
    DesignGrid,
    PageHeader,
    PageBreadcrumbs,
    PageFooter,
    ModalContainer,
    CookieBanner
  }
})
export default class DefaultLayout extends Vue {
  @Getter('siteComponentStates/callbackModalStateGetter') callbackModal

  @Getter('siteComponentStates/callbackConfirmModalStateGetter')
  callbackConfirmModal

  @Getter('siteComponentStates/dealerRequestConfirmModalStateGetter')
  dealerRequestConfirmModal

  @Getter('siteComponentStates/orderConfirmModalStateGetter')
  orderConfirmModal

  @Getter('siteComponentStates/checkParamsModalStateGetter')
  checkParamsModal

  @Getter('siteComponentStates/checkPreviewModalStateGetter')
  checkPreviewModal

  @Getter('siteComponentStates/compareModalStateGetter')
  compareModal

  @Getter('pages/currentPageGetter') currentPage

  public head(): MetaInfo {
    const canonical ='https://foroom.ru' + this.$route.path.toLowerCase() ? `${this.$route.path.toLowerCase().replace(/\/$/, '')}/` : '';
   
    if (this.currentPage) {
      const { seoTitle, seoDescription }: Page = this.currentPage

      let meta = [
          { hid: 'description', name: 'description', content: seoDescription },
        ]
     
     if(this.$route.path.toLowerCase() === '/catalog/gorizontalnye-derevyannie-zhalyuzi'){        
          let woodMeta= [
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: 'Деревянные жалюзи на окна по вашим размерам' },
            { property: 'og:description', content: 'Деревянные жалюзи по вашим размерам. Доступная цена. Более 30 цветов в наличии. Доставка по России. Гарантия 1 год. Монтаж и установка "под ключ".' },
            { property: 'og:url', content: this.$route.path.toLowerCase()},
            { property: 'og:image', content: 'https://www.foroom.ru/img-new/catalog/products/wood/wood1/slider-wood.webp'},
            { property: 'og:site_name', content: 'FOROOM'},
          ]
          meta = [...meta, ...woodMeta] 
        }
      
      return {
        title: seoTitle,
        meta: meta,
        script: [
          // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' },
          // { src: 'https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js' },
          // { src: 'https://yastatic.net/share2/share.js' },
        ],
        link: [{ rel: 'canonical', href: canonical }]
      }
    }
  }

  async mounted() {
    await siteComponentStatesStore.getUserIP()

    this.$saleForoomCounter('start')

    // window.addEventListener('scroll', this.metricsInit);


    // if (!this.$store.getters['common/userIP']) {
    //   this.$store.dispatch('common/getUserIP')
    // }
  }

  // metricsInit() {
  //
  // }
  //
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.metricsInit);
  // }

  closeCallbackModal(): void {
    siteComponentStatesStore.setCallbackModal(false)
  }
  get userIP() {
    return siteComponentStatesStore.userIPGetter
  }
}
</script>
