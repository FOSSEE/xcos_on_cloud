function MFCLCK_f() {

    MFCLCK_f.prototype.define = function MFCLCK_f() {
        this.nn = 2;
        this.dt = 0.1;

        var model = scicos_model();
        model.sim = new ScilabString(["mfclck"]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1], [1]);
        model.dstate = new ScilabDouble([0]);
        model.rpar = new ScilabDouble([this.dt]);
        model.ipar = new ScilabDouble([this.nn]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1], [0]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.dt], [this.nn]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MFCLCK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MFCLCK_f.prototype.internal = function MFCLCK_f() {
        this.nn = 2;
        this.dt = 0.1;

        var model = scicos_model();
        model.sim = new ScilabString(["mfclck"]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1], [1]);
        model.dstate = new ScilabDouble([0]);
        model.rpar = new ScilabDouble([this.dt]);
        model.ipar = new ScilabDouble([this.nn]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1], [0]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.outtyp = new ScilabDouble();

        var exprs = new ScilabString([this.dt], [this.nn]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MFCLCK_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["MFCLCK_f"]);
        return block;
    }
    MFCLCK_f.prototype.get = function MFCLCK_f() {
        var options={
            dt:["Basic Period (1/f)",this.dt],
	    nn:["Multiply by (n)" ,this.nn],
        }
        return options
    }
    MFCLCK_f.prototype.set = function MFCLCK_f() {
	    this.dt = parseFloat((arguments[0]["dt"]))
	    this.nn = parseFloat((arguments[0]["nn"]))
	    return new BasicBlock(this.x)
    }
    MFCLCK_f.prototype.details = function MFCLCK_f() {
        return this.x;
    }
    MFCLCK_f.prototype.get_popup_title = function MFCLCK_f() {
        var set_param_popup_title="Set Multifrequency clock parameters";
        return set_param_popup_title
    }
}
