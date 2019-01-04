function SourceP() {

    SourceP.prototype.define = function SourceP() {
        var model = scicos_model();

        this.P0 = 300000;
        this.T0 = 290;
        this.H0 = 100000;
        this.option_temperature = 1;

        model.rpar = new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]);
        model.sim = new ScilabString(["Source"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["Source"]);
        mo.inputs = new ScilabDouble();
        mo.outputs = new ScilabString(["C"]);
        mo.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), new ScilabDouble([this.P0], [this.T0], [this.H0], [this.option_temperature]));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));

        var exprs = new ScilabString([this.P0], [this.T0], [this.H0], [this.option_temperature]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SourceP\",sz(1),sz(2));"]);
        this.x = new standard_define([2.5, 2], model, exprs, list(gr_i, new ScilabDouble([0])));
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    SourceP.prototype.details = function SourceP() {
        return this.x;
    }
    SourceP.prototype.get = function SourceP() {
        var options={
            P0:["Pression de la source : P0 (Pa)",this.P0.toString().replace(/,/g," ")],
            T0:["Temperature de la source : T0 (K)",this.T0.toString().replace(/,/g," ")],
            H0:["Enthalpie spécifique de la source : H0 (J/kg)",this.H0.toString().replace(/,/g," ")],
            option_temperature:["1:température fixée - 2:enthalpie fixée : option_temperature",this.option_temperature.toString().replace(/,/g," ")],
        }
        return options
    }
SourceP.prototype.set = function SourceP() {
    this.P0 = inverse(arguments[0]["P0"])
    this.T0 = inverse(arguments[0]["T0"])
    this.H0 = inverse(arguments[0]["H0"])
    this.option_temperature = inverse(arguments[0]["option_temperature"])
    this.x.model.rpar = new ScilabDouble(...this.P0,...this.T0,...this.H0,...this.option_temperature)
    this.x.model.equations.parameters = list(new ScilabString(["P0"], ["T0"], ["H0"], ["option_temperature"]), list(new ScilabDouble([this.P0]),new ScilabDouble([this.T0]),new ScilabDouble([this.H0]),new ScilabDouble([this.option_temperature])));
    var exprs = new ScilabString([this.P0.toString().replace(/,/g, " ")],[this.T0.toString().replace(/,/g, " ")],[this.H0.toString().replace(/,/g, " ")],[this.option_temperature.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

  SourceP.prototype.get_popup_title = function SourceP() {
        var set_param_popup_title="Set Parameters";
        return set_param_popup_title
    }
    SourceP.prototype.getDimensionForDisplay = function SourceP(){
        var dimension = { width: 50, height: 40 };
        return dimension
    }

}
