function EDGETRIGGER() {

    EDGETRIGGER.prototype.internal = function EDGETRIGGER() {
        this.edge = 1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["edgetrig"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.nzcross = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.edge]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.edge]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;EDGETRIGGER&quot;,sz(1),sz(2));"]);
        var block = standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["EDGETRIGGER"]);
        return block;
    }
EDGETRIGGER.prototype.define = function EDGETRIGGER() {
    this.edge = 1;
    var model = scicos_model()
    model.sim = list(new ScilabString(["edgetrig"]), new ScilabDouble([4]))
    model.in = new ScilabDouble([1]);
    model.out = new ScilabDouble([1]);
    model.dstate = new ScilabDouble([0]);
    model.nzcross = new ScilabDouble([1]);
    model.ipar = new ScilabDouble([sign(this.edge)])
    model.blocktype = new ScilabString(["c"]);
    model.dep_ut = new ScilabBoolean(true, false)
    var exprs = new ScilabString([this.edge])
    var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"EDGETRIGGER\",sz(1),sz(2));"]), new ScilabDouble([8]));
    this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
    return new BasicBlock(this.x);
    }
EDGETRIGGER.prototype.get = function EDGETRIGGER() {
        var options={
            edge:["rising (1), falling (-1), both (0)",this.edge],
        }
        return options
    }
EDGETRIGGER.prototype.set = function EDGETRIGGER() {
    this.edge = parseFloat((arguments[0]["edge"]))
    this.x.model.ipar = new ScilabDouble([sign(this.edge)])
    var exprs = new ScilabString([this.edge])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
EDGETRIGGER.prototype.details = function EDGETRIGGER() {
    return this.x
    }

EDGETRIGGER.prototype.get_popup_title = function EDGETRIGGER() {
        var set_param_popup_title="Set edge trigger block parameters";
        return set_param_popup_title
    }

}
