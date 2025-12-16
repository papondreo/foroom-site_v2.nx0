var vblinds3 = function () {

	this.init_local = function() {
		//if (this.oParams.height) delete(this.oParams.height);
		if (this.oParams.ControlHeight) {
			if(this.oParams.ControlHeight.recommended && this.oParams.ControlHeight.recommended_value<=0) this.oParams.ControlHeight.recommended_value = this.oParams.ControlHeight.min;
		}
	}

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		var price = 0.00;
		var cost_width=0;
		if (typeof this.oParams.width  !== "undefined" && this.oParams.width  !=null) cost_width= this.oParams.width.cost;
			if(cost_width<1000){
				price =  material_cost;
			}else{
				price =  (cost_width/1000) * material_cost;
			}
		if (isNaN(price)) price = 0.00;
		return price;
	}
	this.controlHeightCorrection = function (param) {};

	this.get_price = function(arr) {
		var self= this;
    	var price = 0.00;
    	var material_cost= parseFloat(self.materials[arr.material].cost);
    	price =  (arr.cost_width/1000) * material_cost;
		price +=self.get_addPrice(arr, price);
    	if (isNaN(price)) price = 0.00;
    	return price;
	}
}
export default vblinds3;
