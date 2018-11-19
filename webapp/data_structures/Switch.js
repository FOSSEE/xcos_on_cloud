function Switch() {

    Switch.prototype.define = function Switch() {
        var model = scicos_model();

        this.Ron = "0.01";
        this.Roff = "100000";
        this.S = [["Ron"], ["Roff"]];

        var scope = {
            Ron:"0.01",
            Roff: "100000"
        }
        this.Z = math.eval('[ Ron ; Roff ]', scope)._data;

        model.sim = new ScilabString(["Switch"]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var mo = new modelica_function();
        mo.model = model.sim;
        mo.inputs = new ScilabString(["p"], ["inp"]);
        mo.outputs = new ScilabString(["n"]);
        mo.parameters = list(new ScilabString(...this.S), new ScilabDouble(...this.Z));
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(getData(mo.inputs), "*"), 1));
        model.out = new ScilabDouble(...ones(size(getData(mo.outputs), "*"), 1));
        model.rpar = new ScilabDouble(...this.Z);

        var exprs = new ScilabString(...this.Z);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Switch\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, list(gr_i, new ScilabDouble(0)));
        this.x.graphics.in_implicit = new ScilabString([["I"], ["E"]]);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }

    Switch.prototype.details = function Switch() {
        return this.x;
    }
    Switch.prototype.get = function Switch() {
        var options={
            Ron:["Resistance in On state (Ohm)",this.Ron],
            Roff:["Resistance in Off state (Ohm)",this.Roff],
        }
        return options
    }
   Switch.prototype.set = function Switch() {
	    this.Ron = (arguments[0]["Ron"])
	    this.Roff = (arguments[0]["Roff"])
	    var scope = {
            Ron:this.Ron,
            Roff:this.Roff
        }
        this.Z = math.eval('[ Ron ; Roff ]', scope)._data;
	    this.x.model.equations.parameters = list(new ScilabString(...this.S), list(new ScilabDouble([this.Ron]), new ScilabDouble([this.Roff])));
	    var exprs = new ScilabString(...this.Z)
	    var model = scicos_model();
	    this.x.graphics.exprs=exprs
	    return new BasicBlock(this.x)
	 }
   Switch.prototype.get_popup_title = function Switch() {
        var set_param_popup_title="Set non-ideal electrical switch parameters";
        return set_param_popup_title
    }
    Switch.prototype.getDimensionForDisplay = function Switch(){
        var dimension = [40,40];
        return dimension
    }
}
