function scifunc_block_m() {

    scifunc_block_m.prototype.define = function scifunc_block_m() {
        this.i = [[1],[1]];
        this.o = [[1],[1]];
        this.ci = [];
        this.co = [];
        this.xx = [];
        this.z = [];
        this.auto0 = [];
        this.deptime = 0;
        var in1 = 1;
        var out = 1;
        var clkin = [];
        var clkout = [];
        var x0 = [];
        var z0 = [];
        this.typ = "c";
        var auto = [];
        this.rpar = [];
        var it = 1;
        this.exprs = [];

        var model = scicos_model();
        model.sim = list(new ScilabString(["scifunc"]), new ScilabDouble([3]));
        model.in = new ScilabDouble([in1]);
        model.in2 = new ScilabDouble([in1]);
        model.intyp = new ScilabDouble([it]);
        model.out = new ScilabDouble([out]);
        model.out2 = new ScilabDouble([out]);
        model.outtyp = new ScilabDouble([it]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([0]);
        model.opar = list();
        model.blocktype = new ScilabString([this.typ]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);
        var n = "y1=sin(u1)";
        this.displayParameter = [n];
        var exprs = list(new ScilabString([sci2exp([in1, in1])], [sci2exp([out, out])], [sci2exp(clkin)], [sci2exp(clkout)], [sci2exp(x0)], [sci2exp(z0)], [sci2exp(this.rpar)], [sci2exp(auto)], [sci2exp(0)]), list(new ScilabString(["y1=sin(u1)"]), new ScilabString([" "]), new ScilabString([" "]), new ScilabString(["y1=sin(u1)"]), new ScilabString([" "]), new ScilabString([" "]), new ScilabString([" "])));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"scifunc_block_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    scifunc_block_m.prototype.details = function scifunc_block_m() {
        return this.x;
    }

    scifunc_block_m.prototype.get = function scifunc_block_m() {
        var options = {
            i : ["input port sizes", this.i],
            o : ["output port sizes", this.o],
            ci : ["input event port sizes", this.ci],
            co : ["output event port sizes", this.co],
            xx : ["initial continuous state", this.xx],
            z : ["initial discrete state", this.z],
            rpar : ["System parameters vector", this.rpar],
            auto0 : ["initial firing vector(<0 for no firing)", this.auto0],
            deptime : ["is block always active(0:no, 1:yes)", this.deptime]
        };
        return options;
    }

    scifunc_block_m.prototype.set = function scifunc_block_m() {
        var i1 = arguments[0]["i"];
        var o1 = arguments[0]["o"];
        var ci1 = arguments[0]["ci"];
        var co1 = arguments[0]["co"];
        var xx1 = arguments[0]["xx"];
        var z1 = arguments[0]["z"];
        var rpar1 = arguments[0]["rpar"];
        var auto01 = arguments[0]["auto0"];
        var deptime1 = arguments[0]["deptime"];
        var regex_parentheses = /[\])}[{(]/g;
        var regex_semicolon_comma = /[,;]+/;

        var in1 = inverse(i1);
        if(isNaN(in1[0].length)){
            if(in1.length == 1 || in1.length > 2 ){
                alert("Answer given for input ports sizes \nhas invalid dimension:\nwaiting for dimension -1 x 2.");
                throw "incorrect";
            }
        }else{
            if(in1[0].length == 1 || in1[0].length > 2 ){
                alert("Answer given for input ports sizes \nhas invalid dimension:\nwaiting for dimension -1 x 2.");
                throw "incorrect";
            }
            for (var i = 1; i < in1.length; i++) {
                if (in1[0].length != in1[i].length) {
                    alert("Answer given for input ports sizes \nis incorrect: Inconsistent row/column dimensions");
                    throw "incorrect";
                }
            }
        }
        var out = inverse(o1);
        if(isNaN(out[0].length)){
            if(out.length == 1 || out.length > 2 ){
                alert("Answer given for output ports sizes \nhas invalid dimension:\nwaiting for dimension -1 x 2.");
                throw "incorrect";
            }
        }else{
            if(out[0].length == 1 || out[0].length > 2 ){
                alert("Answer given for output ports sizes \nhas invalid dimension:\nwaiting for dimension -1 x 2.");
                throw "incorrect";
            }
            for (var i = 1; i < out.length; i++) {
                if (out[0].length != out[i].length) {
                    alert("Answer given for output ports sizes \nis incorrect: Inconsistent row/column dimensions");
                    throw "incorrect";
                }
            }
        }
        var clkin = inverse(ci1);
        if(clkin.length == 0){
            clkin = [];
        }else{
            for (var i = 1; i < clkin.length; i++) {
                if(clkin[0].length != clkin[i].length){
                    alert("Answer given for input event ports sizes\nis incorrect: Inconsistent row/column dimensions.");
                    throw "incorrect";
                }
            }
        }
        var clkout = inverse(co1);
        if(clkout.length == 0){
            clkout = [];
        }else{
            for (var i = 1; i < clkout.length; i++) {
                if(clkout[0].length != clkout[i].length){
                    alert("Answer given for output events ports sizes\nis incorrect: Inconsistent row/column dimensions.");
                    throw "incorrect";
                }
            }
        }
        var x0 = inverse(xx1);
        if(x0.length == 0){
            x0 = [];
        }else{
            for (var i = 1; i < x0.length; i++) {
                if(x0[0].length != x0[i].length){
                    alert("Answer given for initial continuous state \nis incorrect: Inconsistent row/column dimensions.");
                    throw "incorrect";
                }
            }
        }
        var z0 = inverse(z1);
        if(z0.length == 0){
            z0 = [];
        }else{
            for (var i = 1; i < z0.length; i++) {
                if(z0[0].length != z0[i].length){
                    alert("Answer given for initial discrete state \nis incorrect: Inconsistent row/column dimensions.");
                    throw "incorrect";
                }
            }
        }
        var rpar0 = inverse(rpar1);
        if(rpar0.length == 0){
            rpar0 = [];
        }else{
            for (var i = 1; i < rpar0.length; i++) {
                if(rpar0[0].length != rpar0[i].length){
                    alert("Answer given for System parameters vector \nis incorrect: Inconsistent row/column dimensions.");
                    throw "incorrect";
                }
            }
        }
        var auto = inverse(auto01);
        if(auto.length == 0){
            auto = [];
        }else{
            for (var i = 1; i < auto.length; i++) {
                if(auto[0].length != auto[i].length){
                    alert("Answer given for initial firing vector (0 for no firing) \nis incorrect: Inconsistent row/column dimensions.");
                    throw "incorrect";
                }
            }
        }
        var deptime_2 = deptime1.toString().trim().replace(regex_parentheses, '');
        if(regex_semicolon_comma.test(deptime_2) || Number.isNaN(parseFloat(deptime_2))){
            alert("Answer given for is block always active (0:no, 1:yes)\nhas invalid dimension:\nwaiting for dimension 1.");
            throw "incorrect";
        }

        var opar = [];
        opar = this.x.model.opar;
        /*
            check_call_for_sci - is initialized and used in file only_scifunc_code.js
            value of "check_call_for_sci" variable determines whether function genfunc2 is already called or not
            as set method is called more time.

            Value is changed to 2 - when function is called
            then value is again reinitialized to 1
         */
        if(check_call_for_sci != 2){
            genfunc2(opar,i1,o1,ci1,co1,xx1,z1,rpar1,auto01,deptime1,graph_scifunc_block_m,cell_scifunc_block_m);
        }else{
            check_call_for_sci = 1 ;
            this.i = i1;
            this.o = o1;
            this.ci = ci1;
            this.co = co1;
            this.xx = xx1;
            this.z = z1;
            this.rpar = rpar1;
            this.auto0 = auto01;
            this.deptime = deptime_2;
            var update_opar = [];
            update_opar = this.x.model.opar;
            var tt = [[["y1=sin(u1)"]],[[" "]],[[" "]],[["y1=sin(u1)"]],[[" "]],[[" "]],[[" "]]];
            var opar_len = update_opar.length;
            if(opar_len != 0){
                tt = [];
                for(var i = 0; i < opar_len; i++){
                    var ary = getData(update_opar[i]);
                    var arry_1 = [];
                    for(var j = 0; j < ary.length; j++){
                        arry_1.push([ary[j]]);
                    }
                    tt[i] = arry_1;
                }
            }
            var dep_ut = [];
            var dep_u = false;
            var dep_t = false;
            dep_ut = [dep_u,dep_t];
            dep_ut[1] = (1 == parseFloat(deptime_2));
            this.x.model.dep_ut = new ScilabBoolean([dep_ut[0],dep_ut[1]]);
            auto = inverse(auto01);
            this.x.model.firing = new ScilabDouble(...auto);
            x0 = inverse(xx1);
            this.x.model.state =  new ScilabDouble(...x0);
            z0 = inverse(z1);
            this.x.model.dstate = new ScilabDouble(...z0);
            rpar0 = inverse(rpar1);
            this.x.model.rpar = new ScilabDouble(...rpar0);
            this.x.graphics.exprs = list(new ScilabString([this.i], [this.o], [this.ci], [this.co], [this.xx], [this.z], [this.rpar], [this.auto0], [this.deptime]), list(new ScilabString(...tt[0]), new ScilabString(...tt[1]), new ScilabString(...tt[2]), new ScilabString(...tt[3]), new ScilabString(...tt[4]),
new ScilabString(...tt[5]), new ScilabString(...tt[6])));
            this.displayParameter = [tt[0]];
        }
        return new BasicBlock(this.x)
    }

    scifunc_block_m.prototype.get_popup_title = function scifunc_block_m() {
        var set_param_popup_title = "Set scifunc_block parameters <br>only regular blocks supported";
        return set_param_popup_title
    }
    scifunc_block_m.prototype.getDimensionForDisplay = function scifunc_block_m(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }
}
