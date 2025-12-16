let ClassParamLamels = function(o, item) {
	this.foroomApi = item.foroomApi;
	this.app = item;
	this.o = o;
	//console.log('O LAMELS',o);
	this.lamelsCalc = null;
	this.lamelsRender = null;
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
	this.arLamels = [];
	this.arMaterials = [];
	this.previewParams=null;
	this.useInPreview = false;
	this.tradeArr=null;
	this.reinit = true;
	this.init = function (o, item) {
		let self = this;
		if (typeof item !== "undefined" && item != null && typeof o !== "undefined" && o != null) {
			this.lamelsCalc = new self.foroomApi.LamelsCalculator();
			if (self.foroomApi.LamelsRenderer) {
				this.lamelsRender = new self.foroomApi.LamelsRenderer(self);
				this.lamelsRender.domCreate();
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
			//this.errors=					item.errors;
			this.error = item.error;
			this.error_description = item.error_description;
			if (this.o.enabled) this.enabled = true;
			if (this.o.visible) this.visible = true;

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
				//this.error=true;
				item.pushError(k);
			};
			this.popError = function (k) {
				//this.error=false;
				item.popError(k);
			};
			this.getError = function (k) {
				item.getError(k);
			};
			this.controlHeightCorrection = function (k) {
				item.controlHeightCorrection(k);
			};
			this.setMaterialCalc = function (k, cb) {
				item.setMaterialCalc(k, cb);
			};


			this.setValCallback = 	 	function(o) {
			if (typeof this.app.oParams !== "undefined" && this.app.oParams != null)
				if (typeof this.app.oParams.width !== "undefined" && this.app.oParams.width != null && typeof this.app.oParams.ControlSide !== "undefined" && this.app.oParams.ControlSide != null) {
					if ((this.oParams.arch && this.oParams.arch.value === 1) && (this.app.oParams.Naborka && this.app.oParams.Naborka.value === 1)) {
						if (this.lamelsRender) this.lamelsRender.disable();
					} else {
						if (this.lamelsRender) this.lamelsRender.enable();
					} // arch !=2
					if (this.oParams.arch && this.oParams.template && this.oParams.arch.value === 1) this.oParams.template.value=0;
					let params = {
						width: this.app.oParams.width.value,
						count: this.oParams.count.value,
						width2: this.oParams.width2.value,
						height: this.app.oParams.height.value,
						height2: this.oParams.height2.value,
						height3: this.oParams.height3.value,
						cs: this.app.oParams.ControlSide.value,
						template: this.oParams.template.value
					};


					if (typeof o !== "undefined" && o != null) {
						if (o.alias === 'count') {
							params.width = 0;
							this.lamelsCalc.init(params);

							if (this.lamelsCalc.error) {
								this.oParams.count.error = true;
								//if(typeof this.app.oParams.width !== "undefined" && this.app.oParams.width !=null) this.app.oParams.width.setVal(0);
							} else {
								this.oParams.count.error = false;
								if (typeof this.app.oParams.width !== "undefined" && this.app.oParams.width != null) {
										this.app.oParams.width.setVal(this.lamelsCalc.width, false);
								}
							}
						}
					}
				}

				//this.refresh();
			};

			//this.prepareMaterialsArray =   item.prepareMaterialsArray  ;
			//this.prepareParamsArray = 	   item.prepareParamsArray	   ;
			//this.render= 				   item.render				   ;

			this.timeout = item.timeout;
			this.type = o.typ;
			//	this.renderError = function(k) {o.renderError;};
			this.alias = o.alias;
			if (this.app.cm_array.indexOf(this.alias)!= -1) this.cm = true;
			if (this.cm) this.mesure = 'см.'; else if (this.o.mesure) this.mesure = this.o.mesure;
			//console.log('this.app.cm_array',this.cm, this.alias, this.app.cm_array);
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
	this.setVal = function (val) {
		if ((val instanceof Object) || (val instanceof Array)) {
			this.reinit=true;
			//console.log('LAMELS SETVAL', val);
			if (val.template>0) {
				this.oParams.arch.setVal(2);
				this.oParams.template.setVal(val.template);
				this.oParams.count.setVal(val.count);
				this.oParams.width2.setVal(val.width2);
				this.oParams.height2.setVal(val.height2);
				this.oParams.height3.setVal(val.height3);
			} else
				this.oParams.arch.setVal(1);

			if (val.renderArr && val.renderMatArr) {
				this.reinit=false;
				this.arLamels = val.renderArr;
				this.arMaterials = val.renderMatArr;
			}
		} else
			this.oParams.arch.setVal(1);
	};
	this.setParam = function (key, val) {
		if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) {
			this.oParams[key].setVal(val);
		}
	};

	this.enableParam = function (key) {
		if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) this.oParams[key].enable();
	};
	this.disableParam = function (key) {
		if (typeof this.oParams[key] !== "undefined" && this.oParams[key] != null) this.oParams[key].disable();
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
				if (param.cost_relate !== '0')
					if (typeof self.oParams[param.cost_relate] !== "undefined" && self.oParams[param.cost_relate] != null) {
						self.oParams[param.cost_relate].costRelate = key;
						if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null)
							self.oParams[key].costRelatives[param.cost_relate] = self.oParams[param.cost_relate];
					}
			} else {
				for (let k in param.options) {
					if (param.options.hasOwnProperty(k)) {
						let v = param.options[k];
						if (v.cost_relate !== '0')
							if (typeof self.oParams[v.cost_relate] !== "undefined" && self.oParams[v.cost_relate] != null) {
								self.oParams[v.cost_relate].costRelate = key;

								if (typeof self.oParams[key] !== "undefined" && self.oParams[key] != null) self.oParams[key].costRelatives[v.cost_relate] = self.oParams[v.cost_relate];
							}
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
		self.error = false;
		for (let key in self.oParams) {
			let val = self.oParams[key];
			if (val.error) self.error = true;
			//console.log()
		}

		//return false;
	};

	this.calcPrice = function () {
		this.app.calcPrice();
	};
	this.refresh = function (o) {
		let self = this;
		if (typeof self.timer !== "undefined" && self.timer != null)
			clearTimeout(self.timer);
		self.timer = setTimeout(function () {
			self.recalc();
		}, self.timeout);
	};
	this.renderError = function () {
		for (let key in this.oParams) {
			let val = this.oParams[key];
			if (val.error) {
				if (val.visible)
					this.pushError(val.alias);
				else {
					val.error_description = '';
					this.popError(val.alias);
				}
			} else
				this.popError(val.alias);
			val.renderError();
		}
	};
	this.recalc__ = function () {
		//console.log('recalc');
		if (typeof this.app !== "undefined" && this.app != null)
			if (typeof this.app.oParams !== "undefined" && this.app.oParams != null)
				if (typeof this.app.oParams.width !== "undefined" && this.app.oParams.width != null && typeof this.app.oParams.ControlSide !== "undefined" && this.app.oParams.ControlSide != null) {
					//console.log('recalc',this.oParams.arch.value,this.app.oParams.Naborka.value);
					if ((this.oParams.arch && this.oParams.arch.value === 1) && (this.app.oParams.Naborka && this.app.oParams.Naborka.value === 1)) {
						if (this.lamelsRender) this.lamelsRender.disable();
					} else {
						if (this.lamelsRender) this.lamelsRender.enable();
						//console.log('recalc','ENABLE');
					} // arch !=2
					let params = {
						width: this.app.oParams.width.value,
						count: this.oParams.count.value,
						width2: this.oParams.width2.value,
						height: this.app.oParams.height.value,
						height2: this.oParams.height2.value,
						height3: this.oParams.height3.value,
						cs: this.app.oParams.ControlSide.value,
						template: this.oParams.template.value
					};


					{
						params.count = 0;
						this.lamelsCalc.init(params);
						if (this.lamelsCalc.error) {
							this.oParams.count.error = true;
						} else {
							this.oParams.count.error = false;
							if (typeof this.oParams.count !== "undefined" && this.oParams.count != null) this.oParams.count.setVal(this.lamelsCalc.count, false);
						}
						//console.log('this.lamelsCalc.error',this.lamelsCalc.error);
						//	console.log('this.oParams.count.error',this.oParams.count.error);
						//	console.log('this.lamelsCalc.count',this.lamelsCalc.count);

					}
					//	console.log('lamelsCalc',this.lamelsCalc);
					if (this.reinit) this.arLamels = this.lamelsCalc.lamels;
					let mainMat = '';
					let naborkaMat = '';
					if (typeof this.app.oParams.material !== "undefined" && this.app.oParams.material != null) mainMat = this.app.oParams.material.value;
					if (typeof this.app.oParams.NaborkaMaterial !== "undefined" && this.app.oParams.NaborkaMaterial != null) if (this.app.oParams.NaborkaMaterial.visible) naborkaMat = this.app.oParams.NaborkaMaterial.value;
					if (this.arLamels instanceof Array) {
					} else this.arLamels = [];
					if (this.arMaterials instanceof Array) {
					} else this.arMaterials = [];
					if (typeof mainMat === "undefined" || mainMat == null) mainMat = '';
					if (typeof naborkaMat === "undefined" || naborkaMat == null) naborkaMat = '';
					let materials = [];
					if (this.arLamels.length != this.arMaterials.length) {
						if (mainMat !== '') {
							for (let k in this.arLamels) {
								if (this.arLamels.hasOwnProperty(k)) {
									materials[materials.length] = mainMat;
								}
							}
							this.arMaterials = materials;
						}
					}
					if (mainMat !== '') {
						for (let k in this.arMaterials) {
							if (this.arMaterials.hasOwnProperty(k)) {
								if (naborkaMat !== '') {
									if (this.arMaterials[k] !== mainMat) {
										this.arMaterials[k] = naborkaMat;
									}
								} else {
									this.arMaterials[k] = mainMat;
								}
							}
						}
					}
					if (this.lamelsRender) this.lamelsRender.init(this.arLamels, this.arMaterials, mainMat, naborkaMat);
					//this.renderError();
					//console.log(this.lamelsCalc.count);
					//console.log(this.lamelsCalc.width);
					//console.log(this.lamelsCalc.lamels);
					//console.log('arMaterials', this.arMaterials);
					//console.log('arLamels', this.arLamels);

				}
	}; //recalc
	this.recalc = function () {
		if (typeof this.app !== "undefined" && this.app != null)
			if (typeof this.app.oParams !== "undefined" && this.app.oParams != null)
				if (typeof this.app.oParams.width !== "undefined" && this.app.oParams.width != null && typeof this.app.oParams.ControlSide !== "undefined" && this.app.oParams.ControlSide != null) {
					//console.log('recalc',this.oParams.arch.value,this.app.oParams.Naborka.value);
					let arch=1;
					let naborka=1;
					if (this.oParams.arch && this.oParams.arch.value) arch = this.oParams.arch.value;
					if (this.app.oParams.Naborka && this.app.oParams.Naborka.value) naborka = this.app.oParams.Naborka.value;
					//if ((this.oParams.arch && this.oParams.arch.value === 1) && (this.app.oParams.Naborka && this.app.oParams.Naborka.value === 1)) {


					if (arch === 1 && naborka === 1) {
						if (this.lamelsRender) this.lamelsRender.disable();
					} else {
						if (this.lamelsRender) this.lamelsRender.enable();

					} // arch !=2



					//this.error=false;



					let params = {
						width: this.app.oParams.width.value,
						count: this.oParams.count.value,
						width2: this.oParams.width2.value,
						height: this.app.oParams.height.value,
						height2: this.oParams.height2.value,
						height3: this.oParams.height3.value,
						cs: this.app.oParams.ControlSide.value,
						template: this.oParams.template.value
					};


					{
						params.count = 0;
						this.lamelsCalc.init(params);
						if (this.lamelsCalc.error) {
							this.oParams.count.error = true;
						} else {
							this.oParams.count.error = false;
							if (typeof this.oParams.count !== "undefined" && this.oParams.count != null) this.oParams.count.setVal(this.lamelsCalc.count, false);
						}
						//	console.log('this.lamelsCalc.error',this.lamelsCalc.error);
						//	console.log('this.oParams.count.error',this.oParams.count.error);
						//	console.log('this.lamelsCalc.count',this.lamelsCalc.count);

					}
					//	console.log('lamelsCalc',this.lamelsCalc);
					if (this.reinit) this.arLamels = this.lamelsCalc.lamels;
					let mainMat = '';
					let naborkaMat = '';
					if (typeof this.app.oParams.material !== "undefined" && this.app.oParams.material != null) mainMat = this.app.oParams.material.value;
					if (typeof this.app.oParams.NaborkaMaterial !== "undefined" && this.app.oParams.NaborkaMaterial != null) if (this.app.oParams.NaborkaMaterial.visible) naborkaMat = this.app.oParams.NaborkaMaterial.value;
					if (this.arLamels instanceof Array) {
					} else this.arLamels = [];
					if (this.arMaterials instanceof Array) {
					} else this.arMaterials = [];
					if (typeof mainMat === "undefined" || mainMat == null) mainMat = '';
					if (typeof naborkaMat === "undefined" || naborkaMat == null) naborkaMat = '';
					let materials = [];
					if (this.arLamels.length != this.arMaterials.length) {
						if (mainMat !== '') {
							for (let k in this.arLamels) {
								if (this.arLamels.hasOwnProperty(k)) {
									materials[materials.length] = mainMat;
								}
							}
							this.arMaterials = materials;
						}
					}
					let naborkaCounter=0;

					if (mainMat !== '') {
						for (let k in this.arMaterials) {
							if (this.arMaterials.hasOwnProperty(k)) {
								if (naborkaMat !== '') {
									if (this.arMaterials[k] !== mainMat) {
										this.arMaterials[k] = naborkaMat;
										naborkaCounter++;
									}
								} else {
									this.arMaterials[k] = mainMat;
								}
							}
						}
					}

					if (naborka === 2) {
						//console.log('SET ERROR TO TRUE')
						if (naborkaCounter < 4) this.error=true; else this.error=false;
					} else {
						this.error=false;
						//console.log('SET ERROR TO FALSE')
					}

					if (this.lamelsRender) this.lamelsRender.init(this.arLamels, this.arMaterials, mainMat, naborkaMat);
					//this.renderError();
					//console.log(this.lamelsCalc.count);
					//console.log(this.lamelsCalc.width);
					//console.log(this.lamelsCalc.lamels);
					//console.log('arMaterials', this.arMaterials);
					//console.log('arLamels', this.arLamels);


				//	console.log('ClassParamLamels:recalc','naborka',naborka,'naborkaCounter',naborkaCounter,'error',this.error);

				}



		if (this.error) {
			//console.log('---> PUSH ERROR')
			this.pushError(this.alias);
		} else {
			//console.log('---> POP ERROR')
			this.popError(this.alias);
		}


	}; //recalc

	this.getTradeArr = function (lamels, materials) {
		let tradeArr = {};
		for (let k in lamels) {
			if (lamels.hasOwnProperty(k)) {
				//let v = lamels[k];
				if (typeof tradeArr[materials[k]] === "undefined")
					tradeArr[materials[k]] = [];
				tradeArr[materials[k]][tradeArr[materials[k]].length] = lamels[k];//+40;
			}
		}
		for (let k in tradeArr) {
			if (tradeArr.hasOwnProperty(k)) {
				//let v = tradeArr[k];
				tradeArr[k].sort(function (a, b) {
					return a === b ? a < b : a < b
				});
			}
		}
		let res = [];
		for (let key in tradeArr) {
			if (tradeArr.hasOwnProperty(key)) {
				let val = tradeArr[key];
				let tmp = {};
				for (let k in val) {
					if (val.hasOwnProperty(k)) {
						let v = val[k];
						if (typeof tmp[v] === "undefined") {
							tmp[v] = {material: parseInt(key), height: v, count: 1};
						} else tmp[v].count++;
					}
				}
				res[res.length] = tmp;
			}
		}
		let tmp = [];
		for (let key in res) {
			if (res.hasOwnProperty(key)) {
				let val = res[key];
				for (let k in val) {
					if (val.hasOwnProperty(k)) {
						tmp[tmp.length] = val[k];
						// break;
					}
				}
			}
		}
		tmp.reverse();
		tradeArr = tmp;
		return tradeArr;
	};
	this.initClass = function () {
		let self = this;
		if (typeof this.o !== "undefined" && this.o != null) this.o = self.foroomApi.clone(this.o);
		this.params = o.params;
		if (typeof this.app.type !== "undefined" && this.app.type != null && typeof this.app.subtype !== "undefined" && this.app.subtype != null) this.prefix = this.app.type + this.app.subtype + '_';
		if (typeof this.o.name !== "undefined" && this.o.name != null) this.name = this.o.name;
		if (typeof this.o.alias !== "undefined" && this.o.alias != null) this.alias = this.o.alias;
		this.oParams = {};
		//console.log('ClassParamLamels:self.params',self.params)
		for (let key in self.params) {
			let val = self.params[key];
			//if (val.typ === 'radio') val.typ = 'select';
			if (val.typ === 'radio') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
			if (val.typ === 'text') self.oParams[key] = new self.foroomApi.ParamText(val, self);
			if (val.typ === 'label') self.oParams[key] = new self.foroomApi.ParamLabel(val, self);
			if (val.typ === 'select') self.oParams[key] = new self.foroomApi.ParamSelect(val, self);
			//if (val.typ =='lamels_select') self.oParams[key] =new self.foroomApi.ParamSelect(val,self);
			//if (val.typ =='lamels_text') self.oParams[key] =new self.foroomApi.ParamText(val,self);
			//if (val.typ =='lamels_label') self.oParams[key] =new self.foroomApi.ParamLabel(val,self);
			//	if (typeof val.params !== "undefined" && val.params !=null) $.each( val.params, function( k, v ){});
			//self.oParams[key] =new self.foroomApi.ParamLamels(val, self);
		}

		//console.log('LAMELS',this.oParams);

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
		let arch = 0;
		let naborka=0;
		this.tradeArr=null;
		if (typeof this.oParams.arch !== "undefined" && this.oParams.arch != null) arch = this.oParams.arch.value;
		if (typeof this.app.oParams.Naborka !== "undefined" && this.app.oParams.Naborka != null) naborka = this.app.oParams.Naborka.value;

		if (arch === 2 || naborka === 2) {
			ret = {
				renderArr: this.arLamels,
				renderMatArr: this.arMaterials,
				tradeArr: this.getTradeArr(this.arLamels, this.arMaterials),
			};
			this.tradeArr=ret;



			if (arch === 2) {
				for (let key in this.oParams) {
					let val = this.oParams[key];
					if (val.visible) {
						ret = val.release(ret);
					}
				}
			}
			ar[this.alias] = ret;
		}
		return ar;
	};
	this.preview = function(ar) {
		let ret = {};
		let arch = 0;
		let naborka=0;
		//console.log('this.tradeArr',this.tradeArr);
		let lamels=[];
		if (this.tradeArr && this.materials) {
			if (this.tradeArr.renderArr && this.tradeArr.renderMatArr) {
				for (let k in this.tradeArr.renderMatArr) {
					if (this.tradeArr.renderMatArr.hasOwnProperty(k)) {
						if (this.materials[this.tradeArr.renderMatArr[k]] && this.tradeArr.renderArr[k]) {
							let n = parseInt(k)+1;
							lamels.push({
								name: 'Ламель '+n,
								height: this.cm ? this.tradeArr.renderArr[k]/10 : this.tradeArr.renderArr[k],
								mes: this.mesure,
								material:this.materials[this.tradeArr.renderMatArr[k]].name,
							})
						}
					}
				}
			}
		}
		//console.log('lamels',lamels);
		if (typeof this.oParams.arch !== "undefined" && this.oParams.arch != null) arch = this.oParams.arch.value;
		if (typeof this.app.oParams.Naborka !== "undefined" && this.app.oParams.Naborka != null) naborka = this.app.oParams.Naborka.value;

		if (arch === 2 || naborka === 2) {

			if (lamels.length>0 && this.useInPreview) ar[this.alias] = {
				alias:this.alias,
				descr:'',
				key: 0,
				mes: this.mesure,
				name: this.name,
				val: 0,
				items:lamels,
			};

			if (arch === 2) {

				for (let key in this.oParams) {
					let val = this.oParams[key];
					if (val.visible && val.useInPreview) {
						ar = val.preview(ar);
					}
				}
			}

		} else {
			if (this.oParams.count) {
				if (this.oParams.count.visible && this.oParams.count.useInPreview) {
					ar = this.oParams.count.preview(ar);
				}
			}
		}
		return ar;
	};
	this.init(this.o, this.app);
};//class
export default ClassParamLamels;
