function SELECT_m() {

    SELECT_m.prototype.define = function SELECT_m() {
        this.z0 = 1;
        this.nin = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["selector_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-1]);
        model.in2 = new ScilabDouble([-2], [-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.firing = new ScilabDouble();
        model.evtin = new ScilabDouble(...ones(this.nin, 1));
        model.dstate = new ScilabDouble([this.z0]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp([this.nin])], [sci2exp([this.z0])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SELECT_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SELECT_m.prototype.details = function SELECT_m() {
        return this.x;
    }
    SELECT_m.prototype.get = function SELECT_m() {
        if(this.typ == undefined || this.typ == null )
            this.typ = "1"
        var options={
            typ:["Datatype(1= real double  2=Complex 3=int32 ..)",this.typ],
            nin:["number of inputs",sci2exp(this.nin)],
            z0:["initial connected input",sci2exp(this.z0)],
        }
        return options
    }
SELECT_m.prototype.set = function SELECT_m() {
    this.typ = parseFloat((arguments[0]["typ"]))
    this.nin = parseFloat((arguments[0]["nin"]))
    this.z0 = parseFloat((arguments[0]["z0"]))
    this.x.model.dstate = new ScilabDouble([this.z0])
    var exprs = new ScilabString([sci2exp(this.typ)],[sci2exp(this.nin)],[sci2exp(this.z0)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    SELECT_m.prototype.get_popup_title = function SELECT_m() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    SELECT_m.prototype.getDimensionForDisplay = function SELECT_m(){
        var dimension = [60,40];
        return dimension
    }
}
