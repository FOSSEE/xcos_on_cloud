function TIME_f() {
    TIME_f.prototype.get = function TIME_f() {
        alert("You can not set parameters")
    }

    TIME_f.prototype.define = function TIME_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["timblk"]);
        model.out = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TIME_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, [], gr_i);
        return new BasicBlock(this.x);
    }

    TIME_f.prototype.details = function TIME_f() {
        return this.x;
    }

    TIME_f.prototype.get_popup_title = function TIME_f() {
        var set_param_popup_title="Set Parameters";
        return set_param_popup_title
    }
}
