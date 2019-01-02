function MATZREIM() {
    MATZREIM.prototype.define = function MATZREIM() {
        var model = scicos_model();

        this.function_name = "matz_reim";
        this.funtyp = new ScilabDouble([4]);
        model.sim = list(this.function_name, this.funtyp);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([2]);
        model.out = new ScilabDouble(-1, -1);
        model.out2 = new ScilabDouble(-2, -2);
        model.outtyp = new ScilabDouble([1,1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true,false]);

        this.label = sci2exp(new ScilabDouble(1));

        var gr_i = ["xstringb(orig(1),orig(2),\"MATZREIM\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([3,2]), model, this.label, gr_i);
        return new BasicBlock(this.x);
    }

    MATZREIM.prototype.details = function MATZREIM() {
        return this.x;
    }
    MATZREIM.prototype.get = function MATZREIM() {
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "1"
    }
        var options={
            decomptyp:["decomposition type (1=Complex2Real&Imag 2=Real&Imag2Complex)",this.decomptyp],
        }
        return options
    }
MATZREIM.prototype.set = function MATZREIM() {
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.decomptyp == 1){
        this.function_name = "matz_reim"
        this.in = [[-1],[-2]]
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([1],[1])
        this.out = [[-1],[-2],[-1],[-2]]
    }
    else if(this.decomptyp == 2){
        this.function_name = "matz_reimc"
        this.in = [[-1],[-2],[-1],[-2]]
        this.x.model.intyp = new ScilabDouble([1],[1])
        this.x.model.outtyp = new ScilabDouble([2])
        this.out = [[-1],[-2]]
    }
    else
    {
        alert("decomposition type is not supported");
        MATZREIM.get();
    }
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    MATZREIM.prototype.get_popup_title = function MATTRAN() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    MATZREIM.prototype.getDimensionForDisplay = function MATZREIM(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
