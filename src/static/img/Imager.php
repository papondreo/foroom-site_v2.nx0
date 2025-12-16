<?php
class Imager {
	private $f404='/var/www/media/images/0.gif';
	public $filename='';
	
	private $path='';
	private $file='';
	private $sizeH=0;
	private $sizeW=0;
	private $size=0;
	private $query = [];
	private $query_string='';
	private $quality=80;
	private $debug = false;
	private $url = '/var/www/media';
	private $scr='';
	private $dst='';

	private $ext = '';
	
	
	
	function __construct($param) {
		$this->filename=$this->f404;
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
		if (isset($param[count($param)-1])) 	{
			$this->file = $param[count($param)-1];
			$qparam = explode('?', $this->file);
			if (isset($qparam[1])) {
				$this->query_string = $qparam[1];
				$this->file = $qparam[0];
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
					if (strpos($p, 'q') !== false) { $this->quality = (int)str_replace('q', '',$p);};
					if (strpos($p, 'w') !== false) { $this->sizeW = (int)str_replace('w', '',$p);};
					if (strpos($p, 'h') !== false) { $this->sizeH = (int)str_replace('h', '',$p);};
				}
				unset($param[2]);
			}
			if (strpos($resizer, '___dbg_') !== false) {
				$this->debug = true;
				unset($param[2]);
			}
		}
				
		$this->path = implode('/',$param);
		$this->path = str_replace (".","",$this->path);
		$this->path = str_replace ('&','',$this->path);
		$this->path = str_replace ('?','',$this->path);
		$this->file = str_replace ('&','',$this->file);
		$this->file = str_replace ('?','',$this->file);
		unset($param);
		if ($this->query_string != '') {
			$queryParams = explode('&', $query_string);
			foreach($queryParams as $param) {
				$tmp = explode('=', $param);
				$query[$tmp[0]]='';
				if (isset($tmp[1])) $query[$tmp[0]] = $tmp[1];
			}
			//$url = $url.'?'.$query_string;
		} 
		if (isset($query['w']))$this->sizeW = (int)$query['w'];
		if (isset($query['h']))$this->sizeH = (int)$query['h'];
		if ($this->quality<=0) $this->quality=80;
		if ($this->quality>100) $this->quality=100;
		if ($this->sizeW<0) $this->sizeW=0;
		if ($this->sizeH<0) $this->sizeH=0;
		$this->size = max($this->sizeW, $this->sizeH);
		$this->src = $this->url.$this->path.'/'.$this->file;
		//if ($this->size>0) 
		$this->dst = $this->url.'/cached_images/'.$this->quality.'_'.$this->size.'_'.$this->file;
		//die($this->dst);
		$this->ext = strtolower($this->getExtension($this->file));
		if ($this->file) $this->filename = $this->init();

	}
	
	
	
	private function init() {
		if($this->size<=0) {
			if (file_exists($this->src)) return $this->src;
		} else {
			if($this->dst && file_exists($this->dst)) return $this->dst;
		}
		
		if($this->ext == 'webp') {
			$filename=$this->initWEBP();
		} else {
			$filename=$this->initCommon();
		}
		if ($filename) return $filename;

		return $this->f404;
	}
	
	
	private function getWEBPSource($file, $ext) {
		$src = $this->url.$this->path.'/'.$file;
		//die($src);
		$dst = '';
		$quality=100;
		if ($this->size>0) $dst = $this->url.'/cached_images/'.$quality.'_'.$this->size.'_'.$file;
		if($this->size<=0) {
			if (file_exists($src)) return $src;
		} else {
			if ($dst) {
				if(file_exists($dst)) return $dst;
				if (file_exists($src)) {
					$dst=$this->resize($ext,$src,$dst,$quality);
					if(file_exists($dst)) return $dst;
				}
			}
		}
		return false;
	}

	
	private function initWEBP() {
		$file=$this->checkWEBPSourceName($this->file);
		$ext = strtolower($this->getExtension($file));
		if ($src=$this->getWEBPSource($file, $ext)) return $this->resizeWEBP($ext, $src, $this->dst);

		//die($ext);
		return false;
	}
	
	private function initCommon() {
		if (file_exists($this->src)) {
			$this->dst=$this->resize($this->ext,$this->src,$this->dst, $this->quality);	
			if(file_exists($this->dst)) return $this->dst;
		}
		return false;
	}
	
	
	
	public function open() {
		//die(@mime_content_type($this->filename));
		//header('Content-type: '.@mime_content_type($this->filename));
		$ext=$this->ext;
		if ($ext=='jpg') $ext='jpeg';
		header('Content-type: image/'.$ext);
		$filesize=@filesize($this->filename);
		if (($filesize % 2 == 1) && $ext=='webp') $filesize++;
		header("Content-length: ".$filesize);
		@readfile($this->filename);
		die;				
	}
	
	private function resize($ext,$src,$dst,$quality) {
		if (!class_exists('ImageResize')) include 'ImageResize.php';
		if ($ext == 'jpg') return $this->resizeIconJPG($src,$dst,$quality);
		if ($ext == 'jpeg') return $this->resizeIconJPG($src,$dst,$quality);
		if ($ext == 'png') return $this->resizeIconPNG($src,$dst);
		if ($ext == 'gif') return $this->resizeIconGIF($src,$dst);
		return $false;
	}
	
	private function resizeIconJPG($src,$dst,$quality) {
		$image = new ImageResize($src);
		$image->quality_jpg = $quality;
		$image->resizeToLongSide($this->size)
			->save($dst,IMAGETYPE_JPEG);
		return $dst;	
	}
	private function resizeIconPNG($src,$dst) {
		$image = new ImageResize($src);
		$image->resizeToLongSide($this->size)
			->save($dst,IMAGETYPE_PNG);	
		return $dst;	
	}
	private function resizeIconGIF($src,$dst) {
		$image = new ImageResize($src);
		$image->resizeToLongSide($this->size)
			->save($dst,IMAGETYPE_GIF);	
		return $dst;	
	}
	
	
	private function resizeWEBP($ext,$src,$dst) {
		if ($ext == 'jpg') return $this->resizeWebpJPG($src,$dst);
		if ($ext == 'jpeg') return $this->resizeWebpJPG($src,$dst);
		if ($ext == 'png') return $this->resizeWebpPNG($src,$dst);
		if ($ext == 'gif') return $this->resizeWebpGIF($src,$dst);
		return $false;
	}
	
	
	private function resizeWebpJPG($src,$dst) {
		$img = imagecreatefromjpeg($src);
		//header('Content-Type: image/webp');
		//imageWebp($img, null, $this->quality);
		
		//die;
		
		imagewebp($img, $dst, $this->quality);
		imagedestroy($img);
		
		if (filesize($dst) % 2 == 1) {
			file_put_contents($dst, "\0", FILE_APPEND);
		}
		
		
		
		return $dst;	
	}
	
	private function resizeWebpPNG($src,$dst) {
		$img = imagecreatefrompng($src);
		/*
		$w = imagesx($img);
		$h = imagesy($img);;
		$im = imagecreatetruecolor ($w, $h);
		imageAlphaBlending($im, false);
		imageSaveAlpha($im, true);
		$trans = imagecolorallocatealpha($im, 0, 0, 0, 127);
		imagefilledrectangle($im, 0, 0, $w - 1, $h - 1, $trans);


		imagecopy($im, $img, 0, 0, 0, 0, $w, $h);
		
		
		*/
		//imagepalettetotruecolor($img);
		//imagealphablending($img, true);
		//imagesavealpha($img, true);
		imagewebp($img, $dst, $this->quality);
		imagedestroy($img);
		if (filesize($dst) % 2 == 1) {
			file_put_contents($dst, "\0", FILE_APPEND);
		}
		return $dst;	
	}
	
	private function resizeWebpGIF($src,$dst) {
		$img = imagecreatefromgif($src);
		//imagepalettetotruecolor($img);
		//imagealphablending($img, true);
		//imagesavealpha($img, true);
		imagewebp($img, $dst, $this->quality);
		imagedestroy($img);
		if (filesize($dst) % 2 == 1) {
			file_put_contents($dst, "\0", FILE_APPEND);
		}
		return $dst;	
	}

	
	
	

	
	private function checkWEBPSourceName($filename) {
		$pos = strrpos($filename, '.') + 1;
		$src= substr($filename, 0, $pos-1);
        return $src;
    }

	
	
	private function getExtension($filename) {
        return substr($filename, strrpos($filename, '.') + 1);
    }
	
	
	
	
	
	
	
	
	
	
	
}	//class
	
	
	
	
	
	
	?>