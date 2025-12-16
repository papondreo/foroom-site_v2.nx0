(function($) {
    function pxFancy(input,settings) {
		this.input = input;
		this.settings = settings;
	}
	pxFancy.prototype = {
		refresh : function(newsettings) {
			var jthis = this.input;
			var settings = this.settings;
			this.destroy(false);
			if (typeof newsettings == "object") {
				this.settings = newsettings;				
			}
			this.init(false);
			
			if ($.isFunction(settings.callback.OnAfterUpdate)) {
				settings.callback.OnAfterUpdate.call(jthis,settings);
			}
		},
		destroy : function(busecallback) {
			if (busecallback !== false) busecallback = true;
			var jthis = this.input;
			
			if (!jthis.data("pxfancy")) {
				return true;
			} else {
				var settings = jthis.data("pxfancy").settings;
			}
			
			var label = this.getlabel();
			if (label) {
				label.off("click.pxFancy");
			}
			
			jthis.removeClass(settings.inputclass);
			jthis.data("pxfancy","");
			
			var s_wrapper = jthis.closest("."+settings.wsclass);
			s_wrapper.replaceWith(jthis);
			
			if (busecallback) {
				if ($.isFunction(settings.callback.OnAfterDestroy)) {
					settings.callback.OnAfterDestroy.call(jthis,settings);
				}
			}
			
			return true;			
		},
		change : function() {
			//can't unset check from radio
			if (this.settings.type == "radio") {
				if (this.input.attr("checked")) {
					return;
				}
			}
			
			
			var s_wrapper = this.input.closest("."+this.settings.wsclass);
			var activeclass = this.settings.wsclass+"-active";
			var disabledclass = this.settings.wsclass+"-disabled";
			if (this.settings.type == "radio") {
				var parentform = this.input.closest("form");
				var otherinputs = parentform.find("[type=\""+this.input.attr("type")+"\"][name=\""+this.input.attr("name")+"\"]").not(this.input);
			}
			
			if (this.input.prop("disabled")) {
				if (!s_wrapper.hasClass(disabledclass)) {
					s_wrapper.addClass(disabledclass);
				}
				var codc = this.settings.clickondisable.checked;
				var coduc = this.settings.clickondisable.unchecked;
				
				if (this.input.attr("checked")) {
					if (codc == false) return;				
				} else {
					if (coduc == false) return;
				}
			} else {
				if (s_wrapper.hasClass(disabledclass)) {
					s_wrapper.removeClass(disabledclass);				
				}
			}
						
			if (this.input.attr("checked")) {
				s_wrapper.removeClass(activeclass);	
				this.input.attr("checked", false);
				this.input.trigger("change");
			} else {
				s_wrapper.addClass(activeclass);
				this.input.attr("checked", true);
				this.input.trigger("change");
			}
			
			if (this.settings.type == "radio") {
				var T = this;
				otherinputs.each(function(){
					var s_wrapper = jQuery(this).closest("."+T.settings.wsclass);
					s_wrapper.removeClass(activeclass);
					jQuery(this).attr("checked", false);
				});
			}
			
			if ($.isFunction(this.settings.callback.OnAfterChange)) {
				this.settings.callback.OnAfterChange.call(this.input,this.settings);
			}
		},
		getlabel: function() {
			var jthis = this.input;
			var settings = this.settings;
			
			var label = jthis.closest("label");
			if (label.length) {
				label.data("pxFancyParent","Y");
				return label;
			}
			
			if (settings.uselabel === true) {				
				var id = jthis.attr("id");
				if (id) {
					var label = $("label[for="+id+"]");
					if (label.length) {
						label.data("pxFancyParent","N");
						return label;
					}
				}				
			}
			return false;
		},
		init : function(busecallback) {
			var jthis = this.input;
			if (jthis.data("pxfancy")) {
				this.settings = jthis.data("pxfancy").settings;
				return false;
			}
			
			if (busecallback !== false) busecallback = true;
		
			var settings = this.settings;
			var T = this;
			
			jthis.data("pxfancy",this);
			
			jthis.addClass(settings.inputclass);
			var s_wrapper = $("<span>").addClass(settings.wsclass);
			
			var activeclass = settings.wsclass+"-active";
			var disabledclass = settings.wsclass+"-disabled";
			if (jthis.prop("checked")) {
				s_wrapper.addClass(activeclass);
			} else {
				s_wrapper.removeClass(activeclass);				
			}
			
			if (jthis.prop("disabled")) {
				s_wrapper.addClass(disabledclass);
			} else {
				s_wrapper.removeClass(disabledclass);				
			}
			
			var label = this.getlabel();
			
			if (!label || label.data("pxFancyParent") == "N") {
				s_wrapper.mousedown(function() {
					T.change();
				});
			}
			
			if (label) {
				label.on("click.pxFancy",function() {
					T.change();
					return false;
				});
			}
			
			jthis.wrap(s_wrapper);	
			
			if (busecallback) {
				if ($.isFunction(this.settings.callback.OnAfterInit)) {
					this.settings.callback.OnAfterInit.call(jthis,settings);
				}
			}
			return true;
		}
	}
	
	
    $.fn.pxFancy = function(method, options) {
        var general_settings = {
			uselabel: true,
			clickondisable: {
				checked: false,
				unchecked: false
			},
			callback: {
				OnAfterDestroy: $.noop,
				OnAfterUpdate: $.noop,
				OnAfterInit: $.noop,
				OnAfterChange: $.noop
			}
        };
		
		var checkbox_settings = $.extend({},general_settings);
		checkbox_settings = $.extend(checkbox_settings, {
			inputclass: "pxcheckbox", 
			wsclass : "pxcheckbox-wps"
		});
		
		var radio_settings = $.extend({},general_settings);
		radio_settings = $.extend(radio_settings, {
			inputclass: "pxradio",
			wsclass : "pxradio-wps"
		});
				
		return this.each(function() {
			if (jQuery(this).attr("type") == "checkbox") {
				settings = $.extend({},checkbox_settings);
				settings.type = "checkbox";
			} else if (jQuery(this).attr("type") == "radio") {
				settings = $.extend({},radio_settings);
				settings.type = "radio";
			} else {
				settings = $.extend({},general_settings);;
				settings.type = "";
			}
			
			if (typeof method == "object" || typeof method == "undefined") {
				$.extend(settings, method);
				callme = "";
			} else if (typeof method == "string") {
				$.extend(settings, options);			
				callme = method;
			}
		
			var pxfancy = new pxFancy(jQuery(this),settings);			
			if (callme == "destroy") {
				pxfancy.destroy();
			} else {
				pxfancy.init(); //Переопределяет this.settings
				if (callme == "updatestate") {
					pxfancy.refresh();
				} else if (callme == "refresh") {
					pxfancy.refresh(settings);
				}
			}
		});
    };
})(jQuery);