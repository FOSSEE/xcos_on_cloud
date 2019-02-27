function CLKOUT_f() {

    CLKOUT_f.prototype.internal = function CLKOUT_f() {
        var model = scicos_model();
        var port = 1;

        model.sim = new ScilabString(["output"]);
        model.outtyp = new ScilabDouble();
        model.evtin = new ScilabDouble([-1]); // 1, 1 -> -1, -1
        model.ipar = new ScilabDouble([port]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = ScilabString(["" + port]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKOUT_f\",sz(1),sz(2));"]);
        // 1 -> 80
        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i);

        block.graphics.style = new ScilabString(["CLKOUT_f"]);
        return block;
    }
}
