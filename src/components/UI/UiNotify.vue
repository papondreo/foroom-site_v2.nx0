<template>
  <div
    v-if="notifies.length"
    class="ui-notify-box"
  >
    <div
      v-for="notify in notifies"
      :key="notify.id"
      class="ui-notify"
      :class="`ui-notify_${notify.type}`"
    >
      <p class="ui-notify-title">{{ notify.title }}</p>
      <p
        v-if="!notify.debug"
        class="ui-notify-message"
      >
        {{ notify.message }}
      </p>

      <pre v-else>
        {{ notify.message }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { siteComponentStatesStore } from '@/utils/store-accessor'

@Component
export default class UiNotify extends Vue {
  mounted() {
    // siteComponentStatesStore.setNotify({
    //   type: 'message',
    //   title: 'test1',
    //   message: 'message1'
    // })
    //
    // setTimeout(() => {
    //   siteComponentStatesStore.setNotify({
    //     type: 'warn',
    //     title: 'test2',
    //     message: 'message2'
    //   })
    // }, 1000)
    //
    // setTimeout(() => {
    //   siteComponentStatesStore.setNotify({
    //     type: 'error',
    //     title: 'test3',
    //     message: 'message3'
    //   })
    // }, 2000)
    //
    // setTimeout(() => {
    //   siteComponentStatesStore.setNotify({
    //     type: 'success',
    //     title: 'test3',
    //     message: 'message3'
    //   })
    // }, 5000)
    //
    // setTimeout(() => {
    //   // siteComponentStatesStore.clearNotifies()
    // }, 7000)
  }

  get notifies() {
    return siteComponentStatesStore.notifiesGetter
  }
}
</script>

<style lang="scss" scoped>
.ui-notify-box {
  position: fixed;
  bottom: 14px;
  right: 24px;
  z-index: 999999;

  .ui-notify {
    min-width: 250px;
    background: #f5f5f8;
    padding: 14px 24px;
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
    p {
      color: #f5f5f8;
    }

    &-title {
      font-weight: 400;
      font-size: 18px;
    }
    &_error {
      background: #e74646;
    }
    &_warn {
      background: #e6a23c;
    }
    &_success {
      background: #67c23a;
    }
    &_message {
      background: #333438;
    }
  }
}
</style>
