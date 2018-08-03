function GAIN_f() {

    GAIN_f.prototype.define = function GAIN_f() {
        this.gain = 1;
        this.in1 = 1;
        this.out = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["gain"]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.gain]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.gain)], [sci2exp(this.in1)], [sci2exp(this.out)]);
        var n = sci2exp(this.gain).toString();//TEMPORARILY IAM CONSIDERING GAIN TO BE DISPLAYED
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GAIN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GAIN_f.prototype.details = function GAIN_f() {
        return this.x;
    }
    GAIN_f.prototype.get = function GAIN_f() {
        var options={
            gain:["Gain",this.gain.toString().replace(/,/g," ")],
        }
        return options
    }
    GAIN_f.prototype.set = function GAIN_f() {
        this.gain = inverse(arguments[0]["gain"])
        try{
        if(this.gain.length==0){
            alert("Gain must have at least one element");
            GAIN_f.get();
        }
        }
        catch(e){}
        this.out = size(this.gain,1)
        this.in = size(this.gain,2)

        var io = check_io(this.x.model,this.x.graphics,[this.in],[this.out],[],[])

        var exprs = new ScilabString([sci2exp(this.gain)])
        this.x.model.rpar = new ScilabDouble(...this.gain)
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    GAIN_f.prototype.get_popup_title = function GAIN_f() {
        var set_param_popup_title="Set gain block parameters";
        return set_param_popup_title
    }
}
