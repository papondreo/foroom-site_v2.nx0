<template>
  <div class="callback-modal">
    <div class="container minimal">
      <div class="row h-100 justify-content-center">
        <div class="callback-form_container">
          <header class="block_header">
            {{ isOneClick ? "Купить в 1 Клик" : "Обратный звонок" }}
          </header>
          <callback-form-minimal
            :isOneClick="isOneClick"
            class="callback-form_body"
            @close="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter, Prop } from "nuxt-property-decorator";
import { Shop } from "@/types/Shops/Shop";

import ShopsMap from "@/components/common/Shops/ShopsMap.vue";
import ShopCard from "@/components/common/Shops/ShopCard.vue";
import CallbackFormMinimal from "@/components/Forms/CallbackFormMinimal.vue";
import { shopsStore, siteComponentStatesStore } from "@/utils/store-accessor";
import ShopsSearch from "@/components/common/Shops/ShopsSearch.vue";

@Component({
  components: { ShopsSearch, ShopCard, ShopsMap, CallbackFormMinimal },
})
export default class CallbackModal extends Vue {
  @Getter("shops/selectedShopGetter") shop: Shop;
  @Prop({ required: true })
  isOneClick: boolean;

  public tab: string = "list";
  public shopsCount: number = 3;

  selectTab(tab) {
    this.tab = tab;
    if (tab === "map") {
      const coords = this.shop.coords_geo.map((coord) => parseFloat(coord));
      this.selectShop(coords);
    }
  }

  selectShop(coords = false) {
    coords = this.shop.coords_geo.map((coord) => parseFloat(coord));
    this.$refs.callbackModalShopsMap.setCenter(coords);
    this.$refs.callbackModalShopsMap.clearRoutes();
    this.$refs.callbackModalShopsMap.printRoute(false, coords);
  }

  async searchShop(coords) {
    coords = coords.map((coord) => parseFloat(coord));
    this.$refs.callbackModalShopsMap.setCenter(coords);
    this.$refs.callbackModalShopsMap.clearRoutes();

    await shopsStore.setUserLocation(coords);
    await shopsStore.selectShop(this.shops[0].id);
  }

  showMore() {
    this.shopsCount += 3;
  }

  closeModal() {
    siteComponentStatesStore.setCallbackModalMinimal(false);
  }

  get shops(): Shop[] {
    return shopsStore.shopsGetter.slice(0, this.shopsCount);
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  height: 100%;

  .row > div {
    height: 100%;
  }
}
.h-100 {
  height: 100% !important;
}
.shops-map {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  top: 0;
}
.callback-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 1140px;
  min-height: 600px;
  height: fit-content;
  margin: auto;

  //background: #ffffff;
  border-radius: 8px;

  z-index: 99999;
}

.block_header {
  position: sticky;
  top: 0;
  left: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  background-color: $brand-orange-light;
  border-radius: 4px 4px 0 0;

  color: #ffffff;
  text-transform: uppercase;
  font-weight: 400;

  z-index: 1;

  &__gray {
    color: #e38839;
    background-color: #eee;
  }

  .header-button-group {
    span {
      border-radius: 4px;
      //background: #f5f5f5;
      color: #e38839;
      //color: #f5f5f5;
      padding: 5px 10px;
      font-weight: 300;
    }
    button {
      padding: 5px 10px;
      border-radius: 4px;
      background: #f9a134;
      text-transform: uppercase;
      font-weight: 400;
      color: #ffffff;
      //background: #f5f5f5;
      //color: #e38839;
      transition: 0.3s ease-in-out;
      &:hover {
        background: #ee9425;
        color: #f5f5f5;
      }
    }
  }
}
.map_container {
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  bottom: 0;
  //width: 100%;
  //height: 100%;
}

.shops-list,
.callback-form {
  &_container {
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 0;
    border-radius: $img-border-radius;

    overflow: auto;
  }
}
.shops-list {
  &_body {
    padding: 8px;
  }
}
.show-more-button {
  width: 100%;
  margin-top: 8px;
  border-radius: 4px;
  padding: 4px 0;
  background-color: #f9a134;
  text-transform: uppercase;
  color: #fff;
  font-weight: 400;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: $brand-orange-light;
  }
}
.callback-form {
  &_body {
    padding: 12px 16px;
  }
}
</style>
