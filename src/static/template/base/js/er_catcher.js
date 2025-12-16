/*
var xmlVersions = new Array(
                            "Msxml2.XMLHTTP.6.0",
                            "MSXML2.XMLHTTP.3.0",
                            "MSXML2.XMLHTTP",
                            "Microsoft.XMLHTTP"
                            );
if( typeof XMLHttpRequest == "undefined" ) XMLHttpRequest = function() {
    for(var i in xmlVersions)
    {
        try { return new ActiveXObject(xmlVersions[i]); }
        catch(e) {}
    }
    throw new Error( "This browser does not support XMLHttpRequest." );
};


function myErrHandler(message, url, line)
{
    var server_url = window.location.toString().split("/")[2];
    var params = "logJSErr=logJSErr&message="+message+'&url='+url+'&line='+line;
    var req =  new XMLHttpRequest();
    req.open('POST', 'http://'+server_url+'/ajax_chain.php', true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-length", params.length);
    req.setRequestHeader("Connection", "close");
    req.send(params);
    return true;
}

window.onerror = myErrHandler;
*/