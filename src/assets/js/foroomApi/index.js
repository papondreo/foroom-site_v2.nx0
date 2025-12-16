import ClassCalc from './main/ClassCalc.js';


import makePost from './main/makePost.js';

import ClassItem from './main/CalcControls/ClassItem.js';
import ClassItems from './main/CalcControls/ClassItems.js';
import ClassParam from './main/CalcControls/ClassParam.js';
import ClassParamDimention from './main/CalcControls/ClassParamDimention.js';
//import ClassParamDimentionCost from './main/CalcControls/ClassParamDimentionCost.js';
import ClassParamDimentionGab from './main/CalcControls/ClassParamDimentionGab.js';
import ClassParamLabel from './main/CalcControls/ClassParamLabel.js';
import ClassParamMaterial from './main/CalcControls/ClassParamMaterial.js';
import ClassParamWholesaleMaterial from './main/CalcControls/ClassParamWholesaleMaterial.js';
import ClassParamKarnizMaterial from './main/CalcControls/ClassParamKarnizMaterial.js';
import ClassParamSelect from './main/CalcControls/ClassParamSelect.js';
import ClassParamText from './main/CalcControls/ClassParamText.js';
import ClassLamelsCalculator from './main/CalcControls/ClassLamelsCalculator.js';
import ClassParamLamels from './main/CalcControls/ClassParamLamels.js';
import ClassParamKarniz from './main/CalcControls/ClassParamKarniz.js';
import loadScriptAsync from './main/loadScriptAsync.js';

//import ServiceClass from './main/ServiceClass.js';
// import LoadShopClass from "./add/loadShopClass";
//import './main/helpers.js';

//CM_ARRAY - МАССИВ С АЛИАСАМИ, КОТОРЫЕ АВТОМАТОМ ПЕРЕКЛЮЧАЕТ В САНТИМЕТРЫ

let foroomApi = {
    params: {
        version: 40025,
        app_type: 'core',
        url: 'http://api.foroom.ru/',
        uploads_url: 'http://api.foroom.ru/uploads/download/zip/',
        cm_array: ['gab_width', 'gab_height', 'cost_width', 'cost_height', 'width', 'height', 'rol_width', 'ControlHeight', 'ignore_ControlHeight_1', 'ignore_ControlHeight_2', 'DownPlumb', 'InsertSize', 'Segment1', 'Segment2', 'Segment3', 'Segment4', 'Segment5', 'Segment6', 'Segment7', 'Deflection', 'LambrBokSize', 'height2', 'height3', 'width2', 'lamels', 'PieceLength', 'lambrekenMaterial'],
        currency_array: ['salePrice', 'price', 'old_summ', 'summ', 'old_price'],
        foroom_pics_url: '//foroom.ru/img/',
        key: 'W5pRNSx8Dx3tGY65xx3BOgAAAAE',
        session: null,
        init_data: null,
        storage_name: 'sfr_api_v2',
        account: null,
        H: null,
        console_mode: false,
        nodejs_mode: false,
        correct_template: true,
        setRecommended: false, // auto setting param with recommended settings (only for FOROOM)
        destination: 'api',
        hostname: 'www.foroom.ru',
        debug: false,
        fold: 'sfr',
        // zip_name: 'data.zip',c
        zip_name: 'data_v4.zip',
        fullUrl: '',
        promo: '',
        dev_mode: false,

    },
    wholesaleActions: null,
    ClassItems: ClassItems,
    //ServiceClass : ServiceClass,
    ClassCalc: ClassCalc,
    loadZip: false, //loadZip,
    loadScriptAsync: loadScriptAsync,
    makePost: makePost,
    ClassItem: ClassItem,
    ClassParam: ClassParam,
    ParamDimention: ClassParamDimention,
    //ParamDimentionCost : ClassParamDimentionCost,
    ParamDimentionGab: ClassParamDimentionGab,
    ParamLabel: ClassParamLabel,
    ParamMaterial: ClassParamMaterial,
    ParamWholesaleMaterial: ClassParamWholesaleMaterial,
    ParamKarnizMaterial: ClassParamKarnizMaterial,
    ParamSelect: ClassParamSelect,
    ParamText: ClassParamText,
    LamelsCalculator: ClassLamelsCalculator,
    ParamLamels: ClassParamLamels,
    ParamKarniz: ClassParamKarniz,
    // LoadShopClass : LoadShopClass,
    clone: function(obj) {
        let newObj = (obj instanceof Array) ? [] : {};
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (i === 'clone') continue;
                if (obj[i] && typeof obj[i] === "object") {
                    newObj[i] = this.clone(obj[i]);
                } else {
                    newObj[i] = obj[i];
                }
            }
        }
        return newObj;
    },
    isEmptyObject: function(obj) {
        if (obj)
            return Object.entries(obj).length === 0 && obj.constructor === Object;
        return true;
    },
    array_unique: function(ar) {
        var unique = [];
        for (var i = 0; i < ar.length; i++)
            if (unique.indexOf(ar[i]) == -1)
                unique.push(ar[i]);
        return unique;
    },
    load_data: function(cb) {
        let self = this;
        if (!self.params.nodejs_mode) {
            if (!self.loadZip) {
                this.loadScriptAsync(self.params.fullUrl + 'loadZip.min.js').then(() => {
                    if (typeof loadZip !== "undefined" && loadZip != null) {
                        self.loadZip = loadZip.default;
                        self.load(cb);
                    }
                });
            } else self.load(cb);
        } else {

            console.log('No Data loaded');

        }
    },
    load: function(cb) {
        let self = this;
        self.loadZip(self.params.uploads_url + self.params.zip_name, function(json) {
            // console.log('API Unzipped',self.params.zip_name,json);
            self.params.init_data = json;
            if (self.params.init_data && self.params.account) {
                self.params.calc.json_data = self.params.init_data;
                self.params.calc.personal_info = self.params.account;
                //if (!self.params.console_mode) console.log('API Loaded');
                if (cb) cb(self.params.calc, self.params.init_data);
            }
        }, function(name) {});
    },
    init_calc: function(cb) {
        let self = this;
        if (self.params.init_data && self.params.account) {
            self.params.calc.json_data = self.params.init_data;
            self.params.calc.personal_info = self.params.account;
            self.params.calc.init(function() {
                if (cb) cb(self.params.calc);
            });
        } else
            this.load_data(function(calc) {
                calc.init(function(calc) { if (cb) cb(calc); });
            });
    },
    init: function(params = null) {
        if (!this.params.calc) {
            if (params) {
                for (let key in params) {
                    if (params.hasOwnProperty(key))
                        this.params[key] = params[key];
                }
            }

             //console.log('fullUrl',this.params.fullUrl);
            //setRecommended

            if (this.params.destination === 'fr' && (!params || !params.setRecommended)) {
                this.params.setRecommended = true;
            }

            if (!this.params.console_mode && !this.params.nodejs_mode) console.log('foroomApi v.' + this.params.version);

            if ((this.params.hostname.search('orig') > -1) || (this.params.hostname.search('cache') > -1)) {
                this.params.debug = true;
            }
            if (this.params.debug && !this.params.console_mode) console.log('foroomApi:DEBUG(' + this.params.hostname + ')');
            //self.params.H = new ServiceClass(self.params.storage_name);
            this.params.calc = new ClassCalc(this);
            if (this.params.debug) {
                //this.params.zip_name = 'data_debug.zip';
            }
            // console.log(this.params.calc);
            // let cartItems = localStorage.getItem('sfr_api_v2.order_items');
            // cartItems = JSON.parse(cartItems);
            // console.log(cartItems);
            // this.check_wholesale(cartItems);

        }
    },
    // getWholesaleParent: function(id) {
    //     let wholesaleParents;
    //     if (this && this.params.init_data.action_wholesale_parents) {
    //         wholesaleParents = this.params.init_data.action_wholesale_parents
    //     } else {
    //         return 0;
    //     }
    //     const parent = Object.values(wholesaleParents).find(item => item.parent == id);
    //     if (parent) {
    //         return parent.id;
    //     } else {
    //         return 0;
    //     }
    // },


    check_wholesale: function(cartArr) {
        if (cartArr && cartArr.length) {
            this.wholesaleCart = cartArr;
            const ordersMaterials = [];
            for (let item of cartArr) {
                const doubleElem = ordersMaterials.find((i) => i.mat_ids_json == item.material);
                if (!doubleElem) {
                    ordersMaterials.push({
                        izd_types_json: item.type + item.subtype,
                        mat_ids_json: item.material,
                        quan: item.amount
                    });
                } else {
                    doubleElem.quan += item.amount;
                }
            }

            const wholesaleArr = this.params.init_data.action_wholesale;

            let actionsArr = [];


            if (wholesaleArr) {
                let cartCounter = 0;
                cartArr.map(item => {
                    cartCounter += item.amount;
                });
                if (ordersMaterials.length) {
                    for (let item of ordersMaterials) {
                        const actItem = Object.values(wholesaleArr).find(i => i.mat_ids_json.includes(item.mat_ids_json) &&
                            i.izd_types_json.includes(item.izd_types_json) &&
                            item.quan >= Number(i.quan)
                        );
                        if (actItem) {
                            actionsArr.push(actItem);
                            break;
                        }
                    }
                }

            }
            this.wholesaleActions = actionsArr;
            if (typeof window !== 'undefined') {
                window.wholesaleActions = actionsArr;
            }
        }
    },
    initPath: function() {
        if (typeof document !== "undefined") {
            let scripts = document.getElementsByTagName('script');
            let path = scripts[scripts.length - 1].src.split('?')[0];
            this.params.fullUrl = path.split('/').slice(0, -1).join('/') + '/';
        }
    },
    md5: function(d = '') {
        return this.params.calc.md5(d);
    }
};
foroomApi.initPath();

//var foroomApi = window.foroomApi;

export default foroomApi;