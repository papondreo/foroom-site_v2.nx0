<template>
  <aside>
    <check-preview />
    <check-params />
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { calculatorStore } from '@/store'
import CheckPreview from '@/components/Constructor/ConstructorCheck/CheckPreview.vue'
import CheckParams from '@/components/Constructor/ConstructorCheck/CheckParams.vue'

@Component({
  components: {
    CheckPreview,
    CheckParams
  }
})
export default class ConstructorCheck extends Vue {
  get template() {
    return calculatorStore.calculatedItemGetter
  }
}
</script>

<style lang="scss" scoped>

</style>
