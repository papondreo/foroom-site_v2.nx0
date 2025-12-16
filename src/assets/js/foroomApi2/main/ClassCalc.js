let ClassCalc = function (foroomApi) {
	this.foroomApi = foroomApi;
	this.version = 20000;
	this.console_mode = false;
	this.setRecommended = false;
	this.correct_template = false;
	this.cm_array = [];
	this.currency_array = [];
	this.currency_rate = 1;
	//this.cm_array = ['gab_width', 'gab_height','cost_width', 'cost_height','width', 'height', 'rol_width', 'ControlHeight', 'DownPlumb', 'InsertSize', 'Segment1', 'Segment2', 'Segment3', 'Segment4', 'Segment5', 'Segment6', 'Segment7', 'Deflection', 'LambrBokSize', 'height2', 'height3', 'width2'];
	this.pics = {
		url: '',
		resolution: 400
	};
	this.isReady = false;
	this.template = null;
	this.json_data = {
		all_data: null,
		all_karn_data: null,
		multiple_cost: null
	};
	this.personal_info = null;
	this.fold = '';
	this.current_item = null;
	this.current_params = [];
	this.items = null;
	this.timer = null;
	this.timeout = 300; //ms
	this.init_timer = null;
	this.init_timeout = 1000;
	this.render_container = null;
	this.select = null;
	this.all_actions = null;
	this.related_ids = [];
	this.filters_map = {
		'api': ['none', 'all', 'sfr', 'fr', 'app'],
		'sfr': ['all', 'sfr'],
		'fr': ['all', 'fr'],
		'app': ['all', 'sfr'],
	};
	this.filter = 'sfr';
	this.callbacks = {};

	this.max_dimentions= {};
	this.maxPtypeDimentions={};
	this.previewParams=null;
	this.elm=null;


	//		console.log('DEST:',this.foroomApi.params.destination);

/*
	this.reset = function() {
		this.callbacks = {};

	};
*/
	this.init = function (cb) {
		if (this.foroomApi && this.foroomApi.params) {
			if (this.foroomApi.params.destination) this.filter = this.foroomApi.params.destination;
			if (this.foroomApi.params.console_mode) this.console_mode = this.foroomApi.params.console_mode;
			if (this.foroomApi.params.setRecommended) this.setRecommended = this.foroomApi.params.setRecommended;
			if (this.foroomApi.params.correct_template) this.correct_template = this.foroomApi.params.correct_template;

			if (this.foroomApi.params.cm_array) this.cm_array = this.foroomApi.params.cm_array;
			if (this.foroomApi.params.currency_array) this.currency_array = this.foroomApi.params.currency_array;


			//console.log('CALC:console_mode',this.console_mode);
		}
		this.init_engine(cb);
		if (this.personal_info) {
			if (this.personal_info.sfr_fold) this.fold = this.personal_info.sfr_fold;
		}

		/*
                let self=this;
                if (typeof self.init_timer === "undefined" || self.init_timer ==null)
                    self.init_timer = setInterval(function(){
                        if (self.personal_info && self.json_data.all_data && self.json_data.all_karn_data && self.json_data.multiple_cost)
                        {
                            clearInterval(self.init_timer);
                            self.init_timer = null;
                            self.init_engine(cb);
                        } else {
        //console.log('calc awaiting...',self.json_data,self.personal_info);
                        }
                    },self.init_timeout);
         */
	};
	this.setPersonalInfo = function (pInfo) {
		if (typeof pInfo.auth !== "undefined" && pInfo.auth != null)
			pInfo.auth.ver = this.version;
		this.personal_info = pInfo;
		if (typeof pInfo.sfr_fold !== "undefined" && pInfo.sfr_fold != null)
			this.fold = pInfo.sfr_fold;
		return this.personal_info;
	};
	this.init_engine = function (cb) {
		let self = this;
		let max_width =0;
		let max_height=0;
		let filter = this.filters_map[this.filter] ? this.filters_map[this.filter] : ["all"];
		if (self.json_data.all_actions !== "undefined" && self.json_data.all_actions != null) this.all_actions = self.json_data.all_actions;
		if (self.json_data.all_promo !== "undefined" && self.json_data.all_promo != null) this.all_promo = self.json_data.all_promo;
		if (typeof self.personal_info !== "undefined" && self.personal_info != null && typeof self.json_data.all_data !== "undefined" && self.json_data.all_data != null && typeof self.json_data.all_karn_data !== "undefined" && self.json_data.all_karn_data != null && typeof self.json_data.multiple_cost !== "undefined" && self.json_data.multiple_cost != null) {
			let margin = 1.4;
			if (typeof self.personal_info.price_margin !== "undefined" && self.personal_info.price_margin != null) margin = parseFloat(self.personal_info.price_margin);
			self.items = {};

			if (!self.personal_info.currency || self.personal_info.currency==='') {
				this.currency_array=[];
				this.currency_rate = 1;
			} else {
				this.currency_rate = parseFloat(self.personal_info.currency_rate);
			}

			if (self.json_data.all_data.preview) {
				if (self.json_data.all_data.preview[this.filter]) {
					self.previewParams = self.json_data.all_data.preview[this.filter];
				}
			}
			if (self.json_data.all_data.strings) {
				for (let key in self.json_data.all_data.strings) {
					if (self.json_data.all_data.strings.hasOwnProperty(key)) {
						if (this.cm_array.indexOf(key)!= -1) {
							self.json_data.all_data.strings[key].mesure='см.';
						}
						if (this.currency_array.indexOf(key)!= -1) {
							self.json_data.all_data.strings[key].mesure=self.personal_info.currency;
						}
					}
					//console.log('currency',self.personal_info.currency,self.personal_info.currency_rate);
					//console.log('self.json_data.all_data.strings',self.json_data.all_data.strings);
				}
			}
			if (self.json_data.all_data.structure) {
				if (self.json_data.all_data.izd && self.json_data.all_data.structure.izd) {
					let izd = [];
					for (let key in self.json_data.all_data.izd) {
						let item = this.inflateItem(self.json_data.all_data.structure.izd,self.json_data.all_data.izd[key]);
						if (item.materials && self.json_data.all_data.structure.materials) {
							let materials=[];
							for (let k in item.materials) {
								if (item.materials.hasOwnProperty(k)) {
									materials[k] = this.inflateItem(self.json_data.all_data.structure.materials,item.materials[k]);
								}
							}
							item.materials = materials;
						}
						//console.log('item.materials',item.materials)

						izd[key] = item;
					}
					self.json_data.all_data.izd=izd;
				}
			}
			if (self.json_data.all_data.izd) {
				for (let key in self.json_data.all_data.izd) {
					let val = self.json_data.all_data.izd[key];
					if (typeof val.enabled === "string") {
						if (val.enabled && filter.indexOf(val.enabled) != -1) {
							val.enabled = true;
						} else {
							val.enabled = false;
						}
					}
					if (val.max) {
						if (!this.max_dimentions[val.ptype]) this.max_dimentions[val.ptype] = {width: 0, height: 0};
						if (!this.maxPtypeDimentions[val.ptype]) this.maxPtypeDimentions[val.ptype] = {
							width: '',
							height: ''
						};

						if (max_width < val.max.width) {
							this.maxPtypeDimentions[val.ptype].width = val.ptype + val.category;
							max_width = val.max.width;
						}

						if (max_height < val.max.height) {
							this.maxPtypeDimentions[val.ptype].height = val.ptype + val.category;
							max_height = val.max.height;
						}

						if (val.max.width) {
							this.max_dimentions[val.ptype].width = Math.max(this.max_dimentions[val.ptype].width, val.max.width);
						}
						if (val.max.height) {
							this.max_dimentions[val.ptype].height = Math.max(this.max_dimentions[val.ptype].height, val.max.height);
						}
					}

					val.discount = 0;
					val.margin = margin;
					if (typeof self.personal_info.discounts[val.tid] !== "undefined" && self.personal_info.discounts[val.tid] != null) val.discount = parseInt(self.personal_info.discounts[val.tid]);
					//this.related_ids = self.get_related_ids(self.personal_info);
					this.related_ids = self.personal_info.relates;
					val.strings = self.json_data.all_data.strings;
					val.pics = self.pics;
					//val.cm_array = self.cm_array;

					if (val.ptype === 'plisse' && self.json_data.multiple_cost) val.multiple_cost = self.json_data.multiple_cost;
					if (val.ptype === 'karniz' && val.category == 1 && self.json_data.all_karn_data) val.all_karn_data = self.json_data.all_karn_data;
					val.all_actions=[];
					val.promo=self.foroomApi.params.promo?self.foroomApi.params.promo:'';

					let ptype = val.ptype + val.category;
					if (self.all_actions) {
						for (let key in self.all_actions) {
							let action = self.all_actions[key];
							if ((action.izd_types_json.indexOf(ptype) != -1) || (action.izd_types_json.indexOf(val.ptype) != -1)) {
								val.all_actions.push(action);
							}
						}
					}
					if (self.all_promo) {
						val.all_promo = [];
						for (let key in self.all_promo) {
							let promo = self.all_promo[key];
							// console.log(promo.izd_types_json, ptype, promo.izd_types_json.indexOf(ptype) != -1)
							if ((promo.izd_types_json.indexOf(ptype) != -1) || (promo.izd_types_json.indexOf(val.ptype) != -1)) {
								val.all_promo.push(promo);
							}
						}
					}

					self.items[val.ptype + val.category] = val;
					//let item = self.items[type];
					//console.log('foroomApi',self.foroomApi,self.foroomApi.ClassItems);
					if (self.foroomApi.ClassItems[val.ptype + val.category]) {
						self.foroomApi.ClassItems[val.ptype + val.category].prototype = new self.foroomApi.ClassItem(val, self);
					} else {
						//console.log('Item UNDEFINED', val.ptype + val.category);
						//foroomApi.ClassItems[val.ptype + val.category].construct();
						//self.includeClass('js/classes/'+val.ptype+val.category+'.js');
					}
				}
			}

			//	console.log(self.json_data.all_actions);
			//	if (typeof self.items['karniz1'] !== "undefined" && self.items['karniz1'] !=null) self.items['karniz1'].all_karn_data = self.json_data.all_karn_data;
			//	if (typeof self.items['plisse1'] !== "undefined" && self.items['plisse1'] !=null) self.items['plisse1'].multiple_cost = self.json_data.multiple_cost;
			self.isReady = true;
			if (typeof cb !== "undefined" && cb != null) cb(this);
		}
	};


	this.inflateItem = function(structure, item) {
		let ret={};
		for (let k in item) {
			if (item.hasOwnProperty(k) && structure[k]) {
				ret[structure[k]] = item[k];
			}
		}

		if (!ret.enabled) ret.enabled = 'none';
		if (!ret.disabled) ret.disabled=0;
		ret.disabled = parseInt(ret.disabled);

		if (ret.disabled === 0) ret.enabled='all';
		if (ret.disabled === 1) ret.enabled='none';
		if (ret.disabled === 2) ret.enabled='sfr';
		if (ret.disabled === 3) ret.enabled='fr';

		return ret;
	};


	this.get_related_ids = function (pInfo) {
		let ret = [];
		if (typeof pInfo.dillers !== "undefined" && pInfo.dillers != null) {
			for (let d_key in pInfo.dillers) {
				let diller = pInfo.dillers[d_key];
				ret.push(diller.id);
				if (typeof diller.rts !== "undefined" && diller.rts != null) {
					for (let r_key in diller.rts) {
						let rt = diller.rts[r_key];

						//console.log('DRT',rt);
						ret.push(rt.id);
					}
				}
			}
		} // dillers
		if (typeof pInfo.rts !== "undefined" && pInfo.rts != null) {
			for (let r_key in pInfo.rts) {
				let rt = pInfo.rts[r_key];
				ret.push(rt.id);
			}
		} // rts
		this.related_ids = ret;


		//	console.log('pInfo',pInfo);

		//console.log('ids',ret);

		return ret;
	};
	this.setParam = function (k, v) {
		if (typeof this.current_item !== "undefined" && this.current_item != null)
			this.current_item.setParam(k, v);
		else alert('ERROR');
	};
	this.release = function () {
		//console.log('this.current_item',this.current_item.materials);
		return this.current_item.release();
	};
	// this.load_template = function (template) {
	// 	let self = this;                                              // СТАРЫЙ КОД
	// 	let type = template.type + template.subtype;
	// 	self.current_item = new self.foroomApi.ClassItems[type]();
	// 	self.current_item.init(template, function () {});
	// };
	this.load_template = function (template) {
		let self = this;
	  
		// Явно указываем тип как 'karniz', и используем subtype как строку.
		let type = 'karniz' + (template.subtype);  // Объединяем 'karniz' с subtype.
		console.log('Попытка загрузить шаблон для типа:', type);
	  
		// Проверяем, что в объекте ClassItems существует конструктор для полученного типа.
		if (!self.foroomApi.ClassItems[type]) {
			console.error(`Ошибка: self.foroomApi.ClassItems[${type}] не найден!`);
			return;
		}
		
		// Если конструктор найден, создаём новый объект и инициализируем его с шаблоном.
		self.current_item = new self.foroomApi.ClassItems[type]();
		self.current_item.init(template, function () {});
	  };
	  

	  

	this.md5 = (text) => {
		//кусок из интернете получает md5 как в пихе
		let MD5 = function (d) {
			d = unescape(encodeURIComponent(d));
			let result = M(V(Y(X(d), 8 * d.length)));
			return result.toLowerCase();
		};

		function M(d) {
			for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
			return f
		}

		function X(d) {
			for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
			for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
			return _
		}

		function V(d) {
			for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
			return _
		}

		function Y(d, _) {
			d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
			for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
				var h = m,
					t = f,
					g = r,
					e = i;
				f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
			}
			return Array(m, f, r, i)
		}

		function md5_cmn(d, _, m, f, r, i) {
			return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)
		}

		function md5_ff(d, _, m, f, r, i, n) {
			return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
		}

		function md5_gg(d, _, m, f, r, i, n) {
			return md5_cmn(_ & f | m & ~f, d, _, r, i, n)
		}

		function md5_hh(d, _, m, f, r, i, n) {
			return md5_cmn(_ ^ m ^ f, d, _, r, i, n)
		}

		function md5_ii(d, _, m, f, r, i, n) {
			return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
		}

		function safe_add(d, _) {
			var m = (65535 & d) + (65535 & _);
			return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
		}

		function bit_rol(d, _) {
			return d << _ | d >>> 32 - _
		}

		// конец куска из инета

		let hash = MD5(text);
		return hash;
	}
	/**
	 * Ромашов А.И. 28.09.22
	 * @param promo - в исходном виде такой который вводит пользователь
	 * @returns {{error: string}|обьект промокод}
	 */
	this.validate_promo = (promo)=>{
		let hash = this.md5(promo);
		for (let key in this.all_promo) {
			let obj = this.all_promo[key];
			if (obj.promo === hash) {
				return obj;
			}
		}
		return {error: 'not use promo'};
	};
	/**
	 * Ромашов А.И. 28.09.22
	 * @param promo - в исходном виде такой который вводит пользователь
	 * @returns {string}
	 */
	this.apply_promo = (promo) => {
		if (this.current_item) {
			return this.current_item.apply_promo(promo);
		} else {
			if (!this.validate_promo(promo).error) {
				this.app.promo = promo;
				return 'ok';
			}
			return 'promo ' + promo + ' not use';
		}
	}

	this.choose_item = function (type, render_container) {
		this.current_item = new this.foroomApi.ClassItems[type]();
		this.current_item.init();
	};

	this.update_order = function (order) {
		let items = [];
		let orderAmount = 0;
		let orderPrice = 0.00;
		let orderSalePrice = 0.00;
		for (let key in order.items) {
			let val = order.items[key];
			if (typeof val !== "undefined" && val != null) {
				items[items.length] = val;
				orderAmount += parseInt(val.amount);
				let tmp = parseFloat(val.price) * parseFloat(val.amount);
				let s_tmp = tmp;
				if (typeof val.salePrice !== "undefined" && val.salePrice != null)
					s_tmp = parseFloat(val.salePrice) * parseFloat(val.amount);
				orderPrice += tmp;
				orderSalePrice += s_tmp;
			}
		}
		orderPrice = Math.round(orderPrice * 100) / 100;
		orderPrice = orderPrice.toFixed(2);
		orderSalePrice = Math.round(orderSalePrice * 100) / 100;
		orderSalePrice = orderSalePrice.toFixed(2);
		order.amount = orderAmount;
		order.price = orderPrice;
		order.salePrice = orderSalePrice;
		order.items = items;
		return order;
	};

	this.calcPrice = function() {
		if (this.current_item)this.current_item.calcPrice();
	};
	this.addCallback = function(name, cb) {
		if (name && cb) {
			this.callbacks[name]=cb;
			/*
			if (!this.callbacks[name]) this.callbacks[name] = [];
			this.callbacks[name].push(cb);
			*/

		}
	};




	this.convert_item_to_preview = function (template) {
		let self = this;
		let type = template.type + template.subtype;
		let item = this.items[type];
		this.elm = null;
		if (typeof self.foroomApi.ClassItems[type] !== "undefined" && self.foroomApi.ClassItems[type] != null) {
			self.foroomApi.ClassItems[type].prototype = new self.foroomApi.ClassItem(item, self);
			this.elm = new self.foroomApi.ClassItems[type]();
/*
			if (template.cost_width) template.cost_width = parseInt(template.cost_width);
			if (template.cost_height) template.cost_height = parseInt(template.cost_height);


				console.log(template);
*/
			this.elm.init(template, null);
			if (template.price) {template.price = parseFloat(template.price); if(isNaN(template.price)) template.price=0;}
			if (template.summ) {template.summ = parseFloat(template.summ); if(isNaN(template.summ))template.summ=0;}
			if (template.old_price) {template.old_price = parseFloat(template.old_price); if(isNaN(template.old_price) || template.old_price ===0) template.old_price=null;}
			if (template.old_summ) {template.old_summ = parseFloat(template.old_summ); if(isNaN(template.old_summ) || template.old_summ ===0) template.old_summ=null;}
			if (template.perc) {template.perc = parseFloat(template.perc); if(isNaN(template.perc) || template.perc === 0) template.perc=null;}

			if (this.elm) {
				if (template.price) this.elm.price = template.price;
				if (template.summ) this.elm.summ = template.summ;
				if (template.old_price) this.elm.old_price = template.old_price;
				if (template.old_summ) this.elm.old_summ = template.old_summ;
				if (template.perc) this.elm.perc = template.perc;

			}


			this.elm.calcPrice(false);
		}
		return this.elm.templatePrv;
	};

	this.getRecommendDimentions = function(type,w,h,rev) {
		let maxW = 0;
		let maxH = 0;
		let rW = 0;
		let rH = 0;

		if (this.maxPtypeDimentions[type]) {
			var ptype = this.maxPtypeDimentions[type].width;
			if (this.maxPtypeDimentions[type].width !== this.maxPtypeDimentions[type].height) {
				var dimW = 0;
				var dimH = 0;
				if (this.items[this.maxPtypeDimentions[type].width]) {
					if (this.items[this.maxPtypeDimentions[type].width].max && this.items[this.maxPtypeDimentions[type].width].max.width) {
						dimW = this.items[this.maxPtypeDimentions[type].width].max.width;
					}
				}
				if (this.items[this.maxPtypeDimentions[type].height]) {
					if (this.items[this.maxPtypeDimentions[type].height].max && this.items[this.maxPtypeDimentions[type].height].max.height) {
						dimH = this.items[this.maxPtypeDimentions[type].height].max.height;
					}
				}
				if (dimH > dimW) ptype = this.maxPtypeDimentions[type].height;
			}

      if(type === 'rolo') {
        const izdId = this.current_item.template.type + this.current_item.template.subtype
        const material = this.items[izdId].materials.find(mat => mat.tid === this.current_item.template.material)

        if (rev === 1) {
          return {
            max_to:{width:material.width1, height:material.height1},
            reduce_to:{width:material.width2, height:material.height2}
          }
        } else {
          return {
            max_to:{width:material.width2, height:material.height2},
            reduce_to:{width:material.width1, height:material.height1}
          }
        }
      }

      if (this.items[ptype]) {
				let filter = this.filters_map[this.filter] ? this.filters_map[this.filter] : ["all"];
				if (this.items[ptype].materials) {
					for (let k in this.items[ptype].materials) {
						if (this.items[ptype].materials.hasOwnProperty(k) && this.items[ptype].materials[k]) {
							let val = this.items[ptype].materials[k];
							if (val.enabled && filter.indexOf(val.enabled) != -1) {
								let matW = 0;//Math.max(val.maxWidth, 0);
								let matH = 0;//Math.max(val.maxHeight, 0);
								if (rev === 1) {
									matW = val.width1;
									matH = val.height1;
								} else {
									matW = val.width2;
									matH = val.height2;
								}


								//console.log('RW',this.max_dimentions[type].width,matW)
								//console.log('RH',this.max_dimentions[type].height,matH)
								if (this.max_dimentions[type].width === matW) {rH = Math.max(rH,matH);}
								if (this.max_dimentions[type].height === matH) {rW = Math.max(rW,matW);}


								//console.log(matW,'x',matH);
								if (matW >= w) {
									//maxW = Math.max(maxW,matW);
									maxH = Math.max(maxH, matH);
								}
								if (matH >= h) {
									maxW = Math.max(maxW, matW);
									//maxH = Math.max(maxH,matH);
								}
							}
						}
					}
				}
				//console.log('maxPtypeDimentions',maxW,maxH);
				//console.log('maxPtypeDimentions', this.items[ptype]);
			}
		}
		if (maxW <=0) maxW = this.max_dimentions[type].width;
		if (maxH <=0) maxH = this.max_dimentions[type].height;


		//console.log('--->',rW,'X',rH);


		return {max_to:{width:maxW, height:maxH},reduce_to:{width:rW, height:rH}};
	};
};// class

export default ClassCalc;
