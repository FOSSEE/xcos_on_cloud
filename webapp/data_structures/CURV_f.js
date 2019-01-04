function CURV_f() {

    CURV_f.prototype.define = function CURV_f() {
        this.xx = [[0],[1],[2]];
        this.yy = [[-5],[5],[0]];
        this.rect = [0,-5,2,5];
        this.axisdata = [[2],[10],[2],[10]];
        this.ipar = new ScilabDouble([size(this.xx, 1)], ...this.axisdata);
        this.rpar = new ScilabDouble(...this.xx, ...this.yy, this.rect);
        this.xmin = 0;
        this.xmax = 2;
        this.ymin = -6;
        this.ymax = 6;

        var model = scicos_model();
        model.sim = new ScilabString(["intplt"]);
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.xx, ...this.yy, ...colon_operator([this.rect]));
        model.ipar = new ScilabDouble([size(this.xx, 1)], ...this.axisdata);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CURV_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }

    CURV_f.prototype.get = function CURV_f() {
        var defaultpoints = [];
        for(var i=0;i<(this.xx.length);i++)
        {
            defaultpoints.push([this.xx[i][0],this.yy[i][0]]);
        }
        var options = {
            graphPoints: defaultpoints,
            xmin:this.xmin,
            xmax:this.xmax,
            ymin:this.ymin,
            ymax:this.ymax
        }
        return options;
    }

    CURV_f.prototype.set = function CURV_f() {

        this.xmin = arguments[0].xmin;
        this.xmax = arguments[0].xmax;
        this.ymin = arguments[0].ymin;
        this.ymax = arguments[0].ymax;
        this.xx = [];
        this.yy = [];

        for(var i=0;i<(arguments[0].graphPoints.length);i++)
        {
            this.xx.push([arguments[0].graphPoints[i][0]]);
        }
        for(var i=0;i<(arguments[0].graphPoints.length);i++)
        {
           this.yy.push([arguments[0].graphPoints[i][1]]);
        }

        this.x.model.sim = new ScilabString(["intplt"]);
        this.x.model.rpar = new ScilabDouble(...this.xx, ...this.yy, ...colon_operator([this.rect]));
        this.x.model.ipar = new ScilabDouble([size(this.xx, '*')], ...this.axisdata);
        return new BasicBlock(this.x);

    }
    CURV_f.prototype.details = function CURV_f() {
        return this.x;
    }

    CURV_f.prototype.get_popup_title = function CURV_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    CURV_f.prototype.getDimensionForDisplay = function CURV_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
