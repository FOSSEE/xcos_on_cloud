function PROD_f() {

    PROD_f.prototype.get = function PROD_f() {
        alert("parameters could not be set");

    }
PROD_f.prototype.set = function PROD_f() {

	var model = scicos_model();
        model.sim = list(new ScilabString(["prod"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        this.x = new standard_define(new ScilabDouble([1, 1]), model, new ScilabDouble(), new ScilabString());
        return new RoundBlock(this.x);
    }

    PROD_f.prototype.define = function PROD_f() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["prod"]), new ScilabDouble([2]));
        model.in = new ScilabDouble([-1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        this.x = new standard_define(new ScilabDouble([1, 1]), model, new ScilabDouble(), new ScilabString());
        return new RoundBlock(this.x);
    }
    PROD_f.prototype.details = function PROD_f() {
        return this.x;
    }
    PROD_f.prototype.get_popup_title = function PROD_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    PROD_f.prototype.getDimensionForDisplay = function PROD_f(){
        var dimension = { width: 20, height: 20 };
        return dimension
    }
}
