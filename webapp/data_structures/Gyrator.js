function Gyrator() {

    Gyrator.prototype.define = function Gyrator() {
        this.ModelName = "Gyrator";
        this.PrametersValue = [[1],[1]];
        this.ParametersName = [["G1"],["G2"]];
        this.model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[2.5, 90, 2, 0],[2.5, 10, 2, 0],[97.5, 90, -2, 0],[97.5, 10, -2, 0]];
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
        var model = scicos_model();
        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = new ScilabDouble(...this.PrametersValue);
        mo.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...zeros(this.ParametersName)));
        var exprs = new ScilabString(["1"], ["1"]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;Gyrator&quot;,sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = standard_define([2, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(...this.Typein);
        this.x.graphics.out_implicit = new ScilabString(...this.Typeout);
        return new BasicBlock(this.x);
    }
    Gyrator.prototype.details = function Gyrator() {
        return this.x;
    }
    Gyrator.prototype.get = function Gyrator() {
        if(this.G1 == undefined)
            this.G1 = 1
        if(this.G2 == undefined)
            this.G2 = 1

        var options={
            G1:["G1",this.G1],
            G2:["G2",this.G2],
        }
        return options
    }
Gyrator.prototype.set = function Gyrator() {
    this.G1 = parseFloat((arguments[0]["G1"]))
    this.G2 = parseFloat((arguments[0]["G2"]))
   // this.x.model.equations.parameters = list(new ScilabString(["G1"],["G2"]), new ScilabDouble([this.G1],[this.G2]));
   this.x.model.equations.parameters =list(new ScilabString(...this.ParametersName), list(new ScilabDouble([this.G1]),new ScilabDouble([this.G2])), new ScilabDouble(...zeros(this.ParametersName)));
    var exprs = new ScilabString([this.G1],[this.G2])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
Gyrator.prototype.get_popup_title = function Gyrator() {
        var set_param_popup_title="Set Gyrator block parameters: <br> G1: Gyration conductance <br> G2: Gyration conductance";
        return set_param_popup_title
    }
    Gyrator.prototype.getDimensionForDisplay = function Gyrator(){
        var dimension = [40,40];
        return dimension
    }
}
