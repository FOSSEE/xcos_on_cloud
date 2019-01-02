function GOTOMO() {

    GOTOMO.prototype.define = function GOTOMO() {

        var model = scicos_model();
        model.sim = new ScilabString(["gotomo"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble();
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.outtyp = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var mo = new modelica_function();
        mo.model = new ScilabString(["gotomo"]);
        mo.inputs = new ScilabString(["p"]);

        var exprs = new ScilabString(["A"], [sci2exp(1)]);
        this.displayParameter = ["A"];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GOTOMO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.in_implicit = new ScilabString(["I"]);
        return new BasicBlock(this.x);
    }
    GOTOMO.prototype.details = function GOTOMO() {
        return this.x;
    }
    GOTOMO.prototype.get = function GOTOMO() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        if(this.tagvis == undefined || this.tagvis == null){
            this.tagvis = "1"
        }
        var options={
            tag:["Tag",this.tag],
            tagvis:["Tag Visibility(1=Local 2=scoped 3= global)",this.tagvis],
        }
        return options
    }
GOTOMO.prototype.set = function GOTOMO() {
    this.tag = arguments[0]["tag"]
    this.tagvis = parseFloat((arguments[0]["tagvis"]))
    if((this.tagvis<1)||(this.tagvis>3)){
        alert("Tag Visibility must be between 1 and 3");
        GOTOMO.get();
    }
    this.x.model.opar = list(new ScilabString([this.tag]))
    this.x.model.ipar = new ScilabDouble([this.tagvis]);
    var exprs = new ScilabString([this.tag],[sci2exp(this.tagvis)])
    this.displayParameter = [this.tag];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

GOTOMO.prototype.get_popup_title = function GOTOMO() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    GOTOMO.prototype.getDimensionForDisplay = function GOTOMO(){
        var dimension = { width: 40, height: 20 };
        return dimension
    }

}
