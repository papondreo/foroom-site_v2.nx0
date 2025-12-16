export const state = () => ({
  userIP: null,
  loading: false,
  componentLoading: false,
  cartCount: null,
  error: null,
  message: [],
  orderConfirm: null,
  yandexReviewModal: false,
  imgZoomBox: null,
  showCheck: false,
  blinkCheck: false,
  discountsFilter: [], // discount на хиты
  userLocation: null, // выбранный город пользователя
  // userAddress: null,
  mainSystem: true, //
  selectedShop: {
    id: 0,
    latitude: '55.753960',
    longitude: '37.620393'
  },

  callbackForm: false,
  callbackModal: false,
  locationModal: false, // модалка, выбор города из списка
  dealerRequestConfirmModal: null, // модалка подтверждения отправки формы заявки на представительство
  callbackConfirmModal: null // модалка подтверждения отправки формы обратного звонка
})

export const mutations = {
  setUserIP(state, payload) {
    state.userIP = payload
  },
  setUserLocation(state, payload) {
    state.userLocation = payload
  },
  // setUserAddress (state, payload) {
  //     state.userAddress = payload
  // },
  setLocationModal(state, payload) {
    state.locationModal = payload
  },
  setDealerRequestConfirmModal(state, payload) {
    state.dealerRequestConfirmModal = payload
  },
  setCallbackConfirmModal(state, payload) {
    state.callbackConfirmModal = payload
  },
  setCompare(state, payload) {
    state.compare = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setComponentLoading: function (state, payload) {
    state.componentLoading = payload
  },
  setCartCount: function (state, payload) {
    state.cartCount = payload
  },
  setError: function (state, payload) {
    state.error = payload
  },
  setImgZoomBox: function (state, payload) {
    state.imgZoomBox = payload
  },
  setBlinkCheck: function (state, payload) {
    state.blinkCheck = payload
  },
  clearError: function (state) {
    state.error = null
  },
  setMessage: function (state, payload) {
    state.message.push(payload)
  },
  setOrderConfirm (state, payload) {
    state.orderConfirm = payload
  },
  setYandexReviewModal (state, payload) {
    state.yandexReviewModal = payload
  },
  clearMessage: function (state) {
    state.message.splice(0, 1)
  },
  toggleCheck: function (state, payload) {
    state.showCheck = payload
  },
  setDiscountsFilter: function (state, payload) {
    state.discountsFilter = payload
  },
  setSelectedShop: function (state, payload) {
    state.selectedShop = payload
  },
  setCallbackForm: function (state, payload) {
    state.callbackForm = payload
  },
  setCallbackModal: function (state, payload) {
    state.callbackModal = payload
  },
  setMainSystem(state, payload) {
    state.mainSystem = payload
  }
}

export const actions = {
  setUserLocation({commit}, payload) {
    commit('setUserLocation', payload)
  },
  // setUserAddress({commit}, payload) {
  //     commit('setUserAddress', payload)
  // },
  setLocationModal({commit}, payload) {
    commit('setLocationModal', payload)
  },
  setDealerRequestConfirmModal({commit}, payload) {
    commit('setDealerRequestConfirmModal', payload)
  },
  setCallbackConfirmModal({commit}, payload) {
    commit('setCallbackConfirmModal', payload)
  },
  setCompare({commit}, payload) {
    commit('setCompare', payload)
  },
  setLoading({commit}, payload) {
    commit('setLoading', payload)
  },
  setComponentLoading({commit}, payload) {
    commit('setComponentLoading', payload)
  },

  setCartCount({commit}, payload) {
    commit('setCartCount', payload)
  },

  setImgZoomBox({commit}, payload) {
    commit('setImgZoomBox', payload)
  },

  blinkCheck({commit}) {
    commit('setBlinkCheck', true)
    setTimeout(() => {
      commit('setBlinkCheck', false)
    }, 1000)
  },
  setError({commit}, payload) {
    commit('setError', payload)
  },
  clearError({commit}) {
    commit('clearError')
  },
  setMessage({commit}, payload) {
    commit('setMessage', payload)
  },
  setOrderConfirm({commit}, payload) {
    commit('setOrderConfirm', payload)
  },
  setYandexReviewModal ({commit}, payload) {
    commit('setYandexReviewModal', payload)
  },
  clearMessage({commit}) {
    commit('clearMessage')
  },
  toggleCheck({commit}, payload) {
    commit('toggleCheck', payload)
  },
  setDiscountsFilter({commit}, payload) {
    commit('setDiscountsFilter', payload)
  },
  toggleSystemsFilter({commit}, payload) {
    commit('toggleSystemsFilter', payload)
  },
  setSelectedShop({commit}, payload) {
    commit('setSelectedShop', payload)
  },
  setCallbackForm({commit}, payload) {
    commit('setCallbackForm', payload)
  },

  setCallbackModal({commit}, payload) {
    commit('setCallbackModal', payload)
  },

  setMainSystem({commit}, payload) {
    commit('setMainSystem', payload)
  }
}

export const getters = {
  userIP: s => s.userIP,
  userLocation: s => s.userLocation,
  // userAddress: s => s.userAddress,
  loading: s => s.loading,
  cartCount: s => s.cartCount,
  imgZoomBox: s => s.imgZoomBox,
  mainSystem: s => s.mainSystem,


  componentLoading(state) {
    return state.componentLoading
  },
  error(state) {
    return state.error
  },
  message(state) {
    return state.message
  },
  showCheck(state) {
    return state.showCheck
  },
  blinkCheck(state) {
    return state.blinkCheck
  },

  discountsFilter(state) {
    return state.discountsFilter
  },

  selectedShop: s => s.selectedShop,
  compare: s => s.compare,
  callbackForm: s => s.callbackForm,
  callbackModal: s => s.callbackModal,
  locationModal: s => s.locationModal,
  dealerRequestConfirmModal: s => s.dealerRequestConfirmModal,
  callbackConfirmModal: s => s.callbackConfirmModal,
  orderConfirm: s => s.orderConfirm,
  yandexReviewModal: s => s.yandexReviewModal
}
