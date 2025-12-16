let services1 = function () {
	this.init = (e)=>{
		return e;
	};
	this.init_local = function() {
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) delete(this.oParams.height);
		if (typeof this.oParams.width  !== "undefined" && this.oParams.width  !=null) delete(this.oParams.width);
	};
	this.getMaterialPrice = function(material, cost) {
		let material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		return material_cost;
	};
	this.controlHeightCorrection = function (param) {
	};

	this.get_price = function(arr) {
		let price = parseFloat(arr.material);
		if (isNaN(price)) price = 0.00;
		return price;
	};

	this.setFilterCalcItem = function (item, w, h) {
		item.calc_rev = 0;
		item.calc_enabled = item.enabled;
		return item;
	};
	this.InsertCountCorrection = function (param) {
		return param;
	};
};

export default services1;
