function IN_f () {

    IN_f.prototype.internal = function IN_f() {
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar=new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);

        var exprs = new ScilabString([sci2exp(this.prt)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IN_f\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);
        block.graphics.style = new ScilabString(["IN_f"]); // changed
        block.graphics.out_implicit = new ScilabString(["E"]);
        block.graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.out_label = new ScilabString([""]);
        return block;
    }

    IN_f.prototype.define = function IN_f() {
        this.prt = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["input"]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-2]);
        model.outtyp = new ScilabDouble([-1]);
        model.ipar = new ScilabDouble([this.prt]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false,false]);

        var exprs = new ScilabString([sci2exp(this.prt)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IN_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([1,1]),model,exprs,gr_i);

        this.explicitInBlock = new ExplicitInBlock(this.x);
        this.displayParameter = [this.explicitInBlock.ordering];
        return this.explicitInBlock;

    }

    IN_f.prototype.details = function IN_f() {
        return this.x;
    }
    IN_f.prototype.get = function IN_f() {
        if(this.prt == undefined || this.prt == null){
            this.prt = "1"
        }
        if(this.otsz == undefined || this.otsz == null){
            this.otsz = "[-1 -2]"
        }
        if(this.ot == undefined || this.ot == null){
            this.ot = "-1"
        }

        var options={
            prt:["Port number",this.prt],
            otsz:["Outport size ([-1 -2] for inherit)",this.otsz],
            ot:["Outport Type (-1 for inherit)",this.ot]
        }
        return options
    }
IN_f.prototype.set = function IN_f() {

    this.prt = parseFloat((arguments[0]["prt"]))
    this.otsz = inverse(arguments[0]["otsz"])
    this.ot = parseFloat((arguments[0]["ot"]))
    if(this.prt<=0){
        alert("Port number must be a positive integer");
        IN_f.get();
    }
    if(size(this.otsz,"*")!=2){
        alert("Outport Size must be a 2 elements vector");
        IN_f.get();
    }
    if(((this.ot<1)||(this.ot>9))&&(this.ot!=-1)){
        alert("Outport type must be a number between 1 and 9, or -1 for inheritance.");
        IN_f.get();
    }
    this.x.model.out = new ScilabDouble([-1]);
    this.x.model.out2 = new ScilabDouble([-2]);
    this.x.model.ipar = new ScilabDouble([this.prt]);
    this.x.model.firing = new ScilabDouble()
    //this.x.model.out = this.otsz[0]
    //this.x.model.out2 = this.otsz[1]
    this.x.model.outtyp = this.ot
    var exprs = new ScilabString()
    this.displayParameter = [this.prt];
    this.x.graphics.exprs=exprs
    return new ExplicitInBlock(this.x)
    }

IN_f.prototype.get_popup_title = function IN_f() {
        var set_param_popup_title="Set Input block parameters";
        return set_param_popup_title
    }
    IN_f.prototype.getDimensionForDisplay = function IN_f(){
        var dimension = [20,20];
        return dimension
    }

}
