function MATSUM() {

    MATSUM.prototype.define = function MATSUM() {
        this.function_name = "mat_sum";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
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

        var label = new ScilabString([sci2exp(1)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATSUM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATSUM.prototype.details = function MATSUM() {
        return this.x;
    }
    MATSUM.prototype.get = function MATSUM() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.decomptyp = "0"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["Sum along (0=all 1=lines  2=Columns)",this.decomptyp],
        }
        return options
    }
MATSUM.prototype.set = function MATSUM() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){
        if(this.decomptyp == 0){
            this.function_name = "mat_sum"
            this.out = [[1],[1]]
        }
        else if(this.decomptyp == 1){
            this.function_name = "mat_sumc"
            this.out = [[1],[-2]]

        }
        else if(this.decomptyp == 2){
            this.function_name = "mat_suml"
            this.out = [[-1],[1]]
        }
        else{
                    alert("decomposition type is not supported");
                    MATSUM.get();
            }
        this.it = 1
        this.ot = 1
    }
    else if(this.typ == 2){
        if(this.decomptyp == 0){
            this.function_name = "matz_sum"
            this.out = [[1],[1]]

        }
        else if(this.decomptyp == 1){
            this.function_name = "matz_sumc"
            this.out = [[1],[-2]]

        }
        else if(this.decomptyp == 2){
            this.function_name = "matz_suml"
            this.out = [[-1],[1]]

        }
        else{
                    alert("decomposition type is not supported");
                    MATSUM.get();
            }
        this.it = 2
        this.ot = 2
    }
    else{
        alert("Datatype is not supported");
        MATSUM.get();
    }
    this.in = [parseFloat(getData(this.x.model.in)),parseFloat(getData(this.x.model.in2)) ]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    this.x.graphics.exprs = label
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    MATSUM.prototype.get_popup_title = function MATSUM() {
        var set_param_popup_title="Set MATSUM block parameters";
        return set_param_popup_title
    }

}
