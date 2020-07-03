function CUMSUM() {

    CUMSUM.prototype.define = function CUMSUM() {
        var model = scicos_model();

        this.function_name = "cumsum_m";
        this.funtyp = 4;

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

        var label = new ScilabString([sci2exp(1)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CUMSUM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    CUMSUM.prototype.details = function CUMSUM() {
        return this.x;
    }
    CUMSUM.prototype.get = function CUMSUM() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
    }
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "0"
    }

        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["Sum along (0=the first non singleton dimension  1=Rows  2=Columns)",this.decomptyp],
        }
        return options
    }
    CUMSUM.prototype.set = function CUMSUM() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){
        if(this.decomptyp == 0){
            this.function_name = "cumsum_m"
            this.out = [-1,-2]
        }
        else if(this.decomptyp == 1){
            this.function_name = "cumsum_r"
            this.out = [-1,1]
        }
        else if(this.decomptyp == 2){
            this.function_name = "cumsum_c"
            this.out = [1,-2]
        }
        else{
                    alert("decomposition type is not supported");
                    throw "incorrect";
            }
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
    }
    else if(this.typ == 2){
        if(this.decomptyp == 0){
            this.function_name = "cumsumz_m"

        }
        else if(this.decomptyp == 1){
            this.function_name = "cumsumz_r"

        }
        else if(this.decomptyp == 2){
            this.function_name = "cumsumz_c"
        }
        else{
                    alert("decomposition type is not supported");
                    throw "incorrect";
            }
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([2])

    }
    else{
                alert("Datatype is not supported");
                throw "incorrect";
        }
    this.in = [parseFloat(getData(this.x.model.in)),parseFloat(getData(this.x.model.in2))]
    this.out = [parseFloat(getData(this.x.model.out)),parseFloat(getData(this.x.model.out2))]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    CUMSUM.prototype.get_popup_title = function CUMSUM() {
        var set_param_popup_title="Set CUMSUM block parameters";
        return set_param_popup_title
    }
    CUMSUM.prototype.getDimensionForDisplay = function CUMSUM(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
