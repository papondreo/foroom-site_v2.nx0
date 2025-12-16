<template>
  <form class="callback-form" ref="callbackForm">
    <!--    <pre>{{ selectedShop }}</pre>-->
    <fieldset v-if="isOneClick">
      <label for="width" :class="{ error: formErrors.includes('width') }">
        Ширина, (см) - Максимальная ширина 250см
        <span v-if="formErrors.includes('width')">(заполните поле)</span>
      </label>
      <input
        id="width"
        type="text"
        v-model="model.width"
        pattern="\d*"
        @input="model.width = keepInterval(model.width, 0, 250)"
        @change="model.width = keepInterval(model.width, 48.5, 250)"
        required
      />
    </fieldset>

    <fieldset v-if="isOneClick">
      <label for="height" :class="{ error: formErrors.includes('height') }">
        Высота, (см) - Максимальная высота 300см
        <span v-if="formErrors.includes('height')">(заполните поле)</span>
      </label>
      <input
        v-model="model.height"
        id="height"
        type="text"
        pattern="\d*"
        @input="model.height = keepInterval(model.height, 0, 300)"
        @change="model.height = keepInterval(model.height, 40, 300)"
      />
    </fieldset>

    <fieldset v-if="isOneClick">
      <label for="material" :class="{ error: formErrors.includes('material') }">
        Материал
        <span v-if="formErrors.includes('material')">(заполните поле)</span>

        <!-- <span>{{ JSON.stringify(products[0]) }}</span> -->
      </label>

      <multiselect
      v-model="choosedMaterial"
      :options="oneClickProducts"
      :multiple="false"
      :close-on-select="true"
      :clear-on-select="false"
      placeholder="Выбрать материал"
      :showLabels="false"
      :searchable="false"
      :allow-empty="false"
      label="title"
      track-by="title"
    >
      <template
        slot="selection"
        slot-scope="{ values }"
      >
      
        <span
        class="multiselect__single"
        v-if="values.length"
      >
        {{ values.title }}
      </span>

       
      </template>
      <template
            slot="option"
            slot-scope="props"
          >
            <span class="multiselect-option">
              <img
                class="blackout-ico"
                width="20"
                :src="'https://www.foroom.ru/img/images/calculator/materials/ico/ico1_'+ props.option?.materialId + '.jpg'"
              />
              {{ props.option.title }}
            </span>
          </template>
    </multiselect>

      
    </fieldset>
    <fieldset v-if="isOneClick">
      <span
        ><b>{{ calculate(model) }}</b>
      </span>
    </fieldset>
    <fieldset>
      <label for="name" :class="{ error: formErrors.includes('name') }">
        Имя
        <span v-if="formErrors.includes('name')">(заполните поле)</span>
      </label>
      <input id="name" type="text" v-model="model.name" />
    </fieldset>

    <fieldset>
      <label for="phone" :class="{ error: formErrors.includes('phone') }">
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

    <ui-button
      type="button"
      @click="sendForm()"
      :class="{ 'item-card__button_sending': sendProcess }"
      class="send item-card__button item-card__button_primary"
      :disabled="!model.agree || sendProcess"
    >
      <i v-if="sendProcess" class="fa fa-spinner fa-pulse fa-fw mr-1"></i>
      <template v-if="!sendProcess">Отправить</template>
      <template v-if="sendProcess">Отправляем</template>
    </ui-button>
  </form>
</template>
<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter, Prop } from "nuxt-property-decorator";

import UiButton from "@/components/UI/UI-Button.vue";
import UiCheckbox from "@/components/UI/UI-Checkbox.vue";
import { Shop } from "@/types/Shops/Shop";
import ShopSchedule from "@/components/common/Shops/ShopSchedule.vue";
import Multiselect from "vue-multiselect";
import { siteComponentStatesStore, catalogStore } from "@/utils/store-accessor";

@Component({
  components: { ShopSchedule, UiButton, UiCheckbox, Multiselect },
})
export default class CallbackForm extends Vue {
  @Getter("shops/shopsGetter") shops: Shop[];
  @Getter("oneClickProducts/oneClickProductsGetter") oneClickProducts: any[];
  @Getter("shops/selectedShopGetter") selectedShop: Shop;

  @Prop({ required: true })
  isOneClick: boolean;

  // public options = 

  public model = {
    name: "",
    phone: "",
    width: 48.5,
    height: 40,
    material: 30006181,
    // region: {
    //   value: ''
    // },
    agree: true,
  };
  public sendProcess = false;
  public sended = false;
  public formErrors: string[] = [];
  public price: Number = 0;
  public choosedMaterial = null;


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

  keepInterval(val, min, max) {
    val = val?.toString().replace(/[^0-9.]/g, "");

    val = Number(val);
    if (val > max) {
      val = max;
    }
    if (val < min) {
      val = min;
    }

    return val;
  }

  calculate(model) {
    if(this.choosedMaterial){
      model.material = this.choosedMaterial.materialId
    }
    else{
      model.material = null;
    }
    

    if ((!model.width && !model.height) || !model.material || model.material == 0) {
      return "Для расчета цены Задайте Ширину, Высоту и выберите Материал";
    }

    let choosedProduct = this.products.find((el) => el.materialId === model.material);

    let price = choosedProduct.price;

    const square = (Number(model.width) * Number(model.height)) / 10000;

    if (square > 4.5) {
      return "Мы не изготавливаем изделия площадью больше 4м2";
    }

    price = square > 0.8 ? (Number(price) / 0.8) * square : Number(price);
    this.price = price.toFixed(2);
    if (price) return `Цена ${price.toFixed(2)} р. (Минимальная комплектация)`;
  }

  get products() {
    // const productsArr = catalogStore.catalogSimilarProductsGetter("wood1");
    // let productArrMinimal = [];
    return catalogStore.catalogSimilarProductsGetter("wood1");
  }

  sendForm() {
    this.formErrors = [];
    console.log("kokoko");

    if (!this.model.name.trim()) {
      this.formErrors.push("name");
    }
    if (!this.model.phone.trim() && this.isOneClick) {
      this.formErrors.push("phone");
    }
    if (!this.model.width && this.isOneClick) {
      this.formErrors.push("width");
    }
    if (!this.model.height && this.isOneClick) {
      this.formErrors.push("height");
    }
    if (!this.model.material && this.isOneClick) {
      this.formErrors.push("material");
    }
    // if (!this.model.material.trim()) {
    //   this.formErrors.push("phone");
    // }

    if (!this.formErrors.length) {
      this.sendProcess = true;
      const data = {
        scenario_id: this.selectedShop.scenario_id,
        basket: this.genOrderNum(4),
        name: this.model.name,
        phone: this.model.phone,
        where_from: 8,
        city: "",
        diler: this.selectedShop.email,
        num: 0,
        links: this.selectedShop.rt_id,
        amount: 0,
        price: this.isOneClick ? this.price : "0.00",
        salePrice: this.isOneClick ? this.price : "0.00",
        items: this.isOneClick
          ? [
              {
                amount: 1,
                material: this.model.material,
                sale: 0,
                ControlHeight: Math.ceil(this.model.height * 10 * 0.67),
                cost_height: this.model.height * 10,
                cost_width: this.model.width * 10,
                ControlSide: 1,
                ControlType: 3,
                controlPanel: 1,
                MountType: 1,
                InstallPlace: 2,
                PicDirection: 1,
                LambrBokSize: this.model.width * 10 + 200,
                type: "wood",
                subtype: "1",
                warranty: 0,
                price: this.price,
                sale_price: this.price,
              },
            ]
          : {},
      };

      const formData = new FormData();
      formData.append("jstr", JSON.stringify(data));


      this.$axios.$post("/save_order_foroom/", formData).then(
        (response) => {
          const message = parseInt(data?.scenario_id)
            ? "Ожидайте звонок сотрудника магазина в ближайшее время."
            : "Сотрудник магазина свяжется с вами в ближайшие 24 часа, в рабочее время. Также вы можете связаться с магазином самостоятельно по указанным контактам.";

          this.sendProcess = false;
          this.$emit("close");
          siteComponentStatesStore.setCallbackConfirmModal({
            message,
          });
          // this.goalTracking()

          if (this.target && this.target === "callBack") {
            this.$yandexMetrika.reachGoal("NF_callBack");
          } else if (this.target && this.target === "byuOneClick") {
            this.$saleForoomCounter("NF_buyOneClick");
            this.$yandexMetrika.reachGoal("NF_buyOneClick");
          } else {
            this.$saleForoomCounter("whereToBuy", {
              shopID: this.selectedShop.id,
              shopName: this.selectedShop.name,
              shopCity: this.selectedShop.city,
              shopPhone: this.selectedShop.phone,
            });

            this.$yandexMetrika.reachGoal("NF_whereBuy");
          }
        },
        (rej) => {
          console.log("rej", rej);
        }
      );
    }
    // setTimeout(() => {
    //   this.sendProcess = false
    //   this.$emit('close')
    //   siteComponentStatesStore.setCallbackConfirmModal(true)
    // }, 1500)
  }

  get shopType() {
    if (this.selectedShop.isWww) {
      return "сотрудник интернет магазинa";
    } else if (this.selectedShop.isComplect) {
      // return 'партнёр по комплектующим ТМ FOROOM'
      return "сотрудник магазинa";
    } else if (this.selectedShop.isPartner) {
      //return 'партнёр FOROOM PRO'
      return "сотрудник магазинa";
    } else {
      return "сотрудник магазинa";
    }
  }

  // Yandex Metrika Target
  get target() {
    return siteComponentStatesStore.callbackModalStateGetter;
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
  .option-element
    display: flex
    gap: 20px
  .multiselect__option--highlight
    background-color: red !important; 
    display: none;
  
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
