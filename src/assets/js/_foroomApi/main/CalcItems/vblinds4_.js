var vblinds4 = function () {

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		var price = 0.00;
		var cost_height=0;
		var cost_height2=0;
		var cost_height3=0;
		var cost_width=0;
		var naborka_cost = 0;
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) cost_height= this.oParams.height.cost;
		if (typeof this.oParams.width  !== "undefined" && this.oParams.width  !=null) cost_width= this.oParams.width.cost;
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
		if (typeof this.oParams.NaborkaMaterial !== "undefined" && this.oParams.NaborkaMaterial !=null)
			if (this.oParams.NaborkaMaterial.enabled)
				naborka_cost= this.oParams.NaborkaMaterial.paramCost;
		material_cost=Math.max(material_cost,naborka_cost);
		price = (cost_height/1000) * (cost_width/1000) * material_cost;
		if (isNaN(price)) price = 0.00;
		return price;
	}
	this.controlHeightCorrection = function (param) {};

	this.addLocalPrice = function(o) {}

	this.setValCallback = function(o) {
		if (typeof this.oParams.lamels !== "undefined" && this.oParams.lamels !=null)
			//if (o.alias == 'width' || o.alias == 'ControlSide' || o.alias == 'Naborka' || o.alias == 'NaborkaMaterial') this.oParams.lamels.refresh(o);
    	if (o.alias == 'Naborka' || o.alias == 'NaborkaMaterial' || o.alias == 'material')
			if (typeof this.oParams.Naborka !== "undefined" && this.oParams.Naborka !=null && typeof this.oParams.NaborkaMaterial !== "undefined" && this.oParams.NaborkaMaterial !=null && typeof this.oParams.material !== "undefined" && this.oParams.material !=null)
				if (this.oParams.NaborkaMaterial.enabled && this.oParams.Naborka.value==2 && this.oParams.NaborkaMaterial.value==this.oParams.material.value) {
					this.oParams.NaborkaMaterial.error=true;
					this.error_description = 'Wrong value of '+this.alias;
					this.oParams.NaborkaMaterial.error=true;
		}
		if (typeof this.oParams.NaborkaMaterial !== "undefined" && this.oParams.NaborkaMaterial !=null) this.oParams.NaborkaMaterial.renderError();
	}
}
export default vblinds4;
