function MATEIG() {

    MATEIG.prototype.define = function MATEIG() {
        this.function_name = "mat_vps";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([2]);
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATEIG\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATEIG.prototype.details = function MATEIG() {
        return this.x;
    }
    MATEIG.prototype.get = function MATEIG() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
            this.decomptyp = "1"
        }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["decomposition type (1=eig values  2=eig values+eig vectors",this.decomptyp],
        }
        return options
    }
MATEIG.prototype.set = function MATEIG() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){

        if(this.decomptyp == 1){
            this.function_name = "mat_vps"
            this.out = [[-1],[1]]
            this.ot = [[2]]

        }
        else if(this.decomptyp == 2){
            this.function_name = "mat_vpv"
            this.out = [[-1],[-1],[-1],[-1]]
            this.ot = [[2],[2]]
        }
        else{
                    alert("decomposition type is not supported");
                    MATEIG.get();
            }
        this.it = 1
    }
    else if(this.typ == 2){
        if(this.decomptyp == 1){
            this.function_name = "matz_vps"
            this.out = [[-1],[1]]
            this.ot = [[2]]
        }
        else if(this.decomptyp == 2){
            this.function_name = "matz_vpv"
            this.out = [[-1],[-1],[-1],[-1]]
            this.ot = [[2],[2]]
        }
        else{
                    alert("decomposition type is not supported");
                    MATEIG.get();
            }
        this.it = 2
    }
    else{
                alert("Datatype is not supported");
                MATEIG.get();
        }
    this.in = [[-1],[-1]]
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble(...this.out)
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    MATEIG.prototype.get_popup_title = function MATEIG() {
        var set_param_popup_title="Set MATEIG block parameters";
        return set_param_popup_title
    }
    MATEIG.prototype.getDimensionForDisplay = function MATEIG(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
