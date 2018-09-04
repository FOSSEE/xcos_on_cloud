function CMSCOPE() {
    CMSCOPE.prototype.get = function CMSCOPE() {
        // if(this.wpos == undefined || this.wpos == null)
        //     this.wpos = )
        // if(this.wdim == undefined || this.wdim == null)
        //     this.wdim = getData(this.x.graphics.exprs[4])

        var options = {
            in1: ["Input ports sizes", this.in1.toString().replace(/,/g, " ")],
            clrs: ["Drawing colors (>0) or mark (<0)", this.clrs.toString().replace(/,/g, " ")],
            win: ["Output window number (-1 for automatic)", this.win],
            wpos: ["Output window position", this.wpos.toString().replace(/,/g," ")],
            wdim: ["Output window sizes", this.wdim.toString().replace(/,/g," ")],
            ymin: ["Ymin vector", this.ymin.toString().replace(/,/g, " ")],
            ymax: ["Ymax vector", this.ymax.toString().replace(/,/g, " ")],
            per: ["Refresh period", this.per.toString().replace(/,/g, " ")],
            N: ["Buffer size", this.N],
            heritance: ["Accept herited events 0/1", this.heritance],
            nom: ["Name of Scope (label&Id)", this.nom]
        };
        return options;
    }
    CMSCOPE.prototype.set = function CMSCOPE() {

        this.in1 = inverse(arguments[0]["in1"]);
        this.clrs = inverse(arguments[0]["clrs"]);
        this.win = parseFloat((arguments[0]["win"]));
        this.wpos = inverse(arguments[0]["wpos"])
        this.wdim = inverse(arguments[0]["wdim"])
        this.ymin = inverse(arguments[0]["ymin"]);
        this.ymax = inverse(arguments[0]["ymax"]);
        this.per = inverse(arguments[0]["per"]);
        this.N = parseFloat((arguments[0]["N"]));
        this.heritance = parseFloat((arguments[0]["heritance"]));
        this.nom = arguments[0]["nom"];
         if(size(this.in1,"*")<=0){
                alert("Block must have at least one input port");
                CMSCOPE.get();
            }
            for(var i=0;i<size(this.in1,1);i++)
            {
                for(var j=0;j<size(this.in1,2);j++)
                {
                    if(this.in1[i][j]<=0)
                    {
                        alert("Port sizes must be positive");
                        CMSCOPE.get();
                    }
                }
            }
            var sum=0;
            for(var i=0;i<size(this.in1,1);i++)
            {
                for(var j=0;j<size(this.in1,2);j++)
                {
                    sum=sum+this.in1[i][j];
                }
            }
            if(size(this.clrs,"*")<sum){
                alert("Not enough colors defined (at least "+sum+")");
                CMSCOPE.get();
            }
            if((size(this.wpos,"*")!=0)&&(size(this.wpos,"*")!=2)){
                alert("Window position must be [] or a 2 vector");
                CMSCOPE.get();
            }
            if((size(this.wdim,"*")!=0)&&(size(this.wdim,"*")!=2)){
                alert("Window dim must be [] or a 2 vector");
                CMSCOPE.get();
            }
            if(this.win<-1){
                alert("Window number can''t be  < -1");
                CMSCOPE.get();
            }
            if(size(this.per,"*")!=size(this.ymin,"*")){
                alert("Size of Refresh Period must equal size of Ymin/Ymax vector");
                CMSCOPE.get();
            }
            for(var i=0;i<size(this.per,1);i++){
            for(var j=0;j<size(this.per,2);j++){
                if(this.per[i]<=0){
                    alert("Refresh Period must be positive");
                    CMSCOPE.get();
                }
            }
            }
            if(this.N<2){
                alert("Buffer size must be at least 2");
                CMSCOPE.get();
            }
            if(this.ymin>=this.ymax){
                alert("Ymax must be greater than Ymin");
                CMSCOPE.get();
            }
            if((this.heritance!=0)&&(this.heritance!=1)){
                alert("Accept herited events must be 0 or 1");
                CMSCOPE.get();
            }
        this.in1 = colon_operator(this.in1)
        this.a = size(this.in1,1)
        this.in2 = ones(this.a,1)
        this.x.model.intyp = new ScilabDouble(...ones(this.a,1))
        var io = set_io(this.x.model,this.x.graphics,[...this.in1,...this.in2],[],ones(1-this.heritance,1),[])
        if(this.wpos.length == 0)
            this.wpos = [[-1],[-1]]
        if(this.wdim.length == 0)
            this.wdim = [[-1],[-1]]
        this.yy = [...transpose(this.ymin), ...transpose(this.ymax)];
        this.period = transpose(this.per);
        var rpar = new ScilabDouble([0], ...colon_operator(this.period), ...colon_operator(this.yy));
        var ipar = new ScilabDouble([this.win], [this.in1.length], [this.N], ...this.wpos, ...this.wdim, ...this.in1, this.clrs[0], this.clrs[1],[this.heritance]);
        var exprs = new ScilabString([this.in1.toString().replace(/,/g, " ")], [this.clrs.toString().replace(/,/g, " ")], [this.win], [this.wpos.toString().replace(/,/g," ")], [this.wdim.toString().replace(/,/g," ")], [this.ymin.toString().replace(/,/g, " ")], [this.ymax.toString().replace(/,/g, " ")], [this.per.toString().replace(/,/g, " ")], [this.N], [this.heritance], [this.nom]);
        this.x.model.ipar = ipar;
        this.x.model.label = new ScilabString([this.nom]);
        this.x.model.evtin = new ScilabDouble(...ones(1-this.heritance,1));
        this.x.graphics.id = new ScilabString([this.nom]);
        this.x.model.rpar = rpar;
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    }
    CMSCOPE.prototype.define = function CMSCOPE() {
        this.heritance = 0;
        this.nom = "";
        this.win = -1;
        this.in1 = [[1],[1]];
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
        model.in = new ScilabDouble(...this.in1);
        model.in2 = new ScilabDouble([1], [1]);
        model.intyp = new ScilabDouble([1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], ...colon_operator(this.period), ...colon_operator(this.yy));
        model.ipar = new ScilabDouble([this.win], [this.in1.length], [this.N], ...this.wpos, ...this.wdim, ...this.in1, this.clrs[0], this.clrs[1]);

        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        var exprs = new ScilabString([this.in1.toString().replace(/,/g, " ")], [this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp([])], [this.ymin.toString().replace(/,/g, " ")], [this.ymax.toString().replace(/,/g, " ")], [this.per.toString().replace(/,/g, " ")], [this.N], [0], [""]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMSCOPE\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 2 -> 80
        this.x.graphics.style = new ScilabString(["CMSCOPE"]);
        return new BasicBlock(this.x);
    }
    CMSCOPE.prototype.details = function CMSCOPE() {
        return this.x;
    }

    CMSCOPE.prototype.get_popup_title = function CMSCOPE() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }

}
