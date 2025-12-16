<template>
  <main class="container">
    <ui-title tag="h1" class="ui-title-1 ui-text-uppercase">
      {{ newsItem.title }}
    </ui-title>

    <div class="row">
      <div class="col-md-8 order-1 order-md-0 news-text">
        <div v-for="(block, i) of newsItem.blocks" :key="`news-${i}`" class="row">
          <div class="col-md-12">
            <h2 v-if="block.title" class="block-title">
              {{ block.title }}
            </h2>

            <div class="text-block">
              <p v-for="(text, k) of block.text" :key="`block-${k}`" v-html="text"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 order-0 order-md-1 news-media">
        <div class="row">
          <div
            v-for="(block, i) of newsItem.media"
            :key="`media-${i}`"
            class="col-6 col-md-12 col-sm-6 col-lg-12"
          >
            <div v-if="block.type === 'img'" class="media-block">
              <!--              <picture>-->
              <!--                <source-->
              <!--                  :srcset="`https://media.foroom.ru/images/nf_foroom/news/${block.url}.webp`"-->
              <!--                  type="image/webp"-->
              <!--                />-->
              <img
                :src="`https://media.foroom.ru/images/nf_foroom/news/${block.url}`"
                :alt="newsItem.title"
              />
              <!--              </picture>-->
            </div>
            <div v-if="block.type === 'imgUrl'" class="media-block">
              <img
                :src="`https://media.foroom.ru/images/nf_foroom/news/${block.url}`"
                :alt="newsItem.title"
              />
            </div>
            <!-- <div
              v-if="block.type === 'youtube'"
              class="media-block"
            >
            <span>{{  block.url.split('/').pop() }}</span>
              <YouTubeVideo
                style="border-radius: 5px"
                :url="'https://www.youtube.com/embed/' +
                    block.url.split('/').pop()"
                :data="{
                  url:
                    'https://www.youtube.com/embed/' +
                    block.url.split('/').pop()
                }"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { newsStore } from "@/utils/store-accessor";

@Component
export default class ArticlePage extends Vue {
  head() {
    const meta = this.newsItem.meta;

    return {
      title: meta.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: meta.description || this.newsItem.lid,
        },
      ],
    };
  }

  async asyncData() {
    if (!newsStore.news) {
      await newsStore.getNews();
    }
  }

  get newsItem() {
    return newsStore.newsGetter?.find(
      (article) => article.url === this.$route.params.url
    );
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

.block-title {
  display: inline-block;
  text-transform: uppercase;
  color: #3b3a49;
  font-size: 1rem;
  margin-bottom: 10px;
}
.text-block {
  height: auto;
  margin-bottom: 30px;
  font-size: 17px;

  p {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
.media-block {
  margin-bottom: 30px;

  img {
    max-width: 100%;
    border-radius: 5px;
  }
}
</style>
