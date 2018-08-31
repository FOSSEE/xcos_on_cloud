function BACKLASH() {
    BACKLASH.prototype.define = function BACKLASH() {
        this.ini = 0;
        this.gap = 1;
        this.zcr = 1;

        var exprs = new ScilabString(["0"], ["1"], ["1"]);
        var model = scicos_model();
        model.sim = list(new ScilabString(["backlash"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], [1]);
        model.nzcross = new ScilabDouble([2]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BACKLASH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x)
    }
    BACKLASH.prototype.details = function BACKLASH() {
        return this.x;
    }
    BACKLASH.prototype.get = function BACKLASH() {
         var options={
            ini:["initial output",this.ini],
            gap:["gap",this.gap],
            zcr:["use zero-crossing (0:no, 1:yes)",this.zcr],
        }
        return options
    }
    BACKLASH.prototype.set = function BACKLASH() {
        this.ini = parseFloat((arguments[0]["ini"]))
        this.gap = parseFloat((arguments[0]["gap"]))
        this.zcr = parseFloat((arguments[0]["zcr"]))
        var rpar = new ScilabDouble([this.ini],[this.gap])
        if(this.zcr!=0){
            this.x.model.nzcross = new ScilabDouble([2]);
        }
        else{
            this.x.model.nzcross = new ScilabDouble([0]);
        }
        this.x.model.rpar = rpar
        var exprs = new ScilabString([this.ini],[this.gap],[this.zcr])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    BACKLASH.prototype.get_popup_title = function BACKLASH() {
        var set_param_popup_title="Set backlash parameters";
        return set_param_popup_title
    }
}
