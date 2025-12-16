let ClassParam = function(classItem) {
	this.foroomApi = classItem.foroomApi;
	this.classItem = classItem;
	this.strings = classItem.strings;
	this.costtype = classItem.costtype;

	//console.log('ClassParam:costtype',this.costtype);
	this.typ = null;
	this.type = '';
	this.app = null;
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
	this.paramOldCost = 0;
	this.paramPerc = 0;
	this.price = 0;
	this.old_price = 0;
	this.options = null;
	this.timer = null;
	this.mesure = '';
	this.timeout = 200; //ms
	this.pics = {};
	this.conditionRelates = {};
	this.costRelate = '';
	this.costRelatives = {};
	this.lamels = false;
	this.karniz = false;
	this.cm = false;
	this.deltas = {};
	this.img = '';
	this.header = '';
	this.renderrer = null;
	this.LabelCost = false;

	//this.link='';
	this.init = function () {
		//if (this.app.type == 'lamels') console.log('lamels', this.o)
		if (typeof this.app.type !== "undefined" && this.app.type != null && typeof this.app.subtype !== "undefined" && this.app.subtype != null) this.prefix = this.app.type + this.app.subtype + '_';
		if (typeof this.o.descr !== "undefined" && this.o.descr != null) this.descr = this.o.descr;
		if (typeof this.o.name !== "undefined" && this.o.name != null) this.name = this.o.name;
		this.header = this.name;
		if (typeof this.o.img !== "undefined" && this.o.img != null) this.img = this.o.img;
		if (typeof this.o.options !== "undefined" && this.o.options != null) this.options = this.o.options;
		if (typeof this.app.pics !== "undefined" && this.app.pics != null) this.pics = this.app.pics;
		if (typeof this.app.type !== "undefined" && this.app.type != null) if (this.app.type === 'lamels') this.lamels = true;
		if (typeof this.app.type !== "undefined" && this.app.type != null) if (this.app.type === 'karniz') this.karniz = true;
		//	if (typeof this.o.enabled !== "undefined" && this.o.enabled !=null) if (parseInt(this.o.enabled) == 1) this.enabled = true; else this.enabled = false;
		//	if (typeof this.o.related !== "undefined" && this.o.related !=null) if (parseInt(this.o.related) == 1) this.related = true; else this.related = false;
		if (this.o.enabled) this.enabled = true;
		if (this.o.visible) this.visible = true;
		this.visible = this.enabled;

		if (this.o.related) this.related = true;
		if (typeof this.o.val !== "undefined" && this.o.val != null) this.value = parseFloat(this.o.val);
		if (typeof this.o.alias !== "undefined" && this.o.alias != null) this.alias = this.o.alias;
		if (this.alias !== '' && this.app.deltas) {
			if (this.app.deltas[this.alias]) {
				this.deltas = this.app.deltas[this.alias];
			}
		}


		//if (this.alias === 'material') console.log(this.o);
		//console.log(this.alias, this.deltas);
		 //console.log(this.alias,'enabled', this.enabled);

		if (this.app.cm_array.indexOf(this.alias)!= -1) this.cm = true;
		if (this.app.options.LabelCost && this.app.options.LabelCost === 1) {this.LabelCost = true;}

		//	console.log('ITEM',this.app);
		if (this.cm) this.mesure = 'см.'; else if (this.o.mesure) this.mesure = this.o.mesure;
		if (this.mesure) this.header+= ', (' + this.mesure + ')';


		if (this.related) this.enabled = false;

		this.defaultValue = this.value;
		this.defaultEnabled = this.enabled;
		if (typeof this.o.min_v !== "undefined" && this.o.min_v != null) this.min = parseFloat(this.o.min_v);
		if (typeof this.o.max_v !== "undefined" && this.o.max_v != null) this.max = parseFloat(this.o.max_v);
		this.collectConditionRelate();
		//this.collectRelatedItems();
		this.postInit();
	};
	this.postInit = function () {
	};

	this.parseRelates = function (o) {
		let self = this;
		/*
		let str = '0';
		if (o && o.relate) str = o.relate;
		let relates = {};
		if (str !== '0')
		*/
		{
			//let relate = JSON.parse(str);

			let relate = o.relate;
			//console.log(relate);
			for (let rel_key in relate) {
				if (relate.hasOwnProperty(rel_key)) {
					relates[rel_key] = relate[rel_key];
					let options = self.app.params[rel_key].options;
					for (let k in options) {
						if (options.hasOwnProperty(k)) {
							let v = options[k];
							let parsedRelates = self.parseRelates(v);
							for (let k1 in parsedRelates) {
								if(parsedRelates.hasOwnProperty(k1)) {
									relates[k1] = parsedRelates[k1];
								}
							}
						}
					}
				}
			}
		}
		return this.foroomApi.array_unique(relates);
	};

	this.setVal = function (val, callback = true) {
		this.value = parseFloat(val);
		if (isNaN(this.value)) this.value=0;
		//this.applyConditions();
		this.validate();
		//this.app.filterCalcMaterials();
		//console.log('SetVa',this.alias, this.value);
		if (callback) this.setValCallback(this);
	};


	this.setValCallback = function (o) {
		this.app.setValCallback(o);
	};

	this.calcPrice = function () {
		this.app.calcPrice();
	};

	this.renderError = function () {};


	this.goDefault = function () {
			this.setVal(this.value);
	};
	this.enable = function (option = null) {
		//console.log('ENABLE', this.alias);

		if (option) {
			if (this.options && this.options[option]) this.options[option].visible = true;
		} else {
			this.enabled = true;
			this.visible = true;
		}
		this.goDefault();
	};
	this.disable = function (option = null) {

		//console.log('DISABLE', this.alias);


		if (option) {
			if (this.options && this.options[option]) this.options[option].visible = false;
		} else {
			this.enabled = false;
			this.visible = false;
		}
		this.goDefault();

	};
	this.show = function (option = null) {
		if (option) {
			if (this.options && this.options[option]) this.options[option].visible = true;
		} else {
			this.visible = true;
		}
		//	this.goDefault();
	};
	this.hide = function (option = null) {
		if (option) {
			if (this.options && this.options[option]) this.options[option].visible = false;
		} else {
			this.visible = false;
		}
		//this.goDefault();
	};
	this.validate = function () {
	};


	this.collectConditionRelate = function () {
		let self = this;
		//console.log('collectConditionRelate:',self.alias);
		self.conditionRelates = {};
		//console.log('CONDITIONS',self.app.conditions);
		for (let key in self.app.conditions) {
			if (self.app.conditions.hasOwnProperty(key)) {
				let val = self.app.conditions[key];
				/**
				 * @param {{cost_relate:string}} val
				 */
				if (val.relate === self.alias) {
					//console.log('CONDITIONS',val, self);
					if (parseFloat(val.const) > 0)
						self.conditionRelates[val.cost_relate] = {
							alias: self.alias,
							const: parseFloat(val.const),
							min: 0,
							max: 0
						};
					else if (parseInt(val.max_v) === 1)
						self.conditionRelates[val.cost_relate] = {
							alias: self.alias,
							const: 0,
							min: 0,
							max: parseFloat(val.val)
						};
					else if (parseInt(val.min_v) === 1)
						self.conditionRelates[val.cost_relate] = {
							alias: self.alias,
							const: 0,
							min: parseFloat(val.val),
							max: 0
						};
				}
			}
		}
		//console.log('CONDITIONS',self.conditionRelates);
	};

	this.applyParamConditions = function (self, param, key, val) {
		if (val.const > 0) {
			param.min = val.const;
			param.max = val.const;
			param.setVal(val.const);
		} else if (val.min > 0) {
			let min = self.value * val.min;
			param.o.min_v = parseFloat(param.o.min_v);
			param.min = Math.max(param.o.min_v, min);
			param.min = Math.ceil(param.min / 10) * 10;
			param.max = parseFloat(param.o.max_v);
			param.max = Math.ceil(param.max / 10) * 10;
		} else if (val.max > 0) {
			param.min = parseFloat(param.o.min_v);
			param.min = Math.ceil(param.min / 10) * 10;
			let max = self.value * val.max;
			param.o.max_v = parseFloat(param.o.max_v);
			param.max = Math.min(param.o.max_v, max);
			param.max = self.value * val.max;
			param.max = Math.ceil(param.max / 10) * 10;
		}
		if (key === 'ControlHeight') self.app.controlHeightCorrection(param);
		//console.log('console_mode',self.app.console_mode);
		if (!self.app.console_mode) {
			//console.log(self.app.type+'_'+key+' max= '+self.app.oParams[key].max+' min= '+self.app.oParams[key].min);
			let min = param.min;
			let max = param.max;
			//console.log(self.app.oParams[key].alias,min,max);
			if (param.value < param.min || param.value > param.max) {
				if (val.max > 0) {
					param.setVal(max);
				}
				//else
				if (val.min > 0) {
					param.setVal(min);
				}
			}

		}	//else console.log('CONSOLE MODE');
	};


	this.applyConditions = function () {
		let self = this;
		//console.log('applyCONDS',self.alias,self.conditionRelates);
		for (let key in self.conditionRelates) {
			if (self.conditionRelates.hasOwnProperty(key)) {
				let val = self.conditionRelates[key];
				let param = null;
				//console.log('RELATE COND ('+self.alias+')=', key, val);
				//console.log('applyCONDS');
				if (typeof self.app.oParams[key] !== "undefined" && self.app.oParams[key] != null) {
					param = self.app.oParams[key];
				}
					if (param) self.applyParamConditions(self,param,key,val);
			}
		}
	};


	this.getParamPrice = function () {
		let self = this;
		//console.log(this.type, this.alias, 'getParamPrice');
		//	console.log('getParamPrice '+ self.alias+' = '+ self.paramCost);
		let costRelate = self.costRelate;
		//	console.log(self.alias+' '+costRelate);
		if (costRelate === '') costRelate = self.alias;
		if (costRelate !== '')
			if (typeof self.app.oParams[costRelate] !== "undefined" && self.app.oParams[costRelate] != null) {
				if (self.app.oParams[costRelate].paramPerc === 0) {
					let price = 0;

						price = self.app.oParams[costRelate].paramCost * self.value;
					//	console.log('self.app.oParams[costRelate].paramCost',self.app.oParams[costRelate].paramCost);
					//	console.log('self.value',self.value);
					//	console.log('price',price);

					// karniz2 and karniz3 option
					if (typeof self.app.textFieldsAsSelect !== "undefined" && self.app.textFieldsAsSelect != null)
						if (self.app.textFieldsAsSelect.indexOf(self.alias) > -1) {
							price = self.app.oParams[costRelate].paramCost;
						}
					// END karniz2 and karniz3 option
					if (self.error || self.value === 0) price = 0;
					if (self.type !== 'dimention') self.price = price;
				} else {
					self.price = self.app.oParams.material.price * self.app.oParams[costRelate].paramPerc;
					if (self.app.oParams.material.isCurrentAction) self.old_price = self.app.oParams.material.old_price * self.app.oParams[costRelate].paramPerc;
				}
			}
		self.app.addLocalPrice(self);
		//	console.log(self.alias,self.price);
		return self.price;
	};
	this.getModel = function(){
		let name = this.name;
		if (this.strings[this.alias] && this.strings[this.alias].name) this.name = this.strings[this.alias].name;
		return  {
			alias: this.alias,
			key: this.value,
			name: this.name,
			val: this.cm ? this.value / 10 : this.value,
			mes: this.mesure,
			descr: this.descr

		};
	};
	this.preview = function(ar) {
		ar[this.alias] = this.getModel();
		return ar;
	};


	this.release = function(ar) {
		ar[this.alias] = this.value;
		return ar;
	};

};//classParam
export default ClassParam;
