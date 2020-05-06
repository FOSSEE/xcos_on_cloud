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
        var options = {
            L:["Longueur du tube : L (m)",this.L)],
            D:["Diamètre interne du tube : D (m)",this.D],
            lambda:["Coefficient de perte de charge-frottement(S.U) : lambda",this.lambda],
            z1:["Altitude entrée tuyauterie : z1 (m)",this.z1],
            z2:["Altitude sortie tuyauterie : z2 (m)",this.z2],
            p_rho:["Si >0, masse volumique imposée fu fluide : p_rho (kg/m3)",this.p_rho],
        }
        return options
    }
    PerteDP.prototype.set = function PerteDP() {
        var temp_L = arguments[0]["L"];
        var temp_D = arguments[0]["D"];
        var temp_lambda = arguments[0]["lambda"];
        var temp_z1 = arguments[0]["z1"];
        var temp_z2 = arguments[0]["z2"];
        var temp_p_rho = arguments[0]["p_rho"];
        var L_1 = inverse(temp_L);
        var D_1 = inverse(temp_D);
        var lambda_1 = inverse(temp_lambda);
        var z1_1 = inverse(temp_z1);
        var z2_1 = inverse(temp_z2);
        var p_rho_1 = inverse(temp_p_rho);

        this.L = temp_L;
        this.D = temp_D;
        this.lambda = temp_lambda;
        this.z1 = temp_z1;
        this.z2 = temp_z2;
        this.p_rho = temp_p_rho;
        this.x.model.rpar = new ScilabDouble(...L_1,...D_1,...lambda_1,...z1_1,...z2_1,...p_rho_1);
        this.x.model.equations.parameters = list(new ScilabString(["L"], ["D"], ["lambda"], ["z1"], ["z2"], ["p_rho"]), list(new ScilabDouble([L_1]),new ScilabDouble(...D_1),new ScilabDouble(...lambda_1),new ScilabDouble([z1_1]),new ScilabDouble([z2_1]),new ScilabDouble([p_rho_1])));
        var exprs = new ScilabString([this.L],[this.D],[this.lambda],[this.z1],[this.z2],[this.p_rho]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    PerteDP.prototype.get_popup_title = function PerteDP() {
        var set_param_popup_title = "Set block parameters:";
        return set_param_popup_title
    }
    PerteDP.prototype.getDimensionForDisplay = function PerteDP(){
        var dimension = { width: 40, height: 20 };
        return dimension
    }

}
