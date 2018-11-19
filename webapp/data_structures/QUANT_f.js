function QUANT_f() {

    QUANT_f.prototype.define = function QUANT_f() {
        this.pas = 0.1;
        this.meth = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["qzrnd"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.rpar = new ScilabDouble([this.pas]);
        model.ipar = new ScilabDouble([this.meth]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.pas], [this.meth]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"QUANT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    QUANT_f.prototype.details = function QUANT_f() {
        return this.x;
    }
    QUANT_f.prototype.get = function QUANT_f() {
        var options={
            pas:["Step",this.pas],
            meth:["Quantization Type (1-4)",this.meth],
        }
        return options
    }
    QUANT_f.prototype.set = function QUANT_f() {
        this.pas = parseFloat((arguments[0]["pas"]))
        this.meth = parseFloat((arguments[0]["meth"]))
        if((this.meth<1)||(this.meth>4)){
                alert("Quantization Type must be from 1 to 4");
                QUANT_f.get();
        }
        this.x.model.rpar = new ScilabDouble([this.pas])
        this.x.model.ipar = new ScilabDouble([this.meth]);
        switch(this.meth){
            case 1:
                this.x.model.sim = new ScilabDouble(["qzrnd"])
                break;
            case 2:
                this.x.model.sim = new ScilabDouble(["qztrn"])
                break;
            case 3:
                this.x.model.sim = new ScilabDouble(["qzflr"])
                break;
            case 4:
                this.x.model.sim = new ScilabDouble(["qzcel"])
                break;
        }
        var exprs = new ScilabString([this.pas], [this.meth])
        this.x.graphics.exprs = exprs
        return new BasicBlock(this.x)
    }
    QUANT_f.prototype.get_popup_title = function QUANT_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    QUANT_f.prototype.getDimensionForDisplay = function QUANT_f(){
        var dimension = [40,40];
        return dimension
    }
}
