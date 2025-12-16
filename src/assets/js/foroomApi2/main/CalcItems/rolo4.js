var rolo4 = function () {

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		var price = 0.00;
		var mc= material.rev;
		var cost_height=0;
		var cost_width=0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
		if (typeof this.oParams.width  !== "undefined" && this.oParams.width  !=null) cost_width= this.oParams.width.cost;
		if (typeof this.oParams.MaterialCalc  !== "undefined" && this.oParams.MaterialCalc  !=null)
			if(this.oParams.MaterialCalc.enabled) mc=this.oParams.MaterialCalc.value;
		if (mc == 2) {
    	    price =   (cost_height/1000) *  material_cost;
			price = price * 0.8;
        } else
            price =   (cost_width/1000) *  material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	}
	this.controlHeightCorrection = function (param) {};

	this.setMaterialCalc = function(material, cb) {
		if(material && material.value) {
			this.applyRelativeOptions(material);
			material.min.width = parseFloat(this.materials[material.value].minWidth);
			material.min.height = parseFloat(this.materials[material.value].minHeight);
			material.rev = parseInt(this.materials[material.value].rev);
			material.calc_rev = parseInt(this.materials[material.value].calc_rev);
			material.max.width = parseFloat(this.materials[material.value].maxWidth);
			material.max.height = parseFloat(this.materials[material.value].maxHeight);
			if (material.rev == 0) material.rev=3;
			if (material.calc_rev == 0) material.calc_rev=3;
			var rev = material.calc_rev;
			if(typeof this.oParams.MaterialCalc !== "undefined" && this.oParams.MaterialCalc !=null) rev = this.oParams.MaterialCalc.value;
			switch (rev) {
				case 1:
					material.max.width = parseFloat(this.materials[material.value].maxWidth);
					material.max.height = parseFloat(this.materials[material.value].maxHeight);
					var rol_w = parseFloat(this.materials[material.value].rol_width_width);
					if(rol_w > 0)
						material.warranty.height = Math.min(rol_w, parseInt(this.options.WarrantyHeight));
					else
						material.warranty.height = parseFloat(this.materials[material.value].maxHeight);
					material.warranty.width = parseInt(this.options.WarrantyWidth);
					break;
				case 2:
					material.max.width = parseFloat(this.materials[material.value].maxWR);
					material.max.height = parseFloat(this.materials[material.value].maxHR);
					var rol_w = parseFloat(this.materials[material.value].rol_width);
					if(rol_w > 0)
						material.warranty.width = Math.min(rol_w, parseInt(this.options.WarrantyWidth));
					else
						material.warranty.width = parseFloat(this.materials[material.value].maxWR);
					var rol_h = parseFloat(this.materials[material.value].rol_width_width);
					if(rol_h > 0)
						material.warranty.height = Math.min(rol_h, parseInt(this.options.WarrantyHeight));
					else
						material.warranty.height = parseInt(this.options.WarrantyHeight);
					break;
				case 3:
					material.max.width = parseFloat(this.materials[material.value].maxWidth);
					material.max.height = parseFloat(this.materials[material.value].maxHeight);
					var rol_w = parseFloat(this.materials[material.value].rol_width_width);
					if(rol_w > 0)
						material.warranty.height = Math.min(rol_w, parseInt(this.options.WarrantyHeight));
					else
						material.warranty.height = parseFloat(this.materials[material.value].maxHeight);
					material.warranty.width = parseInt(this.options.WarrantyWidth);
					break;
				case 0:
					material.max.width = parseFloat(this.materials[material.value].maxWidth);
					material.max.height = parseFloat(this.materials[material.value].maxHeight);
					var rol_w = parseFloat(this.materials[material.value].rol_width_width);
					if(rol_w > 0)
						material.warranty.height = Math.min(rol_w, parseInt(this.options.WarrantyHeight));
					else
						material.warranty.height = parseFloat(this.materials[material.value].maxHeight);
					material.warranty.width = parseInt(this.options.WarrantyWidth);
					break;
			}
			if (typeof this.gab_plus !== "undefined" && this.gab_plus !=null)
				if (this.gab_plus) {
					material.min.width = material.min.width - material.gab.width;
					material.min.height = material.min.height - material.gab.height;
					material.max.width = material.max.width - material.gab.width;
					material.max.height = material.max.height - material.gab.height;
				}
			material.warranty.width = material.warranty.width - material.gab.width;
			material.warranty.height = material.warranty.height - material.gab.height;
			if (material.warranty.width <= 0) material.warranty.width = material.max.width;
			if (material.warranty.height <= 0) material.warranty.height = material.max.height;

			if (typeof cb !== "undefined" && cb !=null) cb(material, this);
		} // material
	}
/*
	this.prepareMaterialsArray = function(arr) {
		var new_arr = {};
		for(var key in arr) {
			var val = arr[key];
			if (parseInt(val.rev) == 0) val.rev = 3;
			new_arr[val.tid] = val;
		}
		return new_arr;
	}
	*/
}
export default rolo4;
