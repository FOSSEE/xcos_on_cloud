function CMSCOPE() {
    CMSCOPE.prototype.define = function CMSCOPE() {
        this.heritance = 0;
        this.nom = "";
        this.win = -1;
        this.in = [[1],[1]];
        this.wdim = [[-1],[-1]];
        this.wpos = [[-1],[-1]];
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.N = 20;
        this.ymin = [[-1], [-5]];
        this.ymax = [[1],[5]];
        this.per = [[30],[30]];
        this.yy = [...transpose(this.ymin), ...transpose(this.ymax)];
        this.period = transpose(this.per);


        var model = scicos_model();
        model.sim = list(new ScilabString(["cmscope"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...this.in);
        model.in2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], ...colon_operator(this.period), ...colon_operator(this.yy));
        model.ipar = new ScilabDouble([this.win], [this.in.length], [this.N], ...this.wpos, ...this.wdim, ...this.in, this.clrs[0], this.clrs[1]);

        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        var exprs = new ScilabString([this.in.toString().replace(/,/g, " ")], [this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp([])], [this.ymin.toString().replace(/,/g, " ")], [this.ymax.toString().replace(/,/g, " ")], [this.per.toString().replace(/,/g, " ")], [this.N], [0], [""]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMSCOPE\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 2 -> 80
        this.x.graphics.style = new ScilabString(["CMSCOPE"]);
        return new BasicBlock(this.x);
    }
    CMSCOPE.prototype.get = function CMSCOPE() {
        var options = {
            in: ["Input ports sizes", this.in],
            clrs: ["Drawing colors (>0) or mark (<0)", this.clrs],
            win: ["Output window number (-1 for automatic)", this.win],
            wpos: ["Output window position", this.wpos],
            wdim: ["Output window sizes", this.wdim],
            ymin: ["Ymin vector", this.ymin],
            ymax: ["Ymax vector", this.ymax],
            per: ["Refresh period", this.per],
            N: ["Buffer size", this.N],
            heritance: ["Accept herited events 0/1", this.heritance],
            nom: ["Name of Scope (label&Id)", this.nom]
        };
        return options;
    }
    CMSCOPE.prototype.set = function CMSCOPE() {

        var temp_in = arguments[0]["in"];
        var temp_clrs = arguments[0]["clrs"];
        this.win = parseFloat(arguments[0]["win"]);
        var temp_wpos = arguments[0]["wpos"];
        var temp_wdim = arguments[0]["wdim"];
        var temp_ymin = arguments[0]["ymin"];
        var temp_ymax = arguments[0]["ymax"];
        var temp_per = arguments[0]["per"];
        this.N = parseFloat(arguments[0]["N"]);
        this.heritance = parseFloat(arguments[0]["heritance"]);
        this.nom = arguments[0]["nom"];
        var in_1 = inverse(temp_in);
        var clrs_1 = inverse(temp_clrs);
        var wpos_1 = inverse(temp_wpos);
        var wdim_1 = inverse(temp_wdim);
        var ymin_1 = inverse(temp_ymin);
        var ymax_1 = inverse(temp_ymax);
        var per_1 = inverse(temp_per);
        if(size(in_1,"*") <= 0){
            alert("Block must have at least one input port");
            throw "incorrect";
        }
        for(var i = 0; i < size(in_1,1); i++){
            for(var j = 0; j < size(in_1,2); j++){
                if(in_1[i][j] <= 0){
                    alert("Port sizes must be positive");
                    throw "incorrect";
                }
            }
        }
        var sum = 0;
        for(var i = 0; i < size(in_1,1); i++){
            for(var j = 0; j < size(in_1,2); j++){
                sum = sum + in_1[i][j];
            }
        }
        if(size(clrs_1,"*") < sum){
            alert("Not enough colors defined (at least "+sum+")");
            throw "incorrect";
        }
        if(size(wpos_1,"*") != 0 && size(wpos_1,"*") != 2){
            alert("Window position must be [] or a 2 vector");
            throw "incorrect";
        }
        if(size(wdim_1,"*") != 0 && size(wdim_1,"*") != 2){
            alert("Window dim must be [] or a 2 vector");
            throw "incorrect";
        }
        if(this.win < -1){
            alert("Window number can''t be  < -1");
            throw "incorrect";
        }
        if(size(per_1,"*") != size(ymin_1,"*")){
            alert("Size of Refresh Period must equal size of Ymin/Ymax vector");
            throw "incorrect";
        }
        for(var i = 0; i < size(per_1,1); i++){
            for(var j = 0;j < size(per_1,2); j++){
                if(per_1[i] <= 0){
                    alert("Refresh Period must be positive");
                    throw "incorrect";
                }
            }
        }
        if(this.N < 2){
            alert("Buffer size must be at least 2");
            throw "incorrect";
        }
        if(ymin_1 >= ymax_1){
            alert("Ymax must be greater than Ymin");
            throw "incorrect";
        }
        if(this.heritance != 0 && this.heritance != 1){
            alert("Accept herited events must be 0 or 1");
            throw "incorrect";
        }
        this.in = temp_in;
        this.clrs = temp_clrs;
        this.wpos = temp_wpos;
        this.wdim = temp_wdim;
        this.ymin = temp_ymin;
        this.ymax = temp_ymax;
        this.per = temp_per;
        var in_2 = colon_operator(in_1);
        this.a = size(in_2,1);
        this.in2 = ones(this.a,1);
        this.x.model.intyp = new ScilabDouble(...ones(this.a,1));
        var io = set_io(this.x.model, this.x.graphics, [...in_1,...this.in2], [], ones(1-this.heritance,1), []);
        if(wpos_1.length == 0){
            this.wpos = [[-1],[-1]];
        }
        if(wdim_1.length == 0){
            this.wdim = [[-1],[-1]];
        }
        this.yy = [...transpose(ymin_1), ...transpose(ymax_1)];
        this.period = transpose(per_1);
        var rpar = new ScilabDouble([0], ...colon_operator(this.period), ...colon_operator(this.yy));
        var ipar = new ScilabDouble([this.win], [in_1.length], [this.N], ...wpos_1, ...wdim_1, ...in_1, clrs_1[0], clrs_1[1],[this.heritance]);
        var exprs = new ScilabString([this.in], [this.clrs], [this.win], [this.wpos], [this.wdim], [this.ymin], [this.ymax], [this.per], [this.N], [this.heritance], [this.nom]);
        this.x.model.ipar = ipar;
        this.x.model.label = new ScilabString([this.nom]);
        this.x.model.evtin = new ScilabDouble(...ones(1-this.heritance,1));
        this.x.graphics.id = new ScilabString([this.nom]);
        this.x.model.rpar = rpar;
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    }

    CMSCOPE.prototype.details = function CMSCOPE() {
        return this.x;
    }

    CMSCOPE.prototype.get_popup_title = function CMSCOPE() {
        var set_param_popup_title = "Set Scope parameters";
        return set_param_popup_title
    }
    CMSCOPE.prototype.getDimensionForDisplay = function CMSCOPE(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
