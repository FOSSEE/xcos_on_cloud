function MATEXPM() {

    MATEXPM.prototype.define = function MATEXPM() {
        this.function_name = "mat_expm";
        this.funtyp = 4;
        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATEXPM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATEXPM.prototype.details = function MATEXPM() {
        return this.x;
    }
    MATEXPM.prototype.get = function MATEXPM() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
MATEXPM.prototype.set = function MATEXPM() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_expm"
    }
    else if(this.typ == 2){
        this.function_name = "matz_expm"
    }
    else{
                alert("Datatype is not supported");
                MATEXPM.get();
        }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

MATEXPM.prototype.get_popup_title = function MATEXPM() {
        var set_param_popup_title="Set EXPM Block";
        return set_param_popup_title
    }
}
