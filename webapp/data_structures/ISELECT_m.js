function ISELECT_m() {

    ISELECT_m.prototype.define = function ISELECT_m() {
        this.z0 = 1;
        this.nout = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["selector_m"]), new ScilabDouble([4]));
        model.out = new ScilabDouble([-1], [-1]);
        model.out2 = new ScilabDouble([-2], [-2]);
        model.outtyp = new ScilabDouble([1]);
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.firing = new ScilabDouble();
        model.evtin = new ScilabDouble(...ones(this.nout, 1));
        model.dstate = new ScilabDouble([this.z0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp(this.nout)], [sci2exp(this.z0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ISELECT_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    ISELECT_m.prototype.details = function ISELECT_m() {
        return this.x;
    }
    ISELECT_m.prototype.get = function ISELECT_m() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        var options={
            typ:["Datatype(1= real double  2=Complex 3=int32 ...)",this.typ],
            nout:["number of outputs",sci2exp(this.nout)],
            z0:["initial connected output",sci2exp(this.z0)],
        }
        return options
    }
    ISELECT_m.prototype.set = function ISELECT_m() {
        this.typ = parseFloat((arguments[0]["typ"]))
        this.nout = parseFloat((arguments[0]["nout"]))
        this.z0 = parseFloat((arguments[0]["z0"]))
        if(this.z0>this.nout||this.z0<=0 ){
                alert("initial connected input is not a valid input port number");
                ISELECT_m.get();
        }
        else if ((this.typ<1)||(this.typ>8)){
                alert("Datatype is not supported");
                ISELECT_m.get();
        }
        else{
            this.x.model.dstate = new ScilabDouble([this.zo])
            var exprs = new ScilabString([sci2exp(this.typ)],[sci2exp(this.nout)],[sci2exp(this.z0)])
            this.x.graphics.exprs=exprs
        }
        return new BasicBlock(this.x)
    }
    ISELECT_m.prototype.get_popup_title = function ISELECT_m() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    ISELECT_m.prototype.getDimensionForDisplay = function ISELECT_m(){
        var dimension = [60,40];
        return dimension
    }

}
