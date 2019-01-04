function OUT_f () {

    OUT_f.prototype.internal = function OUT_f() {
        this.n = -1;
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);
        var exprs = new ScilabString([sci2exp(this.prt)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"OUT_f\",sz(1),sz(2));"]);
        var block=new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);
        block.graphics.style = new ScilabString(["OUT_f"]);  // changed
        block.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.in_label = new ScilabString([""]);
        block.graphics.in_implicit = new ScilabString(["E"]);
        return block;
    }

    OUT_f.prototype.define = function OUT_f() {
        this.n = -1;
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["output"]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.ipar=new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);

        var exprs = new ScilabString([sci2exp(this.prt)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"OUT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);
        this.x.graphics.style = new ScilabString(["OUT_f"]);

        this.explicitOutBlock = new ExplicitOutBlock(this.x);
        this.displayParameter = [this.explicitOutBlock.ordering];
        return this.explicitOutBlock;
    }

    OUT_f.prototype.details = function OUT_f() {
        return this.x;
    }
    OUT_f.prototype.get = function OUT_f() {
        var options={
            prt:["Port number",this.prt],
        }
        return options
    }
OUT_f.prototype.set = function OUT_f() {
    this.prt = parseFloat((arguments[0]["prt"]))
    if(this.prt<=0){
        alert("Wrong value for 'Port Number' parameter: "+this.prt+"\nStrictly positive integer expected.");
        OUT_f.get();
    }
    this.x.model.ipar = new ScilabDouble([this.prt]);
    var exprs = new ScilabString([this.prt])
    this.displayParameter = [this.prt];
    this.x.graphics.exprs=exprs
    return new ExplicitOutBlock(this.x)
    }

    OUT_f.prototype.get_popup_title = function OUT_f() {
        var set_param_popup_title="Set OUT_f block parameters:";
        return set_param_popup_title
    }
    OUT_f.prototype.getDimensionForDisplay = function OUT_f(){
        var dimension = { width: 20, height: 20 };
        return dimension
    }
}
