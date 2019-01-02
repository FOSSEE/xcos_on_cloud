function VirtualCLK0() {
    VirtualCLK0.prototype.get = function VirtualCLK0() {
        alert("parameters can not be set")
    }

    VirtualCLK0.prototype.define = function VirtualCLK0() {
        var model = scicos_model();
        model.sim = new ScilabString(["vrtclk0"]);
        model.evtin = new ScilabDouble([1]);
        model.opar = list();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabDouble();
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, new ScilabString([" "]));
        return new BasicBlock(this.x);
    }

    VirtualCLK0.prototype.details = function VirtualCLK0() {
        return this.x;
    }

    VirtualCLK0.prototype.get_popup_title = function VirtualCLK0() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    VirtualCLK0.prototype.getDimensionForDisplay = function VirtualCLK0(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
