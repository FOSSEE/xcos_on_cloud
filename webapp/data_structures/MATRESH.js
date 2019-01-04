function MATRESH() {

    MATRESH.prototype.define = function MATRESH() {
        this.function_name = "mat_reshape";
        this.funtyp = 4;

        var model = scicos_model();
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

        var label = new ScilabString([sci2exp(1)], [sci2exp([1, 1])], [sci2exp([1, 1])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATRESH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATRESH.prototype.details = function MATRESH() {
        return this.x;
    }
    MATRESH.prototype.get = function MATRESH() {
    if(this.typ == undefined || this.typ == null){
        this.typ = "1"
        this.l1 = "1 1"
        this.out = "1 1"
    }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ.toString().replace(/,/g," ")],
            l1:["input size",this.l1.toString().replace(/,/g," ")],
            out:["output size desire",this.out.toString().replace(/,/g," ")]
        }
        return options
    }
MATRESH.prototype.set = function MATRESH() {
    this.typ = inverse(arguments[0]["typ"])
    this.l1 = inverse(arguments[0]["l1"])
    this.out = inverse(arguments[0]["out"])
    this.nout = size(this.out)
    this.nin = size(this.l1)
    var so1=size(this.out,1);
    var so2=size(this.out,2);
    var si1=size(this.l1,1);
    var si2=size(this.l1,2);
    if(so1*so2==0){
                alert("output must have at least one element");
                MATRESH.get();
    }
            if(si1*si2==0){
                alert("input must have at least one element");
                MATRESH.get();
            }
    if(size(this.l1,1)>1){
    if(this.out[0].length>(this.l1[0].length*this.l1[1].length)){
                    alert("the first dimension of the output is too big");
                    MATRESH.get();
    }
            if(size(this.out,1)>1){
                if(this.out[1].length>(this.l1[0].length*this.l1[1].length)){
                    alert("the second dimension of the output is too big");
                    MATRESH.get();
                }
                if((this.out[1].length*this.out[0].length)>(this.l1[0].length*this.l1[1].length)){
                    alert("the dimensions of the output are too big");
                    MATRESH.get();
                }
            }
    }
    if(this.typ == 1){
        this.function_name = "mat_reshape"
        this.ot = 1
        this.it = 1
    }
    else if(this.typ == 2){
        this.function_name = "matz_reshape"
        this.ot = 2
        this.it = 2

    }
    else{
                alert("Datatype is not supported");
                MATRESH.get();
        }
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble([this.ot])
    var io = set_io(this.x.model,this.x.graphics,this.l1,this.out,[],[])
    this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]))
    var exprs = new ScilabString([this.typ.toString().replace(/,/g, " ")],[this.l1.toString().replace(/,/g, " ")],[this.out.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    MATRESH.prototype.get_popup_title = function MATRESH() {
        var set_param_popup_title="Set MATRESH block parameters";
        return set_param_popup_title
    }
    MATRESH.prototype.getDimensionForDisplay = function MATRESH(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
