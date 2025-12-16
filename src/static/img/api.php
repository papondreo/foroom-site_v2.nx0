<?php	
	include 'Imager.php';
	$imager = new Imager($_SERVER['REQUEST_URI']);
	$imager->open();
?>

