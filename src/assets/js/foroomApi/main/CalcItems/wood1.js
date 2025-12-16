let wood1 = function () {

	this.getMaterialPrice = function(material, cost) {
		//var material_cost = 0;
		//if (cost) material_cost = cost; else material_cost = material.paramCost;
		var tm_price = 0;
		var id = this.id;
		var height = 0;
		var width = 0;
		var price_group = -1;

		//	console.log('height.cost',this.oParams.height.cost);
		//	console.log('width.cost',this.oParams.width.cost);
		//	console.log('multiple_cost', this.multiple_cost);

		if (typeof this.oParams.height !== "undefined" && this.oParams.height != null) height = Math.ceil(this.oParams.height.cost / 100) * 10;
		if (typeof this.oParams.width !== "undefined" && this.oParams.width != null) width = Math.ceil(this.oParams.width.cost / 100) * 10;

		let square = (this.oParams.height.cost /1000) * (this.oParams.width.cost/1000);
		//if (square< 0.8) square = 0.8;
		// if (square< 1) square = 1;
		if (square>4.5) {

			this.pushError('square','Площадь изделия не должна превышать 4.5м2!');

			// this.error=true;
			//this.error_description = 'Площадь изделия не должна превышать 6м2!';
		} else {
			this.popError('square');

			//this.error_description = '';
			// this.error=false;
		}


		if (typeof this.oParams.material !== "undefined" && this.oParams.material != null)
			if (typeof this.materials[this.oParams.material.value] !== "undefined" && this.materials[this.oParams.material.value] != null)
				price_group = parseInt(this.materials[this.oParams.material.value].priceGroup);
		var min_multiple_w = 0;
		var min_multiple_h = 0;
		var multiple_arr = null;

		if (typeof this.multiple_cost !== "undefined" && this.multiple_cost != null)
			if (typeof this.multiple_cost[id] !== "undefined" && this.multiple_cost[id] != null)
				if (typeof this.multiple_cost[id][price_group] !== "undefined" && this.multiple_cost[id][price_group] != null)
					multiple_arr = this.multiple_cost[id][price_group];
		min_multiple_w = this.get_min_from_multiple(multiple_arr);
		if (width < min_multiple_w) width = min_multiple_w;
		if (width > 0)
			if (typeof this.multiple_cost !== "undefined" && this.multiple_cost != null)
				if (typeof this.multiple_cost[id] !== "undefined" && this.multiple_cost[id] != null)
					if (typeof this.multiple_cost[id][price_group] !== "undefined" && this.multiple_cost[id][price_group] != null)
						if (typeof this.multiple_cost[id][price_group][width] !== "undefined" && this.multiple_cost[id][price_group][width] != null)
							multiple_arr = this.multiple_cost[id][price_group][width];
		min_multiple_h = this.get_min_from_multiple(multiple_arr);
		if (height < min_multiple_h) height = min_multiple_h;
		if (height > 0)
			if (typeof this.multiple_cost !== "undefined" && this.multiple_cost != null)
				if (typeof this.multiple_cost[id] !== "undefined" && this.multiple_cost[id] != null)
					if (typeof this.multiple_cost[id][price_group] !== "undefined" && this.multiple_cost[id][price_group] != null)
						if (typeof this.multiple_cost[id][price_group][width] !== "undefined" && this.multiple_cost[id][price_group][width] != null)
							if (typeof this.multiple_cost[id][price_group][width][height] !== "undefined" && this.multiple_cost[id][price_group][width][height] != null)
								tm_price = parseFloat(this.multiple_cost[id][price_group][width][height]);


							return tm_price;

	};


	this.getMaterialOldPrice = function(material) {
		if (material.isCurrentAction && material.currentActionInfo  && material.currentActionInfo.show_old_price && material.currentActionInfo.perc) {
			if (material.currentActionInfo.perc > 0) {
				let price = this.getMaterialPrice(material,material.currentActionInfo.old_cost);
				material.price = material.price - (material.price * material.currentActionInfo.perc);
				return price;
			}
		}
		return 0.00;
	};

	this.get_min_from_multiple = function (multiple_arr) {
		var w = 0;
		if (multiple_arr != null) {
			for (var key in multiple_arr) {
				var val = multiple_arr[key];
				var k = parseInt(key);
				// console.log('key='+key);
				if (w == 0) w = k;
				else if (k < w) w = k;
			}
		}
		return w;
	}

	this.setMaterialCalc = function (material, cb) {
		if (typeof material !== "undefined" && material != null) {
			this.applyRelativeOptions(material);
			material.min.width = parseFloat(this.materials[material.value].minWidth);
			material.min.height = parseFloat(this.materials[material.value].minHeight);
			material.max.width = parseFloat(this.materials[material.value].maxWidth);
			material.max.height = parseFloat(this.materials[material.value].maxHeight);
			if (typeof this.gab_plus !== "undefined" && this.gab_plus != null)
				if (this.gab_plus) {
					material.min.width = material.min.width - material.gab.width;
					material.min.height = material.min.height - material.gab.height;
					material.max.width = material.max.width - material.gab.width;
					material.max.height = material.max.height - material.gab.height;
				}
			material.warranty.width = 0;//material.warranty.width - material.gab.width;
			material.warranty.height = 0;//material.warranty.height - material.gab.height;
			if (material.warranty.width <= 0) material.warranty.width = material.max.width;
			if (material.warranty.height <= 0) material.warranty.height = material.max.height;
			this.oParams.width.warranty_v = material.warranty[this.oParams.width.alias];
			this.oParams.width.min = material.min[this.oParams.width.alias];
			this.oParams.width.max = material.max[this.oParams.width.alias];
			this.oParams.height.warranty_v = material.warranty[this.oParams.height.alias];
			this.oParams.height.min = material.min[this.oParams.height.alias];
			this.oParams.height.max = material.max[this.oParams.height.alias];
			if (typeof cb !== "undefined" && cb != null) cb(material, this);
		} // material
	}


	this.InsertCountCorrection = function (param) {
	}
	this.addMaxWidth = function (param) {
		param.max = param.min + 200;
	}
	this.InsertPicDirectionCorrection = function (params, width, height) {
		// console.log(params);
		let square =(height/1000) * (width/1000);
		if(!params.options.PicDirection_2.costDefault){
			params.options.PicDirection_2.costDefault = Object.assign(params.options.PicDirection_2.cost);
		}
		if(square > 1){	
			params.options.PicDirection_2.cost = params.options.PicDirection_2.costDefault * square;
		}
		else{
			params.options.PicDirection_2.cost = params.options.PicDirection_2.costDefault;
		}
	
		
	}
	this.ControlTypeCorrection = function (params, width, height) {
		// console.log(params);
		// let square =(height/1000) * (width/1000);
		// if(!params.options.ControlType_5.costDefault){
		// 	params.options.ControlType_5.costDefault = Object.assign(params.options.ControlType_5.cost);
		// }
		// if(square > 1){
		// 	params.options.ControlType_5.cost = params.options.ControlType_5.costDefault * square;
		// }
		// else{
		// 	params.options.ControlType_5.cost = params.options.ControlType_5.costDefault;
		// }
	
		
	}
};


export default wood1;
