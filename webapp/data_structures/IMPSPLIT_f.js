function IMPSPLIT_f() {

    IMPSPLIT_f.prototype.internal = function IMPSPLIT_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["split"]);
        model.evtin = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble(); // changed
        model.evtout = new ScilabDouble([-1], [-1]) // 1, 1 -> -1, -1 inverse
        model.firing = new ScilabDouble([-1], [-1]); // inverse
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IMPSPLIT_f\",sz(1),sz(2));"]);

        // 1 -> 80
        var block = new standard_define(new ScilabDouble([80, 80]), model, new ScilabDouble(), gr_i);
        block.graphics.style = new ScilabString(["IMPSPLIT_f"]);
        return block;
    }
}
