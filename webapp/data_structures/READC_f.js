function READC_f() {

    READC_f.prototype.define = function READC_f() {
        this.frmt = "d  ";
        this.fname = "foo";
        this.lunit = 0;
        this.N = 20;
        this.M = 1;
        this.rpar = [];
        this.tmask = 0;
        this.swap = 0;
        this.offset = 1;
        this.outmask = 1;
        this.ievt = 0;
        this.nout = size(this.outmask, "*");

        var ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.ievt], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(this.fname), [this.tmask], [this.outmask]);

        var model = scicos_model();
        model.sim = list(new ScilabString(["readc"]), new ScilabDouble([2]));
        model.out = new ScilabDouble([this.nout]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros(this.N * this.M, 1));
        model.ipar = ipar;
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["[]"], [this.outmask], [this.fname], [this.frmt], [this.M], [this.N], [this.offset], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"READC_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    READC_f.prototype.details = function READC_f() {
        return this.x;
    }
     READC_f.prototype.get = function READC_f() {
        var options={
             tmask:["Time Record Selection",this.tmask],
             outmask:["Outputs Record Selection",this.outmask],
             fname:["Input File Name",this.fname],
             frmt:["Input Format",this.frmt],
             M:["Record Size",this.M],
             N:["Buffer Size",this.N],
             offset:["Initial Record Index",this.offset],
             swap:["Swap Mode (0:No, 1:Yes)",this.swap],
         }
         return options
     }
     READC_f.prototype.set = function READC_f() {
         this.tmask = (arguments[0]["tmask"])
         this.outmask = (arguments[0]["outmask"])
         this.fname = arguments[0]["fname"]
         this.frmt = arguments[0]["frmt"]
         this.M = parseFloat((arguments[0]["M"]))
         this.N = parseFloat((arguments[0]["N"]))
         this.offset = parseFloat((arguments[0]["offset"]))
         this.swap = parseFloat((arguments[0]["swap"]))
         this.x.model.firing = new ScilabDouble([-1]);
         this.x.model.firing = new ScilabDouble([0]);
var model = scicos_model();
         var ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.ievt], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(this.fname), [this.tmask], [this.outmask]);
        model.dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros(this.N * this.M, 1));
         this.x.model.dstate = dstate
         this.x.model.ipar = ipar;
         var exprs = new ScilabString([this.tmask.toString().replace(/,/g, " ")],[sci2exp(this.outmask)],[this.fname],[this.frmt],[this.M],[this.N],[this.offset],[this.swap])
         this.x.graphics.exprs=exprs
         return new BasicBlock(this.x)
     }

     READC_f.prototype.get_popup_title = function READC_f() {
        var set_param_popup_title="Set READC_f block parameters <br>Read from C binary file";
        return set_param_popup_title
    }

}
