<template>
  <div class="col-12">
    <header class="constructor-header">
      <p class="constructor-header__title">
        {{ data.title }}
      </p>
    </header>
    <div v-if="calcCornices.NumberOfRows == '1'">
      <div class="row step-content hrz-scroll">
        <div
          v-for="radio in filterTemplates"
          :key="radio.productId"
          class="col-md-4 col-6 full-size"
        >
          <RadioButton
            name="Name"
            :param="{ val: radio.productId }"
            :label="radio.title"
            :imgPath="imgUrl(radio)"
            :disableImg="data.disableImg"
            :zoom="false"
            :selectedValue="system.productId"
            @input="setProductType(radio.productId)"
          />
          <div class="infoBloc">
            <span
              class="desc"
              v-if="checked(radio.productId)"
              >{{ radio.desc }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Первый ряд</p>
      <div class="row step-content hrz-scroll">
        <div
          v-for="radio in filterTemplates"
          :key="radio.productId"
          class="col-md-4 col-6 full-size"
        >
          <RadioButton
            name="Name"
            :param="{ val: radio.productId }"
            :label="radio.title"
            :imgPath="imgUrl(radio)"
            :disableImg="data.disableImg"
            :zoom="false"
            :selectedValue="system.productId"
            @input="setProductType(radio.productId)"
          />
          <div class="infoBloc">
            <span
              class="desc"
              v-if="checked(radio.productId)"
              >{{ radio.desc }}</span
            >
          </div>
        </div>
      </div>
      <p class="mar_top">Второй ряд</p>
      <div class="row step-content hrz-scroll">
        <div
          v-for="radio in filterTemplates"
          :key="`desc_${radio.productId}`"
          class="col-md-4 col-6 full-size"
        >
          <RadioButton
            name="name2"
            :param="{ val: radio.productId }"
            :label="radio.title"
            :imgPath="imgUrl(radio)"
            :disableImg="data.disableImg"
            :zoom="false"
            :selectedValue="
              calcCornices.currentTemplates[1].type +
              calcCornices.currentTemplates[1].subtype
            "
            :checked="checked2(radio.productId)" 

            @input="setProductType2(radio.productId)"
          />
          <div class="infoBloc">
            <span
              class="desc"
              v-if="checked2(radio.productId)"
              >{{ radio.desc }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { catalogStore } from "@/utils/store-accessor";

export default {
  name: 'KarnizName',
  components: {
    RadioButton: () =>
      import('@/components/ConstructorCornices/RadioButton.vue')
  },
  props: ['systemName', 'data'],

  data() {
  const data = {
    publicPath: `/_images/constructor/${this.systemName}-`,
    showText: false
  };

  // console.log("📥 Данные в data():", data);

  return data;
},

created() {
    if (this.calcCornices.currentTemplates.length === 0) {
      const templateKarniz = []
      templateKarniz.push(this.template)
      templateKarniz.push(this.template)
      this.calcCornices.currentTemplates = templateKarniz
      this.calcCornices.templateRus =
        this.$store.getters['calcCore/templateRus']
    }
  },


  methods: {
    setProductType(type) {

    if (!this.calcCornices.selectParamUser.includes('name'))
      this.calcCornices.selectParamUser.push('name');

    const templates = this.templates
      .filter(t => t.type === 'karniz')
      .find(t => t.type + t.subtype === type);

    // console.log("🔍 Найденный шаблон для первого ряда:", templates);

    if (templates) {
          if (templates && templates.NumberOfRows) {
            templates.NumberOfRows = this.template.NumberOfRows
          }

    this.$store.dispatch('calcCore/calculate', templates).then((res) => {
      // console.log("✅ Ответ от calculate (первый ряд):", res);
      if (res.status === 'OK') {
        this.calcCornices.currentTemplates[0] = { ...this.template };
        // console.log("🔄 Обновленные данные calcCornices после первого ряда:", JSON.parse(JSON.stringify(this.calcCornices)));
      }
    });
  }
},

setProductType2(type) {
  // console.log("🚀 Выбранный тип карниза (второй ряд):", type);
  
  if (!this.calcCornices.selectParamUser.includes('name'))
    this.calcCornices.selectParamUser.push('name');

  const templates = this.templates
    .filter(t => t.type === 'karniz')
    .find(t => t.type + t.subtype === type);

  if (templates) {
         
            templates.NumberOfRows = this.template.NumberOfRows
          }

  templates.width = this.calcCornices.currentTemplates[1]?.width || 70; // Подстраховка

  this.$store.dispatch('calcCore/setSizes', [{ width: templates.width / 10 }])
    .then(() => {
      this.$store.dispatch('calcCore/calculate', templates).then((res) => {
        if (res.status === 'OK') {
          // console.log("✅ Обновление второго ряда успешно:", res.item);
          
          // Используем Vue.set для реактивности
          this.$set(this.calcCornices.currentTemplates, 1, res.item);
          
          this.calcCornices.templateRus = res.item_rus;
          this.calcCornices.oldPrice = res.item.old_price;
          this.calcCornices.currentActionInfo = res.params.material.currentActionInfo;
          this.calcCornices.price = res.item.price;
          

          // Пересчёт первого ряда (если надо)
          const baseTemplate = this.calcCornices.currentTemplates[0];
          if (baseTemplate) {
            this.$store.dispatch('calcCore/calculate', baseTemplate).then((res) => {
              if (res.status === 'OK') {
                this.$set(this.calcCornices.currentTemplates, 0, res.item);
              }
            });
          }
        }
      });
    });
},

    imgUrl(val) {
      return this.publicPath + 'img/' + val.sizesScheme;
    },

    checked(val) {
      return val === this.system.productId;
    },

    checked2(val) {
      return (
        val ===
        this.calcCornices.currentTemplates[1].type +
          this.calcCornices.currentTemplates[1].subtype
      )

    }
  },

  computed: {
    templates() {
      const data = this.$store.getters['calcCore/templates']|| [];
       // console.log("📌 Шаблоны карниза из Vuex:", data);
      return data;
    },

    template() {
      return this.$store.getters['calcCore/template'];
    },

    systems() {
      return catalogStore.catalogGetter
      .filter(i => i.system === 'karniz');
    },

    system() {
      return this.$getSystem(this.systemName);
    },

    filterTemplates() {
      let catalog = catalogStore.catalogGetter
      // console.log("🔎 Каталог карнизов:", catalog);
      let templates = catalog.filter(key => ['karniz11', 'karniz3', 'karniz2', 'karniz10'].includes(key.productId));


      if (this.calcCornices.NumberOfRows === '2') {
        templates = templates.filter(i => i.productId !== 'karniz11');
      }

      // console.log("🔎 Отфильтрованные шаблоны:", templates);
      
      return templates.sort((a, b) => a.sortId - b.sortId);
    },

    calcCornices() {
      const data = this.$store.getters['calcCornices/data'];
      // console.log("📊 Данные calcCornices в компонте KarnizName:", data);
      return data;
    }
  },


  mounted() {
    // console.log("🚀 Компонент смонтирован. Исходные данные:", {
    //   img: this.img,
    //   systemName: this.systemName,
    //   data: this.data,
    //   templates: this.templates,
    //   calcCornices: this.calcCornices
    // });
  }
};
</script>


<style lang="sass" scoped>
.desc
    display: block
    margin-top: 0px
    font-size: 15px
    color: $lightFontColor !important
.position-relative
    position: relative
.shtapik
    position: absolute
    width: 250px
    top: -225px
    right: 30px
    border-radius: 50%
    border: 3px solid #f5f5f5
    box-shadow: -7px 6px 16px 0px rgba(217,217,217,1)
    z-index: 9

.attention
    margin-top: 130px
    border-radius: 5px
    padding: 15px
    border-left: 5px solid #df771c
    background: rgba(255,155,0,0.3098)
    font-size: .85rem

.toRightDo
    position: absolute
    right: 30px
    top: 60%
.infoBloc
    position: relative
    top: -90px
    height: 90px

.info_header
    position: absolute
    font-weight: bold
    font-size: 14px
</style>
