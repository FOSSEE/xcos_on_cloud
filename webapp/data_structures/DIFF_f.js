function DIFF_f() {

    DIFF_f.prototype.define = function DIFF_f() {
        this.x0 = [[0], [0]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["diffblk"]), new ScilabDouble([10001]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.state = new ScilabDouble(...this.x0);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([sci2exp(this.x0[0])], [sci2exp(this.x0[1])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DIFF_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DIFF_f.prototype.details = function DIFF_f() {
        return this.x;
    }
    DIFF_f.prototype.get = function DIFF_f() {
    if(this.x0 == undefined || this.x0 == null){
        this.x0 = "1"
    }
    if(this.xd0 == undefined || this.xd0 == null){
        this.xd0 = "1"
    }

        var options={
            x0:["Initial state",this.x0],
            xd0:["Initial Derivative",this.xd0],
        }
        return options
    }
DIFF_f.prototype.set = function DIFF_f() {
    this.x0 = parseFloat((arguments[0]["x0"]))
    this.xd0 = parseFloat((arguments[0]["xd0"]))
    this.x.model.state = new ScilabDouble([this.x0],[this.xd0])
    var exprs = new ScilabString([this.x0],[this.xd0])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

DIFF_f.prototype.get_popup_title = function DIFF_f() {
        var set_param_popup_title="Set continuous linear system parameters";
        return set_param_popup_title
    }
    DIFF_f.prototype.getDimensionForDisplay = function DIFF_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
