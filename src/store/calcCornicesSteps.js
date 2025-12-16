export const state = () => ({
  data: null,
  step: 1,

  // Карта шагов конструктора
  stepsMap: {
    // template.type + template.subtype
    rolo1: [
      {
        params: ['name'],
        inPaginator: false,
        inCheck: true
      },
      {
        params: ['InstallPlace'],
        components: [
          {
            name: 'AttachmentPoint',
            title: 'Место установки',
            description: [
              'Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'
            ],
            type: 'common'
          }
        ],
        inPaginator: true,
        tooltip: 'Место установки',
        inCheck: true
      },
      {
        params: ['HasBox', 'MountType'],
        components: [
          {
            name: 'Box',
            title: 'Наличие короба',
            description: [
              'Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'
            ],
            type: 'common'
          },
          {
            name: 'MountType',
            title: 'Тип крепления',
            description: [
              'Выберите предпочтительный вариант крепления изделия на створку'
            ],
            type: 'common'
          }
        ],
        inPaginator: true,
        tooltip: 'Наличие короба / Тип крепления',
        inCheck: true
      },
      {
        params: ['sizes'],
        // params: ['width', 'height'],
        // fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
        // fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
        components: [
          {
            name: 'Sizes',
            title: 'Размеры',
            description: [
              'Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла с учетом уплотнительных резинок.'
            ]
          }
        ],
        inPaginator: true,
        tooltip: 'Размеры',
        inCheck: true
      },
      {
        params: ['ControlDevice', 'ControlSide', 'Drive'],
        components: [
          {
            name: 'Controls',
            title: 'Управление',
            description: [
              'Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ.'
            ]
          }
        ],
        inPaginator: true,
        tooltip: 'Управление',
        inCheck: true
      },
      {
        params: ['material', 'MaterialCalc', 'rol_width', 'Color'],
        fullInfoParams: ['material', 'MaterialCalc', 'Color'],
        components: [
          {
            name: 'Materials',
            title: 'Материал',
            description: [
              'Выберите ткань для рулонных штор. Материал различается по степени светопропускания, где blackout – это ткани, полностью не пропускающие свет. Материал также можно отсортировать по цвету или по ценовой категории, где 0 – самые недорогие ткани.'
            ],
            type: 'common'
          },
          {
            name: 'Color',
            title: 'Цвет комплектации',
            description: [],
            type: 'common'
          }
        ],
        inPaginator: true,
        tooltip: 'Материалы',
        actionLabel: true,
        inCheck: true
      },
      {
        components: [
          {
            name: 'SystemInfo',
            title: '',
            description: [],
            type: 'common'
          },
          {
            name: 'OrderConfirm',
            title: '',
            description: [],
            type: 'common'
          },
          {
            name: 'SystemAdvantages',
            title: '',
            description: [],
            type: 'common'
          }
        ],
        params: [],
        inPaginator: true,
        tooltip: 'Подтверждение заказа',
        inCheck: false
      }
    ]
  }
})

export const mutations = {
  setData(state, data) {
    state.data = data
  }
}

export const actions = {
  setData({ commit }, payload) {
    // do something
    commit('setData', payload)
  }
}

export const getters = {
  data: (s) => s.data
}
