function CCS() {
    CCS.prototype.get = function CCS() {
        alert("parameters can not be changed")
    }

    CCS.prototype.define = function CCS() {
        this.ModelName = "CCS";
        this.PrametersValue = new ScilabDouble();
        this.ParametersName = new ScilabDouble();
        var model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[2,50,1,0],[70,98,2,0],[70,2,-2,0]];
        this.PortName = [["Iin"],["p"],["n"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }

            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }

        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = this.PrametersValue;
        mo.parameters = list(this.ParametersName, this.PrametersValue, new ScilabDouble(...zeros(getData(this.ParametersName))));
        var exprs = new ScilabDouble();
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CCS\",sz(1),sz(2));"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2.1, 3]), model, exprs, list(new ScilabString([gr_i]), new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabDouble(this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(this.Typeout);
        return new BasicBlock(this.x);
    }

    CCS.prototype.details = function CCS() {
        return this.x;
    }

    CCS.prototype.get_popup_title = function CCS() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    CCS.prototype.getDimensionForDisplay = function CCS(){
        var dimension = { width: 42, height: 60 };
        return dimension
    }

}
