function WRITEC_f () {

    WRITEC_f.prototype.define = function WRITEC_f() {
        this.in = 1;
        this.nin = math.sum(this.in);
        this.frmt = "c  ";
        this.fname = "foo";
        this.swap = 0;
        this.lunit = 0;
        this.N = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["writec"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([this.in]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([-1], [this.lunit], ...zeros((this.nin + 1) * this.N, 1));
        model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.in)], [this.fname], [this.frmt], [this.N], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"WRITEC_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    WRITEC_f.prototype.details = function WRITEC_f() {
        return this.x;
    }
    WRITEC_f.prototype.get = function WRITEC_f() {

        var options={
            in:["Write to C binary file",this.in],
            fname1:["Output File Name",this.fname],
            frmt1:["Output Format",this.frmt],
            N:["Buffer Size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],

        };
        return options;
    }
    WRITEC_f.prototype.set = function WRITEC_f() {
        this.in = parseFloat((arguments[0]["in"]));
        this.fname = (arguments[0]["fname1"]);
        this.frmt = (arguments[0]["frmt1"]);
        this.N = parseFloat((arguments[0]["N"]));
        this.swap = parseFloat((arguments[0]["swap"]));
        if(this.N<1){
                alert("Wrong value for 'Buffer Size' parameter: "+this.N+"\nStrictly positive integer expected.");
                WRITEC_f.get();
        }
        if(this.in<=0){
                alert("Wrong value for 'Input Size' parameter: "+this.in+"\nStrictly positive integer expected.");
                WRITEC_f.get();
        }
        if((this.swap!=0)&&(this.swap!=1)){
                alert("Wrong value for 'Swap Mode' parameter: "+this.swap+"\nMust be in the interval [0, 1]");
                WRITEC_f.get();
        }
        this.nin=this.in;
        this.x.model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        this.x.model.in = new ScilabDouble([this.in]);
        var exprs = new ScilabString([sci2exp(this.in)], [this.fname], [this.frmt], [this.N], [this.swap]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    }

    WRITEC_f.prototype.get_popup_title = function WRITEC_f() {
        var set_param_popup_title="Set WRITEC_f block parameters";
        return set_param_popup_title
    }
}
