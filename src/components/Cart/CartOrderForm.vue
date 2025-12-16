<template>
  <div class="check">
    <div class="check-wrapper">
      <form>
        <fieldset class="ui-mb-2">
          <label for="name" :class="{ error: formErrors.includes('name') }">
            Имя
            <span v-if="formErrors.includes('name')">(заполните поле)</span>
          </label>
          <input v-model="model.name" id="name" type="text" />
        </fieldset>

        <fieldset class="ui-mb-2">
          <label for="phone" :class="{ error: formErrors.includes('phone') }">
            Телефон
            <span v-if="formErrors.includes('phone')">(заполните поле)</span>
          </label>
          <input
            v-model="model.phone"
            type="text"
            id="phone"
            placeholder="+7 888 888-88-88"
            v-mask="'+7 ### ###-##-##'"
          />
        </fieldset>

        <fieldset class="ui-mb-2">
          <label
            for="email"
            :class="{
              error: formErrors.includes('email') || formErrors.includes('invalidEmail'),
            }"
          >
            E-mail
            <span v-if="formErrors.includes('email')">(заполните поле)</span>
            <span v-if="formErrors.includes('invalidEmail')">(некорректный email)</span>
          </label>
          <input v-model="model.email" type="text" id="email" />
        </fieldset>

        <fieldset>
          <label for="city" :class="{ error: formErrors.includes('city') }">
            Город
            <span v-if="formErrors.includes('city')">(заполните поле)</span>
          </label>
          <input v-model="model.city" type="text" id="city" />
        </fieldset>

        <fieldset class="mt-3 mb-0 filter__fieldset fieldset__checkbox">
          <ui-checkbox v-model="model.agree">
            Я согласен на
            <a href="/personalnie-dannie" target="_blank" class="agree-link">
              обработку моих персональных данных
            </a>
          </ui-checkbox>
        </fieldset>
      </form>
    </div>

    <ui-button
      type="button"
      @click="sendOrder()"
      :class="{ 'item-card__button_sending': sendProcess }"
      class="send item-card__button item-card__button_primary mt-3"
      :disabled="!model.agree || sendProcess"
    >
      <i v-if="sendProcess" class="fa fa-spinner fa-pulse fa-fw mr-1"></i>
      <template v-if="!sendProcess">Отправить</template>
      <template v-if="sendProcess">Отправляем</template>
    </ui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { shopsStore, siteComponentStatesStore } from "@/utils/store-accessor";

import UiButton from "@/components/UI/UI-Button.vue";
import UiCheckbox from "@/components/UI/UI-Checkbox.vue";

@Component({
  components: { UiCheckbox, UiButton },
})
export default class CartOrderForm extends Vue {
  @Prop({ required: true })
  items: any[];

  @Prop({ required: true })
  mainItems: any[];

  model = {
    name: "",
    phone: "",
    city: "",
    email: "",
    agree: false,
  };
  formErrors: string[] = [];
  sendProcess: boolean = false;

  genOrderNum(n) {
    const rand_fn = function (min: number, max: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    };
    const arg: number[] = [];
    for (let i = 0; i < n; i++)
      arg.push(rand_fn(48, 58), rand_fn(65, 91), rand_fn(97, 123));
    for (
      var j, x, y = arg.length;
      y;
      j = parseInt(Math.random() * y), x = arg[--y], arg[y] = arg[j], arg[j] = x
    );
    return String.fromCharCode.apply(this, arg);
  }

  createOrder() {
    const fullPrice = this.items.reduce((sum, item) => {
      const price = item.old_price ? item.old_price.val : item.price.val;

      return sum + item.amount.val * price;
    }, 0);

    const salePrice = this.items.reduce((sum, item) => {
      return sum + item.amount.val * item.price.val;
    }, 0);

    const fullLength = () => {
      return this.items.reduce((acc, item) => {
        return acc + item.amount.val;
      }, 0);
    };

    const items = [];
    const mainItems = [];
    for (let i = 0; i < this.mainItems.length; i++) {
      if (this.mainItems[i].NumberOfRows && this.mainItems[i].NumberOfRows == "2") {
        this.mainItems[i].templateRus.amount = this.items[i].amount;
        this.mainItems[i].currentTemplates[1].amount = this.mainItems[i].amount;
        items.push(JSON.parse(JSON.stringify(this.mainItems[i].templateRus)));
        mainItems.push(JSON.parse(JSON.stringify(this.mainItems[i].currentTemplates[1])));
        this.mainItems[i].price = this.mainItems[i].sale_price;
      }

      items.push(JSON.parse(JSON.stringify(this.items[i])));
      mainItems.push(JSON.parse(JSON.stringify(this.mainItems[i])));
      delete this.mainItems[i].templateRus;
      delete this.mainItems[i].currentTemplates;
      delete this.mainItems[i].NumberOfRows;
    }

    return {
      scenario_id: 0,
      basket: this.genOrderNum(4),
      name: this.model.name,
      phone: this.model.phone,
      email: this.model.email,
      where_from: 1, // 0-SFR, 1-FR, 2-OneClick, 3-CallBack, 4-App, 5-API, 6-OrderCartMobile, 7-OneClickMobile, 8-CallBackMobile
      city: this.model.city,
      diler: this.selectedShop.email,
      num: 0,
      links: this.selectedShop.rt_id,
      amount: fullLength(),
      price: fullPrice,
      salePrice: salePrice,
      items: mainItems,
      items_view: items,
      dop_foroom_measure: 0,
      dop_foroom_install: 0,
      dop_foroom_delivery: 0,
      dop_foroom_payment: 0,
    };
  }

  validateEmail(email) {
    // eslint-disable-next-line max-len
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  }

  validateForm() {
    this.formErrors = [];

    if (!this.model.name.trim()) {
      this.formErrors.push("name");
    }
    if (!this.model.phone.trim()) {
      this.formErrors.push("phone");
    }

    if (!this.model.email.trim()) {
      this.formErrors.push("email");
    } else if (!this.validateEmail(this.model.email)) {
      this.formErrors.push("invalidEmail");
    }

    if (!this.model.city.trim()) {
      this.formErrors.push("city");
    }
  }

  sendOrder() {
    this.validateForm();

    if (!this.formErrors.length) {
      this.sendProcess = true;

      const order = this.createOrder();

      const orderData = new FormData();
      orderData.append("jstr", JSON.stringify(order));

      //console.log(order);

      this.$axios
        .$post("/save_order_foroom/", orderData)
        .then((response) => {
          order.numorder = response.data;

          const confirmOrderData = new FormData();
          confirmOrderData.append("jstr", JSON.stringify(order));

          this.$axios
            .$post("/foroomRU_customer_email/", confirmOrderData)
            .then((response) => {
              siteComponentStatesStore.setOrderConfirmModal(order.numorder);
              this.sendProcess = false;
              // this.closeForm()
              this.$emit("clearCart");
              this.$set(this.model, "agree", false);

              const el = document.getElementById("app");
              if (el) {
                el.scrollTop = 0;
              }

              this.$yandexMetrika.reachGoal("NF_order");
            })
            .catch((error) => {
              console.log("confirm order error", error);
            });
        })
        .catch((error) => {
          console.log("order error", error);
        });
    }

    // this.$router.push('/send-feedback')
  }

  get selectedShop() {
    return shopsStore.selectedShopGetter;
  }
}
</script>

<style lang="scss" scoped>
.check {
  top: 12px;
}
.check-wrapper {
  padding: 16px 12px;
  background: #f5f5f8;
  border-radius: 4px;
  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 400;
}

input {
  width: 100%;
  display: block;
  padding: 4px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.send-order {
  width: 100%;
  margin-top: 12px;

  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
}
::v-deep .agree-link {
  text-decoration: underline;
  &:hover {
    color: #e38839;
  }
}
</style>
