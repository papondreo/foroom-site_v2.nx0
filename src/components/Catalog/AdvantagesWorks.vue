<template>
    <div class="flex flex-col space-y-6 p-6 max-w-5xl mx-auto">
      
      <h1 class="text-2">
        Преимущества работы с нами
      </h1>
  
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center bg-gray-200 p-4 rounded-lg shadow-lg"
        >
  
          <div class="">
            <img
              :src="item.image"
              :alt="item.alt"
              :title="item.title"
              class="box"
            />
          </div>
  
  
          <div class="ml-4">
            <p class="text">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from "vue";
  
  export default defineComponent({
    name: "Advantages",
    data() {
      return {
        items: [
          {
            image: "/img-new/advantages_works/1.png",
            alt: "",
            title: "",
            description: "Собственное технологичное производство. Вся продукция для декора окна производится на современном производстве с площадью 9000 м2.",
          },
          {
            image: "/img-new/advantages_works/2.png",
            alt: "",
            title: "",
            description: "Оперативное изготовление продукции. Мы произведем изделия по индивидуальным размерам за 1-2 рабочих дня с момента поступления заказа на завод.",
          },
          {
            image: "/img-new/advantages_works/3.png",
            alt: "",
            title: "",
            description: "Более 250 розничных магазинов по всей стране. Наши представители есть в каждом крупном городе России.",
          },
          {
            image: "/img-new/advantages_works/5.png",
            alt: "",
            title: "",
            description: "Сеть сервисных центров. У нас есть сеть сервисных центров, расположенных по всей стране. Они осуществляют гарантийное и постгарантийное обслуживание наших изделий.",
          },
          {
            image: "/img-new/advantages_works/4.png",
            alt: "",
            title: "",
            description: "Комплектующие высокого качества. Мы работаем только с проверенными поставщиками и самостоятельно производим часть комплектующих.",
          },
          {
            image: "/img-new/advantages_works/6.png",
            alt: "",
            title: "",
            description: "Установка солнцезащитных систем “Под ключ”. Официальные представители FOROOM осуществляют полный комплекс работ от первичной консультации до доставки и установки изделий.",
          },
          
        ],
      };
    },
  });
  </script>
  
  
  <style scoped>
  
  .box {
  width: 80px; 
  height: 80px;
  left: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 16px; 

}
.items-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

  
  .grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  padding-bottom: 20px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}




.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-img {

  
  border-radius: 6px;
  margin-bottom: 16px; /* <-- отступ между картинкой и текстом */
}

.card-text {
  color: black;
  font-size: 16px;
  font-weight: 500;
}


.text-2 {
  text-align: left;
  margin-bottom: 16px;
  font-size: 19px;
  font-weight: 400;
  text-transform: uppercase;
  color: #d38f2c;
}



  
  
  
  </style>
  