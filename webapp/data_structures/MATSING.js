function MATSING() {

    MATSING.prototype.define = function MATSING() {
        var model = scicos_model();

        this.function_name = "mat_sing";
        this.funtyp = 4;

        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATSING\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    MATSING.prototype.details = function MATSING() {
        return this.x;
    }
    MATSING.prototype.get = function MATSING() {
        if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.decomptyp = "1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
            decomptyp:["decomposition type (1=singular values  2=sing values+matrix U & V)",this.decomptyp],
        }
        return options
    }
    MATSING.prototype.set = function MATSING() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.decomptyp = parseFloat((arguments[0]["decomptyp"]))
    if(this.typ == 1){

        if(this.decomptyp == 1){
            this.function_name = "mat_sing"
            this.in = [[-1],[-2]]
            this.out = [[-1],[1]]
            this.ot = [[1]]
        }
        else if(this.decomptyp == 2){
            this.function_name = "mat_svd"
            this.in = [[-1],[-2]]
            this.out = [[-1],[-1],[-2],[-1],[-2],[-2]]
            this.ot = [[1],[1],[1]]

        }
        else{
                    alert("decomposition type is not supported");
                    throw "incorrect";
            }
        this.it = 1
    }
    else if(this.typ == 2){

        if(this.decomptyp == 1){
            this.function_name = "matz_sing"
            this.in = [[-1],[-2]]
            this.out = [[-1],[1]]
            this.ot = [[1]]

        }
        else if(this.decomptyp == 2){
            this.function_name = "matz_svd"
            this.in = [[-1],[-2]]
            this.out = [[-1],[-1],[-2],[-1],[-2],[-2]]
            this.ot = [[2],[1],[2]]

        }
        else{
                    alert("decomposition type is not supported");
                    throw "incorrect";
            }
        this.it = 2
    }
    else{
                alert("Datatype is not supported");
                throw "incorrect";
        }
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble(...this.ot)
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ],[this.decomptyp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    MATSING.prototype.get_popup_title = function MATSING() {
        var set_param_popup_title="Set MATSVD block parameters";
        return set_param_popup_title
    }
    MATSING.prototype.getDimensionForDisplay = function MATSING(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
