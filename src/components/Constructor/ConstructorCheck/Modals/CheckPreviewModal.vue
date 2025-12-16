<template>
  <div>
    <div
      class="overlay"
      @click="closeModal"
    ></div>
    <div :class="'preview-modal' + ' ' + product.system">
      <div class="row m-0">
        <div class="col-7">
          <div class="row">
            <div class="col-12">
              <div class="product-image">
                <img v-if="product.productId === 'hblinds3'" src="/img-new/constructor/roomg-form-50.jpg" />
                <img v-else-if="product.system !== 'wood'" src="/img-new/constructor/window-bg.jpg" />
                <img v-else src="/img-new/constructor/WOOD_50_9.jpg" />
                <img
                  v-if="wallColor"
                  :src="wallColor.url"
                />
                <img
                  v-if="product.windowImg"
                  :src="product.windowImg"
                  alt=""
                />
                <img
                  :src="materialImg"
                  alt=""
                />
                <img
                  v-if="product.system === 'vblinds'"
                  src="/img-new/constructor/1441976311b.png"
                />
              </div>
            </div>

            <div class="col-12">
              <p class="title">Цвет стены</p>
              <div class="wall-colors">
                <div
                  v-for="(color, i) of wallColors"
                  @click="setWallColor(color)"
                  :key="`color-${i}`"
                  class="wall_color"
                  :class="{ active: color.url == wallColor.url }"
                  :style="{ backgroundColor: color.color }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="product-image">
            <img
              :src="materialPreviewImg"
              class="material"
              :class="{ contain: product.system === 'duo' }"
            />
          </div>
          <p class="title">Материал: {{ material.name }}</p>
        </div>

        <div class="col-12 ui-mt-2 ui-mb-2 justify-content-end d-flex">
          <button
            class="close-button ui-button"
            @click="closeModal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from 'nuxt-property-decorator'
import {
  calculatorStore,
  catalogStore,
  siteComponentStatesStore
} from '@/utils/store-accessor'

@Component
export default class CheckPreviewModal extends Vue {


  wallColors = this.getWallColor(this.product.productId)

  mounted() {
    this.defaultColor(product.productId)
  }

  defaultColor(productId) {
    const defaultWoodColor = {
      name: 'Orange 001',
      color: '#f1e2cf',
      url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_9.jpg'
    };

    const defaultGForm50Color = {
      name: 'Orange 001',
      color: '#f1e2cf',
      url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-13.png'
    };

    const defaultColor = {
      name: 'Orange 005',
      color: '#dd6e29',
      url: 'https://media.foroom.ru/docs/kons/load/1442437400b.png'
    };

    if (productId === 'wood1') {
      siteComponentStatesStore.setWallColor(defaultWoodColor);
    } else if (productId === 'hblinds3') {
      siteComponentStatesStore.setWallColor(defaultGForm50Color);
    } else {
      siteComponentStatesStore.setWallColor(defaultColor);
    }
  }

  getWallColor(productId) {
    // let wallColors;
    if (productId === 'wood1') {
      return [
        {
          name: 'Red 001',
          color: '#eddadc',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_1.png'
        },
        {
          name: 'Red 002',
          color: '#efcac2',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_2.png'
        },
        {
          name: 'Red 003',
          color: '#ebb6bc',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_3.png'
        },
        {
          name: 'Red 004',
          color: '#e79d94',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_4.png'
        },
        {
          name: 'Red 005',
          color: '#d17e7a',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_5.png'
        },
        {
          name: 'Red 006',
          color: '#d66368',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_6.png'
        },
        {
          name: 'Red 007',
          color: '#b54b59',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_7.png'
        },
        {
          name: 'Red 008',
          color: '#a33246',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_8.png'
        },
        {
          name: 'Orange 001',
          color: '#f1e2cf',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_9.jpg'
        },
        {
          name: 'Orange 002',
          color: '#f4d0b6',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_10.png'
        },
        {
          name: 'Orange 003',
          color: '#f7c088',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_11.png'
        },
        {
          name: 'Orange 004',
          color: '#ee9e63',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_12.png'
        },
        {
          name: 'Orange 005',
          color: '#dd6e29',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_13.png'
        },
        {
          name: 'Orange 006',
          color: '#d0603b',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_14.png'
        },
        {
          name: 'Orange 007',
          color: '#c43c2c',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_15.png'
        },
        {
          name: 'Orange 008',
          color: '#b02512',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_16.png'
        },
        {
          name: 'Yellow 001',
          color: '#f5dfb6',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_17.png'
        },
        {
          name: 'Yellow 002',
          color: '#f4d59e',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_18.png'
        },
        {
          name: 'Yellow 003',
          color: '#f2c17c',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_19.png'
        },
        {
          name: 'Yellow 004',
          color: '#f1cd7f',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_20.png'
        },
        {
          name: 'Yellow 005',
          color: '#eabb73',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_21.png'
        },
        {
          name: 'Yellow 006',
          color: '#f3af5e',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_22.png'
        },
        {
          name: 'Yellow 007',
          color: '#f7bb4d',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_23.png'
        },
        {
          name: 'Yellow 008',
          color: '#ddaa01',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_24.png'
        },
        {
          name: 'Green 001',
          color: '#dbe6d5',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_25.png'
        },
        {
          name: 'Green 002',
          color: '#cee1c1',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_26.png'
        },
        {
          name: 'Green 003',
          color: '#abc258',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_27.png'
        },
        {
          name: 'Green 004',
          color: '#8ec277',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_28.png'
        },
        {
          name: 'Green 005',
          color: '#6fad57',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_29.png'
        },
        {
          name: 'Green 006',
          color: '#73a532',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_30.png'
        },
        {
          name: 'Green 007',
          color: '#228b50',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_31.png'
        },
        {
          name: 'Green 008',
          color: '#477535',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_32.png'
        },
        {
          name: 'Blue 001',
          color: '#cddee5',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_33.png'
        },
        {
          name: 'Blue 002',
          color: '#bfdde5',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_34.png'
        },
        {
          name: 'Blue 003',
          color: '#b0d8e2',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_35.png'
        },
        {
          name: 'Blue 004',
          color: '#81c6d6',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_36.png'
        },
        {
          name: 'Blue 005',
          color: '#3aa7d0',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_37.png'
        },
        {
          name: 'Blue 006',
          color: '#008cb0',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_38.png'
        },
        {
          name: 'Blue 007',
          color: '#1268a5',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_39.png'
        },
        {
          name: 'Blue 008',
          color: '#004e75',
          url: 'https://media.foroom.ru/docs/kons/load/wood/WOOD_50_40.png'
        }
      ]
    } else if (productId === 'hblinds3') {
      return [
        {
          name: 'Red 001',
          color: '#eddadc',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-1.png'
        },
        {
          name: 'Red 002',
          color: '#efcac2',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-2.png'
        },
        {
          name: 'Red 003',
          color: '#ebb6bc',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-3.png'
        },
        {
          name: 'Red 004',
          color: '#e79d94',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-4.png'
        },
        {
          name: 'Red 005',
          color: '#d17e7a',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-5.png'
        },
        {
          name: 'Red 006',
          color: '#d66368',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-6.png'
        },
        {
          name: 'Red 007',
          color: '#b54b59',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-7.png'
        },
        {
          name: 'Red 008',
          color: '#a33246',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-8.png'
        },
        {
          name: 'Orange 001',
          color: '#f1e2cf',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-9.jpg'
        },
        {
          name: 'Orange 002',
          color: '#f4d0b6',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-10.png'
        },
        {
          name: 'Orange 003',
          color: '#f7c088',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-11.png'
        },
        {
          name: 'Orange 004',
          color: '#ee9e63',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-12.png'
        },
        {
          name: 'Orange 005',
          color: '#dd6e29',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-13.png'
        },
        {
          name: 'Orange 006',
          color: '#d0603b',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-14.png'
        },
        {
          name: 'Orange 007',
          color: '#c43c2c',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-15.png'
        },
        {
          name: 'Orange 008',
          color: '#b02512',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-16.png'
        },
        {
          name: 'Yellow 001',
          color: '#f5dfb6',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-17.png'
        },
        {
          name: 'Yellow 002',
          color: '#f4d59e',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-18.png'
        },
        {
          name: 'Yellow 003',
          color: '#f2c17c',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-19.png'
        },
        {
          name: 'Yellow 004',
          color: '#f1cd7f',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-20.png'
        },
        {
          name: 'Yellow 005',
          color: '#eabb73',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-21.png'
        },
        {
          name: 'Yellow 006',
          color: '#f3af5e',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-22.png'
        },
        {
          name: 'Yellow 007',
          color: '#f7bb4d',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-23.png'
        },
        {
          name: 'Yellow 008',
          color: '#ddaa01',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-24.png'
        },
        {
          name: 'Green 001',
          color: '#dbe6d5',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-25.png'
        },
        {
          name: 'Green 002',
          color: '#cee1c1',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-26.png'
        },
        {
          name: 'Green 003',
          color: '#abc258',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-27.png'
        },
        {
          name: 'Green 004',
          color: '#8ec277',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-28.png'
        },
        {
          name: 'Green 005',
          color: '#6fad57',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-29.png'
        },
        {
          name: 'Green 006',
          color: '#73a532',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-30.png'
        },
        {
          name: 'Green 007',
          color: '#228b50',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-31.png'
        },
        {
          name: 'Green 008',
          color: '#477535',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-32.png'
        },
        {
          name: 'Blue 001',
          color: '#cddee5',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-33.png'
        },
        {
          name: 'Blue 002',
          color: '#bfdde5',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-34.png'
        },
        {
          name: 'Blue 003',
          color: '#b0d8e2',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-35.png'
        },
        {
          name: 'Blue 004',
          color: '#81c6d6',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-36.png'
        },
        {
          name: 'Blue 005',
          color: '#3aa7d0',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-37.png'
        },
        {
          name: 'Blue 006',
          color: '#008cb0',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-38.png'
        },
        {
          name: 'Blue 007',
          color: '#1268a5',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-39.png'
        },
        {
          name: 'Blue 008',
          color: '#004e75',
          url: 'https://media.foroom.ru/docs/kons/load/gform50/roomg-form-50-40.png'
        }
      ]
    } else {
      return [
        {
          name: 'Red 001',
          color: '#eddadc',
          url: 'https://media.foroom.ru/docs/kons/load/1442437283b.png'
        },
        {
          name: 'Red 002',
          color: '#efcac2',
          url: 'https://media.foroom.ru/docs/kons/load/1442437291b.png'
        },
        {
          name: 'Red 003',
          color: '#ebb6bc',
          url: 'https://media.foroom.ru/docs/kons/load/1442437297b.png'
        },
        {
          name: 'Red 004',
          color: '#e79d94',
          url: 'https://media.foroom.ru/docs/kons/load/1442437322b.png'
        },
        {
          name: 'Red 005',
          color: '#d17e7a',
          url: 'https://media.foroom.ru/docs/kons/load/1442437332b.png'
        },
        {
          name: 'Red 006',
          color: '#d66368',
          url: 'https://media.foroom.ru/docs/kons/load/1442437342b.png'
        },
        {
          name: 'Red 007',
          color: '#b54b59',
          url: 'https://media.foroom.ru/docs/kons/load/1442437353b.png'
        },
        {
          name: 'Red 008',
          color: '#a33246',
          url: 'https://media.foroom.ru/docs/kons/load/1442437360b.png'
        },
        {
          name: 'Orange 001',
          color: '#f1e2cf',
          url: 'https://media.foroom.ru/docs/kons/load/1442437368b.png'
        },
        {
          name: 'Orange 002',
          color: '#f4d0b6',
          url: 'https://media.foroom.ru/docs/kons/load/1442437375b.png'
        },
        {
          name: 'Orange 003',
          color: '#f7c088',
          url: 'https://media.foroom.ru/docs/kons/load/1442437383b.png'
        },
        {
          name: 'Orange 004',
          color: '#ee9e63',
          url: 'https://media.foroom.ru/docs/kons/load/1442437392b.png'
        },
        {
          name: 'Orange 005',
          color: '#dd6e29',
          url: 'https://media.foroom.ru/docs/kons/load/1442437400b.png'
        },
        {
          name: 'Orange 006',
          color: '#d0603b',
          url: 'https://media.foroom.ru/docs/kons/load/1442437409b.png'
        },
        {
          name: 'Orange 007',
          color: '#c43c2c',
          url: 'https://media.foroom.ru/docs/kons/load/1442437417b.png'
        },
        {
          name: 'Orange 008',
          color: '#b02512',
          url: 'https://media.foroom.ru/docs/kons/load/1442437426b.png'
        },
        {
          name: 'Yellow 001',
          color: '#f5dfb6',
          url: 'https://media.foroom.ru/docs/kons/load/1442439393b.png'
        },
        {
          name: 'Yellow 002',
          color: '#f4d59e',
          url: 'https://media.foroom.ru/docs/kons/load/1442439415b.png'
        },
        {
          name: 'Yellow 003',
          color: '#f2c17c',
          url: 'https://media.foroom.ru/docs/kons/load/1442439433b.png'
        },
        {
          name: 'Yellow 004',
          color: '#f1cd7f',
          url: 'https://media.foroom.ru/docs/kons/load/1442439451b.png'
        },
        {
          name: 'Yellow 005',
          color: '#eabb73',
          url: 'https://media.foroom.ru/docs/kons/load/1442439468b.png'
        },
        {
          name: 'Yellow 006',
          color: '#f3af5e',
          url: 'https://media.foroom.ru/docs/kons/load/1442439488b.png'
        },
        {
          name: 'Yellow 007',
          color: '#f7bb4d',
          url: 'https://media.foroom.ru/docs/kons/load/1442439505b.png'
        },
        {
          name: 'Yellow 008',
          color: '#ddaa01',
          url: 'https://media.foroom.ru/docs/kons/load/1442439521b.png'
        },
        {
          name: 'Green 001',
          color: '#dbe6d5',
          url: 'https://media.foroom.ru/docs/kons/load/1442441063b.png'
        },
        {
          name: 'Green 002',
          color: '#cee1c1',
          url: 'https://media.foroom.ru/docs/kons/load/1442441079b.png'
        },
        {
          name: 'Green 003',
          color: '#abc258',
          url: 'https://media.foroom.ru/docs/kons/load/1442441094b.png'
        },
        {
          name: 'Green 004',
          color: '#8ec277',
          url: 'https://media.foroom.ru/docs/kons/load/1442441110b.png'
        },
        {
          name: 'Green 005',
          color: '#6fad57',
          url: 'https://media.foroom.ru/docs/kons/load/1442441126b.png'
        },
        {
          name: 'Green 006',
          color: '#73a532',
          url: 'https://media.foroom.ru/docs/kons/load/1442441142b.png'
        },
        {
          name: 'Green 007',
          color: '#228b50',
          url: 'https://media.foroom.ru/docs/kons/load/1442441160b.png'
        },
        {
          name: 'Green 008',
          color: '#477535',
          url: 'https://media.foroom.ru/docs/kons/load/1442441177b.png'
        },
        {
          name: 'Blue 001',
          color: '#cddee5',
          url: 'https://media.foroom.ru/docs/kons/load/1442443962b.png'
        },
        {
          name: 'Blue 002',
          color: '#bfdde5',
          url: 'https://media.foroom.ru/docs/kons/load/1442443978b.png'
        },
        {
          name: 'Blue 003',
          color: '#b0d8e2',
          url: 'https://media.foroom.ru/docs/kons/load/1442443991b.png'
        },
        {
          name: 'Blue 004',
          color: '#81c6d6',
          url: 'https://media.foroom.ru/docs/kons/load/1442444005b.png'
        },
        {
          name: 'Blue 005',
          color: '#3aa7d0',
          url: 'https://media.foroom.ru/docs/kons/load/1442444025b.png'
        },
        {
          name: 'Blue 006',
          color: '#008cb0',
          url: 'https://media.foroom.ru/docs/kons/load/1442444043b.png'
        },
        {
          name: 'Blue 007',
          color: '#1268a5',
          url: 'https://media.foroom.ru/docs/kons/load/1442444060b.png'
        },
        {
          name: 'Blue 008',
          color: '#004e75',
          url: 'https://media.foroom.ru/docs/kons/load/1442444075b.png'
        }
      ]
    }
    return wallColors;
  }

  setWallColor(color) {
    siteComponentStatesStore.setWallColor(color)
  }

  closeModal() {
    siteComponentStatesStore.setCheckPreviewModal(false)
  }

  get wallColor() {
    return siteComponentStatesStore.wallColorGetter
  }

  get template() {
    return calculatorStore.calculatedItemGetter
  }

  get product() {
    const { type, subtype } = this.template
    return catalogStore.currentProductGetter(type + subtype)
  }

  get material() {
    const material = calculatorStore.calculatedItemMaterialsGetter?.find(
      (material) => material.tid === this.template.material
    )
    return material
  }

  get materialImg() {
    if (this.material) {
      let material = this.material.img.prv1

      if (this.product.system === 'rolo') {
        if (this.template.MaterialCalc !== 1) {
          material = this.material.img.prv2
        }

        if (material == '0.jpg') {
          material = this.material.img.prv1
        }

        material = material?.replaceAll('rolo12', 'rolo6')
      }
      return 'https://media.foroom.ru/' + material
    }
    return ''
  }

  get materialPreviewImg() {
    const pic =
      this.template.MaterialCalc == 2
        ? this.material.img.ico2
        : this.material.img.ico1
    if (pic === '0.jpg') {
      return this.material.img.ico2
    }
    return 'https://media.foroom.ru/' + pic
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10000;
  cursor: pointer;
}
.preview-modal {
  position: fixed;
  width: 90%;
  max-width: 1080px;
  //min-height: 450px;
  height: fit-content;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 5px;
  background: #fff;
  z-index: 10001;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.25);

  .product-image {
    position: relative;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 4px;
    height: 400px;
    overflow: hidden;

    img {
      position: absolute;
      top: -10%;
      left: 0;
      object-fit: cover;
      width: 130%;
      height: 130%;
      border-radius: 4px;

      &.contain {
        object-fit: contain;
      }
    }
  }



  .title {
    margin-bottom: 4px;
    font-weight: 400;
    font-size: 18px;
  }

  .close-button {

  }

  .wall_color {
    display: inline-block;
    flex-shrink: 0;
    width: calc(5% - 8px);
    padding-bottom: 4%;
    margin: 0 4px 2px;
    border-radius: 5px;
    cursor: pointer;
    transition: transform .3s ease-in-out, opacity .3s ease-in-out;

    &.active {
      transform: scale(1.15);
      box-shadow: 0px 2px 8px rgba(#000, .35);
    }
    &:hover {
      opacity: .8;
      transform: scale(1.15);
    }
  }
}
.preview-modal.wood {
    .product-image{
      display: flex;
    img {
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 4px;
      }

    }
  }
</style>
