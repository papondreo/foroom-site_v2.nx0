export const state = () => ({
    step: 1,
    stepsMap: {
        // <-- PLISSE -->
        // INTEGRA PLISSE
        plisse1: [
            {
                params: ['name'],
                inPaginator: false,
                inCheck: true
            },
            // {
            //     params: [],
            //     components: [
            //         {
            //             name: 'FlapsCount',
            //             title: 'Количество створок',
            //             description: ['Выберите на какое количество створок Вам необходимо заказать изделия'],
            //             type: 'common'
            //         }
            //     ],
            //     inPaginator: true,
            //     tooltip: 'Количество створок',
            //     inCheck: false
            // },
            {
                params: ['MountType'],
                components: [
                    {
                        name: 'MountType',
                        title: 'Тип крепления',
                        description: ['Выберите предпочтительный вариант крепления изделия на створку. Кронштейн накидной предполагает установку без сверления.'],
                        // type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Тип крепления',
                inCheck: true
            },
            {
                params: ['sizes'],
                // params: ['width', 'height'],
                // fullInfoParams: ['width', 'height', 'gab_width', 'gab_height'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла вместе с уплотнительными резинками.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['material', 'rol_width', 'Color', 'BandColor'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: ['Выберите ткань для штор плиссе. Материал различается по степени светопропускания, где blackout – это ткани, полностью не пропускающие свет. Материал также можно отсортировать по цвету или по ценовой категории, где 0 – самые недорогие ткани.'],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет профиля',
                        description: ['Выберите цвет карниза для штор плиссе'],
                        type: 'common'
                    },
                    {
                        name: 'BandColor',
                        title: 'Цвет комплектации',
                        description: ['Выберите цвет пластиковых комплектующих для штор плиссе. Сюда входят ручки, шнур, кронштейны, заглушки'],
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
            },
        ],


        // <-- ROLO -->
        // --- FLAP ---
        // INTEGRA SLIM
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    },
                    // {
                    //     name: 'FlapsCount',
                    //     title: 'Количество створок',
                    //     description: ['Выберите на какое количество створок Вам необходимо заказать изделия'],
                    //     type: 'common'
                    // }
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
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    },
                    {
                        name: 'MountType',
                        title: 'Тип крепления',
                        description: ['Выберите предпочтительный вариант крепления изделия на створку'],
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
                        description: ['Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла с учетом уплотнительных резинок.']
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
                        description: ['Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ.'],
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
                        description: ['Выберите ткань для рулонных штор. Материал различается по степени светопропускания, где blackout – это ткани, полностью не пропускающие свет. Материал также можно отсортировать по цвету или по ценовой категории, где 0 – самые недорогие ткани.'],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет комплектации',
                        description: [],
                        type: 'common'
                    },
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
            },
        ],

        // INTEGRA BOX
        rolo2: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    },
                    // {
                    //     name: 'FlapsCount',
                    //     title: 'Количество створок',
                    //     description: ['Выберите на какое количество створок Вам необходимо заказать изделия'],
                    //     type: 'common'
                    // }
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
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    },
                    {
                        name: 'IntegraBoxMountType',
                        title: 'Тип крепления',
                        description: ['Выберите предпочтительный вариант крепления изделия на створку'],
                        // type: 'common'
                    },
                    // {
                    //     name: 'GlazingBead',
                    //     title: 'Глубина штапика',
                    //     description: ['Замерьте расстояние от плоскости поверхности стекла до плоскости лицевой грани штапика'],
                    //     type: 'common'
                    // }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['sizes'],
                // params: ['width', 'height'],
                // fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла с учетом уплотнительных резинок.']
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
                        description: ['Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ.'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'MaterialCalc', 'rol_width', 'Color'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: [],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет комплектации',
                        description: [],
                        type: 'common'
                    },
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
            },
        ],

        // INTEGRA BOX+
        rolo3: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    },
                    // {
                    //     name: 'FlapsCount',
                    //     title: 'Количество створок',
                    //     description: ['Выберите на какое количество створок Вам необходимо заказать изделия'],
                    //     type: 'common'
                    // }
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
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    },
                    {
                        name: 'IntegraBoxMountType',
                        title: 'Тип крепления',
                        description: ['Выберите предпочтительный вариант крепления изделия на створку'],
                        // type: 'common'
                    },
                    // {
                    //     name: 'GlazingBead',
                    //     title: 'Глубина штапика',
                    //     description: ['Замерьте расстояние от плоскости поверхности стекла до плоскости лицевой грани штапика'],
                    //     type: 'common'
                    // }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['sizes'],
                // params: ['width', 'height'],
                // fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла с учетом уплотнительных резинок.']
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
                        description: ['Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ.'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'MaterialCalc', 'rol_width', 'Color'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: [],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет комплектации',
                        description: [],
                        type: 'common'
                    },
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
            },
        ],

        // --- WALL ---
        // ROLL
        rolo4: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    },

                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['ControlDevice', 'ControlSide'],
                components: [
                    {
                        name: 'Controls',
                        title: 'Управление',
                        description: ['Выберите сторону расположения цепи управления – справа или слева'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'MaterialCalc', 'rol_width'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
            },
        ],

        // CLIC NEW
        rolo30: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['ControlDevice', 'ControlSide'],
                components: [
                    {
                        name: 'Controls',
                        title: 'Управление',
                        description: ['Выберите способ управления изделием – цепь / шнур (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ (работа электропривода возможна от аккумулятора или от сети)'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'MaterialCalc'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
            },
        ],

        // GRANDE
        rolo6: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
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
                        description: ['Выберите способ управления изделием – цепь / шнур (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ (работа электропривода возможна от аккумулятора или от сети)'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'MaterialCalc', 'rol_width'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
            },
        ],

        // CLIC BOX
        rolo31: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['ControlDevice', 'ControlSide'],
                components: [
                    {
                        name: 'Controls',
                        title: 'Управление',
                        description: ['Выберите сторону расположения цепи управления – справа или слева'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'MaterialCalc', 'Color'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: [],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет комплектации',
                        description: [],
                        type: 'common'
                    },
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
            },
        ],

        // GRANDE BOX
        rolo24: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
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
                        description: ['Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ (работа электропривода возможна от аккумулятора или от сети)'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'MaterialCalc', 'rol_width'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
            },
        ],


        // <-- DUO -->
        // --- FLAP ---
        // INTEGRA SLIM DUO
        zebra21: [
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
                        description: ['Системы рулонных штор DUO могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    },
                    // {
                    //     name: 'FlapsCount',
                    //     title: 'Количество створок',
                    //     description: ['Выберите на какое количество створок Вам необходимо заказать изделия'],
                    //     type: 'common'
                    // }
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
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    },
                    {
                        name: 'MountType',
                        title: 'Тип крепления',
                        description: ['Выберите предпочтительный вариант крепления изделия на створку'],
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
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла с учетом уплотнительных резинок.']
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
                        description: ['Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ.'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'rol_width'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: ['Выберите ткань для рулонных штор. Материал различается по степени светопропускания, где blackout – это ткани, полностью не пропускающие свет. Материал также можно отсортировать по цвету или по ценовой категории, где 0 – самые недорогие ткани.'],
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
            },
        ],

        // integra box duo
        zebra22: [
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
                        description: ['Системы рулонных штор DUO могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    },
                    // {
                    //     name: 'FlapsCount',
                    //     title: 'Количество створок',
                    //     description: ['Выберите на какое количество створок Вам необходимо заказать изделия'],
                    //     type: 'common'
                    // }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
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
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла с учетом уплотнительных резинок.']
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
                        description: ['Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ.'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'rol_width', 'Color'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: ['Выберите ткань для рулонных штор. Материал различается по степени светопропускания, где blackout – это ткани, полностью не пропускающие свет. Материал также можно отсортировать по цвету или по ценовой категории, где 0 – самые недорогие ткани.'],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет комплектации',
                        description: [],
                        type: 'common'
                    },
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
        ],

        // --- WALL ---
        // clic duo
        zebra32: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['ControlDevice', 'ControlSide'],
                components: [
                    {
                        name: 'Controls',
                        title: 'Управление',
                        description: ['Выберите сторону расположения шнура управления – справа или слева.'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
        ],

        // clic box duo
        zebra33: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['ControlDevice', 'ControlSide'],
                components: [
                    {
                        name: 'Controls',
                        title: 'Управление',
                        description: ['Выберите сторону расположения шнура управления – справа или слева.'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'Color'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: [],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет комплектации',
                        description: [],
                        type: 'common'
                    },
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
            },
        ],

        // grande box duo
        zebra23: [
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
                        description: ['Системы рулонных штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['HasBox'],
                components: [
                    {
                        name: 'Box',
                        title: 'Наличие короба',
                        description: ['Декоративный короб дополнительно защищает ткань и механизм управления рулонной шторы от попадания пыли, грязи и посторонних предметов'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Наличие короба / Тип крепления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.']
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
                        description: ['Выберите способ управления изделием – цепочный (сторона расположения может быть справа или слева) или дистанционный с помощью пульта ДУ (работа электропривода возможна от аккумулятора или от сети).'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['material', 'rol_width'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
            },
        ],


        // <-- HBLINDS -->
        // --- FLAP ---
        ks251: [
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
                        description: [],
                        type: 'common'
                    },
                    // {
                    //     name: 'FlapsCount',
                    //     title: 'Количество створок',
                    //     description: ['Выберите на какое количество створок Вам необходимо заказать изделия'],
                    //     type: 'common'
                    // }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['ControlSide'],
                components: [
                    {
                        name: 'ControlSide',
                        title: 'Сторона управления',
                        description: ['Выберите предпочтительную сторону расположения цепи управления – справа или слева'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['sizes'],
                // params: ['width', 'height'],
                // fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер производится с точностью до 1 мм. Измерьте ширину и высоту стекла с учетом уплотнительных резинок.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['material', 'Color'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
                        description: [],
                        type: 'common'
                    },
                    {
                        name: 'Color',
                        title: 'Цвет комплектации',
                        description: [],
                        type: 'common'
                    },
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
        ],

        // --- WALL ---
        hblinds1: [
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
                        description: [],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Место установки',
                inCheck: true
            },
            {
                params: ['MountType'],
                components: [
                    {
                        name: 'MountType',
                        title: 'Тип крепления',
                        description: [],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Тип крепления',
                inCheck: true
            },
            {
                params: ['ControlSide'],
                components: [
                    {
                        name: 'ControlSide',
                        title: 'Сторона управления',
                        description: ['Выберите предпочтительную сторону расположения цепи и стержня управления – справа или слева'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Управление',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['material'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
        ],
        hblinds3: [
        {
          params: ['name'],
          inPaginator: false,
          inCheck: true,
        },
        {
          params: ['InstallPlace'],
          components: [
            {
              name: 'AttachmentPoint',
              title: 'Место установки',
              description: [],
              type: 'common',
            },
          ],
          inPaginator: true,
          tooltip: 'Место установки',
          inCheck: true,
        },
        {
          params: ['ControlType', 'controlPanel', 'MountType'],
          components: [
            {
              name: 'ControlType',
              title: 'Тип управления',
              description: [],
              type: 'common',

            },
            {
              name: 'controlPanel',
              title: 'Вариант управления',
              description: [],
              type: 'common',
            },
            {
              name: 'MountType',
              title: 'Тип крепления',
              description: [],
              type: 'common',
            },
          ],
          inPaginator: true,
          tooltip: 'Управление',
          inCheck: true,
        },
        {
          params: ['ControlSide'],
          components: [
            {
              name: 'ControlSide',
              title: 'Сторона управления',
              description: [
                'Выберите предпочтительную сторону расположения цепи и стержня управления – справа или слева',
              ],
              type: 'common',
            }
          ],
          inPaginator: true,
          tooltip: 'Сторона управления',
          inCheck: true,
        },
        {
          params: ['width', 'height'],
          fullInfoParams: [
            'width',
            'height',
            'gab_width',
            'gab_height',
            'ControlHeight',
          ],
          components: [
            {
              name: 'Sizes',
              title: 'Размеры',
              description: [
                'Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.',
              ],
              type: 'common',
            },
          ],
          inPaginator: true,
          tooltip: 'Размеры',
          inCheck: true,
        },
        {
          params: ['material'],
          components: [
            {
              name: 'Materials',
              title: 'Материал',
              description: [],
              type: 'common',
            },
          ],
          inPaginator: true,
          tooltip: 'Материалы',
          actionLabel: true,
          inCheck: true,
        },
        {
          components: [
            {
              name: 'SystemInfo',
              title: '',
              description: [],
              type: 'common',
            },
            {
              name: 'OrderConfirm',
              title: '',
              description: [],
              type: 'common',
            },
            {
              name: 'SystemAdvantages',
              title: '',
              description: [],
              type: 'common',
            },
          ],
          params: [],
          inPaginator: true,
          tooltip: 'Подтверждение заказа',
          inCheck: false,
        },
      ],


        // <-- VBLINDS -->
        // plastic
        vblinds2: [
            {
                params: ['name'],
                inPaginator: false,
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'LamellaMaterial',
                        title: 'Материал ламелей',
                        description: ['Выберите предпочтительный материал ламелей']
                    }
                ],
                params: ['LamelsMaterial'],
                inPaginator: true,
                tooltip: 'Материал ламелей',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'AttachmentPoint',
                        title: 'Точка крепления',
                        description: ['Выберите предпочтительный вариант крепления вертикальных жалюзи'],
                    }
                ],
                params: ['MountPoint', 'MountType'],
                inPaginator: true,
                tooltip: 'Способ крепления',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'ControlSide',
                        title: 'Тип раздвижки ламелей',
                        description: [],
                        type: 'common'
                    }
                ],
                params: ['ControlSide'],
                inPaginator: true,
                tooltip: 'Тип раздвижки ламелей',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: [],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['material'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
        ],

        // fabric
        vblinds1: [
            {
                params: ['name'],
                inPaginator: false,
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'LamellaMaterial',
                        title: 'Материал ламелей',
                        description: ['Выберите предпочтительный материал ламелей']
                    }
                ],
                params: ['LamelsMaterial'],
                inPaginator: true,
                tooltip: 'Материал ламелей',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'AttachmentPoint',
                        title: 'Точка крепления',
                        description: ['Выберите предпочтительный вариант крепления вертикальных жалюзи'],
                    }
                ],
                params: ['MountPoint', 'MountType'],
                inPaginator: true,
                tooltip: 'Способ крепления',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'ControlSide',
                        title: 'Тип раздвижки ламелей',
                        description: [],
                        type: 'common'

                    }
                ],
                params: ['ControlSide'],
                inPaginator: true,
                tooltip: 'Тип раздвижки ламелей',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['material'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
        ],


        // <-- ROMA -->
        // --- WALL ---
        roma1: [
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
                  description: ['Системы римских штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
                  type: 'common'
                }
              ],
              inPaginator: true,
              tooltip: 'Место установки',
              inCheck: true
            },
            {
                components: [
                    {
                        name: 'AttachmentPoint',
                        title: 'Точка крепления',
                        description: ['Выберите предпочтительный вариант крепления римских штор. При креплении на стену выберите необходимый размер кронштейна для выноса изделия от стены.'],
                        // type: 'common'
                    }
                ],
                params: ['MountPoint', 'MountType'],
                inPaginator: true,
                tooltip: 'Точка крепления',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'ControlSide',
                        title: 'Сторона управления',
                        description: ['Выберите сторону расположения цепи управления – справа или слева'],
                        type: 'common'
                    }
                ],
                params: ['ControlSide'],
                inPaginator: true,
                tooltip: 'Сторона управления',
                inCheck: true
            },
            {
                params: ['width', 'height'],
                fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
                components: [
                    {
                        name: 'Sizes',
                        title: 'Размеры',
                        description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.'],
                        type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['material'],
                components: [
                    {
                        name: 'Materials',
                        title: 'Материал',
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
            },
        ],

        // --- FLAP ---
        introma1: [
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
              description: ['Системы римских штор могут устанавливаться на створку окна, образуя с ним единую конструкцию, или на стену/потолок, перекрывая оконный проем целиком.'],
              type: 'common'
            }
          ],
          inPaginator: true,
          tooltip: 'Место установки',
          inCheck: true
        },
        {
          components: [
            {
              name: 'MountType',
              title: 'Точка крепления',
              description: ['Выберите предпочтительный вариант крепления римских штор. При креплении на стену выберите необходимый размер кронштейна для выноса изделия от стены.'],
              type: 'common'
            }
          ],
          params: ['MountType'],
          inPaginator: true,
          tooltip: 'Точка крепления',
          inCheck: true
        },
        {
          components: [
            {
              name: 'ControlSide',
              title: 'Сторона управления',
              description: ['Выберите сторону расположения шнура управления – справа или слева'],
              type: 'common'
            }
          ],
          params: ['ControlSide'],
          inPaginator: true,
          tooltip: 'Сторона управления',
          inCheck: true
        },
        {
          params: ['width', 'height'],
          fullInfoParams: ['width', 'height', 'gab_width', 'gab_height', 'ControlHeight'],
          components: [
            {
              name: 'Sizes',
              title: 'Размеры',
              description: ['Замер ширины предполагаемого места размещения изделия производится с точностью до 1 см.'],
              type: 'common'
            }
          ],
          inPaginator: true,
          tooltip: 'Размеры',
          inCheck: true
        },
        {
          params: ['material'],
          components: [
            {
              name: 'Materials',
              title: 'Материал',
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
        },
      ],
      karniz11: [
        {
          params: [],
          inPaginator: false,
          inCheck: true
        },
        {
            // Шаг выбора формы карниза и количества рядов
            components: [
              {
                name: 'ArchType',
                title: 'Форма карниза',
                description: ['Выберите предпочтительную форму карниза.']
              }
            ],
            params: [ 'NumberOfRows'], // параметры из API: ArchType и NumberOfRows
            inPaginator: true,
            tooltip: 'Форма карниза и количество рядов',
            inCheck: true
          },
        {
            components: [
                {
                    name: 'Name',
                    title: 'Изделие',
                    description: ['Выберите Изделие'],
                    //type: 'common'
                }
            ],
            params: ['group1','name'], // параметры указываемые в чеке конструктора
            inPaginator: true,
            tooltip: 'Тип карниза',
            inCheck: true
        },
        {
            params: ['ControlSide','ControlType','Drive','MountPoint','MountTypeAmount','amount','controlPanel','cost_width','enabled','gab_width','material','price','sale_price','subtype','type','warranty','width'], //  изменил

            components: [
                {
                    name: 'SizesLong',
                    title: 'Размер карниза',
                    description: ['Укажите размер карниза'],
                }
            ],
            inPaginator: true,
            tooltip: 'Размеры',
            inCheck: true
        },

        {
            params: ['MountPoint', 'MountType', 'MountTypeAmount', 'EndBracketAmount'],
            components: [
                {
                    name: 'MountPoint',
                    title: 'Точка крепления',
                    description: ['Выберите предпочтительный вариант крепления. При креплении на стену выберите необходимый размер кронштейна для выноса изделия от стены.'],
                    //type: 'common'
                }
            ],
            inPaginator: true,
            tooltip: 'Крепление карниза',
            inCheck: true
        },

                  // Новый шаг между 3 и 4
        {
            params: ['ControlSide', 'ControlType'],
            components: [
                {
                    name: 'AddiType',
                    title: 'Дополнительные настройки',
                    description: ['Выберите дополнительные параметры, если необходимо.'],
                  }
                ],
                inPaginator: true,
                tooltip: 'Дополнительные настройки',
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
                    name: 'OrderConfirmKarniz',
                    title: '',
                    description: [],
                    type: 'common'
                }
            ],
            params: [],
            inPaginator: true,
            tooltip: 'Подтверждение заказа',
            inCheck: false
        },
      ],


        karniz10: [  //I-Профиль
            {
                params: [],
                inPaginator: false,
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'ArchType',// исправить
                        title: 'Форма карниза',
                        description: ['Выберите предпочтительную форму карниза.'],//
                        // type: 'common'
                    }
                ],
                params: ['NumberOfRows'], // параметры указываемые в чеке конструктора
                inPaginator: true,
                tooltip: 'Форма карниза и количество рядов',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'Name',
                        title: 'Изделие',
                        description: ['Выберите изделие'],
                        //type: 'common'
                    }
                ],
                params: ['group1','name'], // параметры указываемые в чеке конструктора
                inPaginator: true,
                tooltip: 'Тип карниза',
                inCheck: true
            },
            {
                params: ['width', 'CutHalf','Deflection','AnglesCount','Segment1','Angle1','Segment2', 'Angle2','Segment3','ConnectorUniAmount', 'ConnectorCornerAmount'],
                components: [
                    {
                        name: 'SizesLong',
                        title: 'Размер карниза',
                        description: ['Укажите размер карниза'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            {
                params: ['MountPoint', 'MountType', 'MountTypeAmount', 'EndBracketAmount'],
                components: [
                    {
                        name: 'MountPoint',
                        title: 'Точка крепления',
                        description: ['Выберите предпочтительный вариант крепления. При креплении на стену выберите необходимый размер кронштейна для выноса изделия от стены.'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Крепление карниза',
                inCheck: true
            },

           // Новый шаг между 3 и 4
        {
        name: 'AddiType',
        title: 'Дополнительные настройки',
        description: ['Выберите дополнительные параметры, если необходимо.'],
        type: 'extra',
        components: [
            {
            name: 'ControlSide',
            title: 'Сторона управления',
            values: [
                {
                param: 'left',
                title: 'Левая сторона',
                img: '/_images/constructor/AddiType/karniz-11-left.jpg'
                },
                {
                param: 'right',
                title: 'Правая сторона',
                img: '/_images/constructor/AddiType/karniz-11-right.jpg'
                }
            ]
            },
            {
            name: 'ControlType',
            title: 'Тип управления',
            values: [
                {
                param: 'manual',
                title: 'Ручное управление',
                img: '/_images/constructor/AddiType/karniz-11-manual.webp'
                },
                {
                param: 'ControlType',
                title: 'Электрическое управление',
                img: '/_images/constructor/AddiType/karniz-11-electric.webp'
                }
            ]
            }
        ],
            inPaginator: true,
            tooltip: 'Дополнительные настройки',
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
                        name: 'OrderConfirmKarniz',
                        title: '',
                        description: [],
                        type: 'common'
                    }
                ],
                params: [],
                inPaginator: true,
                tooltip: 'Подтверждение заказа',
                inCheck: false
            },
        ],

        karniz2: [  //Слип
            {
                params: [],
                inPaginator: false,
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'ArchType',// исправить
                        title: 'Форма карниза',
                        description: ['Выберите предпочтительную форму карниза.'],//
                        // type: 'common'
                    }
                ],
                params: ['NumberOfRows'], // параметры указываемые в чеке конструктора
                inPaginator: true,
                tooltip: 'Форма карниза и количество рядов',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'Name',
                        title: 'Изделие',
                        description: ['Выберите Изделие'],
                        //type: 'common'
                    }
                ],
                params: ['group1','name'], // параметры указываемые в чеке конструктора
                inPaginator: true,
                tooltip: 'Тип карниза',
                inCheck: true
            },
            {
                params: ['width', 'CutHalf','Deflection','AnglesCount','Segment1','Angle1','Segment2', 'Angle2','Segment3','ConnectorUniAmount', 'ConnectorCornerAmount'],
                components: [
                    {
                        name: 'SizesLong',
                        title: 'Размер карниза',
                        description: ['Укажите размер карниза'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },

            {
                params: ['MountPoint', 'MountType', 'MountTypeAmount', 'EndBracketAmount'],
                components: [
                    {
                        name: 'MountPoint',
                        title: 'Точка крепления',
                        description: ['Выберите предпочтительный вариант крепления. При креплении на стену выберите необходимый размер кронштейна для выноса изделия от стены.'],
                        //type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Крепление карниза',
                inCheck: true
            },

            {
                components: [
                    {
                        name: 'AddiType',
                        title: 'Дополнительные настройки',
                        description: ['Выберите дополнительные параметры, если необходимо.'],
                        type: 'extra',
                        params: ['ControlSide', 'ControlType'] // ✅ сюда
                      }
                    ],
                    params: ['ControlSide', 'ControlType'], // ✅ и сюда, для обратной совместимости
                    inPaginator: true,
                    tooltip: 'Дополнительные настройки',
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
                        name: 'OrderConfirmKarniz',
                        title: '',
                        description: [],
                        type: 'common'
                    }
                ],
                params: [],
                inPaginator: true,
                tooltip: 'Подтверждение заказа',
                inCheck: false
            },
        ],

        karniz3: [  //Универсал
            {
                params: [],
                inPaginator: false,
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'ArchType',
                        title: 'Форма карниза',
                        description: ['Выберите предпочтительную форму карниза.'],
                        // type: 'common'
                    }
                ],
                params: ['NumberOfRows'], // параметры указываемые в чеке конструктора
                inPaginator: true,
                tooltip: 'Форма карниза и количество рядов',
                inCheck: true
            },
            {
                components: [
                    {
                        name: 'Name',
                        title: 'Изделие',
                        description: ['Выберите изделие'],
                        //type: 'common'
                    }
                ],
                params: ['group1','name'], // параметры указываемые в чеке конструктора
                inPaginator: true,
                tooltip: 'Тип карниза',
                inCheck: true
            },

            {
                params: ['width', 'CutHalf','Deflection','AnglesCount','Segment1','Angle1','Segment2', 'Angle2','Segment3','ConnectorUniAmount', 'ConnectorCornerAmount'],
                components: [
                    {
                        name: 'SizesLong',
                        title: 'Размер карниза',
                        description: ['Укажите размер карниза'],
                    }
                ],
                inPaginator: true,
                tooltip: 'Размеры',
                inCheck: true
            },
            // {
            //     name: 'AddiType',
            //     title: 'Дополнительные настройки',
            //     description: ['Выберите дополнительные параметры, если необходимо.'],
            //     type: 'extra',
            //     options: [
            //         {
            //         name: 'ControlSide',
            //         title: 'Сторона управления',
            //         values: [
            //             {
            //             param: 'left',
            //             title: 'Левая сторона',
            //             img: '/_images/constructor/AddiType/karniz-11-left.jpg'
            //             },
            //             {
            //             param: 'right',
            //             title: 'Правая сторона',
            //             img: '/_images/constructor/AddiType/karniz-11-right.jpg'
            //             }
            //         ]
            //         },
            //         {
            //         name: 'ControlType',
            //         title: 'Тип управления',
            //         values: [
            //             {
            //             param: 'manual',
            //             title: 'Ручное управление',
            //             img: '/_images/constructor/AddiType/karniz-11-manual.webp'
            //             },
            //             {
            //             param: 'electric',
            //             title: 'Электрическое управление',
            //             img: '/_images/constructor/AddiType/karniz-11-electric.webp'
            //             }
            //         ]
            //         }
            //     ]
            //     },

            {
                params: ['MountPoint', 'MountType', 'MountTypeAmount', 'EndBracketAmount'],
                components: [
                    {
                        name: 'MountPoint',
                        title: 'Точка крепления',
                        description: ['Выберите предпочтительный вариант крепления. При креплении на стену выберите необходимый размер кронштейна для выноса изделия от стены.'],
                        //type: 'common'
                    }
                ],
                inPaginator: true,
                tooltip: 'Крепление карниза',
                inCheck: true
            },

            {
                components: [
                    {
                        name: 'AddiType',
                        title: 'Дополнительные настройки',
                        description: ['Выберите дополнительные параметры, если необходимо.'],
                        type: 'extra',
                        params: ['ControlSide', 'ControlType'] // ✅ сюда
                      }
                    ],
                    params: ['ControlSide', 'ControlType'], // ✅ и сюда, для обратной совместимости
                    inPaginator: true,
                    tooltip: 'Дополнительные настройки',
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
                        name: 'OrderConfirmKarniz',
                        title: '',
                        description: [],
                        type: 'common'
                    }
                ],
                params: [],
                inPaginator: true,
                tooltip: 'Подтверждение заказа',
                inCheck: false
            },
        ],



        // karniz1: [  //Круглый карниз
        //     {
        //         params: [],
        //         inPaginator: false,
        //         inCheck: true
        //     },
        //     {
        //         components: [
        //             {
        //                 name: '1_MountPoint',
        //                 title: 'Количество рядов',
        //                 description: ['На этом шаге указывается количество рядов. Для заказа 3-х рядов вам необходимо обратиться к официальным Представителям бренда'],
        //                 // type: 'common'
        //             }
        //         ],
        //         params: ['MountPoint'], // параметры указываемые в чеке конструктора
        //         inPaginator: true,
        //         tooltip: 'Количество рядов',
        //         inCheck: true
        //     },
        //     {
        //         components: [
        //             {
        //                 name: '1_size',
        //                 title: 'Диаметр',
        //                 description: ['Диаметр трубы это 2 радиуса. Размер указан в мм.'],
        //                 // type: 'common'
        //             }
        //         ],
        //         params: ['karn_tube1_diameter', 'karn_tube2_diameter', 'width', 'karn_tube1_type', 'karn_tube2_type', 'karn_bracket_type', 'karn_bracket_amount'], // параметры указываемые в чеке конструктора
        //         inPaginator: true,
        //         tooltip: 'Диаметр, длина, цвет и тип трубы',
        //         inCheck: true
        //     },
        //     {
        //         components: [
        //             {
        //                 name: '1_tip',
        //                 title: 'Наконечник',
        //                 description: [''],
        //                 // type: 'common'
        //             }
        //         ],
        //         params: ['karn_tip1_type','karn_tip2_type'], // параметры указываемые в чеке конструктора
        //         inPaginator: true,
        //         tooltip: 'Форма и цвет наконечника',
        //         inCheck: true
        //     },

        //     {
        //         components: [
        //             {
        //                 name: '1_ring',
        //                 title: 'Кольца и крючки',
        //                 description: [''],
        //                 // type: 'common'
        //             }
        //         ],
        //         params: ['karn_ring1_type','karn_ring1_amount','karn_ring2_type','karn_ring2_amount', 'karn_hook_amount'], // параметры указываемые в чеке конструктора
        //         inPaginator: true,
        //         tooltip: 'Форма и цвет Колец и крючков',
        //         inCheck: true
        //     },

        //     {
        //         components: [
        //             {
        //                 name: 'SystemInfo',
        //                 title: '',
        //                 description: [],
        //                 type: 'common'
        //             },
        //             {
        //                 name: 'OrderConfirmKarniz',
        //                 title: '',
        //                 description: [],
        //                 type: 'common'
        //             },
        //             {
        //                 name: 'ForgottenKarniz',
        //                 title: '',
        //                 description: [],
        //                 type: 'common'
        //             }
        //         ],
        //         params: [],
        //         inPaginator: true,
        //         tooltip: 'Подтверждение заказа',
        //         inCheck: false
        //     },
        // ]
    }
})

export const actions = {
    setStep({commit}, payload) {
        commit('setStep', payload)
    },
}

export const mutations = {
    setStep: function (state, payload) {
        state.step = payload
    }
}

export const getters = {
    step: s => s.step,
    stepsMap: s => s.stepsMap
}

