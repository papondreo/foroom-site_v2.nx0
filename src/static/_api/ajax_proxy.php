<?php
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
error_reporting(0);

	$start = microtime(true);
		$url='';

		if (isset($_SERVER['HTTP_HOST'])) $host = $_SERVER['HTTP_HOST'].' -> ';
		fLog($url, $host, $_POST);


    if (isset($_COOKIE['enter_debug'])) {$_GET['enter_debug']=8888;}



    if (isset($_GET['action']) && $_POST) {
        switch (trim($_GET['action'])) {

            case 'get_all_data':           output_txt(file_get_contents("/var/www/media/txt/get_all_data.json"));break;
            case 'get_all_karn_data':      output_txt(file_get_contents("/var/www/media/txt/get_all_karn_data.json"));break;
            case 'get_multiple_cost':      output_txt(file_get_contents("/var/www/media/txt/get_multiple_cost.json"));break;
            case 'get_all_data_foroom':
                if (isset($_COOKIE['enter_debug']))
                    output_txt(file_get_contents("/var/www/media/txt/get_all_data_foroom_debug.json"));
				else
                    output_txt(file_get_contents("/var/www/media/txt/get_all_data_foroom.json"));
                break;

	        case 'save_order_foroom':      save_order($_POST);break;
	        case 'foroomRU_customer_email':      foroomRU_customer_email($_POST);break;
			case 'send_some_email':  send_some_email($_POST);break;
            case 'call_back_uis':      output_json(call_back_uis($_POST));break;
            default: output_json(['status'=>'OK']);
				//output_txt(getRequest('https://sale.foroom.ru/vrn_ajax_kons.php', $_GET, $_POST, $_COOKIE));
				// default:	output_txt(getRequest('https://sale.foroom.ru/vrn_ajax_kons.php', $_GET, $_POST, $_COOKIE));
            	break;
        }

    }
	


function save_order($post) {
	$scenario_id = 0;
	if (isset($post['jstr'])) if (trim($post['jstr'])!='')   $jstr=trim($post['jstr']); else $jstr='{}';
    $jpost = (array) json_decode($jstr,true);
    if (isset($jpost['scenario_id'])) $scenario_id = (int)$jpost['scenario_id'];
	if ($scenario_id>0) call_back_uis($post);
	output_txt(getRequest('https://sale.foroom.ru/vrn_ajax_kons.php', $_GET, $_POST, $_COOKIE));
}

function foroomRU_customer_email($post) {
	output_txt(getRequest('https://sale.foroom.ru/vrn_ajax_kons.php', $_GET, $_POST, $_COOKIE));
}

function send_some_email($post) {
	output_txt(getRequest('https://sale.foroom.ru/vrn_ajax_kons.php', $_GET, $_POST, $_COOKIE));
}



    function fLog($url, $host, $post) {
	    $str = date("d.m.Y H:i:s").' '.$host.''.$url.' '.json_encode($post);
	    $f = fopen('/var/www/logs/ajax_proxy_'.date('Y-m-d').'.log', 'a');
		fwrite($f, $str . PHP_EOL);
		fclose($f);
    }




function formatPhone ($phone) {
	$gost = array(
		' '=>'','+'=>'','('=>'',')'=>'',';'=>'','-'=>''
	);
	$phone= strtr($phone, $gost);
	if($phone[0]==8) $phone[0]=7;
	return $phone;
}


function call_back_uis($post) {
	$id = "foroom_".time();
	$scenario_id = 0;
	$phone= '';
	$data = array();
	$ret = array('status'=>'FAIL', 'data'=>array());
	if (isset($post['jstr'])) if (trim($post['jstr'])!='')   $jstr=trim($post['jstr']); else $jstr='{}';
    $jpost = json_decode($jstr);
    $er= false;
    $str_query = '';
    if ( isset($jpost->scenario_id)&&isset($jpost->phone) ) {
	    $phone = formatPhone ($jpost->phone);
	    $scenario_id = (int)$jpost->scenario_id;
	}
	if ($scenario_id>0 && $phone !='') {
		$json = [
			"jsonrpc"=> "2.0",
			"method"=> "start.scenario_call",
			"id"=> $id,
			"params"=> [
				"access_token"=>"i7hzubnolljfh3zz5m0zjf53tpx29h484cmxdv3t",
				"virtual_phone_number"=> "74950210936",
				"contact"=> $phone,
				"first_call"=> "contact",
				"scenario_id"=> $scenario_id
			]
		];

//		$json = [
//			"jsonrpc"=> "2.0",
//			"method"=> "get.scenarios",
//			"id"=> "req3",
//			"params"=> [
//				"access_token"=>"i7hzubnolljfh3zz5m0zjf53tpx29h484cmxdv3t",
//			]
//		];


		$data = array();
		$data =  (array) json_decode(getCallRequest($json));
		if (!isset($data['error'])) $ret['status'] = 'OK';
		$ret['data'] = $data;
	}
	return $ret;
}


    function getCallRequest($json) {
		$post_data= json_encode($json,true);
		$headers = [
			'Cache-Control: no-cache',
			'Content-Type: application/json; charset=UTF-8',
			'Content-length:' . strlen($post_data)
		];
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, 'https://callapi.comagic.ru/v4.0' );
		//curl_setopt($ch, CURLOPT_URL, 'https://dataapi.comagic.ru/v2.0' );

		curl_setopt($ch, CURLOPT_POST, 1 );
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
		return curl_exec($ch);
    }





    function getRequest($url,$get=array(),$post_data=array(), $cookie=null) {
		$get_data='';
    	foreach($get as $k=>$v){ $get_data .=$k.'='.$v.'&'; }
		if ($get_data!='')
			$url = $url.'?'.$get_data;
		if ($cookie !=null)
			$post_data['_cookie'] = json_encode($cookie);
    	$ch = curl_init();
		if( !isset( $_SERVER['HTTP_USER_AGENT']))
			$agent = "unknown";
		else
			$agent = $_SERVER["HTTP_USER_AGENT"];

		curl_setopt($ch, CURLOPT_USERAGENT, $agent);
		curl_setopt($ch, CURLOPT_URL, $url );
		curl_setopt($ch, CURLOPT_POST, 1 );
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
		print_r($ch);
		return curl_exec($ch);
    }



        function output_txt($str) {
		//header("Access-Control-Allow-Origin: *");
        //header('Access-Control-Expose-Headers: *');
      //  header('Content-type: application/json');
        header("Content-length: ".strlen($str));
        header("Pragma: no-cache");
        header("Expires: 0");
        ob_clean();
        flush();
		die($str);
	}


    function output_json($json) {
	    global $start;
	    if (isset($start))
	    	$json['time'] =round(microtime(true) - $start,2).'s';
		output_txt(json_encode($json));
	}

    /*

	    <?php

    $post='';
    $get='';


    if (isset($_COOKIE['enter_debug'])) {$_GET['enter_debug']=8888;}



    if (isset($_GET['action'])) {
        switch (trim($_GET['action'])) {



            default:



            break;

        }

    }







 echo (getRequest('https://sale.foroom.ru/vrn_ajax_kons.php', $_GET, $_POST, $_COOKIE));




   // $url ='https://sale.foroom.ru/vrn_ajax_kons.php?'.$get;


    function getRequest($url,$get,$post, $cookie) {
	    $get_data='';
    	foreach($get as $k=>$v){ $get_data .=$k.'='.$v.'&'; }
		$url = $url.'?'.$get;
		$post_data = $post;
		$post_data['_cookie'] = json_encode($cookie);
    	$ch = curl_init();
		if( !isset( $_SERVER['HTTP_USER_AGENT']))
			$agent = "unknown";
		else
			$agent = $_SERVER["HTTP_USER_AGENT"];
		curl_setopt($ch, CURLOPT_USERAGENT, $agent);
		curl_setopt($ch, CURLOPT_URL, $url );
		curl_setopt($ch, CURLOPT_POST, 1 );
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
		return curl_exec($ch);
    }




?>



    */

?>
