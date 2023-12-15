function ConstantVoltage() {

    ConstantVoltage.prototype.define = function ConstantVoltage() {
        this.V = 0.01;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.V]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.sim = new ScilabString(["ConstantVoltage"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["ConstantVoltage"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["V"]), list(new ScilabDouble([this.V])));
        model.equations = mo;

        var exprs = new ScilabString([this.V]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ConstantVoltage\",sz(1),sz(2));"]);
        this.x = standard_define([1.5, 1.1], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    ConstantVoltage.prototype.details = function ConstantVoltage() {
        return this.x;
    }
    ConstantVoltage.prototype.get = function ConstantVoltage() {
        var options={
            V:["V (volt)",this.V],
        }
        return options
    }
ConstantVoltage.prototype.set = function ConstantVoltage() {
    this.V = parseFloat((arguments[0]["V"]))
    this.x.model.rpar = new ScilabDouble([this.V]);
    this.x.model.equations.parameters = list(new ScilabString(["V"]), list(new ScilabDouble([this.V])));
    var exprs = new ScilabString([this.V])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
ConstantVoltage.prototype.get_popup_title = function ConstantVoltage() {
        var set_param_popup_title="Set ConstantVoltage block parameter";
        return set_param_popup_title
    }
    ConstantVoltage.prototype.getDimensionForDisplay = function ConstantVoltage(){
        var dimension = { width: 30, height: 22 };
        return dimension
    }
}
