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
            A:["A matrix",this.A],
            B:["B matrix",this.B],
            C:["C matrix",this.C],
            D:["D matrix",this.D],
            x0:["Initial state",this.x0],
        }
        return options
    }
    DLSS.prototype.set = function DLSS() {
        this.A = arguments[0]["A"];
        this.B = arguments[0]["B"];
        this.C = arguments[0]["C"];
        this.D = arguments[0]["D"];
        this.x0 = arguments[0]["x0"];
        var A_1 = inverse(this.A);
        var B_1 = inverse(this.B);
        var C_1 = inverse(this.C);
        var D_1 = inverse(this.D);
        var x0_1 = inverse(this.x0);
        this.out = size(C_1,1)
        if(this.out == 0){
            this.out = []
        }
        this.in = size(B_1,2)
        if(this.in == 0){
            this.in = []
        }
        var ms = size(A_1,1);
        var ns = size(A_1,2);
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
        if(ms != ns){
            alert("Matrix A is not square");
            throw "incorrect";
        }
        var io = check_io(this.x.model,this.x.graphics,[this.in],[this.out],[],[])

        var rpar = new ScilabDouble(...colon_operator(A_1),...colon_operator(B_1),...colon_operator(C_1),...colon_operator(D_1))
        this.x.model.dep_ut = new ScilabBoolean(false,false)
        this.x.model.rpar = rpar
        this.x.model.dstate = new ScilabDouble(...x0_1)
        var exprs = new ScilabString([this.A],[this.B],[this.C],[this.D],[this.x0])
        this.x.graphics.exprs = exprs
        return new BasicBlock(this.x)
    }
    DLSS.prototype.get_popup_title = function DLSS() {
        var set_param_popup_title = "Set discrete linear system parameters";
        return set_param_popup_title
    }
    DLSS.prototype.getDimensionForDisplay = function DLSS(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }
}
