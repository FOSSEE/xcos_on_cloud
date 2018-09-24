function MAXMIN() {

    MAXMIN.prototype.define = function MAXMIN() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["minmax"]), new ScilabDouble([4]));
        model.out = new ScilabDouble([1]);
        model.in = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.ipar = new ScilabDouble([0]);

        var exprs = new ScilabString(...math.transpose([[2, 1, 1]]));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MAXMIN\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["MAXMIN;displayedLabel=MAX"]);
        return new BasicBlock(this.x);
    }

    MAXMIN.prototype.details = function MAXMIN() {
        return this.x;
    }
MAXMIN.prototype.get = function MAXMIN() {
    if(this.mm == undefined || this.mm == null){
        this.mm = "2"
        this.nin = "1"
        this.zcr = "1"
    }
        var options={
            mm:["Min (1) or Max (2) ",this.mm],
            nin:["Number of input vectors (1 or 2)",this.nin],
            zcr:["zero-crossing (1: yes, 0",this.zcr],
        }
        return options
    }
MAXMIN.prototype.set = function MAXMIN() {
    this.mm = parseFloat((arguments[0]["mm"]))
    this.nin = parseFloat((arguments[0]["nin"]))
    if((this.nin!=1)&&(this.nin!=2)){
                alert("Wrong number of inputs, only 1 and 2 allowed");
                MAXMIN.get();
    }
    this.zcr = parseFloat((arguments[0]["zcr"]))
    if(this.zcr != 0){
        this.zcr = -1
    }
    if(this.mm != 1){
        this.mm = 2
    }

    if(this.nin == 1)
        var io = check_io(this.x.model,this.x.graphics,[-1],[1],[],[])
    else
        var io = check_io(this.x.model,this.x.graphics,[[-1],[-1]],[-1],[],[])

    this.x.model.nzcross = new ScilabDouble([this.zcr]);
    if(this.nin == 1){
        this.x.model.nmode = new ScilabDouble([Math.abs(this.zcr)]);
    }
    else{
        this.x.model.nmode = new ScilabDouble([this.zcr]);
    }
    this.x.model.ipar = new ScilabDouble([this.mm]);
    if(this.mm=1){
        this.x.graphics.style = new ScilabDouble(["MAXMIN;displayedLabel=" + "MIN"]);
    }
    else{
        this.x.graphics.style = new ScilabDouble(["MAXMIN;displayedLabel=" + "MAX"]);
    }
    var exprs = new ScilabString([this.mm],[this.nin],[this.zcr])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

MAXMIN.prototype.get_popup_title = function MAXMIN() {
        var set_param_popup_title="Set Max/Min block parameters";
        return set_param_popup_title
    }

}
