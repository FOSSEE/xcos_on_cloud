function TKSCALE() {

    TKSCALE.prototype.define = function TKSCALE() {
        this.a = -10;
        this.b = 10;
        this.f = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["tkscaleblk"]), new ScilabDouble([5]));
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.a], [this.b], [this.f]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.a)], [sci2exp(this.b)], [sci2exp(this.f)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TKSCALE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TKSCALE.prototype.details = function TKSCALE() {
        return this.x;
    }
    TKSCALE.prototype.get = function TKSCALE() {
        var options={
            a:["Min Value",this.a],
            b:["Max Value",this.b],
            f:["Normalisation",this.f]
        }
        return options
    }
TKSCALE.prototype.set = function TKSCALE() {
    this.a = parseFloat((arguments[0]["a"]))
    this.b = parseFloat((arguments[0]["b"]))
    this.f = parseFloat((arguments[0]["f"]))
    this.x.model.rpar = new ScilabDouble([this.a],[this.b],[this.f])
    var exprs = new ScilabString([sci2exp(this.a)], [sci2exp(this.b)], [sci2exp(this.f)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    TKSCALE.prototype.get_popup_title = function TKSCALE() {
        var set_param_popup_title="Set scale block parameters";
        return set_param_popup_title
    }
}
