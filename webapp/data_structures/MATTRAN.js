function MATTRAN() {

    MATTRAN.prototype.define = function MATTRAN() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["mattran_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATTRAN\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATTRAN.prototype.details = function MATTRAN() {
        return this.x;
    }
    MATTRAN.prototype.get = function MATTRAN() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.rule = "1"
    }
        var options={
            typ:["Datatype(1=real double 2=Complex)",this.typ],
            rule:["rule (1=.'' 2='')",this.rule],
        }
        return options
    }
MATTRAN.prototype.set = function MATTRAN() {

    this.typ = parseFloat((arguments[0]["typ"]))
    this.rule = parseFloat((arguments[0]["rule"]))
    if(this.typ == 1){
        this.function_name = "mattran_m"
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
    }

    else if(this.typ == 2){
        if(this.rule==1)
            this.function_name = "matztran_m"
        else
            this.function_name = "mathermit_m"
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([2])
    }
    else{
                alert("Datatype is not supported");
                MATTRAN.get();
        }
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ],[this.rule])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

MATTRAN.prototype.get_popup_title = function MATTRAN() {
        var set_param_popup_title="Set MATTRAN block";
        return set_param_popup_title
    }

}
