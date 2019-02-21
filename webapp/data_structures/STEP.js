function STEP() {
    STEP.prototype.internal = function STEP(arg1,arg2,arg3) {
        this.a = arg1
        this.b = arg2;
        this.c = arg3;
        this.rpar = [[this.b],[this.c]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["step_func"]),new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.firing = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...convertarray(convertarray(this.rpar)).map( x => [x]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.a],...this.rpar);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"STEP\",sz(1),sz(2));"]);
        var block=new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);

        block.graphics.style = new ScilabString(["STEP"]);
        block.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.in_label = new ScilabString([""]);
        return block;
    }
}
