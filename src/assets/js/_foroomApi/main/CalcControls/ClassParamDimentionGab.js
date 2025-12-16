let ClassParamDimentionGab = function(o,app) {
	this.app = app;
	this.type = o.typ;
	this.o = o;
	this.pref = '';
	this.parentAlias = '';
	this.parent = null;
	this.warranty=true;

	this.postInit = function () {
		if (this.alias.indexOf('_') != -1) {
			let spl = this.alias.split('_');
			if (spl.length > 1) {
				this.parentAlias = spl.pop();
				this.pref = spl.join('_');
			}
		}
		if (this.pref === 'gab') this.enabled = true;
		this.header = this.name;
		//if (this.descr) this.header+= ' (' + this.descr + ')';
		if (this.mesure) this.header+= ', (' + this.mesure + ')';
		//console.log('GAB',this.app.type,this.app.subtype,this.visible,this.enabled);
	};


	this.setVal = function (val, callback = true) {
		this.value = parseFloat(val);
		if (isNaN(this.value)) this.value=0;
		if (this.parent) {
			this.parent.setAltVal(this.value, this.pref);
		}
		this.validate();
		if (callback) this.setValCallback(this);
	};

	this.validate = function () {
		if (!this.parent) {
			if (this.app.oParams[this.parentAlias]) this.parent = this.app.oParams[this.parentAlias];
		}
		if (this.parent) {
			this.cm = this.parent.cm;
			this.min = this.parent[this.pref + '_min'];
			this.max = this.parent[this.pref + '_max'];
			this.value = this.parent[this.pref];
			this.error = this.parent.error;
			this.error_description = this.parent.error_description;
			this.warranty = this.parent.warranty;
		}
		this.setParams();

	};


	this.init();
}; //class
export default ClassParamDimentionGab;
