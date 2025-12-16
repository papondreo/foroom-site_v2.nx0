var vblinds1 = function () {

	this.getMaterialPrice = function(material, cost) {
		let material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		let karniz_cost = 0;
		if (typeof this.options.karniz !== "undefined" && this.options.karniz !=null)
			karniz_cost = parseFloat(this.options.karniz);
		if (material.isCurrentAction && material.currentActionInfo  && material.currentActionInfo.show_old_price && material.currentActionInfo.perc) {
			if (material.currentActionInfo.perc > 0) {
				let perc = 1 - material.currentActionInfo.perc;
				karniz_cost = karniz_cost * perc;
			}
		}
		return this._calculateMaterialPrice(material_cost, karniz_cost);
	};
	this.controlHeightCorrection = function (param) {};

	this.getMaterialOldPrice = function(material)  {
		let material_cost = material.paramCost;
		let karniz_cost = 0;
		if (typeof this.options.karniz !== "undefined" && this.options.karniz !=null)
			karniz_cost = parseFloat(this.options.karniz);
		if (material.isCurrentAction && material.currentActionInfo  && material.currentActionInfo.show_old_price && material.currentActionInfo.old_cost) {
			if (material.currentActionInfo.old_cost > 0) {
				material_cost = material.currentActionInfo.old_cost;
			}
		}
		return this._calculateMaterialPrice(material_cost, karniz_cost);
	};

	this._calculateMaterialPrice = function(material_cost, karniz_cost) {
		let price = 0.00;
		let cost_height=0;
		let cost_height2=0;
		let cost_height3=0;
		let cost_width=0;
		let karniz = 0;
		let naborka_cost = 0;
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
		if (this.oParams.NaborkaMaterial && this.oParams.NaborkaMaterial.enabled)
			naborka_cost= this.oParams.NaborkaMaterial.paramCost;
		material_cost=Math.max(material_cost,naborka_cost);
		let S = (cost_height/1000) * (cost_width/1000);
		if(S<1)S=1;
		price = S * material_cost;
		karniz = cost_width<1000?karniz_cost:((cost_width/1000) * karniz_cost);
		price+=karniz;
		//console.log('pr',price, karniz,material_cost);
		if (isNaN(price)) price = 0.00;
		return price;
	};
	this.setValCallback = function(o) {
		if (this.oParams.lamels)
			//if (o.alias == 'width' || o.alias == 'ControlSide' || o.alias == 'Naborka' || o.alias == 'NaborkaMaterial') this.oParams.lamels.refresh(o);
    	if (o.alias === 'Naborka' || o.alias === 'NaborkaMaterial' || o.alias === 'material') {
			if (this.oParams.Naborka && this.oParams.NaborkaMaterial && this.oParams.material)
				if (this.oParams.NaborkaMaterial.enabled && this.oParams.Naborka.value === 2) {

					this.oParams.NaborkaMaterial.currentActionInfo = this.oParams.NaborkaMaterial.currentActionInfo_stored;
					this.oParams.NaborkaMaterial.isCurrentAction = this.oParams.NaborkaMaterial.isCurrentAction_stored;
					this.oParams.material.currentActionInfo = this.oParams.material.currentActionInfo_stored;
					this.oParams.material.isCurrentAction = this.oParams.material.isCurrentAction_stored;

					if (this.oParams.NaborkaMaterial.paramCost > this.oParams.material.paramCost) {
						if (this.oParams.NaborkaMaterial.isCurrentAction) {
							this.oParams.material.currentActionInfo = this.oParams.NaborkaMaterial.currentActionInfo;
							this.oParams.material.isCurrentAction = true;
							this.oParams.material.old_price=this.oParams.NaborkaMaterial.old_price;
						} else {
							this.oParams.material.currentActionInfo = null;
							this.oParams.material.isCurrentAction = false;
							this.oParams.material.old_price=0;
						}
					}
					//console.log('NaborkaMaterial.currentActionInfo',this.oParams.NaborkaMaterial.isCurrentAction,this.oParams.NaborkaMaterial.currentActionInfo);
					//console.log('material.currentActionInfo',this.oParams.material.isCurrentAction,this.oParams.material.currentActionInfo);
					if (this.oParams.NaborkaMaterial.value === this.oParams.material.value) {
						this.oParams.NaborkaMaterial.error = true;
						this.error_description = 'Wrong value of ' + this.alias;
						this.oParams.NaborkaMaterial.error = true;
					}
				}
		}
		if (this.oParams.NaborkaMaterial) this.oParams.NaborkaMaterial.renderError();

	if (this.oParams.LambrekenMaterial && this.oParams.material) {
		if (this.oParams.LambrekenMaterial.enabled && this.oParams.LambrekenMaterial.visible) {
			if (!this.oParams.LambrekenMaterial.value) {
			//	console.log('Set LambrekenMaterial to: ',this.oParams.material.value);
				this.oParams.LambrekenMaterial.value = this.oParams.material.value;
			}
		} else {
			this.oParams.LambrekenMaterial.value = 0;
		}
	}


	};
	this.addLocalPrice = function(o) {};

};
export default vblinds1;
