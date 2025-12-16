var plisse1 = function () {

	this.getMaterialPrice = function (material, cost) {
		//var material_cost = 0;
		//if (cost) material_cost = cost; else material_cost = material.paramCost;
		var tm_price = 0;
		var id = this.id;
		var height = 0;
		var width = 0;
		var price_group = -1;

		//	console.log('height.cost',this.oParams.height.cost);
		//	console.log('width.cost',this.oParams.width.cost);


		//console.log('multiple_cost', this.multiple_cost);

		if (typeof this.oParams.height !== "undefined" && this.oParams.height != null) height = Math.ceil(this.oParams.height.cost / 100) * 10;
		if (typeof this.oParams.width !== "undefined" && this.oParams.width != null) width = Math.ceil(this.oParams.width.cost / 100) * 10;
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

		//    console.log('tm_price',tm_price);
		return tm_price;
	};
	this.controlHeightCorrection = function (param) {};


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

/*
//the function above should to be used in case when discounts should be applied for every single fabric(material) regardless of it's priceGroup!
//the function below is actual in case when all discounts have been applied by frontend, but this will work only for discounts within priceGroups!

	this.getMaterialOldPrice__ = function(material) {
		//console.log('PLISSE:',material.currentActionInfo);
		if (material.isCurrentAction && material.currentActionInfo  && material.currentActionInfo.show_old_price && material.currentActionInfo.perc) {
			if (material.currentActionInfo.perc > 0) {
				let price = this.getMaterialPrice(material,material.currentActionInfo.old_cost);
				let perc = 1 - material.currentActionInfo.perc;
				let old_price = price / perc;
				return old_price;
			}
		}
		return 0.00;
	};
*/
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
}

export default plisse1;
