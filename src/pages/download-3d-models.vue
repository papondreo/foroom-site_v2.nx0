<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <ui-title
            tag="h1"
            class="ui-title-1"
          >
            3D-модели штор
          </ui-title>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col d-sm-none d-md-flex img-wrapper order-sm-0 order-md-1">
          <ui-img
            src="/_images/3dmodels.png"
            alt="3D модели FOROOM"
          />
        </div>
        <div
          class="col-12 col-md-7 col-lg-7 col-xl-6 mt-3 order-sm-1 order-md-0"
        >
          <p class="main-text ui-mb-4">
            Возросшая известность бренда FOROOM позволяет торговой марке быть
            партнером многих дизайнерских студий и содействовать в реализации
            архитектурных проектов.
          </p>
          <p class="ui-mb-4">
            Для тех, кто выбирает изделия тм FOROOM, были специально созданы
            3D-модели солнцезащитных систем высокого качества, а также бесшовные
            текстуры материалов. Скачать бесплатно все эти файлы можно в этом
            разделе сайта.
          </p>
          <p class="mb-0">
            Дизайнерам и архитекторам, которые планируют сотрудничать с тм
            FOROOM на постоянной основе, заказывать изделия часто и много,
            предоставляются преференции. Для получения подробной консультации об
            условиях сотрудничества оставьте заявку на странице «Партнерам».
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-12 tabs mb-3">
          <button
            v-for="(tab, i) in tabs"
            :class="{ tab_active: selectedTab === i }"
            :key="`tab-${i}`"
            class="tab"
            @click="selectTab(i)"
            :aria-label="tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <template v-if="selectedTab === 0">
        <div class="row">
          <div class="col-12">
            <ui-title
              tag="h2"
              class="ui-title-2"
            >
              3D модели жалюзи FOROOM®
            </ui-title>
<!--                        <pre>{{ products }}</pre>-->
          </div>
        </div>

        <div class="row hrz-scroll">
          <div
            v-for="system in products"
            :key="`3d-${system.productId}`"
            v-show="system.model3Durl"
            class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 full-size"
          >
            <a
              @click.prevent="goalTracking(system)"
              :href="`/_downloads/3d/${system.model3Durl}`"
              class="card"
            >
              <div class="card__img">
                <img
                  :src="`/_images/3d-models/${system.url.split('/').pop()}.jpg`"  
                  :alt="`3D модели FOROOM ${system.title}`"
                >
              </div>
              <footer class="card__footer">
                <div
                  class="item-card__logo-bg"
                  :style="`background-image: url(/_images/${system.type}-lines.svg)`"
                ></div>
                <h3 class="item-card__title">{{ system.title }}</h3>
                <p class="item-card__subtitle">{{ system.typeName }}</p>
              <p class="item-card__description">
                <span><i class="fa fa-cogs"></i></span>
                <span>
                  {{
                    (system.productId === 'hblinds1' || system.productId === 'ks251'|| system.productId === 'rolo31'|| system.productId === 'zebra33'|| system.productId === 'roma1')
                      ? '3dsMax 2014'
                      : (['vblinds','hblinds','rolo','zebra','karniz','wood','roma'].includes(system.system)
                          ? '3dsMax 2021'
                          : '3dsMax 2014')
                  }}
                </span><br />
                <span>
                  {{
                    (system.productId === 'hblinds1' || system.productId === 'ks251'|| system.productId === 'rolo31'|| system.productId === 'zebra33'|| system.productId === 'roma1')
                      ? 'fbx (Corona)'
                      : (['vblinds','hblinds','rolo','zebra','karniz','wood','roma'].includes(system.system)
                          ? 'fbx (Corona+Vray)'
                          : 'fbx (Corona)')
                  }}
                </span>
              </p>

             
                <div class="card__button">
                  <span>{{ system.model3Dsize }}</span>
                  <i
                    class="fa fa-download"
                    aria-hidden="true"
                  ></i>
                </div>
              </footer>
            </a>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row">
          <div class="col-12">
            <ui-title
              tag="h2"
              class="ui-title-2"
            >
              Бесшовные текстуры материалов
            </ui-title>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-6 full-size">
            <a
              href="/_downloads/textures/plisse_texture.zip"
              class="card card_textures"
            >
              <div class="card__img">
                <img
                  src="https://foroom.ru/_images/3d-models/plisse-textures.jpg"
                  alt=""
                >
              </div>
              <footer class="card__footer">
                <div
                  class="item-card__logo-bg"
                  :style="`background-image: url(https://foroom.ru/_images/plisse-lines.svg)`"
                ></div>
                <h3 class="item-card__title">Шторы<br />плиссе</h3>
                <div class="card__button">
                  <span>9,6 Mb</span>
                  <i
                    class="fa fa-download"
                    aria-hidden="true"
                  ></i>
                </div>
              </footer>
            </a>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-6 full-size">
            <a
              href="/_downloads/textures/rulonnye_shtory_texture.zip"
              class="card card_textures"
            >
              <div class="card__img">
                <img
                  src="https://foroom.ru/_images/3d-models/rolo-textures.jpg"
                  alt=""
                >
              </div>
              <footer class="card__footer">
                <div
                  class="item-card__logo-bg"
                  :style="`background-image: url(https://foroom.ru/_images/rolo-lines.svg)`"
                ></div>
                <h3 class="item-card__title">Рулонные<br />шторы</h3>
                <div class="card__button">
                  <span>53,9 Mb</span>
                  <i
                    class="fa fa-download"
                    aria-hidden="true"
                  ></i>
                </div>
              </footer>
            </a>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-6 full-size">
            <a
              href="/_downloads/textures/rulonnye_shtory_duo_texture.zip"
              class="card card_textures"
            >
              <div class="card__img">
                <img
                  src="https://foroom.ru/_images/3d-models/duo-textures.jpg"
                  alt=""
                >
              </div>
              <footer class="card__footer">
                <div
                  class="item-card__logo-bg"
                  :style="`background-image: url(https://foroom.ru/_images/rolo-lines.svg)`"
                ></div>
                <h3 class="item-card__title">Рулонные<br />шторы DUO</h3>
                <div class="card__button">
                  <span>33,8 Mb</span>
                  <i
                    class="fa fa-download"
                    aria-hidden="true"
                  ></i>
                </div>
              </footer>
            </a>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-6 full-size">
            <a
              href="/_downloads/textures/v-form_texture.zip"
              class="card card_textures"
            >
              <div class="card__img">
                <img
                  src="https://foroom.ru/_images/3d-models/v-form-textures.jpg"
                  alt=""
                >
              </div>
              <footer class="card__footer">
                <div
                  class="item-card__logo-bg"
                  :style="`background-image: url(https://foroom.ru/_images/vblinds-lines.svg)`"
                ></div>
                <h3 class="item-card__title">Вертикальные жалюзи</h3>
                <div class="card__button">
                  <span>13,3 Mb</span>
                  <i
                    class="fa fa-download"
                    aria-hidden="true"
                  ></i>
                </div>
              </footer>
            </a>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-6 full-size">
            <a
              href="/_downloads/textures/g-form_textures.zip"
              class="card card_textures"
            >
              <div class="card__img">
                <img
                  src="https://foroom.ru/_images/3d-models/g-form-textures.jpg"
                  alt=""
                >
              </div>
              <footer class="card__footer">
                <div
                  class="item-card__logo-bg"
                  :style="`background-image: url(https://foroom.ru/_images/hblinds-lines.svg)`"
                ></div>
                <h3 class="item-card__title">Горизонтальные жалюзи</h3>
                <div class="card__button">
                  <span>10,7 Mb</span>
                  <i
                    class="fa fa-download"
                    aria-hidden="true"
                  ></i>
                </div>
              </footer>
            </a>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-6 full-size">
            <a
              href="/_downloads/textures/roma_texture.zip"
              class="card card_textures"
            >
              <div class="card__img">
                <img
                  src="https://foroom.ru/_images/3d-models/roma-textures.jpg"
                  alt=""
                >
                
              </div>
              <footer class="card__footer">
                <div
                  class="item-card__logo-bg"
                  :style="`background-image: url(https://foroom.ru/_images/roma-lines.svg)`"
                ></div>
                <h3 class="item-card__title">Римские<br />шторы</h3>
                <div class="card__button">
                  <span>1,6 Mb</span>
                  <i
                    class="fa fa-download"
                    aria-hidden="true"
                  ></i>
                </div>
              </footer>
            </a>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PageComponent from '@/components/PageComponent.vue'
import { catalogStore } from '@/utils/store-accessor'

@Component({
  components: { PageComponent }
})
export default class Download3dModelsPage extends Vue {
  selectedTab = 0
  tabs = ['3D модели жалюзи FOROOM', 'Бесшовные текстуры материалов']
  head () {
    return {
      title: '3D-модели штор: скачать 3Д-модель рулонных штор бесплатно',
      meta: [
        { hid: 'description', name: 'description', content: '3D-модели штор: скачать 3Д-модель рулонных штор бесплатно в интернет-магазине FOROOM. Модели рулонных штор – солнцезащитные системы высокого качества. Пригодные для печати, готовые для вашего дизайна. Скачивайте на сайте!'}
      ]
    }
  }
  async goalTracking(system) {
    const goal = this.selectedTab === 1 ? 'downloadTexture' : 'download3d'

    await this.$saleForoomCounter(goal, {
      fileName: system.model3Durl,
      system: system.productId,
      systemName: system.title
    })
    window.location.href = `/_downloads/3d/${system.model3Durl}`
  }
  selectTab(i) {
    this.selectedTab = i
  }

  get products() {
    const products = catalogStore.catalogGetter
    products.map(p => {

      if (p.productId === 'introma1') {
        p.model3Durl = 'introma1.zip'
      }
        return p
    })
    catalogStore.catalogGetter.filter(i => i.system === 'introma1')
    return products.filter(item => item.model3Durl !== null)
  }
}
</script>

<style lang="scss" scoped>
.main-text {
  line-height: 1.3;
  font-weight: normal !important;
  font-size: 20px;
  color: #3b3a49 !important;
}

.tab {
  display: inline-block;
  padding: 4px 16px;
  margin-right: 5px;
  margin-bottom: 5px;
  /*min-width: max-content*/
  font-weight: 300;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  &_active {
    color: #ffffff !important;
    background: #ffa845 !important;
    border-color: #ffa845 !important;
  }
  &:hover {
    background: #ebebeb;
    border-color: #ebebeb;
  }
}

.card {
  display: block;
  margin-bottom: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
  &__img {
    border-radius: 5px;
    position: relative;
    padding-bottom: 100%;
    background: #ffffff;
    img {
      position: absolute;
      width: 90%;
      height: 90%;
      top: 5%;
      left: 5%;
      object-fit: contain;
      object-position: center;
      transition: 1s ease-in-out;
    }
  }
  &__button {
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    justify-content: right;
    align-items: center;
    width: 70px;
    height: 70px;
    right: -25px;
    bottom: -15px;
    border-radius: 40px;
    background: #f9a134;
    color: #fff;
    border: 10px solid #f8f8f8;
    box-sizing: border-box;
    overflow: hidden;
    transition: 0.4s ease-in-out;
    z-index: 3;
    span {
      font-size: 15px;
      margin-right: 5px;
      white-space: nowrap;
    }
    i {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      width: 50px;
      height: 40px;
      transition: 0.4s ease-in-out;
    }
  }
  &__footer {
    position: relative;
    padding: 15px;
  }
  &:hover {
    .card__img img {
      transform: rotateY(30deg);
    }
    .card__button {
      background: #ff920c;
      width: 150px;
      i {
        padding-top: 5px;
      }
    }
  }
}
.card_textures {
  .card {
    &__img img {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px 5px 0 0;
      transform: none !important;
    }
    &__footer {
      padding-bottom: 35px;
    }
  }
}
.item-card__title {
  text-transform: uppercase;
  font-size: 16px;
}
.item-card__description {
  i {
    margin-right: 5px;
  }
  &.pl {
    padding-left: 27px;
  }
}
</style>
