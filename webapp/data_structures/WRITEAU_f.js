function WRITEAU_f() {

    WRITEAU_f.prototype.define = function WRITEAU_f() {
        this.in1 = 1;
        this.nin = math.sum(this.in1);
        this.frmt = "uc ";
        this.fname = "/dev/audio";
        this.swap = 0;
        this.lunit = 0;
        this.N = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["writeau"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([-1], [this.lunit], ...zeros((this.nin + 1) * this.N, 1));
        model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.N], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"WRITEAU_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    WRITEAU_f.prototype.details = function WRITEAU_f() {
        return this.x;
    }
    WRITEAU_f.prototype.get = function WRITEAU_f() {
        var options={
            N:["Buffer Size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap],
        }
        return options;
    }

    WRITEAU_f.prototype.set = function WRITEAU_f() {

        this.N= parseFloat((arguments[0]["N"]));
        this.swap= parseFloat((arguments[0]["swap"]));
        if(this.N<1){
                alert("Wrong value for 'Buffer Size' parameter: "+this.N+"\nStrictly positive integer expected.");
                WRITEAU_f.get();
        }
            if((this.swap!=0)&&(this.swap!=1)){
                alert("Wrong value for 'Swap Mode (0:No, 1:Yes)' parameter: "+this.swap+"\nMust be in the interval [0, 1]");
                WRITEAU_f.get();
            }
        this.x.model.sim = list(new ScilabString(["writeau"]), new ScilabDouble([2]));
        this.x.model.in = new ScilabDouble([this.in1]);
        this.x.model.dstate = new ScilabDouble([-1], [this.lunit], ...zeros((this.nin + 1) * this.N, 1));
        this.x.model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.N], [this.swap], ..._str2code(this.fname));
        this.x.graphics.exprs = new ScilabString([this.N], [this.swap]);
        return new BasicBlock(this.x);
    }

    WRITEAU_f.prototype.get_popup_title = function WRITEAU_f() {
        var set_param_popup_title="Set WRITEAU_f block parameters";
        return set_param_popup_title
    }
}

//updated on 8/6/17 --ritveeka
