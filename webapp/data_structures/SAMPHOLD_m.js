function SAMPHOLD_m() {

    SAMPHOLD_m.prototype.define = function SAMPHOLD_m() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["samphold4_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.evtin = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = [sci2exp(1)];

        var gr_i = ["xstringb(orig(1),orig(2),\"SAMPHOLD_m\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([2, 2]), model, label, gr_i);
        return new BasicBlock(this.x);

    }

    SAMPHOLD_m.prototype.details = function SAMPHOLD_m() {
        return this.x;
    }
    SAMPHOLD_m.prototype.get = function SAMPHOLD_m() {
    if(this.it == 'undefined' || this.it == null){
        this.it = "1";
    }
    var options={
        it:["Datatype(1=real double 2=Complex 3=int32 ...)",this.it],
    }
    return options
    }
    SAMPHOLD_m.prototype.set = function SAMPHOLD_m() {
    this.it = parseFloat((arguments[0]["it"]))
    if((this.it<1)||(this.it>8)){
                alert("Datatype is not supported");
                throw "incorrect";
    }
    this.x.model.intyp = new ScilabDouble([this.it])
    this.x.model.outtyp = new ScilabDouble([this.it])
    this.in = [getData(this.x.model.in),getData(this.x.model.in2)]
    var io = set_io(this.x.model,this.x.graphics,this.in,this.in,[1],[])
    var exprs = new ScilabString([this.it])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    SAMPHOLD_m.prototype.get_popup_title = function SAMPHOLD_m() {
        var set_param_popup_title="Set parameters Block";
        return set_param_popup_title
    }
    SAMPHOLD_m.prototype.getDimensionForDisplay = function SAMPHOLD_m(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
