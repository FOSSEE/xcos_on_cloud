function SUBMAT() {

    SUBMAT.prototype.define = function SUBMAT() {
	this.typ="1";
        this.a="1";
        this.b="1";
        this.c="1";
        this.d="1";
        this.inp=[[1],[1]];
        var model = scicos_model();

        this.function_name = new ScilabString(["submat"]);

        this.funtyp = new ScilabDouble([4]);
        model.sim = list(this.function_name, this.funtyp);
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
        model.ipar = new ScilabDouble([1], [1], [1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);
	//var exprs = new ScilabString([this.typ],[this.a],[this.b],[this.c],[this.d],[sci2exp(this.inp)]);
        this.label = new ScilabString([sci2exp(1)], [sci2exp(1)], [sci2exp(1)], [sci2exp(1)], [sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SUBMAT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2.5, 2]), model, this.label, gr_i);

        return new BasicBlock(this.x);

    }
    SUBMAT.prototype.details = function SUBMAT() {
        return this.x;

    }
    SUBMAT.prototype.get = function SUBMAT() {
    if(this.typ == undefined || this.typ == null){
        this.typ="1";
        this.a="1";
        this.b="1";
        this.c="1";
        this.d="1";
        this.inp=[[1],[1]];
    }
        var options={
            typ:["Datatype (1=real double  2=Complex)",this.typ],
            a:["Starting Row Index",this.a],
            b:["Ending Row Index",this.b],
            c:["Starting Column Index",this.c],
            d:["Ending Column Index",this.d],
            inp:["Input Dimensions",sci2exp(this.inp)],//.toString().replace(/,/g, " ")],
        }
        return options
    }
SUBMAT.prototype.set = function SUBMAT() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.a = parseFloat((arguments[0]["a"]))
    this.b = parseFloat((arguments[0]["b"]))
    this.c = parseFloat((arguments[0]["c"]))
    this.d = parseFloat((arguments[0]["d"]))
    this.inp = MatrixInverse((arguments[0]["inp"]))
    if(this.typ == 1){
        this.function_name = "submat"
        this.ot = 1
        this.it = 1
    }
    else if(this.typ == 2){
        this.function_name = "submatz"
        this.ot = 2
        this.it = 2
    }
    else
    {
        alert("Datatype is not supported");
        SUBMAT.get();
    }
    if((this.a<=0)||(this.b<=0)||(this.c<=0)||(this.d<=0)){
                alert("invalid index");
                SUBMAT.get();
    }
            if(this.b<this.a){
                alert("ending row must be greater than starting row");
                SUBMAT.get();
            }
            if(this.d<this.c){
                alert("ending column must be greater than starting column");
                SUBMAT.get();
            }
            /*if(this.b>inp(1) then
                message ("index of ending row is out of range");
                ok=%f;
            end
            if d>inp(2) then
                message ("index of ending column is out of range");
                ok=%f;
            end*/
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble([this.ot])
    this.in = [parseFloat(this.inp[0]),parseFloat(this.inp[1])]
    this.out = [this.b-this.a+1,this.d-this.c+1]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
    this.x.model.ipar = new ScilabDouble([this.a],[this.b],[this.c],[this.d])
    this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]))
    this.x.graphics.exprs = label

    var exprs = new ScilabString([this.typ],[this.a],[this.b],[this.c],[this.d],[sci2exp(this.inp)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
SUBMAT.prototype.get_popup_title = function SUBMAT() {
        var set_param_popup_title="Set SUBMAT Block";
        return set_param_popup_title
    }


}
