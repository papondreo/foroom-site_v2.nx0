let ClassItem = function(o, calcClass) {
    this.foroomApi = calcClass.foroomApi;
    this.calcClass = calcClass;
    this.calc = null;
    this.o = null;
    this.template = null;
    this.initial_template = null;
    this.correct_template = false;
    this.console_mode = false;
    this.setRecommended = false;
    this.gab_plus = true; // если false, то ограничения на габаритку, если true, то ограничения на замер
    this.type = null;
    this.subtype = null;
    this.conditions = null;
    this.deltas = null;
    this.discount = null;
    this.id = null;
    this.materials = null;
    this.name = null;
    this.options = null;
    this.params = null;
    this.strings = null;
    this.tid = null;
    this.input_size_mode = 0;
    this.isAction = null;
    this.arr = {};
    this.oParams = {};
    this.oParamsDom = {};
    this.materialRest = {
        red: 0,
        yellow: 0,
    };
    this.filters_map = {};
    this.filter = '';
    this.warranty = {
        width: true,
        height: true
    };
    this.materialsSortArray = [];
    this.cm_array = []; //this.o.cm_array;
    this.currency_array = [];
    this.currency_rate = 1;

    this.images = null;
    this.icon = '/static/logo_ball_frame.jpg';
    this.image = null;
    this.prv = null;

    this.previewPics = {};


    this.pics = {}; // this.o.pics;
    this.mat_name = 'Нет';
    this.limits = {};
    this.errors = [];
    this.error = false;
    this.erDescriptions = {};

    this.error_description = '';
    this.timer = null;
    this.timeout = 100; //ms
    this.all_actions = [];
    this.calc_all_actions = {};
    this.price = 0;
    this.sale_price = 0;
    this.salePrice = 0;
    this.old_price = null;
    this.perc = null;
    this.summ = 0;
    this.old_summ = null;
    this.callbacks = {};

    this.structure = null;
    this.max_dimentions = null;
    this.min_dimentions = null;

    this.recommend_dimentions = null;

    this.costtype = 0;

    this.previewParams = null;
    this.promo = '';
    this.promo_all = [];
    this.calc_all_promo = {};

    //material.costtype = parseInt(this.options.CostType);


    this.filterCalcMaterials = function() {


        let oW = null;
        let oH = null;
        let oM = null;
        if (this.oParams) {
            if (this.oParams.width && this.oParams.height && this.oParams.material) {
                //if (this.oParams.width.gab) oW = this.oParams.width.gab; else
                oW = this.oParams.width.value;
                //	if (this.oParams.height.gab) oH = this.oParams.height.gab; else
                oH = this.oParams.height.value;
                oM = this.oParams.material;
            }
        }

      


        if (oW && oH && oM) {
        
            for (let key in this.materials) {
                if (this.materials.hasOwnProperty(key)) {
                    if (this.materials[key].enabled) {
                        /**
                         * @param {{value:int}} oW
                         * @param {{value:int}} hW
                         */


                        this.materials[key] = this.setFilterCalcItem(this.materials[key], oW, oH);

               }
                }
            }
        }

    
    };
    this.setFilterCalcItem = function(item, w, h) {
        
        function calcRev_1(item, app) {
            let material = {
                gab: { width: 0, height: 0 },
                cost: { width: 0, height: 0 },
                min: { width: 0, height: 0 },
                max: { width: 0, height: 0 },
                warranty: { width: 0, height: 0 },
            };

            material.gab.width = parseFloat(app.options.GabWidth);
            material.gab.height = parseFloat(app.options.GabHeight);
            material.cost.width = parseFloat(app.options.CostWidth);
            material.cost.height = parseFloat(app.options.CostHeight);
            material.min.width = parseFloat(item.minWidth);
            material.min.height = parseFloat(item.minHeight);
            material.max.width = parseFloat(item.maxWidth);
            material.max.height = parseFloat(item.maxHeight);
            let rol_w = parseFloat(item.rol_width_width);
            if (rol_w > 0)
                material.warranty.height = Math.min(rol_w, parseInt(app.options.WarrantyHeight));
            else
                material.warranty.height = parseFloat(item.maxHeight);
            material.warranty.width = parseInt(app.options.WarrantyWidth);
            if (typeof app.gab_plus !== "undefined" && app.gab_plus != null) {
                if (app.gab_plus) {
                    material.min.width = material.min.width - material.gab.width;
                    material.min.height = material.min.height - material.gab.height;
                    material.max.width = material.max.width - material.gab.width;
                    material.max.height = material.max.height - material.gab.height;
                }
            }
            material.warranty.width = material.warranty.width - material.gab.width;
            material.warranty.height = material.warranty.height - material.gab.height;
            if (material.warranty.width <= 0) material.warranty.width = material.max.width;
            if (material.warranty.height <= 0) material.warranty.height = material.max.height;
            return material;
        }

        function calcRev_2(item, app) {
            let material = {
                gab: { width: 0, height: 0 },
                cost: { width: 0, height: 0 },
                min: { width: 0, height: 0 },
                max: { width: 0, height: 0 },
                warranty: { width: 0, height: 0 },
            };
            material.gab.width = parseFloat(app.options.GabWidth);
            material.gab.height = parseFloat(app.options.GabHeight);
            material.cost.width = parseFloat(app.options.CostWidth);
            material.cost.height = parseFloat(app.options.CostHeight);
            material.min.width = parseFloat(item.minWidth);
            material.min.height = parseFloat(item.minHeight);
            material.max.width = parseFloat(item.maxWR);
            material.max.height = parseFloat(item.maxHR);
            let rol_w = parseFloat(item.rol_width);
            if (rol_w > 0)
                material.warranty.width = Math.min(rol_w, parseInt(app.options.WarrantyWidth));
            else
                material.warranty.width = parseFloat(item.maxWR);
            let rol_h = parseFloat(item.rol_width_width);
            if (rol_h > 0)
                material.warranty.height = Math.min(rol_h, parseInt(app.options.WarrantyHeight));
            else
                material.warranty.height = parseInt(app.options.WarrantyHeight);
            if (typeof app.gab_plus !== "undefined" && app.gab_plus != null) {
                if (app.gab_plus) {
                    material.min.width = material.min.width - material.gab.width;
                    material.min.height = material.min.height - material.gab.height;
                    material.max.width = material.max.width - material.gab.width;
                    material.max.height = material.max.height - material.gab.height;
                }
            }
            material.warranty.width = material.warranty.width - material.gab.width;
            material.warranty.height = material.warranty.height - material.gab.height;
            if (material.warranty.width <= 0) material.warranty.width = material.max.width;
            if (material.warranty.height <= 0) material.warranty.height = material.max.height;
            return material;
        }

        let mat = [];
        let rev = item.rev;
        let enabled = item.enabled;

        if (rev !== 0) {
            mat[1] = calcRev_1(item, this);
            mat[2] = calcRev_2(item, this);
            if (rev === 1 || rev === 2) {
                if (w > mat[rev].max.width || h > mat[rev].max.height) enabled = false;
                if (w < mat[rev].min.width || h < mat[rev].min.height) enabled = false;
            } else {
                let enabled1 = item.enabled;
                let enabled2 = item.enabled;
                if (w > mat[1].max.width || h > mat[1].max.height) enabled1 = false;
                if (w < mat[1].min.width || h < mat[1].min.height) enabled1 = false;
                if (w > mat[2].max.width || h > mat[2].max.height) enabled2 = false;
                if (w < mat[2].min.width || h < mat[2].min.height) enabled2 = false;
                if (!enabled1 && !enabled2) {
                    enabled = false;
                } else {
                    if (enabled1 && !enabled2) {
                        rev = 1;

                    }
                    if (enabled2 && !enabled1) {
                        rev = 2;
                    }
                }
            }
            if (mat[rev]) {
                item.min = mat[rev].min;
                item.max = mat[rev].max;
            } else {
                item.min = mat[1].min;
                item.max = mat[1].max;
            }
        } else {
            mat = calcRev_1(item, this);
            if (w > mat.max.width || h > mat.max.height) enabled = false;
            if (w < mat.min.width || h < mat.min.height) enabled = false;
            item.min = mat.min;
            item.max = mat.max;

        
        }
        item.calc_rev = rev;
        item.calc_enabled = enabled;
        return item;
    };

    this.applyRelativeOptions = function(material) {
        let materialOptMap = {
            GabWidth: ['gab', 'width'],
            GabHeight: ['gab', 'height'],
            CostWidth: ['cost', 'width'],
            CostHeight: ['cost', 'height'],
        };
        for (let key in this.options) {
            let val = parseFloat(this.options[key]);
            if (materialOptMap[key]) {
             
                if (material && material[materialOptMap[key][0]])
                    material[materialOptMap[key][0]][materialOptMap[key][1]] = val;
            } else {
                let multiparam = key.split('-');
                if (multiparam.length > 1) {
                    let param1 = multiparam[0];
                    let param2 = multiparam[1];
                    let param2option = null;
                    let multiparam2 = param2.split('_');
                    if (multiparam2.length > 1) {
                        param2 = multiparam2[0];
                        param2option = parseFloat(multiparam2[1]);
                    }
                    if (materialOptMap[param1] && this.oParams[param2] && param2option) {
                        if (parseFloat(this.oParams[param2].value) == param2option) {
                            material[materialOptMap[param1][0]][materialOptMap[param1][1]] = val;
                        }
                    } else {
                        if (this.oParams[param1] && this.oParams[param2] && param2option) {
                            if (parseFloat(this.oParams[param2].value) == param2option) {
                                this.oParams[param1].value += val;
                            }
                        }
                    }
                    
                }
            }
        }
        if (this.oParams.width) {
            let gab = material.gab[this.oParams.width.alias];
            let cost = material.cost[this.oParams.width.alias];
            this.oParams.width.gab_min = material.min[this.oParams.width.alias] + gab;
            this.oParams.width.gab_max = material.max[this.oParams.width.alias] + gab;
            this.oParams.width.cost_min = material.min[this.oParams.width.alias] + cost;
            this.oParams.width.cost_max = material.max[this.oParams.width.alias] + cost;
            this.oParams.width.gab = this.oParams.width.value + gab;
            this.oParams.width.cost = this.oParams.width.value + cost;
        }
       
        if (this.oParams.height) {
            let gab = material.gab[this.oParams.height.alias];
            let cost = material.cost[this.oParams.height.alias];
            this.oParams.height.gab_min = material.min[this.oParams.height.alias] + gab;
            this.oParams.height.gab_max = material.max[this.oParams.height.alias] + gab;
            this.oParams.height.cost_min = material.min[this.oParams.height.alias] + cost;
            this.oParams.height.cost_max = material.max[this.oParams.height.alias] + cost;
            this.oParams.height.gab = this.oParams.height.value + gab;
            this.oParams.height.cost = this.oParams.height.value + cost;
       
        }
    };

    this.construct = function(o, calcClass) {
        let self = this;
        this.calc = calcClass;
        if (this.calc.callbacks) this.callbacks = this.calc.callbacks;
        this.o = o;
        if (typeof self.o !== "undefined" && self.o != null) self.o = self.foroomApi.clone(self.o);
        //if (typeof this.o.cm_array !== "undefined" && this.o.cm_array != null) this.cm_array = this.o.cm_array;
        //if (typeof this.o.pics !== "undefined" && this.o.pics !=null) 	this.pics = this.o.pics;
        if (this.o.all_actions) this.all_actions = o.all_actions;
        if (this.o.all_promo) this.all_promo = o.all_promo;
      
        if (this.calc) {
            if (typeof this.calc.pics !== "undefined" && this.calc.pics != null) this.pics = this.calc.pics;
            
            if (this.calc.cm_array) this.cm_array = this.calc.cm_array;
            if (this.calc.currency_array) this.currency_array = this.calc.currency_array;
            if (this.calc.currency_rate) this.currency_rate = this.calc.currency_rate;


            if (this.calc.filters_map) this.filters_map = this.calc.filters_map;
            if (this.calc.filter) this.filter = this.calc.filter;
            if (this.calc.all_actions) this.calc_all_actions = this.calc.all_actions;
            if (this.calc.all_promo) this.calc_all_promo = this.calc.all_promo;

            if (this.calc.previewParams) this.previewParams = this.calc.previewParams;


            if (this.calc.json_data && this.calc.json_data.all_data) {
                if (this.calc.json_data.all_data.structure) this.structure = this.calc.json_data.all_data.structure;
            }

        }
        if (this.o) {
          
            this.test = 'test';
            if (this.o.promo) this.promo = this.o.promo;
            if (this.o.ptype) this.type = this.o.ptype;
            if (this.o.category) this.subtype = this.o.category;
            if (this.o.img) {
                let ptype = this.type + this.subtype;
                this.images = {};
                if (this.o.img.i) this.images.ico = 'images/calculator/izd/ico/ico_' + ptype + '.jpg';
                if (this.o.img.p) this.images.prv = 'images/calculator/izd/prv/prv_' + ptype + '.png';
                if (this.images) {
                    this.image = this.images.ico ? this.images.ico : null;
                    this.prv = this.images.prv ? this.images.prv : null;
                }
                //this.icon = this.image;
            }

            if (this.calc) {
                if (this.calc.max_dimentions) {
                    if (this.calc.max_dimentions[this.type]) this.max_dimentions = this.calc.max_dimentions[this.type];
                }
   
            }

        
            if (this.foroomApi && this.foroomApi.params) {
                if (this.foroomApi.params.foroom_pics_url) this.foroom_pics_url = this.foroomApi.params.foroom_pics_url;
                if (this.foroomApi.params.console_mode) this.console_mode = this.foroomApi.params.console_mode;
                if (this.foroomApi.params.setRecommended) this.setRecommended = this.foroomApi.params.setRecommended;
                if (this.foroomApi.params.correct_template) this.correct_template = this.foroomApi.params.correct_template;
            }


            if (!this.max_dimentions) {
                this.max_dimentions = { width: 0, height: 0 };
                if (this.o.maxWidth) this.max_dimentions.width = this.o.maxWidth;
                if (this.o.maxHeight) this.max_dimentions.height = this.o.maxHeight;
            }

            if (!this.min_dimentions) {
                this.min_dimentions = { width: 0, height: 0 };
                if (this.o.minWidth) this.min_dimentions.width = this.o.minWidth;
                if (this.o.minHeight) this.min_dimentions.height = this.o.minHeight;
            }

            if (typeof this.o.conditions !== "undefined" && this.o.conditions != null) this.conditions = this.o.conditions;
            if (typeof this.o.deltas !== "undefined" && this.o.deltas != null) this.deltas = this.o.deltas;
            if (typeof this.o.strings !== "undefined" && this.o.strings != null) this.strings = this.o.strings;
            if (typeof this.o.discount !== "undefined" && this.o.discount != null) this.discount = this.o.discount;
            if (typeof this.o.id !== "undefined" && this.o.id != null) this.id = parseInt(this.o.id);
            if (typeof this.o.name !== "undefined" && this.o.name != null) this.name = this.o.name;
            if (typeof this.o.options !== "undefined" && this.o.options != null) {
                this.options = this.o.options;
                if (typeof this.o.options.materialRest !== "undefined" && this.o.options.materialRest != null) this.materialRest.red = parseFloat(this.o.options.materialRest);
                if (typeof this.o.options.materialRestYellow !== "undefined" && this.o.options.materialRestYellow != null) this.materialRest.yellow = parseFloat(this.o.options.materialRestYellow);
            }
            if (typeof self.o.params !== "undefined" && self.o.params != null) self.params = self.prepareParamsArray(self.o.params);


            

            if (typeof self.o.materials !== "undefined" && self.o.materials != null) {
                self.applyCurrentActions(self.o.materials, function(materials_action) {
                    self.prepareMaterialsArray(materials_action, function(materials) {
                        
                        self.materials = materials;
                        self.options.DefaultMaterial = self.getFirstMaterial(materials);
                    });
                });
            }
            if (!this.strings) this.strings = {};

            this.warranty = {
                width: true,
                height: true
            };
            if (typeof this.o.tid !== "undefined" && this.o.tid != null) this.tid = this.o.tid;
            if (typeof this.o.discount !== "undefined" && this.o.discount != null) this.discount = this.o.discount;
            if (typeof this.o.margin !== "undefined" && this.o.margin != null) this.margin = this.o.margin;
            if (typeof this.o.multiple_cost !== "undefined" && this.o.multiple_cost != null) this.multiple_cost = this.o.multiple_cost;
            if (typeof this.o.all_karn_data !== "undefined" && this.o.all_karn_data != null) this.all_karn_data = this.o.all_karn_data;

            if (this.options && this.options.CostType) this.costtype = parseInt(this.options.CostType);

        }
    };

    this.init = function(template = null, callback = null) {
        let self = this;
        // self.isAction = true;
        if (template) {
            this.template = self.foroomApi.clone(template);
            this.initial_template = self.foroomApi.clone(template);
        }
        if (this.o != null) {
            if (template && template.hasOwnProperty('promo')) {
                this.promo = template.promo;
                this.o.promo = template.promo;
            }
            if (this.calc) {
                if (this.calc.console_mode) this.console_mode = this.calc.console_mode;
                if (this.calc.setRecommended) this.setRecommended = this.calc.setRecommended;
                if (this.calc.correct_template) this.correct_template = this.calc.correct_template;
            }
         
            self.foroomApi.ParamDimention.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamDimentionGab.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamMaterial.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamKarnizMaterial.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamSelect.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamText.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamLabel.prototype = new self.foroomApi.ClassParam(self);
            //	self.foroomApi.ParamLamels.prototype = new self.foroomApi.ClassParam(self);
            this.oParams = {};
            this.oParams.amount = {};
            //let ptype = this.type + this.subtype;
            this.oParams.width = {};
            this.oParams.height = {};
            this.oParams.rol_width = {};
            // this.oParams.promo = {};
            let material = this.strings.material;
            material.val = this.options.DefaultMaterial;
            material.enabled = true;
            material.visible = true;
            material.typ = 'material';
            material.promo = this.promo;
            if (self.console_mode) material.val = 0;
            this.oParams.material = new self.foroomApi.ParamMaterial(material, self);
            let sale = this.strings.sale;
            sale.val = 0;
            sale.typ = "text";
            sale.enabled = self.discount > 0 ? true : false;
            sale.visible = self.discount > 0 ? true : false;
            sale.min_v = 0;
            sale.max_v = self.discount;
            this.oParams.sale = new self.foroomApi.ParamText(sale, self);
            let rol_width = this.strings.rol_width;
            rol_width.val = 0;
            rol_width.typ = "label";
            rol_width.enabled = false; //this.deltas.rol_width ? true : false;
            rol_width.visible = this.deltas.rol_width ? true : false;
            rol_width.min_v = 0;
            rol_width.max_v = 99999;

            this.oParams.rol_width = new self.foroomApi.ParamLabel(rol_width, self);
            for (let key in this.params) {
                let val = this.params[key];
                
                // if (key === 'amount') {
                //     val.max_v = 99;
                //     val.min_v = 1;
                //     val.val = 1;
                // }
                //if (val.typ === 'radio') val.typ = 'select';
                if (val.typ === 'radio_disabled') {
                    val.typ = 'radio';
                    val.disabled_cls = 'disabled';
                } else {
                    if (self.console_mode)
                        if (val.visible) val.val = 0;
                }
                //if (val.typ =='lamels_radio') val.typ = 'lamels_select';
                if (val.typ === 'radio') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
                if (val.typ === 'text') self.oParams[key] = new self.foroomApi.ParamText(val, self);
                if (val.typ === 'label') self.oParams[key] = new self.foroomApi.ParamLabel(val, self);
                if (val.typ === 'select') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
                if (val.typ === 'material') self.oParams[key] = new self.foroomApi.ParamMaterial(val, self);
                if (val.typ === 'dimention') self.oParams[key] = new self.foroomApi.ParamDimention(val, self);
                if (val.typ === 'gab_dimention') self.oParams[key] = new self.foroomApi.ParamDimentionGab(val, self);
                if (val.typ === 'cost_dimention') self.oParams[key] = new self.foroomApi.ParamDimentionGab(val, self);


                if (val.typ === 'lamels') self.oParams[key] = new self.foroomApi.ParamLamels(val, self);
                if (val.typ === 'karniz') self.oParams[key] = new self.foroomApi.ParamKarniz(val, self);
                //if (val.typ =='lamels_select') self.oParams[key] =new foroomApi.ParamSelect(val,self);
                //if (val.typ =='lamels_text') self.oParams[key] =new foroomApi.ParamText(val,self);
                //if (val.typ =='lamels_label') self.oParams[key] =new foroomApi.ParamLabel(val,self);
                //self.oParams[key] =new foroomApi.ParamLamels(val, self);
            }

            this.filterCalcMaterials();
            this.init_local();
            this.collectCostRelatives(function() {
                if (typeof self.template !== "undefined" && self.template != null)
                    self.setTemplate();
                else
                    self.setDefaults();
                if (typeof callback !== "undefined" && callback != null) callback();
            });
        } else alert('EMPTY ITEM-OBJECT');
    };

    this.initWholesale = function(template = null, callback = null) {
        let self = this;
        if (template) {
            this.template = self.foroomApi.clone(template);
            this.initial_template = self.foroomApi.clone(template);
        }
        if (this.o != null) {
            if (template && template.hasOwnProperty('promo')) {
                this.promo = template.promo;
                this.o.promo = template.promo;
            }
            if (this.calc) {
                if (this.calc.console_mode) this.console_mode = this.calc.console_mode;
                if (this.calc.setRecommended) this.setRecommended = this.calc.setRecommended;
                if (this.calc.correct_template) this.correct_template = this.calc.correct_template;
            }

            let whActions = [];
            calcClass.foroomApi.wholesaleActions;
            if (calcClass.foroomApi.wholesaleActions) {
                whActions = calcClass.foroomApi.wholesaleActions
            }
            // if (window && window.wholesaleActions) {
            //     whActions = window.wholesaleActions;
            // }


            let currentWholesale = null;

            if (whActions.length) {
                currentWholesale = whActions.filter(item => JSON.parse(item.add_izd_types_json).includes(o.ptype + o.category))[0];
            }


            const wholesaleMaterials = currentWholesale ? JSON.parse(currentWholesale.add_mat_ids_json) : [];
            self.foroomApi.ParamDimention.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamDimentionGab.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamWholesaleMaterial.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamKarnizMaterial.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamSelect.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamText.prototype = new self.foroomApi.ClassParam(self);
            self.foroomApi.ParamLabel.prototype = new self.foroomApi.ClassParam(self);
            this.oParams = {};
            this.oParams.amount = {};
            this.oParams.width = {};
            this.oParams.height = {};
            this.oParams.rol_width = {};
            let material = this.strings.material;

            material.val = this.options.DefaultMaterial;
            if (wholesaleMaterials && wholesaleMaterials.length) {
                material.val = wholesaleMaterials[0];
            }


            material.enabled = true;
            material.visible = true;
            material.typ = 'material';

            material.promo = this.promo;
            if (self.console_mode) material.val = 0;
            let paramsMaterials = new self.foroomApi.ParamWholesaleMaterial(material, self);

            this.oParams.material = paramsMaterials;
            let sale = this.strings.sale;
            sale.val = 0;
            sale.typ = "text";
            sale.enabled = self.discount > 0 ? true : false;
            sale.visible = self.discount > 0 ? true : false;
            sale.min_v = 0;
            sale.max_v = 0;
            this.oParams.sale = new self.foroomApi.ParamText(sale, self);
            let rol_width = this.strings.rol_width;
            rol_width.val = 0;
            rol_width.typ = "label";
            rol_width.enabled = false; //this.deltas.rol_width ? true : false;
            rol_width.visible = this.deltas.rol_width ? true : false;
            rol_width.min_v = 0;
            rol_width.max_v = 99999;
            this.oParams.rol_width = new self.foroomApi.ParamLabel(rol_width, self);

            for (let key in this.params) {
                let val = this.params[key];
               
                if (key === 'amount') {
                    // val.max_v = 99;
                    // val.min_v = 1;
                    // val.val = 1;
                    if (currentWholesale && window && window.edit_wholesale) {
                        val.max_v = Number(currentWholesale.add_quan);

                        if (!window.counterWh) {
                            
                            let cart = [];
                            if (localStorage.getItem('PSsale__foroom__calculatorPSorder__items')) {
                                cart = JSON.parse(localStorage.getItem('PSsale__foroom__calculatorPSorder__items'));
                            } else if (localStorage.getItem('sfr_api_v2.order_items')) {
                                cart = JSON.parse(localStorage.getItem('sfr_api_v2.order_items'));
                            }
                          
                            if (window.whCart) {
                                cart = window.whCart;
                            }
                     
                            let counter = currentWholesale.add_quan;
                            let idArr = [];
                            let cartCounter = 0;
                            let materials = JSON.parse(currentWholesale.add_mat_ids_json);

                            let izds = JSON.parse(currentWholesale.add_izd_types_json);
                            cart.map(item => {
                                cartCounter += item.amount;
                            });

                            for (let key in cart) {
                              
                                if (izds.includes(cart[key].type + cart[key].subtype) && materials.includes(cart[key].material)) {
                                    if (counter >= 0 && cart[key].amount <= counter) {
                                        
                                        counter -= cart[key].amount;
                                        idArr.push(key)
                                    }
                                    if (counter > 0 && cart[key].amount == currentWholesale.add_quan) {
                                        idArr = [key];
                                        counter = 0;
                                        break;
                                    }
                                }
                            }
                            if (window) {
                                window.counterWh = counter;
                            }

                            // if (counter != 0) {
                            // } else {
                            //     val.max_v = 99;
                            // }

                           
                        }
                        if (window && window.counterWh != 0) {
                            val.max_v = window.counterWh;
                        } else {
                            val.max_v = 99;
                        }

                 
                    }

                    // val.min_v = Number(currentWholesale.add_quan);
                    // val.val = Number(currentWholesale.add_quan);


                }
                //if (val.typ === 'radio') val.typ = 'select';
                if (val.typ === 'radio_disabled') {
                    val.typ = 'radio';
                    val.disabled_cls = 'disabled';
                } else {
                    if (self.console_mode)
                        if (val.visible) val.val = 0;
                }
                //if (val.typ =='lamels_radio') val.typ = 'lamels_select';
                if (val.typ === 'radio') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
                if (val.typ === 'text') self.oParams[key] = new self.foroomApi.ParamText(val, self);
                if (val.typ === 'label') self.oParams[key] = new self.foroomApi.ParamLabel(val, self);
                if (val.typ === 'select') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
                if (val.typ === 'material') self.oParams[key] = new self.foroomApi.ParamWholesaleMaterial(val, self);
                if (val.typ === 'dimention') self.oParams[key] = new self.foroomApi.ParamDimention(val, self);
                if (val.typ === 'gab_dimention') self.oParams[key] = new self.foroomApi.ParamDimentionGab(val, self);
                if (val.typ === 'cost_dimention') self.oParams[key] = new self.foroomApi.ParamDimentionGab(val, self);


                if (val.typ === 'lamels') self.oParams[key] = new self.foroomApi.ParamLamels(val, self);
                if (val.typ === 'karniz') self.oParams[key] = new self.foroomApi.ParamKarniz(val, self);
                //if (val.typ =='lamels_select') self.oParams[key] =new foroomApi.ParamSelect(val,self);
                //if (val.typ =='lamels_text') self.oParams[key] =new foroomApi.ParamText(val,self);
                //if (val.typ =='lamels_label') self.oParams[key] =new foroomApi.ParamLabel(val,self);
                //self.oParams[key] =new foroomApi.ParamLamels(val, self);
            }
            this.filterCalcMaterials();
            this.init_local();
            this.collectCostRelatives(function() {
                if (typeof self.template !== "undefined" && self.template != null)
                    self.setTemplate();
                else
                    self.setDefaults();
                if (typeof callback !== "undefined" && callback != null) callback();
            });
        } else alert('EMPTY ITEM-OBJECT');
    };

    this.smartRepairErrors = function() {};
    this.addLocalPrice = function(o) {};
    this.setValCallback = function(o) {};
    this.init_local = function() {};


    this.applyParamDeltas = function(oParam) {
      
        if (this.deltas[oParam.alias]) {
            let new_value = 0;
            let param_deltas = this.deltas[oParam.alias];
            for (let pkey in param_deltas) {


                let p_alias = pkey;
                if (pkey.indexOf('_') != -1) {
                    let spl = pkey.split('_');
                    if (spl.length > 1) {
                        p_alias = spl[0];
                    }
                }

                let thisParam = null;
                if (this.oParams[p_alias]) thisParam = this.oParams[p_alias];
                else if (this.oParams[pkey]) thisParam = this.oParams[pkey];


                if (thisParam) {
                    let param_value = parseFloat(thisParam.value);
                    let delta = parseFloat(param_deltas[pkey].delta);
                    //if (this.oParams[key].cm) delta=delta/10;
                    let weight = parseFloat(param_deltas[pkey].weight);
                    let options = param_deltas[pkey].options;
                    if (options.length > 0) {
                        if (options.indexOf(param_value) != -1) {
                            new_value += delta;
                        }
                    } else {
                        param_value = (param_value * weight) + delta;
                        new_value += parseFloat(param_value);
                    }
                }
            }
            
            //oParam.value=new_value;
            if (oParam.setVal) oParam.setVal(new_value);
        } else {
            for (let pkey in this.deltas) {
                if (this.deltas.hasOwnProperty(pkey)) {
                    
                    let alias = pkey;
                    let param = null;
                    if (pkey.indexOf('.') != -1) {
                        let spl = pkey.split('.');
                        if (spl.length > 1) {
                            alias = spl[0];
                            param = spl[1];
                        }
                        if (param) {
                            let param_deltas = this.deltas[pkey];

                            for (let k in param_deltas) {
                                if (param_deltas.hasOwnProperty(k)) {

                                    let p_alias = k;
                                    if (k.indexOf('_') != -1) {
                                        let spl = k.split('_');
                                        if (spl.length > 1) {
                                            p_alias = spl[0];
                                        }
                                    }


                                    if (oParam.alias === p_alias || oParam.alias === k) {


                                        let thisParam = null;
                                        if (this.oParams[p_alias]) thisParam = this.oParams[p_alias];
                                        else if (this.oParams[k]) thisParam = this.oParams[k];


                                        if (thisParam) {


                                            let param_value = parseFloat(thisParam.value);
                                            let delta = parseFloat(param_deltas[k].delta);
                                            let weight = parseFloat(param_deltas[k].weight);
                                            let options = param_deltas[k].options;
                                             if (options.length > 0) {
                                                if (options.indexOf(param_value) != -1) {
                                                    this.oParams[alias].plusDeltas[param] = delta;
                                               }
                                            } else {
                                                param_value = (param_value * weight) + delta;
                                                this.oParams[alias].plusDeltas[param] = parseFloat(param_value);
                                            }
                                        }
                                    }
                                }
                            }

                      

                        }
                    }
                }
            }
        }
    };

    this.setDefaults = function() {
        let self = this;
        for (let key in self.oParams) {
            if (self.oParams.hasOwnProperty(key) && self.oParams[key]) {
                //self.oParams[key].value = self.oParams[key].defaultValue;
                if (self.oParams[key].setVal) self.oParams[key].setVal(self.oParams[key].value);
            }
          


        }
    };

    this.setTemplate = function() {
       
        if (typeof this.template.sale !== "undefined" && this.template.sale != null) this.sale = this.template.sale;
        if (this.template.ControlDevice && this.correct_template) delete(this.template.ControlDevice);
        //if (this.template.CorrectorsCount) delete (this.template.CorrectorsCount);

        if (this.template.width) {
            if (this.template.gab_width)
                delete(this.template.gab_width);
            if (this.template.cost_width) delete(this.template.cost_width);
        }
        if (this.template.height) {
            if (this.template.gab_height) delete(this.template.gab_height);
            if (this.template.cost_height) delete(this.template.cost_height);
        }
        if (this.template.gab_width) {
            if (this.template.width) delete(this.template.width);
            if (this.template.cost_width) delete(this.template.cost_width);
        }
        if (this.template.gab_height) {
            if (this.template.height) delete(this.template.height);
            if (this.template.cost_height) delete(this.template.cost_height);
        }

        if (this.template.cost_width) {
            if (this.template.width) delete(this.template.width);
            if (this.template.gab_width) delete(this.template.gab_width);
        }
        if (this.template.cost_height) {
            if (this.template.height) delete(this.template.height);
            if (this.template.gab_height) delete(this.template.gab_height);
        }


        for (let key in this.oParams) {
            if (this.oParams.hasOwnProperty(key)) {
                let val = this.oParams[key];
              
                if (typeof val !== "undefined" && val !== null) {
                    //if (val.enabled && val.visible)
                    //	if (!val.disabled_cls)
                    {
                        let value = val.value;
                        if (typeof this.template[key] !== "undefined" && this.template[key] !== null) // contidion "if(this.template[key])" is not suitable here because this.template[key] may equals 0
                            value = this.template[key];
                        if ((value instanceof Object) && (this.foroomApi.isEmptyObject(value))) value = null;
                        if ((value instanceof Array) && (value.length <= 0)) value = null;
                        if (value != null) {
                            val.setVal(value);
                           
                           
                        }
                    }
                }
            }
        }
        if (!this.template.width && this.oParams.width) {
            let val = 0;
            if (this.template.cost_width) {
                val = parseFloat(this.template.cost_width);
                if (val > 0) this.oParams.width.setAltVal(val, 'cost');
            } else if (this.template.gab_width) {
                val = parseFloat(this.template.gab_width);
                if (val > 0) this.oParams.width.setAltVal(val, 'gab');
            }
        }
        if (!this.template.height && this.oParams.height) {
            let val = 0;
            if (this.template.cost_height) {
                val = parseFloat(this.template.cost_height);
                if (val > 0) this.oParams.height.setAltVal(val, 'cost');
            } else if (this.template.gab_height) {
                val = parseFloat(this.template.gab_height);
                if (val > 0) this.oParams.height.setAltVal(val, 'gab');
            }
        }
        this.template = null;
    };


    this.calcParamPrice = function(param) {
        if (param) {
            param.plusDeltas = {};
            this.applyParamDeltas(param);
            if (param.applyConditions) param.applyConditions();
            if (param.validate) param.validate();
            if (param.prv) this.previewPics[param.alias] = param.prv;

        }
    }


    this.dynamicAction = function() {
        let actionBool = true;
        let action_param = this.oParams.material && this.oParams.material.currentActionInfo && this.oParams.material.currentActionInfo.action_param ? this.oParams.material.currentActionInfo.action_param : [];
        if (Object.keys(action_param).length > 0) {
            for (let key in action_param) {
                if (action_param[key] == 'NOT NULL') {
                    if (this.template &&
                        typeof(this.template[key]) != 'undefined' && this.template[key] < 1
                    ) {
                        actionBool = false;
                        break;
                    }
                } else {

                    if (this.template && typeof(this.template[key]) != 'undefined' && !action_param[key].includes(this.template[key]) && this.template[key] != 0) {
                        actionBool = false;
                        break;
                    }
                }

            }
            if (this.isAction !== actionBool) {
                this.isAction = actionBool;
                this.calcPrice();
            }
        }


    }


    this.calcPrice = function(recalc = true, isReinit = false) {


        let template = {};
        let preview = {};
        this.previewPics = {};
        if (this.prv) this.previewPics.izd = this.prv;

        let mainParams = ['width', 'height', 'gab_width', 'gab_height', 'cost_width', 'cost_height'];
     

        this.filterCalcMaterials();
        for (let k in mainParams) {
            if (mainParams.hasOwnProperty(k)) {
              
                this.calcParamPrice(this.oParams[mainParams[k]]);
            }
        }
        for (let k in this.oParams) {
            if (this.oParams.hasOwnProperty(k) && mainParams.indexOf(k) === -1) {
               
                if( o.ptype === 'wood' &&k === 'PicDirection'){
                    this.InsertPicDirectionCorrection(this.oParams[k], this.oParams.width.cost, this.oParams.height.cost);
                }

                if(o.ptype === 'wood' && k === 'ControlType'){
                    this.ControlTypeCorrection(this.oParams[k], this.oParams.width.cost, this.oParams.height.cost);
                }

                if(o.ptype === 'wood' && k === 'LambrBokSize'){
                    this.addMaxWidth(this.oParams[k]);
                }

                if(o.ptype + o.category === 'karniz11' ){
                  
                    this.checkCutHalf(this.oParams);
                }
                

              



                
                

                // if(o.ptype === 'wood' && k === 'LambrBokSize'){
                //     this.addMaxWidth(this.oParams[k]);
                // }

   
                if(( k.includes('ignore')) && this.oParams[k].value > 0){
                    let paramItem = k.split('_');
                    paramItem = paramItem[1];
                 
                    
                    this.oParams[paramItem].min = this.oParams[k].min;
                     this.oParams[paramItem].setVal(this.oParams[k].value);
                 }

                if (this.oParams[k].oParams) {
                    for (let k1 in this.oParams[k].oParams) {
                        if (this.oParams[k].oParams.hasOwnProperty(k1)) {
                            this.calcParamPrice(this.oParams[k].oParams[k1]);
                        }
                    }
                }
                this.calcParamPrice(this.oParams[k]);
            }
        }
        if (this.oParams.lamels) this.oParams.lamels.recalc(isReinit);
        if (this.oParams.material) this.oParams.material.validate();
        this.smartRepairErrors();
        let price = 0;
        let old_price = 0;


        if (typeof this.oParams.material !== "undefined" && this.oParams.material != null) {
            if (this.isAction == true || this.isAction === null) {
                if (this.oParams.material.actionPrice) {
                    let defaultPrice = this.oParams.material.currentActionInfo.old_cost * (1 - this.oParams.material.currentActionInfo.perc);
                    this.oParams.material.price = this.getMaterialPrice(this.oParams.material, defaultPrice);
                } else {
                    this.oParams.material.price = this.getMaterialPrice(this.oParams.material, null);
                }
            } else if (this.isAction === false) {
                this.oParams.material.actionPrice = true;
                this.oParams.material.price = this.getMaterialPrice(this.oParams.material, this.oParams.material.currentActionInfo.old_cost);
            }

            // this.oParams.material.price = 1000 * Math.random();
         
            if (this.oParams.material.isCurrentAction) {
                this.oParams.material.old_price = this.getMaterialOldPrice(this.oParams.material);
            }
            // else if(!this.oParams.material.isCurrentAction && !this.isAction && this.oParams.material.old_price){
            //     delete this.oParams.material.old_price;
            // }
        }
        const dateNow = new Date();
        const startAction = new Date('2024-11-28 00:00:00')
        const finishAction = new Date('2024-12-28 12:00:00')


        for (let key in this.oParams) {
            let val = this.oParams[key];

           if (typeof val.getParamPrice !== "undefined" && val.getParamPrice != null) {
                if (val.enabled) {
                    
                    template = val.release(template);
                    if (val.useInPreview || val.oParams) preview = val.preview(preview);


        // ///////////////////////КОСТЫЛЬ ДЛЯ АКЦИИ НА МОТОРЫ 27.11

            
        //     if(finishAction > dateNow && dateNow > startAction){
  
        //         if((o.ptype + o.category === 'rolo6')){

        //                 // if(val.alias === 'material'){     

        //                 //     if(!val.old_price || val.checkMaterial != val.value){
        //                 //         val.old_price = val.price
        //                 //         val.checkMaterial = val.value
        //                 //     }

        //                 //     let grandeMotor = this.oParams.Drive.value

        //                 //     if(grandeMotor === 3){
        //                 //         val.price = val.old_price * 0.8
        //                 //      
                                
        //                 //         // val.sale_price = val.old_price * 0.8
        //                 //     }
        //                 //     else{
        //                 //         val.price = val.old_price
        //                 //     }

                            
        //                 // }

        //                 if(val.alias === 'Drive'){

        //                 let accGrande = val.options.Drive_3;
        //                     if(!accGrande.old_cost){
        //                         accGrande.old_cost = accGrande.cost
        //                     }
        //                     accGrande.cost = accGrande.old_cost * 0.8;
        //                 }
        //         }
        //     }  
        // ////////////////////////////////////////////////////////////

                   
                    let param_price = val.getParamPrice();
                 

                

                


                    if (this.oParams.material.isCurrentAction == true) {
                        this.promo = `PM_${this.oParams.material.currentActionInfo.id}`;
                    }

                    let defaultPromo = null;

                    // if (this.oParams.material.isCurrentAction == false) {
                    //     if (document.cookie.match(`(^|;) ?sfr_promo=([^;]*)(;|$)`)) {
                    //         defaultPromo = document.cookie.match(`(^|;) ?sfr_promo=([^;]*)(;|$)`)[2];
                    //         this.promo = defaultPromo;
                    //     } else if (this.promo.startsWith('PM')) {
                    //         this.promo = '';
                    //     }
                    // }

                    if(val.alias == 'Color' && val.price == 0){
                        
                        delete val.old_price;
                    }

                    if (val.alias == 'material' && this.oParams.material.isCurrentAction == false && this.promo !== '' && !this.promo.includes('PM') && !this.promo.includes('WH')) {
                        val.promo = this.promo;
                        let new_pr = this.get_promo_price(param_price, val);
                        if (new_pr !== param_price) {
                            val.old_price = param_price;
                            param_price = new_pr;
                        }
                    }

                  
                    price += param_price;
                    if (val.old_price) old_price += val.old_price;
                    else old_price += param_price;
                }
            } else {
                if (typeof val.price !== "undefined" && val.price != null) {
                    price += val.price;
                } else val.price = 0;
                if (typeof val.old_price !== "undefined" && val.old_price != null) old_price += val.old_price;
                else val.old_price = 0;
            }
        }

    
            

        if (this.price === 0) recalc = true;

        if (recalc) {
            this.old_price = old_price * this.margin;
            this.price = price * this.margin;
            this.old_price = Math.round(this.old_price * 100) / 100;
            this.price = Math.round(this.price * 100) / 100;

        }

        // this.price = 1000;

        if (typeof this.oParams.sale !== "undefined" && this.oParams.sale != null
            // && this.isAction
        )
            this.sale_price = Math.round((this.price - this.price * (this.oParams.sale.value / 100)) * 100) / 100;
        else
            this.sale_price = this.price;
        price = this.sale_price;


        if (recalc) {
            this.perc = 0;
            if (this.old_price > price) {
                this.perc = Math.round(100 - 100 * price / this.old_price);
            } else {
                this.perc = Math.round(100 - 100 * this.old_price / price);
            }
        }




        if (this.oParams.amount) {
            let amount = this.oParams.amount.value;
            this.old_summ = Math.round(this.old_price * amount * 100) / 100;
            this.summ = Math.round(price * amount * 100) / 100;

            // if(finishAction > dateNow && dateNow > startAction){

                
            
            //     if((o.ptype + o.category === 'rolo6')){

            //        if(this.oParams.Drive.value === 3){

            //  

                    
                    
            //         // this.old_summ = Math.round(this.old_price * amount * 100) / 100 / 0.8;
            //         // template.old_summ = this.old_summ;
            //        }
                    

            //     }
            // }
        }

       

        if (this.oParams.material) {
         //поправить если понадобится включить динамику на карнизе
            
                if (this.isAction == false || !this.oParams.material.currentActionInfo || Object.values(this.oParams.material.currentActionInfo).length < 1) {
                    if(!this.template || (this.template && this.template.type !== 'karniz')){
                    delete this.perc;
                    delete this.old_price;
                    delete this.old_summ;
                    }
                }
             
        }


        // if (this.old_price === price || this.old_price === 0) this.old_price = null;
        // if (this.old_summ === this.summ || this.old_summ === 0) this.old_summ = null;
        // if (this.perc === 0) this.perc = null;

        this.salePrice = this.sale_price;
        let whActions = [];
        if (calcClass.foroomApi.wholesaleActions && calcClass.foroomApi.wholesaleActions.length) {
            whActions = calcClass.foroomApi.wholesaleActions
        }
        if (typeof window !== 'undefined' && typeof window.wholesaleActions !== 'undefined') {
            whActions = window.wholesaleActions;
        };


        if (whActions.length > 0) {

            const currentAction = whActions.find(item => JSON.parse(item.add_izd_types_json).includes(o.ptype + o.category));
            let currentChecker = true;
            if (this.initial_template) {
                currentChecker = whActions.find(item => JSON.parse(item.add_izd_types_json).includes(this.initial_template.type + this.initial_template.subtype) && JSON.parse(item.add_mat_ids_json).includes(this.initial_template.material));
            }

            if (currentAction && ((this.initial_template && currentChecker) || currentChecker)) {
                let cart = [];
                if (calcClass.foroomApi.wholesaleCart) {
                    cart = calcClass.foroomApi.wholesaleCart;
                } else {
                    if (localStorage.getItem('PSsale__foroom__calculatorPSorder__items')) {
                        cart = JSON.parse(localStorage.getItem('PSsale__foroom__calculatorPSorder__items'));
                    } else if (localStorage.getItem('sfr_api_v2.order_items')) {
                        cart = JSON.parse(localStorage.getItem('sfr_api_v2.order_items'));
                    }

                    if (typeof window !== 'undefined' && window.whCart) {
                        cart = window.whCart;
                    }
                }

                let counter = currentAction.add_quan;
             
                let idArr = [];
                let cartCounter = 0;
                let materials = JSON.parse(currentAction.add_mat_ids_json);
              
                let izds = JSON.parse(currentAction.add_izd_types_json);
                cart.map(item => {
                    cartCounter += item.amount;
                });
             
                for (let key in cart) {
                    if (izds.includes(cart[key].type + cart[key].subtype) && materials.includes(cart[key].material)) {
                        if (counter >= 0 && cart[key].amount <= counter) {
                            counter -= cart[key].amount;
                            idArr.push(key)
                        }
                        if (counter > 0 && cart[key].amount == currentAction.add_quan) {
                            idArr = [key];
                            counter = 0;
                            break;
                        }
                    }
                }
                if (typeof window !== 'undefined') {
                    window.counterWh = counter;
                }

                ///////////УСЛОВИЕ НА ДОП СКИДКУ
                if (((counter == 0 && (this.initial_template && idArr.includes(this.initial_template.id))) || (counter > 0 && typeof window !== 'undefined' && window.edit_wholesale) || (counter >= 0 && typeof window !== 'undefined' && window.edit_preorderWholesale)) && cartCounter <= (10 + currentAction.add_quan)) {
                  

                    let whId = 'ERR';
                    if (self.app && self.app.wholesaleActions) {
                        whId = self.app.wholesaleActions[0].id;
                    } else if (typeof(window) != 'undefined' && window.wholesaleActions) {
                        whId = window.wholesaleActions[0].id;
                    }
                    this.promo = `WH_${whId}`;
                    if (!this.old_price) {
                        this.old_price = price;
                    }

                    if (!this.old_price) {
                        this.old_price = price;
                    }

                    this.price = (this.old_price * (100 - Number(currentAction.add_perc)) / 100).toFixed(2);
                    this.sale_price = this.price;
                    if (this.initial_template) {
                        this.summ = (this.price * this.initial_template.amount).toFixed(2);
                    } else {
                        this.summ = (this.price * template.amount).toFixed(2);
                    }

                    if (currentAction.show_old_price == 1) {
                        
                        this.perc = Number(currentAction.add_perc);
                        if (!this.old_summ && this.initial_template) {
                            this.old_summ = (this.old_price * this.initial_template.amount).toFixed(2);
                        }
                        if (!this.old_summ && !this.initial_template) {
                            this.old_summ = (this.old_price * template.amount).toFixed(2);
                        }

                    } else {
                        delete this.old_price;
                    }

                    //     // this.summ = Math.round(this.price * this.oParams.amount.value * 100) / 100;
                    //     // window[actQuan] = 0;
                }
            } else {
                if (typeof window !== 'undefined' && window.counterWh !== 'undefined') {
                    delete window.counterWh;
                }

            }
        }





        template = this.releaseItem(template);
     
        
        preview = this.previewItem(template, preview);
        this.template = template;
        this.templatePrv = preview;


        this.dynamicAction();
        // Чтобы включить динамическую акцию - раскоментить верхнюю строку
        // this.oParams.material.isCurrentAction = actionBool;

       

    
        this.cb();
    };


    this.getRecommendDimentions = function() {
        let w = 0;
        let h = 0;
        let rev = 0;
        if (this.oParams.width) w = this.oParams.width.value; 
        if (this.oParams.height) h = this.oParams.height.value; 
        if (this.oParams.MaterialCalc) rev = this.oParams.MaterialCalc.value; 
        this.recommend_dimentions = this.calc.getRecommendDimentions(this.type, w, h, rev);
        return this.recommend_dimentions;
    }


    this.release = function() {
        return this.template;
    };


    this.previewItem = function(template, ar) {
 
        ar.warranty = {
            alias: 'warranty',
            key: 0,
            name: this.strings.warranty ? this.strings.warranty.name : '',
            val: this.strings.warranty ? this.strings.warranty.mesure : '',
            mes: '',
            descr: this.strings.warranty ? this.strings.warranty.descr : '',
        };
        for (let k in this.strings) {
            if (this.strings.hasOwnProperty(k) && this.strings[k]) {
                if (!ar[k]) {
                    if (typeof this[k] !== "undefined" && this[k] != null) {
                        let this_val = this[k];
                        if (this.currency_array.indexOf(k) != -1) {


                            this_val = Math.round((this_val / this.currency_rate) * 100) / 100;

                         
                        }

                        ar[k] = {
                            alias: k,
                            key: 0,
                            name: this.strings[k].name,
                            val: this_val,
                            mes: this.strings[k].mesure,
                            descr: ''
                        };
                    }
                }
            }
        }
        //if (ar.perc) delete(ar.perc);
        if (this.warranty.width && this.warranty.height) {
            if (ar.warranty) delete(ar.warranty);
        }
        if (ar.sale && !template.sale) delete(ar.sale);
        if (!ar.sale && ar.salePrice) delete(ar.salePrice);


        return ar;
    };

    this.releaseItem = function(ar) {
        ar.type = this.type;
        ar.subtype = this.subtype;
        ar.warranty = 0;
        if (!this.warranty.width || !this.warranty.height) ar.warranty = 1;
        ar.price = this.price;
        ar.sale_price = this.sale_price;
        if (this.perc) ar.perc = this.perc;
        if (this.old_price > 0 && this.old_price > this.price) ar.old_price = this.old_price;
        if (this.promo !== '') ar.promo = this.promo;
        return ar;
    };

    this.getMaterialPrice = function(material, cost) {
        return 0.00;
    };
    this.getMaterialOldPrice = function(material) {
        if (material.isCurrentAction && material.currentActionInfo && material.currentActionInfo.show_old_price) {
            return this.getMaterialPrice(material, material.currentActionInfo.old_cost);
        }
        return 0.00;
    };
    this.setParam = function(key, val) {
        if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) {
            this.oParams[key].setVal(val);
        }
    };
    this.enableParam = function(key) {
        let option = null;
        let param = null;
        if (key.indexOf('_') != -1) {
            let spl = key.split('_');
            if (spl.length > 1) {
                option = spl.pop();
                param = spl.join('_');
            }
        }
   
        if (this.oParams[key]) {
            this.oParams[key].enable();
        } else if (this.oParams[param]) {
            this.oParams[param].enable(key);
        } else {
            for (let pkey in this.oParams) {
                if (this.oParams[pkey].oParams)
                    if (this.oParams[pkey].oParams[key]) {
                        this.oParams[pkey].oParams[key].enable();
                    } else if (this.oParams[pkey].oParams[param]) {
                    this.oParams[pkey].oParams[param].enable(key);
                }
            }
        }
    };
    this.disableParam = function(key) {
        let option = null;
        let param = null;
        if (key.indexOf('_') != -1) {
            let spl = key.split('_');
            if (spl.length > 1) {
                option = spl.pop();
                param = spl.join('_');
            }
        }
       
        if (this.oParams[key]) {
            this.oParams[key].disable();
        } else if (this.oParams[param]) {
            this.oParams[param].disable(key);
        } else {
            for (let pkey in this.oParams) {
                if (this.oParams[pkey].oParams)
                    if (this.oParams[pkey].oParams[key]) {
                        this.oParams[pkey].oParams[key].disable();
                    } else if (this.oParams[pkey].oParams[param]) {
                    this.oParams[pkey].oParams[param].disable(key);
                }
            }
        }
    };
    this.get_mat_action_params = function(material) {
        let img_mat = '';
        let cost = parseFloat(material.cost);
        let old_cost = 0;
        let show_old_price = false;
        let tid = parseInt(material.tid);
        let perc = 0;
        let img_class = '';
        let slider_top = false;
        let slider_top_json = [];
        let action_alias = '';
        let action_name = '';
        let id = '';
        let colors = {};
        let isCurrentAction = false;


        if (material.enabled) {
            /////////ВАжное место
            for (let key in this.all_actions) {
                let val = this.all_actions[key];
                material.currentActionInfo = {};
                material.isCurrentAction = false;
                if (val.mat_ids_json.indexOf(tid) != -1) {
                    let action_params = {};
                    if (val.params_json.length > 0) {
                      
                        for (let item of val.params_json) {
                          
                            let paramArr = item.split('_');
                          
                            if (paramArr.length > 1) {
                                if (!action_params[paramArr[0]]) {
                                    action_params[paramArr[0]] = [];
                                }
                                action_params[paramArr[0]].push(Number(paramArr[1]));
                            } else if (Number(item[item.length - 1]) >= 0) {
                                if (!action_params.AnglesCount) {
                                    action_params.AnglesCount = [];
                                }
                                action_params.AnglesCount.push(Number(item[item.length - 1]));
                            } else {
                                action_params[item] = 'NOT NULL';
                            }

                        }
                    }

                    isCurrentAction = true;
                    perc = 1 - (parseInt(val.perc) / 100);
                    old_cost = cost / perc;
                    old_cost = Math.round(old_cost * 100) / 100;
                    action_name = val.name;
                    action_alias = val.alias;
                    id = val.id;
                    img_mat = val.img_mat;
                    img_class = val.img_class;
                    slider_top_json = val.slider_top_json;
                    if (parseInt(val.show_old_price) == 1)
                        show_old_price = true;
                    if (parseInt(val.slider_top) == 1)
                        slider_top = true;
                    if (val.colors) colors = val.colors;
                    material.currentActionInfo = {
                        img: img_mat,
                        cost: cost,
                        old_cost: old_cost,
                        id: id,
                        show_old_price: show_old_price,
                        img_class: img_class,
                        slider_top: slider_top,
                        action_param: action_params,
                        slider_top_json: slider_top_json,
                        alias: action_alias,
                        name: action_name,
                        perc: parseInt(val.perc) / 100,
                        colors: colors,
                    };
                    material.isCurrentAction = isCurrentAction;
                    break;
                }
            }
        }
        return material;
    };
    this.getFirstMaterial = function(materials) {
        let first = 0;
        if (this.materialRest && materials) {
            for (let key in this.materialsSortArray) {
                let v = this.materialsSortArray[key];
                let val = materials[v];
                if (val.tid && val.ost) {
                    if (val.ost > this.materialRest.red && val.tid == v) {
                        first = v;
                        break;
                    }
                }
            }
        }
     
        return first;
    };
    this.applyCurrentActions = function(arr, cb) {
        let self = this;
        let ptype = self.type + self.subtype;
        /*
        if (typeof self.calc_all_actions !== "undefined" && self.calc_all_actions != null) {
        	for (let key in self.calc_all_actions) {
        		let val = self.calc_all_actions[key];
        		if ((val.izd_types_json.indexOf(ptype) != -1) || (val.izd_types_json.indexOf(self.type) != -1)) {
        			self.all_actions[self.all_actions.length] = val;
        		}
        	}
        }
        */
        let new_arr = [];
        let filter = this.filters_map[this.filter] ? this.filters_map[this.filter] : ["all"];
        //	if (val.enabled && filter.indexOf(val.enabled) != -1) {
        for (let key in arr) {
            let val = arr[key];
            if (val.enabled && filter.indexOf(val.enabled) != -1) {
                val.enabled = true;
            } else {
                val.enabled = false;
            }
            new_arr.push(this.get_mat_action_params(val));
        }
        cb(new_arr);
    };
    this.collectCostRelatives = function(callback) {
        let self = this;
        for (let key in self.oParams) {
            let val = self.oParams[key];
            let param = val.o;
          
            if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null) self.oParams[key].costRelatives = {};
            if (param) {
                if (self.foroomApi.isEmptyObject(param.options)) {
                    if (param.cost_relate != '0')
                        if (typeof self.oParams[param.cost_relate] !== "undefined" && self.oParams[param.cost_relate] != null) {
                            self.oParams[param.cost_relate].costRelate = key;
                            if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null)
                                self.oParams[key].costRelatives[param.cost_relate] = self.oParams[param.cost_relate];
                        }
                } else
                    for (let k in param.options) {
                        let v = param.options[k];
                        if (v.cost_relate != '0')
                            if (typeof self.oParams[v.cost_relate] !== "undefined" && self.oParams[v.cost_relate] != null) {
                                self.oParams[v.cost_relate].costRelate = key;
                                if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null) self.oParams[key].costRelatives[v.cost_relate] = self.oParams[v.cost_relate];
                          }
                    }
            }
        }
        callback();
    };


    this.pushError = function(alias, description = null) {
        let name = null;
        if (!description) {
            if (this.oParams) {
                if (this.oParams[alias]) {
                    description = this.oParams[alias].error_description;
                    name = this.oParams[alias].name;
                } else {
                    for (let k in this.oParams) {
                        if (this.oParams.hasOwnProperty(k)) {
                            if (this.oParams[k].oParams && this.oParams[k].oParams[alias]) {
                                description = this.oParams[k].oParams[alias].error_description;
                                name = this.oParams[k].oParams[alias].name;
                            }
                        }
                    }
                }
            }
        }

        if (!name) {
            if (this.strings[alias] && this.strings[alias].name) {
                if (!name) name = this.strings[alias].name;
            }
        }

        this.erDescriptions[alias] = { alias: alias, name: name, description: description };
        this.errors[this.errors.length] = alias;
        this.errors = this.foroomApi.array_unique(this.errors);
        if (this.errors.length <= 0) this.error = false;
        else this.error = true;
    };
    this.popError = function(alias) {
        
        let idx = this.errors.indexOf(alias);
        if (idx != -1) {
            this.errors.splice(idx, 1);
        }
        if (this.erDescriptions[alias]) delete(this.erDescriptions[alias]);

        if (this.errors.length <= 0) this.error = false;
        else this.error = true;
    };
    this.getError = function(value) {
        let idx = this.errors.indexOf(value);
        if (idx != -1) return true;
        return false;
    };

    this.check_errors = function() {
        let self = this;
        for (let key in self.oParams) {
            let val = self.oParams[key];
            if (val.error) self.error = true;
          
        }
    
    };

    this.controlHeightCorrection = function(param) {
        let min = param.min;
        let max = 0; //param.max;
        let prev_vl = 0;
        let s_vl = min;
        if (param.options) {
            for (let key in param.options) {
                let val = param.options[key];
                let v = parseInt(val.val);
                if (v >= max) max = v;
                if (min == v)
                    s_vl = v;
                else if (min > prev_vl && min < v)
                    s_vl = v;
                prev_vl = v;
            }
            min = s_vl;
            if (min > max) min = max;
            param.min = min;
            param.max = max;
       
        }
    };


    this.setMaterialCalc = function(material, cb) {
        if (typeof material !== "undefined" && material != null) {
            this.applyRelativeOptions(material);
            if (this.materials[material.value]) {
                material.min.width = this.materials[material.value].minWidth ? parseFloat(this.materials[material.value].minWidth) : 0;
           
                material.min.height = this.materials[material.value].minHeight ? parseFloat(this.materials[material.value].minHeight) : 0;
                material.rev = this.materials[material.value].rev ? parseInt(this.materials[material.value].rev) : 0;
                material.max.width = this.materials[material.value].maxWidth ? parseFloat(this.materials[material.value].maxWidth) : 0;
                material.max.height = this.materials[material.value].maxHeight ? parseFloat(this.materials[material.value].maxHeight) : 0;
                material.warranty.width = this.options.WarrantyWidth ? parseInt(this.options.WarrantyWidth) : 0;

           
            }

        }
        if (this.oParams && this.oParams.MaterialCalc) {
            this.oParams.MaterialCalc.value = 0;
            this.oParams.MaterialCalc.enabled = false;
        }
        material.warranty_w = 0;
        material.warranty_h = 0;
        if (typeof this.gab_plus !== "undefined" && this.gab_plus != null)
            if (this.gab_plus) {
                material.min.width = material.min.width - material.gab.width;
                material.min.height = material.min.height - material.gab.height;
                material.max.width = material.max.width - material.gab.width;
                material.max.height = material.max.height - material.gab.height;
            }
        material.warranty.width = material.warranty.width - material.gab.width;
        material.warranty.height = material.warranty.height - material.gab.height;
        if (material.warranty.width <= 0) material.warranty.width = material.max.width;
        if (material.warranty.height <= 0) material.warranty.height = material.max.height;
        if (typeof cb !== "undefined" && cb != null) cb(material, this);

    };

    /*----------------------*/


    this.prepareMaterialItem = function(mat) {

        //if (this.structure && this.structure.materials)
        {

            if (!mat.minWidth) mat.minWidth = this.min_dimentions.width ? this.min_dimentions.width : 0;
            if (!mat.minHeight) mat.minHeight = this.min_dimentions.height ? this.min_dimentions.height : 0;
            if (!mat.maxWidth) mat.maxWidth = mat.width1 ? mat.width1 : (this.max_dimentions.width ? this.max_dimentions.width : 0);
            if (!mat.maxHeight) mat.maxHeight = mat.height1 ? mat.height1 : (this.max_dimentions.height ? this.max_dimentions.height : 0);
            if (!mat.maxWR) mat.maxWR = mat.width2 ? mat.width2 : (this.max_dimentions.width ? this.max_dimentions.width : 0);
            if (!mat.maxHR) mat.maxHR = mat.height2 ? mat.height2 : (this.max_dimentions.height ? this.max_dimentions.height : 0);
            let rol_width = Math.max(mat.maxHeight, mat.maxHR, mat.maxWidth, mat.maxWR);
            if (!mat.rol_width) mat.rol_width = rol_width;
            if (!mat.rol_width_width) mat.rol_width_width = rol_width;


        }


        return mat;
    };


    this.prepareMaterialsArray = function(arr, cb) {
       
        let new_arr = {};
        for (let key in arr) {
            let val = this.prepareMaterialItem(arr[key]);
            if (val.isCurrentAction) {
               
                this.materialsSortArray.unshift(val.tid);
            } else {
           
                this.materialsSortArray.push(val.tid);
            }
            if (this.type === 'rolo') {
                if (val.rev === 0) {
                   
                    val.rev = 3;
                }
            }
            val.calc_rev = val.rev;
            val.calc_enabled = val.enabled;


            new_arr[val.tid] = this.inflateMaterialImageArray(val);
        }
        cb(new_arr);
    };


    this.inflateMaterialImageArray = function(val) {
        val.icon = null;
        let ptype = this.type + this.subtype;
        let images = {};
        if (val.img) {




            if (val.img.i) images.ico = 'images/calculator/materials/ico/ico_' + val.tid + '.jpg';
            if (val.img.i1) images.ico1 = 'images/calculator/materials/ico/ico1_' + val.tid + '.jpg';
            if (val.img.i2) images.ico2 = 'images/calculator/materials/ico/ico2_' + val.tid + '.jpg';
            if (val.img.p) images.prv = 'images/calculator/materials/prv/prv_' + ptype + '_' + val.tid + '.png';
            if (val.img.p1) images.prv1 = 'images/calculator/materials/prv/prv1_' + ptype + '_' + val.tid + '.png';
            if (val.img.p2) images.prv2 = 'images/calculator/materials/prv/prv2_' + ptype + '_' + val.tid + '.png';
            if (val.img.l) images.lambr = 'images/calculator/materials/prv/lambr_' + ptype + '_' + val.tid + '.png';




            if (!images.ico) {
                if (images.ico1) images.ico = images.ico1;
                else
                if (images.ico2) images.ico = images.ico2;
            }




        }
        if (images.ico) val.icon = images.ico;
        val.img = images;



        return val;
    }

    this.prepareParamsArray = function(arr) {
      //  Функция, отвечающая за вывод параметров. Отсекает скрытые параметры
        let self = this;
        let new_arr = {};
        for (let key in arr) {
            let val = arr[key];
            if(this.foroomApi.params.dev_mode){
                val.visible = true;
                val.enabled = true;
            }
            if (val.enabled) val.initial_enabled = true;
            else val.initial_enabled = false;
            if (val.visible) val.initial_visible = true;
            else val.initial_visible = false;
            if (val.deleted) {
                val.deleted = true;
                val.enabled = false;
                val.visible = false;
                val.initial_enabled = false;
                val.initial_visible = false;
            } else val.deleted = false;
            //val.enabled = val.visible;
            let images = {};
            if (val.img) {
                let ptype = this.type + this.subtype;

                if (val.img.i) images.ico = 'images/calculator/params/ico/' + ptype + '_' + val.alias + '.jpg';
                if (val.img.p) images.prv = 'images/calculator/params/prv/' + ptype + '_' + val.alias + '.png';
            }
            val.img = images;


            if (typeof val.options !== "undefined" && val.options != null)
                val.options = self.prepareParamsArray(val.options);
            if (typeof val.params !== "undefined" && val.params != null)
                val.params = self.prepareParamsArray(val.params);
            if (!val.deleted || !this.correct_template)
                new_arr[val.alias] = val;
            
        }
        return new_arr;
    };


    this.cb = function() {
        var self = this;
        if (typeof self.timer !== "undefined" && self.timer != null) clearTimeout(self.timer);
        self.timer = setTimeout(function() {
            if (self.oParams && self.oParams.lamels) {
                self.oParams.lamels.reinit = true;
            }
            for (let key in self.callbacks) {
                if (self.callbacks.hasOwnProperty(key)) {
                    if (self.callbacks[key]) self.callbacks[key](self);
                    else self.callbacks[key] = null;
                }
            }
        }, self.timeout);
    };

    this.apply_promo = (promo) => {
        let promo_loc = this.calc.validate_promo(promo);
        if (promo_loc.hasOwnProperty('error')) {
            return 'promo ' + promo + ' not use';
        } else {
            this.promo = promo;
            return 'ok';
        }
    }

    this.get_promo_price = (price, val) => {
        if (val.promo == '') val.promo = this.promo;
        if (val.hasOwnProperty('promo')) {
            let promo_loc = this.calc.validate_promo(val.promo);
            if (promo_loc.hasOwnProperty('error')) {
                return price;
            } else {
                if (promo_loc.mat_ids_json.indexOf(val.value) != -1) {
                    let new_pr = 1 - (parseInt(promo_loc.discont) / 100);
                    new_pr = price * new_pr;
                    new_pr = Math.round(new_pr * 100) / 100;
                    return new_pr;
                }
                else{
                    return price;   
                }
            }
        }

    }

    this.construct(o, calcClass);
};
export default ClassItem;