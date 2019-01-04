function BARXY() {

    BARXY.prototype.define = function BARXY() {
        var model = scicos_model();
        this.xmin = -15;
        this.xmax = 15;
        this.ymin = -15;
        this.ymax = 15;

        model.sim = list(new ScilabString(["BARXY_sim"]), new ScilabDouble([5]));
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.in = new ScilabDouble([-1], [-1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble();
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.ipar = new ScilabDouble([1]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, [], []);
        this.x.graphics.in_implicit = new ScilabString(["E"],["E"]);
        this.x.graphics.out_implicit = new ScilabDouble();
        this.x.graphics.exprs = new ScilabString(["-15"], ["15"], ["-15"], ["15"], ["1"]);
        return new BasicBlock(this.x);
    }
    BARXY.prototype.details = function BARXY() {
        return this.x;
    }
    BARXY.prototype.get = function BARXY() {
        this.thickness = getData(this.x.graphics.exprs)[4]
        this.xmin = getData(this.x.graphics.exprs)[0]
        this.xmax = getData(this.x.graphics.exprs)[1]
        this.ymin = getData(this.x.graphics.exprs)[2]
        this.ymax = getData(this.x.graphics.exprs)[3]

        var options={
            xmin:["Xmin" ,this.xmin],
            xmax:[ "Xmax" ,this.xmax],
            ymin:[ "Ymin" ,this.ymin],
            ymax:[ "Ymax",this.ymax],
            thickness:["Segs Thickness",this.thickness],
        }
        return options
    }
    BARXY.prototype.set = function BARXY() {
        this.xmin = parseFloat((arguments[0]["xmin"]))
        this.xmax = parseFloat((arguments[0]["xmax"]))
        this.ymin = parseFloat((arguments[0]["ymin"]))
        this.ymax = parseFloat((arguments[0]["ymax"]))
        this.thickness = parseFloat((arguments[0]["thickness"]))
        if(this.ymin>=this.ymax){
                alert("Ymax must be greater than Ymin");
                BARXY.get();
        }
            if(this.xmin>=this.xmax){
                alert("Xmax must be greater than Xmin");
                BARXY.get();
            }
            if(this.thickness<=0){
                alert("Thickness must be strictly positive.");
                BARXY.get();
            }
        this.x.model.rpar = new ScilabDouble([this.xmin],[this.xmax],[this.ymin],[this.ymax])
        this.x.model.ipar = new ScilabDouble([this.thickness]);
        var exprs = new ScilabString([this.xmin],[this.xmax],[this.ymin],[this.ymax],[this.thickness])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    BARXY.prototype.get_popup_title = function BARXY() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }
    BARXY.prototype.getDimensionForDisplay = function BARXY(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
