function NMOS() {

    NMOS.prototype.define = function NMOS() {
        this.W = 20.e-6;
        this.L = 6.e-6;
        this.Beta = 0.041e-3;
        this.Vt = 0.8;
        this.K2 = 1.144;
        this.K5 = 0.7311;
        this.dW = -2.5e-6;
        this.dL = -1.5e-6;
        this.RDS = 1.e+7;

        var model = scicos_model();
        model.sim = new ScilabString(["NMOS"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["NMOS"]);
        mo.outputs = new ScilabString(["D"], ["B"], ["S"]);
        mo.inputs = new ScilabString(["G"]);
        //mo.parameters = list(new ScilabString(["W"], ["L"], ["Beta"], ["Vt"], ["K2"], ["K5"], ["dW"], ["dL"], ["RDS"]), new ScilabDouble([this.W], [this.L], [this.Beta], [this.Vt], [this.K2], [this.K5], [this.dW], [this.dL], [this.RDS]));
        mo.parameters = list(new ScilabString(["W"], ["L"], ["Beta"], ["Vt"], ["K2"], ["K5"], ["dW"], ["dL"], ["RDS"]), list(new ScilabDouble([this.W]),new ScilabDouble([this.L]),new ScilabDouble([this.Beta]),new ScilabDouble([this.Vt]),new ScilabDouble([this.K2]), new ScilabDouble([this.K5]),new ScilabDouble([this.dW]),new ScilabDouble([this.dL]),new ScilabDouble([this.RDS])));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.W], [this.L], [this.Beta], [this.Vt], [this.K2], [this.K5], [this.dW], [this.dL], [this.RDS]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"NMOS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"], ["I"], ["I"]);
        return new BasicBlock(this.x);
    }
    NMOS.prototype.details = function NMOS() {
        return this.x;
    }
    NMOS.prototype.get = function NMOS() {
        var options={
            W:["Width [m]",this.W],
            L:["Length [m]",this.L],
            Beta:["Transconductance parameter [A/(V*V)]",this.Beta],
            Vt:["Zero bias threshold voltage [V]",this.Vt],
            K2:["Bulk threshold parameter",this.K2],
            K5:["Reduction of pinch-off region",this.K5],
            dW:["Narrowing of channel [m]",this.dW],
            dL:["Shortening of channel [m]",this.dL],
            RDS:["Drain-Source-Resistance [Ohm]",this.RDS],
        }
        return options
    }
NMOS.prototype.set = function NMOS() {
    this.W = arguments[0]["W"]
    this.L = arguments[0]["L"]
    this.Beta = arguments[0]["Beta"]
    this.Vt = arguments[0]["Vt"]
    this.K2 = arguments[0]["K2"]
    this.K5 = arguments[0]["K5"]
    this.dW = arguments[0]["dW"]
    this.dL = arguments[0]["dL"]
    this.RDS =arguments[0]["RDS"]
    this.x.model.equations.parameters = list(new ScilabString(["W"], ["L"], ["Beta"], ["Vt"], ["K2"], ["K5"], ["dW"], ["dL"], ["RDS"]), list(new ScilabDouble([this.W]),new ScilabDouble([this.L]),new ScilabDouble([this.Beta]),new ScilabDouble([this.Vt]),new ScilabDouble([this.K2]), new ScilabDouble([this.K5]),new ScilabDouble([this.dW]),new ScilabDouble([this.dL]),new ScilabDouble([this.RDS])));
    var exprs = new ScilabString([this.W.toString().replace(/,/g, " ")],[this.L.toString().replace(/,/g, " ")],[this.Beta.toString().replace(/,/g, " ")],[this.Vt.toString().replace(/,/g, " ")],[this.K2.toString().replace(/,/g, " ")],[this.K5.toString().replace(/,/g, " ")],[this.dW.toString().replace(/,/g, " ")],[this.dL.toString().replace(/,/g, " ")],[this.RDS.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    NMOS.prototype.get_popup_title = function NMOS() {
        var set_param_popup_title="Set NMOS Transistor block parameters";
        return set_param_popup_title
    }
}
