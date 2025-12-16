/*
let ClassParamDimentionGab = function(dimention, pref) {
	this.pref = pref;
	this.type = pref+'_dimention';
	this.dim = dimention;
	this.dom = null;
	this.eventDom = null;
	this.domOptions = {};
	this.app = dimention.app;
	this.collectConditionRelate = dimention.collectConditionRelate;
	this.applyConditions = dimention.applyConditions;

	this.inputMin = null;
	this.inputMax = null;
	this.min=0;
	this.max=0;
	this.name = '';
	this.error = false;
	this.warranty = true;
	this.cm = false;
	this.enabled = false;
	this.visible = false;
	this.init = function () {
		this.prefix = this.dim.prefix;
		this.alias = this.pref+'_'+this.dim.alias;
		this.value = this.dim[this.pref];



		if (this.dim.strings && this.dim.strings[this.alias]) this.name = this.dim.strings[this.alias].name;
		this.header = this.name;
		this.mesure = this.dim.mesure;
		this.cm = this.dim.cm;
		if (this.dim.enabled) this.enabled = true;
		if (this.dim.visible) this.visible = true;
		if (this.mesure) this.header+= ', (' + this.mesure + ')';

		//console.log('ALT', this.alias);
		this.collectConditionRelate();
		this.refresh();
	};
	this.setVal = function (val) {
		this.value = val;
		this.dim.setAltVal(val, this.pref);
	};
	this.refresh = function () {
		this.min = this.dim[this.pref+'_min']
		this.max = this.dim[this.pref+'_max'];
		this.value  = this.dim[this.pref];
		this.warranty = this.dim.warranty;
		this.error = this.dim.error;
	};
	this.init();
};
export default ClassParamDimentionGab;
*/
