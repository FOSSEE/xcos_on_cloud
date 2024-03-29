function Diode() {

    Diode.prototype.define = function Diode() {

        this.Ids = 1.e-6;
        this.Vt = 0.04;
        this.Maxexp = 15;
        this.R = 1.e8;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.Ids], [this.Vt], [this.Maxexp], [this.R]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.sim = new ScilabString(["Diode"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Diode"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["Ids", "Vt", "Maxexp", "R"]), list(new ScilabDouble([this.Ids]), new ScilabDouble([this.Vt]), new ScilabDouble([this.Maxexp]), new ScilabDouble([this.R])));
        model.equations = mo;

        var exprs = new ScilabString([this.Ids], [this.Vt], [this.Maxexp], [this.R]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Diode\",sz(1),sz(2));"]);
        this.x = standard_define(new ScilabDouble([2, 1]), model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    Diode.prototype.details = function Diode() {
        return this.x;
    }
    Diode.prototype.get = function Diode() {
        var options={
            Ids:["Saturation cuurent (A)",this.Ids],
            Vt:["Voltage equivalent to temperature (Volt)",this.Vt],
            Maxexp:["Max exponent for linear continuation",this.Maxexp],
            R:["R (ohm)",this.R],
        }
        return options
    }
    Diode.prototype.set = function Diode() {
        this.Ids = parseFloat((arguments[0]["Ids"]))
        this.Vt = parseFloat((arguments[0]["Vt"]))
        this.Maxexp = parseFloat((arguments[0]["Maxexp"]))
        this.R = parseFloat((arguments[0]["R"]))
        this.x.model.rpar = new ScilabDouble([this.Ids],[this.Vt],[this.Maxexp],[this.R])
        this.x.model.equations.parameters = list(new ScilabString(["Ids", "Vt", "Maxexp", "R"]), list(new ScilabDouble([this.Ids]), new ScilabDouble([this.Vt]), new ScilabDouble([this.Maxexp]), new ScilabDouble([this.R])));
        var exprs = new ScilabString([this.Ids],[this.Vt],[this.Maxexp],[this.R])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    Diode.prototype.get_popup_title = function Diode() {
        var set_param_popup_title="Set Diode block parameter";
        return set_param_popup_title
    }
    Diode.prototype.getDimensionForDisplay = function Diode(){
        var dimension = { width: 40, height: 20 };
        return dimension
    }
}
