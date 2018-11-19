function GotoTagVisibility() {

    GotoTagVisibility.prototype.define = function GotoTagVisibility() {
	this.tag = "A"
        var model = scicos_model();
        model.sim = new ScilabString(["gototagvisibility"]);
        model.in1 = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.out = new ScilabDouble();
        model.out2 = new ScilabDouble();
        model.evtin = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);
	var n =this.tag;
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GotoTagVisibility\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    GotoTagVisibility.prototype.details = function GotoTagVisibility() {

        return this.x;
    }
    GotoTagVisibility.prototype.get = function GotoTagVisibility() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        var options={
            tag:["GotoTag",this.tag],
        }
        return options
    }
GotoTagVisibility.prototype.set = function GotoTagVisibility() {
    this.tag = arguments[0]["tag"]
var n =this.tag;
        this.displayParameter=[n];
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

GotoTagVisibility.prototype.get_popup_title = function GotoTagVisibility() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    GotoTagVisibility.prototype.getDimensionForDisplay = function GotoTagVisibility(){
        var dimension = [40,40];
        return dimension
    }

}
