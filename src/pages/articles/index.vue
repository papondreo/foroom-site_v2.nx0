<template>
  <div>
    <section class="shops-map shops-map-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="main-title shops-map__main-title">Статьи</h1>
          </div>
          <div
            class="col-12"
            v-for="(article, i) in articles"
            :key="`article-${i}`"
          >
            <nuxt-link :to="`/articles/${article.url}`" class="article">
              {{ article.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ArticlesPage",
  head() {
    return {
      title: "Статьи",
      meta: [
        { hid: "description", name: "description", content: "Статьи" }
      ]
    };
  },

  computed: {
    articles() {
      return this.$store.getters["articles/articlesList"];
    }
  }
};
</script>

<style lang="sass" scoped>
.article
  transition: .3s ease-in-out

  &:hover
    color: #d38f2c
</style>
