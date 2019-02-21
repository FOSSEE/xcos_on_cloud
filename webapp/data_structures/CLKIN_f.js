function CLKIN_f() {

    CLKIN_f.prototype.internal = function CLKIN_f() {
        var model = scicos_model();
        var port = 1;

        model.sim = new ScilabString(["input"]);
        model.outtyp = new ScilabDouble(); // changed
        model.evtout = new ScilabDouble([-1]); // 1, 1 -> -1, -1
        model.ipar = new ScilabDouble([port]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([port]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKIN_f\",sz(1),sz(2));"]);
        // 1 -> 80
        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i);

        block.graphics.style = new ScilabString(["CLKIN_f"]);
        return block;
    }
}
