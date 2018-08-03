function Bache() {

    Bache.prototype.define = function Bache() {
        this.in1 = 2;
        this.out = 3;

        var model = scicos_model();
        model.in = new ScilabDouble(math.transpose(math.range(-1, -this.in1, -1, true)));
        model.out = new ScilabDouble(math.transpose(math.range(-1, -this.out, -1, true)));

        this.Patm = 1.013E5;
        this.A = 1;
        this.ze1 = 40;
        this.ze2 = 0;
        this.zs1 = 40;
        this.zs2 = 0;
        this.z0 = 30;
        this.T0 = 290;
        this.p_rho = 0;

        model.rpar = new ScilabDouble([this.Patm], [this.A], [this.ze1], [this.ze2], [this.zs1], [this.zs2], [this.z0], [this.T0], [this.p_rho]);
        model.sim = new ScilabString(["Bache"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Bache"]);
        mo.inputs = new ScilabString(["Ce1", "Ce2"]);
        mo.outputs = new ScilabString(["Cs1", "Cs2", "yNiveau"]);
        mo.parameters = list(new ScilabString(["Patm"], ["A"], ["ze1"], ["ze2"], ["zs1"], ["zs2"], ["z0"], ["T0"], ["p_rho"]), new ScilabDouble([this.Patm], [this.A], [this.ze1], [this.ze2], [this.zs1], [this.zs2], [this.z0], [this.T0], [this.p_rho]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), '*'), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), '*'), 1));

        var exprs = new ScilabString([this.Patm.toString()], [this.A.toString()], [this.ze1.toString()], [this.ze2.toString()], [this.zs1.toString()], [this.zs2.toString()], [this.z0.toString()], [this.T0.toString()], [this.p_rho.toString()]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Bache\",sz(1),sz(2));"]);
        this.x = new standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"], ["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"], ["I"], ["E"]);
        return new BasicBlock(this.x);
    }
    Bache.prototype.details = function Bache() {
        return this.x;
    }
Bache.prototype.get = function Bache() {
        var options={
            Patm:["Pression dans le ciel de la bache : Patm (Pa)",this.Patm.toString().replace(/,/g," ")],
            A:["Section de la bache : A (m2)",this.A.toString().replace(/,/g," ")],
            ze1:["Altitude du piquage d entrée 1: ze1 (m)",this.ze1.toString().replace(/,/g," ")],
            ze2:["Altitude du piquage d entrée 2: ze2 (m)",this.ze2.toString().replace(/,/g," ")],
            zs1:["Altitude du piquage de sortie 1: zs1 (m)",this.zs1.toString().replace(/,/g," ")],
            zs2:["Altitude du piquage de sortie 2: zs2 (m)",this.zs2.toString().replace(/,/g," ")],
            z0:["Altitude initiale du fluide : z0 (m)",this.z0.toString().replace(/,/g," ")],
            T0:["Température initiale du fluide : T0 (K)",this.T0.toString().replace(/,/g," ")],
            p_rho:["Si >0, masse volumique imposée du fluide : p_rho (kg/m3)",this.p_rho.toString().replace(/,/g," ")],
        }
        return options
    }
Bache.prototype.set = function Bache() {
    this.Patm = parseFloat(arguments[0]["Patm"])
    this.A = parseFloat(arguments[0]["A"])
    this.ze1 = parseFloat(arguments[0]["ze1"])
    this.ze2 = parseFloat(arguments[0]["ze2"])
    this.zs1 = parseFloat(arguments[0]["zs1"])
    this.zs2 = parseFloat(arguments[0]["zs2"])
    this.z0 = parseFloat(arguments[0]["z0"])
    this.T0 = parseFloat(arguments[0]["T0"])
    this.p_rho = parseFloat(arguments[0]["p_rho"])
    this.x.model.rpar = new ScilabDouble([this.Patm],[this.A],[this.ze1],[this.ze2],[this.zs1],[this.zs2],[this.z0],[this.T0],[this.p_rho])
    this.x.model.equations.parameters= list(new ScilabString(["Patm"], ["A"], ["ze1"], ["ze2"], ["zs1"], ["zs2"], ["z0"], ["T0"], ["p_rho"]), list(new ScilabDouble([this.Patm]),new ScilabDouble([this.A]),new ScilabDouble([this.ze1]), new ScilabDouble([this.ze2]), new ScilabDouble([this.zs1]), new ScilabDouble([this.zs2]), new ScilabDouble([this.z0]), new ScilabDouble([this.T0]), new ScilabDouble([this.p_rho])));
    var exprs = new ScilabString([this.Patm.toString().replace(/,/g, " ")],[this.A.toString().replace(/,/g, " ")],[this.ze1.toString().replace(/,/g, " ")],[this.ze2.toString().replace(/,/g, " ")],[this.zs1.toString().replace(/,/g, " ")],[this.zs2.toString().replace(/,/g, " ")],[this.z0.toString().replace(/,/g, " ")],[this.T0.toString().replace(/,/g, " ")],[this.p_rho.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    Bache.prototype.get_popup_title = function Bache() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }

}
