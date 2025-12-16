


function init_cookie_persist() {
    
    var store = new Persist.Store(storage_name);
    var ret = true;
    try{
        store.set('test', 'test_value');
        
    } catch(e) {
        ret = false;
    }
    
    return ret;
}

