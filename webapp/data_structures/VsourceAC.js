function VsourceAC() {

    VsourceAC.prototype.define = function VsourceAC() {
        var model = scicos_model();
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);

        this.VA = 220;

        this.FR = 50;
        model.rpar = new ScilabDouble([this.VA], [this.FR]);
        model.sim = new ScilabString(["VsourceAC"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = modelica_function();
        mo.model = new ScilabString(["VsourceAC"]);
        mo.inputs = new ScilabString(["p"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(["VA"], ["f"]), list(new ScilabDouble([this.VA]), new ScilabDouble([this.FR])));
        model.equations = mo;

        var exprs = new ScilabString([this.VA], [this.FR]);
        var n =this.VA.toString();
        var k= this.FR.toString();
        this.displayParameter=[[n],[k]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VsourceAC\",sz(1),sz(2));"]);

        this.x = standard_define([2, 2], model, exprs, list(gr_i, 0));
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);

        return new BasicBlock(this.x);
    }

    VsourceAC.prototype.details = function VsourceAC() {
        return this.x;
    }
    VsourceAC.prototype.get = function VsourceAC() {
        var options = {
            VA:["Amplitude (Volt)",this.VA],
            FR:["Frequency (Hz)",this.FR],
        }
        return options
    }
    VsourceAC.prototype.set = function VsourceAC() {
        var temp_VA = arguments[0]["VA"];
        var temp_FR = arguments[0]["FR"];
        var VA_1 = inverse(temp_VA);
        var FR_1 = inverse(temp_FR);
        this.VA = temp_VA;
        this.FR = temp_FR;
        this.x.model.rpar = new ScilabDouble([VA_1],[FR_1]);
        this.x.model.equations.parameters = list(new ScilabString(["VA"], ["f"]), list(new ScilabDouble(...VA_1), new ScilabDouble(...FR_1)));
        var n = this.VA;
        var k = this.FR;
        this.displayParameter = [[n],[k]];
        var exprs = new ScilabString([this.VA],[this.FR]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    VsourceAC.prototype.get_popup_title = function VsourceAC() {
        var set_param_popup_title = "Set voltage source parameter";
        return set_param_popup_title
    }
    VsourceAC.prototype.getDimensionForDisplay = function VsourceAC(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
