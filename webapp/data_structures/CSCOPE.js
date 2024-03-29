function CSCOPE() {

    CSCOPE.prototype.define = function CSCOPE() {
        this.win = -1;
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.N = 20;
        this.ymin = -15;
        this.ymax = 15;
        this.per = 30;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cscope"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([0], [this.ymin], [this.ymax], [this.per]);
        model.ipar = new ScilabDouble([this.win], [1], [this.N], ...this.clrs, ...this.wpos, ...this.wdim);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.clrs.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.ymin], [this.ymax], [this.per], [this.N], [0], [""]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CSCOPE.prototype.details = function CSCOPE() {
        return this.x;
    }
    CSCOPE.prototype.get = function CSCOPE() {
        if(this.heritance == undefined || this.heritance == null){
            this.heritance = "0";
        }
        if(this.nom == undefined || this.nom == null){
            this.nom = "";
        }
        var options = {
            clrs:["Color (>0) or mark (<0) vector (8 entries)",this.clrs],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos],
            wdim:["Output window sizes",this.wdim],
            ymin:["Ymin",this.ymin],
            ymax:["Ymax",this.ymax],
            per:["Refresh period",this.per],
            N:["Buffer size",this.N],
            heritance:["Accept herited events 0/1",this.heritance],
            nom:["Name of Scope (label&Id)",this.nom]
        }
        return options
    }
    CSCOPE.prototype.set = function CSCOPE() {

        var temp_clrs = arguments[0]["clrs"];
        this.win = parseFloat(arguments[0]["win"]);
        var temp_wpos = arguments[0]["wpos"];
        var temp_wdim = arguments[0]["wdim"];
        this.ymin = parseFloat(arguments[0]["ymin"]);
        this.ymax = parseFloat(arguments[0]["ymax"]);
        this.per = parseFloat(arguments[0]["per"]);
        this.N = parseFloat(arguments[0]["N"]);
        this.heritance = parseFloat(arguments[0]["heritance"]);
        this.nom = arguments[0]["nom"];
        var clrs_1 = inverse(temp_clrs);
        var wpos_1 = inverse(temp_wpos);
        var wdim_1 = inverse(temp_wdim);

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
        if(this.per <= 0){
            alert("Refresh period must be positive");
            throw "incorrect";
        }
        if(this.N < 2){
            alert("Buffer size must be at least 2");
            throw "incorrect";
        }
        if(this.ymin >= this.ymax){
            alert("Ymax must be greater than Ymin");
            throw "incorrect";
        }
        if(this.heritance != 0 && this.heritance != 1){
            alert("Accept herited events must be 0 or 1");
            throw "incorrect";
        }
        var io = set_io(this.x.model,this.x.graphics,[[-1],[1]],[],ones(1-this.heritance,1),[])

        if(wpos_1.length == 0){
            wpos_1 = [[-1],[-1]];
        }
        if(wdim_1.length == 0){
            wdim_1 = [[-1],[-1]];
        }
        if(clrs_1.length != 8){
            alert("Answer given for Color (>0) or mark (0) vector (8 entries)\nhas invalid dimension:\nwaiting for dimension 8.");
		    throw "incorrect";
	    }
	    this.clrs = temp_clrs;
        this.wpos = temp_wpos;
        this.wdim = temp_wdim;
        var rpar = new ScilabDouble([0],[this.ymin],[this.ymax],[this.per]);
        var ipar = new ScilabDouble([this.win],[1],[this.N],...clrs_1,...wpos_1,...wdim_1);
        this.x.model.rpar = rpar;
        this.x.model.ipar = ipar;
        this.x.model.evtin = new ScilabDouble(...ones(1-this.heritance,1));
        this.x.model.label = this.nom;
        this.x.graphics.id = this.nom;
        var exprs = new ScilabString([this.clrs],[this.win],[this.wpos],[this.wdim],[this.ymin],[this.ymax],[this.per],[this.N],[this.heritance],[this.nom]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    CSCOPE.prototype.get_popup_title = function CSCOPE() {
        var set_param_popup_title = "Set Scope parameters";
        return set_param_popup_title
    }
    CSCOPE.prototype.getDimensionForDisplay = function CSCOPE(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }


}
