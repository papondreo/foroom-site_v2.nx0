<template>
  <main>
    <section class="info-page">
      <div class="container">
        <div class="row mb-5">
          <div class="col-sm-12">
            <ui-title tag="h1" class="ui-title-1">
              Новинки от FOROOM – стильные решения для дизайна окон
            </ui-title>
            <h2>Новые солнцезащитные изделия от FOROOM это: </h2>
            <ul>
              <li>
                &#128077; Современные изделия для оформления дизайна окон 
              </li>
              <li>
                &#128077; Надежная защита от посторонних взглядов и солнечных лучей 
              </li>
              <li>
                &#128077; Широкий ассортимент для любых помещений от квартиры до офиса и гос. учреждения
              </li>
            </ul>
            <div class="row">
              <div
                class="col-xl-2 col-md-3 col-sm-4 col-6"
                v-for="category in categories"
                :key="category.id"
              >
              <div class="category-card"> 
                <nuxt-link :to="category.link" class="category-link">
                  <img
                    :src="category.image || '/images/default.jpg'"
                    :alt="category.alt || category.name"
                    :title="category.titleImg || ''"
                    class="category-image"
                  />
                  <h3 class="category-name">{{ category.name }}</h3>
                  <p class="category-title">{{ category.title }}</p>
                  <ui-button class="card-button">Подробнее</ui-button> 
                </nuxt-link>
              </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { mapGetters } from "vuex";
;


@Component({

  computed: {
    ...mapGetters("new_product", ["getCategories"]), 
  },
})
export default class ProductsNews extends Vue {
  public isOneClick: boolean = false;

  get categories() {
    return this.getCategories; 
  }
  
  head() {
  return { 
    meta: [
      {
          hid: "og:url",
          name: "og:url",
          content: "https://www.foroom.ru/new-products",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:title",
          name: "og:title",
          content:
            "Новинки от FOROOM – стильные решения для дизайна окон",
        },
      {
        hid: "description", 
        name: "description",
        content:
          "Откройте двери в мир трендовых солнцезащитных систем от FOROOM. Мы производим функциональные решения для дизайна окон. Наши изделия обеспечат надежную защиту от солнца и посторонних взглядов в любом помещении.",
      },
    ],
  };
}
}
</script>

<style scoped lang="scss">

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  min-height: 436px;
}

.category-link {
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.category-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  border: 2px ;
  margin-bottom: 15px;
}

.category-name {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.category-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  text-align: left;
}

.card-button {
  position: absolute;
  right: 10px;
  bottom: 10px; /* Изменено с button:5px на bottom:10px */
  background-color: #eba030;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.card-button:hover {
  background-color: #bf7a1e;         
}
.card-button:active {
  background-color: #9a6316;        
}


ul {
  list-style: none;
  margin-bottom: 20px;
}

img {
  margin-bottom: 15px;
  border: 2px ;
  border-radius: 8px;
}
</style>
