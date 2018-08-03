function DLSS() {

    DLSS.prototype.define = function DLSS() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["dsslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.A], [this.B], [this.C], [this.D], [this.x0]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLSS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DLSS.prototype.details = function DLSS() {
        return this.x;
    }
DLSS.prototype.get = function DLSS() {
        var options={
            A:["A matrix",sci2exp(this.A)],
            B:["B matrix",sci2exp(this.B)],
            C:["C matrix",sci2exp(this.C)],
            D:["D matrix",sci2exp(this.D)],
            x0:["Initial state",sci2exp(this.x0)],
        }
        return options
    }
DLSS.prototype.set = function DLSS() {
    this.A = MatrixInverse(arguments[0]["A"])
    this.B = MatrixInverse(arguments[0]["B"])
    this.C = MatrixInverse(arguments[0]["C"])
    this.D = MatrixInverse(arguments[0]["D"])
    this.x0 = MatrixInverse(arguments[0]["x0"])
    this.out = size(this.C,1)
    if(this.out == 0)
        this.out = []
    this.in = size(this.B,2)
    if(this.in == 0)
        this.in = []
    var ms=size(this.A,1);
    var ns=size(this.A,2);
            /*var okD=true;
            if(size(this.D,"*")!=(size(this.C,1)*size(this.B,2))){
                if(size(this.D,"*")==1){
                    this.D = this.D*ones(this.C*this.B) ;
                }
                else if(size(this.D,"*")==0){
                    this.D = zeros(this.C*this.B) ;
                }
                else
                    okD=false;
            }*/
            if(ms!=ns){
                alert("Matrix A is not square");
                DLSS.get();
            }
    var io = check_io(this.x.model,this.x.graphics,[this.in],[this.out],[],[])

    var rpar = new ScilabDouble(...colon_operator(this.A),...colon_operator(this.B),...colon_operator(this.C),...colon_operator(this.D))
    this.x.model.dep_ut = new ScilabBoolean(false,false)
    this.x.model.rpar = rpar
    this.x.model.dstate = new ScilabDouble(...this.x0)
    var exprs = new ScilabString([sci2exp(this.A)],[sci2exp(this.B)],[sci2exp(this.C)],[sci2exp(this.D)],[sci2exp(this.x0)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    DLSS.prototype.get_popup_title = function DLSS() {
        var set_param_popup_title="Set discrete linear system parameters";
        return set_param_popup_title
    }
}
