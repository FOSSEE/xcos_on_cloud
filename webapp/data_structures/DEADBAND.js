function DEADBAND() {

    DEADBAND.prototype.define = function DEADBAND() {
        this.zeroc = 1;
        this.minp = -0.5;
        this.maxp = 0.5;
        this.rpar = new ScilabDouble([this.maxp], [this.minp]);

        var model = scicos_model();
        model.sim = list(new ScilabString(["deadband"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([2]);
        model.nmode = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = this.rpar;
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.maxp], [this.minp], [...getData(model.nmode).toString()]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEADBAND\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DEADBAND.prototype.details = function DEADBAND() {
        return this.x;
    }
DEADBAND.prototype.get = function DEADBAND() {
        var options={
            maxp:["End of dead band",this.maxp],
            minp:["Start of dead band",this.minp],
            zeroc:["zero crossing (0:no, 1:yes)",this.zeroc],
        }
        return options
    }
DEADBAND.prototype.set = function DEADBAND() {
    this.maxp = parseFloat((arguments[0]["maxp"]))
    this.minp = parseFloat((arguments[0]["minp"]))
    if(this.maxp<=this.minp){
                alert("Upper limit must be > Lower limit");
                DEADBAND.get();
    }
    this.zeroc = parseFloat((arguments[0]["zeroc"]))
    var rpar = new ScilabDouble([this.maxp],[this.minp])
    this.x.model.rpar = new ScilabDouble(this.maxp,this.minp);
    if(this.zeroc != 0){
            this.x.model.nzcross = new ScilabDouble([2]);
        this.x.model.nmode = new ScilabDouble([1]);
    }
    else{
        this.x.model.nzcross = new ScilabDouble([0]);
        this.x.model.nmode = new ScilabDouble([0]);
    }
    var exprs = new ScilabString([this.maxp],[this.minp],[this.zeroc])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
DEADBAND.prototype.get_popup_title = function DEADBAND() {
        var set_param_popup_title="Set Deadband parameters";
        return set_param_popup_title
    }

}
