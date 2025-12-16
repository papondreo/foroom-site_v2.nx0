let ClassItem = function (o, calcClass) {
	this.foroomApi = calcClass.foroomApi;
	this.calcClass = calcClass;
	this.calc = null;
	this.o = null;
	this.template = null;
	this.console_mode = false;
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
	this.cm_array = [];//this.o.cm_array;
	this.pics = {};// this.o.pics;
	this.mat_name = 'Нет';
	this.limits = {};
	this.errors = [];
	this.error = false;
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

	this.izd_ico='';
	this.izd_logo='';

	this.max_dimentions=null;

	this.recommend_dimentions=null;

	this.costtype=0;
	//material.costtype = parseInt(this.options.CostType);




	this.filterCalcMaterials = function () {


		let oW = null;
		let oH = null;
		let oM = null;
		if (this.oParams) {
			if (this.oParams.width && this.oParams.height && this.oParams.material) {
				if (this.oParams.width.gab) oW = this.oParams.width.gab; else oW = this.oParams.width.value;
				if (this.oParams.height.gab) oH = this.oParams.height.gab; else oW = this.oParams.height.value;
				oM = this.oParams.material;
			}
		}


		//console.log('-->',this.oParams.width.gab);


		if (oW && oH && oM) {
			//console.log('ClassItem:filterCalcMaterials',oM);
			for (let key in this.materials) {
				if (this.materials.hasOwnProperty(key)) {
					if (this.materials[key].enabled) {
						/**
						 * @param {{value:int}} oW
						 * @param {{value:int}} hW
						 */


						this.materials[key] = this.setFilterCalcItem(this.materials[key], oW, oH);
						//if (key == 30004862) console.log(this.materials[key]);
						//if (mat.tid === 9948) console.log(9948,this.setFilterCalcItem(mat, oW.value, oH.value));
					}
				}
			}
		}

		//console.log('ITEM:filterCalcMaterials',this.materials);

		//console.log('MATS',this.materials);
	};
	this.setFilterCalcItem = function (item, w, h) {
		function calcRev_1(item, app) {
			let material = {
				gab: {width: 0, height: 0},
				cost: {width: 0, height: 0},
				min: {width: 0, height: 0},
				max: {width: 0, height: 0},
				warranty: {width: 0, height: 0},
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
				gab: {width: 0, height: 0},
				cost: {width: 0, height: 0},
				min: {width: 0, height: 0},
				max: {width: 0, height: 0},
				warranty: {width: 0, height: 0},
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
		mat[1] = calcRev_1(item, this);
		mat[2] = calcRev_2(item, this);


		//console.log('--->',rev);


		if (rev === 1 || rev === 2) {
			//console.log('--->',enabled);

			if (w > mat[rev].max.width || h > mat[rev].max.height) enabled = false;
			if (w < mat[rev].min.width || h < mat[rev].min.height) enabled = false;
			/*
			if (!enabled) {
				console.log(w / 10, ' > ', mat[rev].max.width / 10, ' || ', h / 10, ' > ', mat[rev].max.height / 10);
				console.log(w / 10, ' < ', mat[rev].min.width / 10, ' || ', h / 10, ' < ', mat[rev].min.height / 10);
				//console.log('--->', enabled);
			}

			 */

			//console.log(mat[rev].max.width,'x',mat[rev].max.height);


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
			/*
			if (!enabled) {
				console.log(w / 10, ' > ', mat[1].max.width / 10, ' || ', h / 10, ' > ', mat[1].max.height / 10);
				console.log(w / 10, ' < ', mat[1].min.width / 10, ' || ', h / 10, ' < ', mat[1].min.height / 10);
				console.log(w / 10, ' > ', mat[2].max.width / 10, ' || ', h / 10, ' > ', mat[2].max.height / 10);
				console.log(w / 10, ' < ', mat[2].min.width / 10, ' || ', h / 10, ' < ', mat[2].min.height / 10);
				//console.log('--->', enabled);
			}
			 */



		}
		/*
        if (item.enabled)
                if (this.oParams) {
                    if (this.oParams.MaterialCalc) {
                        let ch = this.oParams.MaterialCalc.value;
                        if (mat[ch]) {

                            console.log(ch, mat[ch].max.width, 'x', mat[ch].max.height);

                        }

                    }

                    //console.log(this.oParams);
                }
        */
		item.calc_rev = rev;
		item.calc_enabled = enabled;


		return item;
	};
	this.applyRelativeOptions = function (material) {
		let materialOptMap = {
			GabWidth: ['gab', 'width'],
			GabHeight: ['gab', 'height'],
			CostWidth: ['cost', 'width'],
			CostHeight: ['cost', 'height'],
		};
		for (let key in this.options) {
			let val = parseFloat(this.options[key]);
			if (materialOptMap[key]) {
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
					//console.log(param1, param2, this.oParams[param2].value, param2option, val);
					//console.log(key, this.options[key]);
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
		/**/
		if (this.oParams.height) {
			let gab = material.gab[this.oParams.height.alias];
			let cost = material.cost[this.oParams.height.alias];
			this.oParams.height.gab_min = material.min[this.oParams.height.alias] + gab;
			this.oParams.height.gab_max = material.max[this.oParams.height.alias] + gab;
			this.oParams.height.cost_min = material.min[this.oParams.height.alias] + cost;
			this.oParams.height.cost_max = material.max[this.oParams.height.alias] + cost;
			this.oParams.height.gab = this.oParams.height.value + gab;
			this.oParams.height.cost = this.oParams.height.value + cost;
			/*
                        if (this.oParams.gab_height){
                            this.oParams.gab_height.min=this.oParams.height.gab_min;
                            this.oParams.gab_height.max=this.oParams.height.gab_max;
                            this.oParams.gab_height.setVal(this.oParams.height.gab);

                        }
                        */
		}
	};

	this.construct = function (o, calcClass) {
		let self = this;
		this.calc = calcClass;
		if (this.calc.callbacks) this.callbacks = this.calc.callbacks;
		this.o = o;
		if (typeof self.o !== "undefined" && self.o != null) self.o = self.foroomApi.clone(self.o);
		if (typeof this.o.cm_array !== "undefined" && this.o.cm_array != null) this.cm_array = this.o.cm_array;
		//if (typeof this.o.pics !== "undefined" && this.o.pics !=null) 	this.pics = this.o.pics;
		if (this.calc) {
			if (typeof this.calc.pics !== "undefined" && this.calc.pics != null) this.pics = this.calc.pics;
			//console.log('ClassItem:construct',this.pics.resolution, calcClass);
			if (this.calc.filters_map) this.filters_map = this.calc.filters_map;
			if (this.calc.filter) this.filter = this.calc.filter;
			if (this.calc.all_actions) this.calc_all_actions = this.calc.all_actions;


		}
		if (this.o != null) {
			if (typeof this.o.ptype !== "undefined" && this.o.ptype != null) this.type = this.o.ptype;
			if (typeof this.o.category !== "undefined" && this.o.category != null) this.subtype = this.o.category;

			if (this.calc && this.calc.max_dimentions) {
				if (this.calc.max_dimentions[this.type]) this.max_dimentions = this.calc.max_dimentions[this.type];
			}


			//console.log(this.pics);
			if (this.foroomApi && this.foroomApi.params) {
				if (this.foroomApi.params.foroom_pics_url) this.foroom_pics_url = this.foroomApi.params.foroom_pics_url;
				if (this.foroomApi.params.console_mode) this.console_mode = this.foroomApi.params.console_mode;
			}

			if (this.o.icon) this.izd_logo = this.foroom_pics_url+'logos/'+this.type+'_ball.png';
			if (this.o.icom) this.izd_ico = this.foroom_pics_url+''+this.o.icom;


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


			//console.log(self.type, self.subtype, self.params);


			if (typeof self.o.materials !== "undefined" && self.o.materials != null) {
				self.applyCurrentActions(self.o.materials, function (materials_action) {
					self.prepareMaterialsArray(materials_action, function (materials) {
						//	console.log('materials',self.type, materials);
						self.materials = materials;
						self.options.DefaultMaterial = self.getFirstMaterial(materials);
					});
				});
			}
			if(!this.strings) this.strings={};

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

	this.init = function (template=null, callback=null) {
		let self = this;
		if (template) this.template = self.foroomApi.clone(template);
		if (this.o != null) {
			//console.log('ACTIONS',this.all_actions);
			//delete(this.o);
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
			let material = this.strings.material;
			material.val = this.options.DefaultMaterial;
			material.enabled = true;
			material.visible = true;
			material.typ = 'material';
			//console.log('ClassItem:self.materials',self.materials);
			if (self.console_mode) material.val = 0;
			this.oParams.material = new self.foroomApi.ParamMaterial(material, self);
			/*
            let height = this.strings.height;
            height.val=parseFloat(this.options.DefaultHeight);
            height.enabled=1;
            let width = this.strings.width;
            width.val=parseFloat(this.options.DefaultWidth);
            width.enabled=1;
            let amount = this.strings.amount;
            amount.val=1;
            amount.enabled=1;
            amount.min_v=1;
            amount.max_v=99;
            this.oParams.width=new foroomApi.ParamDimention(width,self);
            this.oParams.height=new foroomApi.ParamDimention(height,self);
            this.oParams.amount=new foroomApi.ParamText(amount,self);
            */
			let sale = this.strings.sale;
			sale.val = 0;
			sale.typ = "text";
			sale.enabled = self.discount > 0 ? true : false;
			sale.min_v = 0;
			sale.max_v = self.discount;
			this.oParams.sale = new self.foroomApi.ParamText(sale, self);
			let rol_width = this.strings.rol_width;
			rol_width.val = 0;
			rol_width.typ = "label";
			rol_width.enabled = this.deltas.rol_width ? true : false;
			rol_width.visible = this.deltas.rol_width ? true : false;
			rol_width.min_v = 0;
			rol_width.max_v = 99999;
			this.oParams.rol_width = new self.foroomApi.ParamLabel(rol_width, self);
			for (let key in this.params) {
				let val = this.params[key];
				//console.log(key);
				if (self.console_mode) if (val.visible) val.val = 0;
				if (val.typ === 'radio') val.typ = 'select';
				//if (val.typ =='lamels_radio') val.typ = 'lamels_select';
				//if (val.typ =='radio') self.oParams[key] =new foroomApi.ParamSelect(val);
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
			this.init_local();
			this.collectCostRelatives(function () {
				if (typeof self.template !== "undefined" && self.template != null)
					self.setTemplate();
				else
					self.setDefaults();
				if (typeof callback !== "undefined" && callback != null) callback();
			});
		} else alert('EMPTY ITEM-OBJECT');
	};

	this.smartRepairErrors = function () {};
	this.addLocalPrice = function (o) {};
	this.setValCallback = function(o) {};
	this.init_local = function () {};


	/*
	this.applyParamDeltas = function (oParam) {
		//let deltas = {};

		console.log('DELTAS', this.deltas);
		for (let key in this.deltas) {
			if (this.oParams[key]) {
				let new_value = 0;
				let param_deltas = this.deltas[key];
				for (let pkey in param_deltas) {
					if (this.oParams[pkey]) {
						let param_value = parseFloat(this.oParams[pkey].value);
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
				//console.log('SetDeltas',this.oParams[key],new_value);
				if (this.oParams[key].cm) new_value = new_value / 10;
				this.oParams[key].setVal(new_value);
			}
			//console.log(this.alias,key,val);
		}
	};

 */


	this.applyParamDeltas = function (oParam) {
		//console.log('ITEM:applyParamDeltas');
		//let deltas = {};
		//console.log('DELTAS', this.deltas,oParam.alias,this.deltas[oParam.alias]);
		if (this.deltas[oParam.alias]) {
			let new_value = 0;
			let param_deltas = this.deltas[oParam.alias];
			for (let pkey in param_deltas) {
				if (this.oParams[pkey]) {
					let param_value = parseFloat(this.oParams[pkey].value);
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
			//console.log('SetDeltas',oParam.value,new_value);
			oParam.setVal(new_value);
		}
		//console.log(this.alias,key,val);
	};

	this.setDefaults = function () {
		let self = this;
		for (let key in self.oParams) {
			let val = self.oParams[key];
			if (val) {
				if (typeof val !== "undefined" && val != null) {
					if (val.setVal) {
						//console.log('Item:setDefaults',val.alias,val.value);
						val.setVal(val.value);
					}
				}
			}
		}
	};

	this.setTemplate = function () {
		let self = this;
		if (typeof self.template.sale !== "undefined" && self.template.sale != null) self.sale = self.template.sale;
		for (let key in self.oParams) {
			let val = self.oParams[key];
			//console.log("ClassItem:setTemplate",key,val);
			if (typeof val !== "undefined" && val != null) {
				let value = val.value;
				if (self.template[key])
					value = self.template[key];
				//console.log("ClassItem:setTemplate",key,self.template[key],value);
				if ((value instanceof Object) && (self.foroomApi.isEmptyObject(value))) value = null;
				if ((value instanceof Array) && (value.length <= 0)) value = null;
				if (value != null) {
					val.setVal(value);
				}
			}
		}
		if (!self.template.width && self.oParams.width) {
			let val = 0;
			if (self.template.cost_width) {
				val = parseFloat(self.template.cost_width);
				if (val > 0) self.oParams.width.setAltVal(val,'cost');
			} else
			if (self.template.gab_width) {
				val = parseFloat(self.template.gab_width);
				if (val > 0) self.oParams.width.setAltVal(val,'gab');
			}
		}
		if (!self.template.height && self.oParams.height) {
			let val = 0;
			if (self.template.cost_height) {
				val = parseFloat(self.template.cost_height);
				if (val > 0) self.oParams.height.setAltVal(val,'cost');
			} else
			if (self.template.gab_height) {
				val = parseFloat(self.template.gab_height);
				if (val > 0) self.oParams.height.setAltVal(val,'gab');
			}
		}
	};

	this.calcPrice = function (recalc = true) {
		//console.log('ITEM:calcPrice', this.template);
		let template = {};
		let preview = {};
		this.filterCalcMaterials();

		for(let k in this.oParams) {
			if (this.oParams.hasOwnProperty(k)) {
				if (this.oParams[k].oParams) {

					for (let k1 in this.oParams[k].oParams) {
						if (this.oParams[k].oParams.hasOwnProperty(k1)) {
							this.applyParamDeltas(this.oParams[k].oParams[k1]);
							if (this.oParams[k].oParams[k1].applyConditions) this.oParams[k].oParams[k1].applyConditions();
							if (this.oParams[k].oParams[k1].validate) this.oParams[k].oParams[k1].validate();
						}
					}
				}
				/*
                                if (this.oParams[k].altItems) {
                                    for (let k1 in this.oParams[k].altItems) {
                                        //console.log(k, this.oParams[k].altItems);
                                        if (this.oParams[k].altItems.hasOwnProperty(k1)) {
                                            this.applyParamDeltas(this.oParams[k].altItems[k1]);
                                            if (this.oParams[k].altItems[k1].applyConditions) this.oParams[k].altItems[k1].applyConditions();
                                            //if (this.oParams[k].altItems[k1].validate) this.oParams[k].altItems[k1].validate();
                                        }
                                    }
                                }

                                */

				this.applyParamDeltas(this.oParams[k]);
				if (this.oParams[k].applyConditions) this.oParams[k].applyConditions();
				if (this.oParams[k].validate) this.oParams[k].validate();
			}
		}
		if (this.oParams.lamels) this.oParams.lamels.recalc();
		this.oParams.material.validate();
		this.smartRepairErrors();
		let price = 0;
		let old_price = 0;
		if (typeof this.oParams.material !== "undefined" && this.oParams.material != null) {
			this.oParams.material.price = this.getMaterialPrice(this.oParams.material, null);
			if (this.oParams.material.isCurrentAction) this.oParams.material.old_price = this.getMaterialOldPrice(this.oParams.material);
		}
		for (let key in this.oParams) {
			let val = this.oParams[key];
			if (typeof val.getParamPrice !== "undefined" && val.getParamPrice != null) {
				if (val.enabled) {
					template = val.release(template);
					preview = val.preview(preview);
					//	console.log(val.currentActionInfo);
					let param_price = val.getParamPrice();
					//	console.log(val.alias, param_price);
					price += param_price;
					if (val.old_price) old_price += val.old_price; else old_price += param_price;
				}
			} else {
				if (typeof val.price !== "undefined" && val.price != null) price += val.price; else val.price = 0;
				if (typeof val.old_price !== "undefined" && val.old_price != null) old_price += val.old_price; else val.old_price = 0;
			}
		}
		if (this.price == 0) recalc = true;
		if (recalc) {
			this.old_price = old_price * this.margin;
			this.price = price * this.margin;
			if (this.old_price > this.price) {
				this.perc = Math.round(100 - 100 * this.price / this.old_price);
			} else {
				this.perc = Math.round(100 - 100 * this.old_price / this.price);
			}
			this.old_price = Math.round(this.old_price * 100) / 100;
			this.price = Math.round(this.price * 100) / 100;
		}

		if (typeof this.oParams.sale !== "undefined" && this.oParams.sale != null)
			this.sale_price = Math.round((this.price - this.price * (this.oParams.sale.value / 100)) * 100) / 100;
		else
			this.sale_price = this.price;
		if (this.oParams.amount) {
			let amount = this.oParams.amount.value;
			this.old_summ = Math.round(this.old_price * amount * 100) / 100;
			this.summ = Math.round(this.price * amount * 100) / 100;
		}
		if(this.old_price === this.price || this.old_price === 0) this.old_price = null;
		if(this.old_summ === this.summ || this.old_summ === 0) this.old_summ = null;
		if(this.perc === 0) this.perc = null;

		this.salePrice = this.sale_price;

		/*
		console.log('PRICE', this.price);
		console.log('OLD_PRICE', this.old_price);
		console.log('PERC', this.perc);
		console.log('ERRORS', this.errors);
*/

		template=this.releaseItem(template);
		preview = this.previewItem(template, preview);
		this.template = template;
		this.templatePrv = preview;

		/*
		//console.log('TEMPLATE',this.template);
		//console.log('PREVIEW',this.templatePrv);
		console.log('calc.current_item.max_dimentions', this.max_dimentions);
		console.log('let dim = calc.current_item.getRecommendDimentions():');

		let dim = this.getRecommendDimentions();

		console.log('Ограничение ввода ДО (ширина, высота) dim.max_to',dim.max_to);
		console.log('Для выбора Ширины до this.max_dimentions.width ('+this.max_dimentions.width+'), уменьшите Высоту до dim.reduce_to.height ('+dim.reduce_to.height+')');
		console.log('Для выбора Высоты до this.max_dimentions.height ('+this.max_dimentions.height+'), уменьшите Ширину до dim.reduce_to.width ('+dim.reduce_to.width+')');
*/
		/*
                if(max_dimentions.width !== dim.max_to.width) showAlert_Width(); else hideAlert_Width();
                if(max_dimentions.height !== dim.max_to.height) showAlert_Height(); else hideAlert_Height();

        */

		this.cb();
	};


	this.getRecommendDimentions = function() {
		let w=0;
		let h=0;
		let rev = 0;
		if (this.oParams.width) w = this.oParams.width.value; // console.log('width', 'min='+this.oParams.width.min, 'max='+this.oParams.width.max);
		if (this.oParams.height) h = this.oParams.height.value;  //console.log('height', 'min='+this.oParams.height.min, 'max='+this.oParams.height.max);
		if (this.oParams.MaterialCalc) rev = this.oParams.MaterialCalc.value;  //console.log('height', 'min='+this.oParams.height.min, 'max='+this.oParams.height.max);
		this.recommend_dimentions = this.calc.getRecommendDimentions(this.type, w, h, rev);
		return this.recommend_dimentions;
	}


	this.release = function() {
		return this.template;
	};


	this.previewItem = function(template, ar) {
		//console.log('STRINS',this.strings);
		ar.warranty = {
			alias: 'warranty',
			key: 0,
			name: this.strings.warranty?this.strings.warranty.name:'',
			val: this.strings.warranty?this.strings.warranty.mesure:'',
			mes: '',
			descr:this.strings.warranty?this.strings.warranty.descr:'',
		};
		for (let k in this.strings) {
			if (this.strings.hasOwnProperty(k) && this.strings[k]) {
				if (!ar[k]) {
					if (typeof this[k] !== "undefined" && this[k] != null) ar[k] = {alias: k, key: 0, name: this.strings[k].name, val: this[k], mes: this.strings[k].mesure, descr:''};
				}
			}
		}

		//if (ar.perc) delete(ar.perc);
		if (this.warranty.width && this.warranty.height) {
			if (ar.warranty) delete(ar.warranty);
		}

		return ar;
	};

	this.releaseItem = function(ar) {
		ar.type = this.type;
		ar.subtype = this.subtype;
		ar.warranty = 0;
		if (!this.warranty.width || !this.warranty.height) ar.warranty = 1;
		ar.price = this.price;
		ar.sale_price = this.sale_price;
		ar.perc = this.perc;
		if (this.old_price > 0 && this.old_price > this.price) ar.old_price = this.old_price;
		return ar;
	};

	this.getMaterialPrice = function (material, cost) {
		return 0.00;
	};
	this.getMaterialOldPrice = function (material) {
		if (material.isCurrentAction && material.currentActionInfo && material.currentActionInfo.show_old_price) {
			return this.getMaterialPrice(material, material.currentActionInfo.old_cost);
		}
		return 0.00;
	};
	this.setParam = function (key, val) {
		if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) {
			this.oParams[key].setVal(val);
		}
	};
	this.enableParam = function (key) {
		let option = null;
		let param = null;
		if (key.indexOf('_') != -1) {
			let spl = key.split('_');
			if (spl.length > 1) {
				option = spl.pop();
				param = spl.join('_');
			}
		}
		//console.log('key=>param:option',key, param,option);
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
	this.disableParam = function (key) {
		let option = null;
		let param = null;
		if (key.indexOf('_') != -1) {
			let spl = key.split('_');
			if (spl.length > 1) {
				option = spl.pop();
				param = spl.join('_');
			}
		}
		//console.log('key=>param:option',key, param,option);
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
	this.get_mat_action_params = function (material) {
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
		let colors={};
		let isCurrentAction = false;
		if (material.enabled) {
			for (let key in this.all_actions) {
				let val = this.all_actions[key];
				material.currentActionInfo = {};
				material.isCurrentAction = false;
				if (val.mat_ids_json.indexOf(tid)!= -1) {

					isCurrentAction = true;
					perc = 1 - (parseInt(val.perc) / 100);
					old_cost = cost / perc;
					old_cost = Math.round(old_cost * 100) / 100;
					action_name = val.name;
					action_alias = val.alias;
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
						show_old_price: show_old_price,
						img_class: img_class,
						slider_top: slider_top,
						slider_top_json: slider_top_json,
						alias: action_alias,
						name: action_name,
						perc: perc,
						colors:colors,
					};
					material.isCurrentAction = isCurrentAction;
					break;
				}
			}
		}
		return material;
	};
	this.getFirstMaterial = function (materials) {
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
		//console.log('FIRST', materials[first])
		return first;
	};
	this.applyCurrentActions = function (arr, cb) {
		let self = this;
		let ptype = self.type + self.subtype;
		if (typeof self.calc_all_actions !== "undefined" && self.calc_all_actions != null) {
			for (let key in self.calc_all_actions) {
				let val = self.calc_all_actions[key];
				if ((val.izd_types_json.indexOf(ptype) != -1) || (val.izd_types_json.indexOf(self.type) != -1)) {
					self.all_actions[self.all_actions.length] = val;
				}
			}
		}
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
	this.collectCostRelatives = function (callback) {
		let self = this;
		for (let key in self.oParams) {
			let val = self.oParams[key];
			let param = val.o;
			//console.log('collectCostRelatives', key, param);
			if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null) self.oParams[key].costRelatives = {};
			if (param) {
				if (self.foroomApi.isEmptyObject(param.options)) {
					if (param.cost_relate != '0')
						if (typeof self.oParams[param.cost_relate] !== "undefined" && self.oParams[param.cost_relate] != null) {
							self.oParams[param.cost_relate].costRelate = key;
							if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null)
								self.oParams[key].costRelatives[param.cost_relate] = self.oParams[param.cost_relate];
							//console.log('CostRelate for ('+self.oParams[param.cost_relate].alias+')',self.oParams[param.cost_relate].costRelate);
							//console.log('CostRelative from ('+key+')',self.oParams[key].costRelatives);
						}
				} else
					for (let k in param.options) {
						let v = param.options[k];
						if (v.cost_relate != '0')
							if (typeof self.oParams[v.cost_relate] !== "undefined" && self.oParams[v.cost_relate] != null) {
								self.oParams[v.cost_relate].costRelate = key;
								if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null) self.oParams[key].costRelatives[v.cost_relate] = self.oParams[v.cost_relate];
								//		console.log('CostRelate for ('+self.oParams[v.cost_relate].alias+')',self.oParams[v.cost_relate].costRelate);
								//console.log('('+key+') CostRelative from',self.oParams[key].costRelatives, v.cost_relate, key);
							}
					}
			}
		}
		callback();
	};
	this.pushError = function (field) {
		this.errors[this.errors.length] = field;
		this.errors = this.foroomApi.array_unique(this.errors);
		if (this.errors.length <= 0) this.error = false; else this.error = true;
	};
	this.popError = function (value) {
		//console.log('TEXT Popping ERROR '+value);
		let idx = this.errors.indexOf(value);
		if (idx != -1) {
			this.errors.splice(idx, 1);
		}
		if (this.errors.length <= 0) this.error = false; else this.error = true;
	};
	this.getError = function (value) {
		let idx = this.errors.indexOf(value);
		if (idx != -1) return true;
		return false;
	};

	this.check_errors = function () {
		let self = this;
		for (let key in self.oParams) {
			let val = self.oParams[key];
			if (val.error) self.error = true;
			//console.log()
		}
		//return false;
	};

	this.controlHeightCorrection = function (param) {
	};
	this.setMaterialCalc = function (material, cb) {
		if (typeof material !== "undefined" && material != null) {
			this.applyRelativeOptions(material);
			material.min.width = parseFloat(this.materials[material.value].minWidth);
			//this.min_w_tmp = parseFloat(this.materials[material.value].minWidth);
			material.min.height = parseFloat(this.materials[material.value].minHeight);
			material.rev = parseInt(this.materials[material.value].rev);
			material.max.width = parseFloat(this.materials[material.value].maxWidth);
			material.max.height = parseFloat(this.materials[material.value].maxHeight);
			material.warranty.width = parseInt(this.options.WarrantyWidth);
		}
		if (typeof this.oParams !== "undefined" && this.oParams != null) {
			if (typeof this.oParams.MaterialCalc !== "undefined" && this.oParams.MaterialCalc != null) {
				this.oParams.MaterialCalc.value = 0;
				this.oParams.MaterialCalc.enabled = false;
			}
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
	this.prepareMaterialsArray = function (arr, cb) {
		//console.log('prepareMaterialsArray');
		let new_arr = {};
		for (let key in arr) {
			let val = arr[key];
			if (val.isCurrentAction) {
				//console.log('unshift',val.name,val.currentActionInfo);
				this.materialsSortArray.unshift(val.tid);
			} else {
				//console.log('push',val.name);
				this.materialsSortArray.push(val.tid);
			}
			if (this.type === 'rolo') {
				if (val.rev === 0) {
					//console.log('SET REV to 3', val.tid,val.rev);
					val.rev = 3;
				}
			}
			val.calc_rev = val.rev;
			val.calc_enabled = val.enabled;
			new_arr[val.tid] = val;
		}
		cb(new_arr);
	};
	this.prepareParamsArray = function (arr) {
		let self = this;
		let new_arr = {};
		for (let key in arr) {
			let val = arr[key];
			//val.enabled = val.visible;
			if (typeof val.options !== "undefined" && val.options != null)
				val.options = self.prepareParamsArray(val.options);
			if (typeof val.params !== "undefined" && val.params != null)
				val.params = self.prepareParamsArray(val.params);
			if (!val.deleted)
				new_arr[val.alias] = val;
		}
		return new_arr;
	};



	this.cb = function () {
		var self = this;
		if (typeof self.timer !== "undefined" && self.timer != null) clearTimeout(self.timer);
		self.timer = setTimeout(function () {
			for (let key in self.callbacks) {
				if (self.callbacks.hasOwnProperty(key)) {
					if (self.callbacks[key]) self.callbacks[key](self); else self.callbacks[key] = null;
				}
			}		}, self.timeout);



	};

	this.construct(o, calcClass);
};
export default ClassItem;
