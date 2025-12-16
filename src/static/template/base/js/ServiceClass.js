ServiceClass = function() {
    this.url=document.location.protocol+'//'+document.location.host+'/proxy/app.php';
	this.publicKey='W5pRNSx8Dx3tGY65xx3BOgAAAAE';
    this.auth={};  
      
    this.init = function() {
		   //if (typeof app.auth !== "undefined" && app.auth !=null)
		   //this.auth = app.auth;  
    }


    this.makePost = function (module, action, userdata, captcha, cb) {
        var self = this;
        var data = new FormData();
        data.append( 'json', JSON.stringify({auth:self.auth, data:userdata}) );    
        if (captcha != null) data.append( 'captcha', captcha );        
    
         $.ajax({
               url: self.url+'?'+module+'&'+action+'&'+self.publicKey,
               type: 'POST',
               data: data,
               cache: false,
               dataType: 'json',
               processData: false,
               contentType: false,
               success:   function( respond, textStatus, jqXHR ){
			   	if (typeof cb !== "undefined" && cb !=null) cb(respond);
               },
               error: function( jqXHR, textStatus, errorThrown ){	               
	           	if (typeof cb !== "undefined" && cb !=null)  cb({status:'ERROR'});
			   	console.log('ОШИБКИ AJAX запроса:', textStatus );
               }
         });
    }
    
    	this.screenSize = function() {
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		return {x:parseInt(x),y:parseInt(y)};		 
	}	 
	
	this.set = function(k, v) {
		if (typeof v !== "undefined" && v !=null)
		return window.localStorage.setItem(k,JSON.stringify(v));	
		else return false
	}
   
	this.get = function(k) {
		try {
			return JSON.parse(window.localStorage.getItem(k));	
		} catch(e) {
			return false;
		}
	}

	this.remove = function(k) {
		return window.localStorage.removeItem(k);	
	}

	this.clear = function() {
		return window.localStorage.clear();
	}
	
    
 this.init();
    
}