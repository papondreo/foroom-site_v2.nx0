<template>
  <section class="container">
    <div>
      <h1 class="title">FOROOM</h1>
      <h2 class="page-name">{{ pageName }} Page</h2>

      <nuxt-link to="/">Back to main page</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class PageComponent extends Vue {
  @Prop()
  pageName!: string
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #3b3a49;
  letter-spacing: 1px;
}

.page-name {
  font-weight: 300;
  font-size: 42px;
  color: $text-color;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
