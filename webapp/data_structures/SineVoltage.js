function SineVoltage() {

    SineVoltage.prototype.define = function SineVoltage() {
        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);

        this.V = 1;
        this.ph = 0;
        this.frq = 1;
        this.offset = 0;
        this.start = 0;

        model.rpar = new ScilabDouble([this.V], [this.ph], [this.frq], [this.offset], [this.start]);
        model.sim = new ScilabString(["SineVoltage"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["SineVoltage"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["V"], ["phase"], ["freqHz"], ["offset"], ["startTime"]), list(new ScilabDouble([this.V]), new ScilabDouble([this.ph]), new ScilabDouble([this.frq]), new ScilabDouble([this.offset]), new ScilabDouble([this.start])));
        model.equations = mo;

        var exprs = new ScilabString([this.V], [this.ph], [this.frq], [this.offset], [this.start]);
	var n =this.V.toString();
        this.displayParameter=[this.V];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SineVoltage\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    SineVoltage.prototype.details = function SineVoltage() {
        return this.x;
    }
    SineVoltage.prototype.get = function SineVoltage() {
        var options={
            V:["Amplitude (Volt)",this.V],
            ph:["phase (rad)",this.ph],
            frq:["Frequency (Hz)",this.frq],
            offset:["Voltageoffset (V)",this.offset],
            start:["Timeoffset (s)",this.start],
        }
        return options
    }
SineVoltage.prototype.set = function SineVoltage() {
    this.V = parseFloat((arguments[0]["V"]))
    this.ph = parseFloat((arguments[0]["ph"]))
    this.frq = parseFloat((arguments[0]["frq"]))
    this.offset = parseFloat((arguments[0]["offset"]))
    this.start = parseFloat((arguments[0]["start"]))
    this.x.model.rpar = new ScilabDouble([this.V],[this.ph],[this.frq],[this.offset],[this.start])
    this.x.model.equations.parameters = list(new ScilabString(["V"], ["phase"], ["freqHz"], ["offset"], ["startTime"]), list(new ScilabDouble([this.V]), new ScilabDouble([this.ph]), new ScilabDouble([this.frq]), new ScilabDouble([this.offset]), new ScilabDouble([this.start])));
    this.displayParameter = [this.V];
    var exprs = new ScilabString([this.V],[this.ph],[this.frq],[this.offset],[this.start])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    SineVoltage.prototype.get_popup_title = function SineVoltage() {
        var set_param_popup_title="Set voltage source parameter";
        return set_param_popup_title
    }
    SineVoltage.prototype.getDimensionForDisplay = function SineVoltage(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
