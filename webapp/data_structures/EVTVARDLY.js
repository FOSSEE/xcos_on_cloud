function EVTVARDLY() {

    EVTVARDLY.prototype.define = function EVTVARDLY() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["evtvardly"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([parseFloat(getData(model.firing), 10)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTVARDLY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EVTVARDLY.prototype.details = function EVTVARDLY() {
        return this.x;
    }
    EVTVARDLY.prototype.get = function EVTVARDLY() {
    if(this.fir == undefined || this.fir == null)
        this.fir = -1
        var options={
            fir:["Initial event firing time (<0 if absent)",this.fir],
        }
        return options
    }
EVTVARDLY.prototype.set = function EVTVARDLY() {
    this.fir = parseFloat((arguments[0]["fir"]))
    this.x.model.firing = new ScilabDouble([this.fir]);
    var exprs = new ScilabString([this.fir])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
EVTVARDLY.prototype.get_popup_title = function EVTVARDLY() {
        var set_param_popup_title="Set parameter of variable event delay";
        return set_param_popup_title
    }
    EVTVARDLY.prototype.getDimensionForDisplay = function EVTVARDLY(){
        var dimension = [60,40];
        return dimension
    }
}
