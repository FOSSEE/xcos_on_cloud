function LOGICAL_OP() {

    LOGICAL_OP.prototype.define = function LOGICAL_OP() {
        this.in1 = [[-1], [-1]];
        this.ipar = 0;
        this.nin = 2;
        this.label="AND";
        this.oprt=0;
        this.bit=0;
        this.data=1;
        var arr = [];
        arr.push(math.range(-1, -this.nin, -1, true)._data);
        var model = scicos_model();
        model.sim = list(new ScilabString(["logicalop"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...math.transpose(arr));
        model.out = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        this.displayParameter = [this.label];
        var exprs = new ScilabString([this.nin],[this.oprt],[this.data],[this.bit]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGICAL_OP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    LOGICAL_OP.prototype.details = function LOGICAL_OP() {
        return this.x;
    }
    LOGICAL_OP.prototype.get = function LOGICAL_OP() {

        var options={
	    nin:["number of inputs" ,this.nin.toString()],
        oprt:["Operator: AND (0), OR (1), NAND (2), NOR (3), XOR (4), NOT (5)",this.oprt],
	    bit:["Bitwise Rule(0=No 1=yes)" ,this.bit],
	    data:["Datatype (1=double 3=int32 ...)" ,this.data],
        }
        return options
    }
   LOGICAL_OP.prototype.set = function LOGICAL_OP() {

	this.nin = inverse((arguments[0]["nin"]))
    this.oprt = parseInt((arguments[0]["oprt"]))
	this.bit = parseInt((arguments[0]["bit"]))
	this.data = parseInt((arguments[0]["data"]))
	if (this.oprt==5 && this.nin>1){
	alert("Only one input allowed for NOT operation");
	}
		var model = scicos_model();
		if (this.data==1) {
                model.sim=list(new ScilabString(["logicalop"]), new ScilabDouble([4]));
		model.ipar = new ScilabDouble([this.oprt]);
		}
                else if (this.data==3) {
                model.sim=list(new ScilabString(["logicalop_i32"]), new ScilabDouble([4]));
		}
                else if(this.data==4) {
                model.sim=list(new ScilabString(["logicalop_i16"]), new ScilabDouble([4]));
		}
                else if(this.data==5) {
                model.sim=list(new ScilabString(["logicalop_i8"]), new ScilabDouble([4]));
		}
                else if(this.data==6) {
                model.sim=list(new ScilabString(["logicalop_ui32"]), new ScilabDouble([4]));
		}
                else if(this.data==7) {
                model.sim=list(new ScilabString(["logicalop_ui16"]), new ScilabDouble([4]));
		}
                else if(this.data==8){
                model.sim=list(new ScilabString(["logicalop_ui8"]), new ScilabDouble([4]));
		}
                else {
                alert("Datatype is not supported");
                }

	if(this.oprt <0 || this.oprt >5){
	alert("Incorrect operator must be 0 to 5.");
	}
		if (this.oprt == 0 ){
                    this.label = "AND";
		}
                else if (this.oprt == 1 ){
                    this.label = "OR";
		}
                else if (this.oprt == 2 ){
                    this.label = "NAND"; // <
		}
                else if (this.oprt == 3 ){
                    this.label = "NOR"; // <=
		}
                else if (this.oprt == 4 ){
                    this.label = "XOR"; // >
		}
                else if (this.oprt == 5 ){
                    this.label = "NOT"; // >=
		}
		if (this.data==1) {

		model.ipar = new ScilabDouble([this.oprt])
		this.x.model.ipar = new ScilabDouble([this.oprt])
		}
		else{
		model.ipar = new ScilabDouble([this.oprt],[this.bit])
		this.x.model.ipar = new ScilabDouble([this.oprt],[this.bit])
		}
       // model.sim = list(new ScilabString(["logicalop"]), new ScilabDouble([4]));
	var arr = [];
        arr.push(math.range(-1, -this.nin, -1, true)._data);
        model.in = new ScilabDouble(...math.transpose(arr));
        model.out = new ScilabDouble([0]);
        //model.ipar = new ScilabDouble([this.oprt],[this.bit]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
	this.displayParameter = [this.label];
        if(size(this.nin,"*") == 1){
        var n = this.nin[0]
        this.inp = []
        for (var i = 1; i <= n; i++ ) {
            this.inp.push([-1*i])
        }
        var io = check_io(this.x.model,this.x.graphics,this.inp,0,[],[])
    }
        else{
        this.nout = sum(this.in1)
        var io = check_io(this.x.model,this.x.graphics,this.nin,this.nout,[],[])
    }


	this.x.model.out = new ScilabDouble([0]);
        //this.x.model.ipar = new ScilabDouble([this.oprt],[this.bit])
        var exprs = new ScilabString(this.nin.toString(),this.oprt.toString(),this.data.toString(),this.bit.toString())
        this.x.graphics.exprs = exprs
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGICAL_OP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
}
        LOGICAL_OP.prototype.get_popup_title = function LOGICAL_OP() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
}
