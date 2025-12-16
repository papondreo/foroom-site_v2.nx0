<template>
  <main>
    <section class="container">
      <div v-if="showPromoHotSelf" class="row">
        <div class="col-sm-12 slider" @click="redirectToAction()">
          <img src="/img-new/25_06_12_Лови_Момент.jpg"
               alt="купить вертикальные жалюзи и рулонные шторы со скидкой"
               title="купить вертикальные жалюзи и рулонные шторы со скидкой">
        </div>
      </div>
      <div v-else class="row">
        <div v-if="showPromo2" class="col-sm-8 promo2" @click="redirectToNews()">
          <img :src="'https://www.foroom.ru/img/images/nf_foroom/actions/action_ge_'+day_shove+'.jpg'"
               alt="'Успей купить рулонные шторы выгодно'"
               title="'шок цена только до конца января'">
        </div>
        <!-- <div v-else class="col-sm-8 slider" @click="redirectToshops()">
          <img :src="'/img-new/'+sale_pointsName+'.jpg'"
               alt="Солнцезащитные системы с электроприводом – трендовые изделия для современных помещений"
               title="Новинки в интернет магазине FOROOM – солнцезащитные системы с электроприводом для всех типов помещений ">
        </div> -->

          <promo-block/>

      </div>
    </section>

    <section class="container">
      <advantages-block />
    </section>

    <div class="container bestsellers">
      <ui-title
        tag="h1"
        class="ui-title-1 ui-text-uppercase"
      >
        Хиты продаж
      </ui-title>

      <div class="row">
        <aside class="d-none d-lg-block col-lg-3 col-xl-2 ui-sticky">
<!--          <products-filter-->
<!--            :filter-by="filterBy"-->
<!--            :products="bestsellers"-->
<!--            v-model="filteredBestsellers"-->
<!--            ref="productsFilter"-->
<!--            class="ui-sticky"-->
<!--          />-->
          <bestsellers-products-filter
            :products="bestsellers"
            v-model="filteredBestsellers"
            ref="productsFilter"
            class="ui-sticky"
          />
        </aside>

        <section class="col-lg-9 col-xl-10">
          <bestsellers
            :products="filteredBestsellers"
            @reset-filter="$refs.productsFilter.resetFilter()"
          />
        </section>
      </div>
    </div>

    <section class="about mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="about__img">
              <ui-img
                src="_images/clic-box.jpg"
                preview="_images/clic-box_min.jpg"
                alt="clic box"
              />
            </div>
          </div>
          <div class="col-md">
            <div class="about__text">
              <ui-title
                tag="p"
                class="ui-title-1"
              >
                Жалюзи FOROOM
              </ui-title>

              <p class="mb-3">
                FOROOM® – это российский зарегистрированный товарный знак (также
                Товарная марка; ™) штор плиссе, жалюзи, рулонных и римских штор.
                Создан для того, чтобы обеспечить покупателей качественными
                солнцезащитными изделиями массового спроса по единой низкой цене
                на всей территории России.
              </p>
              <p class="mb-4">
                Политика дистрибуции предусматривает контроль над соблюдением
                обозначенной на сайте цены на изделия FOROOM во всех официальных
                розничных точках продаж.
              </p>
              <p class="mb-4">
                Если вас интересуют оконные жалюзи на заказ, предлагаем
                продукцию нашей марки.
              </p>
              <div class="flex-line flex-line_right">
                <nuxt-link
                  class="show-more"
                  to="/about-foroom"
                >
                  Читать далее
                  <span
                    ><i
                      class="fa fa-angle-right"
                      aria-hidden="true"
                    ></i
                  ></span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="factory mb-5">
  <div class="container">
    <div class="row">
      <div class="col-lg">
        <div class="about__text">
          <ui-title tag="p" class="ui-title-1">
            Производитель. Собственный завод FOROOM
          </ui-title>
          <p class="mb-4">
            Современное высокотехнологичное автоматизированное производство,
            позволяющее выпускать большие объемы продукции, и прямые
            поставки комплектующих из европейских и восточных стран,
            являющихся мировыми лидерами по качеству производимых
            компонентов, позволяют изготавливать солнцезащитные изделия
            высокого уровня и без лишних наценок.
          </p>
          <div class="flex-line flex-line_right">
            <nuxt-link class="show-more" to="/proizvodstvo-foroom">
              Читать далее
              <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <!-- Заменяем youtube-video на iframe с Rutube -->
        <div class="rutube-video-wrapper">
          <iframe
            width="720"
            height="405"
            src="https://rutube.ru/play/embed/eaa19bc2b51f6e163efd9f7c6947957f"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

    <div class="container">
      <callback-promo-block class="mb-5" />
    </div>

    <section class="awards mb-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ui-title
              tag="p"
              class="ui-title-2"
            >
              Наши достижения
            </ui-title>
          </div>
          <div class="col-6 col-md-3">
            <div class="award__item">
              <ui-img
                src="_images/awards/reward1.png"
                preview=""
                alt=""
                class="award-img"
              />
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="award__item">
              <ui-img
                src="_images/awards/reward2.png"
                preview=""
                alt=""
                class="award-img"
              />
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="award__item">
              <ui-img
                src="_images/awards/reward3.png"
                preview=""
                alt=""
                class="award-img"
              />
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="award__item">
              <ui-img
                src="_images/awards/reward2019.png"
                preview=""
                alt=""
                class="award-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="text-block">
      <div class="container">
        <div class="row">
          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
            >
              Ассортимент жалюзи
            </ui-title>
            <p class="mb-2">
              На сайте одного из крупнейших производителей жалюзи в России вы можете увидеть
              большой перечень солнцезащитных изделий с удобной системой выбора и фильтрации
              по основным критериям. Мы предлагаем горизонтальные и вертикальные жалюзи, шторы
              плиссе, римские и рулонные шторы, а также системы профильных карнизов. Стоимость продукции устанавливается производителем, поэтому дополнительные наценки на
              изделия и скрытые платежи исключены. Весь ассортимент условно разделен на две
              категории:
            </p>
            <p class="mb-2">
              <strong>Интегрированные изделия для ПВХ-окон (NTEGRA).</strong><br/>
              Изделия этой группы обеспечивают плотное прилегание к оконным створкам с формированием цельной
              конструкции. Они не нарушают воздухообмен в помещении и сохраняют
              свободный доступ к подоконнику;
            </p>

            <p class="mb-2">
              <strong>Решения для полного перекрытия проема.</strong><br/>
              Такие конструкции фиксируются к
              стене или потолку. Отдельные модели могут устанавливаться непосредственно в
              проем. За счет использования надежной фурнитуры системы рассчитаны на
              большие нагрузки. Что касается способа управления, то в каталоге есть
              продвинутые серии, которые управляются с помощью пульта ДУ, что существенно
              облегчает процесс эксплуатации. Еще одним достоинством второй группы систем
              перекрытия проемов является качественная маскировка непрезентабельных
              элементов и зон: приборов отопления, розеток, проводов и других коммуникаций.
              Доступные в продаже серии различаются принципом действия, особенностями
              монтажа и стоимостью.
            </p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
            >
              Выбор жалюзи для дома
            </ui-title>
            <p class="mb-2">
              В подборе светозащитных конструкций для своего дома отсутствуют особые сложности.
              Для начала нужно выбрать место их монтажа и определить вариант исполнения. Чтобы
              облегчить процесс подбора, вы можете сравнить доступные в продаже модели по разным
              параметрам и ознакомиться с достоинствами и особенностями каждого продукта.
            </p>
            <p class="mb-2">
              Конструкции серии INTEGRA устанавливаются на стандартные деревянные или ПВХ окна.
              Они не подходят для установки на широкие оконные проемы. Подобрать жалюзи можно
              на нашем сайте, воспользовавшись онлайн-конструктором. Это упростит процесс и
              позволит сократить время.
            </p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
            >
              КУПИТЬ НА ОКНА ЖАЛЮЗИ В ИНТЕРНЕТ-МАГАЗИНЕ ПРОИЗВОДИТЕЛЯ СОЛНЦЕЗАЩИТНЫХ СИСТЕМ FOROOM ПРОСТО
            </ui-title>
            <p class="mb-2">
              Для этого нужно открыть вкладку
              <nuxt-link to="/buy" class="ui-link ui-color-brand-orange__light">«Конструктор»</nuxt-link>
              и указать подходящий тип
              светозащитной системы. Далее следует выбрать требуемые параметры и получить
              готовую продукцию для своего окна.
            </p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
            >
              ЗАКАЗАТЬ ЖАЛЮЗИ FOROOM В БЛИЖАЙШЕМ МАГАЗИНЕ ИЛИ ПО ТЕЛЕФОНУ ЛЕГКО
            </ui-title>
            <p class="mb-2">
              В этом случае нужно перейти в раздел <nuxt-link to="buy" class="ui-link ui-color-brand-orange__light">«Где купить»</nuxt-link> и указать своей регион
              проживания, чтобы увидеть, где находится ближайший магазин. Также на сайте вы
              сможете увидеть контактные данные для прямой связи с представителями
              компании.
            </p>
            <p>Если поблизости нет пунктов продаж, вам предложат доставку продукции курьерской
              службой.</p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
              >КУПИТЬ НА ОКНА ЖАЛЮЗИ FOROOM В ИНТЕРНЕТ-МАГАЗИНЕ
              ПРОИЗВОДИТЕЛЯ</ui-title
            >
            <p class="mb-2">
              Крупные города, такие как Москва, Санкт-Петербург, Новосибирск,
              Екатеринбург, Нижний Новгород, Казань, Челябинск, Омск, Самара и
              другие – это мегаполисы с большим количеством людей. Плотная
              населенность, близость соседей, жаркое лето и посторонние взгляды
              вызывают потребность в функциональной защите оконных проемов.
              Приятно, когда одним движением руки в комнате можно создать
              полумрак, устроить ночь или, наоборот, впустить лучи утреннего
              солнца. Это удобно и практично. Лучше всего с такими задачами
              справляются жалюзи и рулонные шторы, изготовление которых на заказ
              в большинстве случаев будет лучше, чем покупка готовых
              конструкций.
            </p>
            <p class="mb-2">
              Солнцезащитные системы FOROOM® могут полностью перекрывать проем,
              а могут быть установлены на каждую створку окна, образуя с ней
              единое целое. Изделия в том и другом случае не нужно подгонять по
              размерам, их ширина и высота будут точно соблюдены производителем.
            </p>
            <p class="mb-2">
              Оконный проем, оформленный красивыми и функциональными системами
              FOROOM®, делает помещение более уютным, комфортным и современным.
              Особенно если выбранный материал сочетается с общим стилем
              интерьера. FOROOM® предлагает покупателю более чем 400 вариантов
              цветовых решений для любого интерьера.
            </p>
            <p class="mb-2">
              Выбор предпочтительного способа управления позволит покупателю с
              комфортом регулировать уровень светового потока в помещение.
            </p>
            <p class="mb-2">
              Различные полотна рулонных штор, тканевые или алюминиевые ламели
              жалюзи служат надежным барьером от проникновения солнечных лучей и
              посторонних взглядов в помещение.
            </p>
            <p>
              Купить солнцезащитные системы онлайн можно в нашем
              интернет-магазине через удобный конструктор или обратиться в точки
              продаж официальных представителей бренда.
            </p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
              >КАТАЛОГ ЖАЛЮЗИ ДЛЯ ОКОН В ИНТЕРНЕТ-МАГАЗИНЕ FOROOM</ui-title
            >
            <p class="mb-2">
              На сайте нашего интернет-магазина представлен электронный каталог
              солнцезащитных систем, в котором можно выбрать и сравнить по
              основным параметрам рулонные и римские шторы, горизонтальные и
              вертикальные жалюзи, шторы плиссе.
            </p>
            <p class="mb-2">
              Цена на изделия, которую устанавливает сам производитель, не имеет
              дополнительных накруток и строго им регламентируется.
            </p>
            <p class="mb-4">
              Ассортимент солнцезащитных систем можно разделить на две группы –
              интегрированные конструкции для окон ПВХ и системы,
              предназначенные для перекрытия оконного проема целиком. Системы
              FOROOM отличаются друг от друга принципом работы, типом монтажа и
              ценами.
            </p>

            <p class="mb-2">Интегрированные - INTEGRA.</p>
            <p class="mb-4">
              За счет специального крепления системы плотно прилегают к
              створкам, образуя единую конструкцию. Такие системы не мешают
              проветриванию, открытию окна, и оставляют свободным доступ к
              подоконнику.
            </p>

            <p class="mb-2">Системы для перекрытия оконных проемов целиком.</p>
            <p class="mb-2">
              Эти солнцезащитные изделия перекрывают весь проем полностью и
              крепятся к потолку или к стене над окном, но также могут быть
              установлены в проем. Надежные крепления конструкций выдерживают
              вес систем, предназначенных для больших проемов. В ассортименте
              FOROOM есть рулонные шторы, управление которыми может быть
              дистанционным при помощи пульта ДУ, что облегчает процесс
              открывания-закрывания. Немаловажным является эстетический момент –
              данные конструкции на окнах дают возможность скрыть
              малопривлекательные объекты – радиаторы центрального отопления,
              розетки и прочие инженерные коммуникации.
            </p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
              >КАК ВЫБРАТЬ СОЛНЦЕЗАЩИТНЫЕ СИСТЕМЫ</ui-title
            >
            <p class="mb-4">
              Подобрать подходящие жалюзи на окна легко и просто. Достаточно
              определить место их крепления и решить, какой тип изделий для вас
              предпочтителен. Для облегчения принятия решения в Каталоге FOROOM
              все системы можно сравнить по основным параметрам и увидеть
              основные преимущества каждого изделия. Там же при желании можно
              ознакомиться с каждой системой из ассортимента FOROOM подробно,
              узнать функциональные характеристики изделий и увидеть варианты
              исполнения дизайна жалюзи.
            </p>

            <p class="mb-2">Жалюзи или шторы.</p>
            <p class="mb-2">
              Основное отличие – в материале. Жалюзи состоят из отдельных
              ламелей (алюминиевых, тканевых или пластиковых), а шторы
              представляют собой цельное полотно. Опущенная штора полностью
              перекрывает путь солнечным лучам, в то время как даже при
              опущенных жалюзи можно регулировать уровень потока света.
            </p>
            <p class="mb-4">
              Исключение составляют рулонные шторы DUO. В них полотно ткани
              имеет комбинированную структуру и состоит из прозрачных и
              непрозрачных полос. В опущенном состоянии изделия также, как и
              жалюзи, могут полностью пропускать потоки света через прозрачные
              участки ткани.
            </p>

            <p class="mb-2">
              Системы для перекрытия проемов или интегрированные для створок.
            </p>
            <p class="mb-4">
              Отличие – в конструкции и функциональных возможностях. Для
              перекрытия широких оконных проемов целиком системы линейки INTEGRA
              не подходят. Установка систем INTEGRA возможна на стандартные окна
              из ПВХ или дерева.
            </p>

            <p class="mb-2">
              Воспользуйтесь нашим Конструктором на сайте для выбора жалюзи,
              исходя из ваших предпочтений. Это позволит заказать изделие
              наиболее подходящего типа и по доступной цене. Выбирая
              последовательно параметры, предложенные в Конструкторе, вы
              получите готовое решение для своего окна.
            </p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
            >
              КАК ЗАКАЗАТЬ ЖАЛЮЗИ НА САЙТЕ
            </ui-title>
            <p class="mb-4">
              Существуют 2 способа, чтобы заказать солнцезащитные изделия
              FOROOM.
            </p>

            <p class="mb-2">Способ один - Конструктор</p>
            <p class="mb-4">
              Зайдите на страницу Конструктор и выберите тип системы, который
              желаете приобрести. Пошагово выбирая предпочитаемые параметры,
              которые предлагает система, вы получите готовое решение для своего
              окна. Добавьте изделие в корзину и оформите заказ.
            </p>

            <p class="mb-2">
              Способ два – по телефону или в точке продаж официального
              представителя
            </p>
            <p class="mb-2">
              Зайдите в раздел «Где купить» и выберите в своем регионе удобный
              для себя магазин. По указанным контактам вы можете обратиться
              напрямую в выбранную точку продаж для оформления заказа.
            </p>
            <p class="mb-4">
              Если в вашем городе нет официального Представителя FOROOM, то вы
              можете обратиться к Представителям из соседних регионов, т.к.
              заказанные изделия могут быть отправлены в ваш город с помощью
              транспортных компаний.
            </p>

            <p class="mb-2">
              Заказ жалюзи FOROOM на окна – отличный способ защитить помещение
              от солнца и чужих взглядов.
            </p>
          </div>

          <div class="col-12 mb-5">
            <ui-title
              tag="h4"
              class="ui-title-2"
              >FOROOM: ОТЛИЧНЫЕ ЖАЛЮЗИ НА ОКНА</ui-title
            >
            <p class="mb-2">Легкий и простой выбор.</p>
            <p class="mb-4">
              Наш сайт содержит достоверную техническую информацию, изложенную
              понятным языком. Вам будет просто сориентироваться и сделать свой
              выбор, даже если вы никогда не заказывали жалюзи или не
              пользовались солнцезащитными системами.
            </p>

            <p class="mb-2">Удобство и технологичность конструкций.</p>
            <p class="mb-4">
              Как пользователь, вы ежедневно будете получать удовольствие от
              удобных и современных систем. Все элементы и детали продуманы и
              подобраны с учетом эргономичности. Пользоваться нашей продукцией
              просто и приятно.
            </p>

            <p class="mb-2">Функциональность и эстетичность.</p>
            <p class="mb-4">
              Темнота, полумрак, открытые оконные проемы – вы можете
              регулировать уровень освещенности в комнате по своему вкусу, и так
              часто, как это необходимо. В любом положении системы защиты от
              солнца будут отлично выглядеть и хорошо вписываться в интерьер
              благодаря тому, что вы самостоятельно выберете материалы из
              коллекций FOROOM для изготовления изделий.
            </p>

            <p class="mb-2">Экологичность</p>
            <p class="mb-4">
              Какую бы систему вы ни выбрали, мы гарантируем – изготовление
              жалюзи, римских и рулонных штор происходит с использованием
              материалов, соответствующих стандартам качества. Многие ткани для
              рулонных штор и штор плиссе имеют международный сертификат
              экологической безопасности Oeko-Tex. Вся продукция FOROOM
              упаковывается в биоразлагаемый полиэтилен и картонные коробки,
              которые не наносяд вред окружающей среде.
            </p>

            <p class="mb-2">Доступная и честная стоимость.</p>
            <p class="mb-2">
              Мы обладаем современным высокотехнологичным производством и
              прямыми поставками комплектации из европейских и других стран, что
              обеспечивает низкую себестоимость изготовления каждой единицы
              продукции. Благодаря этому мы осуществляем продажу солнцезащитных
              систем по доступной стоимости. С нашими жалюзи окна вашей квартиры
              будут в полной комплектации!
            </p>
            <p class="mb-2">
              Стоимость изделий рассчитывается online, регламентируется
              производителем и не меняется в дальнейшем при условии
              своевременной оплаты. Если вы заказываете солнцезащитную систему в
              магазине Представителей, то проверить цену на изделие можете на
              нашем сайте, выбрав нужные параметры в Конструкторе.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
// import { MetaInfo } from 'vue-meta'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { calculatorStore, productsStore } from '@/store'
import { Template } from '@/types/Calculator/Template'
import ImageSlider from '@/components/common/ImageSlider.vue'
import PromoBlock from '@/components/common/PromoBlock.vue'

import Bestsellers from '@/components/Bestsellers/index.vue'
import AdvantagesBlock from '@/components/common/AdvantagesBlock.vue'
import Carousel from '@/components/common/Carousel/Carousel.vue'
import YoutubeVideo from '@/components/common/YoutubeVideo.vue'
import BestsellersProductsFilter from '@/components/Bestsellers/BestsellersProductsFilter.vue'
import CallbackPromoBlock from '@/components/common/Promo/CallbackPromoBlock.vue'

@Component({
  components: {
    CallbackPromoBlock,
    BestsellersProductsFilter,
    YoutubeVideo,
    Carousel,
    AdvantagesBlock,
    PromoBlock,
    ImageSlider,
    Bestsellers
  },
  mounted(){    
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({id: "3543523", type: "pageView", start: (new Date()).getTime()});
    (function (d, w, id) {
      if (d.getElementById(id)) return;
      var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
      ts.src = "https://top-fwz1.mail.ru/js/code.js";
      var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
      if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
    })(document, window, "tmr-code");

  },

  computed: {
    ...mapGetters('calculator', {
      templates: 'templatesGetter',
      templateFieldTypes: 'templatesFieldTypesGetter',
      loading: 'calcProcessGetter',
      calculatedItem: 'calculatedItemGetter',
      calculatedItemRus: 'calculatedItemRusGetter',
      calculatedItemParams: 'calculatedItemParamsGetter'
    }),
    ...mapGetters('products', {
      products: 'productsGetter'
    }),
    ...mapGetters('shops', {
      shops: 'shopsGetter'
    })
  }
})
export default class IndexPage extends Vue {
  filteredBestsellers = []
  filterBy = ['systemType', 'attachmentPoint']
  showPromo2 = false
  showPromoHotSelf = false
  day_shove = 0
  sale_pointsName = 'sale_points250404'
  @Getter('products/bestsellersGetter') bestsellers

  async asyncData() {
    if (!productsStore.bestsellers) {
      await productsStore.getBestsellers()
    }
  }

  created() {
    this.filteredBestsellers = this.bestsellers

    let day_shove = moment('2025-02-14').diff(moment(),'day')
    if(day_shove>=0){
      this.showPromo2 = true;
      this.day_shove = day_shove;
    }
    if(moment().format('YYYYMMDDHH') > '2025061209' && moment().format('YYYYMMDDHH')<'2025072612'){
      //this.showPromoHotSelf = true
      this.sale_pointsName = 'моторизация в подарок горизонт';
    }

    // setTimeout(async () => {
    //   const res = await this.$axios.post('/proxy/', {
    //     auth: {},
    //     data: {},
    //     module: 'materialAdmin',
    //     cmd: 'get_izds',
    //     key: 'W5pRNSx8Dx3tGY65xx3BOgAAAAE'
    //   })
    //   console.log('!!!!', res)
    // }, 3000)
  }

  redirectToshops() {
    if(this.sale_pointsName == 'моторизация в подарок горизонт'){
      this.$router.push('/catalog/gorizontalnye-derevyannie-zhalyuzi/wood')
    }else{
      this.$router.push('/new-products')
    }
  }
  redirectToAction() {
    this.$router.push('/actions')
  }
  redirectToNews() {
    this.$router.push('/news/shokcena-na-vse-rulonnye-shtory-ot-foroom')
  }
  // async calculate(template: Template): Promise<void> {
  //   await calculatorStore.calculate(template)
  // }

  // get calculatedItem() {
  //   return calculatorStore.calculatedItem
  // }
}
</script>

<style lang="scss" scoped>
.templates-container {
  display: flex;
  flex-wrap: wrap;
}
.template {
  padding: 10px 15px;
  margin: 5px;
  background: #f5f5f8;
  border-radius: 5px;
  cursor: pointer;
  &-title {
    text-transform: uppercase;
    font-size: 16px;
  }
  &-price {
    margin-top: 10px;
  }
}

.award__item {
  text-align: center;
}
.award-img {
  &::v-deep img {
    width: auto;
  }
}

.calc-result {
  display: flex;
  pre {
    flex: 30%;
  }
}
.container {
  max-width: 1440px;
}

.bestsellers {
  margin-bottom: 48px;
}

.slider {
  position: relative;
  padding-bottom: 34%;
  cursor: pointer;
  img {
    position: absolute;
    width: 100%;
    //height: 100%;
    left: -5px;
    object-fit: cover;
    object-position: center;
  }
}
.promo2 {
  img {
    height: 95%;
  }
}

.rutube-video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* Соотношение сторон 16:9 (9 / 16 = 0.5625) */
  height: 0;
  overflow: hidden;
}

.rutube-video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: $colSm) {
  .slider {
    order: 2;
    padding-bottom: 55%;
  }
  .promo {
    order: 1;
  }
}
</style>
