<template>
  <main class="container">
    <ui-title
      tag="h1"
      class="ui-title-1"
    >
      ВАШ ЗАКАЗ ОФОРМЛЕН
    </ui-title>

    <ui-title
      tag="h2"
      class="ui-title-2"
    >
      Мы будем благодарны за Ваш отзыв
    </ui-title>

    <div class="row">
      <div class="col-4">
        <form>
<!--          <fieldset class="ui-mb-2">-->
<!--            <label for="name">Имя</label>-->
<!--            <input type="text" id="name">-->
<!--          </fieldset>-->

          <fieldset class="ui-mb-2">
            <label for="review">Отзыв</label>
            <textarea id="review" />
          </fieldset>

          <ui-button
            class="send-feedback"
            @click="sendFeedback"
            type="button"
          >
            Отправить отзыв
          </ui-button>
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import UiButton from '@/components/UI/UI-Button.vue'

@Component({
  components: { UiButton }
})
export default class SendFeedbackPage extends Vue {
  sendFeedback() {
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 400;
}

textarea {
  width: 100%;
  min-height: 180px;
  display: block;
  padding: 4px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.send-feedback {
  width: 100%;
  margin-top: 12px;

  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
}
</style>
