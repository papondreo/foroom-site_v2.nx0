let ClassParamSelect = function(o,app) {
	this.app = app;
	this.type = o.typ;
	this.allowed_values=[];
	this.o = o;
	this.afterSetMaterialCalcCallBack = function (rev, item) {
	};
	this.postInit = function() {

		if (o.disabled_cls) this.disabled_cls = o.disabled_cls;

		//if (this.alias === 'BracketComplect') console.log(this.alias,this.enabled, this.visible);

		//console.log(this.alias, this.options);
		if (this.options) {
			for(let k in this.options) {
				if (this.options.hasOwnProperty(k)) {
					//if (this.alias === 'BracketComplect') console.log(k,this.options[k].enabled, this.options[k].visible);
					//this.options[k].visible = this.options[k].enabled;

				}
			}
		}
	};

	this.setVal = function (val, callback = true) {
		let self = this;
		this.value = parseFloat(val);
		if (isNaN(this.value)) this.value=0;


		//console.log(this.alias, this.value);
		if (typeof self.app.oParams.material !== "undefined" && self.app.oParams.material != null && !self.app.oParams.material.error) {
			self.app.setMaterialCalc(self.app.oParams.material, function () {
				if (self.alias === 'MaterialCalc') {
					//console.log('MaterialCalc');
					if (typeof self.app.oParams.width !== "undefined" && self.app.oParams.width != null) self.app.oParams.width.validate();
					if (typeof self.app.oParams.height !== "undefined" && self.app.oParams.height != null) self.app.oParams.height.validate();
				}
			});
		}

		this.validate();

		if (!this.error) {
			if (this.app.alias === 'karniz') {
				this.app.validate();
			} else if (this.app.oParams.karniz) {
				this.app.oParams.karniz.validate();
			}
		}
		if (callback) this.setValCallback(this);
	};
	this.validate = function () {
		let self = this;
		let err = false;
		this.allowed_values=[];
		//console.log(this.validate.caller.caller.caller);
		//console.log(self.value+'<= '+self.max+' && '+self.value+'>='+self.min);
		//if (this.alias==='Drive')console.log('1SELECT:validate', self.options, self.value);
		let min=0;
		let max=0;
		this.images = null;
		this.icon = null;
		this.image = null;

		for (let key in self.options) {
			if (self.options.hasOwnProperty(key)) {
				let opt = self.options[key];
				if (!opt.deleted) this.allowed_values.push(opt.val);
				if (opt.val === this.value) {
					if (!this.app.correct_template && opt.deleted) {err=true;}
					if (opt.img) this.images = opt.img;
					if (this.images) {
						this.image = this.images.ico ? this.images.ico : null;
						this.prv =  this.images.prv ? this.images.prv : null;
					}
					this.icon = this.image;


					//console.log(opt.alias, 'del=',opt.deleted)
					if (this.disabled_cls) {
						opt.visible=true;
					}
					if (typeof opt.cost !== "undefined" && opt.cost != null) self.paramCost = parseFloat(opt.cost);
					if (typeof opt.perc !== "undefined" && opt.perc != null) self.paramPerc = parseFloat(opt.perc) / 100;

					/*
					let str = opt.relate;
					let relates = {};
					if (str !== '0')
					*/
					{

						//relates = JSON.parse(str);
						let relates = opt.relate;
						//console.log('SELECT:RELATES', relates);
						for (let rkey in relates) {
							if (relates.hasOwnProperty(rkey)) {
								let rval = relates[rkey];
								//console.log(rkey,rval);
								if (parseInt(rval) == 0)
									self.app.disableParam(rkey);
								else
									self.app.enableParam(rkey);
							}
						}
					}
					//console.log('SET_PARAM',opt.set_param);
					if (opt.set_param) {
						for (let okey in opt.set_param) {
							if (opt.set_param.hasOwnProperty(okey)) {
								let alias = okey;
								let correct_template = true;
								if (!this.app.correct_template)  {
									if (this.app.initial_template && (this.app.initial_template[this.alias] || this.app.initial_template[alias])) {
										correct_template = false;
									}
								}


								//if (this.alias==='Drive' || this.alias==='ControlDevice') console.log('CORRECT', this.alias,alias,correct_template);


								if (this.app.oParams[alias]) {
									if (opt.set_param[okey] instanceof Array) {
										if (opt.set_param[okey].indexOf(this.app.oParams[alias].value) === -1) {
											if (correct_template) {
												this.app.oParams[alias].setVal(opt.set_param[okey][0]);
											} else {
												//if (this.app.oParams[alias]!=opt.set_param[okey][0]) err= true;
											}
										}
									} else {
										if (this.app.oParams[alias].value !== opt.set_param[okey]) {
											if (correct_template) {
												this.app.oParams[alias].setVal(opt.set_param[okey]);
											} else {
												//if (this.app.oParams[alias]!=opt.set_param[okey]) err= true;
											}
											//console.log('SET', okey, opt.set_param[okey]);
										}
									}
								}
							}
						}
					}

					this.applyPlusDeltas();

/*
					if (self.value <= self.max && self.value >= self.min) {
						err = false;
					} else {
						err = true;
					}
					*/
				} else {
					if (this.disabled_cls) {
						opt.visible=false;
					}
				}

				if (opt.visible) {
					if (min > opt.val) min=opt.val;
					if (max < opt.val) max=opt.val;
				}


			}
		}

		if (min) this.min=min;
		if (max) this.max=max;
		//console.log('min-max', this.min, this.max);


		if (self.value <= self.max && self.value >= self.min) {
			//err = false;
		} else {
			err = true;
		}
		//	console.log(this.alias+' = if ('+this.value+'>='+this.min+' && '+this.value+'<='+this.max+') err= false; else err=true;');
		//	if (this.value>=this.min && this.value<=this.max && !err) err= false; else err=true;
		this.error = err;
		if (this.error)
			this.error_description = 'Неверное значение';
		else
			this.error_description = '';
		if (self.error) {
			if (self.enabled)
				self.app.pushError(self.alias);
			else {
				self.error_description = '';
				self.app.popError(self.alias);
			}
		} else
			self.app.popError(self.alias);
	};
	this.getParamPrice = function () {
		let self = this;
		//	console.log(this.type, this.alias, 'getParamPrice:OVERRIDED');
		let costRelate = self.costRelate;
//Object.entries(self.o.options).length !== 0
		if (costRelate === '')
			if (!self.foroomApi.isEmptyObject(self.o.options))
				if (typeof self.o.options[self.alias + '_' + self.value] !== "undefined" && self.o.options[self.alias + '_' + self.value] != null)
					if (self.o.options[self.alias + '_' + self.value].cost_relate === '0')
						costRelate = self.alias;
		if (costRelate !== '')
			if (typeof self.app.oParams[costRelate] !== "undefined" && self.app.oParams[costRelate] != null) {
				if (self.app.oParams[costRelate].paramPerc === 0) {
					//console.log(self.alias, self.app.oParams[costRelate].paramCost);
					self.price = self.app.oParams[costRelate].paramCost;

				} else {
					self.price = self.app.oParams.material.price * self.app.oParams[costRelate].paramPerc;
					self.old_price = self.app.oParams.material.old_price * self.app.oParams[costRelate].paramPerc;
				}
				//console.log(self.alias+' relates of '+costRelate);
			}
		//console.log(self.alias+' is relates from ',self.costRelatives);
		for (let key in self.costRelatives) {
			if (self.costRelatives.hasOwnProperty(key)) {
				let val = self.costRelatives[key];
				if (val.type === 'dimention')
					self.price = val.value / 1000 * self.paramCost;
			}
		}
		self.app.addLocalPrice(self);
		return self.price;
	};

	this.getModel = function() {
		let val = 'Неизвестно';
		let descr = '';
		let k = this.alias + '_' + this.value;
		if (this.options) {
			if (typeof this.options[k] !== "undefined" && this.options[k] != null) {
				val = this.options[k].name;
				descr = this.options[k].descr;

			}
		}
		return {
			alias: this.alias,
			key: this.value,
			name: this.name,
			val: val,
			mes: this.mesure,
			descr:descr,
		};
	};


	this.init();
}; //class select
export default ClassParamSelect;
