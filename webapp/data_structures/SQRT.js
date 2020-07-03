function SQRT() {

    SQRT.prototype.define = function SQRT() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["mat_sqrt"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SQRT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    SQRT.prototype.details = function SQRT() {
        return this.x;
    }
    SQRT.prototype.get = function SQRT() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
    SQRT.prototype.set = function SQRT() {
    this.typ = parseFloat((arguments[0]["typ"]))
    if(this.typ == 1){
        this.function_name = "mat_sqrt"
    }else if(this.typ == 2){
        this.function_name = "matz_sqrt"
    }
    else
    {
        alert("type is not supported");
        throw "incorrect";
    }
    this.x.model.intyp = new ScilabDouble([this.typ])
    this.x.model.outyp = new ScilabDouble([this.typ])
    this.in = [getData(this.x.model.in),getData(this.x.model.in2)]
    this.out = [getData(this.x.model.out),getData(this.x.model.out2)]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    SQRT.prototype.get_popup_title = function SQRT() {
        var set_param_popup_title="Set SQRT Block";
        return set_param_popup_title
    }
    SQRT.prototype.getDimensionForDisplay = function SQRT(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
