function LOOKUP_f() {

    LOOKUP_f.prototype.define = function LOOKUP_f() {

        this.defaultpoints = [[-2,-1],[-1,1],[1,-1],[2,1]];
        this.xmin = -2.5;
        this.xmax = 2.5;
        this.ymin = -1.2;
        this.ymax = 1.2;

        var model = scicos_model();
        model.sim = new ScilabString(["lookup"]);
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([-2], [-1], [1], [2], [-1], [1], [-1], [1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOOKUP_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, [], gr_i);
        return new BasicBlock(this.x);
    }
    LOOKUP_f.prototype.get = function LOOKUP_f() {

        var options = {
            graphPoints: this.defaultpoints,
            xmin:this.xmin,
            xmax:this.xmax,
            ymin:this.ymin,
            ymax:this.ymax
        }
        return options;
    }
    LOOKUP_f.prototype.set = function LOOKUP_f() {

        this.defaultpoints = arguments[0].graphPoints;
        this.xmin = arguments[0].xmin;
        this.xmax = arguments[0].xmax;
        this.ymin = arguments[0].ymin;
        this.ymax = arguments[0].ymax;

        var pointListScilabCompatabile=[];
        for(var i=0;i<(arguments[0].graphPoints.length);i++)
        {
            pointListScilabCompatabile.push([arguments[0].graphPoints[i][0]]);
        }
        for(var i=0;i<(arguments[0].graphPoints.length);i++)
        {
           pointListScilabCompatabile.push([arguments[0].graphPoints[i][1]]);
        }
        this.x.model.rpar = new ScilabDouble(...pointListScilabCompatabile);
        return new BasicBlock(this.x);
    }
    LOOKUP_f.prototype.details = function LOOKUP_f() {
        return this.x;
    }
    LOOKUP_f.prototype.get_popup_title = function LOOKUP_f() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
    LOOKUP_f.prototype.getDimensionForDisplay = function LOOKUP_f(){
        var dimension = [40,40];
        return dimension
    }

}
