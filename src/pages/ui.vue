<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="ui-title-1">Title</h1>
          <h2 class="ui-title-2">Subtitle</h2>
          <h3 class="ui-title-3">Heading</h3>
          <h4 class="ui-title-4">Subheading</h4>
          <h5 class="ui-title-5">Subheading H5</h5>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            aspernatur assumenda, consequuntur, dolores eos error facilis harum
            libero maxime minus molestias, nobis obcaecati officiis quae quaerat
            quisquam tempore totam voluptate.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PageComponent from '@/components/PageComponent.vue'

@Component({
  components: { PageComponent }
})
export default class NewsPage extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}
</style>
