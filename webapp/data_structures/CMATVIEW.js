function CMATVIEW () {

    CMATVIEW.prototype.define = function CMATVIEW() {
	//Commented code was previously present before I made my changes
	this.cmin = 0;
        this.cmax = 100;
        this.size_c = 25;
        this.colormap = jetcolormap(this.size_c)
        this.alpha_c = 0.24;
        this.beta_c = 1;
        var model = scicos_model()
        model.sim = list(new ScilabString(["cmatview"]), new ScilabDouble([4]))
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.cmin], [this.cmax], [this.size_c])
        model.rpar = new ScilabDouble([this.alpha_c], [this.beta_c], ...colon_operator(this.colormap))
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean(true, false)
	var exprs = new ScilabString(["jetcolormap("+this.size_c+")"],[this.cmin],[this.cmax]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMATVIEW\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
        this.x.graphics.style = new ScilabString(["CMATVIEW"]);
        return new BasicBlock(this.x);
    }

    CMATVIEW.prototype.get = function CMATVIEW() {
        var options={
            size_c:["size of ColorMap",[this.size_c]],
            cmin:["Minimum level range",this.cmin],
            cmax:["Maximum level range",this.cmax]
        }
        return options
    }

    CMATVIEW.prototype.set = function CMATVIEW() {
	this.size_c = parseFloat(arguments[0]["size_c"]);
	this.colormap = jetcolormap(this.size_c);
	//this.colormap = jetcolormap(parseFloat(arguments[0]["colormap"]));
	// We are giving jetcolormap by default but it should give options to user to use hotcolormap() and graycolormap(). The same needs to be reflected in exprs variable in define and set function code. Functions for hotcolormap() and graycolormap() needs to be written in details.js

        this.cmin= parseFloat(arguments[0]["cmin"]);
        this.cmax= parseFloat(arguments[0]["cmax"]);
        if(this.cmax<=this.cmin){
                alert("Error with minimum and maximum value");
                CMATVIEW.get();
        }
	//New code till line break reflects the .sci file of cmatview. Alpha and Beta can have varying values.
	//this.alpha_c = 0.24;
        //this.beta_c = 1;
	//var ipar = new ScilabDouble([this.cmax],[this.cmin],[this.size_c])
        //var rpar = new ScilabDouble([this.alpha_c],[this.beta_c],...colon_operator(this.colormap))
	this.totalcolors = size(colon_operator(this.colormap),1)
	this.sol = [[this.cmin,1],[this.cmax,1]];
	this.b = [[1],[(this.totalcolors/3)]];
	this.sol = multiply(math.inv(this.sol),this.b); //new function has been written in details.js
        this.alpha_c = this.sol[0];
        this.beta_c = this.sol[1];
        var ipar = new ScilabDouble([this.cmin],[this.cmax],[this.totalcolors])
        var rpar = new ScilabDouble(this.alpha_c,this.beta_c,...colon_operator(this.colormap))

	this.x.model.ipar = ipar
        this.x.model.rpar = rpar
	var exprs = new ScilabString(["jetcolormap("+this.size_c+")"],[this.cmin],[this.cmax]);
	//var exprs = new ScilabString([this.size_c],[this.cmin],[this.cmax]);
        this.x.graphics.exprs=exprs
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
        var dimension = [40,40];
        return dimension
    }
}
