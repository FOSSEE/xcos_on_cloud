function EVTGEN_f() {

    EVTGEN_f.prototype.define = function EVTGEN_f() {
        this.tt = 0;

        var model = scicos_model();
        model.sim = new ScilabString(["trash"]);
        model.evtout = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([this.tt]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.tt]);
        var n = this.tt.toString();
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTGEN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EVTGEN_f.prototype.details = function EVTGEN_f() {
        return this.x;
    }
    EVTGEN_f.prototype.get = function EVTGEN_f() {
        var options={
            tt:["Event Time",this.tt],
        }
        return options
    }
EVTGEN_f.prototype.set = function EVTGEN_f() {
    this.tt = parseFloat((arguments[0]["tt"]))
    this.x.model.firing = new ScilabDouble([this.tt])
    var exprs = new ScilabString([this.tt])
    this.displayParameter = [this.tt];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
EVTGEN_f.prototype.get_popup_title = function EVTGEN_f() {
        var set_param_popup_title="Set Event time";
        return set_param_popup_title
    }
    EVTGEN_f.prototype.getDimensionForDisplay = function EVTGEN_f(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
