<template>
  <main class="container">
    <ui-title tag="h1" class="ui-title-1">
      {{ page.h1 }}
    </ui-title>
    <constructor-container v-if="!processing" :system="currentSystem" class="row" />
  </main>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component } from "nuxt-property-decorator";

import ConstructorContainer from "@/components/Constructor/ConstructorContainer.vue";

import { calculatorStore, catalogStore, pagesStore, systemsStore } from "@/store";

@Component({
  components: { ConstructorContainer },
})
export default class ConstructorSystemPage extends Vue {
  head() {
    return {
      title: this.title,
      meta: [{ hid: "description", name: "description", content: this.description }],
    };
  }
  title = "";
  description = "";
  systems = [
    {
      system: "rolo",
      url: "rulonnye-shtory",
      name: "Рулонные шторы",
      title: "Рулонные шторы - купить рулонные шторы на заказ шириной 120, 160 см",
      description:
        "Рулонные шторы - купить рулонные шторы шириной 120, 150, 160, 180, 200, 220 см по доступным ценам в интернет-магазине FOROOM. Недорого. Большой каталог. Свое производство. Гарантия. Быстрая доставка. Заказывайте онлайн!",
    },
    {
      system: "duo",
      url: "rulonnye-shtory-duo",
      name: "Рулонные шторы DUO",
      title: "Заказ рулонных штор Зебра в удобном Конструкторе | Расчет цены",
      description:
        "Расчет стоимости рулонных штор День-Ночь в калькуляторе цен. Закажите рольшторы Зебра по вашим размерам. Доставка по России. Гарантия на изделия",
    },
    {
      system: "vblinds",
      url: "vertikalnye-zhalyuzi",
      name: "Вертикальные жалюзи",
      title:
        "Вертикальные тканевые жалюзи - купить вертикальные жалюзи на пластиковые окна",
      description:
        "Вертикальные тканевые жалюзи - купить вертикальные жалюзи-шторы на пластиковые окна по доступным ценам в интернет-магазине FOROOM. Недорого. Большой каталог. Свое производство. Гарантия. Быстрая доставка. Заказывайте!",
    },
    {
      system: "hblinds",
      url: "gorizontalnye-zhalyuzi",
      name: "Горизонтальные жалюзи",
      title:
        "Онлайн-конструктор горизонтальных жалюзи FOROOM – индивидуальные решения для вашего интерьера",
      description:
        "Используйте онлайн-конструктор FOROOM для создания горизонтальных жалюзи по индивидуальным размерам. Легко настройте параметры, выберите материалы и получите идеальные жалюзи для вашего окна с доставкой.",
    },
    {
      system: "wood",
      url: "gorizontalnye-derevyannie-zhalyuzi",
      name: "Горизонтальные жалюзи",
      title:
        "Онлайн-конструктор горизонтальных деревянных жалюзи FOROOM – индивидуальный подход к дизайну",
      description:
        "Создайте идеальные горизонтальные деревянные жалюзи с помощью онлайн-конструктора FOROOM. Подберите размеры, материалы и стиль, чтобы добавить элегантности и уюта вашему интерьеру.",
    },
    {
      system: "plisse",
      url: "shtory-plisse",
      name: "Шторы плиссе",
      title: "Заказать шторы плиссе просто в Конструкторе FOROOM",
      description:
        "Расчет стоимости штор плиссе в калькуляторе цен. Закажите плиссированные шторы на пластиковые окн по вашим размерам. Доставка по России. Гарантия на изделия",
    },
    {
      system: "roma",
      url: "rimskie-shtory",
      name: "Римские шторы",
      title: "Заказать римские шторы просто в Конструкторе FOROOM",
      description:
        "Закажите римские жалюзи онлайн по вашим размерам. Сайт производителя. Доставка и гарантия на изделия",
    },
    {
      system: "karniz",
      url: "profilnye-karnizy",
      name: "Профильные карнизы",
      title:
        "Онлайн-конструктор потолочных карнизов FOROOM – удобно и быстро подберите карниз по индивидуальным параметрам",
      description:
        "Используйте онлайн-конструктор потолочных карнизов FOROOM для выбора и создания карнизов, идеально подходящих для вашего интерьера. Настройте размер, форму и стиль карниза, чтобы он идеально сочетался с вашим интерьером и функциональными требованиями.",
    },
  ];
  created() {
    const data = this.systems.find(
      (system) => system.url === this.$route.params.systemName
    );
    if (data) {
      this.title = data.title;
      this.description = data.description;
    }
  }
  async mounted() {
    if (!calculatorStore.templatesGetter) {
      await calculatorStore.getTemplates();
    }

    if (!calculatorStore.calcStepsGetter) {
      await calculatorStore.getCalcSteps();
    }

    if (
      this.$route.query.template &&
      this.$route.query.sizes &&
      calculatorStore.templatesGetter
        .map((t) => t.type + t.subtype)
        .includes(this.$route.query.template)
    ) {
      const stepIndex = calculatorStore.calcStepsGetter[this.$route.query.template]
        .filter((i) => i.inPaginator)
        .findIndex((i) => i.params.includes("sizes") || i.params.includes("width"));

      await calculatorStore.setCurrentStep(stepIndex);
    } else {
      await calculatorStore.setCurrentStep(0);
    }

    await calculatorStore.calculate(this.template);

    if (this.template?.type === "rolo" || this.template?.type === "zebra") {
      const product = catalogStore.catalogGetter.find(
        (product) => product.productId === this.template.type + this.template.subtype
      );
      await calculatorStore.setControlType(product.controls.default);
    }

    if (this.template?.type !== "karniz") {
      if (!this.$route.query.material) {
        const material = await this.$cheapestMaterial(true);
        await calculatorStore.setMaterialToTemplate(material.tid);
      }
      await calculatorStore.calculate(calculatorStore.calculatedItem);
    }
  }

  get page() {
    return pagesStore.currentPageGetter;
  }

  get template() {
    const productsIds = systemsStore.productsByUrlGetter(this.$route.params.systemName);

    let templates = calculatorStore.templatesGetter;

    if (templates) {
      templates = templates.filter((template) => productsIds?.includes(template.type));
      if (
        this.$route.query.template &&
        templates.map((t) => t.type + t.subtype).includes(this.$route.query.template)
      ) {
        const template = templates.find(
          (t) => t.type + t.subtype === this.$route.query.template
        );
        if (this.$route.query.sizes) {
          const sizes = this.$route.query.sizes.split("x");
          template.width = sizes[0];
          template.height = sizes[1];
        }

        if (this.$route.query.material) {
          template.material = this.$route.query.material;
        }
        // console.log(template)

        return template;
      }
      return templates[0];
    }
    return null;
  }

  get urlMap() {
    return systemsStore.systemUrlMapGetter;
  }

  get currentSystem() {
    return this.urlMap.find((item) => item.routeParam === this.$route.params.systemName)
      .system;
  }

  get processing() {
    return calculatorStore.calcProcessGetter;
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}
</style>
