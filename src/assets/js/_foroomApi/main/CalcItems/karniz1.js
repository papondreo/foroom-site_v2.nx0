var karniz1 = function () {

    this.init_local = function() {
        if (this.oParams.height) delete(this.oParams.height);
        if (this.oParams.width) delete(this.oParams.width);
        //if (typeof this.oParams.material  !== "undefined" && this.oParams.material  !=null) delete(this.oParams.material);
       // if (typeof this.oParams.material  !== "undefined" && this.oParams.material  !=null) this.oParams.material.dom.style.display='none';

        //   console.log('all_karn_data',this.all_karn_data);


    }

    this.getMaterialPrice = function(material, cost) {
        let price = 0.00;
      //  console.log('getMaterialPrice',material, cost, this);
        if (this.oParams) {
            price += this.get_price(this.oParams);

           // console.log('getMaterialPrice',material, cost, this);

            if (this.oParams.RingsAmount) {
                let RingsAmount=0;
                if (this.oParams.karniz && this.oParams.karniz.oParams) {
                    if (this.oParams.karniz.oParams.karn_ring1_amount) RingsAmount += this.oParams.karniz.oParams.karn_ring1_amount.value;
                    if (this.oParams.karniz.oParams.karn_ring2_amount) RingsAmount += this.oParams.karniz.oParams.karn_ring2_amount.value;
                }
                this.oParams.RingsAmount.setVal(RingsAmount);
                this.oParams.RingsAmount.applyConditions();
            }

            if (this.oParams.karniz && this.oParams.karniz.oParams) {
               // price +=  this.get_price(this.oParams.karniz.oParams);
            }

        }

        if (isNaN(price)) price = 0.00;
        return price;
    }

    this.getMaterialOldPrice = function(material) {
        let price = 0.00;
        let cost = 0.00;
        if (material.isCurrentAction && material.currentActionInfo && material.currentActionInfo.perc && material.currentActionInfo.show_old_price) {
            let perc = 1 - material.currentActionInfo.perc;
            if (this.oParams) {
                cost = this.get_price(this.oParams) / perc;
                price += cost;
                /*
                if (this.oParams.karniz && this.oParams.karniz.oParams) {
                    cost = this.get_price(this.oParams.karniz.oParams) / perc;
                    price += cost;
                }
                */
            }
            if (isNaN(price)) price = 0.00;
            return price;
        }
        return 0.00;
    };





    this.controlHeightCorrection = function (param) {};

    this.get_price = function(arr) {
        var cost = 0.00;
        for (var key in arr) {
            var val = arr[key];
             if (val.enabled) {
                 if (val.type == 'karniz_material') {
                     if (val.amountParam) {
                         //console.log('ElPrice+ cost*amount',val.alias,val.amountParam.alias, val.amountParam.value, val.paramCost);
                         let price=val.amountParam.value * val.paramCost;
                         cost += price;

                     } else {
                        // console.log('ElPrice+',val.alias,val.paramCost);
                         cost += val.paramCost;

                     }
                 } else {
                    // console.log('ElPrice+',val.alias,val.paramCost);
                     cost += val.paramCost;
                 }
             }
        }
        return cost;
    }


    this.setMaterialCalc = function (material, cb) {
      //  console.log('all_karn_data',this.all_karn_data);
    };
    this.setFilterCalcItem = function (item, w, h) {
        item.calc_rev = 0;
        item.calc_enabled = item.enabled;
        return item;
    };

    this.InsertCountCorrection = function (param) {
    }

}


export default karniz1;
