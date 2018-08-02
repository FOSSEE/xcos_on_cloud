function Resistor() {

    Resistor.prototype.define = function Resistor() {
        this.R = 0.01;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.R]);
        model.sim = new ScilabString(["resistor"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Resistor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["R"]), list(new ScilabDouble([this.R])));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.R]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Resistor\",sz(1),sz(2));"]);
        this.x = standard_define([2, 1], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    Resistor.prototype.details = function Resistor() {
        return this.x;
    }
    Resistor.prototype.get = function Resistor() {
        var options={
            R:["R (ohm)",this.R],
        }
        return options
    }
Resistor.prototype.set = function Resistor() {
    this.R = parseFloat((arguments[0]["R"]))
    this.x.model.rpar = new ScilabDouble([this.R]);
    this.x.model.equations.parameters = list(new ScilabString(["R"]), list(new ScilabDouble([this.R])));
    var exprs = new ScilabString([this.R])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
Resistor.prototype.get_popup_title = function Resistor() {
        var set_param_popup_title="Set Resistor block parameter";
        return set_param_popup_title
    }
}
