function CURVE_c() {

    CURVE_c.prototype.define = function CURVE_c() {
        this.xx = [0,1,2];
	    this.yy = [10,20,-30];
	    this.N = 3;
	    this.Method = 3;
	    this.PeriodicOption = "y";
	    this.graf = "n";
        var model = scicos_model();
        model.sim = list(new ScilabString(["curve_c"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(this.xx, this.yy);
        model.ipar = new ScilabDouble(this.N, this.Method, [1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,true]);
        model.evtin =  new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.firing = new ScilabDouble([0]);
        var gr_i = [];
        var exprs = new ScilabString([this.Method], [sci2exp(this.xx)],[sci2exp(this.yy)], [this.PeriodicOption], [this.graf]);
        var block = new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);
        block.graphics.style = new ScilabString(["CURVE_c"]);
        block.graphics.in_style = new ScilabString([""]);
        block.graphics.in_label = new ScilabString([""]);
        return block;

    }

}
