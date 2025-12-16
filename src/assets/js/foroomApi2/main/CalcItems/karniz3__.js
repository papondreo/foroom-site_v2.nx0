var karniz3 = function () {
	this.karniz_timer = null;
	this.textFieldsAsSelect = ["Angle1","Angle2","Angle3","Angle4","Angle5","Angle6"];

	this.init_local = function() {
		if (typeof this.oParams.height !== "undefined" && this.oParams.height !=null) delete(this.oParams.height);
	}

	this.smartRepairErrors = function() {
		segValidate (this.oParams);
	};

	function segValidate (oParams) {
		var a=0;
		for(var d=1; d<7; d++) {
			if (typeof oParams['Angle'+d] !== "undefined" && oParams['Angle'+d] !=null)
				if (oParams['Angle'+d].value > 0) a=d;
		}
		if (a<=0) a=1;
		for(var d=2; d<=a; d++) {
			if (typeof oParams['Segment'+d] !== "undefined" && oParams['Segment'+d] !=null && typeof oParams['Angle'+d] !== "undefined" && oParams['Angle'+d] !=null) {
				oParams['Segment'+d].min = 300;
				oParams['Segment'+d].max = 3700;
				oParams['Angle'+d].min = 90;
			}
		}
		var n = a+1;
		if (typeof oParams['Segment'+n] !== "undefined" && oParams['Segment'+n] !=null) {
			oParams['Segment'+n].min = 150;
			oParams['Segment'+n].max = 3700;
		}
		for(var d=a+1; d<7; d++) {
			var n = d+1;
			if (typeof oParams['Segment'+n] !== "undefined" && oParams['Segment'+n] !=null && typeof oParams['Angle'+d] !== "undefined" && oParams['Angle'+d] !=null) {
				oParams['Segment'+n].min = 0;
				oParams['Segment'+n].max = 0;
				oParams['Angle'+d].min = 0;
			}
		}
		for(var d=2; d<7; d++) {
			var n = d+1;
			if (typeof oParams['Segment'+d] !== "undefined" && oParams['Segment'+d] !=null && typeof oParams['Segment'+n] !== "undefined" && oParams['Segment'+n] !=null && typeof oParams['Angle'+d] !== "undefined" && oParams['Angle'+d] !=null) {
				oParams['Segment'+d].validate();
				oParams['Angle'+d].validate();
				oParams['Segment'+n].validate();
				oParams['Segment'+d].renderError();
				oParams['Angle'+d].renderError();
				oParams['Segment'+n].renderError();
			}
		}
	}

	this.smartRepairErrors2 = function() {
		var self = this;
		var Segment1 = 0;
		var Segment2 = 0;
		var Segment3 = 0;
		var Segment4 = 0;
		var Segment5 = 0;
		var Segment6 = 0;
		var Segment7 = 0;
		var Angle1 = 0;
		var Angle2 = 0;
		var Angle3 = 0;
		var Angle4 = 0;
		var Angle5 = 0;
		var Angle6 = 0;
		if (typeof this.oParams.Segment1 !== "undefined" && this.oParams.Segment1 !=null) Segment1= this.oParams.Segment1.value;
		if (typeof this.oParams.Segment2 !== "undefined" && this.oParams.Segment2 !=null) Segment2= this.oParams.Segment2.value;
		if (typeof this.oParams.Segment3 !== "undefined" && this.oParams.Segment3 !=null) Segment3= this.oParams.Segment3.value;
		if (typeof this.oParams.Segment4 !== "undefined" && this.oParams.Segment4 !=null) Segment4= this.oParams.Segment4.value;
		if (typeof this.oParams.Segment5 !== "undefined" && this.oParams.Segment5 !=null) Segment5= this.oParams.Segment5.value;
		if (typeof this.oParams.Segment6 !== "undefined" && this.oParams.Segment6 !=null) Segment6= this.oParams.Segment6.value;
		if (typeof this.oParams.Segment7 !== "undefined" && this.oParams.Segment7 !=null) Segment7= this.oParams.Segment7.value;
		if (typeof this.oParams.Angle1 !== "undefined" && this.oParams.Angle1 !=null)   Angle1= this.oParams.Angle1.value;
		if (typeof this.oParams.Angle2 !== "undefined" && this.oParams.Angle2 !=null)   Angle2= this.oParams.Angle2.value;
		if (typeof this.oParams.Angle3 !== "undefined" && this.oParams.Angle3 !=null)   Angle3= this.oParams.Angle3.value;
		if (typeof this.oParams.Angle4 !== "undefined" && this.oParams.Angle4 !=null)   Angle4= this.oParams.Angle4.value;
		if (typeof this.oParams.Angle5 !== "undefined" && this.oParams.Angle5 !=null)   Angle5= this.oParams.Angle5.value;
		if (typeof this.oParams.Angle6 !== "undefined" && this.oParams.Angle6 !=null)   Angle6= this.oParams.Angle6.value;
		self.popError('Segment3');
		self.popError('Segment4');
		self.popError('Segment5');
		self.popError('Segment6');
		self.popError('Segment7');
		self.popError('Angle2');
		self.popError('Angle3');
		self.popError('Angle4');
		self.popError('Angle5');
		self.popError('Angle6');
        if (Angle1>0) if (Angle1>=90 && Angle1<=270)  self.popError('Angle1'); else  self.pushError('Angle1');
        if (Angle2>0) if (Angle2>=90 && Angle2<=270)  self.popError('Angle2'); else  self.pushError('Angle2');
        if (Angle3>0) if (Angle3>=90 && Angle3<=270)  self.popError('Angle3'); else  self.pushError('Angle3');
        if (Angle4>0) if (Angle4>=90 && Angle4<=270)  self.popError('Angle4'); else  self.pushError('Angle4');
        if (Angle5>0) if (Angle5>=90 && Angle5<=270)  self.popError('Angle5'); else  self.pushError('Angle5');
        if (Angle6>0) if (Angle6>=90 && Angle6<=270)  self.popError('Angle6'); else  self.pushError('Angle6');
        if (Segment1>0) if (Segment1>=150 && Segment1<=3700)  self.popError('Segment1'); else  self.pushError('Segment1');
        if (Segment2>0) if (Segment2>=300 && Segment2<=3700)  self.popError('Segment2'); else  self.pushError('Segment2');
        if (Segment3>0) if (Segment3>=300 && Segment3<=3700)  self.popError('Segment3'); else  self.pushError('Segment3');
        if (Segment4>0) if (Segment4>=300 && Segment4<=3700)  self.popError('Segment4'); else  self.pushError('Segment4');
        if (Segment5>0) if (Segment5>=300 && Segment5<=3700)  self.popError('Segment5'); else  self.pushError('Segment5');
        if (Segment6>0) if (Segment6>=300 && Segment6<=3700)  self.popError('Segment6'); else  self.pushError('Segment6');
        if (Segment7>0) if (Segment7>=150 && Segment7<=3700)  self.popError('Segment7'); else  self.pushError('Segment7');
        if (Angle2>0) if (Segment3 <=0) self.pushError('Segment3');;
        if (Angle3>0) if (Segment4 <=0) self.pushError('Segment4');;
        if (Angle4>0) if (Segment5 <=0) self.pushError('Segment5');;
        if (Angle5>0) if (Segment6 <=0) self.pushError('Segment6');;
        if (Angle6>0) if (Segment7 <=0) self.pushError('Segment7');;
        if (Segment3<=0) if (Segment2>=150 && Segment2<=3700)  self.popError('Segment2');
        if (Segment4<=0) if (Segment3>=150 && Segment3<=3700)  self.popError('Segment3');
        if (Segment5<=0) if (Segment4>=150 && Segment4<=3700)  self.popError('Segment4');
        if (Segment6<=0) if (Segment5>=150 && Segment5<=3700)  self.popError('Segment5');
        if (Segment7<=0) if (Segment6>=150 && Segment6<=3700)  self.popError('Segment6');
	}

	this.getMaterialPrice = function(material, cost) {
		var material_cost = 0; if (cost) material_cost =cost; else material_cost = material.paramCost;
		var price = 0.00;
		var width=0;
		var Deflection = 0;
		if (typeof this.oParams.width !== "undefined" && this.oParams.width !=null) width= this.oParams.width.cost;
		if (typeof this.oParams.ArchType !== "undefined" && this.oParams.ArchType !=null) var ArchType= this.oParams.ArchType.value;
		if (typeof this.oParams.Deflection !== "undefined" && this.oParams.Deflection !=null) var Deflection= this.oParams.Deflection.value;
		if (typeof this.oParams.Segment1 !== "undefined" && this.oParams.Segment1 !=null) var Segment1= this.oParams.Segment1.value;
		if (typeof this.oParams.Segment2 !== "undefined" && this.oParams.Segment2 !=null) var Segment2= this.oParams.Segment2.value;
		if (typeof this.oParams.Segment3 !== "undefined" && this.oParams.Segment3 !=null) var Segment3= this.oParams.Segment3.value;
		if (typeof this.oParams.Segment4 !== "undefined" && this.oParams.Segment4 !=null) var Segment4= this.oParams.Segment4.value;
		if (typeof this.oParams.Segment5 !== "undefined" && this.oParams.Segment5 !=null) var Segment5= this.oParams.Segment5.value;
		if (typeof this.oParams.Segment6 !== "undefined" && this.oParams.Segment6 !=null) var Segment6= this.oParams.Segment6.value;
		if (typeof this.oParams.Segment7 !== "undefined" && this.oParams.Segment7 !=null) var Segment7= this.oParams.Segment7.value;
/*
		if (typeof this.oParams.Angle1 !== "undefined" && this.oParams.Angle1 !=null) this.oParams.Angle1.price=this.oParams.Angle1.cost;
		if (typeof this.oParams.Angle2 !== "undefined" && this.oParams.Angle2 !=null) this.oParams.Angle2.price=this.oParams.Angle2.cost;
		if (typeof this.oParams.Angle3 !== "undefined" && this.oParams.Angle3 !=null) this.oParams.Angle3.price=this.oParams.Angle3.cost;
		if (typeof this.oParams.Angle4 !== "undefined" && this.oParams.Angle4 !=null) this.oParams.Angle4.price=this.oParams.Angle4.cost;
		if (typeof this.oParams.Angle5 !== "undefined" && this.oParams.Angle5 !=null) this.oParams.Angle5.price=this.oParams.Angle5.cost;
		if (typeof this.oParams.Angle6 !== "undefined" && this.oParams.Angle6 !=null) this.oParams.Angle6.price=this.oParams.Angle6.cost;
*/
		if (typeof ArchType !== "undefined" && ArchType !=null) {
	        if (ArchType == 4 ) {
				var width = 0;
				if (typeof Segment1 !== "undefined" && Segment1 !=null) width += Segment1;
				if (typeof Segment2 !== "undefined" && Segment2 !=null) width += Segment2;
				if (typeof Segment3 !== "undefined" && Segment3 !=null) width += Segment3;
				if (typeof Segment4 !== "undefined" && Segment4 !=null) width += Segment4;
				if (typeof Segment5 !== "undefined" && Segment5 !=null) width += Segment5;
				if (typeof Segment6 !== "undefined" && Segment6 !=null) width += Segment6;
				if (typeof Segment7 !== "undefined" && Segment7 !=null) width += Segment7;
				price = (width/1000) * material_cost;
				if (typeof this.oParams.width !== "undefined" && this.oParams.width !=null) {
					if (this.oParams.width.cm)
						this.oParams.width.setVal(width/10);
					else
						this.oParams.width.setVal(width);
				}
            } else
				if ( ArchType == 2 || ArchType == 3 ) {
					var a = Deflection/1000;
                    var b = width/1000;
                    var p = (4*a*a+b*b)/(4*a)*Math.asin((b*a*4) /(4*a*a+b*b) );
					p = Math.round(p*10000)/10000;
					var p_o = p*100;
					p_o=Math.round(p_o * 100)/100;
					if (this.oParams.PieceLength) this.oParams.PieceLength.setVal(p_o*10);
					price =  p * material_cost;
                    price +=  price * 0.3;
                } else
                    price =  (width/1000) * material_cost;
		} else {
			price =  (width/1000) * material_cost;
		}
		if (isNaN(price)) price = 0.00;
		return price;
	}
	this.controlHeightCorrection = function (param) {};
	this.setFilterCalcItem = function (item, w, h) {
		item.calc_rev = 0;
		item.calc_enabled = item.enabled;
		return item;
	};
}

export default karniz3;
