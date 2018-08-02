function RELATIONALOP() {

    RELATIONALOP.prototype.define = function RELATIONALOP() {
        //this.ipar = 2;
        this.label = "<";
	this.oprt=2;
	this.zcr=0;
	this.data=1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["relationalop"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.oprt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.oprt]);
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

        var options={
        oprt:["Operator:==(0),~=(1),<(2),<=(3),>(4),>=(5)",this.oprt],
	    zcr:["Use zero crossing (no: 0), (yes: 1)" ,this.zcr],
	    data:["Datatype (1=double 3=int32 ...)" ,this.data],
        }
        return options
    }
    RELATIONALOP.prototype.set = function RELATIONALOP() {

    this.oprt = parseInt((arguments[0]["oprt"]))
	this.zcr = parseInt((arguments[0]["zcr"]))
	this.data = parseInt((arguments[0]["data"]))

	if(this.zcr< 0 || this.zcr >1)
	{
                alert("incorrect operator");
		RELATIONALOP.get();
	}
		if (this.oprt == 0 ){
                    this.label = "==";
		}
                else if (this.oprt == 1 ){
                    this.label = "~=";
		}
                else if (this.oprt == 2 ){
                    this.label = "<"; // <
		}
                else if (this.oprt == 3 ){
                    this.label = "<="; // <=
		}
                else if (this.oprt == 4 ){
                    this.label = ">"; // >
		}
                else if (this.oprt == 5 ){
                    this.label = ">="; // >=
		}
		var model = scicos_model();

		if (this.data==1) {
                model.sim=list(new ScilabString(["relationalop"]), new ScilabDouble([4]));
		}
                else if (this.data==3|| this.data==9) {
                model.sim=list(new ScilabString(["relational_op_i32"]), new ScilabDouble([4]));
		}
                else if(this.data==4) {
                model.sim=list(new ScilabString(["relational_op_i16"]), new ScilabDouble([4]));
		}
                else if(this.data==5) {
                model.sim=list(new ScilabString(["relational_op_i8"]), new ScilabDouble([4]));
		}
                else if(this.data==6) {
                model.sim=list(new ScilabString(["relational_op_ui32"]), new ScilabDouble([4]));
		}
                else if(this.data==7) {
                model.sim=list(new ScilabString(["relational_op_ui16"]), new ScilabDouble([4]));
		}
                else if(this.data==8){
                model.sim=list(new ScilabString(["relational_op_ui8"]), new ScilabDouble([4]));
		}
                else {
                alert("Datatype is not supported");
		//RELATIONALOP.get();
                }

        var model = scicos_model();
	model.sim = list(new ScilabString(["relationalop"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.oprt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        var exprs = new ScilabString([this.oprt],[this.zcr],[this.data]);
	this.displayParameter = [this.label];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RELATIONALOP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["fontSize=13;fontStyle=1;displayedLabel=" + label]);
        return new BasicBlock(this.x);
}
       RELATIONALOP.prototype.get_popup_title = function RELATIONALOP() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }

}
