function SINBLK_f() {
    SINBLK_f.prototype.get = function SINBLK_f() {
        alert("parameters can not be set")
    }

    SINBLK_f.prototype.define = function SINBLK_f() {

        var model = scicos_model();
        model.sim = new ScilabString(["sinblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([" "]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SINBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SINBLK_f.prototype.details = function SINBLK_f() {
        return this.x;
    }

    SINBLK_f.prototype.get_popup_title = function SINBLK_f() {
        var set_param_popup_title="Set Parameters";
        return set_param_popup_title
    }
    SINBLK_f.prototype.getDimensionForDisplay = function SINBLK_f(){
        var dimension = [40,40];
        return dimension
    }
}
