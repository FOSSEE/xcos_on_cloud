function GOTO() {

    GOTO.prototype.define = function GOTO() {
        var model = scicos_model();
        model.sim = new ScilabString(["goto"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.outtyp = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"], [sci2exp(1)]);
        this.displayParameter = ["A"];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GOTO\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.id = new ScilabString(["Goto"]);
        return new BasicBlock(this.x)
    }

    GOTO.prototype.details = function GOTO() {
        return this.x;
    }
    GOTO.prototype.get = function GOTO() {
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
    GOTO.prototype.set = function GOTO() {
        this.tag = arguments[0]["tag"]
        this.tagvis = parseFloat((arguments[0]["tagvis"]))
        if ((this.tagvis<1)||(this.tagvis>3)){
            alert("Tag Visibility must be between 1 and 3");
            throw "incorrect";
        }
        this.x.model.opar = list(new ScilabString([this.tag]))
        this.x.model.ipar = new ScilabDouble([this.tagvis]);
        var exprs = new ScilabString([this.tag],[sci2exp(this.tagvis)])
	this.displayParameter = [this.tag];
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    GOTO.prototype.get_popup_title = function GOTO() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    GOTO.prototype.getDimensionForDisplay = function GOTO(){
        var dimension = { width: 40, height: 20 };
        return dimension
    }
}
