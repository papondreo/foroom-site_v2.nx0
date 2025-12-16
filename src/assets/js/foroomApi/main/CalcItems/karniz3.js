var karniz3 = function () {
	this.karniz_timer = null;
	this.textFieldsAsSelect = ["Angle1","Angle2","Angle3","Angle4","Angle5","Angle6"];

	this.init_local = function() {
		if (this.oParams.height) delete(this.oParams.height);
		if (this.oParams.ControlHeight) {
			if(this.oParams.ControlHeight.recommended && this.oParams.ControlHeight.recommended_value<=0) this.oParams.ControlHeight.recommended_value = this.oParams.ControlHeight.min;
		}
		if (this.oParams.width) {
			let oWidth = this.oParams.width;
			oWidth.getModel = function () {
				return {
					alias: oWidth.alias,
					key: oWidth.value,
					name: oWidth.name,
					val: oWidth.cm ? oWidth.value / 10 : oWidth.value,
					mes: oWidth.mesure,
					descr: oWidth.descr

				};
			};
		}
	}
	this.getMaterialPrice = function(material, cost) {
		let material_cost = 0;
		if (cost) material_cost = cost; else material_cost = material.paramCost;
		let price = 0.00;
		let width = this.oParams.width ? this.oParams.width.cost : 0;
		let AnglesCount=0;
		let ArchType = this.oParams.ArchType ? this.oParams.ArchType.value : 0;
		if (this.oParams.width) this.oParams.width.setHeader();
		if (ArchType) {
			if (ArchType == 4) {
				width = 0;
				for (let i = 1; i <= 20; i++) {
					if (this.oParams['Segment' + i]) {
						width += this.oParams['Segment' + i].value;
					} else break;
				}
				for(let d=1; d<=20; d++) {
					if (this.oParams['Angle'+d]) {
						if (this.oParams['Angle' + d].value > 0) AnglesCount++;
					} else break;
				}
				if (this.oParams.AnglesCount)  {
					this.oParams.AnglesCount.setVal(AnglesCount);
					this.oParams.AnglesCount.applyConditions();
				}
				price = (width / 1000) * material_cost;
				if (this.oParams.width) this.oParams.width.setVal(width);

			} else if (ArchType == 2 || ArchType == 3) {

				if (this.strings && this.strings.Base) {
					if (this.oParams.width) this.oParams.width.setHeader(this.strings.Base.name);
				}
				let Deflection = this.oParams.Deflection ? this.oParams.Deflection.value : 0;
				let a = Deflection / 1000;
				let b = width / 1000;
				let p = (4 * a * a + b * b) / (4 * a) * Math.asin((b * a * 4) / (4 * a * a + b * b));
				p = Math.round(p * 10000) / 10000;
				let p_o = p * 100;
				p_o = Math.round(p_o * 100) / 100;
				if (this.oParams.PieceLength) this.oParams.PieceLength.setVal(p_o * 10);
				price = p * material_cost;
				price += price * 0.3;
			} else
				price = (width / 1000) * material_cost;
		} else {
			price = (width / 1000) * material_cost;
		}
		if (isNaN(price)) price = 0.00;
		return price;
	}

	this.smartRepairErrors = function() {
		segValidate (this.oParams);
	};

	function segValidate (oParams) {
		let a=0;
		let ang = {
			min:oParams.Angle1 ? oParams.Angle1.min : 0,
			max:oParams.Angle1 ? oParams.Angle1.max : 0,
		};
		let seg = {
			min:oParams.Segment1 ? oParams.Segment1.min : 0,
			max:oParams.Segment1 ? oParams.Segment1.max : 0,
		};

		for(let d=1; d<=20; d++) {
			if (oParams['Angle'+d]) {
				if (oParams['Angle' + d].value > 0) a = d;
			} else break;
		}
		if (a<=0) a=1;
		for(let d=2; d<=a; d++) {
			if (oParams['Segment'+d] && oParams['Angle'+d]) {
				oParams['Segment'+d].min = 300;
				oParams['Segment'+d].max = seg.max;
				oParams['Angle'+d].min = ang.min;
			}
		}
		let n = a+1;
		if (oParams['Segment'+n]) {
			oParams['Segment'+n].min = 150;
			oParams['Segment'+n].max = seg.max;
		}
		for(let d=a+1; d<=20; d++) {
			n = d+1;
			if (oParams['Segment'+n] && oParams['Angle'+d]) {
				oParams['Segment'+n].min = 0;
				oParams['Segment'+n].max = 0;
				oParams['Angle'+d].min = 0;
			} else break;
		}
		for(let d=2; d<=20; d++) {
			n = d+1;
			if (oParams['Segment'+d] && oParams['Segment'+n] && oParams['Angle'+d]) {
				oParams['Segment'+d].validate();
				oParams['Angle'+d].validate();
				oParams['Segment'+n].validate();
				oParams['Segment'+d].renderError();
				oParams['Angle'+d].renderError();
				oParams['Segment'+n].renderError();
			} else break;
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

export default karniz3;
