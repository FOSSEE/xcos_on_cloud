function RAMP() {

    RAMP.prototype.define = function RAMP() {
        this.slope = 0;
        this.iout = 0;
        this.stt = 0;
        this.rpar = [[this.slope], [this.stt], [this.iout]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["ramp"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.blocktype = new ScilabString(["c"]);
        model.nmode = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([1]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString(...this.rpar);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RAMP\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RAMP.prototype.details = function RAMP() {
        return this.x;
    }
    RAMP.prototype.get = function RAMP() {
        var options={
            slope:["Slope",this.slope],
            stt:["Start Time",this.stt],
            iout:["Initial Value",this.iout]
        }
        return options
    }
    RAMP.prototype.set = function RAMP() {
    this.slope = parseFloat((arguments[0]["slope"]))
    this.stt = parseFloat((arguments[0]["stt"]))
    this.iout = parseFloat((arguments[0]["iout"]))
    if(this.stt<0){
        alert("Wrong value for ''Start Time'' parameter: "+this.stt+"\nNull or positive integer expected.");
        throw "incorrect";
    }
    this.x.model.rpar = new ScilabDouble([this.slope],[this.stt],[this.iout])
    var exprs = new ScilabString([this.slope],[this.stt],[this.iout])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    RAMP.prototype.get_popup_title = function RAMP() {
        var set_param_popup_title="Set RAMP block parameters <br> Ramp function <br>";
        return set_param_popup_title
    }
    RAMP.prototype.getDimensionForDisplay = function RAMP(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }


}
