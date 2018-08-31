function CLKFROM() {
    CLKFROM.prototype.get = function CLKFROM() {
             var options={
                tag:["Tag",this.tag],
            }
            return options
        }
    CLKFROM.prototype.set = function CLKFROM() {
        this.tag = arguments[0]["tag"]
        this.x.model.opar = list(new ScilabString(this.tag))
        this.x.model.evtout = new ScilabDouble([1]);
        this.x.model.firing = new ScilabDouble([-1]);
        var exprs = new ScilabString([this.tag])
        this.displayParameter = [this.tag];
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    CLKFROM.prototype.define = function CLKFROM() {
        this.tag = "A";
        var model = scicos_model();
        model.sim = new ScilabString(["clkfrom"]);
        model.evtout = new ScilabDouble([1]);
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);
        this.displayParameter = ["A"];

        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, new ScilabString([" "]));
        this.x.graphics.id = new ScilabString(["From"]);
        return new BasicBlock(this.x);
    }
    CLKFROM.prototype.details = function CLKFROM() {
        return this.x;
    }
    CLKFROM.prototype.get_popup_title = function CLKFROM() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }

}
