function CSCOPXY() {

    CSCOPXY.prototype.define = function CSCOPXY() {
        this.win = -1;
        this.clrs = 4;
        this.siz = 1;
        this.wdim = [[600], [400]];
        this.wpos = [[-1], [-1]];
        this.N = 2;
        this.xmin = -15;
        this.xmax = 15;
        this.ymin = -15;
        this.ymax = 15;
        this.nbr_curves = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cscopxy"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.xmin], [this.xmax], [this.ymin], [this.ymax]);
        model.ipar = new ScilabDouble([this.win], [1], [this.N], [this.clrs], [this.siz], [1], ...this.wpos, ...this.wdim, [this.nbr_curves]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.nbr_curves], [sci2exp(this.clrs)], [sci2exp(this.siz)], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.xmin], [this.xmax], [this.ymin], [this.ymax], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CSCOPXY.prototype.details = function CSCOPXY() {
        return this.x;
    }
    CSCOPXY.prototype.get = function CSCOPXY() {

        var options={
            nbr_curves:["Number of Curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs.toString().replace(/,/g," ")],
            siz:["line or mark size",this.siz.toString().replace(/,/g," ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos.toString().replace(/,/g," ")],
            wdim:["Output window sizes",this.wdim.toString().replace(/,/g," ")],
            xmin:["Xmin",this.xmin],
            xmax:["Xmax",this.xmax],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
            N:["Buffer size",this.N],
        }
        return options
    }
CSCOPXY.prototype.set = function CSCOPXY() {
    this.nbr_curves = parseFloat((arguments[0]["nbr_curves"]))
    this.clrs = parseFloat((arguments[0]["clrs"]))
    this.siz = parseFloat((arguments[0]["siz"]))
    this.win = parseFloat((arguments[0]["win"]))
    this.wpos = inverse(arguments[0]["wpos"])
    this.wdim = inverse(arguments[0]["wdim"])
    this.xmin = parseFloat((arguments[0]["xmin"]))
    this.xmax = parseFloat((arguments[0]["xmax"]))
    this.ymin = parseFloat((arguments[0]["ymin"]))
    this.ymax = parseFloat((arguments[0]["ymax"]))
    this.N = parseFloat((arguments[0]["N"]))
    if((size(this.wpos,"*")!=0)&&(size(this.wpos,"*")!=2)){
                alert("Window position must be [] or a 2 vector");
                CSCOPXY.get();
            }
            if((size(this.wdim,"*")!=0)&&(size(this.wdim,"*")!=2)){
                alert("Window dim must be [] or a 2 vector");
                CSCOPXY.get();
            }
            if(this.nbr_curves<=0){
                alert("Number of Curves cannot be negative or null");
                CSCOPXY.get();
            }
            if(this.win<-1){
                alert("Window number cannot be inferior than -1");
                CSCOPXY.get();
            }
            if(this.N<1){
                alert("Buffer size must be at least 1");
                CSCOPXY.get();
            }
            if((this.N==1)&&(this.clrs>0)){
                alert("Buffer size must be at least 2");
                CSCOPXY.get();
            }
            if(this.ymin>=this.ymax){
                alert("Ymax must be greater than Ymin");
                CSCOPXY.get();
            }
            if(this.xmin>=this.xmax){
                alert("Xmax must be greater than Xmin");
                CSCOPXY.get();
            }
    if(this.wpos.length == 0){
        this.wpos = [[-1],[-1]];
    }
    if(this.wdim.length == 0){
        this.wdim = [[-1],[-1]];
    }
    var rpar = new ScilabDouble([this.xmin],[this.xmax],[this.ymin],[this.ymax])
    var ipar = new ScilabDouble([this.win],[1],[this.N],[this.clrs],[this.siz],[1],...this.wpos,...this.wdim,[this.nbr_curves])
    this.x.model.rpar = rpar
    this.x.model.ipar = ipar
    var exprs = new ScilabString([this.nbr_curves],[sci2exp(this.clrs)],[sci2exp(this.siz)],[this.win],["[]"],[sci2exp(this.wdim)],[this.xmin],[this.xmax],[this.ymin],[this.ymax],[this.N])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    CSCOPXY.prototype.get_popup_title = function CSCOPXY() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }

}
