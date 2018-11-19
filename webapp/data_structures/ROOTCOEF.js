function ROOTCOEF() {

    ROOTCOEF.prototype.define = function ROOTCOEF() {
        this.function_name = "root_coef";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([1]);
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ROOTCOEF\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    ROOTCOEF.prototype.details = function ROOTCOEF() {
        return this.x;
    }
    ROOTCOEF.prototype.get = function ROOTCOEF() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.inp = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            inp:["input row size",this.inp],
        }
        return options
    }
ROOTCOEF.prototype.set = function ROOTCOEF() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.inp = parseFloat((arguments[0]["inp"]))
    if(this.typ == 1){
        this.function_name = "root_coef"
        this.it = 1
        this.ot = 1
    }else if(this.typ == 2){
        this.function_name = "rootz_coef"
        this.it = 2
        this.ot = 2
    }
    else
    {
        alert("Datatype is not supported");
        ROOTCOEF.get();
    }
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble([this.ot])
    this.in = [this.inp,parseFloat(getData(this.x.model.in2))]
    this.out = [this.inp+1,parseFloat(getData(this.x.model.out2))]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.inp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

     ROOTCOEF.prototype.get_popup_title = function ROOTCOEF() {
        var set_param_popup_title="Set ROOTCOEF block";
        return set_param_popup_title
    }
    ROOTCOEF.prototype.getDimensionForDisplay = function ROOTCOEF(){
        var dimension = [60,40];
        return dimension
    }
}
