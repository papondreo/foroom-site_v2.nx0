<template>
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1 ui-text-uppercase"
    >
      Новости FOROOM
    </ui-title>

    <div
      class="row last-news"
      v-if="news.length"
    >
      <div
        v-for="(item, i) in topNews"
        :key="`news-item-${i}`"
        class="col-sm-6 col-12 mb-4"
      >
        <nuxt-link
          :to="`/news/${item.url}`"
          class="news__item"
        >
          <div class="item-card__description">
            <div
              class="description__bg"
              :style="`background-image: url(https://media.foroom.ru/images/nf_foroom/news/${item.cover})`"
            ></div>
            <h2 class="item-card__title">{{ item.title }}</h2>
            <p class="item-card__lid">{{ item.lid }}</p>
            <p class="item__date mb-0">{{ item.date }}</p>
          </div>

          <div
            class="item-card__header"
            :style="`background-image: url(https://media.foroom.ru/images/nf_foroom/news/${item.cover})`"
          ></div>
          <h2 class="item-card__title">{{ item.title }}</h2>
          <p class="item__date mb-0">{{ item.date }}</p>
        </nuxt-link>
      </div>
    </div>

    <div class="row">
      <div
        v-for="(item, i) in news"
        :key="`news-item-${i}`"
        class="col-lg-4 col-md-6 col-sm-6 col-12 mb-4"
      >
        <nuxt-link
          :to="`/news/${item.url}`"
          class="news__item"
        >
          <div class="item-card__description">
            <div
              class="description__bg"
              :style="`background-image: url(https://media.foroom.ru/images/nf_foroom/news/${item.cover})`"
            ></div>
            <h2 class="item-card__title">{{ item.title }}</h2>
            <p class="item-card__lid">{{ item.lid }}</p>
            <p class="item__date mb-0">{{ item.date }}</p>
          </div>

          <div
            class="item-card__header"
            :style="`background-image: url(https://media.foroom.ru/images/nf_foroom/news/${item.cover})`"
          ></div>
          <h2 class="item-card__title">{{ item.title }}</h2>
          <p class="item__date mb-0">{{ item.date }}</p>
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PageComponent from '@/components/PageComponent.vue'
import { newsStore } from '@/store'

@Component({
  components: { PageComponent }
})
export default class NewsPage extends Vue {
  head () {
    return {
      title: 'Новости FOROOM. Главные события в жизни бренда жалюзи',
      meta: [
        { hid: 'description', name: 'description', content: 'Важная и актуальная информация о производителе и продукции FOROOM.'}
      ]
    }
  }

  async asyncData() {
    if (!newsStore.news) {
      await newsStore.getNews()
    }
  }

  get topNews() {
    return newsStore.newsGetter?.filter((article) => article.inTop).slice(0, 2)
  }

  get news() {
    const topNewsIds = this.topNews?.map((article) => article.id)
    return newsStore.newsGetter?.filter(
      (article) => !topNewsIds?.includes(article.id)
    )
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

.last-news {
  &__item {
    display: block;
    position: relative;
    height: 350px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
      .item__footer {
        bottom: 0;
      }
      .item__img img {
        transform: scale(1.03);
      }
    }
  }
}
.item {
  margin-bottom: 30px;
  cursor: pointer;
  &__title {
    padding: 25px 25px 50px;
    position: relative;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(29,29,29,0.2) 31%, rgba(255,255,255,0) 100%);
    z-index: 1;
    //color: $default-color;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(75, 75, 75, 1);
    text-transform: uppercase;
  }
  &__date,
  &__more {
    font-size: 14px;
    //font-family: $lightFont;
    font-weight: 200;
  }
  &__date {
    margin-bottom: 5px;
    //color: $brandMainColor;
    font-weight: 600;
  }
  &__more {
    //color: $brandMainColor !important;
    font-weight: 600;
    i {
      font-size: 11px;
    }
  }
  &__lid {
    margin-bottom: 15px;
    line-height: 1.3;
  }
  &__img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 5px;
      transition: .3s ease-in-out;
    }
  }
  &__footer {
    position: absolute;
    padding: 15px 25px;
    bottom: -35px;
    left: 0;
    right: 100px;
    border-radius: 0 5px 0 5px;
    //background: rgba(#3b3a49, .85)
    background: rgba(#fff, .85);
    transition: .3s ease-in-out;
    z-index: 9;
  }
}
.full-size {
  margin-bottom: 30px;
}
.news__item {
  display: block;
  position: relative;
  //display: flex
  //flex-wrap: wrap
  height: 100%;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  cursor: pointer;

  .item-card__description {
    position: absolute;
    padding: 5px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /*border: 1px solid #f0f0f0*/
    border-radius: 5px;
    background: #fff;
    z-index: 10;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: .5s ease-in-out;
    cursor: pointer;
    .item-card__title {
      padding-bottom: 15px;
      text-transform: uppercase;
    }
  }
  .item-card__lid {
    padding: 0 15px 15px;
  }
  .item-card__header {
    padding-bottom: 41%;
    position: relative;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
  }
  .item-card__title {
    width: 100%;
    text-transform: uppercase;
    padding: 15px 15px 40px;
  }
  .item__date {
    position: absolute;
    padding: 0 15px 10px;
    //color: $mediumFontColor;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &:hover {
    .item-card__description {
      opacity: 1;
      visibility: visible;
    }
  }
}
.description__bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  opacity: .15;
  filter: grayscale(100%);
  z-index: -1;
}
.i {
  display: none;
}
</style>
