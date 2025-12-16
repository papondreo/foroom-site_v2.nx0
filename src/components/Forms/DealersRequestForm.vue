<template>
  <form
    class="dealer__form"
    ref="dealerForm"
  >
  <ui-title tag="h2" class="ui-modal-title">
    Заявка на представительство
  </ui-title>
    <fieldset>
      <label
        for="name"
        :class="{ error: formErrors.includes('name') }"
      >
        Имя
        <span v-if="formErrors.includes('name')">(заполните поле)</span>
      </label>
      <input
        id="name"
        type="text"
        v-model="model.name"
      />
    </fieldset>

<!--
    <fieldset>
      <label
        for="company"
        :class="{ error: formErrors.includes('company') }"
      >
        Организация
        <span v-if="formErrors.includes('company')">(заполните поле)</span>
      </label>
      <input
        id="company"
        type="text"
        v-model="model.company"
      />
    </fieldset>
-->

    <fieldset>
      <label
        for="phone"
        :class="{ error: formErrors.includes('phone') }"
      >
        Телефон
        <span v-if="formErrors.includes('phone')">(заполните поле)</span>
      </label>
      <input
        id="phone"
        type="text"
        placeholder="+7 888 888-88-88"
        v-mask="'+7 ### ###-##-##'"
        v-model="model.phone"
      />
    </fieldset>
    <fieldset>
      <label
        for="email"
        :class="{
          error:
            formErrors.includes('email') || formErrors.includes('invalidEmail')
        }"
      >
        E-mail
        <span v-if="formErrors.includes('email')">(заполните поле)</span>
        <span v-if="formErrors.includes('invalidEmail')"
          >(некорректный email)</span
        >
      </label>
      <input
        id="email"
        type="text"
        v-model="model.email"
      />
    </fieldset>

    <fieldset v-if="regions">
      <label
        for="region"
        :class="{ error: formErrors.includes('region') }"
      >
        Регион
        <span v-if="formErrors.includes('region')">(заполните поле)</span>
      </label>
      <multiselect
        id="region"
        v-model="model.region"
        :options="regions"
        :multiple="false"
        label="value"
        track-by="value"
        placeholder=""
        :show-no-results="false"
      >
      </multiselect>
    </fieldset>

<!--
    <fieldset>
      <label
        for="city"
        :class="{ error: formErrors.includes('city') }"
      >
        Город
        <span v-if="formErrors.includes('city')">(заполните поле)</span>
      </label>
      <input
        id="city"
        type="text"
        v-model="model.city"
      />
    </fieldset>
-->

    <fieldset class="mt-3 mb-0 filter__fieldset fieldset__checkbox fz14">
      <ui-checkbox v-model="model.agree">
        Я согласен на
        <a
          href="/personalnie-dannie"
          target="_blank"
          class="agree-link"
        >
          обработку моих персональных данных
        </a>
      </ui-checkbox>
      <!--
      <input
        id="agree"
        type="checkbox"
        v-model="model.agree"
      />
      <label for="agree"
        >Я согласен на
        <a
          href="/personalnie-dannie"
          target="_blank"
          class="agree-link"
          >обработку моих персональных данных</a
        >
        и на
        <a
          href="/soglasie-na-reklamnuyu-kommunikaciyu"
          target="_blank"
          class="agree-link"
          >получение выгодных предложений
        </a>
      </label>
-->
    </fieldset>

    <ui-button
      type="button"
      @click="sendForm()"
      :class="{ 'item-card__button_sending': sendProcess }"
      class="send item-card__button item-card__button_primary"
      :disabled="!model.agree || sendProcess"
    >
      <i
        v-if="sendProcess"
        class="fa fa-spinner fa-pulse fa-fw mr-1"
      ></i>
      <template v-if="!sendProcess">Отправить</template>
      <template v-if="sendProcess">Отправляем</template>
    </ui-button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import UiButton from '@/components/UI/UI-Button.vue'
import UiCheckbox from '@/components/UI/UI-Checkbox.vue'
import Multiselect from 'vue-multiselect'
import { regionsStore, siteComponentStatesStore } from '@/utils/store-accessor'

@Component({
  components: { UiButton, UiCheckbox, Multiselect }
})

export default class DealersRequestForm extends Vue {
  @Prop()
  readonly regions: any
  model = {
    name: '',
    phone: '',
    email: '',
    company: '',
    direction: '',
    city: '',
    region: {
      value: ''
    },
    agree: false
  }
  sendProcess = false
  sended = false
  formErrors: string[] = []
  directions = [
    'Изделия по размерам заказчика - ТМ FOROOM',
    'Изделия стандартных размеров - Ready Made',
    'Комплектующие ТМ KATRIS'
  ]

  // async mounted() {
  //   if (!this.regions) {
  //     await regionsStore.getRegions()
  //   }
  // }

  validateEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase())
  }

  sendForm() {
    this.formErrors = []

    if (!this.model.name.trim()) {
      this.formErrors.push('name')
    }
    if (!this.model.phone.trim()) {
      this.formErrors.push('phone')
    }
    if (!this.model.region.value) {
      this.formErrors.push('region')
    }
    // if (!this.model.city.trim()) {
    //   this.formErrors.push('city')
    // }
    if (!this.model.email.trim()) {
      this.formErrors.push('email')
    } else if (!this.validateEmail(this.model.email)) {
      this.formErrors.push('invalidEmail')
    }

    if (!this.formErrors.length) {
      this.sendProcess = true

      const data = {
        auth: {},
        data: {
          lid: {
            name: this.model.name,
            company: this.model.company,
            city: this.model.city,
            area: this.model.region.value,
            manager_id: this.regions.find(reg => reg.value == this.model.region.value).managerId,
            phone: this.model.phone,
            email: this.model.email,
            potr: "gp",
            potr_comment: this.model.direction,
            status_comment: "Заявка на Представительство",
            timeLimit: "9 - 17",
            from_: 1
          }
        }
      }

      const request = new FormData()
      request.append('json', JSON.stringify(data))

      this.$axios.$post('/dealer_request/', request).then((response) => {
        this.sendProcess = false
        this.sended = true
        this.$set(this.model, 'agree', false)
        siteComponentStatesStore.setDealerRequestConfirmModal(response.data.element)
      })

      this.$yandexMetrika.reachGoal('NF_dealerRequest')
      this.$emit('close')
    } else {
      // console.log('fe', this.formErrors)
    }
  }

  // get regions() {
  //   let regions = regionsStore.regionsGetter
  //   if (regions) {
  //     regions.sort((a, b) => {
  //       if (a.value.toLowerCase() < b.value.toLowerCase()) {
  //         return -1;
  //       }
  //       if (a.value.toLowerCase() > b.value.toLowerCase()) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   }
  //   return regions
  // }
}
</script>

<style lang="sass" scoped>

.ui-modal-title
  text-transform: uppercase
  margin-bottom: 10px;
  text-align: center
  font-size: 18px
.dealer__form
  background: #f2f2f5 !important
  background: #e6e6e6 !important
  border: 1px solid #ddd !important
  border-radius: 5px
  padding: 25px 25px 0

  .fz14
    font-size: 14px
  fieldset
    margin-bottom: 10px
  .agree-link
    //color: #f9a134
    text-decoration: underline
    &:hover
      text-decoration: none
  label
    display: block
    margin-bottom: 5px
    font-size: 15px
    //color: $mediumFontColor

    &[for="agree"]
      font-size: 13px

    &.error
      //color: $danger-color

    span
      //color: $mediumFontColor
      margin-left: 4px

  select,
  input
    width: 100%
    display: block
    padding: 4px 10px
    font-size: 16px
    border: 1px solid #ccc
    border-radius: 5px

  .agree-link
    //color: $brand-orange-light

    &:hover
      text-decoration: underline


  button.send
    margin: 20px 0 30px
    width: 100%
    padding: 5px 10px
    font-size: 17px
    text-transform: uppercase

    &[disabled]
      border-color: #ccc
      background: #ccc
      cursor: default
</style>

<style lang="scss">

.multiselect--active .multiselect__placeholder {
  display:block!important
}
.multiselect {
  height:34px;
  min-height:34px;
  color:#4d4d4d
}
.multiselect__tags {
  height:34px;
  min-height:34px;
  padding:5px 40px 0 8px
}
.multiselect__placeholder {
  font-size:16px;
  padding-top:0;
  padding-left:1px;
  color:#848484
}
.multiselect__input {
  font-size:16px
}
.multiselect__select {
  height:32px;
  display:flex;
  justify-content:center;
  align-items:center
}
.multiselect__select:before {
  top:0
}
.multiselect__option {
  padding:9px 12px;
  min-height:34px;
  height:34px
}
.multiselect__single {
  padding-left:1px;
  line-height:23px;
  white-space:nowrap
}
.multiselect__content-wrapper,
.multiselect__tags {
  border-color:#ccc
}
.multiselect__option--highlight,
.multiselect__option--highlight.multiselect__option--selected {
  background-color:#f9a134 !important;
}
.multiselect__option--selected {
  background-color:rgba(249,161,52,.3) !important
}
.multiselect__option:after,
.multiselect__option:before {
  display:none
}
</style>
