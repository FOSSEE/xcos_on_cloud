function END_c() {

    END_c.prototype.define = function END_c() {
        this.tf = 100000000;

        var model = scicos_model();
        model.sim = list(new ScilabString(["scicosexit"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
        model.firing = new ScilabDouble([this.tf]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.tf]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"END_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    END_c.prototype.details = function END_c() {
        return this.x;
    }
END_c.prototype.get = function END_c() {
        var options={
            tf:["Final simulation time",this.tf],
        }
        return options
    }
END_c.prototype.set = function END_c() {
    this.tf = parseFloat((arguments[0]["tf"]))
    this.x.model.firing = new ScilabDouble([this.tf]);
    var exprs = new ScilabString([this.tf])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    END_c.prototype.get_popup_title = function END_c() {
        var set_param_popup_title="Set final simulation time";
        return set_param_popup_title
    }
    END_c.prototype.getDimensionForDisplay = function END_c(){
        var dimension = [40,40];
        return dimension
    }
}
