function RELATIONALOP() {

    RELATIONALOP.prototype.define = function RELATIONALOP() {
        var label = "<";
	    this.rule = 2;
	    this.zcr = 0;
	    this.Datatype = 1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["relationalop"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.rule]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.rule],[this.zcr]);
	    this.displayParameter = [label];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RELATIONALOP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["fontSize=13;fontStyle=1;displayedLabel=" + label]);
        return new BasicBlock(this.x);
    }
    RELATIONALOP.prototype.details = function RELATIONALOP() {
        return this.x;
    }
    RELATIONALOP.prototype.get = function RELATIONALOP() {

        var options = {
        rule:["Operator: ==(0), ~=(1), <(2), <=(3), >(4), >=(5)", this.rule],
	    zcr:["Use zero crossing (no: 0), (yes: 1)" , this.zcr],
	    Datatype:["Datatype (1=double 3=int32 ...)" , this.Datatype],
        }
        return options
    }
    RELATIONALOP.prototype.set = function RELATIONALOP() {

        var rule = parseInt(arguments[0]["rule"]);
	    var zcr = parseInt(arguments[0]["zcr"]);
	    var Datatype = parseInt(arguments[0]["Datatype"]);
	    var zcr1 = 0;
	    if(zcr != 0){
            zcr1 = 1;
	    }
	    if(rule < 0 || rule > 5){
            alert("Incorrect operator "+rule.toString()+" ; must be 0 to 5.");
            throw "incorrect";
        }
        var label;
		switch (rule) {
		    case 0: label = "=="; break;
            case 1: label = "~="; break;
            case 2: label = "<"; break;
            case 3: label = "<="; break;
            case 4: label = ">"; break;
            case 5: label = ">="; break;
        }
        var model = this.x.model;
        switch (Datatype) {
		    case 1: model.sim = list(new ScilabString(["relationalop"]), new ScilabDouble([4])); break;
            case 3:
            case 9: model.sim = list(new ScilabString(["relational_op_i32"]), new ScilabDouble([4])); break;
            case 4: model.sim = list(new ScilabString(["relational_op_i16"]), new ScilabDouble([4])); break;
            case 5: model.sim = list(new ScilabString(["relational_op_i8"]), new ScilabDouble([4])); break;
            case 6: model.sim = list(new ScilabString(["relational_op_ui32"]), new ScilabDouble([4])); break;
            case 7: model.sim = list(new ScilabString(["relational_op_ui16"]), new ScilabDouble([4])); break;
            case 8: model.sim = list(new ScilabString(["relational_op_ui8"]), new ScilabDouble([4])); break;
            default: alert("Datatype is not supported");throw "incorrect";
        }
        this.rule = rule;
        this.zcr = zcr;
        this.Datatype = Datatype;
        var in1 = [[-1],[-1],[-2],[-2]];
        var out1 = [[-1],[-2]];
        var io = set_io(model,this.x.graphics,in1,out1,[],[]);
        model.ipar = new ScilabDouble([rule]);
        model.nmode = new ScilabDouble([zcr1]);
        model.nzcross = new ScilabDouble([zcr1]);
	    this.displayParameter = [label];
        this.x.graphics.exprs = new ScilabString([rule],[zcr],[Datatype]);
        this.x.graphics.style = new ScilabString(["fontSize=13;fontStyle=1;displayedLabel=" + label]);
        return new BasicBlock(this.x);
    }
    RELATIONALOP.prototype.get_popup_title = function RELATIONALOP() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title
    }
    RELATIONALOP.prototype.getDimensionForDisplay = function RELATIONALOP(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
