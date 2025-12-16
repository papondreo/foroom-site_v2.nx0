let ClassParamText = function(o,app) {
	this.app = app;
	this.type = o.typ;
	this.o = o;



	this.validate = function () {
//console.log('TXT',this.app);
		let err=false;
		let relates = this.o.relate;
			if (relates) {
				for (let rkey in relates) {
					let rval = relates[rkey];
					if (this.app.oParams[rkey]) {
						// console.log('TXT:relates',rkey, rval,this.app.oParams[rkey],this.app.oParams[rkey][rval]);
						if (this.app.oParams[rkey][rval]) {
							this.app.oParams[rkey][rval]();
							//console.log('execute!!!', rkey, rval);
						}
					}
				}
			}



/*
		for (let k in this.app.oParams) {
			if (this.app.oParams[k] && this.app.oParams[k].applyConditions) this.app.oParams[k].applyConditions();
			if (this.app.oParams[k].oParams) {
				for (let k1 in this.app.oParams[k].oParams) {
					if (this.app.oParams[k].oParams[k1] && this.app.oParams[k].oParams[k1].applyConditions) this.app.oParams[k].oParams[k1].applyConditions();
				}

			}
		}
*/




		this.setParams();



		this.applyPlusDeltas();
		if (!err)
			err = !(this.value >= this.min && this.value <= this.max);
		//console.log(this.alias+' '+this.value+'>='+this.min+' && '+this.value+'<='+this.max, err);
		if (typeof this.o.cost !== "undefined" && this.o.cost != null) this.paramCost = parseFloat(this.o.cost);
		if (typeof this.o.perc !== "undefined" && this.o.perc != null) this.paramPerc = parseFloat(this.o.perc) / 100;
		this.error = err;
		if (this.error)
			this.error_description = 'Неверное значение';
		else
			this.error_description = '';

		if (this.error) {
			if (this.enabled)
				this.app.pushError(this.alias);
			else {
				this.error_description = '';
				this.app.popError(this.alias);
			}
		} else
			this.app.popError(this.alias);
	};
	this.init();
}; //class text
export default ClassParamText;
