import { Module, VuexModule } from 'nuxt-property-decorator'

interface Category {
  id: number
  name: string
  image: string
  alt: string
  link: string
  title: string
}

@Module({
  name: 'new_product',
  namespaced: true,
  stateFactory: true
})
export default class CategoriesModule extends VuexModule {
  private categories: Category[] = [
    {
      id: 5,
      name: 'Карниз для штор PROFILE SMART',
      image: '/img-new/catalog/products/karniz/s_new1.jpg',
      alt: 'Карниз для штор PROFILE SMART – технологичное изделия для современных помещений',
      link: '/catalog/profileCornices/profileSmart',
      titleImg:'PROFILE SMART – современный карниз для штор с дистанционным управлением',
      title:'Технологичный карниз для штор с возможностью дистанционного управления с помощью пульта, приложения или голосового помощника.',
    },
    {
      id: 4,
      name: 'Горизонтальные жалюзи G-FORM 50',
      image: '/img-new/catalog/products/hblinds/g50_new1.jpg',
      alt: 'Горизонтальные жалюзи G-FORM 50 – практичное и функциональное изделие для защиты помещения от солнечных лучей и посторонних взглядов',
      link: '/catalog/gorizontalnye-zhalyuzi/g-form50',
      titleImg:'Алюминиевые горизонтальные жалюзи G-FORM 50 с электроприводом. Для офисных и муниципальных учреждений.',
      title:'Горизонтальные жалюзи G-FORM 50 – практичное и функциональное изделие с возможностью дистанционного управления через пульт, голосовой помощник или мобильное приложение.',
    },
    {
      id: 3,
      name: 'Рулонные шторы GRANDE PREMIUM',
      image: '/img-new/catalog/products/rolo/gp_new1.jpg',
      alt: 'Рулонные шторы GRANDE PREMIUM – премиальное изделие для офисов и помещений HoReCa',
      link: '/catalog/rulonnye-shtory/grande-premium',
      titleImg:'Рулонные шторы GRANDE PREMIUM – функциональное решение для перекрытия панорамных окон',
      title:'Премиальное изделие с возможностью дистанционного управления для современных офисов и помещений сегмента HoReCa.',
    },
    {
      id: 1,
      name: 'Горизонтальные деревянные жалюзи G-FORM WOOD 50',
      image: '/img-new/catalog/products/wood/photo-new-products-wood.jpg',
      alt: 'Деревянные горизонтальные жалюзи G-FORM WOOD 50 — новинка от бренда FOROOM.',
      link: '/g-form-wood',
      title:'Новинка FOROOM: деревянные жалюзи G-FORM WOOD 50 с дистанционным управлением с помощью пульта или голосового помощника'
    },
    {
      id: 2,
      name: 'Моторизация',
      image: '/img-new/catalog/products/motorization/products.jpg',
      alt: 'Моторизация',
      link: '/g-form-motor',
      title: 'Рулонные шторы, жалюзи и карниз для штор с электроприводом'
    }
  ]

  get getCategories(): Category[] {
    return this.categories
  }
}
