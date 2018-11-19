function TRASH_f() {

    TRASH_f.prototype.get = function TRASH_f() {
        alert("no get for this block")
    }

    TRASH_f.prototype.define = function TRASH_f() {
        this.in1 = -1;

        var model = scicos_model();
        model.sim = new ScilabString(["trash"]);
        model.in = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([" "]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TRASH_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TRASH_f.prototype.details = function TRASH_f() {
        return this.x;
    }
    TRASH_f.prototype.get_popup_title = function TRASH_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    TRASH_f.prototype.getDimensionForDisplay = function TRASH_f(){
        var dimension = [40,40];
        return dimension
    }
}
