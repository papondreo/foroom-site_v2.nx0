<template>
  <div>
    <div class="overlay" @click="closeModal"></div>
    <div class="confirm-modal">
      <div class="row m-0">
        <div class="col-sm-5 img-container p-0">
          <img src="/img-new/call-center-woman.jpg" alt="карта">
        </div>
        <div class="col-sm-7 p-0 content">
          <button class="close-button" @click="closeModal">Закрыть</button>
          <div v-if="manager">
            <p class="title">Ваша заявка отправлена!</p>

            <p>С вами свяжется старший менеджер</p>

            <p class="manager-name">{{ manager.manager }}</p>

            <p class="title mb-2 mt-3">Сохраните контакты:</p>
            <p class="contact">Тел.: <span><a :href="`tel:${clearPhone(manager.notification_param.phone)}`">{{ manager.notification_param.phone }}</a></span> <button class="copy-button" @click="copy(clearPhone(manager.notification_param.phone))"><i class="fa fa-copy"></i></button></p>
            <p class="contact">Email: <span>{{ manager.notification_param.email }}</span> <button class="copy-button" @click="copy(manager.notification_param.email)"><i class="fa fa-copy"></i></button></p>

            <p class="subtitle">Спасибо, что выбрали FOROOM!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter, Prop } from 'nuxt-property-decorator'
import { Shop } from '@/types/Shops/Shop'
import { siteComponentStatesStore } from '@/utils/store-accessor'

@Component
export default class DealerRequestConfirmModal extends Vue {
  closeModal() {
    siteComponentStatesStore.setDealerRequestConfirmModal(false)
  }

  clearPhone(phone) {
    return phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll('доб.', '')
  }

  copy(text) {
    navigator.clipboard.writeText(text)
      .then(() => {})
      .catch(err => {
        // console.log('Something went wrong', err);
      });
  }

  get manager() {
    return siteComponentStatesStore.dealerRequestConfirmModalStateGetter
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10000;
  cursor: pointer;
}
.confirm-modal {
  position: fixed;
  width: 90%;
  max-width: 700px;
  height: 350px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 5px;
  background: #fff;
  z-index: 10001;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.25);

  .row {
    height: 100%;
  }

  .img-container {
    padding-right: 0;
    height: 100%;

    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      border-radius: 5px 0 0 5px;
    }
  }

  .content {
    height: 100%;
    display: flex;
    align-items: center;

    & > div {
      position: relative;
      width: 100%;
      margin-top: -30px;
      padding: 35px;
    }

    .title {
      font-size: 24px;
      margin-bottom: 35px;
      font-weight: 600;
    }

    .subtitle {
      font-size: 20px;
      margin-top: 5px;
      margin-bottom: 15px;
    }

    .contact {
      margin-bottom: 5px;
      font-size: 17px;
    }
  }

  .copy-button,
  .close-button {
    color: #aaa;
    margin-left: 10px;
    font-size: 16px;
    transition: 0.3s ease-in-out;

    &:hover {
      color: $brand-orange-light;
    }
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 1;
  }
}

@media screen and (max-width: $colSm) {
  .img-container {
    display: none;
  }
}
</style>
