function PotentialSensor() {
    PotentialSensor.prototype.get = function PotentialSensor() {
        alert("parameters can not be changed")
    }

    PotentialSensor.prototype.define = function PotentialSensor() {

        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble();
        model.sim = new ScilabString(["PotentialSensor"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PotentialSensor"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["v"]);
        model.equations = mo;

        var exprs = new ScilabString([""]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PotentialSensor\",sz(1),sz(2));"]);
        this.x = standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["E"]);
        return new BasicBlock(this.x);
    }
    PotentialSensor.prototype.details = function PotentialSensor() {
        return this.x;
    }
    PotentialSensor.prototype.get_popup_title = function PotentialSensor() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    PotentialSensor.prototype.getDimensionForDisplay = function PotentialSensor(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
