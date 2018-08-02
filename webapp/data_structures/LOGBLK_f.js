function LOGBLK_f() {

    LOGBLK_f.prototype.define = function LOGBLK_f() {
        this.in1 = 1;
        this.a = Math.E;

        var model = scicos_model();
        model.sim = new ScilabString(["logblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble([this.a]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(["%e"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    LOGBLK_f.prototype.details = function LOGBLK_f() {
        return this.x;
    }
    LOGBLK_f.prototype.get = function LOGBLK_f() {
        if(this.a == undefined || this.a == null){
            this.a = Math.E
        }

        var options={
            a:["Basis (>1)",this.a],
        }
        return options
    }
LOGBLK_f.prototype.set = function LOGBLK_f() {
    this.a = parseFloat((arguments[0]["a"]))
    if(this.a<=1){
        alert("Basis must be larger than 1");
        LOGBLK_f.get();
    }
    this.x.model.rpar = new ScilabDouble([this.a]);
    var exprs = new ScilabString([this.a])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
LOGBLK_f.prototype.get_popup_title = function LOGBLK_f() {
        var set_param_popup_title="Set log block parameters";
        return set_param_popup_title
    }
}
