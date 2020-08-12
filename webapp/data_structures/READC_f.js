function READC_f() {

    READC_f.prototype.define = function READC_f() {
        this.tmask1 = '[]';
        this.fname1 = "";
        this.frmt1 = "d  ";
        var frmt = "d  ";
        var fname = "foo";
        this.lunit = 0;
        this.N = 20;
        this.M = 1;
        this.rpar = [];
        var tmask = 0;
        this.swap = 0;
        this.offset = 1;
        this.outmask = 1;
        this.ievt = 0;
        this.nout = size(this.outmask, "*");

        var ipar = new ScilabDouble([fname.length], ..._str2code(frmt), [this.ievt], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(fname), [tmask], [this.outmask]);

        var model = scicos_model();
        model.sim = list(new ScilabString(["readc"]), new ScilabDouble([2]));
        model.out = new ScilabDouble([this.nout]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros(this.N * this.M, 1));
        model.ipar = ipar;
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["[]"], [this.outmask], [fname], [frmt], [this.M], [this.N], [this.offset], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"READC_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    READC_f.prototype.details = function READC_f() {
        return this.x;
    }
    READC_f.prototype.get = function READC_f() {
        var options = {
             tmask1:["Time Record Selection",this.tmask1],
             outmask:["Outputs Record Selection",this.outmask],
             fname1:["Input File Name",this.fname1.slice(this.fname1.lastIndexOf('@') + 1)],
             frmt1:["Input Format",this.frmt1],
             M:["Record Size",this.M],
             N:["Buffer Size",this.N],
             offset:["Initial Record Index",this.offset],
             swap:["Swap Mode (0:No, 1:Yes)",this.swap],
         }
         return options
    }
    READC_f.prototype.set = function READC_f() {
        var temp_tmask1 = arguments[0]["tmask1"];
        var temp_outmask = arguments[0]["outmask"];
        var temp_fname1 = arguments[0]["fname1"];
        var temp_frmt1 = arguments[0]["frmt1"].trim();
        var temp_M = parseFloat(arguments[0]["M"]);
        var temp_N = parseFloat(arguments[0]["N"]);
        var temp_offset = parseFloat(arguments[0]["offset"]);
        var temp_swap = parseFloat(arguments[0]["swap"]);
        var temp_tmask2 = inverse(temp_tmask1);
        var fmts = [ "s","l","d","f","c","us","ul","uc","ull","uls","ubl","ubs","dl","fl","ll","sl","db","fb","lb","sb"];
        var nout  =  size(temp_outmask,"*");
        var prod_cond = "";
        if(temp_tmask2 != [] && temp_tmask2.length !=0 ){
            prod_cond = math.prod(size(temp_tmask2,"r"),size(temp_tmask2,"c"));
        }else{
            prod_cond = 0;
        }
        if( prod_cond > 1) {
            alert("Wrong value for Time Record Selection parameter.\nMust be a scalar or an empty matrix.");
            throw "incorrect";
        }
        if(!fmts.includes(temp_frmt1)){
            alert("Wrong value for Input Format parameter: " +temp_frmt1+"\nValid formats are: " + fmts.toString());
            throw "incorrect";
        }
        if(temp_fname1 == ""){
            alert("Wrong value for 'Input File Name' parameter."+"\nYou must provide a filename.");
            throw "incorrect";
        }
        if(temp_M < 1){
            alert("Wrong value for Record Size parameter:"+ temp_M + ".\nStrictly positive integer expected.");
            throw "incorrect";
        }
        if(temp_tmask2.length !=0 && (temp_tmask2[0] < 1 || temp_tmask2[0] > temp_M)){
            alert("Wrong value for Time Record Selection parameter:"+ temp_tmask1 +"\nMust be in the interval [1, Record Size =" +temp_M.toString()+"]");
            throw "incorrect";
        }
        if(nout == 0){
            alert("Wrong value for Outputs Record Selection parameter: "+ nout +"\nStrictly positive integer expected.");
            throw "incorrect";
        }
        if(Math.max(temp_outmask) > temp_M || Math.min(temp_outmask) < 1){
            alert("Wrong value for indexes in Outputs Record Selection parameter.\nMust be in the interval [1, Record Size = "+ temp_M+"]");
            throw "incorrect";
        }
        if(temp_N < 1){
            alert("Wrong value for Buffer Size parameter:"+ temp_N +"\nStrictly positive integer expected.");
            throw "incorrect";
        }
        if(temp_swap != 0 && temp_swap != 1){
            alert("Wrong value for Swap Mode parameter:"+ temp_swap +"\nMust be in the interval [0, 1].");
            throw "incorrect";
        }
        if(temp_offset < 1){
            alert("Wrong value for Initial Record Index parameter:" + temp_offset + "\nStrictly positive integer expected.");
            throw "incorrect";
        }

        this.tmask1 = temp_tmask1;
        this.outmask = temp_outmask;
        this.fname1 = temp_fname1;
        this.frmt1 = temp_frmt1;
        this.M = temp_M;
        this.N = temp_N;
        this.offset = temp_offset;
        this.swap = temp_swap;
        var outpt = "";
        var tmask1_ipar = "";
        if (temp_tmask2.length == 0){
            this.ievt = 0;
            tmask1_ipar = 0;
            outpt = [];
        }else{
            this.ievt = 1;
            tmask1_ipar = this.tmask1;
            outpt = 1;
        }
        var out = size(this.outmask,"*");
        var io = check_io(this.x.model,this.x.graphics,[],out,1,outpt);
        if(this.ievt == 0){
            this.x.model.firing =  new ScilabDouble([-1]);
        }else{
            this.x.model.firing = new ScilabDouble([0]);
        }
        var ipar = new ScilabDouble([this.fname1.length], ..._str2code(this.frmt1), [this.ievt], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(this.fname1), [tmask1_ipar], [this.outmask]);
        this.x.model.dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros(this.N * this.M, 1));
        this.x.model.ipar = ipar;
        var exprs = new ScilabString([this.tmask1],[this.outmask],[this.fname1],[this.frmt1],[this.M],[this.N],[this.offset],[this.swap]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    READC_f.prototype.get_popup_title = function READC_f() {
        var set_param_popup_title = "Set READC_f block parameters <br>Read from C binary file";
        return set_param_popup_title
    }
    READC_f.prototype.getDimensionForDisplay = function READC_f(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }

}
