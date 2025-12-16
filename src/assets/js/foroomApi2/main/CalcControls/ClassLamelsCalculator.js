var ClassLamelsCalculator = function () {
	this.params = null;
	this.width = 0;
	this.width2 = 0;
	this.height = 0;
	this.height2 = 0;
	this.height3 = 0;
	this.cs = 0;
	this.template = 0;
	this.lamels = [];
	this.karniz = 0;
	this.count = 0;
	this.error = false;
	this.round_to_cm = true;

	this.init = function (params) {
		//	console.log('----------------');

		//console.log('params',params);
		this.error = false;

		this.params = params;
		if (typeof this.params.count !== "undefined" && this.params.count != null) this.count = this.params.count;
		if (typeof this.params.width !== "undefined" && this.params.width != null) this.width = this.params.width;
		if (typeof this.params.width2 !== "undefined" && this.params.width2 != null) this.width2 = this.params.width2;
		if (typeof this.params.height !== "undefined" && this.params.height != null) this.height = this.params.height;
		if (typeof this.params.height2 !== "undefined" && this.params.height2 != null) this.height2 = this.params.height2;
		if (typeof this.params.height3 !== "undefined" && this.params.height3 != null) this.height3 = this.params.height3;
		if (typeof this.params.lamels !== "undefined" && this.params.lamels != null) console.log(this.params.lamels);
		if (typeof this.params.cs !== "undefined" && this.params.cs != null) this.cs = this.params.cs;
		if (typeof this.params.template !== "undefined" && this.params.template != null) this.template = this.params.template;
		if ((this.width <= 0 && this.count <= 0) || this.height <= 0 || this.cs <= 0) this.error = true;

//console.log('error',this.error );


		if (this.template > 0 && this.height2 <= 0) this.error = true;
		if ((this.teplate == 5 || this.teplate == 6) && (this.width2 <= 0 || this.height3 <= 0)) this.error = true;


		if (!this.error) {

			if (this.width <= 0) {

				if (typeof this.lamAsWidth[this.cs][this.count] !== "undefined" && this.lamAsWidth[this.cs][this.count] != null)
					this.width = this.lamAsWidth[this.cs][this.count];
				else
					this.width = this.lamAsWidth[this.cs][this.count + 1];


				this.width = this.width * 10;


				if (this.width <= 0 || this.count != this.getCount(this.cs, this.width)) this.error = true;

				//	console.log('if ('+this.width+'<=0 || '+this.count+' != '+this.getCount(this.cs, this.width)+') '+this.error+' = true;');


			} else


				this.count = this.getCount(this.cs, this.width);

			/*
                switch (this.cs) {
                        case 1: this.count = this.lam_count_to(this.width); break;
                        case 2: this.count = this.lam_count_center(this.width); break;
                        case 3: this.count = this.lam_count_from(this.width); break;
                    }
            */


		}


		if (this.count <= 0) this.error = true;
		if (!this.error) {
			switch (this.template) {
				case 0:
					this.lamels = this.calc_0();
					break;
				case 1:
					this.lamels = this.calc_1();
					break;
				case 2:
					this.lamels = this.calc_2();
					break;
				case 3:
					this.lamels = this.calc_3();
					break;
				case 4:
					this.lamels = this.calc_4();
					break;
				case 5:
					this.lamels = this.calc_5();
					break;
				case 6:
					this.lamels = this.calc_6();
					break;
				case 7:
					this.lamels = this.calc_7();
					break;
			}
		}

		//console.log(this);


		//console.log('----------------');


	} //init


	this.getCount = function (cs, width) {

		switch (cs) {
			case 1:
				return this.lam_count_to(width);
				break;
			case 2:
				return this.lam_count_center(width);
				break;
			case 3:
				return this.lam_count_from(width);
				break;
		}


	}

	this.calc_0 = function () {
		var lamels = [];
		this.height2 = 0;
		this.height3 = 0;
		this.width2 = 0;
		for (var i = 0; i < this.count; i++) {
			lamels[i] = this.height;
		}
		return lamels;
	}

	this.calc_1 = function () {
		var lamels = [];
		this.height3 = 0;
		this.width2 = 0;
		var delta = Math.abs(this.height2 - this.height);
		var h_min = Math.min(this.height, this.height2);
		var h_max = Math.max(this.height, this.height2);
		var lamel_delta = delta / (this.count - 1);
		var lam_width = Math.floor(this.width / (this.count - 1));
		lamels[0] = h_min;
		lamel_delta = Math.round(lamel_delta * 10) / 10;
		for (var i = 1; i < this.count; i++) {
			lamels[i] = lamels[i - 1] + lamel_delta;
		}
		for (var i = 0; i < this.count; i++) {
			if (this.round_to_cm)
				lamels[i] = Math.round(lamels[i] / 10) * 10;
			else
				lamels[i] = Math.round(lamels[i]);
		}
		if (this.height2 < this.height)
			lamels.reverse();
		return lamels;
	}

	this.calc_2 = function () {
		var lamels = [];
		this.height3 = 0;
		this.width2 = 0;
		var delta = Math.abs(this.height2 - this.height);
		this.karniz = Math.sqrt(Math.abs((Math.pow(delta, 2) + Math.pow(this.width, 2))));
		this.karniz = Math.round(this.karniz / 10) * 10;
		var h_min = Math.min(this.height, this.height2);
		var h_max = Math.max(this.height, this.height2);
		var lamel_delta = delta / (this.count - 1);
		var lam_width = Math.floor(this.width / (this.count - 1));
		lamels[0] = h_min;
		lamel_delta = Math.round(lamel_delta * 10) / 10;
		for (var i = 1; i < this.count; i++) {
			lamels[i] = lamels[i - 1] + lamel_delta;
		}
		for (var i = 0; i < this.count; i++) {
			if (this.round_to_cm)
				lamels[i] = Math.round(lamels[i] / 10) * 10;
			else
				lamels[i] = Math.round(lamels[i]);
		}
		if (this.height2 < this.height)
			lamels.reverse();
		return lamels;
	}

	this.calc_3 = function () {
		var lamels = [];
		this.height3 = 0;
		this.width2 = 0;
		var delta = Math.abs(this.height2 - this.height);
		//this.karniz =  Math.sqrt(Math.abs( (Math.pow(delta,2) + Math.pow(this.width,2))  )   );
		//this.karniz = Math.round(this.karniz/10)*10;
		var h_min = Math.min(this.height, this.height2);
		var h_max = Math.max(this.height, this.height2);
		var half_w = Math.ceil(this.width / 2);
		var half_count = Math.ceil(this.count / 2);
		var rest_count = this.count - half_count;
		var lamel_delta = Math.ceil(delta / (half_count - 1));
		var lam_width = Math.floor(half_w / (half_count - 1));
		var arr_tmp = [];
		for (var x = half_w; x > 0; x--) {
			var a = half_w;
			var b = delta;
			arr_tmp[x] = (h_max - Math.ceil(Math.sqrt(Math.abs((1 - (Math.pow(x, 2) / Math.pow(a, 2))) * Math.pow(b, 2)))));
		}
		var tmp = 0.01;//Math.ceil(tmp *k);
		var len = arr_tmp.length;
		var r_lamels = [];
		for (var i = 0; i < half_count; i++) {
			tmp = Math.sqrt(tmp);
			var pos = Math.ceil(lam_width * tmp);
			pos = len - (pos * i)
			lamels[i] = arr_tmp[pos - 1];
			r_lamels[i] = arr_tmp[pos - 1];
		}
		lamels[half_count - 1] = h_min;
		r_lamels[half_count - 1] = h_min;
		r_lamels = this.array_optimize(r_lamels);
		r_lamels.reverse();
		var j = 0;
		if (r_lamels.length != rest_count) j = 1;
		for (var i = half_count; i < this.count; i++) {
			lamels[i] = r_lamels[j];
			j++;
		}
		for (var i = 0; i < this.count; i++) {
			if (this.round_to_cm)
				lamels[i] = Math.round(lamels[i] / 10) * 10;
			else
				lamels[i] = Math.round(lamels[i]);
		}
		return lamels;
	}

	this.calc_4 = function () {
		var lamels = [];
		this.height3 = 0;
		this.width2 = 0;
		var delta = Math.abs(this.height - this.height2);
		var h_min = Math.min(this.height, this.height2);
		var h_max = Math.max(this.height, this.height2);
		var half_w = Math.ceil(this.width / 2);
		var half_count = Math.ceil(this.count / 2);
		var rest_count = this.count - half_count;
		var lamel_delta = Math.ceil(delta / (half_count - 1));
		var lam_width = Math.floor(half_w / (half_count - 1));
		var arr_tmp = [];
		for (var x = half_w; x >= 0; x--) {
			var a = half_w;
			var b = delta;
			arr_tmp[x] = (h_min + Math.ceil(Math.sqrt(Math.abs((1 - (Math.pow(x, 2) / Math.pow(a, 2))) * Math.pow(b, 2)))));
		}
		var tmp = 0.01;//Math.ceil(tmp *k);
		var len = arr_tmp.length;
		var r_lamels = [];
		for (var i = 0; i < half_count; i++) {
			tmp = Math.sqrt(tmp);
			var pos = Math.ceil(lam_width * tmp);
			pos = len - (pos * i)
			// pos =  Math.ceil (pos);
			//console.log('tmp= '+tmp+' pos='+pos);
			lamels[i] = arr_tmp[pos - 1];
			r_lamels[i] = arr_tmp[pos - 1];
		}
		lamels[0] = h_min;
		r_lamels[0] = h_min;
		r_lamels = this.array_optimize(r_lamels);
		r_lamels.reverse();
		var j = 0;
		if (r_lamels.length != rest_count) j = 1;
		for (var i = half_count; i < this.count; i++) {
			lamels[i] = r_lamels[j];
			j++;
		}
		for (var i = 0; i < this.count; i++) {
			if (this.round_to_cm)
				lamels[i] = Math.round(lamels[i] / 10) * 10;
			else
				lamels[i] = Math.round(lamels[i]);
		}
		return lamels;
	}

	this.calc_5 = function () {
		var lamels = [];
		var delta = Math.abs(this.height - this.height3);
		var h_min = Math.min(this.height, this.height3);
		var h_max = Math.max(this.height, this.height3);
		var delta2 = Math.abs(this.height3 - this.height2);
		var h_min2 = Math.min(this.height3, this.height2);
		var h_max2 = Math.max(this.height3, this.height2);
		var w_delta = this.width / this.width2;
		var half_w = Math.ceil(this.width / w_delta);
		var rest_w = this.width - half_w;
		var half_count = Math.ceil(this.count / w_delta);
		var rest_count = this.count - half_count;
		//---------------------
		var lamel_delta = Math.ceil(delta / (half_count));
		var lam_width = Math.floor(half_w / (half_count));
		var arr_tmp = [];
		for (var x = half_w; x > 0; x--) {
			var a = half_w;
			var b = delta;
			arr_tmp[x] = (h_min + Math.ceil(Math.sqrt(Math.abs((1 - (Math.pow(x, 2) / Math.pow(a, 2))) * Math.pow(b, 2)))));
		}
		var tmp = 0.01;//Math.ceil(tmp *k);
		var len = arr_tmp.length;
		var r_lamels = [];
		for (var i = 0; i < half_count; i++) {
			tmp = Math.sqrt(tmp);
			var pos = Math.ceil(lam_width * tmp);
			pos = len - (pos * i)
			// pos =  Math.ceil (pos);
			// console.log('tmp= '+tmp+' pos='+pos);
			r_lamels[i] = arr_tmp[pos - 1];
		}
		r_lamels[0] = h_min;
		r_lamels = this.array_optimize(r_lamels);
		///---------------------------------------------
		lamel_delta = Math.ceil(delta2 / (rest_count - 1));
		lam_width = Math.floor(rest_w / (rest_count - 1));
		var arr_tmp = [];
		for (var x = rest_w; x >= 0; x--) {
			var a = rest_w;
			var b = delta2;
			arr_tmp[x] = (h_min2 + Math.ceil(Math.sqrt(Math.abs((1 - (Math.pow(x, 2) / Math.pow(a, 2))) * Math.pow(b, 2)))));
		}
		var tmp = 0.01;//Math.ceil(tmp *k);
		var len = arr_tmp.length;
		var l_lamels = [];
		for (var i = 0; i < rest_count; i++) {
			tmp = Math.sqrt(tmp);
			var pos = Math.ceil(lam_width * tmp);
			pos = len - (pos * i)
			// pos =  Math.ceil (pos);
			// console.log('tmp= '+tmp+' pos='+pos);
			l_lamels[i] = arr_tmp[pos - 1];
		}
		//lamels[0] = h_min;
		l_lamels[0] = h_min2;
		l_lamels = this.array_optimize(l_lamels);
// ---------------------
		l_lamels.reverse();
		var j = 0;
		var k = 0;
		for (var i = 0; i < this.count; i++) {
			if (r_lamels.length > i) {
				lamels[i] = r_lamels[j];
				j++;
			} else {
				lamels[i] = l_lamels[k];
				k++;
			}
		}
		for (var i = 0; i < this.count; i++) {
			if (this.round_to_cm)
				lamels[i] = Math.round(lamels[i] / 10) * 10;
			else
				lamels[i] = Math.round(lamels[i]);
		}
		// lamels = l_lamels+r_lamels;
		if ((this.height3 < this.height) || (this.height3 < this.height2)) lamels = [];
		return lamels;
	}

	this.calc_6 = function () {
		var lamels = [];
		var delta = Math.abs(this.height - this.height3);
		var h_min = Math.min(this.height, this.height3);
		var h_max = Math.max(this.height, this.height3);
		var delta2 = Math.abs(this.height3 - this.height2);
		var h_min2 = Math.min(this.height3, this.height2);
		var h_max2 = Math.max(this.height3, this.height2);
		var w_delta = this.width / this.width2;
		var half_w = Math.ceil(this.width / w_delta);
		var rest_w = this.width - half_w;
		var half_count = Math.ceil(this.count / w_delta);
		var rest_count = this.count - half_count;
		//---------------------
		var lamel_delta = Math.ceil(delta / (half_count));
		var lam_width = Math.floor(half_w / (half_count));
		var arr_tmp = [];
		for (var x = half_w; x > 0; x--) {
			var a = half_w;
			var b = delta;
			arr_tmp[x] = (h_max - Math.ceil(Math.sqrt(Math.abs((1 - (Math.pow(x, 2) / Math.pow(a, 2))) * Math.pow(b, 2)))));
		}
		var tmp = 0.01;//Math.ceil(tmp *k);
		var len = arr_tmp.length;
		var r_lamels = [];
		for (var i = 0; i < half_count; i++) {
			tmp = Math.sqrt(tmp);
			var pos = Math.ceil(lam_width * tmp);
			pos = len - (pos * i)
			// pos =  Math.ceil (pos);
			// console.log('tmp= '+tmp+' pos='+pos);
			r_lamels[i] = arr_tmp[pos - 1];
		}
		//lamels[0] = h_min;
		r_lamels[half_count - 1] = h_min;
		r_lamels = this.array_optimize(r_lamels);
		if (this.height3 > this.height) r_lamels.reverse();
		///---------------------------------------------
		lamel_delta = Math.ceil(delta2 / (rest_count - 1));
		lam_width = Math.floor(rest_w / (rest_count - 1));
		var arr_tmp = [];
		for (var x = rest_w; x >= 0; x--) {
			var a = rest_w;
			var b = delta2;
			arr_tmp[x] = (h_max2 - Math.ceil(Math.sqrt(Math.abs((1 - (Math.pow(x, 2) / Math.pow(a, 2))) * Math.pow(b, 2)))));
		}
		var tmp = 0.01;//Math.ceil(tmp *k);
		var len = arr_tmp.length;
		var l_lamels = [];
		for (var i = 0; i < rest_count; i++) {
			tmp = Math.sqrt(tmp);
			var pos = Math.ceil(lam_width * tmp);
			pos = len - (pos * i)
			// pos =  Math.ceil (pos);
			// console.log('tmp= '+tmp+' pos='+pos);
			l_lamels[i] = arr_tmp[pos - 1];
		}
		l_lamels[rest_w - 1] = h_min2;
		l_lamels = this.array_optimize(l_lamels);
		if (this.height2 > this.height3) l_lamels.reverse();
// ---------------------
		//l_lamels.reverse();
		//console.log('r_lamels',r_lamels);
		var j = 0;
		var k = 0;
		// if (l_lamels.length != rest_count) k=1;
		for (var i = 0; i < this.count; i++) {
			if (r_lamels.length > i) {
				lamels[i] = r_lamels[j];
				j++;
			} else {

				lamels[i] = l_lamels[k];
				k++;
			}
			//  console.log( lamels[i]);
		}
		for (var i = 0; i < this.count; i++) {
			if (this.round_to_cm)
				lamels[i] = Math.round(lamels[i] / 10) * 10;
			else
				lamels[i] = Math.round(lamels[i]);
		}
		//lamels = l_lamels+r_lamels;
		//if ((this.height3 < this.height)||(this.height3 < this.height2)) lamels= [];
		return lamels;
	}

	this.calc_7 = function () {
		var lamels = [];
		this.height3 = 0;
		this.width2 = 0;
		var delta = Math.abs(this.height2 - this.height);
		var h_min = Math.min(this.height, this.height2);
		var h_max = Math.max(this.height, this.height2);
		var half_w = Math.ceil(this.width);
		var half_count = Math.ceil(this.count);
		var lamel_delta = Math.ceil(delta / (half_count - 1));
		var lam_width = Math.floor(half_w / (half_count - 1));
		var arr_tmp = [];
		for (var x = half_w; x > 0; x--) {
			var a = half_w;
			var b = delta;
			arr_tmp[x] = (h_max - Math.ceil(Math.sqrt(Math.abs((1 - (Math.pow(x, 2) / Math.pow(a, 2))) * Math.pow(b, 2)))));
		}
		var tmp = 0.01;//Math.ceil(tmp *k);
		var len = arr_tmp.length;
		var r_lamels = [];
		for (var i = 0; i < half_count; i++) {
			tmp = Math.sqrt(tmp);
			var pos = Math.ceil(lam_width * tmp);
			pos = len - (pos * i);
			lamels[i] = arr_tmp[pos - 1];
			r_lamels[i] = arr_tmp[pos - 1];
		}
		lamels[half_count - 1] = h_min;
		r_lamels[half_count - 1] = h_min;
		r_lamels = this.array_optimize(r_lamels);
		if (this.height2 > this.height) lamels.reverse();
		for (var i = 0; i < this.count; i++) {
			if (this.round_to_cm)
				lamels[i] = Math.round(lamels[i] / 10) * 10;
			else
				lamels[i] = Math.round(lamels[i]);
		}
		return lamels;
	}


	this.lamAsWidth = {


		1: {
			4: 30,
			5: 35,
			6: 43,
			7: 51,
			8: 59,
			9: 67,
			10: 75,
			11: 83,
			12: 91,
			13: 99,
			14: 107,
			15: 115,
			16: 123,
			17: 131,
			18: 139,
			19: 147,
			20: 155,
			21: 163,
			22: 171,
			23: 179,
			24: 187,
			25: 195,
			26: 203,
			27: 211,
			28: 219,
			29: 227,
			30: 235,
			31: 243,
			32: 251,
			33: 259,
			34: 267,
			35: 275,
			36: 283,
			37: 291,
			38: 299,
			39: 307,
			40: 315,
			41: 323,
			42: 331,
			43: 339,
			44: 347,
			45: 355,
			46: 363,
			47: 371,
			48: 379,
			49: 387,
			50: 395,
			51: 403,
			52: 411,
			53: 419,
			54: 427,
			55: 435,
			56: 443,
			57: 451,
			58: 459,
			59: 467,
			60: 475,
			61: 483
		},

		2: {
			4: 30,
			6: 36,
			8: 52,
			10: 68,
			12: 83,
			14: 100,
			16: 116,
			18: 132,
			20: 148,
			22: 164,
			24: 180,
			26: 196,
			28: 212,
			30: 228,
			32: 244,
			34: 260,
			36: 276,
			38: 292,
			40: 308,
			42: 324,
			44: 340,
			46: 356,
			48: 372,
			50: 388,
			52: 404,
			54: 420,
			56: 436,
			58: 452,
			60: 468,
			62: 484,
			64: 500

		},


		3: {
			4: 30,
			5: 35,
			6: 44,
			7: 51,
			8: 59,
			9: 67,
			10: 75,
			11: 83,
			12: 91,
			13: 99,
			14: 107,
			15: 115,
			16: 123,
			17: 131,
			18: 139,
			19: 147,
			20: 155,
			21: 163,
			22: 171,
			23: 179,
			24: 187,
			25: 195,
			26: 203,
			27: 211,
			28: 219,
			29: 227,
			30: 235,
			31: 243,
			32: 251,
			33: 259,
			34: 267,
			35: 275,
			36: 283,
			37: 291,
			38: 299,
			39: 307,
			40: 315,
			41: 323,
			42: 331,
			43: 339,
			44: 347,
			45: 355,
			46: 363,
			47: 371,
			48: 379,
			49: 387,
			50: 395,
			51: 403,
			52: 411,
			53: 419,
			54: 427,
			55: 435,
			56: 443,
			57: 451,
			58: 459,
			59: 467,
			60: 475,
			61: 483
		}

	}


	this.lam_count_to = function (width) {
		var cnt = 0;

		if ((width >= 0) && (width <= 299)) cnt = 0;


		if ((width >= 300) && (width <= 340)) cnt = 4;
		if ((width >= 350) && (width <= 420)) cnt = 5;
		if ((width >= 430) && (width <= 500)) cnt = 6;
		if ((width >= 510) && (width <= 580)) cnt = 7;
		if ((width >= 590) && (width <= 660)) cnt = 8;
		if ((width >= 670) && (width <= 740)) cnt = 9;
		if ((width >= 750) && (width <= 820)) cnt = 10;
		if ((width >= 830) && (width <= 900)) cnt = 11;
		if ((width >= 910) && (width <= 980)) cnt = 12;
		if ((width >= 990) && (width <= 1060)) cnt = 13;
		if ((width >= 1070) && (width <= 1140)) cnt = 14;
		if ((width >= 1150) && (width <= 1220)) cnt = 15;
		if ((width >= 1230) && (width <= 1300)) cnt = 16;
		if ((width >= 1310) && (width <= 1380)) cnt = 17;
		if ((width >= 1390) && (width <= 1460)) cnt = 18;
		if ((width >= 1470) && (width <= 1540)) cnt = 19;
		if ((width >= 1550) && (width <= 1620)) cnt = 20;
		if ((width >= 1630) && (width <= 1700)) cnt = 21;
		if ((width >= 1710) && (width <= 1780)) cnt = 22;
		if ((width >= 1790) && (width <= 1860)) cnt = 23;
		if ((width >= 1870) && (width <= 1940)) cnt = 24;
		if ((width >= 1950) && (width <= 2020)) cnt = 25;
		if ((width >= 2030) && (width <= 2100)) cnt = 26;
		if ((width >= 2110) && (width <= 2180)) cnt = 27;
		if ((width >= 2190) && (width <= 2260)) cnt = 28;
		if ((width >= 2270) && (width <= 2340)) cnt = 29;
		if ((width >= 2350) && (width <= 2420)) cnt = 30;
		if ((width >= 2430) && (width <= 2500)) cnt = 31;
		if ((width >= 2510) && (width <= 2580)) cnt = 32;
		if ((width >= 2590) && (width <= 2660)) cnt = 33;
		if ((width >= 2670) && (width <= 2740)) cnt = 34;
		if ((width >= 2750) && (width <= 2820)) cnt = 35;
		if ((width >= 2830) && (width <= 2900)) cnt = 36;
		if ((width >= 2910) && (width <= 2980)) cnt = 37;
		if ((width >= 2990) && (width <= 3060)) cnt = 38;
		if ((width >= 3070) && (width <= 3140)) cnt = 39;
		if ((width >= 3150) && (width <= 3220)) cnt = 40;
		if ((width >= 3230) && (width <= 3300)) cnt = 41;
		if ((width >= 3310) && (width <= 3380)) cnt = 42;
		if ((width >= 3390) && (width <= 3460)) cnt = 43;
		if ((width >= 3470) && (width <= 3540)) cnt = 44;
		if ((width >= 3550) && (width <= 3620)) cnt = 45;
		if ((width >= 3630) && (width <= 3700)) cnt = 46;
		if ((width >= 3710) && (width <= 3780)) cnt = 47;
		if ((width >= 3790) && (width <= 3860)) cnt = 48;
		if ((width >= 3870) && (width <= 3940)) cnt = 49;
		if ((width >= 3950) && (width <= 4020)) cnt = 50;
		if ((width >= 4030) && (width <= 4100)) cnt = 51;
		if ((width >= 4110) && (width <= 4180)) cnt = 52;
		if ((width >= 4190) && (width <= 4260)) cnt = 53;
		if ((width >= 4270) && (width <= 4340)) cnt = 54;
		if ((width >= 4350) && (width <= 4420)) cnt = 55;
		if ((width >= 4430) && (width <= 4500)) cnt = 56;
		if ((width >= 4510) && (width <= 4580)) cnt = 57;
		if ((width >= 4590) && (width <= 4660)) cnt = 58;
		if ((width >= 4670) && (width <= 4740)) cnt = 59;
		if ((width >= 4750) && (width <= 4820)) cnt = 60;
		if ((width >= 4830) && (width <= 4900)) cnt = 61;


		return cnt;

	}

	this.lam_count_from = function (width) {
		var cnt = 0;
		if ((width >= 0) && (width <= 299)) cnt = 0;


		if ((width >= 300) && (width <= 340)) cnt = 4;
		if ((width >= 350) && (width <= 420)) cnt = 5;
		if ((width >= 430) && (width <= 500)) cnt = 6;
		if ((width >= 510) && (width <= 580)) cnt = 7;
		if ((width >= 590) && (width <= 660)) cnt = 8;
		if ((width >= 670) && (width <= 740)) cnt = 9;
		if ((width >= 750) && (width <= 820)) cnt = 10;
		if ((width >= 830) && (width <= 900)) cnt = 11;
		if ((width >= 910) && (width <= 980)) cnt = 12;
		if ((width >= 990) && (width <= 1060)) cnt = 13;
		if ((width >= 1070) && (width <= 1140)) cnt = 14;
		if ((width >= 1150) && (width <= 1220)) cnt = 15;
		if ((width >= 1230) && (width <= 1300)) cnt = 16;
		if ((width >= 1310) && (width <= 1380)) cnt = 17;
		if ((width >= 1390) && (width <= 1460)) cnt = 18;
		if ((width >= 1470) && (width <= 1540)) cnt = 19;
		if ((width >= 1550) && (width <= 1620)) cnt = 20;
		if ((width >= 1630) && (width <= 1700)) cnt = 21;
		if ((width >= 1710) && (width <= 1790)) cnt = 22;
		if ((width >= 1790) && (width <= 1860)) cnt = 23;
		if ((width >= 1870) && (width <= 1940)) cnt = 24;
		if ((width >= 1950) && (width <= 2020)) cnt = 25;
		if ((width >= 2030) && (width <= 2100)) cnt = 26;
		if ((width >= 2110) && (width <= 2180)) cnt = 27;
		if ((width >= 2190) && (width <= 2260)) cnt = 28;
		if ((width >= 2270) && (width <= 2340)) cnt = 29;
		if ((width >= 2350) && (width <= 2420)) cnt = 30;
		if ((width >= 2430) && (width <= 2500)) cnt = 31;
		if ((width >= 2510) && (width <= 2580)) cnt = 32;
		if ((width >= 2590) && (width <= 2660)) cnt = 33;
		if ((width >= 2670) && (width <= 2740)) cnt = 34;
		if ((width >= 2750) && (width <= 2820)) cnt = 35;
		if ((width >= 2830) && (width <= 2900)) cnt = 36;
		if ((width >= 2910) && (width <= 2980)) cnt = 37;
		if ((width >= 2990) && (width <= 3060)) cnt = 38;
		if ((width >= 3070) && (width <= 3140)) cnt = 39;
		if ((width >= 3150) && (width <= 3220)) cnt = 40;
		if ((width >= 3230) && (width <= 3300)) cnt = 41;
		if ((width >= 3310) && (width <= 3390)) cnt = 42;
		if ((width >= 3390) && (width <= 3460)) cnt = 43;
		if ((width >= 3470) && (width <= 3540)) cnt = 44;
		if ((width >= 3550) && (width <= 3620)) cnt = 45;
		if ((width >= 3630) && (width <= 3700)) cnt = 46;
		if ((width >= 3710) && (width <= 3790)) cnt = 47;
		if ((width >= 3790) && (width <= 3860)) cnt = 48;
		if ((width >= 3870) && (width <= 3940)) cnt = 49;
		if ((width >= 3950) && (width <= 4020)) cnt = 50;
		if ((width >= 4030) && (width <= 4100)) cnt = 51;
		if ((width >= 4110) && (width <= 4180)) cnt = 52;
		if ((width >= 4190) && (width <= 4260)) cnt = 53;
		if ((width >= 4270) && (width <= 4340)) cnt = 54;
		if ((width >= 4350) && (width <= 4420)) cnt = 55;
		if ((width >= 4430) && (width <= 4500)) cnt = 56;
		if ((width >= 4510) && (width <= 4580)) cnt = 57;
		if ((width >= 4590) && (width <= 4660)) cnt = 58;
		if ((width >= 4670) && (width <= 4740)) cnt = 59;
		if ((width >= 4750) && (width <= 4820)) cnt = 60;
		if ((width >= 4830) && (width <= 4900)) cnt = 61;


		return cnt;

	}


	this.lam_count_center = function (width) {
		var cnt = 0;

		if ((width >= 0) && (width <= 299)) cnt = 0;


		if ((width >= 300) && (width <= 350)) cnt = 4;
		if ((width >= 360) && (width <= 510)) cnt = 6;
		if ((width >= 520) && (width <= 670)) cnt = 8;
		if ((width >= 680) && (width <= 820)) cnt = 10;
		if ((width >= 830) && (width <= 980)) cnt = 12;
		if ((width >= 990) && (width <= 1150)) cnt = 14;
		if ((width >= 1160) && (width <= 1310)) cnt = 16;
		if ((width >= 1320) && (width <= 1470)) cnt = 18;
		if ((width >= 1480) && (width <= 1630)) cnt = 20;
		if ((width >= 1640) && (width <= 1790)) cnt = 22;
		if ((width >= 1800) && (width <= 1940)) cnt = 24;
		if ((width >= 1950) && (width <= 2110)) cnt = 26;
		if ((width >= 2120) && (width <= 2270)) cnt = 28;
		if ((width >= 2280) && (width <= 2430)) cnt = 30;
		if ((width >= 2440) && (width <= 2590)) cnt = 32;
		if ((width >= 2600) && (width <= 2750)) cnt = 34;
		if ((width >= 2760) && (width <= 2910)) cnt = 36;
		if ((width >= 2920) && (width <= 3070)) cnt = 38;
		if ((width >= 3080) && (width <= 3230)) cnt = 40;
		if ((width >= 3240) && (width <= 3390)) cnt = 42;
		if ((width >= 3400) && (width <= 3550)) cnt = 44;
		if ((width >= 3560) && (width <= 3710)) cnt = 46;
		if ((width >= 3720) && (width <= 3870)) cnt = 48;
		if ((width >= 3880) && (width <= 4030)) cnt = 50;
		if ((width >= 4040) && (width <= 4190)) cnt = 52;
		if ((width >= 4200) && (width <= 4350)) cnt = 54;
		if ((width >= 4360) && (width <= 4510)) cnt = 56;
		if ((width >= 4520) && (width <= 4670)) cnt = 58;
		if ((width >= 4680) && (width <= 4830)) cnt = 60;
		if ((width >= 4840) && (width <= 4990)) cnt = 62;


		if ((width >= 5000) && (width <= 5150)) cnt = 62;


		return cnt;

	}


	this.array_optimize = function (arr) {
		var ret = [];


		for (var i = 0; i < arr.length; i++) {
			if (typeof arr[i] !== 'undefined')
				ret[ret.length] = arr[i];

			//console.log(i, arr[i]);
		}
		return ret;
	}


	this.array_reverse = function (arr) {
		var ret = [];
		//console.log('arr', arr);


		for (var i = arr.length - 1; i >= 0; i--) {
			ret[ret.length] = arr[i];

			//console.log(i, arr[i]);
		}
		return ret;
	}


	/*--------*/


}

export default ClassLamelsCalculator;
