function OUTIMPL_f() {

    OUTIMPL_f.prototype.define = function OUTIMPL_f() {
        var model = scicos_model();
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([1]);

        this.prt = 1;
        model.sim = new ScilabString(["outimpl"]);
        model.ipar = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PORT"]);
        mo.inputs = new ScilabString(["n"]);
        mo.outputs = new ScilabDouble();
        model.equations = mo;

        var exprs = new ScilabString(["1"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;OUTIMPL_f&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);

        this.implicitOutBlock = new ImplicitOutBlock(this.x);
        this.displayParameter = [this.implicitOutBlock.ordering];
        return this.implicitOutBlock;
    }
    OUTIMPL_f.prototype.details = function OUTIMPL_f() {
        return this.x;
    }
    OUTIMPL_f.prototype.get = function OUTIMPL_f() {
    if(this.prt == undefined || this.prt == null){
        this.prt = "1"
    }
        var options={
            prt:["Port number",this.prt],
        }
        return options
    }
OUTIMPL_f.prototype.set = function OUTIMPL_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    if(this.prt<=0){
        alert("Wrong value for 'Port Number' parameter: "+this.prt+"\nStrictly positive integer expected.");
        OUTIMPL_f.get();
    }
    this.x.model.ipar = new ScilabDouble([this.prt]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new ImplicitOutBlock(this.x)
    }

    OUTIMPL_f.prototype.get_popup_title = function OUTIMPL_f() {
        var set_param_popup_title="Set OUTIMPL_f block parameters:";
        return set_param_popup_title
    }
    OUTIMPL_f.prototype.getDimensionForDisplay = function OUTIMPL_f(){
        var dimension = [20,20];
        return dimension
    }
}
