function GENSIN_f() {

    GENSIN_f.prototype.define = function GENSIN_f() {
        this.rpar = [[1], [1], [0]];

        var model = scicos_model();
        model.sim = new ScilabString(["gensin"]);
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble       ([1]);
        model.outtyp = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([1], [1], [0]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString(this.rpar[0], this.rpar[1], this.rpar[2]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GENSIN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GENSIN_f.prototype.details = function GENSIN_f() {
        return this.x;
    }
    GENSIN_f.prototype.get = function GENSIN_f() {
        if(this.M == undefined || this.M ==null){
            this.M = "1"
        }
        if(this.F == undefined || this.F ==null){
            this.F = "1"
        }
        if(this.P == undefined || this.P ==null){
            this.P = "0"
        }

        var options={
            M:["Magnitude",this.M],
            F:["Frequency (rad/s)",this.F],
            P:["Phase(rad)",this.P]
        }
        return options
    }
    GENSIN_f.prototype.set = function GENSIN_f() {
        this.M = parseFloat(arguments[0]["M"]);
        this.F = parseFloat(arguments[0]["F"]);
        this.P = parseFloat(arguments[0]["P"]);
        if(this.F < 0){
            alert("Wrong value for ''Frequency'' parameter: "+this.F+"\nStrictly positive integer expected.");
           throw "incorrect";
        }
        var io = check_io(this.x.model,this.x.graphics,[],[[1]],[],[]);
        this.x.model.rpar = new ScilabDouble([this.M],[this.F],[this.P]);
        this.x.model.out2 = new ScilabDouble([1]);
        this.x.model.outtyp = new ScilabDouble([1]);
        var exprs = new ScilabString([this.M],[this.F],[this.P]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    GENSIN_f.prototype.get_popup_title = function GENSIN_f() {
        var set_param_popup_title = "Set GENSIN_f block parameters <br> Sine wave generator<br>";
        return set_param_popup_title
    }
    GENSIN_f.prototype.getDimensionForDisplay = function GENSIN_f(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
