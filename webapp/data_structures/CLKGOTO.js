function CLKGOTO() {

    CLKGOTO.prototype.define = function CLKGOTO() {
        this.tag = "A";
        this.tagvis = sci2exp(1);
        var model = scicos_model();
        model.sim = new ScilabString(["clkgoto"]);
        model.evtin = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.ipar = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);
        this.displayParameter = ["A"];

        var exprs = new ScilabString(["A"], [sci2exp(1)]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, new ScilabString([" "]));
        this.x.graphics.id = new ScilabString(["Goto"]);
        return new BasicBlock(this.x);
    }

    CLKGOTO.prototype.details = function CLKGOTO() {
        return this.x;
    }
CLKGOTO.prototype.get = function CLKGOTO() {
        var options={
            tag:["Tag",this.tag],
            tagvis:["Tag Visibility (1=Local 2=Scoped 3=Global)",this.tagvis],
        }
        return options
    }
CLKGOTO.prototype.set = function CLKGOTO() {
    this.tag = arguments[0]["tag"]
    this.tagvis = parseFloat((arguments[0]["tagvis"]))
    msg = "";
    if (this.tagvis>3||this.tagvis<1){
        msg = "Tag Visibility must be between 1 and 3";
    if (msg.length)
    alert(msg);
    CLKGOTO.get();
    }
    this.x.model.opar = list(new ScilabString(this.tag))
    this.x.model.ipar = new ScilabDouble([this.tagvis]);
    this.x.model.evtin = new ScilabDouble([1]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.tag],[sci2exp(this.tagvis)])
    this.displayParameter = [this.tag];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    CLKGOTO.prototype.get_popup_title = function CLKGOTO() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
}
