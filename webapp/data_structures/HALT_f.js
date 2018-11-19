function HALT_f() {

    HALT_f.prototype.define = function HALT_f() {
        this.n = 0;

        var model = scicos_model();
        model.sim = new ScilabString(["hltblk"]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([0]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.n]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"HALT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    HALT_f.prototype.details = function HALT_f() {
        return this.x;
    }
HALT_f.prototype.get = function HALT_f() {
        var options={
            n:["State on halt",this.n],
        }
        return options
    }
HALT_f.prototype.set = function HALT_f() {
    this.n = parseFloat((arguments[0]["n"]))
    this.x.model.ipar = new ScilabDouble([this.n]);
    var exprs = new ScilabString([this.n])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
HALT_f.prototype.get_popup_title = function HALT_f() {
        var set_param_popup_title="Set Halt block parameters";
        return set_param_popup_title
    }
    HALT_f.prototype.getDimensionForDisplay = function HALT_f(){
        var dimension = [40,40];
        return dimension
    }
}
