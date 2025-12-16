var karniz10 = function () {
	this.karniz_timer = null;

	this.init_local = function() {
		if (this.oParams.height) delete(this.oParams.height);
		if (this.oParams.ControlHeight) {
			if(this.oParams.ControlHeight.recommended && this.oParams.ControlHeight.recommended_value<=0) this.oParams.ControlHeight.recommended_value = this.oParams.ControlHeight.min;
		}
	}

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		var price = 0.00;
		var width=0;
			if (typeof this.oParams.width !== "undefined" && this.oParams.width !=null) width= this.oParams.width.cost;
			
			if(width < 1000){
				price = material_cost;
			}
			else{
				price =  (width/1000) * material_cost;
			}
			
		if (isNaN(price)) price = 0.00;
		//console.log(price);
		return price;
	}
	this.controlHeightCorrection = function (param) {};

	this.setFilterCalcItem = function (item, w, h) {
		item.calc_rev = 0;
		item.calc_enabled = item.enabled;
		return item;
	};
}
export default karniz10;
