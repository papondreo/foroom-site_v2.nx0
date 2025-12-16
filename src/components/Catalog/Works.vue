<template>
  <div v-if="!isHiddenSystem" class="work-slider">
    <h2 class="work-title">Наши работы</h2>
    <div class="work-item">

      <div class="work-images">
        <img
          v-if="currentWork.images.length > 0"
          :src="currentWork.images[0]"
          :alt="currentWork.alt"
          class="work-image-large"
          @click="openModal(currentWork.images[0])"
        />
        <div class="work-thumbnails">
          <img
            v-for="(image, i) in currentWork.images.slice(1)"
            :key="i"
            :src="image"
            :alt="currentWork.alt"
            class="work-image-thumb"
            @click="openModal(image)"
          />
        </div>
      </div>

      <div class="work-text">
        <h2>{{ currentWork.title }}</h2>
        <div class="description">
          {{ currentWork.description }}
        </div>

        <div class="callback-button">
          <button @click="openCallbackModal">Оставить заявку</button>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="prevWork" :disabled="currentIndex === 0">‹</button>
      <button @click="nextWork" :disabled="currentIndex === works.length - 1">›</button>
    </div>

    <div
      v-if="isCallbackModalOpen"
      class="modal-overlay"
      @click.self="closeCallbackModal"
    >
      <CallbackModal @close="closeCallbackModal" />
    </div>

    <div v-if="isModalOpen" class="modal" @click="closeModal">
      <img :src="modalImage" class="modal-image" />
    </div>
  </div>
</template>






<script lang="ts">
import CallbackModal from '@/components/Modals/CallbackModal.vue'; 

export default {
  components: {
    CallbackModal 
  },
  props: {
    currentSystem: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentIndex: 0,
      isModalOpen: false,
      isCallbackModalOpen: false, 
      modalImage: '',
      works: [
      {
        id: 1,
        name: "Работа 1",
        images: [
          "/img-new/catalog/our_works/1/home.jpg",
          "/img-new/catalog/our_works/1/1.jpg",
          "/img-new/catalog/our_works/1/2.jpg",
          "/img-new/catalog/our_works/1/3.jpg",
          "/img-new/catalog/our_works/1/4.jpg",
          // "/img-new/catalog/our_works/1/5.jpg"
        ],
        alt: "Головокружительная гостиная – многофункциональное пространство для отдыха и работы.",
        link: "/work1",
        title: "Головокружительная гостиная",
        description: `Мы снова приняли участие в передаче “Квартирный вопрос” \n
          В этот раз перед дизайнерами стояла непростая задача – превратить гостиную в многофункциональное пространство для сна, работы, отдыха.\n  
          Для защиты от посторонних взглядов и солнечных лучей на окна установлена практичная солнцезащитная система ROMA тм FOROOM.\n 
          Она относится к категории римских штор, известных всем своей складчатой драпировкой. Поперечные складки придают изделию строгий и лаконичный вид, 
          а плотная ткань делает окружающее пространство более воздушным и изысканным.`
      },
      {
        id: 2,
        name: "Работа 2",
        images: [
          "/img-new/catalog/our_works/2/home.jpg",
          "/img-new/catalog/our_works/2/1.jpg",
          "/img-new/catalog/our_works/2/2.jpg",
          "/img-new/catalog/our_works/2/3.jpg",
          "/img-new/catalog/our_works/2/4.jpg",
        ],
        alt: "Горная кухня – интерьер с элементами природы и современными решениями.",
        link: "/work2",
        title: "Горная кухня",
        description: `Наши изделия снова появились в популярной телепередаче “Квартирный вопрос”. В новом выпуске программы дизайнеры переделали старую кухню. И вот из чего сложился новый интерьер:\n
        Светлые оттенки создают ощущение безмятежности и спокойствия. На окна установлены функциональные шторы плиссе INTEGRA PLISSE бренда FOROOM. Вместительная обеденная зона рассчитана как минимум на 8 человек. Теперь принимать гостей можно будет с комфортом.\n
        Увидеть получившийся результат можно на фотографиях проекта! `
            },
      {
        id: 3,
        name: "Работа 3",
        images: [
          "/img-new/catalog/our_works/3/home.jpg",
          "/img-new/catalog/our_works/3/1.jpg",
          "/img-new/catalog/our_works/3/2.jpg",
          "/img-new/catalog/our_works/3/3.jpg",
          "/img-new/catalog/our_works/3/4.jpg",
         
        ],
        alt: "Гостиная под листьями гинкго билоба — интерьер, наполненный природой и гармонией.",
        link: "/work3",
        title: "Гостиная под листьями гинкго билоба",
        description: `Интерьер выполнен в спокойных натуральных оттенках, способствующих релаксации и безмятежному отдыху. 
        ьзование натуральных материалов, таких как дерево и ткань, добавило ощущение связи с природой.\n
        На окна установлены деревянные горизонтальные жалюзи G-FORM WOOD 50 бренда FOROOM. 
        Изделия гармонично дополняют общий дизайн окружающего пространства и защищают комнату от посторонних взглядов и солнечных лучей. `
      },
      {
        id: 4,
        name: "Работа 4",
        images: [
          "/img-new/catalog/our_works/4/home.jpg",
          "/img-new/catalog/our_works/4/1.jpg",
          "/img-new/catalog/our_works/4/2.jpg",
          "/img-new/catalog/our_works/4/3.jpg",
          "/img-new/catalog/our_works/4/4.jpg",
        ],
        alt: "Детская для трёх каратистов – функциональный и стильный интерьер для юных спортсменов.",
        link: "/work4",
        title: "Детская для трёх каратистов",
        description: `Перед дизайнерами стояла непростая задача: превратить спальню родителей в комфортное пространство 
        для трех юных спортсменов и сделать уютный рабочий кабинет из трехметровой лоджии.\n
        Всего на 19-ти квадратных метрах дизайнеры проекта разместили: 3 спальных места, 3 рабочих места, вместительную систему хранения,место для активных игр и занятий спортом, место для уединения.В основу интерьера легли близкие героям-каратистам цвета поясов карате.\n
        Плюс на 3-метровой лоджии обустроили уютный кабинет. Для защиты от солнечных лучей дизайнеры выбрали шторы плиссе INTEGRA PLISSE от нашей компании.`
      },
      {
        id: 5,
        name: "Работа 5",
        images: [
          "/img-new/catalog/our_works/5/home.jpg",
          "/img-new/catalog/our_works/5/1.jpg",
          "/img-new/catalog/our_works/5/2.jpg",
          "/img-new/catalog/our_works/5/3.jpg",
          "/img-new/catalog/our_works/5/4.jpg",
          
        ],
        alt: "Золото, пудра и мини-офис – спальня с кабинетом, комфорт и приватность.",
        link: "/work5",
        title: "Золото, пудра и мини-офис",
        description: `Дизайнеры передачи «Квартирный вопрос» превратили гостиную новых героев проекта в спальню с кабинетом.\n
        Установили на окна лоджии новинку бренда FOROOM — горизонтальные деревянные жалюзи G-FORM WOOD 50.\n 
        Дизайнеры обеспечили приватность супружеской паре. Причем приватность как для отдыха, так и для работы.\n
        Организовали многофункциональную систему хранения. Вопрос размещения вещей всей семьи теперь эстетично решен.`
      },
      {
        id: 6,
        name: "Работа 6",
        images: [
          "/img-new/catalog/our_works/6/home.jpg",
          "/img-new/catalog/our_works/6/1.jpg",
          "/img-new/catalog/our_works/6/2.jpg",
          "/img-new/catalog/our_works/6/3.jpg",
          "/img-new/catalog/our_works/6/4.jpg",
         
          
        ],
        alt: "Кухня-гостиная на речном трамвайчике – сочетание современного дизайна и уюта.",
        link: "/work6",
        title: "Кухня-гостиная на речном трамвайчике",
        description: `Дизайнеры проекта поработали с 5-метровой кухней. За счет грамотной перепланировки удалось расширить обеденную зону и 
        выстроить новую архитектуру пространства, присоединив к кухне гостиную.\n
        В кухне вдоль окна разместилась просторная рабочая зона с мойкой. На противоположной стене появилась система хранения с холодильником и местом для кофе-поинта.\n
        Отдельным элементом интерьера стали горизонтальные деревянные жалюзи бренда FOROOM с возможностью дистанционного управления.`
      },
      // {
      //   id: 7,
      //   name: "Работа 7",
      //   images: [
      //     "/img-new/catalog/our_works/7/1.jpg",
      //     "/img-new/catalog/our_works/7/2.jpg",
    
      //   ],
      //   alt: "Спальня для капитанской дочки – уют и комфорт для личного пространства.",
      //   link: "/work7",
      //   title: "Спальня для капитанской дочки",
      //   description: `В новом проекте «Квартирный вопрос» дизайнеры преобразили 17-метровую спальню-будуар для героини проекта.
      //   В проекте были учтены все пожелания хозяйки комнаты, а именно: вместительные шкафы для хранения многочисленных нарядов, комфортное спальное место и пространство, где можно провести время с самыми близкими.
      //   За надежную защиту от солнечных лучей отвечают римские шторы ROMA от нашей компании.`
      // },
      {
        id: 8,
        name: "Работа 8",
        images: [
          "/img-new/catalog/our_works/8/home.jpg",
          "/img-new/catalog/our_works/8/1.jpg",
          "/img-new/catalog/our_works/8/2.jpg",
          "/img-new/catalog/our_works/8/3.jpg",
          "/img-new/catalog/our_works/8/4.jpg",
          
        ],
        alt: "Японская детская с подиумом и драконом – комната для творчества и комфорта.",
        link: "/work8",
        title: "Японская детская с подиумом и драконом",
        description: `Новый выпуск «Квартирного вопроса» закончился слезами счастья, причем детскими. А все потому, что дизайнеры проекта полностью пересмотрели 
        настроение и наполнение комнаты для трех сестер.\n
        На 21 квадратном метре получилось организовать:\n
        -вместительную гардеробную с примерочной;\n
        -спальню, трансформируемую в домашний кинотеатр для всей семьи;\n
        -учебную зону с двумя рабочими столами, совмещающих функцию туалетных столиков,\n
        и даже нашлось место для художественной студии, где можно творить и созерцать.\n
        Для защиты помещения от солнечных лучей использовались рулонные шторы INTEGRA SLIM.`
      }
      ]
    };
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex]
    },
    isHiddenSystem() {
    const hiddenSystems = [ 'zebra', 'vblinds', 'profileCornices']
    return hiddenSystems.includes(this.currentSystem)
  }
  },
  watch: {
    currentSystem: {
      handler() {
        this.setFirstWorkIfNeeded()
      },
      immediate: true
    }
  },
  methods: {
    mounted() {
      setTimeout(() => {
        this.setFirstWorkIfNeeded()
      }, 100)
    },
    nextWork() {
      if (this.currentIndex < this.works.length - 1) this.currentIndex++;
    },
    prevWork() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    openModal(image: string) {
      this.modalImage = image;
      this.isModalOpen = true;
    },
 
    
    closeModal() {
      this.isModalOpen = false;
    },
    openCallbackModal() {
      console.log("открываем модалку CallbackModal ");
      this.isCallbackModalOpen = true; 
    },
    closeCallbackModal() {
      this.isCallbackModalOpen = false; 
    },
    setFirstWorkIfNeeded() {
      const zebra = ['zebra'];
      const rolo = ['rolo'];
      const wood = ['wood'];
      const hblinds = ['hblinds','vblinds'];
      const plisse = ['plisse'];
      if (zebra.includes(this.currentSystem)) {
        this.currentIndex = 1      
      }if (wood.includes(this.currentSystem)) {
        this.currentIndex = 2
      }if (hblinds.includes(this.currentSystem)) {
        this.currentIndex = 5
      }if (rolo.includes(this.currentSystem)) {
        this.currentIndex = 6
      }if (plisse.includes(this.currentSystem)) {
        this.currentIndex = 3
      }
      else {
        console.log(`error: ${this.currentSystem} not found`);
      }
    }
  }
};
</script>



<style scoped>

.description {
  white-space: pre-line; 
}

.work-title {
  margin-bottom: 16px;
  font-size: 19px;
  font-weight: 400;
  text-transform: uppercase;
  color: #d38f2c;
  text-align: left;
  margin-left: 0;
}

.work-slider {
  max-width: 1500px;
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
}

.work-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}


.work-images {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 2;
  max-width: 65%;
}


.work-image-large {
  width: 830px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.work-thumbnails {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.work-image-thumb {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 9px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.work-image-thumb:hover,
.work-image-large:hover {
  transform: scale(1.1);
}


.work-text {
  flex: 1;
  max-width: 30%;
}

.work-text h2 {
  margin: 0 0 10px;
}

.controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.controls button {
  padding: 8px 16px;
  font-size: 24px;
  cursor: pointer;
}


.callback-button {
  margin-top: 20px;
}

.callback-button button {
  padding: 10px 20px;
  background-color: #d38f2c;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.callback-button button:hover {
  background-color: #daa352;
}


.callback-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.callback-modal .container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 1024px) {
  .work-images {
    max-width: 100%;
    flex: 1 1 100%;
  }

  .work-image-large {
    width: 100%;
    height: auto;
  }

  .work-image-thumb {
    width: calc(33.333% - 7px);
    height: auto;
  }

  .work-text {
    max-width: 100%;
    flex: 1 1 100%;
  }

  .work-item {
    flex-direction: column;
  }

  .callback-button button {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .work-image-thumb {
    width: calc(50% - 5px);
  }

  .work-title {
    font-size: 16px;
  }

  .work-text h2 {
    font-size: 18px;
  }

  .callback-button button {
    font-size: 14px;
  }

  .controls button {
    font-size: 20px;
    padding: 6px 12px;
  }
}



</style>




