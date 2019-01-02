function MATCATV() {

    MATCATV.prototype.define = function MATCATV() {
        this.l1 = [[2], [2]];
        this.function_name = "mat_catv";
        this.funtyp = 4;
	this.nin=2;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in2 = new ScilabDouble([-1], [-1]);
        model.in = new ScilabDouble([-2], [-3]);
        model.intyp = new ScilabDouble([-1, -1]);
        model.out = new ScilabDouble([0]);
        model.out2 = new ScilabDouble([-1]);
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATCATV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATCATV.prototype.details = function MATCATV() {
        return this.x;
    }
    MATCATV.prototype.get = function MATCATV() {
        if(this.nin == undefined || this.nin == null){
            this.nin = "2"
        }
        var options={
            nin:["Number od inputs",this.nin],
        }
        return options
    }
    MATCATV.prototype.set = function MATCATV() {
        this.nin = parseFloat((arguments[0]["nin"]))
        this.in1 = ones(this.nin,1)
        for (var i = this.in1.length - 1; i >= 0; i--) {
            this.in1[i] = -1*this.in1[i]
        }
        this.in2 = []
        //for (var i = 2  ; i <= this.nin+1; i--) {
       //     this.in2.push([-1*i])
      //  }
	for (var i = this.nin-1  ;i >= 0; i--) {
           this.in2.push([-1*i]);
        }
	var model = scicos_model();
        this.x.model.intyp = new ScilabDouble(...this.in1)
        this.x.model.outtyp = new ScilabDouble([-1])
        this.in = [...this.in2,...this.in1]
        var io = set_io(this.x.model,this.x.graphics,this.in,[[0],[-1]],[],[])


        this.x.model.sim = list(new ScilabString(["mat_catv"]), new ScilabDouble([4]))
        var exprs = new ScilabString([this.nin])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    MATCATV.prototype.get_popup_title = function MATCATV() {
        var set_param_popup_title="Set MATCATV block parameters";
        return set_param_popup_title
    }
    MATCATV.prototype.getDimensionForDisplay = function MATCATV(){
        var dimension = { width: 40, height: 60 };
        return dimension
    }
}
