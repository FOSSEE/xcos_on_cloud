function M_SWITCH() {

    M_SWITCH.prototype.define = function M_SWITCH() {
        this.in1 = [[1], [-1], [-1]];
        this.ipar = [[1], [3]];
        this.nin = 3;

        var model = scicos_model();
        model.sim = list(new ScilabString(["mswitch"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...this.in1);
        model.out = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble(...this.ipar);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.nin], ...this.ipar);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"M_SWITCH\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    M_SWITCH.prototype.details = function M_SWITCH() {
        return this.x;
    }
    M_SWITCH.prototype.get = function M_SWITCH() {
        if(this.base == undefined || this.base == null){
            this.base = "1"
        }
        if(this.rule == undefined || this.rule == null){
            this.rule = "3"
        }
        var options={
            nin:["number of inputs",this.nin],
            base:["zero base indexing (0), otherwise 1",this.base],
            rule:["rounding rule: int (0), round (1), ceil (2), floor (3)",this.rule],
        }
        return options
    }
M_SWITCH.prototype.set = function M_SWITCH() {
    this.nin = parseFloat((arguments[0]["nin"]))
    this.base = parseFloat((arguments[0]["base"]))
    this.rule = parseFloat((arguments[0]["rule"]))
    this.nin = Math.floor(this.nin)
    this.base = Math.floor(this.base)
    if(this.nin<1){
        alert("Number of inputs must be >=1 ");
        M_SWITCH.get();
    }
    else if((this.base!=1)&&(this.base!=0)){
        alert("base indexing must be 1 or 0");
        M_SWITCH.get();
    }
    else if((this.rule!=1)&&(this.rule!=0)&&(this.rule!=2)&&(this.rule!=3)){
        alert("incorrect rounding rule");
        M_SWITCH.get();
    }
    this.x.model.in = new ScilabDouble(...this.in1);
    this.x.model.ipar = new ScilabDouble([this.base],[this.rule])
    var exprs = new ScilabString([this.nin],[this.base],[this.rule])
    this.x.graphics.exprs=exprs

    return new BasicBlock(this.x)
    }
    M_SWITCH.prototype.get_popup_title = function M_SWITCH() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    M_SWITCH.prototype.getDimensionForDisplay = function M_SWITCH(){
        var dimension = [50,40];
        return dimension
    }
}
