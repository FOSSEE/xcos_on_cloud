function SWITCH2_m() {

    SWITCH2_m.prototype.define = function SWITCH2_m() {
        this.ipar = [0];
        this.nzz = 1;
        this.rpar = 0;
	    this.trial = [1];
	    this.ot = 1;
	    this.rule = 0;
	    this.thra = 0;
	    this.nzz = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["switch2_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [1], [-1]);
        model.in2 = new ScilabDouble([-2], [1], [-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.ipar]);
        model.rpar = new ScilabDouble([this.rpar]);
        model.nzcross = new ScilabDouble([this.nzz]);
        model.nmode = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.trial)], [sci2exp(this.ipar)], [sci2exp(this.rpar)], [sci2exp(this.nzz)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SWITCH2_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    SWITCH2_m.prototype.details = function SWITCH2_m() {
        return this.x;
    }
    SWITCH2_m.prototype.get = function SWITCH2_m() {
        if(this.ot == undefined || this.ot == null){
            this.ot = "1"
        }
        if(this.rule == undefined || this.rule == null){
            this.rule = "0"
        }
        if(this.thra == undefined || this.thra == null){
            this.thra = "0"
        }

        var options = {
            ot:["Datatype (1=real double  2=complex 3=int32 ...)",this.ot],
            rule:["pass first input if: u2>=a (0), u2>a (1), u2~=a (2)",sci2exp(this.rule)],
            thra:["threshold a",sci2exp(this.thra)],
            nzz:["use zero crossing: yes (1), no (0)",sci2exp(this.nzz)],
        }
        return options
    }
    SWITCH2_m.prototype.set = function SWITCH2_m() {
        var temp_ot = arguments[0]["ot"];
        var ot_1 = inverse(temp_ot);
        if ((ot_1 < 1)|(ot_1 > 8)){
            alert("Datatype is not supported");
            throw "incorrect";
        }
        this.rule = parseFloat(arguments[0]["rule"]);
        this.thra = parseFloat(arguments[0]["thra"]);
        this.nzz = parseFloat(arguments[0]["nzz"]);
        this.rule = Math.floor(this.rule);
        if(this.rule < 0){
            this.rule = 0;
        }else if(this.rule > 2){
            this.rule = 2;
        }
        this.x.model.ipar = new ScilabDouble([this.rule]);
        this.x.model.rpar = new ScilabDouble([this.thra]);
        if(this.nzz != 0){
            this.x.model.nmode = new ScilabDouble([1]);
            this.x.model.nzcross = new ScilabDouble([1]);
        }else{
            this.x.model.nmode = new ScilabDouble([0]);
            this.x.model.nzcross = new ScilabDouble([0]);
        }
        this.ot = temp_ot;
        var exprs = new ScilabString([this.ot],[sci2exp(this.rule)],[sci2exp(this.thra)],[sci2exp(this.nzz)]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    SWITCH2_m.prototype.get_popup_title = function SWITCH2_m() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title
    }
    SWITCH2_m.prototype.getDimensionForDisplay = function SWITCH2_m(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }


}
