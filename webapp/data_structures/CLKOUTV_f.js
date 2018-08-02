function CLKOUTV_f() {

    CLKOUTV_f.prototype.define = function CLKOUTV_f() {

        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.prt]);
        var n = this.prt.toString();
        this.displayParameter=[n];
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, new ScilabString([" "]));
        return new EventOutBlock(this.x);
    }

    CLKOUTV_f.prototype.internal = function CLKOUTV_f() {

        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);
        model.outtyp = new ScilabDouble();
        var exprs = new ScilabString([this.prt]);
        var block = new standard_define(new ScilabDouble([1, 1]), model, exprs, new ScilabString([" "]));
        block.graphics.gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),&quot;CLKOUTV_f&quot;,sz(1),sz(2));"]), new ScilabDouble([8]));
        block.graphics.style = new ScilabString(["CLKOUTV_f"]);
        return block;
    }

    CLKOUTV_f.prototype.details = function CLKOUTV_f() {
        return this.x;
    }
CLKOUTV_f.prototype.get = function CLKOUTV_f() {
        var options={
            prt:["Port number",this.prt],
        }
        return options
    }
CLKOUTV_f.prototype.set = function CLKOUTV_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    if(this.prt<=0){
        alert("Wrong value for 'Port Number' parameter: "+this.prt+"\nStrictly positive integer expected.");
        CLKOUTV_f.get();
    }
    this.x.model.ipar = new ScilabDouble([this.prt]);
    this.x.model.evtin = new ScilabDouble([1]);
    var exprs = new ScilabString([this.prt])
    this.displayParameter = [this.prt];
    this.x.graphics.exprs=exprs
    return new EventOutBlock(this.x)
    }

    CLKOUTV_f.prototype.get_popup_title = function CLKOUTV_f() {
        var set_param_popup_title="Set CLKOUTV_f block parameters";
        return set_param_popup_title
    }

}
