function BPLATFORM() {

    BPLATFORM.prototype.define = function BPLATFORM() {

        this.plen = 2;
        this.csiz = 2;
        this.phi = 0;
        this.xmin = -5;
        this.xmax = 5;
        this.ymin = 0;
        this.ymax = 15;

        var model = scicos_model();
        model.sim = list(new ScilabString(["bplatform2"]), new ScilabDouble([5]));
        model.in = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.rpar = new ScilabDouble([this.plen], [this.csiz], [this.phi], [this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.plen], [this.csiz], [this.phi], [this.xmin], [this.xmax], [this.ymin], [this.ymax]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BPLATFORM\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    BPLATFORM.prototype.details = function BPLATFORM() {

        return this.x;
    }
BPLATFORM.prototype.get = function BPLATFORM() {
         var options={
            plen:["pendulum length",this.plen],
            csiz:["cart size (square side)",this.csiz],
            phi:["slope",this.phi],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:[  "Ymin",this.ymin],
            ymax:[ "Ymax",this.ymax],
        }
        return options
    }
BPLATFORM.prototype.set = function BPLATFORM() {
    this.plen = parseFloat((arguments[0]["plen"]))
    this.csiz = parseFloat((arguments[0]["csiz"]))
    this.phi = parseFloat((arguments[0]["phi"]))
    this.xmin = parseFloat((arguments[0]["xmin"]))
    this.xmax = parseFloat((arguments[0]["xmax"]))
    this.ymin = parseFloat((arguments[0]["ymin"]))
    this.ymax = parseFloat((arguments[0]["ymax"]))
    if((this.plen<=0)||(this.csiz<=0)){
                alert("Pendulum length and cart size must be positive.");
                BPLATFORM.get();
            }
            if(this.ymin>=this.ymax){
                alert("Ymax must be greater than Ymin");
                BPLATFORM.get();
            }
            if(this.xmin>=this.xmax){
                alert("Xmax must be greater than Xmin");
                BPLATFORM.get();
            }
    var rpar = new ScilabDouble([this.plen],[this.csiz],[this.phi],[this.xmin],[this.xmax],[this.ymin],[this.ymax])
    model.rpar = rpar
    var exprs = new ScilabString([this.plen],[this.csiz],[this.phi],[this.xmin],[this.xmax],[this.ymin],[this.ymax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    BPLATFORM.prototype.get_popup_title = function BPLATFORM() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }

}
