var introma1 = function () {

	this.getMaterialPrice = function(material, cost) {
		let material_cost = 0;
		if (cost) material_cost =cost; else material_cost = material.paramCost;
		let karniz_cost = 0;
		if (typeof this.options.karniz !== "undefined" && this.options.karniz !=null)
			karniz_cost = parseFloat(this.options.karniz);
		if (material.isCurrentAction && material.currentActionInfo  && material.currentActionInfo.show_old_price && material.currentActionInfo.perc) {
			if (material.currentActionInfo.perc > 0) {
				let perc = 1 - material.currentActionInfo.perc;
				karniz_cost = karniz_cost * perc;
			}
		}
		return this._calculateMaterialPrice(material_cost, karniz_cost);
	};
	this.controlHeightCorrection = function (param) {
		if (typeof this.oParams.ControlHeight  !== "undefined" && this.oParams.ControlHeight !=null && typeof this.oParams.width !== "undefined" && this.oParams.width  !=null) {

			let cost_width= this.oParams.height.cost;
			let tmp9 = 2/3;
			if (this.oParams.ControlHeight.enabled) {
				this.oParams.ControlHeight.value = Math.round(cost_width * tmp9);
			}else
				this.oParams.ControlHeight.price=0;
		}
	};

	this.getMaterialOldPrice = function(material)  {
		let material_cost = material.paramCost;
		let karniz_cost = 0;
		if (typeof this.options.karniz !== "undefined" && this.options.karniz !=null)
			karniz_cost = parseFloat(this.options.karniz);
		if (material.isCurrentAction && material.currentActionInfo  && material.currentActionInfo.show_old_price && material.currentActionInfo.old_cost) {
			if (material.currentActionInfo.old_cost > 0) {
				material_cost = material.currentActionInfo.old_cost;
			}
		}
		return this._calculateMaterialPrice(material_cost, karniz_cost);
	};

	this.addLocalPrice = function(o) {
		if (o.alias == 'MountType' || o.alias == 'MountPoint' || o.alias == 'width')
			if (typeof this.oParams.MountType  !== "undefined" && this.oParams.MountType !=null && typeof this.oParams.width !== "undefined" && this.oParams.width  !=null) {

				let cost_width= this.oParams.width.cost;
				let tmp9 = 2;
				if (cost_width>=1200) tmp9=3;
				if (this.oParams.MountType.enabled) {
					this.oParams.MountType.price = this.oParams.MountType.paramCost * tmp9;
				}else
					this.oParams.MountType.price=0;
           }
		if(o.alias == 'Magnet'){
			if(typeof this.oParams.Magnet  !== "undefined" && this.oParams.Magnet !=null && typeof this.oParams.width !== "undefined" && this.oParams.width  !=null){
				let cost_width = this.oParams.width.cost;
				let tmp9 = 2;
				if (cost_width>=1200) tmp9=3;
				if (this.oParams.Magnet.enabled)
					this.oParams.Magnet.price = this.oParams.Magnet.paramCost * tmp9;
				else
					this.oParams.Magnet.price=0;

			}
		}
	};

	this._calculateMaterialPrice = function(material_cost, karniz_cost) {
		let price = 0.00;
		let cost_height=0;
		// let cost_width=0;
		// let karniz = 0;
		if (this.oParams.height) cost_height= this.oParams.height.cost;
		// if (this.oParams.width) cost_width= this.oParams.width.cost;
		price = (cost_height/1000) * karniz_cost;
		// karniz = (cost_width/1000) * karniz_cost;
		// price+=karniz;
		if (isNaN(price)) price = 0.00;
		return price;
	};
	this.InsertCountCorrection = function (param) {
	}

};
export default introma1;
