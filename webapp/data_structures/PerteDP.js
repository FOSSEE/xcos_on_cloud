function PerteDP() {

    PerteDP.prototype.define = function PerteDP() {
        this.L = 10;
        this.D = 0.2;
        this.lambda = 0.03;
        this.z1 = 0;
        this.z2 = 0;
        this.p_rho = 0;

        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.L], [this.D], [this.lambda], [this.z1], [this.z2], [this.p_rho]);
        model.sim = new ScilabString(["PerteDP"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PerteDP"]);
        mo.inputs = new ScilabString(["C1"]);
        mo.outputs = new ScilabString(["C2"]);
        mo.parameters = list(new ScilabString(["L"], ["D"], ["lambda"], ["z1"], ["z2"], ["p_rho"]), new ScilabDouble([this.L], [this.D], [this.lambda], [this.z1], [this.z2], [this.p_rho]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.L], [this.D], [this.lambda], [this.z1], [this.z2], [this.p_rho]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PerteDP\",sz(1),sz(2));"]);
        this.x = standard_define([2, 1], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    PerteDP.prototype.details = function PerteDP() {
        return this.x;
    }
    PerteDP.prototype.get = function PerteDP() {
        var options={
            L:["Longueur du tube : L (m)",this.L.toString().replace(/,/g," ")],
            D:["Diamètre interne du tube : D (m)",this.D.toString().replace(/,/g," ")],
            lambda:["Coefficient de perte de charge-frottement(S.U) : lambda",this.lambda.toString().replace(/,/g," ")],
            z1:["Altitude entrée tuyauterie : z1 (m)",this.z1.toString().replace(/,/g," ")],
            z2:["Altitude sortie tuyauterie : z2 (m)",this.z2.toString().replace(/,/g," ")],
            p_rho:["Si >0, masse volumique imposée fu fluide : p_rho (kg/m3)",this.p_rho.toString().replace(/,/g," ")],
        }
        return options
    }
PerteDP.prototype.set = function PerteDP() {
    this.L = inverse(arguments[0]["L"])
    this.D = inverse(arguments[0]["D"])
    this.lambda = inverse(arguments[0]["lambda"])
    this.z1 = inverse(arguments[0]["z1"])
    this.z2 = inverse(arguments[0]["z2"])
    this.p_rho = inverse(arguments[0]["p_rho"])
    this.x.model.rpar = new ScilabDouble(...this.L,...this.D,...this.lambda,...this.z1,...this.z2,...this.p_rho)
    this.x.model.equations.parameters = list(new ScilabString(["L"], ["D"], ["lambda"], ["z1"], ["z2"], ["p_rho"]), list(new ScilabDouble([this.L]),new ScilabDouble(...this.D),new ScilabDouble(...this.lambda),new ScilabDouble([this.z1]),new ScilabDouble([this.z2]),new ScilabDouble([this.p_rho])));
    var exprs = new ScilabString([this.L.toString().replace(/,/g, " ")],[this.D.toString().replace(/,/g, " ")],[this.lambda.toString().replace(/,/g, " ")],[this.z1.toString().replace(/,/g, " ")],[this.z2.toString().replace(/,/g, " ")],[this.p_rho.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    PerteDP.prototype.get_popup_title = function PerteDP() {
        var set_param_popup_title="Set block parameters:";
        return set_param_popup_title
    }

}
