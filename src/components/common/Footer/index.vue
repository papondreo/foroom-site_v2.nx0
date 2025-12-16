<template>
  <footer>
    <div class="site-footer">
      <div class="container">
        <div class="row">
<!--          <div class="col-md-6 mb-3">-->
<!--            <div class="row">-->
<!--              <div class="col-12 block-title">-->
<!--                <p class="link_strong d-block d-sm-none">Каталог</p>-->
<!--                <nuxt-link-->
<!--                  to="/catalog"-->
<!--                  no-prefetch-->
<!--                  class="d-none d-sm-block link_strong"-->
<!--                >-->
<!--                  Каталог-->
<!--                </nuxt-link>-->
<!--                <hr class="line" />-->
<!--                <i-->
<!--                  ref="catalog-block-angle"-->
<!--                  class="fa fa-angle-down toggle-block-button"-->
<!--                ></i>-->
<!--              </div>-->

<!--              <div-->
<!--                ref="catalog-block"-->
<!--                class="col-12 sm-hidden"-->
<!--              >-->
<!--                <div class="row mb-4">-->
<!--                  <div class="col-md-4 col-sm-6">-->
<!--                    <div class="row">-->
<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="rolo"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="plisse"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="col-md-4 col-sm-6">-->
<!--                    <div class="row">-->
<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="zebra"-->
<!--                        class="col-12"-->
<!--                      />-->

<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="vblinds"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="col-md-4">-->
<!--                    <div class="row">-->
<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="hblinds"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="wood"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                    </div>-->
<!--                    <div class="row">-->
<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="karniz"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                      <catalog-links-block-->
<!--                        type="catalog"-->
<!--                        system="roma"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="col-md-6 mb-3">-->
<!--            <div class="row">-->
<!--              <div class="col-12 block-title">-->
<!--                <p class="link_strong d-block d-sm-none">Конструктор</p>-->
<!--                <nuxt-link-->
<!--                  to="/buy"-->
<!--                  no-prefetch-->
<!--                  class="d-none d-sm-block link_strong"-->
<!--                >-->
<!--                  Конструктор-->
<!--                </nuxt-link>-->
<!--                <hr class="line" />-->
<!--                <i-->
<!--                  ref="cons-block-angle"-->
<!--                  class="fa fa-angle-down toggle-block-button"-->
<!--                ></i>-->
<!--              </div>-->

<!--              <div-->
<!--                ref="catalog-block"-->
<!--                class="col-12 sm-hidden"-->
<!--              >-->
<!--                <div class="row mb-4">-->
<!--                  <div class="col-md-4 col-sm-6">-->
<!--                    <div class="row">-->
<!--                      <catalog-links-block-->
<!--                        type="calculator"-->
<!--                        system="rolo"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                      <catalog-links-block-->
<!--                        type="calculator"-->
<!--                        system="plisse"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="col-md-4 col-sm-6">-->
<!--                    <div class="row">-->
<!--                      <catalog-links-block-->
<!--                        type="calculator"-->
<!--                        system="zebra"-->
<!--                        class="col-12"-->
<!--                      />-->

<!--                      <catalog-links-block-->
<!--                        type="calculator"-->
<!--                        system="vblinds"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="col-md-4">-->
<!--                    <div class="row">-->
<!--                      <catalog-links-block-->
<!--                        type="calculator"-->
<!--                        system="hblinds"-->
<!--                        class="col-12"-->
<!--                      />-->

<!--                      <catalog-links-block-->
<!--                        type="calculator"-->
<!--                        system="roma"-->
<!--                        class="col-12"-->
<!--                      />-->
<!--                    </div>-->
<!--&lt;!&ndash;                    <div class="row">&ndash;&gt;-->
<!--&lt;!&ndash;                      <catalog-links-block&ndash;&gt;-->
<!--&lt;!&ndash;                        type="calculator"&ndash;&gt;-->
<!--&lt;!&ndash;                        system="karniz"&ndash;&gt;-->
<!--&lt;!&ndash;                        class="col-12"&ndash;&gt;-->
<!--&lt;!&ndash;                      />&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

          <div class="col-md-6 col-sm-6 mb-3">
            <div class="row">
              <div
                class="col-12 block-title"
                @click="toggleBlock('clients-block')"
              >
                <p class="link_strong">Покупателям</p>
                <hr class="line" />
                <i
                  ref="clients-block-angle"
                  class="fa fa-angle-down toggle-block-button"
                ></i>
              </div>
              <div
                ref="clients-block"
                class="col-12 sm-hidden"
              >
                <ul>
                  <li>
                    <nuxt-link
                      to="/sale-points"
                      no-prefetch
                      >Где купить, адреса магазинов</nuxt-link
                    >
                  </li>

                  <li>
                    <nuxt-link
                      to="/kak-kupit"
                      no-prefetch
                      >Как купить, правила продажи товара</nuxt-link
                    >
                  </li>

                  <li>
                    <nuxt-link
                      to="/installation"
                      no-prefetch
                      >Замер и установка</nuxt-link
                    >
                  </li>

                  <li>
                    <nuxt-link
                      to="/delivery"
                      no-prefetch
                      >Доставка</nuxt-link
                    >
                  </li>

                  <li>
                    <nuxt-link
                      to="/usloviya-ispolzovaniya-tovara"
                      no-prefetch
                      >Условия эффективного и безопасного использования товаров
                    </nuxt-link>
                  </li>

                  <li>
                    <nuxt-link
                      to="/warranty"
                      no-prefetch
                      >Гарантия</nuxt-link
                    >
                  </li>

                  <li>
                    <a @click="showCallbackModal">Обратная связь</a>
                    <!--<nuxt-link to="/callback" no-prefetch>Обратная связь</nuxt-link>-->
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="row">
              <div
                class="col-12 block-title"
                @click="toggleBlock('partners-block')"
              >
                <!--                                <p class="link_strong">Сотрудничество</p>-->
                <p class="link_strong">Партнёрам</p>
                <hr class="line" />
                <i
                  ref="partners-block-angle"
                  class="fa fa-angle-down toggle-block-button"
                ></i>
              </div>
              <ul
                ref="partners-block"
                class="col-12 sm-hidden"
              >
                <li>
                  <nuxt-link
                    to="/partneram-foroom"
                    no-prefetch
                    >Стать партнёром</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link
                    to="/download-3d-models"
                    no-prefetch
                    >Дизайнерам</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link
                    to="/about-foroom"
                    no-prefetch
                    >О FOROOM</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link
                    to="/proizvodstvo-foroom"
                    no-prefetch
                    >Производство</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!--
        <div class="row mb-3">
            <div class="col-12 block-title">
                <nuxt-link to="/news" no-prefetch class="link_strong">Новости</nuxt-link>
                <hr class="line">
            </div>
            <div class="col-12">
                <ul class="row">
                    <li class="col-md-4"
                        v-for="(item, i) in news"
                        :key="`news-link-${i}`"
                    >
                        <nuxt-link :to="`/news/${item.url}`" no-prefetch>{{item.title}}</nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        -->

<!--        <div class="row">-->
<!--          <div-->
<!--            class="col-12 block-title"-->
<!--            @click="toggleBlock('articles-block')"-->
<!--          >-->
<!--            <p class="link_strong">Статьи</p>-->
<!--            <hr class="line" />-->
<!--            <i-->
<!--              ref="articles-block-angle"-->
<!--              class="fa fa-angle-down toggle-block-button"-->
<!--            ></i>-->
<!--          </div>-->
<!--          <div-->
<!--            ref="articles-block"-->
<!--            class="col-12 sm-hidden"-->
<!--          >-->
<!--            <ul class="row">-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/zhalyuzi-vertikalnye-tkanevyye/"-->
<!--                  >Вертикальные тканевые жалюзи</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/zhalyuzi-vertikalnye-plastikovyye/"-->
<!--                  >Пластиковые вертикальные жалюзи</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/gorizontalnye-alyuminiyevyye-zhalyuzi/"-->
<!--                  >Горизонтальные алюминиевые жалюзи-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rulonnye-shtory-zebra/"-->
<!--                  >Рулонные шторы Зебра</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rulonnye-shtory-den-noch/"-->
<!--                  >Рулонные шторы день ночь</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/kassetnye-shtory/"-->
<!--                  >Рулонные кассетные шторы</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/nedorogiye-rulonnye-shtory/"-->
<!--                  >Недорогие рулонные шторы</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/gorizontalnye-zhalyuzi-na-plastikovyye-okna/"-->
<!--                  >Горизонтальные жалюзи на пластиковые окна-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/alyuminiyevyye-zhalyuzi-na-plastikovyye-okna/"-->
<!--                  >Алюминиевые жалюзи на пластиковые окна-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/gorizontalnye-alyuminiyevyye-zhalyuzi-na-plastikovyye-okna/"-->
<!--                  >Горизонтальные алюминиевые жалюзи на пластиковые окна.-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rimskiye-shtory-na-zakaz/"-->
<!--                  >Римские шторы на заказ</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/istoriya-poyavleniya-shtor-plisse/"-->
<!--                  >История возникновения штор плиссе-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rulonnye-shtory-den-noch-zebra/"-->
<!--                  >Рулонные шторы DUO, или день-ночь</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/kak-vybrat-gorizontalnye-zhalyuzi/"-->
<!--                  >Как выбрать горизонтальные жалюзи-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rimskiye-shtory-na-kukhnyu/"-->
<!--                  >Римские шторы на кухню</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/stoimost-rimskikh-shtor/"-->
<!--                  >Стоимость римских штор</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rimskiye-shtory-v-detskuyu/"-->
<!--                  >Римские шторы в детскую</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/katalog-tsen-na-rimskiye-shtory/"-->
<!--                  >Каталог цен на римские шторы</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rimskiye-shtory-news/"-->
<!--                  >Римские шторы</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rulonnykh-shtor-spb/"-->
<!--                  >Рулонные шторы в Санкт-Петербурге</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/plastikovyye-zhalyuzi-na-plastikovyye-okna-bez-sverleniya/"-->
<!--                  >Пластиковые жалюзи на пластиковые окна без сверления-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/izgotovleniye-zhalyuzi/"-->
<!--                  >Изготовление жалюзи</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/gotovye-rulonnye-shtory/"-->
<!--                  >Готовые рулонные шторы</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/na-plastikovie-okna-kassetnyye-zhalyuzi/"-->
<!--                  >Кассетные жалюзи на пластиковые окна-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/gotovyye-zhalyuzi/"-->
<!--                  >Готовые жалюзи</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/rulonnye-shtory-na-plastikovyye-okna/"-->
<!--                  >Рулонные шторы на пластиковые окна-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/razmery-rulonnykh-shtor/"-->
<!--                  >Размеры рулонных штор</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/rulonnye-zhalyuzi-na-plastikovyye-okna/"-->
<!--                  >Рулонные жалюзи на пластиковые окна-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/zhalyuzi-na-okna-nedorogo/"-->
<!--                  >Недорогие жалюзи на окна</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/tkanevyye-zhalyuzi-na-plastikovyye-okna/"-->
<!--                  >Тканевые жалюзи на пластиковые окна-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/katalog-rulonnykh-shtor-zebra/"-->
<!--                  >Каталог рулонных штор зебра</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/alyuminiyevyye-zhalyuzi-na-plastikovyye-okna-nedorogo/"-->
<!--                  >Недорогие алюминивые жалюзи на пластиковые окна-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/zhalyuzi-na-plastikovyye-okna/"-->
<!--                  >Жалюзи на пластиковые окна</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link-->
<!--                  to="/articles/krepleniya-dlya-gorizontalnykh-alyuminiyevykh-zhalyuzi/"-->
<!--                  >Крепления для горизонтальных алюминиевых жалюзи-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/alyuminiyevyye-zhalyuzi/"-->
<!--                  >Алюминиевые жалюзи</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--              <li class="col-md-4">-->
<!--                <nuxt-link to="/articles/magazin-zhalyuzi/"-->
<!--                  >Магазин жалюзи</nuxt-link-->
<!--                >-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->

<!--          <div class="col-12 mt-3 mb-3">-->
<!--            <hr class="separator" />-->
<!--          </div>-->
<!--        </div>-->

        <div class="row">
          <div class="col-12 socials">
            <div class="socials__container">
              <a
                href="https://vk.com/foroom"
                target="_blank"
                rel="dofollow noopener noreferrer"
              >
                <i
                  class="fa fa-vk"
                  aria-hidden="true"
                ></i>
                Вконтакте
              </a>
              <a
                href="https://ok.ru/group55293984899091"
                target="_blank"
                rel="dofollow noopener noreferrer"
              >
                <i
                  class="fa fa-odnoklassniki"
                  aria-hidden="true"
                ></i>
                Одноклассники
              </a>
              <a
                href="https://www.youtube.com/channel/UCFol1C5nfsXLWR5M8yUg1YQ"
                target="_blank"
                rel="dofollow noopener noreferrer"
              >
                <i
                  class="fa fa-youtube-play"
                  aria-hidden="true"
                ></i>
                YouTube
              </a>
              <a
                href="https://www.pinterest.ru/foroom_ru/boards"
                target="_blank"
                rel="dofollow noopener noreferrer"
              >
                <i
                  class="fa fa-pinterest"
                  aria-hidden="true"
                ></i>
                Pinterest
              </a>
            </div>
          </div>
          <div class="col-12 ui-text-center">
            <nuxt-link
              to="/politikadannyx/"
              no-prefetch
              href=""
              class="personal-info"
            >
              Политика компании в отношении обработки персональных данных
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container-lg">
      <div class="row">
        <div class="col-12">
          <p class="copyright">
            Все права защищены © {{ yearS }}  Солнцезащитные системы FOROOM ®
            Копирование и использование материалов без разрешения
            правообладателя запрещено!
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { catalogStore, siteComponentStatesStore } from '@/store'
import { CatalogProduct } from '@/types/Catalog'
import CatalogLinksBlock from "@/components/common/Footer/CatalogLinksBlock.vue"
import moment from 'moment'
@Component({
  components: { CatalogLinksBlock }
})
export default class PageFooter extends Vue {
  public catalogParams = [
    { system: 'rolo', className: '' },
    { system: 'zebra', className: '' },
    { system: 'vblinds', className: '' },
    { system: 'hblinds', className: '' },
    { system: 'wood', className: '' },
    { system: 'plisse', className: '' },
    { system: 'roma', className: '' },
    { system: 'karniz', className: '' }
  ]
  created() {
    this.yearS = moment().format('YYYY');
  }
    showCallbackModal() {
    siteComponentStatesStore.setCallbackModal('callBack')

    this.$saleForoomCounter('openOneClick')
    this.$yandexMetrika.reachGoal('NF_openCallbackForm')
  }

  getProducts(system: string): CatalogProduct[] {
    return catalogStore.products.filter(
      (product: CatalogProduct) => product.system === system
    )
  }
}
</script>

<style lang="sass" scoped>
footer
  margin-top: 48px
  padding-top: 40px
  border-top: 1px solid #ddd
  background: #ebebeb

.site-footer
  padding: 0 12px 15px

  &::v-deep
    a, p
      line-height: 1.2
      margin-bottom: 5px
      font-size: 14px
      display: inline-block

      &:hover:not(p)
        text-decoration: underline !important

      &.link_medium
        font-weight: 400
        margin-bottom: 5px
      &.link_strong
        font-size: 15px
        font-weight: 400
        text-transform: uppercase
        margin-bottom: 7px
      &.ttu
        text-transform: uppercase

  .socials
    display: flex
    justify-content: center
    margin-bottom: 30px

    a
      margin: 0 15px
      display: inline-block

      i
        font-size: 20px
        margin-right: 5px


.block-title
  display: flex
  align-items: baseline

.line
  border: none
  height: 1px
  background: #ddd
  display: flex
  width: 100%
  margin-left: 10px
.toggle-block-button
  display: none
.separator
  display: block
  border: none
  height: 1px
  background: #ddd

.personal-info
  font-size: 15px
  margin: 0 auto

.copyright
  padding: 10px 0
  text-align: center
  font-size: 14px
</style>
