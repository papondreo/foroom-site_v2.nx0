var hblinds2 = function () {

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		var price = 0.00;
		var cost_height=0;
		var cost_width=0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
		if (typeof this.oParams.width  !== "undefined" && this.oParams.width  !=null) cost_width= this.oParams.width.cost;
		var square =(cost_height/1000) * (cost_width/1000);
        if (square< 0.8) square = 0.8;
        if (square>6) {
	        this.error=true;
	        this.error_description = 'Площадь изделия не должна превышать 6м2!';
	        } else {
		    	this.error_description = '';
		        this.error=false;
		    }
        price =  square  *  material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	};
	this.InsertCountCorrection = function (param) {
	}
};

export default hblinds2;
