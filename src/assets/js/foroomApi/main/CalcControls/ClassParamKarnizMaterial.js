let ClassParamKarnizMaterial = function(o,app) {
	this.app = app;
	this.type = o.typ;
	this.currentActionInfo = null;
	this.isCurrentAction = false;
	this.o = o;
	this.outOfStock = false;
	this.domOptions = {};
	this.costtype = 0;
	this.icon = '';
	this.image = '';
	this.imgDom = null;
	this.mat_name = 'Нет';
	this.materials = {};
	this.tree = null;
	this.materialsSortArray = [];
	this.treeEl = null;
	this.karnEl = null;
	this.params = {
		lines: null,
		diam: null,
		paramLine: 1,
	};
	this.width = 0;
	this.tubeLen = 0;
	this.amount = 0;
	this.connectorAmount = 0;
	this.amountParam = null;
	//this.min_v = 0;
	//this.max_v = 0;
	if (o.treeEl) this.treeEl = o.treeEl;
	if (o.karnEl) this.karnEl = o.karnEl;
	if (o.materials) this.materials = o.materials;
	if (o.tree) this.tree = o.tree;
	//console.log(this.alias, this.materials);
	let paramLine = null;
	if (this.karnEl && this.treeEl) paramLine = parseInt(this.karnEl.replace(this.treeEl, ''));
	if (paramLine) this.params.paramLine = paramLine

	if (this.karnEl && this.app.oParams) {
		let karnAmountName = 'karn_' + this.karnEl + '_amount';
		if (this.app.oParams[karnAmountName]) {
			this.amountParam = this.app.oParams[karnAmountName];
		}

	//	console.log('karnAmountName',this.alias,karnAmountName,this.amountParam);


	}
	this.create_materialsSortArray = function () {

		//if (this.alias==='karn_bracket_type')
		//console.log(this.alias,'createSortArray');
		//console.log('this.params',this.alias, this.params);

		this.materialsSortArray = [];
		let lines = null, diam = null, tubes = {};
		let paramLine = this.params.paramLine;
		if (!paramLine) paramLine = 1;
		if (this.app && this.app.oParams) {

			if (this.app.oParams['karn_tube' + paramLine + '_diameter']) {
				diam = this.app.oParams['karn_tube' + paramLine + '_diameter'].value;
				//console.log('karn_tube1_diameter',this.app.oParams['karn_tube1_diameter']);
			}


			//if (this.app.oParams['karn_tube1_diameter']) tubes.d1 = this.app.oParams['karn_tube1_diameter'].value;
			//	if (this.app.oParams['karn_tube2_diameter']) tubes.d2 = this.app.oParams['karn_tube2_diameter'].value;


			if (this.app.app && this.app.app.oParams) {
				if (this.app.app.oParams['MountPoint']) {
					lines = this.app.app.oParams['MountPoint'].value;
					//	console.log('MountType',this.app.app.oParams['MountType']);
				}
			}
			if (!lines) {
				lines = null;
			} else if (this.tree) {
				let size = Object.keys(this.tree).length;
				if (size === 1) {
					tubes[1] = this.app.oParams['karn_tube' + paramLine + '_diameter'].value;
				} else
					for (let i = 1; i <= lines; i++) {
						if (this.app.oParams['karn_tube' + i + '_diameter']) {
							if (this.tree[i]) {
								//	console.log('--->',this.alias,i,this.tree[i]);
								tubes[i] = this.app.oParams['karn_tube' + i + '_diameter'].value;
							}
						}
						//console.log('LINES', lines,i)
					}
			}
		}


		if (this.params.lines === lines && this.params.diam === diam) {

		} else {
			this.params.lines = lines;
			this.params.diam = diam;
			this.setVal(0);

		}

		//if (this.alias==='karn_bracket_type')

		let tmp = [];
		for (let k in tubes) {
			if (tubes.hasOwnProperty(k) && tubes[k]) {
				if (this.tree[k]) {
					let d = tubes[k];
					if (!this.tree[k][d]) {
						d = 0;
						tubes[1] = 0;
					}
					if (this.tree[k][d]) {
						let el_tmp = [];
						let v = this.tree[k][d];
						for (let color in v) {
							if (v.hasOwnProperty(color) && v[color]) {
								for (let i in v[color]) {
									if (v[color].hasOwnProperty(i)) {
										el_tmp.push(v[color][i]);
									}
								}
							}
						}
						if (el_tmp.length > 0) tmp.push(el_tmp);
					}
				}
			}
		}
		let pluralD = [];
		if (tmp.length > 1) {
			for (let k in tmp) {
				if (tmp.hasOwnProperty(k) && tmp[k]) {
					for (let i in tmp[k]) {
						if (tmp[k].hasOwnProperty(i)) {
							if (pluralD.indexOf(tmp[k][i]) === -1) {
								pluralD.push(tmp[k][i]);
							}
						}
					}
				}
			}
		} else {
			tubes[2] = 0;
			pluralD = tmp[0];
		}

		if (this.materials) {
			//console.log('--->',this.materials)
			let res = [];
			for (let k in pluralD) {
				if (pluralD.hasOwnProperty(k)) {
					let id = pluralD[k];
					if (this.materials[id]) {
						if (this.materials[id].diameter1 === tubes[1] && this.materials[id].diameter2 === tubes[2]) {
							//console.log(this.materials[k].diameter1,' === ',tubes[1],' && ',this.materials[k].diameter2,' === ',tubes[2]);
							if (res.indexOf(id) === -1) {
								res.push(id);
							}
						}
					}
				}
			}
			this.materialsSortArray = res;
			//	console.log('----->',this.alias,res);
		}


		//console.log('paramLine','alias',this.alias,'paramLine',paramLine, 'lines',lines, 'diam',diam, 'tubes',tubes, 'tmp',tmp);

		/*
                if (lines && diam) {
                    if (this.tree && this.materials) {
                        if (!this.tree[lines]) lines = 1;
                        if (this.tree[lines]) {
                            if (!this.tree[lines][diam]) diam = 0;




                        }
                        if (this.tree[lines] && this.tree[lines][diam]) {
                            //if (this.alias==='karn_bracket_type')
                                //console.log('create_materialsSortArray', lines, diam, this.tree[lines][diam]);
                            for (let color in this.tree[lines][diam]) {
                                for (let k in this.tree[lines][diam][color]) {
                                    let v = this.tree[lines][diam][color][k];
                                    this.materialsSortArray[this.materialsSortArray.length] = parseInt(v);
                                }
                            }
                        }
                    }
                }

                */
	};
	this.postInit = function () {
		this.link = '/calculator/karniz_materials/' + this.app.type + this.app.subtype + '/' + this.alias + '/' + this.value + '/';
		for (let k in this.materials) {
			if (this.materials.hasOwnProperty(k) && this.materials[k]) {
				this.materials[k] = this.app.app.get_mat_action_params(this.materials[k]);
				//console.log('action',this.app.all_actions[k])
			}
		}
		//console.log('all_actions', this.alias, this.materials,this.app.all_actions);
		//console.log(this.alias, this.materials);
	};

	this.setVal = function (val, callback = true) {
		let self = this;
		this.isCurrentAction = false;
		this.currentActionInfo = null;


		if (this.connectorAmount < 0) this.connectorAmount = 0;


		if (typeof val === "undefined" || val == null) val = 0;
		this.value = parseFloat(val);
		if (isNaN(this.value)) this.value = 0;
		this.validate();
		this.mat_name = 'Нет';
		this.icon = null;
		if (this.value !== 0 && !this.error) {
			this.mat_name = this.materials[this.value].name;
		}
		if (this.value === 0) this.cost = 0; else if (typeof this.materials[this.value] !== "undefined" && this.materials[this.value] != null) {
			if (this.materials[this.value].isCurrentAction) this.isCurrentAction = this.materials[this.value].isCurrentAction;
			if (this.materials[this.value].currentActionInfo) this.currentActionInfo = this.materials[this.value].currentActionInfo;


			//this.app.isCurrentAction = this.isCurrentAction;
			//this.app.currentActionInfo = this.currentActionInfo;

			this.paramCost = parseFloat(this.materials[this.value].cost);
			this.paramOldCost = 0;
			if (this.isCurrentAction) {
				if (this.currentActionInfo.show_old_price)
					this.paramOldCost = parseFloat(this.currentActionInfo.old_cost);
			}
		}
		this.price = 0;
		//console.log('COST',this.alias, this.isCurrentAction,this.paramCost,this.paramOldCost);
		if (callback) this.setValCallback(this);
	};


	this.getMaterialImageArray = function(val) {
		val.icon=null;
		let ptype='karniz1';
		let images = {};
		if (val.img) {
			if (val.img.i) images.ico='images/calculator/materials/ico/ico_' + val.tid + '.jpg';
			if (val.img.p) images.prv='images/calculator/materials/prv/prv_' + ptype + '_' + val.tid + '.png';
			if (val.img.p1) images.prv1='images/calculator/materials/prv/prv1_' + ptype + '_' + val.tid + '.png';
			if (val.img.p2) images.prv2='images/calculator/materials/prv/prv2_' + ptype + '_' + val.tid + '.png';
		}
		if (images.ico) val.icon=images.ico;
		//val.img = images;
		//if (ptype === 'karniz1') console.log('karniz1',val.tid, images);
		return images;
	}



	this.validate = function () {
		let self = this;
		let err = true;
		this.outOfStock = false;


		this.width = 0;
		this.tubeLen = 0;
		this.amount = 0;
		this.connectorAmount = 0;

		let karnAmountName = 'karn_' + this.karnEl + '_amount';
		if (this.app.oParams[karnAmountName]) {
			this.amountParam = this.app.oParams[karnAmountName];
			this.amount = this.amountParam.value;
			this.connectorAmount = this.amount - 1;
		}

		if (this.materials[this.value]) {
			this.tubeLen = this.materials[this.value].len;
			this.width = this.tubeLen * this.amount;
			//console.log('=======>', this.alias, this.tubeLen, this.width, this.amountParam);

		}


		for (let key in this.materials) {
			if (this.materials.hasOwnProperty(key)) {
				let mat = this.materials[key];
				if (parseInt(key) === this.value) {
					err = false;
					//console.log('MAT',mat);
					if (!this.app.correct_template) {
						if (!mat.enabled || mat.ost <= 0) {
							err = true;
							this.outOfStock = true;
						}
					}

				}
			}
		}



		this.images = null;
		this.icon = null;
		this.image = null;
		this.prv = null;



		if (this.materials[this.value]) {
	 		this.images = this.getMaterialImageArray(this.materials[this.value]);
		}








		let amountEr = false;
		if (self.karnEl && self.amountParam && self.amountParam.visible) {
			if (self.amountParam.value > 0 && err) amountEr = true;
			if (self.amountParam.value <= 0) {
				self.value = 0;
				self.visible = false;
				self.amountParam.removeFromPreview = true;
			} else {
				self.visible = true;
				self.amountParam.removeFromPreview = false;

			}
		}


		if (err && !amountEr) {
			if (self.min == self.max && self.min == self.value) err = false;
		}
		this.error = err || amountEr;
		//console.log('karnMaterial:validate:error', this.error,this.enabled);
		//this.error = true;


		if (this.value !== 0 && !this.error) {
			if (this.images) {
				this.icon = this.images.ico ? this.images.ico : null;
				this.image = this.images.ico ? this.images.ico : null;
				this.prv = this.images.prv ? this.images.prv : null;
			}
		}

		//console.log('MATS',this.icon,this.prv);




		if (this.error)
			this.error_description = 'Неверное значение';
		else
			this.error_description = '';
		if (this.error) {
			if (this.enabled)
				this.app.pushError(this.alias);
			else {
				this.error_description = '';
				this.app.popError(this.alias);
			}
		} else
			this.app.popError(this.alias);
		this.renderError();

	};
	this.afterSetMaterialCalcCallBack = function (rev, item) {
	}
	this.paramMaterialApply = function () {
	};
	this.getParamPrice = function () {
		let self = this;
		self.app.addLocalPrice(self);
		return self.price;
	};
	this.getModel = function () {
		return {
			alias: this.alias,
			key: this.value,
			name: this.name,
			val: this.mat_name,
			mes: this.mesure,
			descr: this.descr,
		};
	};

	this.init();
	this.create_materialsSortArray();


}; //class material


export default ClassParamKarnizMaterial;
