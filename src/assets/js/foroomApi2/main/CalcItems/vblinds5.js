var vblinds5 = function () {

	this.getMaterialPrice = function(material, cost) {
		let material_cost = 0;
		if (cost) material_cost =cost; else material_cost = material.paramCost;
		return this._calculateMaterialPrice(material_cost);
	};
	this.controlHeightCorrection = function (param) {};

	this.getMaterialOldPrice = function(material)  {
		let material_cost = material.paramCost;
		if (material.isCurrentAction && material.currentActionInfo  && material.currentActionInfo.show_old_price && material.currentActionInfo.old_cost) {
			if (material.currentActionInfo.old_cost > 0) {
				material_cost = material.currentActionInfo.old_cost;
			}
		}
		return this._calculateMaterialPrice(material_cost);
	};



	this._calculateMaterialPrice = function(material_cost) {
		let price = 0.00;
		let cost_height=0;
		let cost_height2=0;
		let cost_height3=0;
		let cost_width=0;
		if (this.oParams.height) cost_height= this.oParams.height.cost;
		if (this.oParams.width) cost_width= this.oParams.width.cost;
		if (this.oParams.lamels) {
			if (this.oParams.lamels.oParams) {
				if (this.oParams.lamels.oParams.height2)
					if (!isNaN(this.oParams.lamels.oParams.height2.value) && this.oParams.lamels.oParams.height2.enabled)
						cost_height2 = this.oParams.lamels.oParams.height2.value;
				if (this.oParams.lamels.oParams.height3)
					if (!isNaN(this.oParams.lamels.oParams.height3.value) && this.oParams.lamels.oParams.height3.enabled)
						cost_height3 = this.oParams.lamels.oParams.height3.value;
			}
		}
		cost_height = Math.max(cost_height,cost_height2,cost_height3);
		price = (cost_height/1000) * (cost_width/1000) * material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	};
	this.setValCallback = function(o) {};


	this.addLocalPrice = function(o) {};

}
export default vblinds5;
