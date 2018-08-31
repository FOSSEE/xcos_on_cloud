function ABS_VALUE () {

ABS_VALUE.prototype.define = function ABS_VALUE() {
    this.zcr = -1;
    var model = scicos_model()
    model.sim = list(new ScilabString(["absolute_value"]), new ScilabDouble([4]))
    model.in = new ScilabDouble([this.zcr]);
    model.out = new ScilabDouble([this.zcr]);
    model.nzcross = new ScilabDouble([this.zcr]);
    model.nmode = new ScilabDouble([this.zcr]);
    model.blocktype = new ScilabDouble(["c"]);
    model.dep_ut = new ScilabBoolean(true, false)
    var exprs = new ScilabString([1])
    var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"ABS_VALUE\",sz(1),sz(2));"]), new ScilabDouble([8]));
    this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
    this.x.graphics.style = new ScilabString(["ABS_VALUE"]);
    return new BasicBlock(this.x);
    }
ABS_VALUE.prototype.get = function ABS_VALUE() {
         var options={
            zcr:["use zero_crossing (1: yes) (0:no)",this.zcr],
        }
        return options
    }
ABS_VALUE.prototype.set = function ABS_VALUE() {
    this.zcr = parseFloat((arguments[0]["zcr"]))
    if(this.zcr!=0){
        this.x.model.nmode = new ScilabDouble([-1]);
        this.x.model.nzcross = new ScilabDouble([-1]);
    }
    else{
        this.x.model.nmode = new ScilabDouble([0]);
        this.x.model.nzcross = new ScilabDouble([0]);
    }
    var exprs = new ScilabString([this.zcr])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
ABS_VALUE.prototype.details = function ABS_VALUE() {
    return this.x
    }
ABS_VALUE.prototype.get_popup_title = function ABS_VALUE() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
}
