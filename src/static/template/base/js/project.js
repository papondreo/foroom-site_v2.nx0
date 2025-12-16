jQuery(document).ready(function() {
	
	$("body").on("change",":radio",function(){
		if(jQuery(this).is(":checked")){
			jQuery(".LabelSelected:not(:checked)").removeClass("LabelSelected");
			jQuery(this).next("label").addClass("LabelSelected");
		}
	});
	
	
	jQuery(".js_tabs_block > a:first-child").addClass("active");
	jQuery(".js_tabs_content > div").hide();
	jQuery(".js_tabs_content > div:first-child").show();
	jQuery(".js_tabs_block > a").click(function(){
		jQuery(".js_tabs_block > a").removeClass("active");
		jQuery(this).addClass("active");
		jQuery(".js_tabs_content > div").hide();
		jQuery(jQuery(this).attr("href")).show();
		return false;
	});
	
	jQuery(window).scroll(function(){
		PxPositionElFixed();
	});
	PxPositionElFixed();
	
	
	if (jQuery(".main-slider").length > 0) {
		var mainSlider = jQuery(".main-slider").bxSlider({
			mode: "fade",
			minSlides: 1,
			maxSlides: 1,
			prevSelector: ".prev-slide",
			nextSelector: ".next-slide",
			prevText: "",
			nextText: "",
			pagerSelector: ".pager-nav",
			auto: true,
			pause: 3000
		});
	};
	
                       
   var needsSlider = init_slider(jQuery(".content").width(),null);
   var slides_count= 3;

   jQuery(window).resize(function(){
						 
		if (((jQuery(".content").width()<=980)&&(slides_count==4))||((jQuery(".content").width()>980)&&(slides_count==3)))
				 init_slider(jQuery(".content").width(),needsSlider);
	});
	
function init_slider(size,needsSlider) {

	var param=null;
	if (size<=980) {
	jQuery(".needs-slider-wr").width('980px');
	slides_count=3;
	params = {
	minSlides: 3,
	maxSlides: 3,
	slideWidth: 375,
	slideMargin: 40,
	pager: false,
	prevSelector: ".prev-need",
	nextSelector: ".next-need",
	prevText: "",
	nextText: ""
	};
	} else {
		jQuery(".needs-slider-wr").width('1300px');
		slides_count=4;
		params = {
			minSlides: 4,
			maxSlides: 4,
			slideWidth: 300,
			slideMargin: 32,
			pager: false,
			prevSelector: ".prev-need",
			nextSelector: ".next-need",
			prevText: "",
			nextText: ""
		};

	};
	if (needsSlider==null)
	return jQuery(".needs-slider").bxSlider(params);
	else if($sw('.needs-slider-wr')[0]) { needsSlider.reloadSlider(params); }

};
                       
                       
	
	if (jQuery(".prodcart-mainslider").length > 0) { 
		var prodSlider = jQuery(".prodcart-mainslider").bxSlider({
			mode: "fade",
			minSlides: 1,
			maxSlides: 1,
			prevSelector: ".prev-nav",
			nextSelector: ".next-nav",
			prevText: "",
			nextText: "",
			pagerSelector: ".pager-nav",
			onSlideBefore: function() {
				var currSlide = prodSlider.getCurrentSlide();
				prodInfoSlider.goToSlide(currSlide);
			}
		});
	};
	
	/* просмотреть изображение */
	
	if($s('asp-base-manual')){
	
	for (var h=0; h < $tid('asp-base-manual','IMG').length; h++) {
		if($tids('asp-base-manual','IMG',h).width!='45'){
			var kosa = $tids('asp-base-manual','IMG',h).parentNode.rowIndex;
			var width = $tids('asp-base-manual','IMG',h).width;
			var height = $tids('asp-base-manual','IMG',h).height;
			var whSrc = $tids('asp-base-manual','IMG',h).src;
			
			linkg = document.createElement('A');
			linkImg = document.createElement('IMG');
			linkg.href = $tids('asp-base-manual','IMG',h).src;
			linkg.className = 'fancybox';
			linkImg.width = width+'px';
			linkImg.width = height+'px';
			linkImg.src = whSrc;
			var boxtab = $tids('asp-base-manual','IMG',h).parentNode.children[kosa];
			
			
			
			
		}
	}	};
	
	
	if (jQuery("#esetop IMG").length > 0) {
		for (var i=0; i < jQuery("#esetop IMG").length; i++){
			jQuery("#esetop IMG")[i].parentNode.innerHTML = '<a style="height: 279px" href="'+jQuery("#esetop IMG")[i].src+'" class="fancybox"><img height="279px" src="'+jQuery("#esetop IMG")[i].src+'"></a>';
		}
	}
	
	if (jQuery(".prodcart-infoslider").length > 0) {
		var prodInfoSlider = jQuery(".prodcart-infoslider").bxSlider({
			mode: "fade",
			minSlides: 1,
			maxSlides: 1,
			controls: false,
			pager: false
		});
	};
	
	
	if (jQuery(".designer-slider").length > 0) {
		/*jQuery(".designer-slider").each(function() {
			var jthis = jQuery(this);
			var jthisID = jthis.closest(".designer-slider-block").attr("id");
			var prevNav = "#"+jthisID+" .prev-nav";
			var nextNav = "#"+jthisID+" .next-nav";
          	jthis.bxSlider({
				minSlides: 4,
				maxSlides: 6,
				moveSlides: 1,
				slideWidth: 100,
				slideMargin: 34,
				prevSelector: prevNav,
				nextSelector: nextNav,
				prevText: "",
				nextText: "",
				infiniteLoop: false,
				hideControlOnEnd: true,
				pager: false,
				
				onSliderLoad: function(){
					var leftPos = jthis.children("li:not(.disable)").first().position().left;
					var rightPos = jthis.children("li:not(.disable)").last().position().left + 100;
					jQuery(".designer-slider-active-slide").width(rightPos - leftPos);
				}
				
				onSlideNext: function(){
					var testLeftPos = 0;
					testLeftPos += 134;
					jQuery(".designer-slider-active-slide").animate({left: testLeftPos}, 200);
				}
			});  
        });*/
	};
	/*
	if (jQuery(".wtb-shop-slider").length > 0) {
		var wtbShopSlider = jQuery(".wtb-shop-slider").bxSlider({
			mode: "vertical",
			minSlides: 3,
			maxSlides: 3,
			controls: false,
			pager: false
		});
	}*/

	jQuery(".designer-slider-hide").click(function(){
		jQuery(this).closest(".designer-slider-block").removeClass("active");
		if($s('sleder-icon-box')){ $s('sleder-icon-box').parentNode.removeChild($s('sleder-icon-box'));}
	});
	jQuery("ul.designer-filter-stages li.par").click(function(){ 

	});
	
	jQuery(".fancybox").fancybox();
	
});


function PxPositionElFixed() {
	var winScrollPos = jQuery(window).scrollTop();
	var header = jQuery(".header-fixed");
	
	if (winScrollPos > 0) {
		header.addClass("fixed-active");
	} else {
		header.removeClass("fixed-active");
	}
};

/* Немного своих скриптов сcheckbox */
jQuery(".CheckBoxClass").change(function(){
		if($(this).is(":checked")){
			$(this).next("label").addClass("LabelSelected");
		}else{
			$(this).next("label").removeClass("LabelSelected");
		}
	});
	$(".RadioClass").change(function(){
		if($(this).is(":checked")){
			$(".RadioSelected:not(:checked)").removeClass("RadioSelected");
			$(this).next("label").addClass("RadioSelected");
		}
	});	
/* яндекс карты */
/*
ymaps.ready(function () {
	if (jQuery("#map").length > 0) {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9,
			controls: []
        });
	
	myMap.behaviors.disable("scrollZoom");
	
	MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
		'<div class="ballon">' +
			'<div class="shop-name">{{properties.name}}</div>' +			
			'<div class="shop-info">{{properties.info|raw}}</div>' +
			'<ul class="prodtype">{{properties.prodtype|raw}}</ul>' +
		'</div>'
	);
	
	var optPvh = {
		iconLayout: 'default#image',
		iconImageHref: 'img/icon-map-phv.png',
		iconImageSize: [45, 56],
		iconImageOffset: [-20, -56],
		balloonContentLayout: MyBalloonContentLayout
	}
	
	var optGform = {
		iconLayout: 'default#image',
		iconImageHref: 'img/icon-map-gform.png',
		iconImageSize: [45, 56],
		iconImageOffset: [-20, -56],
		balloonContentLayout: MyBalloonContentLayout
	}
	
	var optVform = {
		iconLayout: 'default#image',
		iconImageHref: 'img/icon-map-vform.png',
		iconImageSize: [45, 56],
		iconImageOffset: [-20, -56],
		balloonContentLayout: MyBalloonContentLayout
	}
	
	var optRoll = {
		iconLayout: 'default#image',
		iconImageHref: 'img/icon-map-roll.png',
		iconImageSize: [45, 56],
		iconImageOffset: [-20, -56],
		balloonContentLayout: MyBalloonContentLayout
	}
	
	var optRoma = {
		iconLayout: 'default#image',
		iconImageHref: 'img/icon-map-roma.png',
		iconImageSize: [45, 56],
		iconImageOffset: [-20, -56],
		balloonContentLayout: MyBalloonContentLayout
	}	

    myMap.geoObjects
		.add(new ymaps.Placemark([55.751574, 37.573856], {
			name: 'ЭКООКНА',
			info: 'Адрес: Таганская улица 26 <br> Телефон: +7 (495) 287-88-22 <br> Сайт: <a href="#">www.ecookna.ru</a>',
			prodtype: '<li class="pvh"></li><li class="gform"></li><li class="vform"></li><li class="roll"></li><li class="roma"></li>'
        }, optPvh))
		.add(new ymaps.Placemark([55.861574, 37.573856], {
        }, optGform))
		.add(new ymaps.Placemark([55.861574, 37.773856], {
        }, optVform))
		.add(new ymaps.Placemark([55.461574, 37.473856], {
        }, optRoll))
		.add(new ymaps.Placemark([55.861574, 37.473856], {
        }, optRoma));
	}
});
*/