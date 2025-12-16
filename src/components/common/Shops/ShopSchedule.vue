<template>
  <p class="nearest-shop__work-time">
    <span class="work-time__title">Время работы:</span>

    <span
      :key="`r${i}`"
      v-for="(row, i) in schedule"
    >
      <template v-if="row.title">
        <span class="work-time__day">{{ row.title.replace(':', '') }}</span
        >: с
        <template v-if="row.time">
          {{ row.time.from }}
        </template>
        по
        <template v-if="row.time">
          {{ row.time.to }}
        </template>

        <span
          style="margin-left: 10px"
          v-if="row.break.from && row.break.to"
        >
          Перерыв:
          <template v-if="row.break">
            {{ row.break.from }}
          </template>
          по
          <template v-if="row.break">
            {{ row.break.to }}
          </template>
        </span>
        <br />
      </template>
      <template v-if="row.dayOff">
        <span class="work-time__day">Выходной:</span>
        {{ row.dayOff }}
      </template>
    </span>
  </p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { loadScriptAsync } from '@/libs/loadScriptAsync'

@Component({})
export default class ShopSchedule extends Vue {
  @Prop()
  readonly schedule
}
</script>

<style lang="scss" scoped>
.nearest-shop__work-time {
  text-align: right;
  margin-bottom: 8px;
}

.work-time {
  &__title {
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
  }

  &__day {
    font-weight: 400;
  }
}
</style>
