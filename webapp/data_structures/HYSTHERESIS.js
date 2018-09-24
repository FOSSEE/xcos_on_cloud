function HYSTHERESIS() {

    HYSTHERESIS.prototype.define = function HYSTHERESIS() {
        this.high_lim = 1;
        this.low_lim = 0;
        this.out_high = 1;
        this.out_low = 0;
        this.in1 = 1;
        this.ipar = 0;
        this.nzz = 1;
        this.rpar = [[1], [0], [1], [0]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["hystheresis"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.nzcross = new ScilabDouble([this.nzz]);
        model.nmode = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(...this.rpar, [Math.sign(this.nzz)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"HYSTHERESIS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    HYSTHERESIS.prototype.details = function HYSTHERESIS() {
        return this.x;
    }
    HYSTHERESIS.prototype.get = function HYSTHERESIS() {
        var options={
            high_lim:["switch on at",this.high_lim],
            low_lim:["switch off at",this.low_lim],
            out_high:["output when on",this.out_high],
            out_low:["output when off",this.out_low],
            nzz:["use zero crossing: yes (1), no (0)",this.nzz],
        }
        return options
    }
    HYSTHERESIS.prototype.set = function HYSTHERESIS() {
    this.high_lim = parseFloat((arguments[0]["high_lim"]))
    this.low_lim = parseFloat((arguments[0]["low_lim"]))
    if(this.low_lim>this.high_lim){
                alert("switch on value must be larger than switch off value");
                HYSTHERESIS.get();
    }
    this.out_high = parseFloat((arguments[0]["out_high"]))
    this.out_low = parseFloat((arguments[0]["out_low"]))
    this.nzz = parseFloat((arguments[0]["nzz"]))
    this.x.model.rpar = new ScilabDouble([this.high_lim],[this.low_lim],[this.out_high],[this.out_low])
    this.nzz = 2;
    this.x.model.nzcross = new ScilabDouble([this.nzz]);
    var exprs = new ScilabString([this.high_lim],[this.low_lim],[this.out_high],[this.out_low],[this.nzz])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    HYSTHERESIS.prototype.get_popup_title = function HYSTHERESIS() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
}
