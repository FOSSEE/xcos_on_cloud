function FROMWS_c () {

    FROMWS_c.prototype.define = function FROMWS_c() {
        this.varnam = "V";
        this.Method = 1;
        this.ZC = 1;
        this.OutEnd = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["fromws_c"]), new ScilabDouble([4]));
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.varnam.length],[get_str2code],[this.Method],[this.ZC],[this.OutEnd])
        model.evtin =  new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.firing = new ScilabDouble([0]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false,true]);
        var gr_i = [];
        var exprs = new ScilabString([this.varnam], [this.Method], [this.ZC], [this.OutEnd]);
        var block = new standard_define(new ScilabDouble([3.5,2]),model,exprs,gr_i);
        block.graphics.style = new ScilabString(["FROMWS_c"]);
        block.graphics.in_style = new ScilabString([""]);
        block.graphics.in_label = new ScilabString([""]);
        return block;
    }

}
