import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'
import { Notify } from '@/types/Notify'
import { $axios } from '@/utils/axios-accessor'
import config from '@/config'

// import { $axios } from '@/utils/axios-accessor'
// import { LocationByIP } from '@/types/UserLocation/LocationByIP'
//
// import { getDistance } from 'geolib'

@Module({
  name: 'siteComponentStates',
  namespaced: true,
  stateFactory: true
})
export default class SiteComponentStatesModule extends VuexModule {
  callbackModal: boolean | string = false
  callbackModalMinimal: boolean = false
  callbackConfirmModal: any = false
  dealerRequestConfirmModal: any = false
  orderConfirmModal: any = false
  checkParamsModal: boolean = false
  checkPreviewModal: boolean = false
  compareModal: boolean = false
  userIP: null
  wallColor = {
    name: 'Green 002',
    color: '#cee1c1',
    url: 'https://media.foroom.ru/docs/kons/load/1442441079b.png'
  }
  notifies: Notify[] = []

  @VuexMutation
  SET_CALLBACK_MODAL(flag: boolean | string) {
    this.callbackModal = flag
  }

  @VuexMutation
  SET_CALLBACK_MODAL_MINIMAL(flag: boolean) {

    this.callbackModalMinimal = flag
  }

  @VuexMutation
  SET_CALLBACK_CONFIRM_MODAL(data) {
    this.callbackConfirmModal = data
  }

  @VuexMutation
  SET_DEALER_REQUEST_CONFIRM_MODAL(data) {
    this.dealerRequestConfirmModal = data
  }

  @VuexMutation
  SET_ORDER_CONFIRM_MODAL(data) {
    this.orderConfirmModal = data
  }

  @VuexMutation
  SET_COMPARE_MODAL(data) {
    this.compareModal = data
    setTimeout(() => {
      this.compareModal = false
    }, 5000)
  }

  @VuexMutation
  SET_CHECK_PARAMS_MODAL(flag: boolean) {
    this.checkParamsModal = flag
  }

  @VuexMutation
  SET_CHECK_PREVIEW_MODAL(flag: boolean) {
    this.checkPreviewModal = flag
  }

  @VuexMutation
  SET_WALL_COLOR(color) {
    this.wallColor = color
  }

  @VuexMutation
  SET_NOTIFY(notify: Notify) {
    this.notifies.push(notify)
    setTimeout(() => {
      this.notifies = this.notifies.filter((n) => n.id !== notify.id)
    }, notify.duration)
  }

  @VuexMutation
  CLEAR_NOTIFIES() {
    this.notifies = []
  }

  @VuexMutation
  SET_USER_IP(ip) {
    this.userIP = ip
  }

  @VuexAction({ commit: 'SET_USER_IP', rawError: true })
  async getUserIP() {
    const { data } = await $axios.get(`${config.api.url}api/user-ip`)
    return data.ip
  }

  @VuexAction({ commit: 'SET_CALLBACK_MODAL', rawError: true })
  setCallbackModal(flag: boolean | string) {
    return flag
  }

  @VuexAction({ commit: 'SET_CALLBACK_MODAL_MINIMAL', rawError: true })
  setCallbackModalMinimal(flag: boolean) {
    return flag
  }

  @VuexAction({ commit: 'SET_COMPARE_MODAL', rawError: true })
  setCompareModal(flag: boolean) {
    return flag
  }

  @VuexAction({ commit: 'SET_CALLBACK_CONFIRM_MODAL', rawError: true })
  setCallbackConfirmModal(data) {
    return data
  }

  @VuexAction({ commit: 'SET_DEALER_REQUEST_CONFIRM_MODAL', rawError: true })
  setDealerRequestConfirmModal(data) {
    return data
  }

  @VuexAction({ commit: 'SET_ORDER_CONFIRM_MODAL', rawError: true })
  setOrderConfirmModal(data) {
    return data
  }

  @VuexAction({ commit: 'SET_CHECK_PARAMS_MODAL', rawError: true })
  setCheckParamsModal(flag: boolean) {
    return flag
  }

  @VuexAction({ commit: 'SET_CHECK_PREVIEW_MODAL', rawError: true })
  setCheckPreviewModal(flag: boolean) {
    return flag
  }

  @VuexAction({ commit: 'SET_WALL_COLOR', rawError: true })
  setWallColor(color) {
    return color
  }

  @VuexAction({ commit: 'SET_NOTIFY', rawError: true })
  setNotify(notify: Notify) {
    notify.id = (Math.random() + 1).toString(36).substring(2)
    if (!notify.duration) {
      notify.duration = 7000
    }
    return notify
  }

  @VuexAction({ commit: 'CLEAR_NOTIFIES', rawError: true })
  clearNotifies() {
    return true
  }

  get callbackModalStateGetter() {
    return this.callbackModal
  }

  get callbackModalMinimalStateGetter() {
    return this.callbackModalMinimal
  }

  get compareModalStateGetter() {
    return this.compareModal
  }

  get callbackConfirmModalStateGetter() {
    return this.callbackConfirmModal
  }

  get dealerRequestConfirmModalStateGetter() {
    return this.dealerRequestConfirmModal
  }

  get orderConfirmModalStateGetter() {
    return this.orderConfirmModal
  }

  get checkParamsModalStateGetter() {
    return this.checkParamsModal
  }

  get checkPreviewModalStateGetter() {
    return this.checkPreviewModal
  }

  get wallColorGetter() {
    return this.wallColor
  }

  get notifiesGetter() {
    return this.notifies
  }

  get userIPGetter() {
    return this.userIP
  }
}
