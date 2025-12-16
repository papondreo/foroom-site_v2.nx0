<template>
  <div>
    <section class="shops-map shops-map-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="main-title shops-map__main-title">{{ store_meta.h1 }}</h1>
          </div>
        </div>

        <div v-for="(block, i) of article.blocks" :key="`article-${i}`" class="row">
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
    </section>
  </div>
</template>

<script>
import { catalogStore } from "@/utils/store-accessor";
export default {
  name: "ArticlesItemPage",
  head() {
    return {
      title: this.store_meta.metaTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.store_meta.metaDescription,
        },
      ],
    };
  },
  // async validate({params, store}) {
  //     return await store.getters['articles/articles'].map(a => a.url).includes(params.url)
  // },
  async validate({ params, store }) {
    if (store.getters["articles/articles"].length === 0) {
      await store.dispatch("articles/fetch");
    }
    return store.getters["articles/articles"].map((n) => n.url).includes(params.url);
  },
  data: () => ({
    article: null,
  }),
  async fetch({ store }) {
    if (store.getters["articles/articles"].length === 0) {
      await store.dispatch("articles/fetch"); // (filename / action method name)
    }
  },
  created() {
    const { url } = this.$route.params;
    this.article = this.$store.getters["articles/articles"].find(
      (item) => item.url === url
    );
  },
  computed: {
    urls() {
      return this.$store.getters["articles/articles"].map((u) => u.url);
    },
    urlMap() {
      return catalogStore.catalogProductsSEOGetter;
    },
    store_meta() {
      let fullPath =
        this.$route?.fullPath[this.$route?.fullPath.length - 1] === "/"
          ? this.$route?.fullPath.trim().slice(0, -1)
          : this.$route?.fullPath;

      let meta = this.urlMap?.find((i) => i?.url === fullPath);

      if (meta) {
        return meta;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.main-title
  text-transform: uppercase
  font-size: 20px

.block-title
  display: inline-block
  text-transform: uppercase
  color: #3b3a49
  font-size: 1rem
  margin-bottom: 10px


.text-block
  height: auto
  margin-bottom: 30px
  font-size: 17px

  p
    margin-bottom: 10px

    &:last-of-type
      margin-bottom: 0
</style>
