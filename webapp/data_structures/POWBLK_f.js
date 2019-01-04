function POWBLK_f() {

    POWBLK_f.prototype.define = function POWBLK_f() {
        this.in = 1;
        this.a = 1.5;

        var model = scicos_model();
        model.sim = new ScilabString(["powblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble([this.a]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.a]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"POWBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    POWBLK_f.prototype.details = function POWBLK_f() {
        return this.x;
    }
    POWBLK_f.prototype.get = function POWBLK_f() {
    if(this.a == undefined || this.a == null){
        this.a = "1.5"
    }
        var options={
            a:["to the power of",this.a],
        }
        return options
    }
POWBLK_f.prototype.set = function POWBLK_f() {
    this.a = parseFloat((arguments[0]["a"]))
    if(Number.isInteger(this.a)){
        this.x.model.ipar = new ScilabDouble([this.a])
        this.x.model.rpar = new ScilabDouble()
    }
    else{
        this.x.model.rpar = new ScilabDouble([this.a])
        this.x.model.ipar = new ScilabDouble()
    }
    this.x.model.firing = new ScilabDouble()
    var exprs = new ScilabString([this.a])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
POWBLK_f.prototype.get_popup_title = function POWBLK_f() {
        var set_param_popup_title="Set u^a block parameters";
        return set_param_popup_title
    }
    POWBLK_f.prototype.getDimensionForDisplay = function POWBLK_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
