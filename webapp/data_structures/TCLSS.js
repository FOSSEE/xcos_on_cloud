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
        var options = {
            A:["A matrix",this.A],
            B:["B matrix",this.B],
            C:["C matrix",this.C],
            D:["D matrix",this.D],
            x0:["Initial state",this.x0],
        }
        return options
    }
    TCLSS.prototype.set = function TCLSS(){
        var temp_A = arguments[0]["A"];
        var temp_B = arguments[0]["B"];
        var temp_C = arguments[0]["C"];
        var temp_D = arguments[0]["D"];
        var temp_x0 = arguments[0]["x0"];
        var A_1 = inverse(temp_A);
        var B_1 = inverse(temp_B);
        var C_1 = inverse(temp_C);
        var D_1 = inverse(temp_D);
        var x0_1 = inverse(temp_x0);
        this.out = size(C_1,1);
        if(this.out == 0){
            this.out = [];
        }
        this.in = size(B_1,2);
        if(this.in == 0){
            this.in = [];
        }
        var ms = size(A_1,1);
        var ns = size(A_1,2);
        if(ms != ns){
            alert("A matrix must be square");
            throw "incorrect";
        }
        this.A = temp_A;
        this.B = temp_B;
        this.C = temp_C;
        this.D = temp_D;
        this.x0 = temp_x0;
        var io = check_io(this.x.model,this.x.graphics,[[this.in],[ms]],[this.out],1,[]);
        var exprs = new ScilabString([this.A],[this.B],[this.C],[this.D],[this.x0]);
        this.x.graphics.exprs = exprs;
        var rpar = new ScilabDouble(...colon_operator(A_1),...colon_operator(B_1),...colon_operator(C_1),...colon_operator(D_1));
        this.x.model.rpar = rpar;
        this.x.model.dep_ut = new ScilabBoolean(false,true);
        if(this.D != []){
            this.x.model.sim = list(new ScilabString(["tcslti4"]), new ScilabDouble([4]));
        }else{
            this.x.model.sim = list(new ScilabString(["tcsltj4"]), new ScilabDouble([4]));
        }
        return new BasicBlock(this.x);
    }
    TCLSS.prototype.get_popup_title = function TCLSS() {
        var set_param_popup_title = "Set continuous linear system parameters";
        return set_param_popup_title
    }
    TCLSS.prototype.getDimensionForDisplay = function TCLSS(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
