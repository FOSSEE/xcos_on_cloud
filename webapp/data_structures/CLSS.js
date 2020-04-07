function CLSS () {
    CLSS.prototype.define = function CLSS() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        this.in1 = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([this.A], [this.B], [this.C], [this.D], [this.x0]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLSS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }


	CLSS.prototype.get = function CLSS() {
        var options={
            A:["A matrix",sci2exp(this.A)],
            B:["B matrix",sci2exp(this.B)],
            C:["C matrix",sci2exp(this.C)],
            D:["D matrix",sci2exp(this.D)],
            x0:["Initial state",sci2exp(this.x0)],
        }
        return options
    }

    CLSS.prototype.set = function CLSS() {
        this.A = inverse(arguments[0]["A"])
        this.B = inverse(arguments[0]["B"])
        this.C = inverse(arguments[0]["C"])
        this.D = inverse(arguments[0]["D"])
        this.x0 = inverse(arguments[0]["x0"])
        this.out = size(this.C,1)
        if(this.out == 0)
            this.out = []
        this.in = size(this.B,2)
        if(this.in == 0)
            this.in = []
        var io = check_io(this.x.model,this.x.graphics,[this.in],[this.out],[],[])

        var rpar = new ScilabDouble(...colon_operator(this.A),...colon_operator(this.B),...colon_operator(this.C),...colon_operator(this.D))
        this.x.model.dep_ut = new ScilabBoolean(false,true)
        this.x.model.rpar = rpar
        this.x.model.state = new ScilabDouble(...this.x0);
        var exprs = new ScilabString([sci2exp(this.A)],[sci2exp(this.B)],[sci2exp(this.C)],[sci2exp(this.D)],[sci2exp(this.x0)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
     }

    CLSS.prototype.details = function CLSS() {
    return this.x
    }

    CLSS.prototype.get_popup_title = function CLSS() {
        var set_param_popup_title="Set continuous linear system parameters";
        return set_param_popup_title
    }
    CLSS.prototype.getDimensionForDisplay = function CLSS(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }
}
