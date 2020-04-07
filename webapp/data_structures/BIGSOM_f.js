function BIGSOM_f() {

    BIGSOM_f.prototype.define = function BIGSOM_f() {
        this.sgn = [[1],[1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["sum"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.sgn)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BIGSOM_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["BIGSOM_f"]);
        return new BigSom(this.x);
    }
    BIGSOM_f.prototype.details = function BIGSOM_f() {
        return this.x;
    }
    BIGSOM_f.prototype.get = function BIGSOM_f() {
         var options = {
            sgn:["Inputs ports signs/gain",this.sgn],
        }
        return options
    }
    BIGSOM_f.prototype.set = function BIGSOM_f() {
        this.sgn = arguments[0]["sgn"];
        var sgn_1 = inverse(this.sgn);
        this.in = ones(size(sgn_1,"*"),1);
        for (var i = this.in.length - 1; i >= 0; i--) {
            this.in[i] = -1*this.in[i];
        }
        var io = check_io(this.x.model,this.x.graphics,this.in,[-1],[],[]);
        model.rpar = new ScilabDouble(...sgn_1);
        var exprs = new ScilabString([this.sgn]);
        this.x.graphics.exprs = exprs;
        return new BigSom(this.x);
    }
    BIGSOM_f.prototype.get_popup_title = function BIGSOM_f() {
        var set_param_popup_title = "Set sum block parameters";
        return set_param_popup_title
    }
    BIGSOM_f.prototype.getDimensionForDisplay = function BIGSOM_f(){
        var dimension = { width: 40, height: 60 };
        return dimension
    }
}
