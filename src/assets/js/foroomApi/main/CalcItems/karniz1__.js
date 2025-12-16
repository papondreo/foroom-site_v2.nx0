var karniz1 = function () {




this.karn_param_descriptions = {

karn_tube1:'Труба 1го ряда',
karn_tube2:'Труба 2го ряда',
karn_tip1:'Наконечник 1го ряда',
karn_tip2:'Наконечник 2го ряда',
karn_ring1:'Кольца 1го ряда',
karn_ring2:'Кольца 2го ряда',
karn_bracket:'Кронштейн',
karn_hook:'Крючок',
karn_connector1:'Соединитель 1го ряда',
karn_connector2:'Соединитель 2го ряда',

karn_grab:'Подхват',
karn_holder:'Держатель штанги'


}


this.__init = function() {
	this.karn_data=this.o.all_karn_data
}



this.init = function(callback) { //init_karn_forms
    //arr.karniz = {};
    var self = this;



    if ( typeof self.arr.karniz  === 'undefined' ) {
    self.arr.karniz = {
    karn_line_count:1,
    karn_tip_count:1,

    karn_tube1_diameter:0,
    karn_tip1_diameter:0,
    karn_ring1_diameter:0,
    karn_bracket1_diameter:0,
    karn_tube2_diameter:0,
    karn_tip2_diameter:0,
    karn_ring2_diameter:0,
    karn_bracket2_diameter:0,
   // karn_holder_diameter:0,
    karn_connector1_diameter:0,
    karn_connector2_diameter:0,

    karn_adapter_diameter:0,

    karn_tube1_color:0,
    karn_tube2_color:0,
    karn_tip1_color:0,
    karn_tip2_color:0,
    karn_ring1_color:0,
    karn_ring2_color:0,
    karn_bracket_color:0,
    karn_connector1_color:0,
    karn_connector2_color:0,

    karn_grab_color:0,
    karn_holder_color:0,

    karn_tube1_type:0,
    karn_tube2_type:0,
    karn_tip1_type:0,
    karn_tip2_type:0,
    karn_ring1_type:0,
    karn_ring2_type:0,
    karn_hook_type:0,
    karn_connector1_type:0,
    karn_connector2_type:0,

    karn_grab_type:0,
    karn_holder_type:0,
    karn_bracket_type:0
    }






    var html='';
    for (var key in self.karn_data.tree.tube[1]) {
        var val = self.self.karn_data.tree.tube[1][key];

        html += '<option value="' + key + '">' + key + '</option>';
    }
    $('#karn_tube1_diameter').html(html);
    self.arr.karniz['karn_tube1_diameter'] = $('#karn_tube1_diameter').val();
    self.arr.karniz['karn_tip1_diameter'] =  self.arr.karniz['karn_tube1_diameter'];
    self.arr.karniz['karn_ring1_diameter'] =  self.arr.karniz['karn_tube1_diameter'];
    self.arr.karniz['karn_bracket1_diameter'] =  self.arr.karniz['karn_tube1_diameter'];
 //   self.arr.karniz['karn_holder_diameter'] =  self.arr.karniz['karn_tube1_diameter'];
    self.arr.karniz['karn_connector1_diameter'] =  self.arr.karniz['karn_tube1_diameter'];
    self.arr.karniz['karn_connector2_diameter'] =  self.arr.karniz['karn_tube2_diameter'];

    self.arr.karniz['karn_adapter_diameter'] =  self.arr.karniz['karn_tube1_diameter'];


    self.arr['type']='karniz';
    self.arr['subtype']= 1;

    self.arr['salePrice']=0.00;

    self.arr['sale']=0;

    //self.arr.karniz['karn_line_count'] = 1;

   // self.arr.karniz['karn_tip_count'] = 1;



    var html='';
    $.each( self.karn_data.groups.color, function( key, val ){
           html += '<option value="'+key+'">'+val+'</option>';
           });
    $('#karn_tube1_color').html(html);
    $('#karn_tube2_color').html(html);

    $('#karn_tip1_color').html(html);
    $('#karn_tip2_color').html(html);
    $('#karn_ring1_color').html(html);
    $('#karn_ring2_color').html(html);


    $('#karn_bracket_color').html(html);
    $('#karn_connector1_color').html(html);
        $('#karn_connector2_color').html(html);

    $('#karn_grab_color').html(html);
    $('#karn_holder_color').html(html);






    self.arr.karniz['karn_tube1_color'] = $('#karn_tube1_color').val();
    self.arr.karniz['karn_tube2_color'] = $('#karn_tube2_color').val();

    self.arr.karniz['karn_tip1_color'] = $('#karn_tip1_color').val();
    self.arr.karniz['karn_tip2_color'] = $('#karn_tip2_color').val();
    self.arr.karniz['karn_ring1_color'] = $('#karn_ring1_color').val();
    self. arr.karniz['karn_ring2_color'] = $('#karn_ring2_color').val();


    self.arr.karniz['karn_bracket_color'] = $('#karn_bracket_color').val();
    self.arr.karniz['karn_connector1_color'] = $('#karn_connector1_color').val();
    self.arr.karniz['karn_connector2_color'] = $('#karn_connector2_color').val();

    self.arr.karniz['karn_grab_color'] = $('#karn_grab_color').val();
    self.arr.karniz['karn_holder_color'] = $('#karn_holder_color').val();



    /*
    $groups = array('diameter1'=>$this->get_karn_grougs('diameter1'), 'diameter2'=>$this->get_karn_grougs('diameter2'),'tip'=>$this->get_karn_grougs('tip'),'color'=>$this->get_karn_grougs('color'),'len'=>$this->get_karn_grougs('len'));
    if (!$er)
        $this->arr= array('status'=>'OK', 'data'=>array('groups'=>$groups, 'goods'=>$ar_goods ), 'descr'=>'');
    else
    */


//karn_init_type_param('hook',0);



    self.input_karn_change(null);

    } else {


        var html='';
        $.each( self.karn_data.tree.tube[1], function( key, val ){
               html += '<option value="'+key+'">'+key+'</option>';
               });
        $('#karn_tube1_diameter').html(html);




        var html='';
        $.each( self.karn_data.groups.color, function( key, val ){
               html += '<option value="'+key+'">'+val+'</option>';
               });
     //   karn_init_type_param('hook',0);


        $('#karn_tube1_color').html(html);
        $('#karn_tube2_color').html(html);

        $('#karn_tip1_color').html(html);
        $('#karn_tip2_color').html(html);
        $('#karn_ring1_color').html(html);
        $('#karn_ring2_color').html(html);


        $('#karn_bracket_color').html(html);
        $('#karn_connector1_color').html(html);
        $('#karn_connector2_color').html(html);

        $('#karn_grab_color').html(html);
        $('#karn_holder_color').html(html);



var html='';
        if ( typeof self.karn_data.tree['hook'][1][0][0] !== 'undefined' )
            param_array=self.karn_data.tree['hook'][1][0][0];
        html += '<option value="0">Нет</option>';
        $.each( param_array, function( key, val ){
               html += '<option value="'+val.tid+'">'+self.karn_data.goods[val.tid].full_name+'</option>';
               });
        $('#karn_hook_type').html(html);





    }

    callback();
}




this.input_karn_change = function(obj) {

    if (obj != null) {

              arr.karniz[obj.id] = obj.value


        if (obj.id == 'karn_tube1_diameter' || obj.id == 'karn_line_count')
            if ( typeof arr.karniz['karn_line_count']  !== 'undefined' )
                if ( arr.karniz['karn_line_count'] == 2) {
            var html='';






            $.each( json_karn_data.tree.tube[1], function( key, val ){
              //     console.log(arr.karniz['karn_tube1_diameter']);
                   if ((arr.karniz['karn_tube1_diameter'] == 25 && key<25) || (arr.karniz['karn_tube1_diameter'] == 19 && key<=19) || (arr.karniz['karn_tube1_diameter'] == 16 && key<=16))

                   html += '<option value="'+key+'">'+key+'</option>';
                   });
            $('#karn_tube2_diameter').html(html);





            //$('#karn_tip_count').val(1);

        }
/*

 arr.karniz['karn_tube1_color'] = $('#karn_tube1_color').val();
 arr.karniz['karn_tube2_color'] = $('#karn_tube2_color').val();

 arr.karniz['karn_tip1_color'] = $('#karn_tip1_color').val();
 arr.karniz['karn_tip2_color'] = $('#karn_tip2_color').val();
 arr.karniz['karn_ring1_color'] = $('#karn_ring1_color').val();
 arr.karniz['karn_ring2_color'] = $('#karn_ring2_color').val();


 arr.karniz['karn_bracket_color'] = $('#karn_bracket_color').val();
 arr.karniz['karn_connector_color'] = $('#karn_connector_color').val();
 arr.karniz['karn_grab_color'] = $('#karn_grab_color').val();
 arr.karniz['karn_holder_color'] = $('#karn_holder_color').val();



 */


        arr.karniz['karn_tube2_diameter'] = $('#karn_tube2_diameter').val();
        arr.karniz['karn_tip2_diameter'] =  arr.karniz['karn_tube2_diameter'];
        arr.karniz['karn_ring2_diameter'] =  arr.karniz['karn_tube2_diameter'];
        arr.karniz['karn_bracket2_diameter'] =  arr.karniz['karn_tube2_diameter'];



        arr.karniz['karn_tip1_diameter'] =  arr.karniz['karn_tube1_diameter'];
        arr.karniz['karn_ring1_diameter'] =  arr.karniz['karn_tube1_diameter'];
        arr.karniz['karn_bracket1_diameter'] =  arr.karniz['karn_tube1_diameter'];
      //  arr.karniz['karn_holder_diameter'] =  arr.karniz['karn_tube1_diameter'];
        arr.karniz['karn_connector1_diameter'] =  arr.karniz['karn_tube1_diameter'];
        arr.karniz['karn_connector2_diameter'] =  arr.karniz['karn_tube2_diameter'];

        arr.karniz['karn_adapter_diameter'] =  arr.karniz['karn_tube1_diameter'];



        if (obj.id == 'karn_tube1_color') {




        }






        if (obj.id == 'karn_tube1_color' || obj.id == 'karn_tube1_diameter'|| obj.id == 'karn_line_count')
            karn_init_type_param('tube',1);

        if (obj.id == 'karn_tube2_color' || obj.id == 'karn_tube2_diameter'|| obj.id == 'karn_line_count')
            karn_init_type_param('tube',2);



        if (obj.id == 'karn_tip1_color' || obj.id == 'karn_tube1_diameter' || obj.id == 'karn_line_count')
            karn_init_type_param('tip',1);

        if (obj.id == 'karn_tip2_color' || obj.id == 'karn_tube2_diameter' || obj.id == 'karn_line_count')
            karn_init_type_param('tip',2);



        if (obj.id == 'karn_ring1_color' || obj.id == 'karn_tube1_diameter' || obj.id == 'karn_line_count')
            karn_init_type_param('ring',1);

        if (obj.id == 'karn_ring2_color' || obj.id == 'karn_tube2_diameter' || obj.id == 'karn_line_count')
            karn_init_type_param('ring',2);




        if (obj.id == 'karn_connector1_color' || obj.id == 'karn_tube1_diameter')
            karn_init_type_param('connector',1);

        if (obj.id == 'karn_connector2_color' || obj.id == 'karn_tube2_diameter')
            karn_init_type_param('connector',2);

        if (obj.id == 'karn_grab_color' || obj.id == 'karn_tube1_diameter')
            karn_init_type_param('grab',0);


        if (obj.id == 'karn_holder_color' || obj.id == 'karn_tube1_diameter')
            karn_init_type_param('holder',0);


 if (obj.id == 'karn_bracket_color' || obj.id == 'karn_tube1_diameter' || obj.id == 'karn_tube2_diameter' || obj.id == 'karn_line_count')
     karn_init_type_param_w_lines('bracket');




     } // obj is not null
    else {

        karn_init_type_param('tube',1);
        karn_init_type_param('tube',2);

        karn_init_type_param('tip',1);
        karn_init_type_param('tip',2);

        karn_init_type_param('ring',1);
        karn_init_type_param('ring',2);
        karn_init_type_param('hook',0);
        karn_init_type_param('connector',1);
        karn_init_type_param('connector',2);

        karn_init_type_param('grab',0);
        karn_init_type_param('holder',0);
        karn_init_type_param_w_lines('bracket');
    }




    karn_refresh();


    get_karn_cost();



    }




this.get_price = function() {


 //   arr.karniz_item = {};

    var cost = 0.00;
    $.each( $('.karn_input_type'), function( key, val ){


if ( (arr.karniz['karn_line_count'] ==1 && (val.id == 'karn_tube2_type' || val.id == 'karn_tip2_type' || val.id == 'karn_ring2_type')) || (arr.karniz['karn_tip_count'] ==1 && val.id == 'karn_tip2_type') )

           {} else {

var amount = 0;



           switch (val.id) {

           case 'karn_tube1_type': amount = 1;break;
           case 'karn_tube2_type': amount = 1;break;
           case 'karn_tip1_type': amount = 1;break;
           case 'karn_tip2_type': amount = 1;break;
case 'karn_ring1_type': amount = $('#karn_ring1_amount').val();break;
case 'karn_ring2_type': amount = $('#karn_ring2_amount').val();break;
case 'karn_bracket_type': amount = $('#karn_bracket_amount').val();break;
case 'karn_hook_type': amount = $('#karn_hook_amount').val();break;
case 'karn_connector1_type': amount = $('#karn_connector1_amount').val();break;
case 'karn_connector2_type': amount = $('#karn_connector2_amount').val();break;

case 'karn_grab_type': amount = $('#karn_grab_amount').val();break;
case 'karn_holder_type': amount = $('#karn_holder_amount').val();break;




           }

           if (amount == '') amount = 0;
           amount = parseInt(amount);

           var trade_id = parseInt($(val).val());


           var price =0.00;


           if ( typeof json_karn_data.goods[trade_id]  !== 'undefined' )

           price = json_karn_data.goods[trade_id].cost;




           cost+=price*amount;

        //   $('#'+val.id+'_cost').html(price);

         //  console.log($(val).val());
           }


           });




     var margin = parseFloat(calc.personal_info.price_margin);
     if (margin) price_margin = margin;

     // console.log(price_margin);


     cost = cost * price_margin;// 1.4;





    cost=Math.round(cost * 100)/100;
    cost=cost.toFixed(2);







    $('#karn_show_price').html(cost);
    var amount =   parseInt($('#karn_input_amount').val());
    var cost_total = cost*amount;

    $('#karn_show_total').html(cost_total);





    console.log(cost);


    arr['price']=cost;
    arr['amount'] = amount;
    arr['salePrice']=arr['price'];

console.log(arr);
}







function karn_init_type_param_w_lines(group){

    //if ( typeof arr.karniz['karn_'+group+'_color'+n]  !== 'undefined' ) {
    var html='';
    // console.log('tree');
    // console.log(json_karn_data.tree);

    var diameter1 = 0;
    var diameter2 = 0;

    if ( typeof arr.karniz['karn_'+group+'1_diameter']  !== 'undefined' ) diameter1 = arr.karniz['karn_'+group+'1_diameter'];
    if ( typeof arr.karniz['karn_'+group+'2_diameter']  !== 'undefined' ) diameter2 = arr.karniz['karn_'+group+'2_diameter'];


    var color = 0;
    if ( typeof arr.karniz['karn_'+group+'_color']  !== 'undefined' ) color = arr.karniz['karn_'+group+'_color'];

   // console.log(group);
   // console.log(group+' '+diameter1+' '+color);

    //console.log(json_karn_data.tree[group][1]);


    var param_array = {};


    if ( typeof json_karn_data  !== 'undefined' )
        if ( typeof json_karn_data.tree  !== 'undefined' )
            if ( typeof json_karn_data.tree[group]  !== 'undefined' )
                if ( typeof json_karn_data.tree[group][1]  !== 'undefined' )
                    if ( typeof json_karn_data.tree[group][1][diameter1]  !== 'undefined' )
                        if ( typeof json_karn_data.tree[group][1][diameter1][color] !== 'undefined' )
                            param_array=json_karn_data.tree[group][1][diameter1][color];


    //console.log(param_array);
    html += '<option value="0">Нет</option>';

    $.each( param_array, function( key, val ){



           var d2 = json_karn_data.goods[val.tid].diameter2;



           if (arr.karniz['karn_line_count'] ==1 ) {

           if (d2 == 0)
           html += '<option value="'+val.tid+'">'+json_karn_data.goods[val.tid].full_name+'</option>';
           }
else
           {
 if (d2 == diameter2)
           html += '<option value="'+val.tid+'">'+json_karn_data.goods[val.tid].full_name+'</option>';
           }
           });


    // console.log(html);
    $('#karn_'+group+'_type').html(html);



    arr.karniz['karn_'+group+'_type'] = $('#karn_'+group+'_type').val();

    //  }


}



this.karn_init_type_param = function(group,n) {
var self = this;
    //if ( typeof arr.karniz['karn_'+group+'_color'+n]  !== 'undefined' ) {
if (n==0) n='';
    var html='';
       // console.log('tree');
       // console.log(json_karn_data.tree);

        var diameter = 0;
        if ( typeof self.arr.karniz['karn_'+group+n+'_diameter']  !== 'undefined' ) diameter = self.arr.karniz['karn_'+group+n+'_diameter'];
    if ( typeof self.arr.karniz['karn_'+group+'_diameter']  !== 'undefined' ) diameter = self.arr.karniz['karn_'+group+'_diameter'];


        var color = 0;
        if ( typeof self.arr.karniz['karn_'+group+n+'_color']  !== 'undefined' ) color = self.arr.karniz['karn_'+group+n+'_color'];
        if ( typeof self.arr.karniz['karn_'+group+'_color']  !== 'undefined' ) color = self.arr.karniz['karn_'+group+'_color'];
/*
         console.log(group);
    console.log(group+' '+diameter+' '+color);

         console.log(json_karn_data.tree[group][1]);

*/
        var param_array = {};


        if ( typeof self.karn_data  !== 'undefined' )
            if ( typeof self.karn_data.tree  !== 'undefined' )
                if ( typeof self.karn_data.tree[group]  !== 'undefined' )
                    if ( typeof self.karn_data.tree[group][1]  !== 'undefined' )
                        if ( typeof self.karn_data.tree[group][1][diameter]  !== 'undefined' )
                            if ( typeof self.karn_data.tree[group][1][diameter][color] !== 'undefined' )
                                param_array=self.karn_data.tree[group][1][diameter][color];
    html += '<option value="0">Нет</option>';

    $.each( param_array, function( key, val ){
           html += '<option value="'+val.tid+'">'+self.karn_data.goods[val.tid].full_name+'</option>';
           });


   // console.log(html);
    $('#karn_'+group+n+'_type').html(html);
    self.arr.karniz['karn_'+group+n+'_type'] = $('#karn_'+group+n+'_type').val();

  //  }


}





function karn_refresh() {


    if ( typeof arr.karniz['karn_tube1_diameter']  !== 'undefined' )
        $('#karn_tip1_diameter').val(arr.karniz['karn_tube1_diameter']);

    if ( typeof arr.karniz['karn_tube2_diameter']  !== 'undefined' )
        $('#karn_tip2_diameter').val(arr.karniz['karn_tube2_diameter']);




    if ( typeof arr.karniz['karn_line_count']  !== 'undefined' ) {
        if ( arr.karniz['karn_line_count'] == 2) {

            $('.karn_line_count_is2').show();
            $('.karn_tip_count_is2_option').show();
         //   $('#karn_tube1_diameter').click();
        }

        if ( arr.karniz['karn_line_count'] == 1) {
            $('#karn_tip_count').val(1);
            $('.karn_line_count_is2').hide();
            $('.karn_tip_count_is2').hide();
            $('.karn_tip_count_is2_option').hide();
        }


    }



    if ( typeof arr.karniz['karn_tip_count']  !== 'undefined' ) {

        if (arr.karniz['karn_tip_count']  == 2) {
            $('.karn_tip_count_is2').show();
        }

        if (arr.karniz['karn_tip_count']  == 1) {
            $('.karn_tip_count_is2').hide();
        }
    }






}






function init_karn_events() {

    $('.karn_line_count_is2').hide();
    $('.karn_tip_count_is2').hide();
    $('.karn_tip_count_is2_option').hide();




    $('.karn_input').bind("change click input", function(ev) {

                              // arr['lineCount'] = this.value;

                               input_karn_change(this);
                               });



    $('.karn_input_amount2').bind("click change input", function() {
                                 if (this.value.match(/[^0-9]/g)){
                                 this.value = this.value.replace(/[^0-9]/g, '');
                                 }

                                  get_karn_cost();

                                  });





}







function set_karn_preview_item(ret, item, param_item) {
    var val = '';
    if ( typeof item['karniz'][param_item+'_type'] !== 'undefined' )

if (item['karniz'][param_item+'_type'] == null) val = 'Нет';
else
    val =item['karniz'][param_item+'_type'];



    if ( typeof json_karn_data.goods  !== 'undefined' )
    if ( typeof json_karn_data.goods[val]  !== 'undefined' )

        val = json_karn_data.goods[val].full_name;

    var cnt =  parseInt(item['karniz'][param_item+'_amount']);


if (item['karniz'][param_item+'_type'] != null) {
    if (cnt >0)
        val = val +'  '+cnt+' шт.';

        ret[param_item] = {
        alias:param_item+'_type',
        key:0,
        name:karn_param_descriptions[param_item],
        val:val,
        mes:''
        };

    }
    //return ret;
}



this.get_price = function() {

var self= this;

    var price = 0.00;

    if (isNaN(price)) price = 0.00;


    return price;
}



this.__init();

}


export default karniz1;
