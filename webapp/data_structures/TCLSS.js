function TCLSS() {

    TCLSS.prototype.define = function TCLSS() {
        this.x0 = 0;
        this.A = 0;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        this.in1 = 1;
        this.nx = size(this.x0, "*");
        this.out = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["tcslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1], [this.nx]);
        model.out = new ScilabDouble([this.out]);
        model.evtin = new ScilabDouble([1]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([this.A], [this.B], [this.C], [this.D], [this.x0]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TCLSS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }


    TCLSS.prototype.details = function TCLSS() {
        return this.x;
    }
    TCLSS.prototype.get = function DLSS() {
        var options={
            A:["A matrix",sci2exp(this.A)],
            B:["B matrix",sci2exp(this.B)],
            C:["C matrix",sci2exp(this.C)],
            D:["D matrix",sci2exp(this.D)],
            x0:["Initial state",sci2exp(this.x0)],
        }
        return options
    }
    TCLSS.prototype.set=function TCLSS(){
        this.A = MatrixInverse(arguments[0]["A"])
        this.B = MatrixInverse(arguments[0]["B"])
        this.C = MatrixInverse(arguments[0]["C"])
        this.D = MatrixInverse(arguments[0]["D"])
        this.x0 = MatrixInverse(arguments[0]["x0"])
        this.out=size(this.C,1);
        if(this.out==0)
            this.out=[]
        this.in=size(this.B,2);
        if(this.in==0)
            this.in=[]
        var ms=size(this.A,1);
        var ns=size(this.A,2);
        if(ms!=ns){
            alert("A matrix must be square");
            TCLSS.get();
        }
        var io = check_io(this.x.model,this.x.graphics,[[this.in],[ms]],[this.out],1,[])
        var exprs = new ScilabString([sci2exp(this.A)],[sci2exp(this.B)],[sci2exp(this.C)],[sci2exp(this.D)],[sci2exp(this.x0)])
        this.x.graphics.exprs=exprs
        var rpar = new ScilabDouble(...colon_operator(this.A),...colon_operator(this.B),...colon_operator(this.C),...colon_operator(this.D))
        this.x.model.rpar = rpar
        this.x.model.dep_ut = new ScilabBoolean(false,true)
        if(this.D!=[])
            this.x.model.sim = list(new ScilabString(["tcslti4"]), new ScilabDouble([4]));
        else
            this.x.model.sim = list(new ScilabString(["tcsltj4"]), new ScilabDouble([4]));
        return new BasicBlock(this.x)
    }
    TCLSS.prototype.get_popup_title = function TCLSS() {
        var set_param_popup_title="Set continuous linear system parameters";
        return set_param_popup_title
    }
    TCLSS.prototype.getDimensionForDisplay = function TCLSS(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
