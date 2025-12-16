import { Module, VuexModule } from "nuxt-property-decorator";

interface MaterialGroup {
  name: string;
  materialId: string;
  title: string;
  img: string;
  alt: string;
}

interface Material {
  titleName: string;
  items: MaterialGroup[];
}

@Module({
  name: "materials",
  namespaced: true,
  stateFactory: true,
})
export default class MaterialsModule extends VuexModule {
  private materials: Material[] = [
  {
    titleName: "Варианты тканeй для рулонных штор",
    items: [
      {
        name : "Ткань Атлантик ВО, 29 бежевая",
        materialId: "mat-001",
        title: "Практичная ткань для рулонных штор ",
        img: "/rulonnye-shtory/Ткань Атлантик ВО, 29 бежевая.png",
        alt: "Практичная ткань для рулонных штор ",
      },
      {
        name : "Ткань Натали ВО, 11 коричневая",
        materialId: "mat-002",
        title: "Коричневая ткань для рулонных штор FOROOM ",
        img: "/rulonnye-shtory/Ткань Натали ВО, 11 коричневая.png",
        alt: "Текстура коричневой ткани “Натали” для рулонных штор",
      },
      {
        name : "Ткань Пальмира, 02 с рисунком",
        materialId: "mat-003",
        title: "Ткань с рисунком для рулонных штор",
        img: "/rulonnye-shtory/Ткань Пальмира, 02 с рисунком.png",
        alt: "Надежная ткань “Пальмира” для рулонных штор с ярким рисунком",
      },
      {
        name : "Ткань Панорама 36, черная ",
        materialId: "mat-004",
        title: "Ткань черного цвета для рулонных штор FOROOM",
        img: "/rulonnye-shtory/Ткань Панорама 36, черная.png",
        alt: "Текстура черной ткани “Панорама” для рулонных штор",
      },
      {
        name : "Ткань Полискрин, 08 комфорт серая",
        materialId: "mat-005",
        title: "Оригинальная ткань “Полискрин” серого цвета для рулонных штор",
        img: "/rulonnye-shtory/Ткань Полискрин, 08 комфорт серая.png",
        alt: "Текстура ткани для рулонных штор «Полискрин» серого цвета",
      },
      {
        name : "Ткань Скрин, 01 белая",
        materialId: "mat-006",
        title: "Практичная белая ткань «Скрин» для рольштор",
        img: "/rulonnye-shtory/Ткань Скрин, 01 белая.png",
        alt: "Текстура ткани «Тэфи 250» серого цвета для рольштор",
      },
    ],
  },
  {
    titleName: "Текстуры и цвета ламелей горизонтальных деревянных жалюзи",
    items: [
      {
        name : "Натуральный глянец",
        materialId: "mat-001",
        title: "Деревянные жалюзи FOROOM «Натуральный глянец»: элегантный блеск и натуральная текстура.",
        img: "/gorizontalnye-derevyannie-zhalyuzi/1.jpg",
        alt: "Текстура ламелей деревянных жалюзи FOROOM «Натуральный глянец» — поверхность натурального дерева.",
      },
      {
        name : "Антрацит",
        materialId: "mat-002",
        title: "Жалюзи FOROOM «Антрацит»: современный стиль с матовой текстурой.",
        img: "/gorizontalnye-derevyannie-zhalyuzi/2.jpg",
        alt: "Ламели деревянных жалюзи FOROOM в цвете «Антрацит».",
      },
      {
        name : "Серый",
        materialId: "mat-003",
        title: "Жалюзи FOROOM в сером цвете: универсальность для любого интерьера.",
        img: "/gorizontalnye-derevyannie-zhalyuzi/3.jpg",
        alt: "Ламели деревянных жалюзи FOROOM «Серый» — нейтральная матовая текстура.",
      },
      {
        name : "Молочный шоколад",
        materialId: "mat-004",
        title: "Деревянные жалюзи FOROOM «Молочный шоколад»: уют и насыщенный цвет.",
        img: "/gorizontalnye-derevyannie-zhalyuzi/4.jpg",
        alt: "Текстура ламелей деревянных жалюзи FOROOM «Молочный шоколад» — теплый коричневый оттенок.",
      },
      {
        name : "Бук",
        materialId: "mat-005",
        title: "Жалюзи FOROOM из бука: естественность и легкость.",
        img: "/gorizontalnye-derevyannie-zhalyuzi/5.jpg",
        alt: "Ламели деревянных жалюзи FOROOM «Бук» — натуральная текстура светлой древесины.",
      },
      {
        name : "Дуб венге",
        materialId: "mat-006",
        title: "Жалюзи FOROOM «Дуб венге»: роскошный дизайн с глубоким оттенком.",
        img: "/gorizontalnye-derevyannie-zhalyuzi/6.jpg",
        alt: "Текстура ламелей деревянных жалюзи FOROOM «Дуб венге» — контраст темного венге и дуба.",
      },
      
    ],
  },
];

  get getMaterials(): Material[] {
    return this.materials;
  }
}


