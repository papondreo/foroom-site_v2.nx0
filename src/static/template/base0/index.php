<?php base::drop_mods('h.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title><?php base::page('metat')?></title>
	<meta name="title" content="<?php base::page('metat')?>" />
	<meta name="keywords" content="<?php base::page('metak')?>" />
	<meta name="description" content="<?php base::page('metad')?>" />
	
	<link type="text/css" rel="stylesheet" href="/template/base/h.css">
	<link rel="icon" href="/images/asp.png" type="image/x-icon">
	
	<?php base::drop_mods('h.css'); ?>
	
	<script type="text/javascript" src="/2012/js/a.js"></script>
	<script type="text/javascript" src="/2012/js/qwerty.js"></script>
	<script type="text/javascript" src="/2012/js/ie.js"></script>
	<script type="text/javascript" src="/2012/h.js"></script>
	<script type="text/javascript" src="/template/base/h.js"></script>
	
</head>

<body>
	<div id="kontur">
		<!--<div id="head"><div id="logo"></div><div class="mdos"></div></div>-->
		<div id="head"><b>Шапка сайта [ 0 ]</b></div>
		<ul id="bar"><?php base::meny();?></ul>
		<ul id="path"><b>Карта переходов по сайту</b></ul>
		<h1><?php base::page('metah')?></h1>
		<div class="map_mod"><?php base::mods('1'); ?></div>
		<div id="content">
			<div id="cont-left"><?php base::mods('4'); ?><!--<div class="map_mod"></div>--></div>
			<div id="cont-right"><?php base::mods('5'); ?></div>
			<div id="cont-base">
				<?php base::mods('2'); base::lvl(); base::mods('3'); ?>
			</div>
		</div>
		<div class="map_mod"><?php base::mods('6'); ?></div>
		<div id="footer"><b>Подвал сайта [ 7 ]</b></div>
	</div>
	<!--<link type="text/css" rel="stylesheet" href="/template/base/s.css">-->
	<script type="text/javascript" src="/template/base/s.js"></script>
	<?php base::drop_mods('h.js'); ?>
</body>
</html>