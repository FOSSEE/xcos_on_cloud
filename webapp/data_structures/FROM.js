function FROM() {

    FROM.prototype.define = function FROM() {

        var model = scicos_model();
        model.sim = new ScilabString(["from"]);
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble();
        model.opar = list(new ScilabString(["A"]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["A"]);
        this.displayParameter = ["A"];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"FROM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 1]), model, exprs, gr_i);
        this.x.graphics.id = new ScilabString(["From"]);
        return new BasicBlock(this.x);
    }
    FROM.prototype.details = function FROM() {
        return this.x;
    }
    FROM.prototype.get = function FROM() {
    if(this.tag == undefined || this.tag == null){
        this.tag = "A"
    }
        var options={
            tag:["Tag",this.tag],
        }
        return options
    }
FROM.prototype.set = function FROM() {
    this.tag = arguments[0]["tag"]
    this.x.model.opar = list(new ScilabString([this.tag]))
    var exprs = new ScilabString([this.tag])
    this.displayParameter = [this.tag];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

FROM.prototype.get_popup_title = function FROM() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    FROM.prototype.getDimensionForDisplay = function FROM(){
        var dimension = { width: 40, height: 20 };
        return dimension
    }

}
