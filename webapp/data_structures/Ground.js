function Ground() {
    Ground.prototype.get = function Ground() {
        alert("Parameters can not be changed")
    }

    Ground.prototype.define = function Ground() {

        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble();
        model.sim = new ScilabString(["Ground"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Ground"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabDouble();
        model.equations = mo;

        var exprs = new ScilabString([""]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Ground\",sz(1),sz(2));"]);
        this.x = standard_define(new ScilabDouble([1, 1]), model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new GroundBlock(this.x);
    }

    Ground.prototype.details = function Ground() {
        return this.x;
    }

    Ground.prototype.get_popup_title = function Ground() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    Ground.prototype.getDimensionForDisplay = function Ground(){
        var dimension = { width: 20, height: 20 };
        return dimension
    }
}
