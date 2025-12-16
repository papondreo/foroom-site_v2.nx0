(function($) {
	$(function() {
		var
		bSafari = navigator.userAgent.toLowerCase().indexOf('webkit') != -1,
		bOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1,
		bFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1,
		bChrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1,
		bIE = document.attachEvent && !bOpera;
	
		var PXBrowser = {
			IsAndroid: /Android/i.test(navigator.userAgent),
			IsWinPhone: /Windows Phone/i.test(navigator.userAgent),
			IsIOS: /(iPad;)|(iPhone;)/i.test(navigator.userAgent),
			IsIE: bIE,
			IsIE6: /MSIE 6/i.test(navigator.userAgent),
			IsIE7: /MSIE 7/i.test(navigator.userAgent),
			IsIE8: /MSIE 8/i.test(navigator.userAgent),
			IsIE9: !!document.documentMode && document.documentMode >= 9,
			IsIE10: !!document.documentMode && document.documentMode >= 10,
			IsIE11: !!(window.MSStream) && !(window.ActiveXObject) && ("ActiveXObject" in window)
		};
		
		if (PXBrowser.IsIOS) jQuery("html").addClass("px-ios");
		if (PXBrowser.IsWinPhone) jQuery("html").addClass("px-winphone");
		if (PXBrowser.IsAndroid) jQuery("html").addClass("px-android");
		if (PXBrowser.IsIE) jQuery("html").addClass("px-ie");
		if (PXBrowser.IsIE6) jQuery("html").addClass("px-ie6");
		if (PXBrowser.IsIE7) jQuery("html").addClass("px-ie7");
		if (PXBrowser.IsIE8) jQuery("html").addClass("px-ie8");
			
		if (PXBrowser.IsIE11) {
			jQuery("html").addClass("px-ie11");
		} else if (PXBrowser.IsIE10) {
			jQuery("html").addClass("px-ie10");
		} else if (PXBrowser.IsIE9) {
			jQuery("html").addClass("px-ie9");
		}
	});
})(jQuery);