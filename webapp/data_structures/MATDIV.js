function MATDIV() {

    MATDIV.prototype.define = function MATDIV() {
        var model = scicos_model();

        this.function_name = "mat_div";
        this.funtyp = 4;

        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1], [-2]);
        model.in2 = new ScilabDouble([-3], [-3]);
        model.intyp = new ScilabDouble([1, 1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
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

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATDIV\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }

    MATDIV.prototype.details = function MATDIV() {
        return this.x;
    }

    MATDIV.prototype.get = function MATDIV() {
       if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        var options={
            typ:["Datatype(1=real double  2=Complex)",this.typ],
        }
        return options
    }
    MATDIV.prototype.set = function MATDIV() {
        this.typ = parseFloat((arguments[0]["typ"]))
        if(this.typ == 1){
            this.function_name = "mat_div"
            this.x.model.outtyp = new ScilabDouble([1])
            this.x.model.intyp = new ScilabDouble([1],[1]);
        }
        else if(this.typ == 2){
            this.function_name = "matz_div"
            this.x.model.outtyp = new ScilabDouble([2])
            this.x.model.intyp = new ScilabDouble([2],[2])
        }
        else{
                alert("Datatype is not supported");
                MATDIV.get();
            }
        this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        var exprs = new ScilabString([this.typ])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    MATDIV.prototype.get_popup_title = function MATDIV() {
        var set_param_popup_title="Set MATDIV block";
        return set_param_popup_title
    }
    MATDIV.prototype.getDimensionForDisplay = function MATDIV(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
