var makePost = function(module, action, userdata, loader, cb) {
    let self = this;
    let auth = {};
    let progress = 0;
    let app_data = null;
    let post = null;
    if (window && window.navigator && window.navigator.onLine) {
        if (self.params) {
            if (!loader) {
                if (self.params.loader) loader = self.params.loader;
            }
            //if (loader) loader.show(progress);
            if (self.params.session != null) {
                if (typeof self.params.session.sessid !== "undefined" && self.params.session.sessid != null) auth.session = self.params.session.sessid;
            }
            if (self && self.params) {
                app_data = {
                    app_type: null,
                    version: null,
                    coreVersion: null,
                    debug: null,
                };
                if (self.params.app_type) app_data.app_type = self.params.app_type;
                if (app_data.app_type === 'core') {
                    if (self.params.version) app_data.coreVersion = self.params.version;
                    if (self.params.destination) app_data.destination = self.params.destination;
                    if (self.params.console_mode) app_data.console_mode = self.params.console_mode;
                    if (self.params.nodejs_mode) app_data.nodejs_mode = self.params.nodejs_mode;
                } else {
                    if (self.params.version) app_data.version = self.params.version;
                    if (self.params.coreVersion) app_data.coreVersion = self.params.coreVersion;
                }
                if (self.params.debug) app_data.debug = self.params.debug;
            }
            if (typeof userdata === "undefined" || userdata == null) userdata = {};
            if (app_data) userdata.__app__data__ = app_data;
            let xmlhttp = new XMLHttpRequest();
            if (action === 'download') {
                xmlhttp.responseType = 'arraybuffer';
                //auth={};
            }
            post = {
                auth: auth,
                data: userdata,
                module: module,
                cmd: action,
                key: self.params.key
            }
            xmlhttp.onprogress = function(event) {
                if (event.total > 0) {
                    progress = Math.round(event.loaded / event.total * 100);
                } else {
                    progress = xmlhttp.readyState * 25;
                }
                if (loader) loader.show(progress);
            };
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) { // XMLHttpRequest.DONE == 4
                    if (xmlhttp.status === 200) {
                        let headers = xmlhttp
                            .getAllResponseHeaders()
                            .split('\r\n')
                            .reduce((result, current) => {
                                let [name, value] = current.split(': ');
                                result[name] = value;
                                return result;
                            }, {});
                        let contentType = 'application/json';
                        if (headers["content-type"]) contentType = headers["content-type"];
                        //console.log('responseType', headers);
                        let respond = { status: 'OK' };
                        if (contentType === 'application/json') {
                            respond = JSON.parse(xmlhttp.responseText);
                        } else {
                            let filename = 'file.txt';
                            //console.log(xmlhttp.responseType);
                            if (headers["filename"]) filename = headers["filename"];
                            let blob = new Blob([xmlhttp.response], { type: contentType });
                            //let file = new File([blob],filename,{type:contentType});
                            self.downloadAsFile(blob, filename);
                        }
                        if (typeof loader !== "undefined" && loader != null) loader.hide();
                        if (cb) cb(respond, post);
                    } else {
                        if (cb) cb({ status: 'ERROR' }, post);
                        console.log('ОШИБКИ AJAX запроса:'+xmlhttp.status, module, action);
                    }
                }
            };
            xmlhttp.open("POST", self.params.url, true);
            let data = new FormData();
            data.append('json', JSON.stringify(post));
            xmlhttp.send(data);
        } else {
            console.log('No params defined!')
        }
    } else {
        console.log('OFFLINE');
        if (cb) cb({ status: 'OFFLINE' }, post);
    }

    this.downloadAsFile = function(file, filename) {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
    }
};

export default makePost;