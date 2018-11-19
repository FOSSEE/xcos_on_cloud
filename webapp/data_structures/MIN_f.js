function MIN_f() {
    MIN_f.prototype.get = function MIN_f() {
        alert("parameters could not be set")
    }
    MIN_f.prototype.define = function MIN_f() {
        this.in1 = -1;

        var model = scicos_model();
        model.sim = new ScilabString(["minblk"]);
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0], [0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MIN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MIN_f.prototype.details = function MIN_f() {
        return this.x;
    }
    MIN_f.prototype.get_popup_title = function MIN_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    MIN_f.prototype.getDimensionForDisplay = function MIN_f(){
        var dimension = [40,40];
        return dimension
    }

}
