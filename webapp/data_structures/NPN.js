function NPN() {

    NPN.prototype.define = function NPN() {
        this.Bf = 50;
        this.Br = 0.1;
        this.Is = 1.0e-16;
        this.Vak = 0.02;
        this.Tauf = 0.12e-9;
        this.Taur = 5.0e-9;
        this.Ccs = 1.0e-12;
        this.Cje = 0.4e-12;
        this.Cjc = 0.5e-12;
        this.Phie = 0.8;
        this.Me = 0.4;
        this.Phic = 0.8;
        this.Mc = 0.333;
        this.Gbc = 1.0e-15;
        this.Gbe = 1.0e-15;
        this.Vt = 0.02585;
        this.EMinMax = 40;

        var ModelName = "NPN";
        var ParametersValue = [[this.Bf], [this.Br], [this.Is], [this.Vak], [this.Tauf], [this.Taur], [this.Ccs], [this.Cje], [this.Cjc], [this.Phie], [this.Me], [this.Phic], [this.Mc], [this.Gbc], [this.Gbe], [this.Vt], [this.EMinMax]];
        var ParametersName = [["Bf"], ["Br"], ["Is"], ["Vak"], ["Tauf"], ["Taur"], ["Ccs"], ["Cje"], ["Cjc"], ["Phie"], ["Me"], ["Phic"], ["Mc"], ["Gbc"], ["Gbe"], ["Vt"], ["EMinMax"]];

        var Typein = [];
        var Typeout = [];
        var MI = [];
        var MO = [];
        var P = [[100, 90, -2, 0], [0, 50, 2, 0], [100, 10, -2, 0]];
        var PortName = [["C"], ["B"], ["E"]];

        for (var i = 0; i < size(P, "r"); i++) {
            if (P[i][2] == 1) {
                Typein.push(["E"]);
                MI.push(PortName[i]);
            } else if (P[i][2] == 2) {
                Typein.push(["I"]);
                MI.push(PortName[i]);
            } else if (P[i][2] == -1) {
                Typeout.push(["E"]);
                MO.push(PortName[i]);
            } else if (P[i][2] == -2) {
                Typeout.push(["I"]);
                MO.push(PortName[i]);
            }
        }

        var model = scicos_model();
        var mo = new modelica_function();
        model.sim = new ScilabString([ModelName]);
        mo.inputs = new ScilabString(...MI);
        mo.outputs = new ScilabString(...MO);
        model.rpar = new ScilabDouble(...ParametersValue);
        mo.parameters = list(new ScilabString(...ParametersName), new ScilabDouble(...ParametersValue), new ScilabDouble(...zeros(ParametersName)));
        var exprs = new ScilabString(...ParametersValue);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;NPN&quot;,sz(1),sz(2));"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(MO, "*"), 1));
        this.x = standard_define([2, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabString(...Typein);
        this.x.graphics.out_implicit = new ScilabString(...Typeout);
        return new BasicBlock(this.x);
    }

    NPN.prototype.details = function NPN() {
        return this.x;
    }

    NPN.prototype.get = function NPN() {
        var options={
            Bf:["Bf  : Forward beta",this.Bf],
            Br:["Br  : Reverse beta",this.Br],
            Is:["Is  : Transport saturation current",this.Is],
            Vak:["Vak : Early voltage (inverse), 1/Volt",this.Vak],
            Tauf:["Tauf: Ideal forward transit time",this.Tauf],
            Taur:["Taur: Ideal reverse transit time",this.Taur],
            Ccs:["Ccs : Collector-substrat(ground) cap.",this.Ccs],
            Cje:["Cje : Base-emitter zero bias depletion cap.",this.Cje],
            Cjc:["Cjc : Base-coll. zero bias depletion cap.",this.Cjc],
            Phie:["Phie: Base-emitter diffusion voltage",this.Phie],
            Me:["Me  : Base-emitter gradation exponent",this.Me],
            Phic:["Phic: Base-collector diffusion voltage",this.Phic],
            Mc:["Mc  : Base-collector gradation exponent",this.Mc],
            Gbc:["Gbc : Base-collector conductance",this.Gbc],
            Gbe:["Gbe : Base-emitter conductance",this.Gbe],
            Vt:["Vt  : Voltage equivalent of temperature",this.Vt],
            EMinMax:["EMinMax: if x > EMinMax, the exp(x) function is linearized",this.EMinMax],
        }
        return options
    }

    NPN.prototype.set = function NPN() {
        this.Bf = parseFloat(arguments[0]["Bf"]);
        this.Br = parseFloat(arguments[0]["Br"]);
        this.Is = parseFloat(arguments[0]["Is"]);
        this.Vak = parseFloat(arguments[0]["Vak"]);
        this.Tauf = parseFloat(arguments[0]["Tauf"]);
        this.Taur = parseFloat(arguments[0]["Taur"]);
        this.Ccs = parseFloat(arguments[0]["Ccs"]);
        this.Cje = parseFloat(arguments[0]["Cje"]);
        this.Cjc = parseFloat(arguments[0]["Cjc"]);
        this.Phie = parseFloat(arguments[0]["Phie"]);
        this.Me = parseFloat(arguments[0]["Me"]);
        this.Phic = parseFloat(arguments[0]["Phic"]);
        this.Mc = parseFloat(arguments[0]["Mc"]);
        this.Gbc = parseFloat(arguments[0]["Gbc"]);
        this.Gbe = parseFloat(arguments[0]["Gbe"]);
        this.Vt = parseFloat(arguments[0]["Vt"]);
        this.EMinMax = parseFloat(arguments[0]["EMinMax"]);

        var ParametersValue = [[this.Bf], [this.Br], [this.Is], [this.Vak], [this.Tauf], [this.Taur], [this.Ccs], [this.Cje], [this.Cjc], [this.Phie], [this.Me], [this.Phic], [this.Mc], [this.Gbc], [this.Gbe], [this.Vt], [this.EMinMax]];
        var ParametersName = [["Bf"], ["Br"], ["Is"], ["Vak"], ["Tauf"], ["Taur"], ["Ccs"], ["Cje"], ["Cjc"], ["Phie"], ["Me"], ["Phic"], ["Mc"], ["Gbc"], ["Gbe"], ["Vt"], ["EMinMax"]];

        var model = this.x.model;
        var mo = model.equations;
        model.rpar = new ScilabDouble(...ParametersValue);
        mo.parameters = list(new ScilabString(...ParametersName), new ScilabDouble(...ParametersValue), new ScilabDouble(...zeros(ParametersName)));
        var exprs = new ScilabString(...ParametersValue);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    }

    NPN.prototype.get_popup_title = function NPN() {
        var set_param_popup_title="Set NPN block parameters:";
        return set_param_popup_title
    }

    NPN.prototype.getDimensionForDisplay = function NPN(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
