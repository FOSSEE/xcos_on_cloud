function RELATIONALOP() {

    RELATIONALOP.prototype.define = function RELATIONALOP() {
        this.label = "&lt";
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
	    this.displayParameter = [this.label];
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

        this.rule = parseInt((arguments[0]["rule"]));
	    this.zcr = parseInt((arguments[0]["zcr"]));
	    this.Datatype = parseInt((arguments[0]["Datatype"]));
	    var zcr1 = 0;
	    if(this.zcr != 0){
            zcr1 = 1;
	    }
	    if(this.rule < 0 || this.rule > 5){
            alert("Incorrect operator "+this.rule.toString()+" ; must be 0 to 5.");
            throw "incorrect";
        }
		if (this.rule == 0 ){
            this.label = "==";
		}
        else if (this.rule == 1 ){
            this.label = "~=";
		}
        else if (this.rule == 2 ){
            this.label = "<"; // <
		}
        else if (this.rule == 3 ){
            this.label = "<="; // <=
		}
        else if (this.rule == 4 ){
            this.label = ">"; // >
		}
        else if (this.rule == 5 ){
            this.label = ">="; // >=
		}

		if (this.Datatype==1) {
            this.x.model.sim=list(new ScilabString(["relationalop"]), new ScilabDouble([4]));
		}
        else if (this.Datatype==3|| this.Datatype==9) {
            this.x.model.sim=list(new ScilabString(["relational_op_i32"]), new ScilabDouble([4]));
		}
        else if(this.Datatype==4) {
            this.x.model.sim=list(new ScilabString(["relational_op_i16"]), new ScilabDouble([4]));
		}
        else if(this.Datatype==5) {
            this.x.model.sim=list(new ScilabString(["relational_op_i8"]), new ScilabDouble([4]));
		}
        else if(this.Datatype==6) {
            this.x.model.sim=list(new ScilabString(["relational_op_ui32"]), new ScilabDouble([4]));
		}
        else if(this.Datatype==7) {
            this.x.model.sim=list(new ScilabString(["relational_op_ui16"]), new ScilabDouble([4]));
		}
        else if(this.Datatype==8){
            this.x.model.sim=list(new ScilabString(["relational_op_ui8"]), new ScilabDouble([4]));
		}
        else {
            alert("Datatype is not supported");
            throw "incorrect";
		}
        this.in = [[-1],[-1],[-2],[-2]];
        this.out = [[-1],[-2]];
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[]);
        this.x.model.ipar = new ScilabDouble([this.rule]);
        this.x.model.nmode = new ScilabDouble([zcr1]);
        this.x.model.nzcross = new ScilabDouble([zcr1]);
	    this.displayParameter = [this.label];
        this.x.graphics.exprs = new ScilabString([this.rule],[this.zcr],[this.Datatype]);
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
