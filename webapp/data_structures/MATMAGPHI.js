function MATMAGPHI() {

    MATMAGPHI.prototype.define = function MATMAGPHI() {
        this.function_name = "matz_abs";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([2]);
        model.out = new ScilabDouble([-1], [-1]);
        model.out2 = new ScilabDouble([-2], [-2]);
        model.outtyp = new ScilabDouble([1, 1]);
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATMAGPHI\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATMAGPHI.prototype.details = function MATMAGPHI() {
        return this.x;
    }
    MATMAGPHI.prototype.get = function MATMAGPHI() {
    if(this.decomptyp == undefined || this.decomptyp == null){
        this.decomptyp = "1"
    }
        var options={
            decomptyp:["decomposition type (1=Complex2Real&Imag 2=Real&Imag2Complex)",this.decomptyp],
        }
        return options
    }
MATMAGPHI.prototype.set = function MATMAGPHI() {
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.decomptyp == 1){
        this.function_name = "matz_abs"
        this.in = [[-1],[-2]]
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([1],[1])
        this.out = [[-1],[-1],[-2],[-2]]
    }
    else if(this.decomptyp == 2){
        this.function_name = "matz_absc"
        this.in = [[-1],[-1],[-2],[-2]]
        this.x.model.intyp = new ScilabDouble([2])
        this.x.model.outtyp = new ScilabDouble([1],[1])
        this.out = [[-1],[-2]]
    }
    else{
                alert("decomposition type is not supported");
                MATMAGPHI.get();
        }
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    MATMAGPHI.prototype.get_popup_title = function MATMAGPHI() {
        var set_param_popup_title="Set MATMAGPHI block parameters";
        return set_param_popup_title
    }
}
