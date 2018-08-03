function GENSQR_f () {

    GENSQR_f.prototype.define = function GENSQR_f() {
        this.Amplitude = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["gensqr"]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.Amplitude]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.Amplitude]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GENSQR_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

GENSQR_f.prototype.get = function GENSQR_f() {

    var options={
        Amplitude:["Amplitude",this.Amplitude.toString().replace(/,/g, " ")],
    };
    return options;
    }

GENSQR_f.prototype.set = function GENSQR_f() {

    this.Amplitude = parseFloat(arguments[0]["Amplitude"]);
    var exprs = new ScilabString([this.Amplitude]);
    this.x.model.out2=1;
    this.x.model.dstate=new ScilabDouble([this.Amplitude]);
    this.x.model.outtyp=1;
    this.x.graphics.exprs = exprs;
    return new BasicBlock(this.x);
    }
    GENSQR_f.prototype.details = function GENSQR_f() {
        return this.x;
    }

    GENSQR_f.prototype.get_popup_title = function GENSQR_f() {
        var set_param_popup_title="Set Square generator block parameters";
        return set_param_popup_title
    }
}
