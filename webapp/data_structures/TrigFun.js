function TrigFun() {

    TrigFun.prototype.define = function TrigFun() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["sin_blk"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString(["sin"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TrigFun\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TrigFun.prototype.details = function TrigFun() {
        return this.x;
    }
    TrigFun.prototype.get = function TrigFun() {
        if(this.fun == undefined || this.fun == null){
            this.fun = "sin"
        }
        var options={
            fun:["Function",this.fun],
        }
        return options
    }
TrigFun.prototype.set = function TrigFun() {
    this.fun = arguments[0]["fun"]
    if((this.fun!="sin")&&(this.fun!="cos")&&(this.fun!="tan")&&(this.fun!="sinh")&&(this.fun!="cosh")&&(this.fun!="tanh")&&(this.fun!="asin")&&(this.fun!="acos")&&(this.fun!="atan")&&(this.fun!="asinh")&&(this.fun!="acosh")&&(this.fun!="atanh"))
    {
        alert("Sorry but "+this.fun +" is not in the list!");
        TrigFun.get();
    }
    model.sim = list(new ScilabString([this.fun+"_blk"]), new ScilabDouble([4]));
    var exprs = new ScilabString([this.fun])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
TrigFun.prototype.get_popup_title = function TrigFun() {
        var set_param_popup_title="Choose among sin, cos, tan, asin<br>             acos, atan, sinh, cosh, tanh, asinh, acosh, atanh";
        return set_param_popup_title
    }
    TrigFun.prototype.getDimensionForDisplay = function TrigFun(){
        var dimension = [80,40];
        return dimension
    }
}
