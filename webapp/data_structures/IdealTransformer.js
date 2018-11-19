function IdealTransformer() {

    IdealTransformer.prototype.define = function IdealTransformer() {
        this.ModelName = "IdealTransformer";
        this.PrametersValue = [1];
        this.ParametersName = ["N"];

        var model = scicos_model();

        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[2.5,90,2,0],[2.5,10,2,0],[97.5,90,-2,0],[97.5,10,-2,0]];
        this.PortName = [["p1"],["n1"],["p2"],["n2"]];

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
        model.rpar = new ScilabDouble(this.PrametersValue);
        mo.parameters = list(new ScilabString(this.ParametersName), new ScilabDouble(this.PrametersValue), new ScilabDouble(zeros(getData(this.ParametersName))));
        var exprs = new ScilabString(["1"]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IdealTransformer\",sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2,2]), model, exprs, list(gr_i), new ScilabDouble([0]));
        this.x.graphics.in_implicit = new ScilabDouble(this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(this.Typeout);
        return new BasicBlock(this.x);
    }

    IdealTransformer.prototype.details = function IdealTransformer() {
        return this.x;
    }
    IdealTransformer.prototype.get = function IdealTransformer() {
        if(this.N == undefined)
            this.N = 1
        var options={
            N:["N",this.N],
        }
        return options
    }
IdealTransformer.prototype.set = function IdealTransformer() {
    this.N = parseFloat((arguments[0]["N"]))
    this.x.model.equations.parameters = list(new ScilabString(["N"]), list(new ScilabDouble([this.N])),new ScilabDouble([0]));
    var exprs = new ScilabString([this.N])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
IdealTransformer.prototype.get_popup_title = function IdealTransformer() {
        var set_param_popup_title="Set Transformer block parameters: <br> N: Turn ratio (N1/N2)";
        return set_param_popup_title
    }
    IdealTransformer.prototype.getDimensionForDisplay = function IdealTransformer(){
        var dimension = [40,40];
        return dimension
    }

}
