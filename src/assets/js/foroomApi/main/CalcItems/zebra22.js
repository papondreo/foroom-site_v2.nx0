var zebra22 = function () {

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		var price = 0.00;
		var cost_height=0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
       	    price =   (cost_height/1000) *  material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	}
	this.controlHeightCorrection = function (param) {};

}


export default zebra22;
