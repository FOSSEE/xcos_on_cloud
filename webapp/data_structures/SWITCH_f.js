function SWITCH_f() {

    SWITCH_f.prototype.define = function SWITCH_f() {
        this.i0 = 0;
        this.in1 = [[-1], [-1]];
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["switchn"]), new ScilabDouble([2]));
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.i0]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, true]);

        var exprs = new ScilabString([this.nin], [this.i0 + 1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SWITCH_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    SWITCH_f.prototype.internal = function SWITCH_f() {
        this.i0 = 0;
        this.in1 = [[-1],[-1]];
        this.nin = 2;

        var model = scicos_model();
        model.sim=list(new ScilabString(["switchn"]),new ScilabDouble([2]));
        model.in=new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.ipar=new ScilabDouble([this.i0]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true,true]);

        var exprs = new ScilabString([this.nin],[this.i0+1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SWITCH_f\",sz(1),sz(2));"]);
        var block=new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);
        return block;
    }

    SWITCH_f.prototype.details = function SWITCH_f() {
        return this.x;
    }
    SWITCH_f.prototype.get = function SWITCH_f() {
        if(this.z0 == undefined || this.z0 == null){
            this.z0 = "1"
        }
        var options={
            nin:["number of inputs",this.nin],
            z0:["connected input",this.z0],
        }
        return options
    }
    SWITCH_f.prototype.set = function SWITCH_f() {
    this.nin = parseFloat((arguments[0]["nin"]))
    this.z0 = parseFloat((arguments[0]["z0"]))
    if(this.z0>this.nin||this.z0<=0){
        alert("initial connected input is not a valid input port number");
        throw "incorrect";
    }
    this.x.model.ipar = new ScilabDouble([this.z0]-1)
    var exprs = new ScilabString([this.nin],[this.z0])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    SWITCH_f.prototype.get_popup_title = function SWITCH_f() {
        var set_param_popup_title="Set switch parameters";
        return set_param_popup_title
    }
    SWITCH_f.prototype.getDimensionForDisplay = function SWITCH_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
