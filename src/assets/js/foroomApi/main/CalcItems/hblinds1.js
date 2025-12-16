let hblinds1 = function () {

	this.getMaterialPrice = function(material, cost) {
		let material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		let cost_height=0;
		let cost_width=0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
		if (typeof this.oParams.width  !== "undefined" && this.oParams.width  !=null) cost_width= this.oParams.width.cost;
		let square =(cost_height/1000) * (cost_width/1000);
       // if (square< 0.8) square = 0.8;
		if (square< 1) square = 1;

		if (square>6) {

        	this.pushError('square','Площадь изделия не должна превышать 6м2!');

	       // this.error=true;
	        //this.error_description = 'Площадь изделия не должна превышать 6м2!';
	        } else {
			this.popError('square');

			//this.error_description = '';
		       // this.error=false;
		    }
		let price =  square  *  material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	};
	this.InsertCountCorrection = function (param) {
	}
};


export default hblinds1;
