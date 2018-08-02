function EXTTRI() {

    EXTTRI.prototype.define = function EXTTRI() {
        this.function_name = "extrilz";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
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

        var label = new ScilabString([sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTTRI\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    EXTTRI.prototype.details = function EXTTRI() {
        return this.x;
    }
    EXTTRI.prototype.get = function EXTTRI() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["extraction type (1=lower  2=upper  3=diagonal)",this.decomptyp],
        }
        return options
    }
EXTTRI.prototype.set = function EXTTRI() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){
        if(this.decomptyp == 1){
            this.function_name = "exttril"
        }
        else if(this.decomptyp == 2){
            this.function_name = "exttriu"

        }
        else if(this.decomptyp == 3){
            this.function_name = "extdiag"
        }
        else{
                    alert("decomposition type is not supported");
                    EXTTRI.get();
            }
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
    }
    else if(this.typ == 2){
        if(this.decomptyp == 1){
            this.function_name = "exttrilz"
        }
        else if(this.decomptyp == 2){
            this.function_name = "exttriuz"

        }
        else if(this.decomptyp == 3){
            this.function_name = "extdiagz"
        }
        else{
                    alert("decomposition type is not supported");
                    EXTTRI.get();
            }
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([2])
    }
    else{
                alert("Datatype is not supported");
                EXTTRI.get();
        }
    model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    EXTTRI.prototype.get_popup_title = function EXTTRI() {
        var set_param_popup_title="Set EXTTRI block parameters";
        return set_param_popup_title
    }

}
