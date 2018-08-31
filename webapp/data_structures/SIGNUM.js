function SIGNUM() {

    SIGNUM.prototype.define = function SIGNUM() {
        this.zcr = -1;
        var nu = -1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["signum"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([nu]);
        model.out = new ScilabDouble([nu]);
        model.nzcross = new ScilabDouble([nu]);
        model.nmode = new ScilabDouble([nu]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SIGNUM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SIGNUM.prototype.details = function SIGNUM() {
        return this.x;
    }
    SIGNUM.prototype.get = function SIGNUM() {
    if(this.zcr == undefined || this.zcr == null){
        this.zcr = "1"
    }
        var options={
            zcr:["use zero_crossing (1: yes) (0:no)",this.zcr],
        }
        return options
    }
SIGNUM.prototype.set = function SIGNUM() {
    this.zcr = parseFloat((arguments[0]["zcr"]))
    if(this.zcr != 0){
        this.x.model.nmode = new ScilabDouble([-1]);
        this.x.model.nzcross = new ScilabDouble([-1]);
    }
    else{
        this.x.model.nmode = new ScilabDouble([0]);
        this.x.model.nzcross = new ScilabDouble([0]);
    }
    var exprs = new ScilabString([this.zcr])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
SIGNUM.prototype.get_popup_title = function SIGNUM() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
}
