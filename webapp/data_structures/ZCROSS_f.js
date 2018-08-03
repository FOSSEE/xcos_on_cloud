function ZCROSS_f() {

    ZCROSS_f.prototype.define = function ZCROSS_f() {
        this.rpar = [[-1], [-1], [0], [0]];

        this.in = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        model.in = new ScilabDouble([this.in]);
        model.nzcross = new ScilabDouble([this.in]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([-1], [-1], [0], [0]);
        model.blocktype = new ScilabString(["z"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ZCROSS_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);

        return new BasicBlock(this.x);
    }

    ZCROSS_f.prototype.details = function ZCROSS_f() {
        return this.x;
    }
    ZCROSS_f.prototype.get = function ZCROSS_f() {
        var options={
            in:["Input size",this.in],
        }
        return options
    }
    ZCROSS_f.prototype.set = function ZCROSS_f() {
        this.in = parseFloat((arguments[0]["in"]))
        if(this.in<=0){
            alert("Block must have at least one input");
            ZCROSS_f.get();
        }
        this.kk=0
        for (var jj = 1; jj <= this.in; jj++) {
            this.kk = this.kk + Math.pow(2,this.in+jj-1)
        }
        this.value = ones(this.kk,1)
        for (var i = this.value.length - 1; i >= 0; i--) {
            this.value[i][0] = -1*this.value[i][0]
        }
        this.x.model.rpar = new ScilabDouble(...this.value,...zeros(Math.pow(2,2*this.in),1))
        this.x.model.in = new ScilabDouble([this.in]);
        this.x.model.nzcross = new ScilabDouble([this.in]);
        this.x.model.firing = new ScilabDouble([-1]);
        var exprs = new ScilabString([this.in])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    ZCROSS_f.prototype.get_popup_title = function ZCROSS_f() {
        var set_param_popup_title="Set Zero-Crossing parameters <br>All surfaces must cross together";
        return set_param_popup_title
    }
}
