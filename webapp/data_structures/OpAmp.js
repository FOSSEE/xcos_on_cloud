function OpAmp() {

    OpAmp.prototype.define = function OpAmp() {
        this.S = [];
        this.Z = [];

        var model = scicos_model();
        model.sim = new ScilabString(["OpAmp"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = model.sim;
        mo.inputs = new ScilabString(["in_p"], ["in_n"]);
        mo.outputs = new ScilabString(["out"]);
        mo.parameters = list(new ScilabDouble(), new ScilabDouble());
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));
        model.rpar = new ScilabDouble();

        var exprs = new ScilabString();

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"OpAmp\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 5]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"], ["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    OpAmp.prototype.details = function OpAmp() {
        return this.x;
    }
    OpAmp.prototype.get = function OpAmp() {
        /*if(this.OLGain == undefined){
            this.OLGain = ""
            this.Sath = ""
            this.Satl = ""
        }
        var options={
            OLGain:["Open Loop Gain",this.OLGain],
            Sath:["positive saturation voltage",this.Sath],
            Satl:["Negative saturation voltage",this.Satl],
        }
        return options*/
        alert("parameters can not be changed");
    }
/*OpAmp.prototype.set = function OpAmp() {
    this.OLGain = parseFloat((arguments[0]["OLGain"]))
    this.Sath = parseFloat((arguments[0]["Sath"]))
    this.Satl = parseFloat((arguments[0]["Satl"]))

    this.x.model.equations.parameters = list(new ScilabDouble(), new ScilabDouble([this.OLGain],[this.Sath],[this.Satl]));
    var exprs = new ScilabString([this.OLGain],[this.Sath],[this.Satl])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }*/

    OpAmp.prototype.get_popup_title = function OpAmp() {
        var set_param_popup_title="Set block parameters:";
        return set_param_popup_title
    }
}
