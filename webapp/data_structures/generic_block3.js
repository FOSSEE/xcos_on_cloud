function generic_block3() {

    generic_block3.prototype.define = function generic_block3() {
        var model = scicos_model();
        this.function_name = "sinblk";
        this.funtyp = 4;
        this.in = [[1],[1]];
        this.it = [1];
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
            in:["Input ports sizes",this.in],
            it:["Input ports type",this.it],
            out:["Output port sizes",this.out],
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
        var temp_in = arguments[0]["in"];
        var temp_it = arguments[0]["it"];
        var temp_out = arguments[0]["out"];
        var temp_ot = arguments[0]["ot"];
        var temp_ci = arguments[0]["ci"];
        var temp_co = arguments[0]["co"];
        var temp_xx = arguments[0]["xx"];
        var temp_z = arguments[0]["z"];
        var oz1 = arguments[0]["oz"];
        var temp_rpar = arguments[0]["rpar"];
        var temp_ipar = arguments[0]["ipar"];
        var opar1 = arguments[0]["opar"];
        var temp_nmode = arguments[0]["nmode"];
        var nzcr1 = arguments[0]["nzcr"];
        var temp_auto0 = arguments[0]["auto0"];
        var depu1 = arguments[0]["depu"];
        var dept1 = arguments[0]["dept"];

        var in1 = inverse(temp_in);
        var it1 = inverse(temp_it);
        var out1 =  inverse(temp_out);
        var ot1 = inverse(temp_ot);
        var ci1 = inverse(temp_ci);
        var co1 = inverse(temp_co);
        var xx1 = inverse(temp_xx);
        var z1 = inverse(temp_z);
        var rpar1 = inverse(temp_rpar);
        var ipar1 = inverse(temp_ipar);
        var nmode1 = inverse(temp_nmode);
        var auto01 = inverse(temp_auto0);

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

        if (regex_colon.test(temp_in)){
            alert("Answer given for Input ports sizes\n has invalid dimension:\n waiting for dimension -1 x 2.");
            throw "incorrect";
        }
        if (in1[0].length > 2){
            alert("Answer given for Input ports sizes\nhas invalid dimension:\nwaiting for dimension -1 x 2.");
            throw "incorrect";
        }

        if (regex_semicolon_comma.test(temp_it)){
            alert("set_io : input port sizes and input port type must have the same number of rows");
            throw "incorrect";
        }
        if (regex_colon.test(temp_out)){
            alert("Answer given for Output port sizes\n has invalid dimension:\n waiting for dimension -1 x 2.");
            throw "incorrect";
        }
        if (out1[0].length > 2){
            alert("Answer given for Output port sizes\nhas invalid dimension:\nwaiting for dimension -1 x 2.");
            throw "incorrect";
        }

        if (regex_semicolon_comma.test(temp_ot)){
            alert("set_io : output port sizes and output port type must have the same number of rows");
            throw "incorrect";
        }
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
        if (xx1.length == 0 || xx1[0].length == 0){
            xx1 = [];
        }
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
        var oz_temp = oz1;
        oz_temp = (oz_temp.substring(5,oz_temp.length-1)).replace(/,/g, ' ');
        var oz2 = [] //for passing to odstate
        for(var i = 0; i < oz_temp.length; i++){
            if (oz_temp[i].trim().length != 0) {
                oz2[i] = new ScilabDouble([oz_temp[i]]);
            }
        }
        var chararray = temp_rpar.match(/[\r)(]+/);
        if (chararray != null) {
            alert("Answer given for Real parameters vector\nis incorrect: Incompatible output argument");
            throw "incorrect";
        }
        if (rpar1.length == 0 || rpar1[0].length == 0){
            rpar1 = [];
        }
        var chararray = temp_ipar.match(/[\r)(]+/);
        if (chararray != null) {
            alert("Answer given for Integer parameters vector\nis incorrect: Incompatible output argument");
            throw "incorrect";
        }
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
        var temp_opar = opar1;
        temp_opar = (temp_opar.substring(5,temp_opar.length-1)).replace(/,/g, ' ');
        var opar2 = [] //for passing to objectparameter
        for(var i = 0; i < temp_opar.length; i++){
            if (temp_opar[i].trim().length != 0) {
                opar2[i] = new ScilabDouble([temp_opar[i]]);
            }
        }

        if (!regex_num.test(temp_nmode)) {
            if (regex_semicolon_comma.test(temp_nmode) && (nmode1.length == 0)) {
                alert("Answer given for Number of modes\n has invalid dimension:\n waiting for dimension 1");
                throw "incorrect";
            }
        }

        if (!regex_num.test(nzcr1)) {
            if (regex_semicolon_comma.test(nzcr1) && (nzcr1.length == 0)) {
                alert("Answer given for Number of zero crossings\n has invalid dimension:\n waiting for dimension 1");
                throw "incorrect";
            }
        }

        if (auto01.length == 0 || auto01[0].length == 0){
            auto01 = [];
        }
        this.function_name = function_name1.trim();
        this.funtyp = funtyp1;
        this.in = temp_in;
        this.it = temp_it;
        this.out = temp_out;
        this.ot = temp_ot;
        this.ci = temp_ci;
        this.co = temp_co;
        this.xx = temp_xx;
        this.z = temp_z;
        this.rpar = temp_rpar;
        this.ipar = temp_ipar;
        this.oz = oz1;
        this.opar = opar1;
        this.nmode = temp_nmode;
        this.nzcr = nzcr1;
        this.auto0 = temp_auto0;
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
        this.x.model.in = new ScilabDouble([in1[0]]);
        this.x.model.in2 = new ScilabDouble([in1[1]]);
        this.x.model.intyp = new ScilabDouble([it1]);
        this.x.model.out = new ScilabDouble([out1[0]]);
        this.x.model.out2 = new  ScilabDouble([out1[1]]);
        this.x.model.outtyp = new ScilabDouble([ot1]);
        this.x.model.state = new ScilabDouble(...xx1);
        this.x.model.dstate = new ScilabDouble(...z1);
        this.x.model.firing = new ScilabDouble(auto01);
        this.x.model.evtin = new ScilabDouble(...ci1);
        this.x.model.evtout = new ScilabDouble(...co1);
        this.x.model.rpar = new ScilabDouble(rpar1);
        this.x.model.ipar = new ScilabDouble(ipar1);
        this.x.model.opar = list(...opar2);
        this.x.model.odstate = list(...oz2);
        this.x.model.nmode = new ScilabDouble(nmode1);
        this.x.model.nzcr = new ScilabDouble(nzcr1);
        this.x.model.dep_ut = new ScilabBoolean([this.depu_boolean, this.dept_boolean]);

        var in1 = inverse(temp_in);
        var it1 = inverse(temp_it);
        var out1 =  inverse(temp_out);
        var ot1 = inverse(temp_ot);
        var ci1 = inverse(temp_ci);
        var co1 = inverse(temp_co);
        var xx1 = inverse(temp_xx);
        var z1 = inverse(temp_z);
        var rpar1 = inverse(temp_rpar);
        var ipar1 = inverse(temp_ipar);
        var nmode1 = inverse(temp_nmode);
        var auto01 = inverse(temp_auto0);
        var exprs = new ScilabString([this.function_name],
        [sci2exp(this.funtyp)], 
        [sci2exp([parseFloat(getData(this.x.model.in)[0]), parseFloat(getData(this.x.model.in2)[0])])],
        [sci2exp([parseFloat(getData(this.x.model.intyp)[0])])], 
        [sci2exp([parseFloat(getData(this.x.model.out)[0]), parseFloat(getData(this.x.model.out2)[0])])],
        [sci2exp([parseFloat(getData(this.x.model.outtyp)[0])])], 
        [this.ci],
        [this.co],
        [this.xx],
        [this.z],
        [sci2exp(this.oz)],
        [this.rpar],
        [this.ipar],
        [sci2exp(this.opar)],
        [sci2exp([parseFloat(getData(this.x.model.nmode)[0])])],
        [sci2exp([parseFloat(getData(this.x.model.nzcr)[0])])],
        [sci2exp(getData(this.auto0))], 
        [this.depu], 
        [this.dept]);
        this.x.graphics.exprs = exprs;
        var io = set_io(this.x.model,this.x.graphics,list(...in1),list(...out1),ci1,co1);
        this.displayParameter = [this.function_name];
        return new BasicBlock(this.x);

    }

    generic_block3.prototype.get_popup_title = function generic_block3() {
        var set_param_popup_title = "Set Generic block parameters";
        return set_param_popup_title
    }
    generic_block3.prototype.getDimensionForDisplay = function generic_block3(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }
}
