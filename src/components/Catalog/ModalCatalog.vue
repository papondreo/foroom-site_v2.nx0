<template>
    <div class="callback-form_container">
      <div class="callback-content">
        <!-- Блок с картинкой (2/3 ширины) -->
        <div class="image-block">
          <img src="/img-new/каталог_ГП .jpg" 
               alt="Каталог рулонных штор, жалюзи и других изделий FOROOM"
               title="Электронный каталог готовой продукции FOROOM" />
        </div>
        
        <!-- Блок с правыми двумя секциями -->
        <div class="right-block">
          <!-- Первый блок -->
          <div class="top-block">
           
            <p>Получите электронную версию каталога с фотографиями и подробным описанием всех изделий из нашего ассортимента</p>
          </div>
          
          <!-- Второй блок с формой обратной связи -->
          <div class="form-block">
            <!-- <header class="block_header">Отправим каталог</header> -->
            <callback-form-catalog class="callback-form_body" @close="closeModal" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue, Component } from "nuxt-property-decorator";
  import CallbackFormCatalog from "@/components/Catalog/CallbackFormCatalog.vue";
  import { siteComponentStatesStore } from "@/utils/store-accessor";
  
  @Component({
    components: { CallbackFormCatalog },
  })
  export default class CallbackModal extends Vue {
    closeModal() {
      siteComponentStatesStore.setCallbackModal(false);
    }
  }
  </script>
  
  <style lang="scss" scoped>
.callback-form_container {
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

.callback-content {
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; // На мобильных — вертикально
  }
}

.image-block {
  flex: 2;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }

  img {
    width: 100%;
    height: auto; // чтобы не растягивалось по высоте
    object-fit: cover;
    border-radius: 4px;

    @media (max-width: 768px) {
      max-height: 200px; // ограничим высоту на мобилках
    }
  }
}

.right-block {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 10px;
  }
}

.top-block {
  margin-bottom: 20px;
}

.top-block h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #f9a134;

  @media (max-width: 768px) {
    font-size: 18px;
  }
}

.form-block {
  background: #f4f4f4;
  border-top: 1px solid #ddd;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
}




  </style>
  