var karniz4 = function () {
	this.karniz_timer = null;

	this.init_local = function() {
		//if (this.oParams.height) delete(this.oParams.height);
		if (this.oParams.ControlHeight) {

			//console.log('===>',this.oParams.ControlHeight.recommended);

			if(this.oParams.ControlHeight.recommended && this.oParams.ControlHeight.recommended_value<=0) this.oParams.ControlHeight.recommended_value = this.oParams.ControlHeight.min;
		}
	}

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		//arguments.callee.name='getMaterialPrice';
		var price = 0.00;
		var width=0;
		if (typeof this.oParams.width !== "undefined" && this.oParams.width !=null) width= this.oParams.width.cost;
			price =  (width/1000) * material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	}

//ПАРМА КАРНИЗ
	this.addLocalPrice = function(o) {
    	if (o.alias == 'InsertCount' || o.alias == 'InsertSize')
			if (typeof this.oParams.InsertCount !== "undefined" && this.oParams.InsertCount !=null && typeof this.oParams.InsertSize !== "undefined" && this.oParams.InsertSize !=null && typeof this.oParams.BlockCount !== "undefined" && this.oParams.BlockCount !=null) {
				var costRing = 1;
				if (typeof this.options.CostRing !== "undefined" && this.options.CostRing !=null) costRing = parseFloat(this.options.CostRing);
				this.oParams.InsertCount.price = this.oParams.InsertSize.value / 1000 * this.oParams.InsertCount.paramCost * this.oParams.InsertCount.value;
				this.oParams.InsertSize.price = this.oParams.InsertCount.value * this.oParams.BlockCount.value * costRing;
    	}
	}
	this.controlHeightCorrection = function (param) {};
	this.setFilterCalcItem = function (item, w, h) {
		item.calc_rev = 0;
		item.calc_enabled = item.enabled;
		return item;
	};
	this.InsertCountCorrection = function (param) {
	}
}


export default karniz4;
