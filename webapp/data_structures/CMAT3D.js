function CMAT3D () {

CMAT3D.prototype.define = function CMAT3D() {
    this.cmin = 0;
    this.cmax = 100;
    this.colormap = jetcolormap(25)
    this.size_c = 25;
    this.x = -1;
    this.y = -1;
    this.size_x = 1;
    this.size_y = 1;
    var model = scicos_model()
    model.sim = list(new ScilabString(["cmat3d"]), new ScilabDouble([4]))
    model.in = new ScilabDouble([-1]);
    model.in2 = new ScilabDouble([-2]);
    model.intyp = new ScilabDouble([1]);
    model.evtin = new ScilabDouble([1]);
    model.ipar = new ScilabDouble([this.cmin], [this.cmax], [this.size_c], [this.size_x], [this.size_y])
    model.rpar = new ScilabDouble(...this.colormap, [this.x], [this.y])
    model.blocktype = new ScilabDouble(["c"]);
    model.dep_ut = new ScilabBoolean(true, false)
    var exprs = new ScilabString([this.x.toString().replace(/,/g, " ")], [this.y.toString().replace(/,/g, " ")], ["jetcolormap("+this.size_c+")"], [this.cmin], [this.cmax]);
    var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMAT3D\",sz(1),sz(2));"]), new ScilabDouble([8]));
    this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i)
    return new BasicBlock(this.x);
    }
CMAT3D.prototype.get = function CMAT3D() {
    if(this.vec_x == undefined || this.vec_x == null){
        this.vec_x = "-1"
        this.vec_y = "-1"
    }
        var options={
            vec_x:["Bounds Vector X (-1 for standard)",this.vec_x.toString().replace(/,/g," ")],
            vec_y:["Bounds Vector Y (-1 for standard)",this.vec_y.toString().replace(/,/g," ")],
            size_c:["ColorMap",this.size_c],
            cmin:["Zmin",this.cmin],
            cmax:["Zmax",this.cmax],
        }
        return options
    }
CMAT3D.prototype.set = function CMAT3D() {
    this.vec_x = inverse(arguments[0]["vec_x"])
    this.vec_y = inverse(arguments[0]["vec_y"])
    this.size_c = parseFloat(arguments[0]["size_c"])
    this.colormap = jetcolormap(this.size_c)
    this.cmin = parseFloat((arguments[0]["cmin"]))
    this.cmax = parseFloat((arguments[0]["cmax"]))
    if(size(this.vec_x,"*")!=size(this.vec_y,"*")){
                alert("Vector X and Vector Y must have the same size");
                CMAT3D.get();
    }
            if(this.cmax<=this.cmin){
                alert("Error with minimum and maximum value");
                CMAT3D.get();
            }
    this.size_x = size(this.vec_x,"*")
    var ipar = new ScilabDouble([this.cmin],[this.cmax],[this.size_c],[this.size_x])
    var rpar = new ScilabDouble(...this.colormap,...this.vec_x,...this.vec_y)
    this.x.model.ipar = ipar
    this.x.model.rpar = rpar
    var exprs = new ScilabString([this.vec_x.toString().replace(/,/g, " ")],[this.vec_y.toString().replace(/,/g, " ")],["jetcolormap("+this.size_c+")"],[this.cmin],[this.cmax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
CMAT3D.prototype.details = function CMAT3D() {
    return this.x
    }

CMAT3D.prototype.get_popup_title = function CMAT3D() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }

}
