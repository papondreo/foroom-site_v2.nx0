let ClassParamDimention = function(o,app) {
	this.app = app;
	this.type = o.typ;
	this.warranty = false;
	this.gab = 0;
	this.cost = 0;
	this.warranty_v = 0;
	this.o = o;
	this.domOptions = {};
	this.inputMin = null;
	this.inputMax = null;
	this.LabelCost = false;

	this.postInit = function() {
	};

	this.setVal = function (val, callback = true) {
		this.value = parseFloat(val);
		if (isNaN(this.value)) this.value=0;
		this.validate();
		if (callback) this.setValCallback(this);
	};

	this.setAltVal = function (val, pref) {
		this[pref] = parseFloat(val);
		if (isNaN(this[pref])) this[pref]=0;
		if (typeof this.app.oParams !== "undefined" && this.app.oParams != null)
			if (typeof this.app.oParams.material !== "undefined" && this.app.oParams.material != null) {
				let ar = {
					gab: this.app.oParams.material.gab[this.alias],
					cost: this.app.oParams.material.cost[this.alias],
				};
				this.value = this[pref] - ar[pref];
				ar[pref] = null;
				for(let k in ar) {
					if (ar.hasOwnProperty(k)){
						if (ar[k]) {
							this[k] = this.value + ar[k];

						}
					}
				}
			}
		this.setVal(this.value);
	};
	this.validate = function () {
		let err = true;
		if (typeof this.app.oParams !== "undefined" && this.app.oParams != null) {
			if (typeof this.app.oParams.material !== "undefined" && this.app.oParams.material != null) {
				let gab = this.app.oParams.material.gab[this.alias];
				let cost = this.app.oParams.material.cost[this.alias];
				this.warranty_v = this.app.oParams.material.warranty[this.alias];
				this.min = this.app.oParams.material.min[this.alias];
				this.max = this.app.oParams.material.max[this.alias];
				this.setParams();
				this.applyPlusDeltas();

				this.gab_min = this.min + gab;
				this.gab_max = this.max + gab;
				this.cost_min = this.min + cost;
				this.cost_max = this.max + cost;
				this.gab = this.value + gab;
				this.cost = this.value + cost;

				this.warranty = true;
				if (this.value > this.max) this.warranty = false;
				if (typeof this.app.warranty !== "undefined" && this.app.warranty != null)
					if (typeof this.app.warranty[this.alias] !== "undefined" && this.app.warranty[this.alias] != null)
						this.app.warranty[this.alias] = this.warranty;
				this.warranty_v = Math.max(this.warranty_v, this.max);
				const currentMaterial = this.app.oParams.material.materials ? this.app.oParams.material.materials[this.app.oParams.material.value] : null;
				if(this.alias === 'width'){
				if(currentMaterial){
					this.warranty_v = Math.min(this.warranty_v, currentMaterial.warrantyWidth);	
				}
				else{
					this.warranty_v = Math.min(this.warranty_v, this.max);	
				}
				}
				
				
				if (this.value >= this.min && this.value <= this.warranty_v) err = true; else err = false;
				if (typeof this.o.cost !== "undefined" && this.o.cost != null) this.paramCost = parseFloat(this.o.cost);
				if (typeof this.o.perc !== "undefined" && this.o.perc != null) this.paramPerc = parseFloat(this.o.perc) / 100;
			}
			if (this.app.oParams['gab_'+this.alias]) {
				this.app.oParams['gab_'+this.alias].value =this.gab;
				this.app.oParams['gab_'+this.alias].validate();
			}
			if (this.app.oParams['cost_'+this.alias]) {
				this.app.oParams['cost_'+this.alias].value =this.cost;
				this.app.oParams['cost_'+this.alias].validate();
			}
			//console.log('dimention: O :',this.o.relate);
			if (this.o.relate){
				let relate = this.o.relate;
				let prev=null;
				for(let k in relate) {
					if (relate.hasOwnProperty(k)) {
						let val = parseInt(k);
						if (!prev)
							prev = {val:val,data:relate[k]}
						else
							if (this.value >= val)
								prev = {val: val, data: relate[k]}
					}
				}
				if (prev && prev.data) {
					let relates=prev.data;
					for (let rkey in relates) {
						if (relates.hasOwnProperty(rkey)) {
							let rval = relates[rkey];
							//console.log(rkey,rval);
							if (parseInt(rval) == 0)
								this.app.disableParam(rkey);
							else
								this.app.enableParam(rkey);
						}
					}
				}
			}

		}
		this.error = !err;
		if (this.error)
			this.error_description = 'Неверное значение';
		else
			this.error_description = '';
		if (typeof this.alt !== "undefined" && this.alt != null) this.alt.refresh();
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


	this.release = function(ar) {
		//console.log('DIMENTION RELEASE!!');

		if (this.app.oParams) {
			if (!this.app.oParams['gab_'+this.alias]) ar['gab_'+this.alias] = this.gab;
			if (!this.app.oParams['cost_'+this.alias]) ar['cost_'+this.alias] = this.cost;
		}
		ar[this.alias] = this.value;
		return ar;
	};



	this.init();
}; //class
export default ClassParamDimention;
