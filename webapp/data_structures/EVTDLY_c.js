function EVTDLY_c() {

    EVTDLY_c.prototype.internal = function EVTDLY_c() {
        var dt = 0.1;
        var ff = 0.0;
        var model = scicos_model();
        model.sim = list(new ScilabString(["evtdly4"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([dt], [ff]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([ff]);
        model.dep_ut = new ScilabBoolean([false, false]);
        // changed
        model.outtyp = new ScilabDouble();
        var exprs = new ScilabString([dt], [ff]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTDLY_c\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3,2 -> 80
        block.graphics.style = new ScilabString(["EVTDLY_c"]);
        return block;

    }

    EVTDLY_c.prototype.define = function EVTDLY_c() {
        this.dt = 0.1;
        this.ff = 0.0;
        var model = scicos_model();
        model.sim = list(new ScilabString(["evtdly4"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.dt], [this.ff]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([this.ff]);
        model.dep_ut = new ScilabBoolean([false, false]);
        // changed
        model.outtyp = new ScilabDouble();
        var exprs = new ScilabString([this.dt], [this.ff]);
            var n = this.dt.toString();
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EVTDLY_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3,2 -> 80
        this.x.graphics.style = new ScilabString(["EVTDLY_c"]);
        return new BasicBlock(this.x);

    }

    EVTDLY_c.prototype.details = function EVTDLY_c() {

        return this.x;
    }
    EVTDLY_c.prototype.get = function EVTDLY_c() {
        var options={
            dt:["Delay",this.dt],
            ff:["Date of initial output event",sci2exp(this.ff)],
        }
        return options
    }
EVTDLY_c.prototype.set = function EVTDLY_c() {
    this.dt = parseFloat((arguments[0]["dt"]))
    if(this.dt<=0){
        alert("Delay must be positive");
        EVTDLY_c.get();
    }
    this.ff = parseFloat((arguments[0]["ff"]))
    this.x.model.rpar = new ScilabDouble([this.dt],[this.ff])
    this.x.model.firing = new ScilabDouble([this.ff]);
    var exprs = new ScilabString([this.dt],[sci2exp(this.ff)])
    this.displayParameter = [this.dt];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    EVTDLY_c.prototype.get_popup_title = function EVTDLY_c() {
        var set_param_popup_title="Set Event Delay block parameters <br>Delay  is the delay between an input event <br> and the generated output event <br>Block may initially generate an output event before  <br>any input event. \"Date of initial output event\" <br>gives the date of this event. Set a negative value <br>to disable any output event.";
        return set_param_popup_title
    }
    EVTDLY_c.prototype.getDimensionForDisplay = function EVTDLY_c(){
        var dimension = [60,40];
        return dimension
    }

}
