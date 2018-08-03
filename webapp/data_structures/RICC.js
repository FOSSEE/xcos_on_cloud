function RICC() {

    RICC.prototype.define = function RICC() {
        this.function_name = "ricc_m";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-1], [-1]);
        model.in2 = new ScilabDouble([-1], [-1], [-1]);
        model.intyp = new ScilabDouble([1, 1, 1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RICC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    RICC.prototype.details = function RICC() {
        return this.x;
    }
    RICC.prototype.get = function RICC() {
    if(this.tpe == undefined || this.tpe == null){
        this.tpe = "1"
        this.mod = "1"
    }
    var options={
        tpe:["Type (1=Cont  2=Disc)",this.tpe],
        mod:["Model(1=Schr  2=sign(cont) inv(disc))",this.mod],
    }
    return options
    }
RICC.prototype.set = function RICC() {
    this.tpe = parseFloat((arguments[0]["tpe"]))
    this.mod = parseFloat((arguments[0]["mod"]))
    this.x.model.intyp = new ScilabDouble([1],[1],[1])
    this.x.model.outtyp = new ScilabDouble([1])
    this.x.model.ipar = new ScilabDouble([this.tpe],[this.mod])
    var exprs = new ScilabString([this.tpe],[this.mod])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
RICC.prototype.get_popup_title = function RICC() {
        var set_param_popup_title="Set RICC block";
        return set_param_popup_title
    }


}
