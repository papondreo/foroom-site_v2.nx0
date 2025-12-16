<?php	
	$start = microtime(true);

    $param=$_SERVER['REQUEST_URI'];
    $param = str_replace ('app.php','',$param);
    $param = str_replace ('api.php','',$param);
    $param = str_replace ('<','',$param);
    $param = str_replace ('>','',$param);
    $param = str_replace ('php','',$param);
    $param = str_replace ('sh','',$param);
    $param = str_replace ('@','',$param);
    $param = str_replace ('"','',$param);
    $param = str_replace ("'","",$param);
    $param = str_replace (":","",$param);
    $param = str_replace (";","",$param);
    $param = str_replace (",","",$param);
    $param = str_replace ("%","",$param);
    $param = str_replace (" ","",$param);
    $param = explode('/', $param);
	$path='';
	$file='';
	$sizeH=0;
	$sizeW=0;
	$size=0;
	$query = [];
	$query_string='';
	$quality=80;
	$debug = false;
	$url = '/var/www/media';
		if (isset($param[count($param)-1])) 	{
		$file 		= $param[count($param)-1];
		$qparam = explode('?', $file);
		if (isset($qparam[1])) {
			$query_string = $qparam[1];
			$file = $qparam[0];
		} 
		unset($param[count($param)-1]);
		unset($qparam);
	}
	if (isset($param[1])) {$module 	= $param[1]; unset($param[1]);}
	if (isset($param[2])) {
		$resizer 	= $param[2]; 
		
		
		
		
		if (strpos($resizer, '___res_') !== false) {
			$resizer = strtolower(str_replace('___res_', '',$resizer));
			$tmp = explode('_', $resizer);
			foreach($tmp as $p) {
				if (strpos($p, 'q') !== false) { $quality = (int)str_replace('q', '',$p);};
				if (strpos($p, 'w') !== false) { $sizeW = (int)str_replace('w', '',$p);};
				if (strpos($p, 'h') !== false) { $sizeH = (int)str_replace('h', '',$p);};
			}
			unset($param[2]);
		}
		
		if (strpos($resizer, '___dbg_') !== false) {
			$debug = true;
			unset($param[2]);
		}
		
	}


	
	
	$path = implode('/',$param);
	$path = str_replace (".","",$path);
	$path = str_replace ('&','',$path);
	$path = str_replace ('?','',$path);
	$file = str_replace ('&','',$file);
	$file = str_replace ('?','',$file);
	unset($param);
	if ($query_string != '') {
		$queryParams = explode('&', $query_string);
		foreach($queryParams as $param) {
			$tmp = explode('=', $param);
			$query[$tmp[0]]='';
			if (isset($tmp[1])) $query[$tmp[0]] = $tmp[1];
		}
		//$url = $url.'?'.$query_string;
	} 
	if (isset($query['w']))$sizeW = (int)$query['w'];
	if (isset($query['h']))$sizeH = (int)$query['h'];
	$size = max($sizeW, $sizeH);
	$src = $url.$path.'/'.$file;
	if ($quality<=0) $quality=80;
	if ($quality>100) $quality=100;
	if ($sizeW<0) $sizeW=0;
	if ($sizeH<0) $sizeH=0;
	
		$ext = strtolower(getExtension($file));


	
	
	
	
	
	if(file_exists($src)) {
		if ($size >0) {
			$dst = $url.'/cached_images/'.$quality.'_'.$size.'_'.$file;
			if(file_exists($dst)) open($dst);
			else {
				//$ext = strtolower(getExtension($file));
				resize($ext, $src, $dst, $size, $quality);
				if(file_exists($dst)) open($dst);
			}
		} else {
			
			if ($file!='') if(file_exists($src)) open($src);
		}
	}
	open('/var/www/media/images/0.gif');
	function open($file) {
		header('Content-type: '.@mime_content_type($file));
		header("Content-length: ".@filesize($file));
		@readfile($file);
		die;				
	}
	
	function resize($ext, $src, $dst, $size, $quality) {
		if (!class_exists('ImageResize')) 
			include 'ImageResize.php';
		if ($ext == 'jpg') resizeIconJPG($src, $dst, $size, $quality);
		if ($ext == 'jpeg') resizeIconJPG($src, $dst, $size, $quality);
		if ($ext == 'png') resizeIconPNG($src, $dst, $size, $quality);
		if ($ext == 'gif') resizeIconGIF($src, $dst, $size, $quality);
		//if ($ext == 'webp') resizeIconWEBP($src, $dst, $size, $quality);
	}
	
	function resizeIconJPG($src, $dst, $size, $quality) {
		$image = new ImageResize($src);
		$image->quality_jpg = $quality;
		$image->resizeToLongSide($size)
			->save($dst,IMAGETYPE_JPEG);	
	}
	function resizeIconPNG($src, $dst, $size, $quality) {
		$image = new ImageResize($src);
		$image->resizeToLongSide($size)
			->save($dst,IMAGETYPE_PNG);	
	}
	function resizeIconGIF($src, $dst, $size, $quality) {
		$image = new ImageResize($src);
		$image->resizeToLongSide($size)
			->save($dst,IMAGETYPE_GIF);	
	}
	
	
	function resizeIconWEBP($src, $dst, $size, $quality) {
		$ext = strtolower(getExtension($src));
	getWEBPSourceExtension($src);
		die($ext);
		//imagewebp($im, 'php.webp');
		//imagedestroy($im);
	
	
	}

	
	function getWEBPSourceExtension($filename) {
		$pos = strrpos($filename, '.') + 1;
		$src= substr(0, $pos);
		die($src);
		//$filename
		
        return substr($filename, strrpos($filename, '.') + 1);

    }

	
	
	function getExtension($filename) {
        return substr($filename, strrpos($filename, '.') + 1);
    }
    
?>

