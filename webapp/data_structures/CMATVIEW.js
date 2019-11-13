function CMATVIEW () {

    CMATVIEW.prototype.define = function CMATVIEW() {
	    this.cmin = 0;
        this.cmax = 100;
        this.size_c = 25;
        this.colormap = jetcolormap(this.size_c); //values are not same as desktop so might be changed to different method
        this.colormap_string = "jetcolormap(25)";
        this.alpha_c = 0.24;
        this.beta_c = 1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["cmatview"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.cmin], [this.cmax], [this.size_c]);
        model.rpar = new ScilabDouble([this.alpha_c], [this.beta_c], ...colon_operator(this.colormap));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean(true, false);
	    var exprs = new ScilabString([this.colormap_string],[this.cmin],[this.cmax]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMATVIEW\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i);
        this.x.graphics.style = new ScilabString(["CMATVIEW"]);
        return new BasicBlock(this.x);
    }

    CMATVIEW.prototype.get = function CMATVIEW() {
        var options = {
            size_c:["ColorMap",this.colormap_string],
            cmin:["Minimum level range",this.cmin],
            cmax:["Maximum level range",this.cmax]
        }
        return options
    }

    CMATVIEW.prototype.set = function CMATVIEW() {

	    var colormap_string_1 = arguments[0]["size_c"];
	    var regex_comma = /[,]+/;
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
	    this.totalcolors = size(colon_operator(this.colormap),1);
	    var sol_cal_1 = [[this.cmin,1],[this.cmax,1]];
	    var sol_cal_2 = [[1],[(this.totalcolors/3)]];
	    var sol = multiply(math.inv(sol_cal_1),sol_cal_2);
        this.alpha_c = sol[0];
        this.beta_c = sol[1];
        var ipar = new ScilabDouble([this.cmin],[this.cmax],[this.totalcolors]);
        var rpar = new ScilabDouble(this.alpha_c,this.beta_c,...colon_operator(this.colormap));

	    this.x.model.ipar = ipar;
        this.x.model.rpar = rpar;
	    var exprs = new ScilabString(["jetcolormap("+this.size_c+")"],[this.cmin],[this.cmax]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    CMATVIEW.prototype.details = function CMATVIEW() {
        return this.x;
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
