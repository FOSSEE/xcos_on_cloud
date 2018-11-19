function CLKINV_f() {

    CLKINV_f.prototype.define = function CLKINV_f() {
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.evtout = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.prt]);
        var n =this.prt.toString();
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKINV_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        return new EventInBlock(this.x);
    }
    CLKINV_f.prototype.internal = function CLKINV_f() {
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.evtout = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.outtyp = new ScilabDouble();

        var exprs = new ScilabString([this.prt]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKINV_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["CLKINV_f"]);
        return block;
    }
    CLKINV_f.prototype.details = function CLKINV_f() {
        return this.x;
    }
CLKINV_f.prototype.get = function CLKINV_f() {
        var options={
            prt:["Event input port",this.prt],
        }
        return options
    }
CLKINV_f.prototype.set = function CLKINV_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    if(this.prt<=0){
        alert("Wrong values for 'Port Number' parameter: "+this.prt+"\nStrictly positive integer expected.");
        CLKINV_f_get();
    }
    this.x.model.ipar = new ScilabDouble([this.prt]);
    this.x.model.evtout = new ScilabDouble([1]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new EventInBlock(this.x)
    }

CLKINV_f.prototype.get_popup_title = function CLKINV_f() {
        var set_param_popup_title="Set CLKINV_f block parameters";
        return set_param_popup_title
    }
    CLKINV_f.prototype.getDimensionForDisplay = function CLKINV_f(){
        var dimension = [20,20];
        return dimension
    }

}
