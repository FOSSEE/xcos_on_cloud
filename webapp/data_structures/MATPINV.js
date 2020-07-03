function MATPINV() {

    MATPINV.prototype.define = function MATPINV() {
        this.function_name = "mat_pinv";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-2]);
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATPINV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATPINV.prototype.details = function MATPINV() {
        return this.x;
    }
    MATPINV.prototype.get = function MATPINV() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
    MATPINV.prototype.set = function MATPINV() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_pinv"
        this.ot = 1
        this.it = 1
    }
    else if(this.typ == 2){
        this.function_name = "matz_pinv"
        this.ot = 2
        this.it = 2
    }
    else{
                alert("Datatype is not supported");
                throw "incorrect";
        }
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble([this.ot])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    MATPINV.prototype.get_popup_title = function MATPINV() {
        var set_param_popup_title="Set MATPINV block";
        return set_param_popup_title
    }
    MATPINV.prototype.getDimensionForDisplay = function MATPINV(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
