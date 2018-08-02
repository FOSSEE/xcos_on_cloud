function EXPBLK_m() {

    EXPBLK_m.prototype.define = function EXPBLK_m() {
        this.in1 = 1;
        this.a = math.E;

        var model = scicos_model();
        model.sim = list(new ScilabString(["expblk_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.a]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(["%e"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXPBLK_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EXPBLK_m.prototype.details = function EXPBLK_m() {
        return this.x;
    }
    EXPBLK_m.prototype.get = function EXPBLK_m() {
    if(this.a == undefined || this.a == null){
        this.a = Math.E
    }
        var options={
            a:["a (>0)",this.a],
        }
        return options
    }
    EXPBLK_m.prototype.set = function EXPBLK_m() {
    this.a = parseFloat((arguments[0]["a"]))
    if(this.a<=0){
        alert("a^u : a must be positive");
    }
    this.x.model.rpar = new ScilabDouble([this.a]);
    var exprs = new ScilabString([this.a])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    EXPBLK_m.prototype.get_popup_title = function EXPBLK_m() {
        var set_param_popup_title="Set a^u  block parameters";
        return set_param_popup_title
    }
}
