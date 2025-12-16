let zebra21 = function () {

	this.getMaterialPrice = function(material, cost) {
		let material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		let price = 0.00;
		let cost_height=0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
       	    price =   (cost_height/1000) *  material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	}
	this.controlHeightCorrection = function (param) {
		let cost_height=0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
		param.value = cost_height + param.min;
	};

}

export default zebra21;
