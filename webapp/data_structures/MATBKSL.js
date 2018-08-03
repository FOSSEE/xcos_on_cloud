function MATBKSL() {

    MATBKSL.prototype.define = function MATBKSL() {
        this.function_name = "mat_bksl";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-1]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.intyp = new ScilabDouble([1, 1]);
        model.out = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-3]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATBKSL\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATBKSL.prototype.details = function MATBKSL() {
        return this.x;
    }
    MATBKSL.prototype.get = function MATBKSL() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        var options={
            typ:["Datatype (1=real double  2=Complex)",this.typ],
        }
        return options
    }
    MATBKSL.prototype.set = function MATBKSL() {
        this.typ = parseFloat((arguments[0]["typ"]))
        if(this.typ == 1){
            this.function_name = "mat_bksl"
            this.x.model.intyp = new ScilabDouble([1],[1])
            this.x.model.outtyp = new ScilabDouble([1])

        }
        else if(this.typ == 2){
            this.function_name = "matz_bksl"
            this.x.model.intyp = new ScilabDouble([2],[2])
            this.x.model.outtyp = new ScilabDouble([2])

        }
        else{
                alert("Datatype is not supported");
                MATBKSL.get();
            }
        this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        var exprs = new ScilabString([this.typ])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    MATBKSL.prototype.get_popup_title = function MATBKSL() {
        var set_param_popup_title="Set MATBKSL block";
        return set_param_popup_title
    }
}
