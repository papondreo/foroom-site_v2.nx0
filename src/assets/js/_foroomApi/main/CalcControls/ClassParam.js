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
	this.comment = '';
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
	this.recommended = false;
	this.recommended_value=0;
	this.disabled_cls='';
	this.plusDeltas={};
	this.useInPreview = false;
	this.initial_enabled=false;
	this.initial_visible=false;
	this.deleted = false;
	this.icon = null;
	this.image = null;
	this.prv=null;
	this.images=null;
	this.promo='';



	//this.link='';
	this.init = function () {
		//if (this.app.type == 'lamels') console.log('lamels', this.o)
		if (typeof this.app.type !== "undefined" && this.app.type != null && typeof this.app.subtype !== "undefined" && this.app.subtype != null) this.prefix = this.app.type + this.app.subtype + '_';
		if (typeof this.o.descr !== "undefined" && this.o.descr != null) this.descr = this.o.descr;
		if (typeof this.o.name !== "undefined" && this.o.name != null) this.name = this.o.name;
		if (typeof this.o.promo !== "undefined" && this.o.promo != null){
			this.promo = this.o.promo
		} else{
			this.promo = '';
			this.o.promo = '';
		}
		if (typeof this.o.comment !== "undefined" && this.o.comment != null) this.comment = this.o.comment;
		if (typeof this.o.img !== "undefined" && this.o.img != null) this.img = this.o.img;
		if (typeof this.o.options !== "undefined" && this.o.options != null) this.options = this.o.options;
		if (typeof this.app.pics !== "undefined" && this.app.pics != null) this.pics = this.app.pics;
		if (typeof this.app.type !== "undefined" && this.app.type != null) if (this.app.type === 'lamels') this.lamels = true;
		if (typeof this.app.type !== "undefined" && this.app.type != null) if (this.app.type === 'karniz') this.karniz = true;
		//	if (typeof this.o.enabled !== "undefined" && this.o.enabled !=null) if (parseInt(this.o.enabled) == 1) this.enabled = true; else this.enabled = false;
		//	if (typeof this.o.related !== "undefined" && this.o.related !=null) if (parseInt(this.o.related) == 1) this.related = true; else this.related = false;


		//console.log(this.o.alias, this.o.enabled, this.o.visible);
		if (this.o.enabled) this.enabled = true;
		if (this.o.initial_enabled) this.initial_enabled = true;
		if (this.o.visible) this.visible = true;
		if (this.o.initial_visible) this.initial_visible = true;

		if(this.name === this.comment) this.comment='';


		if (this.o.deleted) {
			this.deleted = true;
			this.enabled = false;
			this.visible = false;
			this.initial_enabled = false;
			this.initial_visible = false;
		}
			//if (!this.enabled) this.visible = false;
		//this.visible = this.enabled;

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


		this.setHeader();

		if (this.related) this.enabled = false;

		this.defaultValue = this.value;
		this.defaultEnabled = this.enabled;
		if (typeof this.o.min_v !== "undefined" && this.o.min_v != null) this.min = parseFloat(this.o.min_v);
		if (typeof this.o.max_v !== "undefined" && this.o.max_v != null) this.max = parseFloat(this.o.max_v);

		//if (this.alias === 'ControlHeight') this.recommended = true;
		//if (this.alias === 'DownPlumb') this.recommended = true;
		//if (this.alias === 'MountTypeAmount') this.recommended = true;

		//console.log(this.alias,this.recommended);


		if (this.app.previewParams) {
			if (this.app.previewParams.indexOf(this.alias) !== -1) {
				this.useInPreview = true;
			}
		} else {
			this.useInPreview = true;
		}


		this.collectConditionRelate();
		//this.collectRelatedItems();
		this.postInit();
	};

	this.setHeader = function(name='') {
		if (name) {
			this.name=name;
		} else {
			if (this.o && this.o.name) {
				this.name=this.o.name;
			}
		}
		this.header = this.name;
		if (this.descr) this.header+= ' (' + this.descr + ')';
		if (this.mesure) this.header+= ', (' + this.mesure + ')';
	};
	this.postInit = function () {
	};
	/**
	 * @param {{relate:string}} o
	 */
	this.parseRelates = function (o) {

		//console.log('=========>parseRelates',this.alias);


		let self = this;
		let relates = {};
		/*
		let str = '0';
		if (o && o.relate) str = o.relate;

		if (str !== '0')
		*/
		{
			//let relate = JSON.parse(str);

			let relate = o.relate;
			//console.log('RELATE',this.alias,relate);
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
		//console.log(this.alias,'RELATES',relates);
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

	this.applyPlusDeltas=function() {
		//console.log(this.alias,this.plusDeltas);
		for(let k in this.plusDeltas) {
			if (this.plusDeltas.hasOwnProperty(k)) {
				if (typeof this[k] !== "undefined" && this[k] != null) {
					this[k]+=parseFloat(this.plusDeltas[k]);
				}
			}
		}
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
		//console.log('ENABLE', this.alias, option);

		if (option) {
			if (this.options && this.options[option]) {
				this.options[option].enabled = this.options[option].initial_enabled;
				this.options[option].visible = true;
			}
		} else {
				this.enabled = this.initial_enabled;
				this.visible = true;
		}
		this.goDefault();
	};
	this.disable = function (option = null) {

		//console.log('DISABLE', this.alias);


		if (option) {
			if (this.options && this.options[option]) {
				if (this.options[option].val === this.value) {
					this.value = this.defaultValue;
				}
				this.options[option].visible = false;
			}
		} else {
			this.value = this.defaultValue;
			this.enabled = false;
			this.visible = false;
		}
		this.goDefault();

	};
	this.show = function (option = null) {
		if (option) {
			if (this.options && this.options[option]) {
				this.options[option].visible = true;
			}
		} else {
			this.visible = true;
		}
		//	this.goDefault();
	};
	this.hide = function (option = null) {
		if (option) {
			if (this.options && this.options[option]) {
				this.options[option].visible = false;
			}
		} else {
			this.visible = false;
		}
		//this.goDefault();
	};


	this.setParams = function() {
		let set_param = this.o.set_param;
		if (set_param) {
			//console.log('set_param',this.alias,set_param);
			let do_setParams = {};
			for (let okey in set_param) {
				if (set_param.hasOwnProperty(okey)) {
					//console.log(parseFloat(okey)+' >= '+parseFloat(this.value));
					if (parseFloat(okey) >= parseFloat(this.value)) {
						for (let k in set_param[okey]) {
							if (set_param[okey].hasOwnProperty(k)) {
								do_setParams[k] = set_param[okey][k];
							}
						}
						break;
					} else {

					}
				}
			}
			for (let k in do_setParams) {
				if (do_setParams.hasOwnProperty(k)) {
					let correct_template = true;
					if (!this.app.correct_template)  {
						if (this.app.initial_template && (this.app.initial_template[this.alias] || this.app.initial_template[k])) {
							correct_template = false;
						}
					}
					if (this.app.oParams[k] && correct_template) {
						if (correct_template) {
							this.app.oParams[k].setVal(do_setParams[k]);
						} else {
							//if (this.app.oParams[k] != do_setParams[k]) err= true;
						}
					}
				}
			}
			//console.log('do_setParams',do_setParams);
		}
	}

	this.validate = function () {
		this.applyPlusDeltas();
	};

	this.collectConditionRelate_old = function () {
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
							recommend:0,
							const: parseFloat(val.const),
							min: 0,
							max: 0
						};
					else if (parseInt(val.max_v) === 1)
						self.conditionRelates[val.cost_relate] = {
							alias: self.alias,
							recommend:0,
							const: 0,
							min: 0,
							max: parseFloat(val.val)
						};
					else if (parseInt(val.min_v) === 1)
						self.conditionRelates[val.cost_relate] = {
							alias: self.alias,
							recommend:0,
							const: 0,
							min: parseFloat(val.val),
							max: 0
						};
					else
						self.conditionRelates[val.cost_relate] = {
							alias: self.alias,
							recommend: parseFloat(val.val),
							const: 0,
							min: 0,
							max: 0
						};
				}
			}
		}

		console.log(self.alias,'CONDITIONS',self.conditionRelates);
	};

	this.collectConditionRelate = function () {
		let self = this;
		//console.log('collectConditionRelate:',self.alias,self.app.conditions);
		self.conditionRelates = {};
		//console.log('CONDITIONS',self.app.conditions);
		for (let key in self.app.conditions) {
			if (self.app.conditions.hasOwnProperty(key)) {
				let val = self.app.conditions[key];
				let rel_field='value';
				let relate = val.relate;
				let tmp_rel = relate.split('.');
				if (tmp_rel.length >1) {
					relate = tmp_rel[0];
					rel_field =  tmp_rel[1];
					//console.log('tmp_rel',tmp_rel);
				}

				//console.log('CONDITIONS',val.relate,self.alias);



				/**
				 * @param {{cost_relate:string}} val
				 */
				if (relate === self.alias) {
					//console.log('CONDITIONS',val, self);
					if (!self.conditionRelates[val.cost_relate]) self.conditionRelates[val.cost_relate] = {alias: self.alias, field:rel_field};

					//console.log('======>CONDITIONS',rel_field,self.conditionRelates[val.cost_relate].field);


					if (parseFloat(val.const) > 0) self.conditionRelates[val.cost_relate].const= parseFloat(val.const);
					else if (parseInt(val.max_v) === 1)
						self.conditionRelates[val.cost_relate].max= parseFloat(val.val);
					else if (parseInt(val.min_v) === 1)
						self.conditionRelates[val.cost_relate].min= parseFloat(val.val);
					else
						self.conditionRelates[val.cost_relate].recommend= parseFloat(val.val);
/*
					if (!rel.min) rel.min=0;
					if (!rel.max) rel.max=0;
					if (!rel.const) rel.const=0;
					if (!rel.recommend) {
						if (rel.const)
							rel.recommend=rel.const;
						else if (rel.max)
							rel.recommend=rel.max;
						else rel.recommend=rel.min;
					}
*/
					//console.log(self.alias,'CONDITIONS',rel);
				}
			}
		}
		for (let k in self.conditionRelates) {
			if (self.conditionRelates.hasOwnProperty(k)) {
				if (!self.conditionRelates[k].min) self.conditionRelates[k].min=0;
				if (!self.conditionRelates[k].max) self.conditionRelates[k].max=0;
				if (!self.conditionRelates[k].const) self.conditionRelates[k].const=0;
				if (!self.conditionRelates[k].recommend) {
					if (self.conditionRelates[k].const)
						self.conditionRelates[k].recommend=self.conditionRelates[k].const;
					else if (self.conditionRelates[k].max)
						self.conditionRelates[k].recommend=self.conditionRelates[k].max;
					else self.conditionRelates[k].recommend=self.conditionRelates[k].min;
				}
			}
		}
		//console.log(self.alias,'CONDITIONS',self.conditionRelates);
	};

	this.applyParamConditions = function (self, param, key, val) {
		param.recommended = true;

		let self_value = self.value;
		//console.log('applyParamConditions', this.alias, val);
		if (val.const > 0) {
			param.min = self_value;//val.const;
			param.max = self_value;//val.const;
			param.setVal(self_value);//param.setVal(val.const);
		} else if (val.min > 0 && val.max > 0) {
			let min = self_value * val.min;
			param.o.min_v = parseFloat(param.o.min_v);
			param.min = Math.max(param.o.min_v, min);
			param.min = Math.ceil(param.min / 10) * 10;
			let max = self_value * val.max;
			param.o.max_v = parseFloat(param.o.max_v);
			param.max = Math.min(param.o.max_v, max);
			param.max = self_value * val.max;
			param.max = Math.ceil(param.max / 10) * 10;
		} else if (val.min > 0) {
			let min = self_value * val.min;
			param.o.min_v = parseFloat(param.o.min_v);
			param.min = Math.max(param.o.min_v, min);
			param.min = Math.ceil(param.min / 10) * 10;
			param.max = parseFloat(param.o.max_v);
			param.max = Math.ceil(param.max / 10) * 10;
		} else if (val.max > 0) {
			param.min = parseFloat(param.o.min_v);
			param.min = Math.ceil(param.min / 10) * 10;
			let max = self_value * val.max;
			param.o.max_v = parseFloat(param.o.max_v);
			param.max = Math.min(param.o.max_v, max);
			param.max = self_value * val.max;
			param.max = Math.ceil(param.max / 10) * 10;
		} else if (val.recommend > 0) {
			param.recommended = true;
			//console.log(val, param, self);
			//param.recommended_value = Math.ceil(self_value * val.recommend / 10) * 10;
		}
		if (key === 'ControlHeight') self.app.controlHeightCorrection(param);
		if (key === 'InsertCount') self.app.InsertCountCorrection(param);
		//console.log('console_mode',self.app.console_mode);
		if (!self.app.console_mode) {
			//console.log(self.app.type+'_'+key+' max= '+self.app.oParams[key].max+' min= '+self.app.oParams[key].min);
			let min = param.min;
			let max = param.max;
			//console.log('applyParamConditions', param.alias, param.value, param.min, param.max);
				if (param.value < param.min || param.value > param.max) {
				if (val.max > 0) {
					//if (!param.recommended || this.app.setRecommended) param.setVal(max);
					if (this.app.setRecommended) param.setVal(max);
				}
				//else
				if (val.min > 0) {
					//if (!param.recommended || this.app.setRecommended) param.setVal(min);
					if (this.app.setRecommended) param.setVal(min);
				}
			}
			else if (!param.recommended) {
				//console.log(param.alias,'->',min,max);
				//param.setVal(min);
				//param.setVal(min);
			}
			if (param.recommended) {
				if (self.conditionRelates && self.conditionRelates[param.alias]) {
					let rel = self.conditionRelates[param.alias];

					if (rel.field) {
						if (self[rel.field]) self_value = self[rel.field]; else self_value=0;

						//console.log('======>',self_value)
					}
					//console.log('REL',rel)


					//console.log(self.alias,self_value)


					if (rel.const > 0) {
						param.recommended_value = rel.const;
						//param.setVal(self_value);
					} else if (rel.max > 0) {
						param.recommended_value = param.max;
					} else if (rel.min > 0) {
						param.recommended_value = param.min;
					} else if (rel.recommend > 0) {



						param.recommended_value = self_value * rel.recommend;//Math.ceil(self_value * rel.recommend / 10) * 10;

						//console.log('======>',param.alias, param.recommended_value)


						if (param.recommended_value / 10 < 1)
							param.recommended_value = Math.floor(param.recommended_value);
						else
						if (param.recommended_value  > 100)
						param.recommended_value = Math.ceil(param.recommended_value / 10) * 10;

						else
							param.recommended_value = Math.ceil(param.recommended_value);

					}
					//console.log(param.alias,self.conditionRelates[param.alias]);
					if (param.max > 0) if (param.recommended_value > param.max) param.recommended_value = param.max;
					if (param.min > 0) if (param.recommended_value < param.min) param.recommended_value = param.min;
				}
			}
		}	//else console.log('CONSOLE MODE');
		if (param.recommended_value<=0) param.recommended = false;
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
				if (self.app.oParams[key]) param = self.app.oParams[key];
				if (!param) {
					for (let k in self.app.oParams) {
						if (self.app.oParams.hasOwnProperty(k)) {
							if (self.app.oParams[k].oParams){
								if (self.app.oParams[k].oParams[key]) {
									param = self.app.oParams[k].oParams[key];
									break;
								}
							}
						}
					}
				}
			//	console.log('RELATE COND ('+self.alias+')=', key, param);

				if (param) {
					//console.log('RELATE COND ('+self.alias+')=', key, val, param);
					self.applyParamConditions(self, param, key, val);
				}
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
		return self.price;
	};
	this.getModel = function(){
		//let name = this.name;
		//if (this.strings[this.alias] && this.strings[this.alias].name) this.name = this.strings[this.alias].name;
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
