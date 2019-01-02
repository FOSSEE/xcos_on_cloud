function CLKGotoTagVisibility() {

    CLKGotoTagVisibility.prototype.define = function CLKGotoTagVisibility() {
        var model = scicos_model();
        model.sim = new ScilabString(["clkgototagvisibility"]);
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
        this.displayParameter = ["A"];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CLKGotoTagVisibility\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CLKGotoTagVisibility.prototype.details = function CLKGotoTagVisibility() {
        return this.x;
    }
CLKGotoTagVisibility.prototype.get = function CLKGotoTagVisibility() {
        if(this.tag == undefined || this.tag == null){
            this.tag = "A"
        }
        var options={
            tag:["GotoTag",this.tag],
        }
        return options
    }
CLKGotoTagVisibility.prototype.set = function CLKGotoTagVisibility() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.displayParameter = [this.tag];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

CLKGotoTagVisibility.prototype.get_popup_title = function CLKGotoTagVisibility() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
CLKGotoTagVisibility.prototype.getDimensionForDisplay = function CLKGotoTagVisibility(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
