function CMATVIEW () {

    CMATVIEW.prototype.define = function CMATVIEW() {
	    this.cmin = 0;
        this.cmax = 100;
        var size_c = 25;
        this.colormap_string = "jetcolormap(25)";
        var colormap = get_colormap(this.colormap_string);
        var alpha_c = 0.24;
        var beta_c = 1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["cmatview"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.cmin], [this.cmax], [size_c]);
        model.rpar = new ScilabDouble([alpha_c], [beta_c], ...colon_operator(colormap));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean(true, false);
	    var exprs = new ScilabString([this.colormap_string],[this.cmin],[this.cmax]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMATVIEW\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i);
        if ( this.block_id != undefined){
            this.x.graphics.id.value = this.block_id;
        }
        this.x.graphics.style = new ScilabString(["CMATVIEW"]);
        return new BasicBlock(this.x);
    }

    CMATVIEW.prototype.get = function CMATVIEW() {
        var options = {
            colormap:["ColorMap",this.colormap_string],
            cmin:["Minimum level range",this.cmin],
            cmax:["Maximum level range",this.cmax]
        }
        return options
    }

    CMATVIEW.prototype.set = function CMATVIEW() {

	    var colormap_string_1 = arguments[0]["colormap"];
	    var regex_comma = /[,]+/; // check for commas
	    var regex_char = /[a-zA-Z]/g; //check character
	    var regex_parentheses = /[\])}[{(]/g; // check for brackets
	    var regex_num = /^\d+$/; //check number only
	    if(regex_comma.test(colormap_string_1)){
            alert("Answer given for ColorMap \nis incorrect: Inconsistent column/row dimensions.");
            throw "incorrect";
        }
	    var cmin_1 = parseFloat(arguments[0]["cmin"]);
	    var cmax_1 = parseFloat(arguments[0]["cmax"]);
	    if(cmax_1 <= cmin_1){
            alert("Error with minimum and maximum value");
            throw "incorrect";
        }
        this.cmin = cmin_1;
        this.cmax = cmax_1;
        var size_c = 0;
        var colormap_values = [];
        var chararray = colormap_string_1.match(regex_char);
        if( chararray != null ){
            colormap_values = get_colormap(colormap_string_1);
            if (this.block_id != undefined){
                get_hex_color_code(this.block_id, colormap_values);
            }
            size_c = size(colon_operator(colormap_values),1);
        }else{
            var number = colormap_string_1.trim().replace(regex_parentheses, '');
            if(regex_num.test(number)){
                colormap_values = [parseFloat(number)];
                size_c = 1;
            }
        }
        this.colormap_string = colormap_string_1;
	    var sol_cal_1 = [[this.cmin,1],[this.cmax,1]];
	    var sol_cal_2 = [[1],[(size_c/3)]];
	    var sol = multiply(math.inv(sol_cal_1),sol_cal_2);
        var alpha_c = sol[0];
        var beta_c = sol[1];
        var ipar = new ScilabDouble([this.cmin],[this.cmax],[size_c]);
        var rpar = new ScilabDouble(alpha_c,beta_c,...colon_operator(colormap_values));

	    this.x.model.ipar = ipar;
        this.x.model.rpar = rpar;
	    var exprs = new ScilabString([this.colormap_string],[this.cmin],[this.cmax]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    CMATVIEW.prototype.details = function CMATVIEW() {
        return this.x;
    }
    CMATVIEW.prototype.setID = function CMATVIEW(SetIDForBlock) {
        this.block_id = SetIDForBlock;
    }

    CMATVIEW.prototype.get_popup_title = function CMATVIEW() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }
    CMATVIEW.prototype.getDimensionForDisplay = function CMATVIEW(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
