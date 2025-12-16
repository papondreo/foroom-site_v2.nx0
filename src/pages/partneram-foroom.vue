<template>
  <main>
    <div class="col-12 container">
        <ui-title tag="h1" class="ui-title-1">
          Станьте партнером одного из самых крупных производителей солнцезащитных систем
        </ui-title>
      
      <div class="row mb-4">
        <p class="mb-4">
          ООО ''Фирма ''КАЛИТА'' более 30 лет работает на рынке солнцезащитных систем и является правообладателем тм FOROOM. Мы производим деревянные жалюзи и рулонные шторы, римские шторы, горизонтальные и вертикальные жалюзи, шторы плиссе, алюминиевые профильные потолочные шторные карнизы для оптовой продажи и являемся прямыми поставщиками компонентов для солнцезащитных систем от крупных мировых производителей. Практически все наши изделия могут комплектоваться современными моторами для дистанционного управления ими через мобильное приложение, пульт или Алису. 
        </p>

   <div @click="toggleRequestModal()" class="banner-container mb-4">
        <ui-img
        src="/img-new/partneram/partneram.jpg"
        alt="Станьте партнером крупного производителя рулонных штор и жалюзи FOROOM."
        title="Станьте партнером одного из крупнейших производителей изделий массового спроса: рулонных штор и жалюзи бренда FOROOM."
        />
        <!-- <button @click="toggleRequestModal()">оставить заявку на сотрудничество</button> -->
      </div>     

        <p>
          <b  style="
            text-transform: uppercase;
            font-size: 118%;         /* увеличили размер шрифта */
 
          ">
            Вместо стандартных утверждений о высоком качестве нашей продукции и отличной логистике, мы расскажем о действительно важных и уникальных преимуществах, которые сделают сотрудничество с нами особенно выгодным для вас.
          </b>
        </p>

        <button class="img-new" @click="toggleRequestModal()">
          <img src="@/static/img-new/дарим-деньги.png" alt="Стать партнером" />
        </button>
        <div class="toggle-block">
          <button class="toggle-button" @click="isOpen = !isOpen">
            <span class="arrow-icon">➔</span>
            <span class="wave-text">Условия акции «Дарим 100 000 рублей»</span>

          </button>

          <ul v-if="isOpen" class="toggle-content">
            <li>1.  Акция действует только для новых партнёров бренда FOROOM.</li>
            <li>2. После заключения договора с компанией ООО "Фирма "КАЛИТА" и оформления первого заказа на изделия в личном кабинете sale.foroom.ru вам начисляются 100 000 бонусных рублей, которые можно использовать для оплаты будущих заказов.</li>
            <li>3. Бонусными рублями можно оплатить до 20% от суммы каждого заказа. 1 бонусный рубль = 1 рублю в валюте РФ. (например: заказ на 100 000 ₽ можно оплатить 20 000 ₽ бонусами и 80 000 ₽ денежными средствами).</li>
            <li>4. Использовать бонусные рубли можно только через личный кабинет sale.foroom.ru</li>
            <li>5. Бонусные рубли активны в течение 2х месяцев с момента зачисления. Далее они аннулируются.</li>
            <li>6. Бонусные рубли нельзя обналичить, передать третьим лицам или объединить с другими скидками и акциями.</li>
            <li>7. Бонусные рубли применяются к оплате только новых заказов, оформленных после регистрации в кабинете sale.foroom.ru.</li>
            <li>8. Важно! Предложение действует только для партнёров, заключивших договор с компанией ООО "Фирма "КАЛИТА" в период проведения акции.</li>
            <b>Если у вас остались вопросы, вы всегда можете задать их вашему менеджеру из ПСК FOROOM.</b>
          </ul>
        </div>


        <!-- <p class="mb-4">
          <b style="text-transform:uppercase">  Преимущества сотрудничества с нами:</b>
        </p> -->
        <h2 class="weight-title">
          Преимущества сотрудничества с нами:
        </h2>
      </div>


          

       <div id="1" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
          1.  Доступ к развитой экосистеме бренда FOROOM
          </ui-title>
          <p class="mb-4">
            Которая включает в себя множество полезных инструментов и сервисов для налаженной и комфортной работы всех бизнес-процессов. Экосистема FOROOM состоит из: 
          </p>
          <ul class="partners-list">
            <li> <b>Личного кабинета SALE.FOROOM.RU</b>  – это профессиональная среда с большим количеством полезных опций: калькулятор для расчета точной цены изделия, возможность отслеживать текущий статус заказов в онлайн-режиме, управление плательщиками, график платежей, актуальный список сервисных центров компании и множество других необходимых в ежедневной работе функций. Вы сможете самостоятельно занести заказ в базу и отправить его на производство без взаимодействия с менеджером. Личный кабинет доступен круглосуточно. </li>
            <li> <b>Мобильного приложения “FOROOM Партнер”,</b> которое позволит рассчитать точную стоимость изделия и сразу показать ее заказчику даже в местах с плохой связью или полным отсутствием интернета. После проведения замера у заказчика останется приятное впечатление о сотрудничестве с вами. Он поймет, что сотрудничает с крупной и надежной компанией.   </li>
            <li> <b>Сайта FOROOM.RU,</b> на котором покупатель может посмотреть актуальный список действующих акций, самостоятельно собрать нужную ему конфигурацию любого изделия из нашего ассортимента через онлайн-конструктор, узнать его точную стоимость, а также выбрать магазин, в который будет отправлен заказ. </li>
            <li> <b>Раздаваемого конструктора для сайтов наших партнеров,</b> который позволит в онлайн-режиме рассчитать точную стоимость. Стоимость изделия в раздаваемом конструкторе не будет отличаться от цены, рассчитанной в других инструментах экосистемы FOROOM таких как: сайт FOROOM.RU, личный кабинет SALE.FOROOM или мобильные приложения “FOROOM Партнёр” и “FOROOM AR 2.0”. </li>
            <li> <b>Персональных одностраничных сайтов.</b> Мы разработаем простой и удобный в использовании лендинговый сайт, который поможет убедить покупателя воспользоваться именно вашими услугами.  </li>
            <li> <b>Предоставление брендированного торгового оборудования по закупочным ценам.</b> Мы предлагаем брендированное торговое оборудование по закупочным ценам для оформления точек продаж в фирменном стиле: стенды, световую панель и комплекты каталогов.  </li>
            <li> <b>Профессионального дизайн-сопровождения собрендинга на всем пути сотрудничества.</b> Предоставляем полиграфическую продукцию и создаем дизайн-макеты в фирменном стиле для размещения рекламы. </li>
            <li> <b>Проведения регулярных обучающих семинаров для представителей и их дилеров.</b>  Мы регулярно организовываем обучающие семинары для наших партнеров, проводим тестирование и аттестацию их сотрудников, предоставляем курс по SMM-продвижению в социальных сетях и проводим регулярные онлайн-вебинары по настройке рекламы в Яндекс.Бизнес.</li>
            <li> <b>Мобильного приложения дополненной реальности FOROOM AR 2.0,</b> с помощью которого можно показать клиенту, как будет выглядеть солнцезащитное изделие в дизайне его интерьера. </li>
          </ul>
        </div>
        <div class="col-4">
          <div @click="toggleImage('/img-new/partneram/1.jpg')">
            <ui-img
              src="/img-new/partneram/1.jpg"
              alt="Развитая экосистема для всех партнеров бренда FOROOM"
              title="Что входит в экосистему FOROOM"
            />
          </div>
        </div>
      </div>

        <button class="request-btn" @click="toggleRequestModal()">Стать нашим партнером </button>

      <div id="2" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
          2. Высокотехнологичное производство
          </ui-title>
          <p class="mb-4">
            Все изделия выпускаются на современном высокотехнологичном производственно-складском комплексе FOROOM площадью 9000 м2. Автоматизированные станки и приспособления, безбумажная организация производственного процесса, а так же постоянный контроль технологического процесса, существенно увеличивают производительность труда и снижают вероятность возникновения брака благодаря исключению влияния человеческого фактора и обеспечивают доступную стоимость изделий для конечного покупателя без ущерба для качества.
            Строгий контроль качества на всех этапах производства. Каждое изделие, произведенное на заводе штор FOROOM, проходит строгий контроль качества, интегрированный в технологический процесс. 
         </p>
          
        </div>
        <div class="col-4">
          <div class="video-slider">
          <button class="arrow left" @click="prevVideo">&#10094;</button>

          <div class="video-wrapper">
            <iframe
              v-if="activeVideo === 0"
              src="https://rutube.ru/play/embed/eaa19bc2b51f6e163efd9f7c6947957f"
              frameborder="0"
              allowfullscreen
            ></iframe>
            <iframe
              v-if="activeVideo === 1"
              src="https://rutube.ru/play/embed/932d1938a1fba988ea87e1a9db6fefad"
              frameborder="0"
              allowfullscreen
            ></iframe>
            <iframe
              v-if="activeVideo === 2"
              src="https://rutube.ru/play/embed/1228c10f4627a88041cabca2e9984121"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>

          <button class="arrow right" @click="nextVideo">&#10095;</button>
          </div>
        </div>
      </div>
 
      <div id="3" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
            3.	Строгий контроль качества на всех этапах производства
          </ui-title>
          <p class="mb-4">
            Каждое изделие, произведенное на заводе штор FOROOM, проходит строгий контроль качества, интегрированный в технологический процесс. Поэтому все изделия FOROOM имеют защиту от подделок в виде голограммы и брендированной упаковки.
          </p>
          
        </div>
        <div class="col-4">
          <div @click="toggleImage('/img-new/partneram/3.jpg')">
            <ui-img
              src="/img-new/partneram/3.jpg"
              alt="Все рулонные шторы и жалюзи от торговой марки FOROOM проходят строгий контроль качества. "
              title="Рулонные шторы и жалюзи от бренда FOROOM проходят строгий контроль качества на всех этапах производства и имеют защиту от подделок. "
            />
          </div>
        </div>
      </div>

      <button class="request-btn" @click="toggleRequestModal()">Получить консультацию </button>


      <div id="4" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
          4. Возможность принимать участие в государственных и муниципальных тендерах
          </ui-title>
          <p class="mb-4">
            Изделия бренда FOROOM имеют заключение Минпромторга и включены в реестр российской промышленной продукции.</p>   
        </div>
        <div class="col-4">
          <div @click="toggleImage('/img-new/partneram/4.jpg')">
            <ui-img
              src="/img-new/partneram/4.jpg"
              alt="Все изделия от бренда FOROOM внесены в реестр Минпромторга. "
              title="Рулонные шторы и жалюзи от FOROOM можно установить в государственные и муниципальные учреждения"
            />
          </div>
        </div>
      </div>

      <div id="5" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
            5.	Охват различных рынков сбыта 
          </ui-title>
          <p class="mb-4">
            Для построения успешного бизнеса недостаточно работать только с одним рынком сбыта. Наши изделия пользуются большим спросом и позволяют охватить сразу несколько крупных сегментов рынка: 
          </p>

          <ul class="partners-list">
            <li>Рынок розничных изделий по индивидуальным размерам</li>
            <li>Рынок HoReCa (Хорека): гостиницы, рестораны, отели.</li> 
            <li>Рынок проектных заказов: аукционы, тендеры и госзаказы</li>
            <li>Рынок продажи изделий готовых размеров через маркетплейсы</li>
          </ul>

          <div class="img-container">
            <div v-for="item of carouselList" :key="item.src" @click="changeSrc(item)">
              <ui-img
              :src="item.src"
              :alt="item.alt"
              :title="item.title"
              />
            </div>
          </div>
<!-- 
          <div class="img-container">
            <div @click="changeSrc('/img-new/partneram/5-1.jpg')">
              <ui-img
              src="/img-new/partneram/5-1.jpg"
              alt="Горизонтальные деревянные жалюзи G-FORM WOOD 50 от бренда FOROOM"
              title="Деревянные жалюзи от FOROOM в частном доме"
              />
            </div>
            <div @click="changeSrc('/img-new/partneram/5-2.jpg')">
              <ui-img
              src="/img-new/partneram/5-2.jpg"
              alt="Рулонные шторы от бренда FOROOM для помещения в сегменте HoReCa "
              title="Рулонные шторы от FOROOM в ресторане “Халиф” "
              />
            </div>
            <div @click="changeSrc('/img-new/partneram/5-3.jpg')">
              <ui-img
              src="/img-new/partneram/5-3.jpg"
              alt="Рулонные шторы DUO от бренда FOROOM сделанные для гос.заказа"
              title="Рулонные шторы день-ночь от бренда FOROOM сделанные по гос. заказу для школы"
              />
            </div>
            <div @click="changeSrc('/img-new/partneram/5-4.jpg')">
              <ui-img
              src="/img-new/partneram/5-4.jpg"
              alt="Рулонные шторы и жалюзи от FOROOM для реализации на маркетплейсах "
              title="Линейка изделий FOROOM RM для маркетплейсов "
              />
            </div>
            
         
          </div> -->

       </div>
        <div class="col-4"  @click="toggleImage(activeSrc.src)">
          <ui-img
            :src="activeSrc?.src" :alt="activeSrc?.alt" :title="activeSrc?.title" />

        </div>
      </div>
 

      <button class="request-btn" @click="toggleRequestModal()">Оставить заявку на обратный звонок </button>


      <div id="6" style="display: flex;"  class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
           6. Постоянный анализ рынка и дополнение ассортимента трендовыми изделиями
          </ui-title>
          <p class="mb-4">
            Мы специализируемся на производстве изделий массового спроса, что позволяет нам создавать выгодные оптовые предложения для наших партнеров. На текущий момент наш ассортимент состоит из:
          </p>

          <ul class="partners-list">
            <li>Деревянных жалюзи оптом</li>
            <li>Моторизация оптом</li> 
            <li>Рулонных штор оптом</li>
            <li>Рулонных штор день-ночь (DUO) оптом</li>
            <li>Штор плиссе оптом</li>
            <li>Римских штор оптом</li>
            <li>Алюминиевых профильных потолочных шторных карнизов оптом</li>
            <li>Вертикальных жалюзи оптом</li>
            <li>Горизонтальных жалюзи оптом</li>
          </ul>

          <p class="mb-4">Мы постоянно анализируем рынок и регулярно дополняем ассортимент, учитывая современные тренды дизайна интерьера и потребности рынка. Только за последние несколько месяцев мы запустили в производство несколько новых моделей изделий:</p>
          <p class="mb-4">Главной новинкой по праву можно назвать автоматизированный карниз СМАРТ. Одна из главных отличительных особенностей карниза СМАРТ — его двигатель мощностью 2 Нм, который обеспечивает плавное и бесшумное управление шторой. </p>
          <p class="mb-4">Карниз имеет четыре варианта управления: фазное, радиуправление, RS485 или сухой контакт. </p>
          <p class="mb-4">Многообразие видов управления и выдерживание нагрузки до 90 кг. позволяет предлагать моторизированный карниз для штор в разных сегментах рынка солнцезащитных систем: HoReCa (Хорека), изделия по индивидуальным размерам или проектные заказы. </p>
          <p class="mb-4">Двигатель автоматически запоминает конечное положение шторы, что существенно упрощает настройку изделия. Функция автоматической остановки двигателя при выявлении помехи обеспечивает дополнительную безопасность для вашего помещения.  </p>
          <p class="mb-4">Значимой новинкой стали горизонтальные деревянные жалюзи G-FORM WOOD 50. Изделие имеет ряд важных преимуществ: натуральные производственные материалы: павловния и бамбук, могут быть укомплектованы электроприводом для управления ими дистанционно с помощью пульта, мобильного приложения или голосового помощника (Алиса и другие), более 30 цветов на выбор и европейские комплектующие. Деревянные жалюзи нашего производства активно используются дизайнерами популярных телепередач, таких как “Квартирный вопрос”. Изделия на 100% безопасны и могут быть установлены в помещениях с высокими санитарными нормами. </p>
          <p class="mb-4">Рулонные шторы GRANDE MAX и GRANDE PREMIUM, которые предназначены для перекрытия очень больших проемов окна или панорамных окон. Рулонные шторы GRANDE MAX и GRANDE PREMIUM хорошо зарекомендовали себя для использования в элитных коммерческих помещениях: рестораны, отели, бизнес-центры и другие объекты рынка HoReCa (Хорека). Изделия можно оборудовать электроприводом для управления ими дистанционно с помощью пульта, мобильного приложения или голосового помощника.  </p>
          <p class="mb-4">Дистанционное управление также доступно для большинства других моделей <b>рулонных штор от производителя</b>  ООО ''Фирма ‘’КАЛИТА’’. Все комплектующие для моторизации выпускаются под брендом FOROOM на современном высокотехнологичном заводе, расположенном в Китае, под строгим контролем качества с нашей стороны. </p>
       </div>
        <div class="col-4">
          <div class="vertical-container">
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-1.jpg')">
                <ui-img
                src="/img-new/partneram/6-1.jpg"
                alt="Горизонтальные деревянные жалюзи от FOROOM в квартире "
                title="Горизонтальные деревянные жалюзи от бренда FOROOM "
              /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-2.jpg')">
              <ui-img
              src="/img-new/partneram/6-2.jpg"
              alt="Моторизированные карнизы для штор "
              title="Моторизация для штор от FOROOM "
            /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-3.jpg')">
              <ui-img
              src="/img-new/partneram/6-3.jpg"
              alt="Рулонные шторы от FOROOM в интерьере "
              title="Рулонные шторы от бренда FOROOM "
            /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-4.jpg')">
              <ui-img
              src="/img-new/partneram/6-4.jpg"
              alt="Рулонные шторы день-ночь в проекте телепередачи “Квартирный вопрос”"
              title="Рулонные шторы день-ночь (DUO) от бренда FOROOM"
            /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-5.jpg')">
              <ui-img
              src="/img-new/partneram/6-5.jpg"
              alt="Шторы плиссе от FOROOM для пластиковых окон "
              title="Шторы плиссе от бренда FOROOM "
            /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-6.jpg')">
              <ui-img
              src="/img-new/partneram/6-6.jpg"
              alt="Римские шторы от FOROOM на кухне "
              title="Римские шторы от бренда FOROOM"
            /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-7.jpg')">
              <ui-img
              src="/img-new/partneram/6-7.jpg"
              alt="Моторизированные карнизы для штор от FOROOM"
              title="Профильные карнизы для штор от бренда FOROOM "
            /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-8.jpg')">
              <ui-img
              src="/img-new/partneram/6-8.jpg"
              alt="Вертикальные пластиковые жалюзи от FOROOM в интерьере "
              title="Вертикальные жалюзи от бренда FOROOM "
            /> 
            </div>
            <div class="image-container" @click="toggleImage('/img-new/partneram/6-9.jpg')">
              <ui-img
              src="/img-new/partneram/6-9.jpg"
              alt="Горизонтальные жалюзи G-FORM от FOROOM "
              title="Горизонтальные жалюзи от бренда FOROOM"
            /> 
            </div>
          </div>

        </div>
      </div>

      <button class="request-btn" @click="toggleRequestModal()">Оставить заявку на представительство </button>

      <div id="7" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
            7.	Возможность присутствия продукции на маркетплейсах
          </ui-title>
          <p class="mb-4">
            Маркетплейсы стали ключевой частью глобальной торговли и будут только увеличивать свое влияние на сферу электронной коммерции в будущем. Если вы планируете активно продавать наши изделия на маркетплейсах, мы предлагаем широкий спектр услуг, которые значительно ускорят начало продаж и помогут избежать лишних расходов. Вы получите: 
          </p>
          <ul class="partners-list">
            <li>фото и видеоконтент для карточек товаров</li>
            <li>консультацию по матрице самых востребованных товаров для реализации на маркетплейсах</li> 
            <li>на самые ходовые размеры изделий у нас создана "складская программа". Мы храним изделия у себя на складе в готовом виде для быстрой отгрузки.</li>
            <li>штрихкодирование на производстве каждой единицы продукции уникальным баркодом клиента, тем самым сокращая время и деньги партнера на данную операцию или фулфилмент.</li>
          </ul>
          <p class="mb-4">В итоге, получив от нас заказ, вам останется только создать поставку и отвести товар на склад маркетплейса.</p>
       </div>
        <div class="col-4">
          <div @click="toggleImage('/img-new/partneram/7.jpg')">
            <ui-img
              src="/img-new/partneram/7.jpg"
              alt="Рулонные шторы и жалюзи популярных размеров для продажи на маркетплейсах"
              title="Бренд FOROOM помогает партнерам оперативно вывести изделия на маркетплейсы. "
            />
          </div>
        </div>
      </div>


      <div id="8" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
            8. Участие в ежемесячных акциях с реальными скидками 
          </ui-title>
          <p class="mb-4">
            На востребованные товары для увеличения количества продаж изделий конечным покупателям и бесплатно предоставляем рекламные макеты для этих акций.</p></div>
        <div class="col-4">
          <div @click="toggleImage('/img-new/partneram/8.jpg')">
            <ui-img
              src="/img-new/partneram/8.jpg"
              alt="Регулярные ежемесячные акции для розничных покупателей на покупку рулонных штор и жалюзи оптом."
              title="Бренд FOROOM проводит регулярные ежемесячные акции для розничных покупателей на востребованные изделия. "
            />
          </div>
        </div>
      </div>

      <button class="request-btn" @click="toggleRequestModal()">Заказать обратный звонок </button>

      <div id="9" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
            9.	Не являемся конкурентами нашим партнерам
          </ui-title>
          <p class="mb-4">
            Мы не продаем изделия розничным покупателям. Более того, все заявки от розничных покупателей, полученные с нашего сайта и социальных сетей, передаются нашим представителям.
          </p></div>
        <div class="col-4">
          <div @click="toggleImage('/img-new/partneram/9.jpg')">
            <ui-img
              src="/img-new/partneram/9.jpg"
              alt="Завод по производству рулонных штор и жалюзи FOROOM напрямую не продает изделия розничным покупателям"
              title="Завод штор FOROOM не продает рулонные шторы и жалюзи конечным покупателям. Мы не конкурируем с нашими представителями. "
            />
          </div>
        </div>
      </div>

  

      <div id="10" class="par-container row mb-5">
        <div class="col-8">
          <ui-title tag="h2" class="ui-title-1">
          10.  Собственный инструментальный цех для создания автоматизированного оборудования и его ремонта 
          </ui-title>
          <p class="mb-4">
            Мы сами производим все необходимое автоматизированное оборудование и технологические приспособления. Это позволяет получить технологичную и производственную безопасность для наших партнеров и не зависеть от поставщиков оборудования и сроков поставки запчастей, и проводить его качественное планово-техническое обслуживание.
          </p></div>
        <div class="col-4">
          <div @click="toggleImage('/img-new/partneram/10.jpg')">
            <ui-img
              src="/img-new/partneram/10.jpg"
              alt="ПСК FOROOM имеет собственный цех для обслуживания и ремонта рулонных штор и жалюзи. "
              title="Ремонтный цех ПСК FOROOM"
            />
          </div>
        </div>
      </div>

      <div id="11" class="row mb-5">
          <ui-title tag="h2" class="ui-title-1"> Что говорят наши партнеры</ui-title>
          <p class="mb-4">
            Можно еще долго рассказывать о наших преимуществах, но лучше посмотреть серию видеороликов от наших партнеров, которые сотрудничают с нами долгие годы.
          </p>
      </div> 

      <div class="video-container mb-5">
        
        <iframe
        height="250"
        src="https://rutube.ru/play/embed/2b0b06f50c0d975dfc67d74fd2969fe4"
        frameBorder="0"
        allow="clipboard-write; autoplay"
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
        ></iframe>

        <iframe
          height="250"
          src="https://rutube.ru/play/embed/afc1b9d56d042d3e077e3007f1b29eef"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>

        <iframe
          height="250"
          src="https://rutube.ru/play/embed/84cc79502240627668936e0c1a52105d"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>

        <iframe
          height="250"
          src="https://rutube.ru/play/embed/0c9492f800f762e65f8c763c3dc2635e"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      </div>

     

      <div id="12" class="row mb-5">
        <ui-title tag="h2" class="ui-title-1"> Как начать сотрудничество и купить жалюзи и рулонные шторы оптом? </ui-title>
        <p class="mb-4">
          Чтобы начать работать с нами, достаточно оставить заявку на нашем сайте или позвонить. 
         </p>
         <p class="mb-4"><b>Если у вас уже есть собственный бизнес </b>и вы сотрудничаете с другими производителями рулонных штор и жалюзи оптом, свяжитесь с нашим менеджером, получите доступ ко всем возможностям экосистемы FOROOM и просчитайте выгоду, которую вы получите от сотрудничества с нами. </p>
         <p class="mb-4"> <b>Если вы только планируете открыть своё дело</b> по продаже солнцезащитных систем, то у нас есть готовая модель бизнеса. Вам не придется самостоятельно во всем разбираться. Оставьте заявку, и наши менеджеры подробно всё расскажут и ответят на все ваши вопросы.</p>
<!--         <dealers-request-open-form :regions="regions"/>-->
        </div> 

    </div>

    <ModalContainer v-if="showDealerRequestModal" @close="showDealerRequestModal = false">
      <DealersRequestForm :regions="regions" class="form" @close="showDealerRequestModal = false" />
    </ModalContainer>

    <ModalContainer v-if="showImage" @close="showImage = false">
      <ui-img
            class="active-image"
            :src="activeShowImage"
            alt="ПСК FOROOM имеет собственный цех для обслуживания и ремонта рулонных штор и жалюзи. "
            title="Завод производителя рулонных штор и жалюзи FOROOM самостоятельно осуществляет ремонт оборудования и не зависит от импортных поставок запчастей. "
          />
    </ModalContainer>


    
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import YoutubeVideo from "@/components/common/YoutubeVideo.vue";
import DealersRequestForm from "@/components/Forms/DealersRequestForm.vue";
import DealersRequestOpenForm from "@/components/Forms/DealersRequestOpenForm.vue";
import ModalContainer from "@/components/Modals/ModalContainer.vue";
import { regionsStore } from '@/utils/store-accessor';

@Component({
  components: { ModalContainer, YoutubeVideo, DealersRequestForm, DealersRequestOpenForm  },
})
export default class PartneramForoomPage extends Vue {
  public showDealerRequestModal = false;
  isOpen = false

  public showImage = false;
  public activeShowImage = '';
  carouselList = [
    {
      src: "/img-new/partneram/5-1.jpg",
      alt: "Горизонтальные деревянные жалюзи G-FORM WOOD 50 от бренда FOROOM",
      title: "Деревянные жалюзи от FOROOM в частном доме",
    },
  {
    src: "/img-new/partneram/5-2.jpg",
    alt: "Рулонные шторы от бренда FOROOM для помещения в сегменте HoReCa ",
    title: "Рулонные шторы от FOROOM в ресторане “Халиф” ",
  },
  {
    src: "/img-new/partneram/5-3.jpg",
    alt: "Рулонные шторы DUO от бренда FOROOM сделанные для гос.заказа",
    title: "Рулонные шторы день-ночь от бренда FOROOM сделанные по гос. заказу для школы"
  },
  {
    src: "/img-new/partneram/5-4.jpg",
    alt: "Рулонные шторы и жалюзи от FOROOM для реализации на маркетплейсах ",
    title: "Линейка изделий FOROOM RM для маркетплейсов ",

  }]
  public activeSrc = this.carouselList[0];
  // public regions = null;

  activeVideo = 0

nextVideo() {
this.activeVideo = (this.activeVideo + 1) % 3
}
prevVideo() {
this.activeVideo = (this.activeVideo - 1 + 3) % 3
}
  head() {
    return {
      title:
        "Сотрудничество с заводом жалюзи FOROOM: стать дилером жалюзи оптом от производителя",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Станьте партнером надежного производителя рулонных штор и жалюзи. Покупайте рулонные шторы оптом по выгодной цене. Прямые поставки с завода и минимальные сроки доставки.",
        },
      ],
    };
  }

  async mounted() {
     await regionsStore.getRegions()
  }

   get regions() {
    let regions = regionsStore.regionsGetter

    if (regions) {
      regions.sort((a, b) => {
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          return -1;
        }
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        }
        return 0;
      })
    }
    return regions
  }

  toggleRequestModal() {
    this.showDealerRequestModal = !this.showDealerRequestModal;
  }

  toggleImage(url) {
    this.activeShowImage = url;
    this.showImage = !this.showImage;
  }

  changeSrc(e){
    this.activeSrc = e;
  }
}
</script>

<style lang="scss" scoped>


.img-new {

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  


  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.98);
  }

  img {
    padding: 8px;
    box-sizing: border-box;
    max-width: 100%;
    height: auto;
    border-radius: 20px;
  }
}


.arrow-icon {
  font-size: 20px;
  animation: arrow-glow 1.5s infinite;
}

@keyframes arrow-glow {
  0% {
    color: #d38f2c;
    text-shadow: 0 0 5px rgba(211, 143, 44, 0.5);
  }
  50% {
    color: #ffb347;
    text-shadow: 0 0 10px rgba(211, 143, 44, 0.8);
  }
  100% {
    color: #d38f2c;
    text-shadow: 0 0 5px rgba(211, 143, 44, 0.5);
  }
}


.wave-text {
  color: black;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, black 0%, #d38f2c 20%, black 40%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: wave-animation 3s infinite linear;
}

@keyframes wave-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}


.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}
::v-deep .of-contain {
  img {
    object-fit: contain;
  }
}
.text-block {
  &.fz-16 p {
    font-size: 18px;
  }
  p {
    margin-bottom: 10px;
  }
  .pl-3 {
    padding-left: 12px;
  }
  .bold {
    font-weight: 400;
  }
  .fz24 {
    font-size: 24px;
    font-weight: 600;
  }
}
.ttu {
  text-transform: uppercase;
}

.weight-title{
 margin: 30px 0;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  color: #d38f2c;
}
button {
  padding: 10px 30px;
  font-weight: 400;
  font-size: 18px;
}

.img-container{
  display: flex;
  gap: 20px;
}

 picture{
  cursor: pointer;
}

.request-btn{
  margin-bottom: 3rem;
  padding: 10px 30px;
  width: 100%;
  border: 2px solid #fff;
  border-radius: 8px;
  text-transform: uppercase;
  color: #fff;
  font-size: 24px;
  background-color: rgba(211, 143, 44, 0.9);
  &:hover{
    background-color: #e38839;
  }
}

.brand-color {
  text-transform: uppercase;
  font-size: 16px;
}
.fw-400 {
  font-weight: 400;
  font-size: 18px;
}
.brand-color {
  color: #d38f2c;
}
.form {
  z-index: 99999999;
  background: #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 350px;
  height: min-content;
  margin: auto;
}
.sticky {
  position: sticky;
  top: 16px;
}

.active-image{
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 700px;
  height: fit-content;
  margin: auto;
}

.banner-container{
  &.banner-bottom{
    &::after{
      content: 'стать партнером';
    }
  }
  position: relative;
  cursor: pointer;
  z-index: 1;
  &::after{
    content: 'Оставить заявку на сотрудничество';
    position: absolute;
    z-index: 0;
    padding: 10px 100px;
    bottom: 30px;
    right: 30px;
    border: 2px solid #fff;
    border-radius: 8px;
    text-transform: uppercase;
    color: #fff;
    font-size: 24px;
    background-color: rgba(211, 143, 44, 0.9);
  }

}

.video-container{
  display: flex;
  gap: 10px;

  iframe{
    width: 25%;
  }
}

.vertical-container{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.vertical-container .image-container{
  width: 180px;
}

.vertical-container picture{
  width: 100%
}

@media screen and (max-width: 1024px) {
  .video-container{
    flex-direction: column;
    iframe{
      width: 100%;
    }
  }
  .banner-container{

    button{
      padding-left: 30px;
      padding-right: 30px;
      font-size: 20px;
    }
  }
}


@media screen and (max-width: 768px) {
  .par-container{
    flex-direction: column;
    .img-container{
      margin-bottom: 15px;
    }
    .vertical-container{
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
      width: 100%;
      .image-container{
        width: calc(50% - 10px);
       
      }
    }
    .col-8, .col-4{
      width: 100%;
    }
  }
  .banner-container{
    picture{
      display: none;
    }
    &::after{
      display: inline-block;
      position: static;
      text-align: center;
      width: 100%;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 20px;
    }
  }
}

.partners-list{
  list-style-type: disc;


  li{
    list-style: disc;
    margin-bottom: 10px;
  }
}




.video-slider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  margin: 0 auto;
}

.video-wrapper {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 1rem;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #3B3A49;

  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.arrow.left {
  left: -50px;
}

.arrow.right {
  right: -50px;
}


</style>