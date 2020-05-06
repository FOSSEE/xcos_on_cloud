function PuitsP() {

    PuitsP.prototype.define = function PuitsP() {
        this.P0 = 100000;
        this.T0 = 290;
        this.H0 = 100000;
        this.option_temperature = 1;

        var model = scicos_model();
        model.rpar = new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]);
        model.sim = new ScilabString(["Puits"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Puits"]);
        mo.inputs = new ScilabString(["C"]);
        mo.outputs = new ScilabDouble();
        mo.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));

        var exprs = new ScilabString([this.P0], [this.T0], [this.H0], [this.option_temperature]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"PuitsP\",sz(1),sz(2));"]);
        this.x = standard_define([2.5, 2], model, exprs, list(gr_i, new ScilabDouble(0)));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    PuitsP.prototype.details = function PuitsP() {
        return this.x;
    }
    PuitsP.prototype.get = function PuitsP() {
        var options = {
            P0:["Pression de la source : P0 (Pa)",this.P0],
            T0:["Temperature de la source : T0 (K)",this.T0],
            H0:["Enthalpie spécifique de la source : H0 (J/kg)",this.H0],
            option_temperature:["1:température fixée - 2:enthalpie fixée : option_temperature",this.option_temperature],
        }
        return options
    }
    PuitsP.prototype.set = function PuitsP() {
        var temp_P0 = arguments[0]["P0"];
        var temp_T0 = arguments[0]["T0"];
        var temp_H0 = arguments[0]["H0"];
        var temp_option_temperature = arguments[0]["option_temperature"];
        var P0_1 = inverse(temp_P0);
        var T0_1 = inverse(temp_T0);
        var H0_1 = inverse(temp_H0);
        var option_temperature_1 = inverse(temp_option_temperature);
        this.P0 = temp_P0;
        this.T0 = temp_T0;
        this.H0 = temp_H0;
        this.option_temperature = temp_option_temperature;
        this.x.model.rpar = new ScilabDouble(...P0_1,...T0_1,...H0_1,...option_temperature_1);
        this.x.model.equations.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), list(new ScilabDouble([P0_1]),new ScilabDouble([T0_1]),new ScilabDouble([H0_1]),new ScilabDouble([option_temperature_1])));
        var exprs = new ScilabString([this.P0],[this.T0],[this.H0],[this.option_temperature]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    PuitsP.prototype.get_popup_title = function PuitsP() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title
    }
    PuitsP.prototype.getDimensionForDisplay = function PuitsP(){
        var dimension = { width: 50, height: 40 };
        return dimension
    }
}
