function Capacitor() {

    Capacitor.prototype.define = function Capacitor() {

        var model = scicos_model();
        this.C = 0.01
        this.v = 0;
        model.rpar = new ScilabDouble([this.C],[this.v]);
        model.sim = new ScilabString(["Capacitor"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Capacitor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["C", "v"]), list(new ScilabDouble([this.C]), new ScilabDouble([this.v])), new ScilabDouble([0, 1]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.C], [this.v]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Capacitor\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1.1]), model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    Capacitor.prototype.details = function Capacitor() {
        return this.x;
    }
    Capacitor.prototype.get = function Capacitor() {
        var options={
            C:["C (F)",this.C],
            v:["Initial Voltage",this.v],
        }
        return options
    }
Capacitor.prototype.set = function Capacitor() {
    this.C = parseFloat((arguments[0]["C"]))
    this.v = parseFloat((arguments[0]["v"]))
    this.x.model.rpar = new ScilabDouble([this.C]);
    this.x.model.equations.parameters = list(new ScilabString(["C", "v"]), list(new ScilabDouble([this.C]), new ScilabDouble([this.v])), new ScilabDouble([0, 1]));
    var exprs = new ScilabString([this.C],[this.v])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
Capacitor.prototype.get_popup_title = function Capacitor() {
        var set_param_popup_title="Set Capacitor block parameter";
        return set_param_popup_title
    }
    Capacitor.prototype.getDimensionForDisplay = function Capacitor(){
        var dimension = { width: 40, height: 22 };
        return dimension
    }
}
