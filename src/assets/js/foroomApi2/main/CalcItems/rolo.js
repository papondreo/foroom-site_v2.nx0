let rolo = function () {

	this.getMaterialPrice = function(material, cost) {



		console.log('rolo:getMaterialPrice');
		let material_cost = 0;
		if (cost) material_cost =cost; else material_cost = material.paramCost;
		let price = 0.00;
		let mc= material.rev;
		let cost_height=0;
		let cost_width=0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
		if (typeof this.oParams.width  !== "undefined" && this.oParams.width  !=null) cost_width= this.oParams.width.cost;
		if (typeof this.oParams.MaterialCalc  !== "undefined" && this.oParams.MaterialCalc  !=null)
			if(this.oParams.MaterialCalc.enabled) mc=this.oParams.MaterialCalc.value;
		if (mc === 2) {
    	    price =   (cost_height/1000) *  material_cost;
			price = price * 0.8;
        } else
            price =   (cost_width/1000) *  material_cost;
		if (isNaN(price)) price = 0.00;


	//	console.log('rolo1:getMaterialPrice',material, price);

		return price;
	};

	this.setMaterialCalc = function(material, cb) {
		//console.log('rolo1:setMaterialCalc');
		if(typeof material !== "undefined" && material !=null) {
			this.applyRelativeOptions(material);
			material.min.width = parseFloat(this.materials[material.value].minWidth);
			material.min.height = parseFloat(this.materials[material.value].minHeight);
			material.rev = parseInt(this.materials[material.value].rev);
			material.calc_rev = parseInt(this.materials[material.value].calc_rev);
			material.max.width = parseFloat(this.materials[material.value].maxWidth);
			material.max.height = parseFloat(this.materials[material.value].maxHeight);
			if (material.rev == 0) material.rev=3;
			if (material.calc_rev == 0) material.calc_rev=3;
			let rev = material.calc_rev;
			var rol_w=0;
			if(typeof this.oParams.MaterialCalc !== "undefined" && this.oParams.MaterialCalc !=null) rev = this.oParams.MaterialCalc.value;
			switch (rev) {
				case 1:
					material.max.width = parseFloat(this.materials[material.value].maxWidth);
					material.max.height = parseFloat(this.materials[material.value].maxHeight);
					rol_w = parseFloat(this.materials[material.value].rol_width_width);
					if(rol_w > 0)
						material.warranty.height = Math.min(rol_w, parseInt(this.options.WarrantyHeight));
					else
						material.warranty.height = parseFloat(this.materials[material.value].maxHeight);
					material.warranty.width = parseInt(this.options.WarrantyWidth);
					break;
				case 2:
					material.max.width = parseFloat(this.materials[material.value].maxWR);
					material.max.height = parseFloat(this.materials[material.value].maxHR);
					rol_w = parseFloat(this.materials[material.value].rol_width);
					if(rol_w > 0)
						material.warranty.width = Math.min(rol_w, parseInt(this.options.WarrantyWidth));
					else
			        	material.warranty.width = parseFloat(this.materials[material.value].maxWR);
					let rol_h = parseFloat(this.materials[material.value].rol_width_width);
					if(rol_h > 0)
						material.warranty.height = Math.min(rol_h, parseInt(this.options.WarrantyHeight));
					else
			        	material.warranty.height = parseInt(this.options.WarrantyHeight);
					break;
				case 3:
			    	material.max.width = parseFloat(this.materials[material.value].maxWidth);
					material.max.height = parseFloat(this.materials[material.value].maxHeight);
					rol_w = parseFloat(this.materials[material.value].rol_width_width);
					if(rol_w > 0)
						material.warranty.height = Math.min(rol_w, parseInt(this.options.WarrantyHeight));
					else
			            material.warranty.height = parseFloat(this.materials[material.value].maxHeight);
					material.warranty.width = parseInt(this.options.WarrantyWidth);
					break;
				case 0:
			    	material.max.width = parseFloat(this.materials[material.value].maxWidth);
					material.max.height = parseFloat(this.materials[material.value].maxHeight);
					rol_w = parseFloat(this.materials[material.value].rol_width_width);
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
	};
/*
	this.prepareMaterialsArray = function(arr) {
		let new_arr = {};
		for(let key in arr) {
			let val = arr[key];
			if (parseInt(val.rev) == 0) val.rev = 3;
			new_arr[val.tid] = val;
		}
		return new_arr;
	}

	*/
	this.InsertCountCorrection = function (param) {
	}
};
export default rolo;
