// import { isArray } from "/node_modules/vue-resource/src/util"
// import config from '@/config.js'
// import api from '@/assets/js/foroomApi.min' 

import api from '@/assets/js/foroomApi'
const FormData = require('form-data')

export const state = () => ({
  api: null,
  products: [],
  templates: [],
  template: {},
  templateRus: {},
  actions: {},
  params: {},
  controlType: null, // управление
  material: {},
  userMaterial: null, // материал выбранный пользователем
  wallColor: '',
  cartTemplates: {},
  flapsCount: 1,
  sizes: [],
  prices: {}
})

export const actions = {
  initData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      const params = {
        account: {
          price_margin: 1.4,
          discounts: [],
        },
        fullUrl: 'https://www.foroom.ru/_proxy/uploads/open/js/',
        console_mode: false,
        destination: 'fr',
        url: 'https://www.foroom.ru/_proxy/',
        uploads_url: 'https://www.foroom.ru/_proxy/uploads/download/zip/'
      };

      // console.log('API object:', api); 
      //  console.log(Object.keys(api));
      
      if (!api || typeof api.init !== 'function') {
        console.error('Ошибка: api.init не найден!');
        reject(new Error('api.init не является функцией'));
        return;
      }

      api.init(params);
      
      api.load_data((calc, init_data) => {
        commit('setProducts', init_data.all_data.izd)
        commit('setActions', init_data.all_actions)
        commit('setApi', api)
        resolve(api)
      });
    })
  },

  calculate({commit, dispatch, getters}, template) {
    const templatesRus = []
    const templates = []
    const sizes = []
    const price = {
      price: 0,
      oldPrice: 0
    }

    return new Promise((resolve, reject) => {
      // dispatch('common/setLoading', true, {root: true})
      getters.api.init_calc(calc => {
        
        // if (template.ControlHeight) {
        //     delete template.ControlHeight
        // }
        if (template.ControlDevice) {
          delete template.ControlDevice
        }

        getters.sizes.map((size, i) => {
          template.width = size.width
          template.height = size.height

          calc.load_template(template);
          calc.current_item.calcPrice();

          const error = calc.current_item.error;
          const errors = calc.current_item.errors;
          if (error) {
            const item = calc.current_item.release();
            const item_rus = calc.convert_item_to_preview(item);
            sizes.push({
              width: item.width,
              height: item.height,
              gab_width: item.gab_width,
              gab_height: item.gab_height,
              rol_width: item.rol_width ? item.rol_width : '',
              ControlHeight: item.ControlHeight ? item.ControlHeight : ''
            })

            price.price = price.price + item.price
            price.oldPrice = price.oldPrice + item.old_price

            reject(JSON.stringify({status: 'FAIL', errors: errors}));
            commit('calculate', {
              status: 'FAIL',
              item: item,
              item_rus: item_rus,
              errors: errors
            })

            templates.push(item)
            templatesRus.push(item_rus)

            commit('setPrices', price)
          } else {


            const item = calc.current_item.release();
            const item_rus = calc.convert_item_to_preview(item);

            sizes.push({
              width: item.width,
              height: item.height,
              gab_width: item.gab_width,
              gab_height: item.gab_height,
              rol_width: item.rol_width ? item.rol_width : '',
              ControlHeight: item.ControlHeight ? item.ControlHeight : ''
            })


            price.price = price.price + item.price
            price.oldPrice = price.oldPrice + item.old_price

            // console.log('c',calc.current_item)

            commit('setParams', calc.current_item)
            commit('calculate', {status: 'OK', item: item, item_rus: item_rus, errors: errors})
            commit('setPrices', price)

            // dispatch('common/setLoading', false, {root: true})

            templates.push(item)
            templatesRus.push(item_rus)

            resolve({status: 'OK', item: item, item_rus: item_rus, params: calc.current_item.oParams, errors: errors})
          }
        })
        commit('setCartTemplates', {
          templates: templates,
          templatesRus: templatesRus
        })
        commit('setSizes', sizes)
      })
    })
  },

  async getTemplates({commit}) {
    const data = new FormData()
    data.append('json', JSON.stringify({
      "auth": {},
      "data": {},
      "module": "calculator",
      "cmd": "get_templates",
      "key": 'W5pRNSx8Dx3tGY65xx3BOgAAAAE'
    }))

    const templates = await this.$axios.$post('https://www.foroom.ru/_proxy/', data)
    commit('loadTemplates', templates.data)
  },

  loadTemplates({commit, getters}, payload) {
    return new Promise((resolve, reject) => {
      getters.api.makePost('calculator', 'get_templates', {}, null, function (resp) {
        if (resp.data) {
          commit('loadTemplates', resp.data)
          resolve(resp.data)
        } else {
          console.log('templates loading failed', resp);
          reject(resp)
        }
      })
    })
  },


  setSizes({commit, getters}, payload) {
    const arr = []
    for (let i = 0; i < getters.flapsCount; i++) {
      arr.push({
        width: Array.isArray(payload) ? payload[i].width * 10 : payload.width,
        height: Array.isArray(payload) ? payload[i].height * 10 : payload.height,
        gab_width: Array.isArray(payload) ? payload[i].gab_width * 10 : payload.gab_width,
        gab_height: Array.isArray(payload) ? payload[i].gab_height * 10 : payload.gab_height,
        rol_width: Array.isArray(payload) ? payload[i].rol_width * 10 : payload.rol_width,
        ControlHeight: Array.isArray(payload) ? payload[i].ControlHeight * 10 : payload.ControlHeight,
      })
    }
    commit('setSizes', arr)
  },
  setControlType({commit}, payload) {
    commit('setControlType', payload)
  },
  setMaterial({commit}, payload) {
    commit('setMaterial', payload)
  },
  setUserMaterial({commit}, payload) {
    commit('setUserMaterial', payload)
  },
  setTemplate({commit}, payload) {
    commit('setTemplate', payload)
  },
  setFilteredProducts({commit}, payload) {
    commit('setFilteredProducts', payload)
  },
  setControl({commit}, payload) {
    commit('setControl', payload)
  },
  setWallColor({commit}, payload) {
    commit('setWallColor', payload)
  },
  setFlapsCount({commit}, payload) {
    commit('setFlapsCount', payload)
  }
}


export const mutations = {
  setApi(state, payload) {
    state.api = payload
  },

  setZipData(state, payload) {
    state.setZipData = payload
  },

  calculate(state, payload) {
    state.template = payload.item
    state.templateRus = payload.item_rus
  },

  setCartTemplates(state, payload) {
    state.cartTemplates = payload
  },
  setParams(state, payload) {
    state.params = payload
  },
  loadTemplates(state, payload) {
    state.templates = payload
  },
  setControlType(state, payload) {
    state.controlType = payload
  },
  setTemplate(state, payload) {
    state.template = payload
  },
  setSizes(state, payload) {
    state.sizes = payload
  },
  setPrices(state, payload) {
    state.prices = payload
  },
  setMaterial(state, payload) {
    state.material = payload
  },
  setUserMaterial(state, payload) {
    state.userMaterial = payload
  },
  setProducts(state, payload) {
    state.products = payload
  },
  setActions(state, payload) {
    state.actions = payload
  },
  setWallColor(state, payload) {
    state.wallColor = payload
  },
  setFlapsCount(state, payload) {
    state.flapsCount = payload
  },
}


export const getters = {
  api: s => s.api,
  zipData: s => s.zipData,
  actions: s => s.actions,
  products: s => s.products,
  params: s => s.params,
  templates: s => s.templates,
  template: s => s.template,
  templateRus: s => s.templateRus,
  cartTemplates: s => s.cartTemplates,
  material: s => s.material,
  userMaterial: s => s.userMaterial,
  controlType: s => s.controlType,
  wallColor: s => s.wallColor,
  flapsCount: s => s.flapsCount,
  sizes: s => s.sizes,
  prices: s => s.prices,
}

export const strict = false
