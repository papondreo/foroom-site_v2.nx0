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
	$size='';
	$url = 'http://api.foroom.ru';
		if (isset($param[count($param)-1])) 	{
		$file 		= $param[count($param)-1];
		$qparam = explode('?', $file);
		$query_string='';
		if (isset($qparam[1])) {
			$query_string = $qparam[1];
			$file = $qparam[0];
		} 
		unset($param[count($param)-1]);
		unset($qparam);
	}
	if (isset($param[1])) 					{$module 	= $param[1]; unset($param[1]);}
	$path = implode('/',$param);
	$path = str_replace (".","",$path);
	unset($param);
	$url = $url.$path.'/'.$file;
	$url = str_replace ('&','',$url);
	$url = str_replace ('?','',$url);
	if ($query_string != '') {
		$url = $url.'?'.$query_string;
	} 
//	if (file_exists($_SERVER['DOCUMENT_ROOT'].'/app/components/captcha/captcha.php')) {
//	    require_once($_SERVER['DOCUMENT_ROOT'].'/app/components/captcha/captcha.php');
//    }
if (isset($_POST['captcha']) && isset($_COOKIE['kapt'])) {
	if ($_POST['captcha'] != $_COOKIE['kapt']) {
		$json=[];
		$json['status']='FAIL';
		$json['data']=[];
		$json['errors']=[];
		$json['errors'][]=['module'=>'Captcha', 'func'=>'proxy', 'code'=>0, 'descr'=>'Не правильно введен Проверочный Код'];
		$json['time'] =round(microtime(true) - $start, 2).'s';
		output(json_encode($json,true));
	}
	unset($_POST['captcha']);
}
//echo $url; die;


	getRequest($url);

    function getRequest($url) {	
		$ch = curl_init();
		//curl_setopt($ch, CURLOPT_NOBODY, true);
		curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER["HTTP_USER_AGENT"]);
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_POST, 1 );
		curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 500);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		//curl_setopt($ch, CURLOPT_HEADER, true); 
		$host = '';
		if (isset($_SERVER['HTTP_HOST'])) $host = $_SERVER['HTTP_HOST'].' -> ';
		fLog($url, $host, $_POST);
		$data =curl_exec($ch);
		$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
		curl_close($ch);
		header("Access-Control-Allow-Origin: *");
		header('Access-Control-Expose-Headers: *');
		header('Content-Type: '.$contentType);
		//header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
		header("Content-length: ".strlen($data));
		header("Pragma: no-cache");
        header("Expires: 0");
		die($data);	
}
    
    function fLog($url, $host, $post) {
	    $str = date("d.m.Y H:i:s").' '.$host.''.$url.' '.json_encode($post);
	    $f = fopen('/var/www/logs/proxy_'.date('Y-m-d').'.log', 'a');
		fwrite($f, $str . PHP_EOL);
		fclose($f);
    }

    function fLogClear($url, $post) {
		if (file_exists('/var/www/logs/proxy.log')) {
			$f = fopen('/var/www/logs/proxy.log', 'w');
			fclose($f);
		}
    }
?>