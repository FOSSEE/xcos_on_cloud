function CEVENTSCOPE() {

    CEVENTSCOPE.prototype.define = function CEVENTSCOPE() {
	    this.nclock = 1;
	    this.win = -1;
        this.clrs = [[1],[3],[5],[7],[9],[11],[13],[15]];
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.per = 30;


        var model = scicos_model();
        model.sim = list(new ScilabString(["cevscpe"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.per]);
        model.ipar = new ScilabDouble([this.win], [1], this.clrs[this.nclock - 1], ...this.wpos, ...this.wdim);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

	    var exprs = new ScilabString([sci2exp([this.nclock])],[sci2exp(this.clrs[this.nclock -1]).toString().replace(/,/g," ")],[this.win],[sci2exp([])],[sci2exp(this.wdim)],[this.per]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CEVENTSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CEVENTSCOPE.prototype.details = function CEVENTSCOPE() {
        return this.x;
    }

    CEVENTSCOPE.prototype.get = function CEVENTSCOPE() {
	    var options = {
		    nclock:["Number of events inputs",this.nclock],
		    clrs:["Color c(>0) or mark (<0)",this.clrs],
		    win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos],
		    wdim:["Output window sizes",this.wdim],
		    per:["Refresh period",this.per],
        }
        return options
    }

    CEVENTSCOPE.prototype.set = function CEVENTSCOPE() {
        this.nclock= parseInt(arguments[0]["nclock"]);
        var temp_clrs = arguments[0]["clrs"];
        this.win = parseFloat(arguments[0]["win"]);
        var temp_wpos = arguments[0]["wpos"];
        var temp_wdim = arguments[0]["wdim"];
        this.per = parseFloat(arguments[0]["per"]);
        var clrs_1 = inverse(temp_clrs);
        var wpos_1 = inverse(temp_wpos);
        var wdim_1 = inverse(temp_wdim);
	    if(clrs_1.length != this.nclock){
		    alert("inputs Color c(>0) or mark (<0) should be equal to Number of events inputs");
		    throw "incorrect";
	    }
	    if(this.nclock <= 0){
		    alert("Block must have at least one input event");
		    throw "incorrect";
	    }
	    if(this.win < -1){
            alert("Window number can''t be  < -1");
            throw "incorrect";
        }
	    if((size(wpos_1,"*") != 0) && (size(wpos_1,"*") != 2)){
		    alert("Window position must be [] or a 2 vector");
		    throw "incorrect";
		}
	    if((size(wdim_1,"*") != 0) && (size(wdim_1,"*") != 2)){
		    alert("Window dim must be [] or a 2 vector");
		    throw "incorrect";
		}
	    if(this.per <= 0){
            alert("Refresh period must be positive");
            throw "incorrect";
        }
	    if(wpos_1.length == 0){
		    wpos_1 = [[-1],[-1]];
	    }
	    if(wdim_1.length == 0){
		    wdim_1 = [[-1],[-1]];
	    }
	    this.clrs = temp_clrs;
	    this.wpos = temp_wpos;
        this.wdim = temp_wdim;
	    var io = set_io(this.x.model,this.x.graphics,list(),list(),ones(this.nclock,1),[]);
	    var rpar = new ScilabDouble([this.per]);
	    var ipar = new ScilabDouble([this.win],[1],...clrs_1,...wpos_1,...wdim_1);
	    this.x.model.rpar = rpar;
	    this.x.model.ipar = ipar;
	    var exprs = new ScilabString([sci2exp([this.nclock])],[this.clrs],[this.win],[this.wpos],[this.wdim],[this.per]);
	    this.x.graphics.exprs = exprs;
	    return new BasicBlock(this.x)
    }
    CEVENTSCOPE.prototype.get_popup_title = function CEVENTSCOPE() {
        var set_param_popup_title = "Set Scope parameters";
        return set_param_popup_title
    }
    CEVENTSCOPE.prototype.getDimensionForDisplay = function CEVENTSCOPE(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
