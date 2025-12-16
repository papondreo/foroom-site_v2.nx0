<template>
  <div class="container-lg">
    <div class="row mb-3">
      <div class="col-12">
        <ui-title tag="h1" class="ui-title-1 ui-text-uppercase">
          {{ tabData[activeTab].title }}
        </ui-title>
      </div>
      <div v-if="tabBtnsData.length > 1" class="col-12 tabs mb-3">
        <button v-for="(tab, i) in tabBtnsData" :key="`tab-${i}`" class="tab" @click="selectTab(i)"
          :class="{ tab_active: activeTab === i }">
          {{ tab.text }}
        </button>
      </div>
      <div class="col-12">
        <ui-title tag="h2" class="ui-title-2 ui-text-uppercase">
          {{ tabData[activeTab].listTitle }}
        </ui-title>
      </div>
    </div>
    <div class="row" v-for="(item, i) in tabData[activeTab].list" :key="`${i}`">
      <div class="col-12 setup-block">
        <p class="block-title">
          <!-- {{ block.title }} -->
        </p>
        <div class="row">
          <div class="col-sm-4 col-md-3 col-12">
            <img v-if="item.imgSrc" :src="item.imgSrc" class="setup-block__img" alt="" />
          </div>
          <div class="col setup-block__text">
            <p>
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "KarnizSmartPage",
  head() {
    return {
      title: 'ИНСТРУКЦИЯ ПО УСТАНОВКЕ КАРНИЗА PROFILE SMART ОТ FOROOM.',
      meta: [
        { hid: 'description', name: 'description', content: 'ИНСТРУКЦИЯ ПО УСТАНОВКЕ КАРНИЗА PROFILE SMART ОТ FOROOM.' }
      ]
    }
  },
  methods: {
    selectTab(i) {
      this.activeTab = i
    }
  },
  data: () => ({
    activeTab: 0,

    tabBtnsData: [
      {
        id: 0,
        text: 'Крепление на саморезы к потолку'
      },
      {
        id: 1,
        text: 'Крепление на саморезы к стене'
      }
    ],

    tabData: [
      {
        id: 0,
        title: 'Крепление на саморезы к потолку',
        listTitle: 'Стандартная комплектация карниза PROFILE SMART рассчитана на потолочное крепление.',
        list: [
          {
            id: 0,
            text: '1. Разметьте места крепления, приложив кронштейны эксцентриковые к потолку с интервалом не более 40 см;',
            imgSrc:
              '/img-karniz-smart/profile-karniz-smart-part-1/1-PROFILE_SMART.jpg'
          },
          {
            id: 1,
            text: '2. Просверлите отверстия в размеченных местах диаметром, необходимым для закрепления дюбелей (рекомендуемый диаметр 8 мм,  длинна – не менее 45 мм);',
            imgSrc: null
          },
          {
            id: 2,
            text: '3. Установите дюбель в просверленное отверстие;',
            imgSrc: null
          },
          {
            id: 3,
            text: '4. Приложите кронштейны эксцентриковые к просверленным отверстиям и прикрутите каждый саморезом;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-1/4-PROFILE_SMART.jpg'
          },
          {
            id: 4,
            text: '5. Откройте защелки кронштейна эксцентрикового, повернув их против часовой стрелки, и вставьте в них карниз;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-1/5-PROFILE_SMART.jpg'
          },
          {
            id: 5,
            text: '6. Закрепите карниз в кронштейнах, повернув их по часовой стрелке до упора;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-1/6-PROFILE_SMART.jpg'
          },
          {
            id: 6,
            text: '7. При большой длине карниза (более 4 метров) обязательно используйте соединитель и установите кронштейн около места стыка;',
            imgSrc: null
          },
          {
            id: 7,
            text: '8. Убедитесь, что рычаг блокировки привода находится в левом положении;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-1/8-PROFILE_SMART.jpg'
          },
          {
            id: 8,
            text: '9. Вставьте привод в редуктор;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-1/9-PROFILE_SMART.jpg'
          },
          {
            id: 9,
            text: '10. Переведите рычаг блокировки в крайнее правое положение. Привод зафиксирован в редукторе.',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-1/10-PROFILE_SMART.jpg'
          }
        ]
      },
      {
        id: 1,
        title: 'Крепление на саморезы к стене',
        listTitle: 'При стеновом креплении карниза необходимо дополнительно заказать стеновые кронштейны. Размеры кронштейнов (вынос от стены) 10 см, 15 см, 20 см, 25 см, 30 см.',
        list: [
          {
            id: 0,
            text: '1. Разметьте места крепления приложив кронштейны к стене с интервалом не более 40 см;',
            imgSrc:
              '/img-karniz-smart/profile-karniz-smart-part-2/1-PROFILE_SMART.jpg'
          },
          {
            id: 1,
            text: '2. Просверлите отверстия в размеченных местах диаметром, необходимым для закрепления дюбелей (рекомендуемый диаметр 8 мм, длинна – не менее 45 мм);',
            imgSrc: null
          },
          {
            id: 2,
            text: '3. Установите дюбель в просверленное отверстие.',
            imgSrc: null
          },
          {
            id: 3,
            text: '4. Приложите кронштейны к просверленным отверстиям и прикрутите каждый саморезом;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-2/4-PROFILE_SMART.jpg'
          },
          {
            id: 4,
            text: '5. Соедините Кронштейн эксцентриковый Смарт со стеновым кронштейном при помощи винт+гайка;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-2/5-PROFILE_SMART.jpg'
          },
          {
            id: 5,
            text: '6. Откройте защелки кронштейна эксцентрикового, повернув их против часовой стрелки и вставьте в них Карниз;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-2/6-PROFILE_SMART.jpg'
          },
          {
            id: 6,
            text: '7. Закрепите Карниз в кронштейнах, повернув их по часовой стрелке до упора;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-2/7-PROFILE_SMART.jpg'
          },
          {
            id: 7,
            text: '8. При большой длине карниза (более 4 метров) обязательно используйте соединитель и установите кронштейн около места стыка;',
            imgSrc: null
          },
          {
            id: 8,
            text: '9. Убедитесь, что рычаг блокировки привода находится в левом положении;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-2/9-PROFILE_SMART.jpg'
          },
          {
            id: 9,
            text: '10. Вставьте привод в редуктор;',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-2/10-PROFILE_SMART.jpg'
          },
          {
            id: 10,
            text: '11. Переведите рычаг блокировки в крайнее правое положение. Привод зафиксирован в редукторе.',
            imgSrc: '/img-karniz-smart/profile-karniz-smart-part-2/11-PROFILE_SMART.jpg'
          }
        ]
      }
    ]
  })
}
</script>

<style lang="sass" scoped>
.tab
  display: inline-block
  padding: 3px 15px
  margin-right: 5px
  margin-bottom: 5px
  /*min-width: max-content*/
  background: #fff
  border: 1px solid #f0f0f0
  border-radius: 5px
  transition: .3s ease-in-out
  // text-decoration: underline
  &_active
    // text-decoration: none
    color: #ffffff !important
    background: #ffa845 !important
    border-color: #ffa845 !important

  &:hover
    // text-decoration: none
    background: #ebebeb
    border-color: #ebebeb

.desc
  color: #3b3a49
// text-transform: uppercase
.block-title
  font-size: 19px
  color: #3b3a49

.setup-block
  margin-bottom: 25px

  &__text
    p
      margin-bottom: 5px

      &:first-of-type
        margin-top: 15px

  &__img
    border-radius: 5px
</style>