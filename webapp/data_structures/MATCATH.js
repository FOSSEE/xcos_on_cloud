function MATCATH() {

    MATCATH.prototype.define = function MATCATH() {
        this.funtyp = 4;
        this.function_name = "mat_cath";
	this.nin= 2;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-1]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.intyp = new ScilabDouble([1, 1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([0]);
        model.outtyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(2)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATCATH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    MATCATH.prototype.details = function MATCATH() {
        return this.x;
    }

    MATCATH.prototype.get = function MATCATH() {
        if(this.nin == undefined || this.nin == null){
            this.nin = "2"
        }
        var options={
            nin:["Number of input",this.nin],
        }
        return options
    }

    MATCATH.prototype.set = function MATCATH() {
        this.nin = parseFloat((arguments[0]["nin"]))
        this.in1 = ones(this.nin,1)
        for (var i = this.in1.length - 1; i >= 0; i--) {
            this.in1[i] = -1*this.in1[i]
        }

        this.in2 = []

        //for (var i = 2  ; i <= this.nin+1; i--) {
        //    this.in2.push([-1*i]);
        //}
	for (var i = this.nin-1  ;i >= 0; i--) {
           this.in2.push([-1*i]);
        }
        this.x.model.intyp = new ScilabDouble(...this.in1)
        this.x.model.outtyp = new ScilabDouble([-1])
        this.in = [...this.in1,...this.in2]
        var io = set_io(this.x.model,this.x.graphics,this.in,[[-1],[0]],[],[])
        this.x.model.sim = list(new ScilabString(["mat_cath"]), new ScilabDouble([4]))
        var exprs = new ScilabString([this.nin])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    MATCATH.prototype.get_popup_title = function MATCATH() {
        var set_param_popup_title="Set MATCATH block parameters";
        return set_param_popup_title
    }
    MATCATH.prototype.getDimensionForDisplay = function MATCATH(){
        var dimension = [40,60];
        return dimension
    }
}
