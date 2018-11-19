function GENERAL_f() {

    GENERAL_f.prototype.define = function GENERAL_f() {
        var rpar = [[0],[0],[0],[0]];

        this.in = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["zcross"]), new ScilabDouble([1]));
        model.nzcross = new ScilabDouble([this.in]);
        model.in = new ScilabDouble([this.in]);
        model.evtout = new ScilabDouble(...ones(this.out, 1));
        model.rpar = new ScilabDouble([0], [0], [0], [0]);
        model.blocktype = new ScilabString(["z"]);
        model.firing = -new ScilabDouble(...ones(this.out, 1));
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in)], [sci2exp(this.out)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GENERAL_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }


GENERAL_f.prototype.get = function GENERAL_f() {
        var options={
            in:["Input size",this.in],
            out:["No of event output",this.out],
        }
        return options
    }
    GENERAL_f.prototype.set = function GENERAL_f() {
        this.in = parseFloat((arguments[0]["in"]))
	this.out = parseFloat((arguments[0]["out"]))
        if(this.in <=0){
            alert("Block must have at least one input");
            ZCROSS_f.get();
        }
        if(this.out <=0){
            alert("Block must have at least one input");
            ZCROSS_f.get();
        }
        this.kk=0
	this.kk1=0
        for (var jj = 1; jj <= this.in; jj++) {
            this.kk = this.kk + Math.pow(2,this.in+jj-1)
        }
        for (var jj = 1; jj <= this.out; jj++) {
            this.kk1 = this.kk1 + Math.pow(2,this.out+jj-1)
        }
        this.value = ones(this.kk,1)
        for (var i = this.value.length - 1; i >= 0; i--) {
            this.value[i][0] = -1*this.value[i][0]
        }
	this.value1 = ones(this.kk1,1)
	for (var i = this.value1.length - 1; i >= 0; i--) {
            this.value1[i][0] = -1*this.value1[i][0]
        }
        this.x.model.rpar = new ScilabDouble(...this.value,...zeros(Math.pow(2,2*this.in),1),...zeros(Math.pow(2,2*this.out),1))
        this.x.model.in = new ScilabDouble([this.in]);
        this.x.model.nzcross = new ScilabDouble([this.in]);
        this.x.model.firing = new ScilabDouble([-1]);
	var exprs = new ScilabString([sci2exp(this.in)], [sci2exp(this.out)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    GENERAL_f.prototype.details = function GENERAL_f() {
        return this.x;
    }
    GENERAL_f.prototype.get_popup_title = function GENERAL_f() {
        var set_param_popup_title="Set General Zero-Crossing parameters";
        return set_param_popup_title
    }
    GENERAL_f.prototype.getDimensionForDisplay = function GENERAL_f(){
        var dimension = [60,40];
        return dimension
    }
}
