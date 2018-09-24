function CFSCOPE() {

    CFSCOPE.prototype.get = function CFSCOPE() {

        var options={
            clrs:["Color (>0) or mark (<0) vector (8 entries)",this.clrs.toString().replace(/,/g, " ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos.toString().replace(/,/g, " ")],
            wdim:["Output window sizes", this.wdim.toString().replace(/,/g, " ")],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
            per:["Refresh Period",this.per],
            N:["Buffer size",this.N],
            wu:["Links to view",this.wu],
        };
        return options;
    }


    CFSCOPE.prototype.set = function CFSCOPE() {
        this.clrs = inverse(arguments[0]["clrs"]);
        this.win = parseFloat((arguments[0]["win"]));
        this.wpos = inverse((arguments[0]["wpos"]));
        this.wdim = inverse((arguments[0]["wdim"]));
        this.ymin = parseFloat(arguments[0]["ymin"]);
        this.ymax = parseFloat(arguments[0]["ymax"]);
        this.per = parseFloat(arguments[0]["per"]);
        this.N = parseFloat((arguments[0]["N"]));
        this.wu = parseFloat(arguments[0]["wu"]);
        if((size(this.wpos,"*")!=0)&&(size(this.wpos,"*")!=2)){
                alert("Window position must be [] or a 2 vector");
                CFSCOPE.get();
            }
            if((size(this.wdim,"*")!=0)&&(size(this.wdim,"*")!=2)){
                alert("Window dim must be [] or a 2 vector");
                CFSCOPE.get();
            }
            if(this.win<-1){
                alert("Window number cannot be inferior than -1");
                CFSCOPE.get();
            }
            if(this.per<=0){
                alert("Refresh period must be positive");
                CFSCOPE.get();
            }
            if(this.N<2){
                alert("Buffer size must be at least 2");
                CFSCOPE.get();
            }
            if(this.ymin>=this.ymax){
                alert("Ymax must be greater than Ymin");
                CFSCOPE.get();
            }
            if(this.wu<0){
                alert("Link to view must be positive");
                CFSCOPE.get();
            }
        if(this.wpos.length == 0 || this.wpos[0].length == 0){
            this.wpos = [[-1], [-1]]
        }
        var rpar = new ScilabDouble([0], [this.ymin], [this.ymax], [this.per])
        var ipar = new ScilabDouble([this.win], [1], [this.N], ...this.clrs, ...this.wpos, ...this.wdim, [this.wu.length], [this.wu]);
        var exprs = new ScilabString([this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp(this.wpos)], [sci2exp(this.wdim)], [this.ymin], [this.ymax], [this.per], [this.N], [this.wu]);
        this.x.model.ipar = ipar;
        this.x.model.rpar = rpar;
        this.x.model.dep_ut = new ScilabBoolean([true, false]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    };


    CFSCOPE.prototype.define = function CFSCOPE() {
        this.wu = 1;
        this.win = -1;
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.N = 2;
        this.ymin = -15;
        this.ymax = 15;
        this.per = 30;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cfscope"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], [this.ymin], [this.ymax], [this.per]);
        model.ipar = new ScilabDouble([this.win], [1], [this.N], ...this.clrs, ...this.wpos, ...this.wdim, [1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        var exprs = new ScilabString([this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.ymin], [this.ymax], [this.per], [this.N], [1]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CFSCOPE\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 2 -> 80
        this.x.graphics.style = new ScilabString(["CFSCOPE"]);
        return new BasicBlock(this.x);
    }
    CFSCOPE.prototype.details = function CFSCOPE() {
        return this.x;
    }

    CFSCOPE.prototype.get_popup_title = function CFSCOPE() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }
}
