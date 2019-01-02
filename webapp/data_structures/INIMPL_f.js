function INIMPL_f() {

    INIMPL_f.prototype.define = function INIMPL_f() {
        var model = scicos_model();
        model.sim = new ScilabString(["inimpl"]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([1]);
        model.dep_ut = new ScilabBoolean([false, false]);
        model.blocktype = new ScilabString(["c"]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["PORT"]);
        mo.outputs = new ScilabString(["n"]);
        mo.inputs = new ScilabDouble();
        model.equations = mo;

        var exprs = new ScilabString(["1"]);
        var n ="1";
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;INIMPL_f&quot;,sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1, 1]), model, exprs, gr_i);
        this.x.graphics.out_implicit = new ScilabString(["I"]);

        this.implicitInBlock = new ImplicitInBlock(this.x);
        this.displayParameter = [this.implicitInBlock.ordering];
        return this.implicitInBlock;
    }
    INIMPL_f.prototype.details = function INIMPL_f() {
        return this.x;
    }
    INIMPL_f.prototype.get = function INIMPL_f() {
        if(this.prt == undefined || this.prt == null)
            this.prt = "1"
        var options={
            prt:["Port Number",this.prt],
        }
        return options
    }
INIMPL_f.prototype.set = function INIMPL_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    this.prt = Math.floor(this.prt)
    if(this.prt<=0){
        alert("Wrong value for ''Port Number'' parameter: "+this.prt+"\nStrictly positive integer expected.");
        INIMPL_f.get();
    }
    this.x.model.ipar = new ScilabDouble([this.prt]);
    var exprs = new ScilabString([this.prt])
    this.x.graphics.exprs=exprs
    return new ImplicitInBlock(this.x)
    }

INIMPL_f.prototype.get_popup_title = function INIMPL_f() {
        var set_param_popup_title="Set INIMPL_f block parameters";
        return set_param_popup_title
    }
    INIMPL_f.prototype.getDimensionForDisplay = function INIMPL_f(){
        var dimension = { width: 20, height: 20 };
        return dimension
    }

}
