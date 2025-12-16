<template>
  <div class="ui-mb-3 ui-mt-3 row">
<!--    SystemAdvantages-->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { Template } from '@/types/Calculator/Template'
import { CatalogProduct } from '@/types/Catalog'

@Component
export default class SystemAdvantages extends Vue {
  @Prop({ required: true })
  readonly template: Template

  @Prop({ required: true })
  readonly product: CatalogProduct
}
</script>

<style lang="scss" scoped></style>
