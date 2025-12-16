/* открываем форму в один клик */
function mpage(tx){	
	var xmlhttp = createObject(); nocache = Math.random(); xmlhttp.open('GET', tx+'&nocache = '+nocache, false); xmlhttp.send(null);
	if(xmlhttp.status == 200) { txt = xmlhttp.responseText; } else { txt  = ''; } return txt;
}
function addEvent(el, t, l) {
	if(el.addEventListener){ tx = el.addEventListener(t,l,false);return(tx);}
	else{tx = el.attachEvent("on"+t,function() {l.apply(el);});return(tx);
}}
function animateBasket() {
	$("#go-bus").css('color', '#3B3A49');
    $( "#go-bus" ).animate({ fontSize: "3.5em", marginRight:"20px",marginTop:"-15px" },{duration: 300, complete: function() {} }).animate({  fontSize: "1em", marginRight:"0",marginTop:"0" }, {duration: 300, complete: function() {$( "#go-bus" ).css('color', '#dd7300');} } );  
}


function loadMapOne(){
	nocache = Math.random();
	var backSD = mpage('/2012/json/burnGoals.php?home=777&nocache = '+nocache);
	$('#boxBlack').show();
	$('#boxBlack iframe').attr('src','/2012/page/one-click/cont.php');
	$s('boxBlack').style.display = 'block';
	document.body.style.overflow = 'hidden';
};
if($sw('button-call').length>0){
	console.log('kokoko');
	
	for (var i=0; i < $sw('button-call').length; i++) {
		$sw('button-call')[i].onclick = function(){
			loadMapOne();
		}
	}
};
if($sw('showFormOneclickBus').length>0){
	$sw('showFormOneclickBus')[0].onclick = function(){
		var backSD = mpage('/2012/json/burnGoals.php?home=777');
		$('#boxBlack').show();
		$('#boxBlack iframe').attr('src','/2012/page/one-click/cont.php');
		$s('boxBlack').style.display = 'block';
		document.body.style.overflow = 'hidden';
	}
};

/* закрыть кнопку заказать в один клик */
if($s('oneClickClose')){
	/* проверка кнопки при обновление страницы */
	if( getCookie('oneClick')!=null ){
		if(getCookie('oneClick')=='oneClickButtonhidden'){
			$s('oneClickClose').parentNode.className = 'oneClickButtonhidden';
		}else if(getCookie('oneClick')=='oneClickButton'){
			$s('oneClickClose').parentNode.className = 'oneClickButton';
		}
	};
	$s('oneClickClose').onclick = function(){
		if( getCookie('oneClick')!=null ){
			console.log(getCookie('oneClick'));
			if(getCookie('oneClick')=='oneClickButtonhidden'){
				this.parentNode.className = 'oneClickButton';
				document.cookie = "oneClick = oneClickButton; path=/;";
			}else if(getCookie('oneClick')=='oneClickButton'){
				this.parentNode.className = 'oneClickButtonhidden';
				document.cookie = "oneClick = oneClickButtonhidden; path=/;";
			}
		}else{
			document.cookie = "oneClick = oneClickButtonhidden; path=/;";
			this.parentNode.className = 'oneClickButtonhidden';
		}
	}
};


/* подписаться на новости */
if($s('emailSave')){
	$s('emailSave').onclick = function(){
		 var mail = /^[-._A-Za-z0-9]+@(?:[A-Za-z0-9][-A-Za-z0-9]+\.)+[a-z]{2,6}$/;
		if($sn('emailSave')[0].value==''){
			alert('вы не указали свой Email Адрес');
		}else if(!mail.test($sn('emailSave')[0].value)){
			alert('Email адрес введен не верно');
		}else if(!$s('checkBox').checked){
			alert('вы не дали согласие на обработку персональных данных');
		}else{
			console.log( $sn('emailSave')[0].value );
			var back = страницы('/h/newsletter.php?email='+$sn('emailSave')[0].value);
			var tx = JSON.parse ( back );
			if(tx['live']&&tx['live']==1){
				alert('Email адрес добавлен в рассылку');
				$sn('emailSave')[0].value = '';
				$s('checkBox').checked = false;
			}else{ alert(tx['txt']); }	
		}
	}
};

/* редирект для яндекса */
if($s('lendingMenu')){
	var yaclick = [];
	for (var i=0; i < $tid('lendingMenu','A').length; i++) {
		/*console.log($tids('lendingMenu','A',i).href);*/
	};
	for (var i=0; i < $tid('lendingMenu','A').length; i++) {
		$tids('lendingMenu','A',i).onclick = function(){

			if(this.href==location.origin+'/shtory-plisse/'){
				yaCounter31892916.reachGoal('clickPlisse');
				linkTrec = '/shtory-plisse/';
			}else if(this.href==location.origin+'/rulonnye-shtory/'){
				yaCounter31892916.reachGoal('clickRolo');
				linkTrec = '/rulonnye-shtory/';
			}else if(this.href==location.origin+'/rulonnye-shtory-duo/'){
				yaCounter31892916.reachGoal('clickRoloDuo');
				linkTrec = '/rulonnye-shtory-duo/';
			}else if(this.href==location.origin+'/vertikalnye-zhalyuzi/'){
				yaCounter31892916.reachGoal('clickVform');
				linkTrec = '/vertikalnye-zhalyuzi/';
			}else if(this.href==location.origin+'/gorizontalnye-zhalyuzi/'){
				yaCounter31892916.reachGoal('clickGorizont');
				linkTrec = '/gorizontalnye-zhalyuzi/';
			}else if(this.href==location.origin+'/rimskie-shtory/'){
				yaCounter31892916.reachGoal('clickRoma');
				linkTrec = '/rimskie-shtory/';
			}
			setTimeout(function() { location.href = linkTrec; }, 700);
			/*yaCounter31892916.reachGoal('realOrderPost');*/
			return false;
			/*setTimeout(function() { location.href = '/buy/'; }, 500);*/
	}	}
};

if($s('linkBlik')){
	var xhr = new XMLHttpRequest();
	var formData = new FormData();
	nocache = Math.random();
	xhr.open("POST", '/compare/qwest.php?&nocache = '+nocache); xhr.send(formData);xhr.onreadystatechange = function() {
	if (this.readyState != 4) return; 
		console.log(this.responseText);
		var tx = JSON.parse ( this.responseText );
		if(tx){
			$s('linkBlik').className = 'newStyleKonsLink '+tx;
		}
	}
};
if( getCookie('compare')!=null ){
	bestCookie = getCookie('compare');
	dumpduo = JSON.parse(bestCookie);
	if($s('countCompare')){ $s('countCompare').innerHTML = Object.keys( dumpduo ).length; }
}else{
	if($s('countCompare')){ $s('countCompare').innerHTML = 0; }
}

function slyLink() {
    var istS = 'Источник контента:'; 
    var copyR = 'https://www.foroom.ru';
    var body_element = document.getElementsByTagName('body')[0];
    var choose;
    choose = window.getSelection();
    var myLink = document.location.href;
    var authorLink = "<br /><br />" + istS + ' ' + "<a href='"+myLink+"'>"+myLink+"</a><br />" + copyR; 
    var copytext = choose + authorLink;
    var addDiv = document.createElement('div');
    addDiv.style.position='absolute';
    addDiv.style.left='-99999px';
    body_element.appendChild(addDiv);
    addDiv.innerHTML = copytext;
    choose.selectAllChildren(addDiv);
    window.setTimeout(function() {
        body_element.removeChild(addDiv);
    },0);
};
if (/:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0] !== 'orig') {
	document.oncopy = slyLink;
}
var bs = null;
var params = null;
var div=null;

function refresh_besier() {
	bs.reinit(function() {
		if (div !=null) document.body.removeChild(div);
		div=null;
	});
/* возможен вызов без callcack'а bs.reinit(); - таймер на старт реинициализации ВСТРОЕН!!! (timeout в параметрах)*/
};

var zCountEvo = 0;
var slideEvo = {};
slideEvo[0] = {'countz':'1','text':'Выберите тип жалюзи','link':'/images/evo/1ze.png','klass':'line1z'};
slideEvo[1] = {'countz':'2','text':'ВЫБЕРИТЕ ПАРАМЕТРЫ,<br/> КОТОРЫЕ ДЛЯ ВАС<br/> ВАЖНЫ в системе','link':'/images/evo/2ze.png','klass':'line2z'};
slideEvo[2] = {'countz':'3','text':'выберите систему по<br/>полученным результатам','link':'/images/evo/3ze.png','klass':'line3z'};
slideEvo[3] = {'countz':'4','text':'введите необходимые<br/>размеры','link':'/images/evo/4zez1.png','klass':'line4z'};
slideEvo[4] = {'countz':'5','text':'выберите материал','link':'/images/evo/5ze.png','klass':'line5z'};

function listZSlide() {
	if($s('flyEvo')&&get_cookie('evoGT')!=null){
		$sw('evoCont')[0].innerHTML = slideEvo[1].countz+'.<br/><br/>'+slideEvo[1].text;
		$s('linez').className = "line1z";
		$s('linez').className = slideEvo[1].klass;
		if($sw('linkZevoHover')[0]){ $sw('linkZevoHover')[0].className = 'linkZevoNoHover'; }
		$tids('evoSlide','LI',1).className = 'linkZevoHover';
	}else{
	
		$sw('evoCont')[0].innerHTML = slideEvo[0].countz+'.<br/><br/>'+slideEvo[0].text;
		$s('linez').className = "line1z";
		$s('linez').className = slideEvo[0].klass;
		if($sw('linkZevoHover')[0]){ $sw('linkZevoHover')[0].className = 'linkZevoNoHover'; }
		$tids('evoSlide','LI',0).className = 'linkZevoHover';
		setTimeout(start_besier, 500);
		/*start_besier();*/
	}
};
if($s('evoSlide')){
	listZSlide();
};

if($s('evoNext')){
	$s('evoNext').onclick = function(){
		if(zCountEvo<4){
			zCountEvo++;
			$sw('evoCont')[0].innerHTML = slideEvo[zCountEvo].countz+'.<br/><br/>'+slideEvo[zCountEvo].text;
			$s('linez').className = slideEvo[zCountEvo].klass;
			zStyleOrange();
			start_besier();
		}	
	}
};
if($s('evoBack')){
	$s('evoBack').onclick = function(){
		if(zCountEvo>0){
			zCountEvo--;
			$sw('evoCont')[0].innerHTML = slideEvo[zCountEvo].countz+'.<br/><br/>'+slideEvo[zCountEvo].text;
			$s('linez').className = slideEvo[zCountEvo].klass;
			zStyleOrange();
			start_besier();
		}
	}
};

if($s('evoSlide')){
	for (var i=0; i < $tid('evoSlide','LI').length; i++) {
		$tids('evoSlide','LI',i).onclick = function(){
			zCountEvo = this.lang;
			$sw('evoCont')[0].innerHTML = slideEvo[zCountEvo].countz+'.<br/><br/>'+slideEvo[zCountEvo].text;
			$s('linez').className = slideEvo[zCountEvo].klass;
			zStyleOrange();
			start_besier();
		}
	}
};
/*
if($s('evoBoxHidden')){
	$s('evoBoxHidden').onclick = function(){
		$s('flyEvo').style.display = 'none';
		$s('leto').style.display = 'block';
		$('#leto').css({right: '100px',bottom: '110px',opacity: '0'});
		$('#leto').stop(); 
		.animate({
			right: '45px', 
			bottom: '110px', 
			opacity: '1' 
		}, 1500);
	}
};*/

if($s('leto')){
	$s('leto').onclick = function(){
		$s('flyEvo').style.display = 'block';
		$s('leto').style.display = 'none';
		listZSlide();
	}
};

if($s('flyEvo')&&get_cookie('evoLeto')!=null){
	$s('flyEvo').style.display = 'none';
	$s('leto').style.display = 'block';
}else{
	document.cookie = "evoLeto = 1; path=/;";
}
function zStyleOrange(){
	if($sw('linkZevoHover')[0]){ $sw('linkZevoHover')[0].className = 'linkZevoNoHover'; }
	$tids('evoSlide','LI',zCountEvo).className = 'linkZevoHover';
}
function person_info_open() {
	window.open("https://www.foroom.ru/personalnie-dannie/");	
};
$('#toTop').click(function() {
	$('body,html').animate({scrollTop:0},800);
});
if( $s('uPage') ){
	$s('uPage').onclick = function(){
		$sw('header-wr')[0].scrollIntoView(top);
	}
}

function get_basket_cnt() {
    var order_items = null;
    if (local_storage_available) {
        var store = new Persist.Store('foroom_calculator');
        store.get('order_items', function(ok, val) {
			if (ok)
			order_items =  jQuery.parseJSON(val);
		});
        if (order_items !== null){
			$('#go-bus').html(order_items.length); 
			if(order_items.length>0){
				if($s('post-bus-go')){ 
					$s('post-bus-go').className = 'goInPage'; 
					$s('post-bus-go').onclick = function(){  location.href = '/order/'; }
				}
			}else{
				if($s('post-bus-go')){ $s('post-bus-go').className = 'noInPage'; }
			}
		} else{
			 console.log('-');
			$('#go-bus').html(0); 
			if($s('post-bus-go')){ $s('post-bus-go').className = 'noInPage'; }
		}
    } else {
        var jsend = {sessid:local_storage_available_sessid, name:'order_items'};
        var data = new FormData();
        data.append( 'jstr', JSON.stringify(jsend));
        $.ajax({
			url: '/ajax_proxy.php?json&action=get_foroom_cookie',
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, /* Не обрабатываем файлы (Don't process the files)*/
			contentType: false, /* Так jQuery скажет серверу что это строковой запрос*/
			success: function( respond, textStatus, jqXHR ){
				if( respond.status == 'OK' ){
					order_items = respond.data;
					console.log(order_items);
					if (order_items !== null){
					   $('#go-bus').html(order_items.length);
					  if($s('post-bus-go')){ $s('post-bus-go').className = 'goInPage'; }
					}else{
						$('#go-bus').html(0);
						if($s('post-bus-go')){ $s('post-bus-go').className = 'noInPage'; }
					}
				}else{
					$('#go-bus').html(0);
				}
			},
			error: function( jqXHR, textStatus, errorThrown ){}
        });
    }
}

function open_video (str) {
    yaCounter31892916.reachGoal('videoAllPage');
    var div = document.createElement('DIV');
    var dtv = document.createElement('DIV');
    var ss = document.createElement('S');
    var cls = document.createElement('I');
    div.className='hide';
    ss.innerHTML = '<video id="tros" style="max-width: 100%; max-height: 100%; display: block;" autoplay="autoplay" controls="controls"> <source src="'+str+'" ><source src="/2012/video/FOROOM.webm" type="video/webm; codecs=vp8, vorbis"></video>';
	vs = document.body.childNodes[0]; document.body.insertBefore(div,vs);
	div.appendChild(dtv);
	dtv.appendChild(ss);
	dtv.appendChild(cls); /*ss.appendChild(txt);*/
	ss.appendChild(cls);

    cls.onclick = function(){ this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode); };
	if($s('tros')){
		if ($s('tros').requestFullscreen) {
			$s('tros').requestFullscreen();
		} else if ($s('tros').mozRequestFullScreen) {
			$s('tros').mozRequestFullScreen();
		} else if ($s('tros').webkitRequestFullscreen) {
			$s('tros').webkitRequestFullscreen();
		}
	}
}

function openBaseVideo(tx){
    yaCounter31892916.reachGoal('ViewVideo');
    open_video(tx);
}
function openLandingVideo(tx){
    yaCounter31892916.reachGoal('videoAllPage');
    open_video(tx);
};
if($s('videoFull')){ 
	if( $s('boxModVideo') ) { $s('boxModVideo').style.display = 'none'; };
	$s('videoFull').onmouseout = function(){ this.pause(); this.poster="/2012/video/fon-src.jpg"; };
	$s('videoFull').onmouseover = function(){  this.play(); yaCounter31892916.reachGoal('ViewVideo'); }
};

var store = new Persist.Store('foroom_calculator');

if($sw('newOrderIcon')[0]){
	$sw('newOrderIcon')[0].onclick = function(){
		location.href = '/order/';
	}
};
/* интерактивность */
if($sw('linkSelect').length>0)
for (var i=0; i < $sw('linkSelect').length; i++) { 
	$sw('linkSelect')[0].onclick = function(){
		this.href = 'javascript:void(0)';
		$s('oneSelect').style.display = 'block';
		$s('twoSelect').style.display = 'none';
	};
	$sw('linkSelect')[1].onclick = function(){
		this.href = 'javascript:void(0)';
		$s('oneSelect').style.display = 'none';
		$s('twoSelect').style.display = 'block';
	}		
}

function loadGetMakeId(tx,i){
	store.set('last_item', tx['make'][i].make);
	console.log(tx);
	var tm = '';
	if( tx['make'][i]['typeName'] == 'РУЛОННЫЕ ШТОРЫ' ){
		tm = 'Цвета тканей для рулонных штор';
	}else if(tx['make'][i]['typeName'] == 'ИНТЕГРА ПЛИССЕ'){ 
		tm = 'Цвета тканей для штор плиссе';
	}else if(tx['make'][i]['typeName'] == 'РУЛОННЫЕ ШТОРЫ DUO'){ 
		tm = 'Цвета тканей рулонных штор DUO';
	}else if(tx['make'][i]['typeName'] == 'РИМСКИЕ ШТОРЫ'){ 
		tm = 'Цвета тканей для римских штор';
	}else if(tx['make'][i]['typeName'] == 'ГОРИЗОНТАЛЬНЫЕ ЖАЛЮЗИ'){ 
		tm = 'Цвета ламелей для горизонтальных жалюзи';
	}else if(tx['make'][i]['typeName'] == 'ВЕРТИКАЛЬНЫЕ ЖАЛЮЗИ'){ 
		tm = 'Цвета ламелей для вертикальных жалюзи';
	};
	makeName = '<p>Материал для '+tx['make'][i].name+' </p><br/><span>'+tm+'</span>'; /* <br/><span>Цвета ламелей горизонтальных жалюзей</span> */
	$s('uploadMake').innerHTML = makeName;
	/*var mattName = '';
	console.log(8);*/
	for (var z=0; z < Object.keys(tx['matt'][tx['make'][i].id]).length; z++){
		if(makeStok==1){
			if( fridayStory[tx['matt'][tx['make'][i].id][z].tid]){
				havesale = '<span class="storyHaveSale"></span>';
			}else{
				havesale = '';
			}
		}else{
			havesale = '';
		};
		var icon = tx['matt'][tx['make'][i]['id']][z]['icon'];
		var icos = tx['matt'][tx['make'][i]['id']][z]['icos'];
		var idMatt = z;
		var tidMatt = tx['matt'][tx['make'][i]['id']][z]['tid'];/**/
		
		mattName += '<li><b class="uploadMatt-LI-zoom fancybox" href="https://foroom.ru/docs/kons/load/' + icos + '"><b></b></b>' + havesale + '';
		if((tx['matt'][tx['make'][i]['id']][z]['name']).length>15){
			nameZ = (tx['matt'][tx['make'][i]['id']][z]['name']).substring(0,16)+'..';
		}else{
			nameZ = tx['matt'][tx['make'][i]['id']][z]['name']; 
		};
		
		mattName += '<b>'+nameZ+'</b>';
		mattName += '<img src="https://foroom.ru/docs/kons/mini/'+icon+'">';
		mattName += '<i class="postMatt" lang='+tidMatt+'>РАССЧИТАТЬ<br/>СТОИМОСТЬ</i>';
		mattName += '</li>';
	};
	$s('uploadMatt').innerHTML = mattName;
	
	if(typeof homePage[1]!=="undefined" && homePage[1]!= null ){
		selectMakeLink = '/buy/'+homePage[1]+'/';
	}else{
		selectMakeLink = '/buy/';
	}
	
	if($s('buylinKons')){
		$s('buylinKons').style.display = 'block';
		$s('buylinKons').lang = tx['matt'][tx['make'][i]['id']][0]['tid'];
	}
	
	
	for (var i=0; i < $sw('postMatt').length; i++) {
	$sw('postMatt')[i].onclick = function(){
		document.cookie = "evoGT = 1; path=/;";
		var jlang = JSON.parse(store.store.PSforoom__calculatorPSlast__item);
		jlang.material = this.lang;
		jlangS = JSON.stringify(jlang);
		store.set('last_item', jlangS);
		setTimeout(location.href = selectMakeLink, 1500);
		
		if(typeof yaCounter31892916 !== "undefined" && yaCounter31892916 != null) if( yaCounter31892916.reachGoal('materialClick'));
		if(typeof ga !== "undefined" && ga != null)  ga('send', 'event', 'screen', 'linkMaterial');
	}	};
	/*  */
	
	/* кнопка  */
	
};


function file_get_contents( url ) {
	var req = null;
	try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
		try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
			try { req = new XMLHttpRequest(); } catch(e) {}
		}
	}
	if (req == null) throw new Error('XMLHttpRequest not supported');
	req.open("GET", url, false);
	req.send(null);
	return req.responseText;
};


	// 	console.log('uploadMake');


	var one_action_foroom =null;
	var all_actions_foroom =null;
	var actions_path = '/proxy/uploads/download/json/get_all_actions.json';
	if ((location.hostname.search('orig') > -1) || (location.hostname.search('cache') > -1)) actions_path = '/proxy/uploads/download/json/get_all_actions_debug.json';
	var actions_respond ={};
	try {
		actions_respond=JSON.parse (file_get_contents(actions_path));
		if (typeof actions_respond !== "undefined" && actions_respond != null) {
			if (actions_respond.status == 'OK') {
				all_actions_foroom = actions_respond.data;
	    	}
	    }
	} catch(e) {};	
	//console.log(actions_path,all_actions_foroom);
	if (all_actions_foroom) {
		for(key in all_actions_foroom){
			if (all_actions_foroom[key]){
				if (all_actions_foroom[key].img_body_bg && all_actions_foroom[key].img_body_bg != '')  {
					one_action_foroom = all_actions_foroom[key];
				}
				if (all_actions_foroom[key].img_izd_head && all_actions_foroom[key].img_izd_head != '') {
					for (k in all_actions_foroom[key].izd_types_json) {
						var v =all_actions_foroom[key].izd_types_json[k];
						try {
							$("#lendingMenu_action_pic_"+v).html('<img src="'+all_actions_foroom[key].img_izd_head+'"/>');
						} catch(e){};
					}
				}
			}
		}
		if (one_action_foroom) {
			if (one_action_foroom.img_body_bg !='') 
				$('body').css({'background-image':'url('+one_action_foroom.img_body_bg+')'});
			if (one_action_foroom.img_kons_button != '') {
				$(".back-stap-menu-start").css({'background-image':'url('+one_action_foroom.img_kons_button+')'});
				$(".back-stap-menu-start").html('');
			}
		}
	}
	
	
	
if($s('uploadMake')||$s('uploadMatt')){
	urlHome = window.location.pathname;
	var backSD = страницы('/2012/json/getMatetrial.php?home=777');
	var txSD = JSON.parse ( backSD );
	for (var g=0; g < Object.keys(txSD['home']).length; g++){
		if( urlHome == txSD['home'][g].page ){
			console.log( txSD['home'][g].tid );
			var back = страницы('/2012/json/getMatetrial.php?page='+txSD['home'][g].tid);
			var tx = JSON.parse ( back );
			if(tx['live']&&tx['live']==1){
				 var mattName = '';
				for (var i=0; i < Object.keys(tx['make']).length; i++){
					var page = JSON.parse(tx['make'][i].make);
					if( urlHome == page.url ){
						setTimeout(loadGetMakeId, 1000, tx, i);
						var makeStok = 0;
						$s('uploadMatt').style.display = 'block';
						$s('uploadMake').style.display = 'block';
					}
				}
			}
		}
	}
}

/* Всплывающие меню для новых статей */
function loadMenuFooterStat(){
	console.log(' GO FIRE FREE ');
	$sw('GoFireFree')[0].style.display = 'block';
	$sw('GoFireFree')[0].onmouseleave = function() {
		$sw('GoFireFree')[0].style.display = 'none';
	}
};
/* Запуск скрипта */
if($sw('linkNewStat').length>0){
	$sw('linkNewStat')[0].onmouseover = function() {
		loadMenuFooterStat();
	}
}

/* Если пользователь зашел первый раз то делаем его меню мигающим */
function мигающееМеню(){
	if($sw('newUserBlink')[0].lang!=1){
		$sw('newUserBlink')[0].lang=1;
		$sw('newUserBlink')[0].style.border = '4px solid #f3c9a3';
		$sw('newUserBlink')[0].style.background = 'transparent';
		$tv('newUserBlink',0,'DIV')[1].style.background = 'transparent url("/images/mods/step-link.png") no-repeat scroll center center';
	}else{
		$sw('newUserBlink')[0].lang=0;
		$sw('newUserBlink')[0].style.border = '4px solid #e38839';
		$sw('newUserBlink')[0].style.background = '#e38839';
		$tv('newUserBlink',0,'DIV')[1].style.background = 'transparent url("/images/mods/step.png") no-repeat scroll center center';
	}
	setTimeout(function() { мигающееМеню(); /*alert('0.5 секунды')*/ }, 500);
};
if($sw('newUserBlink').length>0){
	мигающееМеню();
};

/* замена ТАЙТЛОВ на карточках товара */
/* Навигационное меню */
if($sw('menuStyle').length>0){
	for (var i=0; i < $sw('menuStyle').length; i++) {
		$sw('menuStyle')[i].lang = i;
		$sw('menuStyle')[i].onmouseover = function(){
			$s('show-list-memu').innerHTML = '';
			div = document.createElement('UL');
			divImg = document.createElement('IMG');
			if($facts(this,'UL',0)){ newTXT = $facts(this,'UL',0).innerHTML;}else{ newTXT =''; }
			div.innerHTML = newTXT;
			div.className = 'show-list-memu';
			div.id = 'submenu';
			divImg.src = '/images/h/lmh.png';
			
			$s('show-list-memu').appendChild(div);
			div.appendChild(divImg);
			/* Ставим метку */
			w = screen.width;
			if( this.lang=='0' && w >1400 ){ 
				$tids('show-list-memu','UL',0).style.minWidth = '50%';
				$tids('show-list-memu','IMG',0).style.right = '-60px'; 
			}else if( this.lang=='0' && 1400 > w ){
				$tids('show-list-memu','IMG',0).style.right = '0px'; 
			};
			if( this.lang=='1' && w >1400 ){ $tids('show-list-memu','IMG',0).style.right = '190px'; }else if( this.lang=='1' && 1400 > w ){
				$tids('show-list-memu','IMG',0).style.right = '449px';
			};
			if(this.lang=='2'){ $tids('show-list-memu','IMG',0).style.right = '333px'; }
			/* Три подменюшки */
			this.id="topMenu-on";
			div.onmouseover = function(){
				this.id='goodShow';
			};
			div.onmouseleave = function(){ 
				$s('show-list-memu').innerHTML = '<ul style="display: none"></ul>';
			}		
		};
		$sw('menuStyle')[i].onmouseout = function(){
			setTimeout(function() { if(!$s('goodShow')&&!$s('topMenu-on')){ $s('show-list-memu').innerHTML = '<ul style="display: none;"></ul>'; } }, 500);
			if($tids('show-list-memu','UL',0).onmouseout!='NULL'){
				this.id="topMenu-off";
			}
		}	
	}
};

/* Навели на всплывающее меню поставили галочку */
/* Просматриваем видео */
if($sw('alrdesc')[0]){
	for (var i=0; i < $sw('alrdesc').length; i++) {
		$sw('alrdesc')[i].onclick = function(e){
			if(e.target.nodeName!='A'){
				div = document.createElement('DIV');  dtv = document.createElement('DIV');  cls = document.createElement('I'); 
				txt = document.createElement('B'); div.className='hide hideImg'; 
				if($facts(this,'DIV',0) ){
					txt.innerHTML = $facts(this,'DIV',0).innerHTML;
				}else{ txt.innerHTML = this.parentNode.innerHTML; }
				document.body.appendChild(div); div.appendChild(dtv); dtv.appendChild(txt); txt.appendChild(cls);
				cls.onclick = function(){ this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode); }
			}else{
				/* просматриваем видео*/
				div = document.createElement('DIV');  dtv = document.createElement('DIV');  ss = document.createElement('S'); cls = document.createElement('I'); 
				div.className='hide'; 
				ss.innerHTML = '<video width="100%" style="max-width: 920px;" autoplay="autoplay" controls="controls"> <source src="'+$facts(this,'A',0).lang+'"></video>';
				if($facts(this,'A',0).lang!='zzz'){ document.body.appendChild(div); div.appendChild(dtv); dtv.appendChild(ss); ss.appendChild(cls); }
				cls.onclick = function(){ this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode); }
			}
		}
	}
};

if($sw('installGS').length>0){
	for (var i=0; i < $sw('installGS').length; i++) {
		$sw('installGS')[i].onclick = function(){
			setTimeout(location.href = this.lang, 500);
	}	}
}
