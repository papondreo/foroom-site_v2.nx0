let ClassParamKarniz = function(o, item) {
	this.foroomApi = item.foroomApi;
	this.app = item;
	this.o = o;
	this.all_karn_data = null;
	this.tree = null;
	this.goods = null;
	//console.log('O KARNIZ',o);
	/**/
	this.timeout = 300;
	this.type = '';
	this.alias = '';
	this.descr = '';
	this.name = '';
	this.enabled = false;
	this.visible = false;
	this.related = false;
	this.value = 0;
	this.defaultValue = 0;
	this.defaultEnabled = true;
	this.min = 0;
	this.max = 0;
	this.error = false;
	this.error_description = '';
	this.relatedItems = {};
	this.dom = null;
	this.eventDom = null;
	this.prefix = '';
	this.paramCost = 0;
	this.paramPerc = 0;
	this.price = 0;
	this.old_price = 0;
	this.mesure = '';
	this.pics = {};
	this.conditionRelates = {};
	this.costRelate = '';
	this.costRelatives = {};
	this.cm = false;
	this.timer = null;
	this.domOptions = {};
	this.params = {};
	this.oParams = {};
	this.useInPreview = false;
	this.previewParams = null;
	this.initial_enabled=false;
	this.initial_visible=false;
	this.deleted = false;
	this.all_actions=null;
	this.currentActionInfo = null;
	this.currentAction = false;


	this.init = function (o, item) {
		//let self = this;
		if (typeof item !== "undefined" && item != null && typeof o !== "undefined" && o != null) {
			//console.log('item:all_karn_data',item.all_karn_data);
			if (item.all_karn_data) {
				this.all_karn_data = item.all_karn_data;
				if (item.all_karn_data.tree) this.tree = item.all_karn_data.tree;
				if (item.all_karn_data.goods) this.goods = item.all_karn_data.goods;
				//console.log('TREE', this.tree);
			}
			this.template = item.template;
			this.gab_plus = item.gab_plus;
			this.type = item.type;
			this.subtype = item.subtype;
			this.conditions = item.conditions;
			this.deltas = item.deltas;
			this.discount = item.discount;
			this.id = item.id;
			this.materials = item.materials;
			this.name = item.name;
			this.options = item.options;
			this.strings = item.strings;
			this.tid = item.tid;
			this.input_size_mode = item.input_size_mode;
			this.arr = item.arr;
			this.materialRest = item.materialRest;
			this.warranty = item.warranty;
			this.cm_array = item.cm_array;
			this.pics = item.pics;
			this.mat_name = item.mat_name;
			this.limits = item.limits;
			this.all_actions = item.all_actions;
			//this.errors=					item.errors;
			this.error = item.error;
			this.error_description = item.error_description;
			if (this.o.enabled) this.enabled = true;
			if (this.o.initial_enabled) this.initial_enabled = true;
			if (this.o.visible) this.visible = true;
			if (this.o.initial_visible) this.initial_visible = true;

			if (this.o.deleted) {
				this.deleted = true;
				this.enabled = false;
				this.visible = false;
				this.initial_enabled = false;
				this.initial_visible = false;
			}
			//console.log('KARN CONDITIONS', this.alias, this.conditions);
			//console.log('all_actions', this.alias, this.app.all_actions);


			this.smartRepairErrors = function () {
				item.smartRepairErrors();
			};
			this.addLocalPrice = function (k) {
				item.addLocalPrice(k);
			};
			this.applyDeltas = function () {
				item.applyDeltas();
			};
			this.init_local = function () {
				item.init_local();
			};
			this.log = function (k) {
				item.log(k);
			};
			this.getMaterialPrice = function (k) {
				item.getMaterialPrice(k);
			};
			this.getFirstMaterial = function (k) {
				item.getFirstMaterial(k);
			};
			this.pushError = function (k) {
				item.pushError(k);
			};
			this.popError = function (k) {
				item.popError(k);
			};
			this.getError = function (k) {
				item.getError();
			};
			this.controlHeightCorrection = function (k) {
				item.controlHeightCorrection(k);
			};
			this.setMaterialCalc = function (k, cb) {
				item.setMaterialCalc(k, cb);
			};
			//this.prepareMaterialsArray =   item.prepareMaterialsArray  ;
			//this.prepareParamsArray = 	   item.prepareParamsArray	   ;
			//this.render= 				   item.render				   ;
			this.calcPrice = function () {
				item.calcPrice();
			};

/*
			this.inflateMaterialImageArray = function(val) {
				return 	item.inflateMaterialImageArray(val);
			}
*/
			this.timeout = item.timeout;
			this.type = o.typ;
			//	this.renderError = function(k) {o.renderError;};
			this.alias = o.alias;
			if (this.app.previewParams) {
				this.previewParams = this.app.previewParams;

				if (this.app.previewParams.indexOf(this.alias) !== -1) {
					this.useInPreview = true;
				}
			} else {
				this.useInPreview = true;
			}
			this.initClass();
		}
	}; // init

	this.getParamPrice = function () {
		return this.price;
	};
	this.domCreate__ = function () {
	};

	this.setVal = function (val) {
		//console.log('ParamKarniz:setVal', val);
		if ((val instanceof Object) || (val instanceof Array)) {
			//console.log('ParamKarniz:setVal', val);
			for (let key in val) {
				let v = val[key];
				if (this.oParams[key]) this.oParams[key].setVal(v);
			}
		} //else this.oParams.arch.setVal(1);
	};

	/**/
	this.setParam = function (key, val) {
		if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) {
			this.oParams[key].setVal(val);
		}
	};

	this.enableParam = function (key) {
		this.app.enableParam(key);
		//if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) this.oParams[key].enable();
	};

	this.disableParam = function (key) {
		this.app.disableParam(key);
		//if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) this.oParams[key].disable();
	};

	this.setTemplate = function () {
	};

	this.collectCostRelatives = function (callback) {
		let self = this;
		for (let key in self.oParams) {
			let val = self.oParams[key];
			let param = val.o;
			if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null) self.oParams[key].costRelatives = {};
			if (self.foroomApi.isEmptyObject(param.options)) {
				if (parseInt(param.cost_relate) !== 0)
					if (typeof self.oParams[param.cost_relate] !== "undefined" && self.oParams[param.cost_relate] != null) {
						self.oParams[param.cost_relate].costRelate = key;
						if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null)
							self.oParams[key].costRelatives[param.cost_relate] = self.oParams[param.cost_relate];
					}
			} else {
				for (let k in param.options) {
					let v = param.options[k];
					if (parseInt(v.cost_relate) !== 0)
						if (typeof self.oParams[v.cost_relate] !== "undefined" && self.oParams[v.cost_relate] != null) {
							self.oParams[v.cost_relate].costRelate = key;

							if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null) self.oParams[key].costRelatives[v.cost_relate] = self.oParams[v.cost_relate];
						}
				}
			}
		}
		callback();
	};

	this.setDefaults = function () {
		let self = this;
		//console.log(self.oParams);
		for (let key in self.oParams) {
			let val = self.oParams[key];
			if (typeof val !== "undefined" && val != null)
					val.setVal(val.value);
		}
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

	this.calcPriceEvent = function () {
	};
	this.calcPrice = function () {
	};

	this.renderError = function () {
		let self = this;
		for (let key in self.oParams) {
			let val = self.oParams[key];
			if (val.error) {
				if (val.visible)
					self.pushError(val.alias);
				else {
					val.error_description = '';
					self.popError(val.alias);
				}
			} else
				self.popError(val.alias);
			val.renderError();
		}
	};


	this.setValCallback = function (o) {
	};
	this.validate = function () {
		let tube = null;
		let bracket = null;
		let holder = null;
		//console.log('KARNIZ VALIDATE');
		let price = 0;
		let old_price = 0;
		this.price = 0;
		this.old_price = 0;
		this.isCurrentAction = false;
		this.currentActionInfo = null;
		if (this.oParams) {
			for (let key in this.oParams) {
				if (this.oParams.hasOwnProperty(key)) {
					if (this.oParams[key].enabled) {
						if (this.oParams[key].isCurrentAction && this.oParams[key].currentActionInfo) {
							this.isCurrentAction = this.oParams[key].isCurrentAction;
							this.currentActionInfo = this.oParams[key].currentActionInfo;
						}

						let paramCost = this.oParams[key].paramCost;
						let paramOldCost = this.oParams[key].paramOldCost ? this.oParams[key].paramOldCost : this.oParams[key].paramCost;
						if (this.oParams[key].type === 'karniz_material') {
							if (this.oParams[key].amountParam) {
								price += this.oParams[key].amountParam.value * paramCost;
								old_price += this.oParams[key].amountParam.value * paramOldCost;

								//console.log('ParamKarniz:validate:',key,this.oParams[key].paramOldCost);


							} else {
								price += paramCost;
								old_price += paramOldCost;
							}
						} else {
							price += paramCost;
							old_price += paramOldCost;
						}
					}



				//	console.log('ParamKarniz:validate', this.oParams[key].paramCost, this.oParams[key].paramOldCost)



					if (this.oParams[key].create_materialsSortArray) this.oParams[key].create_materialsSortArray();
				}
			}

			//console.log('ParamKarniz:validate',price, old_price);
			if(price === old_price) old_price=0;

			this.price = price;
			this.old_price = old_price;



			if (this.oParams.karn_tube1_type) {tube = this.oParams.karn_tube1_type}
			if (this.oParams.karn_bracket_type) {bracket = this.oParams.karn_bracket_type}
			if (this.oParams.karn_holder_type) {holder = this.oParams.karn_holder_type}

			if ((tube && bracket) || (tube && holder)) {
				if ((tube.value>0 && bracket.value>0) || (tube.value>0 && holder.value>0)) {
					this.error=false;
				} else {
					this.error=true;
				}
			} else {
				this.error=true;
			}

		}

		if (this.error) {
			this.error_description = 'Минимальная комплектация карниза - Труба и Кронштейн или Труба и Держатель штанги';
			this.app.pushError(this.alias);

		} else {
			this.error_description = '';
			this.app.popError(this.alias);

		}


	};

	this.initClass = function () {
		let self = this;
		if (typeof this.o !== "undefined" && this.o != null) this.o = self.foroomApi.clone(this.o);
		this.params = o.params;
		if (typeof this.app.type !== "undefined" && this.app.type != null && typeof this.app.subtype !== "undefined" && this.app.subtype != null) this.prefix = this.app.type + this.app.subtype + '_';
		if (typeof this.o.name !== "undefined" && this.o.name != null) this.name = this.o.name;
		if (typeof this.o.alias !== "undefined" && this.o.alias != null) this.alias = this.o.alias;
		this.oParams = {};
		for (let key in self.params) {
			let val = self.params[key];
			let karnEl = val.alias.replace('karn_', '').replace('_type', '');
			let treeEl = karnEl.replace(/[^a-z]/g, '');
			val.treeEl = treeEl;
			val.karnEl = karnEl;
			//console.log('ALIAS KARN O',val);
			//if (val.typ === 'radio') val.typ = 'select';
			if (val.typ === 'radio') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
			if (val.typ === 'text') self.oParams[key] = new self.foroomApi.ParamText(val, self);
			if (val.typ === 'label') self.oParams[key] = new self.foroomApi.ParamLabel(val, self);
			if (val.typ === 'select') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
			if (val.typ === 'karniz_material') {
				if (self.tree && self.tree[treeEl] && self.goods) {
					//	if (self.tree[treeEl][1]) val.tree = self.tree[treeEl][1]; else
					val.tree = self.tree[treeEl];
					let materials = {};
					for (let line in val.tree) {
						for (let diameter in val.tree[line]) {
							for (let color in val.tree[line][diameter]) {
								for (let k in val.tree[line][diameter][color]) {
									let v = val.tree[line][diameter][color][k];
									//let mat = self.inflateMaterialImageArray(self.goods[v]);

									//console.log('MAT',mat)
									//materials[v] = mat;
									materials[v] = self.goods[v];

								}
							}
						}
					}
					val.materials = materials;
				}

				//console.log('KARN_MATERIALS',val.materials);
				self.oParams[key] = new self.foroomApi.ParamKarnizMaterial(val, self);
			}

		}
		//this.init_local();

		this.collectCostRelatives(function () {
			if (typeof self.template !== "undefined" && self.template != null)
				self.setTemplate();
			else
				self.setDefaults();
		});
	};
	this.release = function (ar) {
		let ret = {};
		for (let key in this.oParams) {
			let val = this.oParams[key];
			if (val.visible) {
				ret = val.release(ret);
			}
			ar[this.alias] = ret;
		}
		return ar;
	};



	/*
	this.preview = function(ar) {
		let ret = {};
		for (let key in this.oParams) {
			let val = this.oParams[key];
			if (val.visible) {
				ret = val.preview(ret);
			}
			ar[this.alias] = ret;
		}
		return ar;
	};
*/
	this.preview = function(ar) {
		for (let key in this.oParams) {
			let val = this.oParams[key];
			if (val.visible && !val.removeFromPreview) {
				ar = val.preview(ar);
			}
		}


		//console.log('--->',this.isCurrentAction,this.currentActionInfo);

		if (this.isCurrentAction && this.currentActionInfo) {
			ar.current_action = {
				alias: 'current_action',
				key: 0,
				name: this.strings.current_action ? this.strings.current_action.name : '',
				val: this.currentActionInfo.name,
				mes: ''
			};
		}


		return ar;
	};


	this.init(this.o, this.app);

};//class
export default ClassParamKarniz;
