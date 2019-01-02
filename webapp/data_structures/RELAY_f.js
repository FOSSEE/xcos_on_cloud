function RELAY_f() {

    RELAY_f.prototype.define = function RELAY_f() {
        this.i0 = 0;
        this.in1 = [[-1], [-1]];
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["relay"]), new ScilabDouble([2]));
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble(...ones(this.in1));
        model.dstate = new ScilabDouble([this.i0]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, true]);

        var exprs = new ScilabString([this.nin], [this.i0 + 1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RELAY_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RELAY_f.prototype.details = function RELAY_f() {
        return this.x;
    }
    RELAY_f.prototype.get = function RELAY_f() {
        if(this.z0 == undefined || this.z0 == null)
            this.z0 = "1"
        var options={
            nin:["number of inputs",this.nin],
            z0:["initial connected input",this.z0],
        }
        return options
    }
    RELAY_f.prototype.set = function RELAY_f() {
        this.nin = parseFloat((arguments[0]["nin"]))
        this.z0 = parseFloat((arguments[0]["z0"]))
        if(this.z0>this.nin||this.z0<=0){
                alert("initial connected input is not a valid input port number");
                RELAY_f.get();
        }
        this.x.model.dstate = new ScilabDouble([this.z0-1])
        var exprs = new ScilabString([this.nin],[this.z0])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    RELAY_f.prototype.get_popup_title = function RELAY_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    RELAY_f.prototype.getDimensionForDisplay = function RELAY_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
