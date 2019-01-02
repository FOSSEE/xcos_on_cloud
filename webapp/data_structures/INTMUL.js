function INTMUL() {

    INTMUL.prototype.define = function INTMUL() {
        this.sgn = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["matmul_i32"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-2]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.out2 = new ScilabDouble([-3]);
        model.intyp = new ScilabDouble([3, 3]);
        model.outtyp = new ScilabDouble([3]);
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([this.sgn]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTMUL\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTMUL.prototype.details = function INTMUL() {
        return this.x;
    }
    INTMUL.prototype.get = function INTMUL() {
        if(this.Datatype == undefined)
            this.Datatype = 3
        if(this.np == undefined)
            this.np = 0
        var options={
            Datatype:["Data Type (3:int32, 4:int16, 5:int8, ...)",this.Datatype],
            np:["Do on Overflow (0:Nothing, 1:Saturate, 2:Error)",this.np]
        }
        return options
    }
INTMUL.prototype.set = function INTMUL() {
    this.Datatype = parseFloat((arguments[0]["Datatype"]))
    this.np = parseFloat((arguments[0]["np"]))
    this.it = ones(2,1)
    for (var i = this.it.length - 1; i >= 0; i--) {
        this.it[i] = this.Datatype*this.it[i]
    }
    this.ot = this.Datatype
    this.x.model.intyp = new ScilabDouble(...this.it)
    this.x.model.outtyp = new ScilabDouble([this.ot])
    for (var i = this.it.length - 1; i >= 0; i--){
        this.it[i] = this.it[i]*this.Datatype
    }
    this.ot = this.Datatype
    //this.x.model.outtyp = new ScilabDouble([this.ot])
    //this.x.model.intyp = new ScilabDouble(...this.it)
    this.x.model.intyp = new ScilabDouble([3, 3]);
    this.x.model.outtyp = new ScilabDouble([3]);
    if((this.np!=0)&&(this.np!=1)&&(this.np!=2)){
                alert("Wrong value for 'Do on Overflow' parameter: "+this.np+"\nMust be in the interval [0, 2]");
                INTMUL.get();
    }
    else if(this.Datatype == 3){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_i32n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_i32s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i32e"]), new ScilabDouble([4]))

    }
    else if(this.Datatype == 4){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_i16n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_i16s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i16e"]), new ScilabDouble([4]))

    }
    else if(this.Datatype == 5){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_i8n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_i8s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i8e"]), new ScilabDouble([4]))

    }
    else if(this.Datatype == 6){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_ui32n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_ui32s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_ui32e"]), new ScilabDouble([4]))

    }
    else if(this.Datatype == 7){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_ui16n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_ui16s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_i32e"]), new ScilabDouble([4]))

    }
    else if(this.Datatype == 8){
        if(this.np == 0)
            model.sim = list(new ScilabString(["matmul_ui8n"]), new ScilabDouble([4]))
        else if(this.np == 1)
            model.sim = list(new ScilabString(["matmul_ui8s"]), new ScilabDouble([4]))
        else
            model.sim = list(new ScilabString(["matmul_ui8e"]), new ScilabDouble([4]))

    }
    else{
        alert("Wrong value for 'Data Type' parameter: "+this.Datatype+"\nMust be in the interval [3, 8]");
        INTMUL.get();

    }
    this.x.model.ipar = new ScilabDouble([this.np]);
    var exprs = new ScilabString([sci2exp(this.Datatype)],[sci2exp(this.np)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    INTMUL.prototype.get_popup_title = function INTMUL() {
        var set_param_popup_title="Set INTMUL block parameters <br> Integer matrix multiplication";
        return set_param_popup_title
    }
    INTMUL.prototype.getDimensionForDisplay = function INTMUL(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
