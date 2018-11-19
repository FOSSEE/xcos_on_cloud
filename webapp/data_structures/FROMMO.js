function FROMMO() {

    FROMMO.prototype.define = function FROMMO() {

        var model = scicos_model();
        model.sim = new ScilabString(["frommo"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble();
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["frommo"]);
        mo.outputs = new ScilabString(["n"]);

        var exprs = new ScilabString(["A"]);
        this.displayParameter = ["A"];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROMMO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.out_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    FROMMO.prototype.details = function FROMMO() {
        return this.x;
    }
    FROMMO.prototype.get = function FROMMO() {
    if(this.tag == undefined || this.tag == null){
        this.tag = "A"
    }
        var options={
            tag:["Tag",this.tag],
        }
        return options
    }
FROMMO.prototype.set = function FROMMO() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.displayParameter = [this.tag];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

FROMMO.prototype.get_popup_title = function FROMMO() {
        var set_param_popup_title="Set parameters <br>";
        return set_param_popup_title
    }
    FROMMO.prototype.getDimensionForDisplay = function FROMMO(){
        var dimension = [40,20];
        return dimension
    }

}
