function generic_block3() {

    generic_block3.prototype.define = function generic_block3() {
        var model = scicos_model();
        this.function_name = "sinblk";
        this.funtyp = 4;
        this.in = [[1],[1]];
        this.it = [1]
        this.out = [[1],[1]];
        this.ot = [1];
        this.ci = [];
        this.co = [];
        this.xx = [];
        this.z = [];
        this.oz = list();
        this.rpar = [];
        this.ipar = [];
        this.opar = list();
        this.nmode = [0];
        this.nzcr = [0];
        this.auto0 = [];
        this.depu = "y";
        this.dept = "n";
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([this.in[0]]);
        model.in2 = new ScilabDouble([this.in[1]]);
        model.intyp = new ScilabDouble([this.it]);
        model.out = new ScilabDouble([this.out[0]]);
        model.out2 = new ScilabDouble([this.out[1]]);
        model.outtyp = new ScilabDouble([this.ot]);
        model.dep_ut = new ScilabBoolean([true, false]);
        var label = new ScilabString([this.function_name], [sci2exp(this.funtyp)], [sci2exp([parseFloat(getData(model.in)[0]), parseFloat(getData(model.in2)[0])])], [sci2exp(parseFloat(getData(model.intyp)[0]))], [sci2exp([parseFloat(getData(model.out)[0]), parseFloat(getData(model.out2)[0])])], [sci2exp(parseFloat(getData(model.outtyp)[0]))], [sci2exp(getData(model.evtin))], [sci2exp(getData(model.evtout))], [sci2exp(getData(model.state))], [sci2exp(getData(model.dstate))], [sci2exp(model.odstate)], [sci2exp(getData(model.rpar))], [sci2exp(getData(model.ipar))], [sci2exp(model.opar)], [sci2exp(parseFloat(getData(model.nmode)[0]))], [sci2exp(parseFloat(getData(model.nzcross)[0]))], [sci2exp(getData(model.firing))], [this.depu], [this.dept]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"generic_block3\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        this.displayParameter = [this.function_name];
        return new BasicBlock(this.x);
    }
    generic_block3.prototype.details = function generic_block3() {
        return this.x;
    }
    generic_block3.prototype.get = function generic_block3() {
        var options = {
            function_name:["Simulation function",this.function_name],
            funtyp:["Function type (0,1,2,..)",this.funtyp],
            in:["Input ports sizes",this.in.toString().replace(/,/g," ")],
            it:["Input ports type",this.it],
            out:["Output port sizes",this.out.toString().replace(/,/g," ")],
            ot:["Output ports type",this.ot],
            ci:["Input event ports sizes",sci2exp(this.ci)],
            co:["Output events ports sizes",sci2exp(this.co)],
            xx:["Initial continuous state",sci2exp(this.xx)],
            z:["Initial discrete state",sci2exp(this.z)],
            oz:["Initial object state",[sci2exp(this.oz)]],
            rpar:["Real parameters vector",sci2exp(this.rpar)],
            ipar:["Integer parameters vector",sci2exp(this.ipar)],
            opar:["Object parameters list",[sci2exp(this.opar)]],
            nmode:["Number of modes",this.nmode],
            nzcr:["Number of zero crossings",this.nzcr],
            auto0:["Initial firing vector (<0 for no firing)",sci2exp(this.auto0)],
            depu:["Direct feedthrough (y or n)",this.depu],
            dept:["Time dependence (y or n)",this.dept]
        }
        return options
    }
    generic_block3.prototype.set = function generic_block3() {
        var function_name1 = arguments[0]["function_name"];
        var funtyp1 = arguments[0]["funtyp"];
        var in1 = arguments[0]["in"];
        var it1 = arguments[0]["it"];
        var out1 = arguments[0]["out"];
        var ot1 = arguments[0]["ot"];
        var ci1 = arguments[0]["ci"];
        var co1 = arguments[0]["co"];
        var xx1 = arguments[0]["xx"];
        var z1 = arguments[0]["z"];
        var oz1 = arguments[0]["oz"];
        var rpar1 = arguments[0]["rpar"];
        var ipar1 = arguments[0]["ipar"];
        var opar1 = arguments[0]["opar"];
        var nmode1 = arguments[0]["nmode"];
        var nzcr1 = arguments[0]["nzcr"];
        var auto01 = arguments[0]["auto0"];
        var depu1 = arguments[0]["depu"];
        var dept1 = arguments[0]["dept"];

        var regex_num = /^\d+$/; //check number only
        var regex_char = /[a-zA-Z!@#$%^&*]/g; //check character
        var regex_semicolon_comma = /[,;]+/;
        var regex_colon = /[;]+/;
        if (!regex_num.test(funtyp1)) {
            var chararray = funtyp1.match(regex_char);
            if (chararray != null) {
                alert("Answer given for Function type (0,1,2,..)\n is incorrect: Undefined variable: "+funtyp1);
                throw "incorrect";
            }
            if (regex_semicolon_comma.test(funtyp1)) {
                alert("Answer given for Function type (0,1,2,..)\n has invalid dimension:\n waiting for dimension 1");
                throw "incorrect";
            }
        }
        funtyp1 = parseInt(funtyp1);
        if (funtyp1 < 0) {
            alert("function type cannot be negative");
            throw "incorrect";
        }

        var chararray = in1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Input ports sizes\n is incorrect: Undefined variable: "+in1);
            throw "incorrect";
        }
        if (regex_colon.test(in1)){
            alert("Answer given for Input ports sizes\n has invalid dimension:\n waiting for dimension -1 x 2.");
            throw "incorrect";
        }
        if (inverse(in1)[0].length > 2){
            alert("Answer given for Input ports sizes\nhas invalid dimension:\nwaiting for dimension -1 x 2.");
            throw "incorrect";
        }

        if (regex_semicolon_comma.test(it1)){
            alert("set_io : input port sizes and input port type must have the same number of rows");
            throw "incorrect";
        }
        var chararray = it1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Input ports type\n is incorrect: Undefined variable: "+it1);
            throw "incorrect";
        }

        var chararray = out1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Output port sizes\n is incorrect: Undefined variable: "+out1);
            throw "incorrect";
        }
        if (regex_colon.test(out1)){
            alert("Answer given for Output port sizes\n has invalid dimension:\n waiting for dimension -1 x 2.");
            throw "incorrect";
        }
        if (inverse(out1)[0].length > 2){
            alert("Answer given for Output port sizes\nhas invalid dimension:\nwaiting for dimension -1 x 2.");
            throw "incorrect";
        }

        if (regex_semicolon_comma.test(ot1)){
            alert("set_io : output port sizes and output port type must have the same number of rows");
            throw "incorrect";
        }
        var chararray = ot1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Output ports type\n is incorrect: Undefined variable: "+ot1);
            throw "incorrect";
        }

        var chararray = ci1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Input event ports sizes\n is incorrect: Undefined variable: "+ci1);
            throw "incorrect";
        }
        var chararray = co1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Output event ports sizes\n is incorrect: Undefined variable: "+co1);
            throw "incorrect";
        }
        ci1 = MatrixInverse(ci1);
        co1 = MatrixInverse(co1);
        if (ci1.length == 0 || ci1[0].length == 0){
            ci1 = [];
        }
        if (co1.length == 0 || co1[0].length == 0 ){
            co1 = [];
        }
        if (ci1.length != 0 || co1.length != 0) {
            if (math.max(ci1.concat(co1)) > 1) {
                alert("vector event links not supported");
                throw "incorrect";
            }
        }

        var chararray = xx1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Initial continuous state\n is incorrect: Undefined variable: "+xx1);
            throw "incorrect";
        }
        xx1 = MatrixInverse(xx1);
        if (xx1.length == 0 || xx1[0].length == 0){
            xx1 = [];
        }

        var chararray = z1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Initial discrete state\n is incorrect: Undefined variable: "+z1);
            throw "incorrect";
        }
        z1 = MatrixInverse(z1);
        if (z1.length == 0 || z1[0].length == 0){
            z1 = [];
        }

        if (regex_colon.test(oz1)){
            alert("Answer given for Initial object state is incorrect:\n It has to be type of list eg. list()");
            throw "incorrect";
        }
        if (oz1.substring(0,5) != "list(" && oz1.charAt(oz1.length-1) != ")"){
            alert("Answer given for Initial object state is incorrect");
            throw "incorrect";
        }
        this.oz = oz1;

        oz1 = (oz1.substring(5,oz1.length-1)).replace(/,/g, ' ');
        var oz2 = [] //for passing to odstate
        for(var i = 0; i < oz1.length; i++){
            if (oz1[i].trim().length != 0) {
                oz2[i] = new ScilabDouble([oz1[i]]);
            }
        }

        var chararray = rpar1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Real parameters vector\nis incorrect: Undefined variable:"+rpar1);
            throw "incorrect";
        }
        var chararray = rpar1.match(/[\r)(]+/);
        if (chararray != null) {
            alert("Answer given for Real parameters vector\nis incorrect: Incompatible output argument");
            throw "incorrect";
        }
        rpar1 = MatrixInverse(rpar1);
        if (rpar1.length == 0 || rpar1[0].length == 0){
            rpar1 = [];
        }

        var chararray = ipar1.match(regex_char);
        if (chararray != null) {
            alert("Answer given for Integer parameters vector\nis incorrect: Undefined variable:"+ipar1);
            throw "incorrect";
        }
        var chararray = ipar1.match(/[\r)(]+/);
        if (chararray != null) {
            alert("Answer given for Integer parameters vector\nis incorrect: Incompatible output argument");
            throw "incorrect";
        }
        ipar1 = MatrixInverse(ipar1);
        if (ipar1.length == 0 || ipar1[0].length == 0){
            ipar1 = [];
        }

        if (regex_colon.test(opar1)){
            alert("Answer given for Object parameters list is incorrect:\n It has to be type of list eg. list()");
            throw "incorrect";
        }
        if (opar1.substring(0,5) != "list(" && opar1.charAt(opar1.length-1) != ")"){
            alert("Answer given for Object parameters list is incorrect");
            throw "incorrect";
        }
        this.opar = opar1;
        opar1 = (opar1.substring(5,opar1.length-1)).replace(/,/g, ' ');
        var opar2 = [] //for passing to objectparameter
        for(var i = 0; i < opar1.length; i++){
            if (opar1[i].trim().length != 0) {
                opar2[i] = new ScilabDouble([opar1[i]]);
            }
        }

        if (!regex_num.test(nmode1)) {
            var chararray = nmode1.match(regex_char);
            if (chararray != null) {
                alert("Answer given for Number of modes\n is incorrect: Undefined variable: "+nmode1);
                throw "incorrect";
            }
            if (regex_semicolon_comma.test(nmode1) && (nmode1.length == 0)) {
                alert("Answer given for Number of modes\n has invalid dimension:\n waiting for dimension 1");
                throw "incorrect";
            }
        }

        if (!regex_num.test(nzcr1)) {
            var chararray = nzcr1.match(regex_char);
            if (chararray != null) {
                alert("Answer given for Number of zero crossings\n is incorrect: Undefined variable: "+nzcr1);
                throw "incorrect";
            }
            if (regex_semicolon_comma.test(nzcr1) && (nzcr1.length == 0)) {
                alert("Answer given for Number of zero crossings\n has invalid dimension:\n waiting for dimension 1");
                throw "incorrect";
            }
        }

        auto01 = MatrixInverse(auto01);
        if (auto01.length == 0 || auto01[0].length == 0){
            auto01 = [];
        }
        this.function_name = function_name1.trim();
        this.funtyp = funtyp1;
        this.in = inverse(in1);
        this.it = inverse(it1);
        this.out = inverse(out1);
        this.ot = inverse(ot1);
        this.ci = ci1;
        this.co = co1;
        this.xx = xx1;
        this.z = z1;
        this.rpar = rpar1;
        this.ipar = ipar1;
        this.nmode = inverse(nmode1);
        this.auto0 = auto01;
        this.depu = depu1;
        this.dept = dept1;
        this.depu = this.depu.trim();
        this.depu_boolean = false;
        if (this.depu == "y") {
          this.depu_boolean = true;
        }
        this.dept = this.dept.trim();
        this.dept_boolean = false;
        if (this.dept == "y") {
          this.dept_boolean = true;
        }
        this.x.model.in = new ScilabDouble([this.in[0]]);
        this.x.model.in2 = new ScilabDouble([this.in[1]]);
        this.x.model.intyp = new ScilabDouble([this.it]);
        this.x.model.out = new ScilabDouble([this.out[0]]);
        this.x.model.out2 = new  ScilabDouble([this.out[1]]);
        this.x.model.outtyp = new ScilabDouble([this.ot]);
        this.x.model.state = new ScilabDouble(...this.xx);
        this.x.model.dstate = new ScilabDouble(...this.z);
        this.x.model.firing = new ScilabDouble(this.auto0);
        this.x.model.evtin = new ScilabDouble(...this.ci);
        this.x.model.evtout = new ScilabDouble(...this.co);
        this.x.model.rpar = new ScilabDouble(this.rpar);
        this.x.model.ipar = new ScilabDouble(this.ipar);
        this.x.model.opar = list(...opar2);
        this.x.model.odstate = list(...oz2);
        this.x.model.nmode = new ScilabDouble(this.nmode);
        this.x.model.nzcr = new ScilabDouble(this.nzcr);
        this.x.model.dep_ut = new ScilabBoolean([this.depu_boolean, this.dept_boolean]);

        var exprs = new ScilabString([this.function_name],
        [sci2exp(this.funtyp)], 
        [sci2exp([parseFloat(getData(this.x.model.in)[0]), parseFloat(getData(this.x.model.in2)[0])])],
        [sci2exp([parseFloat(getData(this.x.model.intyp)[0])])], 
        [sci2exp([parseFloat(getData(this.x.model.out)[0]), parseFloat(getData(this.x.model.out2)[0])])],
        [sci2exp([parseFloat(getData(this.x.model.outtyp)[0])])], 
        [sci2exp(this.ci)],
        [sci2exp(this.co)],
        [sci2exp(this.xx)],
        [sci2exp(this.z)],
        [sci2exp(this.oz)],
        [sci2exp(this.rpar)],
        [sci2exp(this.ipar)],
        [sci2exp(this.opar)],
        [sci2exp([parseFloat(getData(this.x.model.nmode)[0])])],
        [sci2exp([parseFloat(getData(this.x.model.nzcr)[0])])],
        [sci2exp(getData(this.auto0))], 
        [this.depu], 
        [this.dept]);
        this.x.graphics.exprs = exprs;
        var io = set_io(this.x.model,this.x.graphics,list(...this.in),list(...this.out),this.ci,this.co);
        this.displayParameter = [this.function_name];
        return new BasicBlock(this.x);

    }

    generic_block3.prototype.get_popup_title = function generic_block3() {
        var set_param_popup_title="Set Generic block parameters";
        return set_param_popup_title
    }
    generic_block3.prototype.getDimensionForDisplay = function generic_block3(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }
}
