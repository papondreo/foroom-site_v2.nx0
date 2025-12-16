<template>
    <form
      class="callback-form"
      ref="callbackForm"
    >
      <!--    <pre>{{ selectedShop }}</pre>-->
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
  
      <fieldset class="mt-3 mb-0 filter__fieldset fieldset__checkbox">
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
  // @ts-nocheck
  import { Vue, Component, Getter, Prop } from "nuxt-property-decorator";

  import UiButton from '@/components/UI/UI-Button.vue'
  import UiCheckbox from '@/components/UI/UI-Checkbox.vue'
  import { Shop } from '@/types/Shops/Shop'
  import ShopSchedule from '@/components/common/Shops/ShopSchedule.vue'
  import { siteComponentStatesStore } from '@/utils/store-accessor'

  @Component({
    components: { ShopSchedule, UiButton, UiCheckbox }
  })
  export default class CallbackForm extends Vue {
    @Getter('shops/shopsGetter') shops: Shop[]
    @Getter('shops/selectedShopGetter') selectedShop: Shop

    public model = {
      name: '',
      phone: '',
      city: '',
      agree: false
    }
    public sendProcess = false
    public sended = false
    public formErrors: string[] = []

    genOrderNum(n) {
      const rand_fn = function (min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min)
      }
      const arg: number[] = []
      for (let i = 0; i < n; i++)
        arg.push(rand_fn(48, 58), rand_fn(65, 91), rand_fn(97, 123))
      for (
        var j, x, y = arg.length;
        y;
        j = parseInt(Math.random() * y), x = arg[--y], arg[y] = arg[j], arg[j] = x
      );
      return String.fromCharCode.apply(this, arg)
    }

    sendForm() {
      

      this.formErrors = []

      if (!this.model.name.trim()) {

        this.formErrors.push('name')
      }
      if (!this.model.phone.trim()) {

        this.formErrors.push('phone')
      }
      if (!this.model.city.trim()) {
 
        this.formErrors.push('city')
      }



      if (!this.formErrors.length) {
       

        this.sendProcess = true
        const data = {
          scenario_id: this.selectedShop.scenario_id,
          basket: this.genOrderNum(4),
          name: this.model.name,
          phone: this.model.phone,
          where_from: 8,
          city: this.model.city,
          diler: this.selectedShop.email,
          num: 0,
          links: this.selectedShop.rt_id,
          amount: 0,
          price: '0.00',
          salePrice: '0.00',
          items: {}
        }

    

        const formData = new FormData()
        formData.append('jstr', JSON.stringify(data))

        this.$axios.$post('/save_order_foroom/', formData).then(
          (response) => {
          
            const message = parseInt(data?.scenario_id)
              ? 'Ожидайте звонок сотрудника выбранного вами магазина в ближайщее время.'
              : 'Сотрудник магазина свяжется с вами в ближайшие 24 часа, в рабочее время. Так же вы можете связаться с магазином самостоятельно по указанным контактам.'

            this.sendProcess = false
            this.$emit('close')
            siteComponentStatesStore.setCallbackConfirmModal({
              message
            })

            
            if (this.target && this.target === 'callBack') {
              this.$yandexMetrika.reachGoal('NF_callBack')
            } else if (this.target && this.target === 'byuOneClick') {
              this.$saleForoomCounter('NF_buyOneClick')
              this.$yandexMetrika.reachGoal('NF_buyOneClick')
            } else {
              this.$saleForoomCounter('whereToBuy', {
                shopID: this.selectedShop.id,
                shopName: this.selectedShop.name,
                shopCity: this.selectedShop.city,
                shopPhone: this.selectedShop.phone
              })
              this.$yandexMetrika.reachGoal('NF_whereBuy')
            }
          },
          (rej) => {
            console.error('Error during form submission:', rej); 
          }
        )
      } else {
        console.log('Form has validation errors, not submitting');
      }
    }

    get shopType() {
      if (this.selectedShop.isWww) {
        return 'сотрудник интернет магазинa'
      } else if (this.selectedShop.isComplect) {
        return 'сотрудник магазинa'
      } else if (this.selectedShop.isPartner) {
        return 'сотрудник магазинa'
      } else {
        return 'сотрудник магазинa'
      }
    }

    get target() {
      return siteComponentStatesStore.callbackModalStateGetter
    }
  }
</script>

  
  <style lang="sass" scoped>
  .callback-form
    fieldset
      margin-bottom: 10px
  
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
      margin: 20px 0 0
      width: 100%
      padding: 5px 10px
      font-size: 17px
      text-transform: uppercase
  
      &[disabled]
        border-color: #ccc
        background: #ccc
        cursor: default
  
    .selected-shop-title
      margin-bottom: 4px
      color: #e38839
  
    .selected-shop
      font-size: 15px
      color: #858585
      .name
        font-weight: 500
        color: #3B3A49
      .address
        display: inline-block
        color: #3B3A49
  
    .shop-schedule
      margin-top: 6px
      font-size: 13px
  
    .ui-checkbox
      font-size: 13px
  
    .agree-link
      text-decoration: underline
      &:hover
        color: #e38839
  </style>
  