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
	var options={
		nclock:["Number of events inputs",this.nclock],
		clrs:["Color c(>0) or mark (<0)",this.clrs.toString().replace(/,/g," ")],
		win:["Output window number (-1 for automatic)",this.win],
                wpos:["Output window position",this.wpos.toString().replace(/,/g," ")],
		wdim:["Output window sizes",this.wdim.toString().replace(/,/g," ")],
		per:["Refresh period",this.per],


         }
	return options


    }

    CEVENTSCOPE.prototype.set = function CEVENTSCOPE() {
    var model = scicos_model();
    this.nclock= parseInt(arguments[0]["nclock"])
    this.clrs = inverse((arguments[0]["clrs"]))
    this.win = parseFloat((arguments[0]["win"]))
    this.wpos = inverse(arguments[0]["wpos"])
    this.wdim = inverse(arguments[0]["wdim"])
    this.per = parseFloat((arguments[0]["per"]))
	if(this.clrs.length != this.nclock){
		alert("inputs Color c(>0) or mark (<0) should be equal to Number of events inputs");
		CEVENTSCOPE.get();
	    }
	if(this.nclock<=0){
		alert("Block must have at least one input event");
		CEVENTSCOPE.get();
	     }
	if(this.win<-1){
                alert("Window number can''t be  < -1");
                CEVENTSCOPE.get();
            }
	if((size(this.wpos,"*")!=0)&&(size(this.wpos,"*")!=2)){
		        alert("Window position must be [] or a 2 vector");
		        CEVENTSCOPE.get();
		    }
	if((size(this.wdim,"*")!=0)&&(size(this.wdim,"*")!=2)){
		        alert("Window dim must be [] or a 2 vector");
		        CEVENTSCOPE.get();
		    }
	if(this.per<=0){
                alert("Refresh period must be positive");
                CEVENTSCOPE.get();
            }
	if(this.wpos.length == 0){
		this.wpos = [[-1],[-1]];
	    }
	 if(this.wdim.length == 0){
		this.wdim = [[-1],[-1]];
	    }

	    var io = set_io(this.x.model,this.x.graphics,list(),list(),ones(this.nclock,1),[])
	    var rpar = new ScilabDouble([this.per])
	    var ipar = new ScilabDouble([this.win],[1],...this.clrs,...this.wpos,...this.wdim)
	    this.x.model.rpar = rpar
	    this.x.model.ipar = ipar
	    var exprs = new ScilabString([sci2exp([this.nclock])],[this.clrs.toString().replace(/,/g," ")],[this.win],[sci2exp(this.wpos)],[sci2exp(this.wdim)],[this.per]);
	    this.x.graphics.exprs=exprs
	    return new BasicBlock(this.x)
    }
    CEVENTSCOPE.prototype.get_popup_title = function CEVENTSCOPE() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }
}
