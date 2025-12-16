let ClassParamMaterial = function(o,app) {
	this.app = app;
	this.type = o.typ;
	this.currentActionInfo = null;
	this.isCurrentAction = false;
	this.currentActionInfo_stored = null;
	this.isCurrentAction_stored = false;

	this.materialRest={};
	this.o = o;
	this.outOfStock=false;
	this.domOptions = {};
	this.gab = {
		width: 0,
		height: 0
	};
	this.cost = {
		width: 0,
		height: 0
	};
	this.min = {
		width: 0,
		height: 0
	};
	this.max = {
		width: 0,
		height: 0
	};
	this.rev = 0;
	this.calc_rev=0;
	this.calc_enabled =false;
	this.warranty = {
		width: 0,
		height: 0
	};
	this.image_norm = null;
	this.image_turn = null;
	this.imgDom = null;
	this.mat_name = 'Нет';
	this.b64={};
	this.materials = null;
	this.getB64Pic = function(data, cb) {
		cb({tid:data.tid,b64:data.fname});
	};

	if (typeof window !== "undefined") {
		if (window && window.app && window.app.methods) {
			if (window.app.methods.getB64Pic) {
				this.getB64Pic = window.app.methods.getB64Pic
			}
		}
	}
	this.postInit = function() {
		this.link = '/calculator/materials/' + this.app.type + this.app.subtype + '/' + this.alias + '/' + this.value + '/';
		this.materials = this.app.materials;
		this.materialRest = this.app.materialRest;
		//console.log('postInit',this.alias, this.enabled, this.visible);
	};

	this.setVal = function (val, callback=true) {
		this.b64={};
		if (!val) val = 0;
		//console.log('MATERIAL:setVal',this.alias, val);
		this.value = parseFloat(val);
		if (isNaN(this.value)) this.value=0;
		this.validate();
		this.mat_name = 'Нет';


		if (this.value === 0) this.cost = 0; else if (typeof this.app.materials[this.value] !== "undefined" && this.app.materials[this.value] != null) {
			//console.log('self.app.materials',this.app.materials,this.value);
			this.mat_name = this.app.materials[this.value].name;
			this.app.mat_name = this.mat_name;
			if (this.app.materials[this.value].isCurrentAction) this.isCurrentAction = this.app.materials[this.value].isCurrentAction;
			if (this.app.materials[this.value].currentActionInfo) this.currentActionInfo = this.app.materials[this.value].currentActionInfo;

			this.isCurrentAction_stored = this.isCurrentAction;
			this.currentActionInfo_stored = this.currentActionInfo;

			this.paramCost = parseFloat(this.app.materials[this.value].cost);
			if (this.isCurrentAction) {
				if (this.currentActionInfo.show_old_price)
					this.paramOldCost = parseFloat(this.currentActionInfo.old_cost);
				//console.log('ClassParamMaterial:this.paramOldCost',this.paramOldCost);
			}
		}
		if (this.alias !== 'material') this.price=0;


		if (callback) this.setValCallback(this);

	};
	this.validate = function () {


		let err = true;
		this.outOfStock=false;
		for (let key in this.materials) {
			if (this.materials.hasOwnProperty(key)) {
				let mat=this.materials[key];
				if (parseInt(key) === this.value) {
					err = false;
					let red=1;
					if (this.app.materialRest && this.app.materialRest.red) red = this.app.materialRest.red;
					//console.log('MAT',mat, this.app.materialRest.red);
					if (!this.app.correct_template) {
						if (!mat.enabled || mat.ost<red) {
							err=true;
							this.outOfStock=true;
						}
					}

				}
			}
		}
		this.error = err;


		if (this.alias === 'material') {
			if (!this.error || (this.error && this.outOfStock)) {
/*
				if (this.app.oParams.LambrekenMaterial) {
					if (this.app.oParams.LambrekenMaterial.enabled && this.app.oParams.LambrekenMaterial.visible) {
						this.app.oParams.LambrekenMaterial.value = this.value;
					}
				}

*/
				this.app.setMaterialCalc(this, function (material, item) {
					//console.log('MATERIAL:setVAL',material.rev,material.calc_rev)
					const rev = material.calc_rev;
					if (typeof item.oParams !== "undefined" && item.oParams != null) {
						if (typeof item.oParams.MaterialCalc !== "undefined" && item.oParams.MaterialCalc != null) {

							switch (rev) {
								case 1:
									item.oParams.MaterialCalc.setVal(rev);
									item.oParams.MaterialCalc.hide();
									//console.log('MaterialCalc:hide',rev);
									break;
								case 2:
									item.oParams.MaterialCalc.setVal(rev);
									item.oParams.MaterialCalc.hide();
									//console.log('MaterialCalc:hide',rev);
									break;
								case 3:
									//item.oParams.MaterialCalc.setVal(1);
									item.oParams.MaterialCalc.show();
									//console.log('MaterialCalc:show',rev);
									break;
								case 0:
									item.oParams.MaterialCalc.setVal(rev);
									item.oParams.MaterialCalc.disable();
									//console.log('MaterialCalc:disable',rev);
									break;
							}
						}
					}
					material.paramMaterialApply();
				});
			}



		}
		this.images = null;
		this.icon = null;
		this.image = null;
		this.image_norm = null;
		this.image_turn = null;
		this.prv = null;
		this.prv_norm = null;
		this.prv_turn = null;





		if (this.app.materials[this.value]) {
			if (this.app.materials[this.value].img) this.images = this.app.materials[this.value].img;
		}

		if (this.value !== 0 && !this.error) {

		//	if (this.alias === 'LambrekenMaterial') console.log('validate',this.alias, this.value, this.images);

			//console.log(this.value,this.app.materials);


			/*
			this.icon = this.pics.url + this.app.materials[this.value].tid + '_icon-60.jpg';
			this.image = '';// this.pics.url+this.app.materials[this.value].tid+'_norm-'+this.pics.resolution+'.jpg';
			this.image_norm = this.pics.url + this.app.materials[this.value].tid + '_norm-' + this.pics.resolution + '.jpg';
			this.image_turn = this.pics.url + this.app.materials[this.value].tid + '_turn-' + this.pics.resolution + '.jpg';
*/

		//	console.log('O',this.app.materials[this.value].img);


			//let imgInit= this.app.materials[this.value].img;

			if (this.images) {
				this.icon = this.images.ico ? this.images.ico : null;
				this.image_norm = this.images.ico1 ? this.images.ico1 : null;
				this.image_turn = this.images.ico2 ? this.images.ico2 : null;
				this.prv_norm = this.images.prv1 ? this.images.prv1 : null;
				this.prv_turn = this.images.prv2 ? this.images.prv2 : null;
			}


			this.image = this.image_norm ? this.image_norm : this.image_turn ? this.image_turn : null;
			this.prv = this.prv_norm ? this.prv_norm : this.prv_turn ? this.prv_turn : null;

			if (this.app.oParams.MaterialCalc) {
				if (this.app.oParams.MaterialCalc.value === 2) {
					this.image = this.image_turn ? this.image_turn : this.image_norm ? this.image_norm : null;
					if (this.alias === 'material') this.prv = this.prv_turn ? this.prv_turn : this.prv_norm ? this.prv_norm : null;

				}
			}

			if (this.alias === 'LambrekenMaterial' && this.images) {
				this.prv = this.images.lambr ? this.images.lambr : null;
			}


			//this.icon = this.image;

			//this.testIMG();
		}

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
	};
	this.afterSetMaterialCalcCallBack = function (rev, item) {
	};
	this.paramMaterialApply = function () {
		if (this.alias === 'material') {
			if (this.app.oParams.width) this.app.oParams.width.validate();
			if (this.app.oParams.height) this.app.oParams.height.validate();
		}
	};
	this.getParamPrice = function () {
		let self = this;
		self.app.addLocalPrice(self);
		return self.price;
	};

	this.getModel = function(){
		return  {
			alias: this.alias,
			key: this.value,
			name: this.name,
			val: this.mat_name,
			mes: this.mesure,
			descr:this.descr,
		};
	};




	this.preview = function(ar) {
		ar[this.alias] = this.getModel();
		/*
		ar.material_img =  {
			alias: 'material_img',
			key: 0,
			name: this.strings.material_img?this.strings.material_img.name:'',
			val: this.image,
			mes: ''
		};
		*/
		ar.material_ico =  {
			alias: 'material_ico',
			key: 0,
			name: this.strings.material_ico?this.strings.material_ico.name:'',
			//val: this.icon,
			val: this.image,
			mes: ''
		};
		if (this.isCurrentAction && this.currentActionInfo) {
			ar.current_action =  {
				alias: 'current_action',
				key: 0,
				name: this.strings.current_action?this.strings.current_action.name:'',
				val: this.currentActionInfo.name,
				mes: ''
			};
		}

		return ar;
	};
	this.init();
}; //class material
export default ClassParamMaterial;
