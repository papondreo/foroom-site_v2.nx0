export const state = () => ({
  data: {
    NumberOfRows: 1, //количество рядов
    currentTemplates: [],// массив templete для каждого ряда
    templateRus: [], // описание переменных рус 2го ряда
    price: 0, //цена второго ряда
    oldPrice: 0, // скидка на 2ой ряд
    selectParamUser: [],// выбранные параметры пользователя
    currentActionInfo: "", //анзввание акции для второго ряда
    ControlSide: "", // сторона управления
    ControlType: "", // тип управления
  }
});

export const mutations = {
  setData(state, data) {
    state.data = data;
  }
};

export const actions = {
  setData({ commit }, payload) {
    // do something
    commit('setData', payload)
  }
};

export const getters = {
  data: s => s.data
};
