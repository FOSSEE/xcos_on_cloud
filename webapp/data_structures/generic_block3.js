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
        this.depu = "n";
        this.dept = "y";
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([this.in[0]]);
        model.in2 = new ScilabDouble([this.in[1]]);
        model.intyp = new ScilabDouble([this.it]);
        model.out = new ScilabDouble([this.out[0]]);
        model.out2 = new ScilabDouble([this.out[1]]);
        model.outtyp = new ScilabDouble([this.ot]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([this.function_name], [sci2exp(this.funtyp)], [sci2exp([parseFloat(getData(model.in)[0]), parseFloat(getData(model.in2)[0])])], [sci2exp(parseFloat(getData(model.intyp)[0]))], [sci2exp([parseFloat(getData(model.out)[0]), parseFloat(getData(model.out2)[0])])], [sci2exp(parseFloat(getData(model.outtyp)[0]))], [sci2exp(getData(model.evtin))], [sci2exp(getData(model.evtout))], [sci2exp(getData(model.state))], [sci2exp(getData(model.dstate))], [sci2exp(model.odstate)], [sci2exp(getData(model.rpar))], [sci2exp(getData(model.ipar))], [sci2exp(model.opar)], [sci2exp(parseFloat(getData(model.nmode)[0]))], [sci2exp(parseFloat(getData(model.nzcross)[0]))], [sci2exp(getData(model.firing))], ["y"], ["n"]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"generic_block3\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        this.displayParameter=[this.function_name];
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
            ci:["Input event ports sizes",this.ci],
            co:["Output events ports sizes",this.co],
            xx:["Initial continuous state",this.xx],
            z:["Initial discrete state",this.z],
            oz:["Initial object state",this.oz],
            rpar:["Real parameters vector",this.rpar],
            ipar:["Integer parameters vector",this.ipar],
            opar:["Object parameters list",this.opar],
            nmode:["Number of modes",this.nmode],
            nzcr:["Number of zero crossings",this.nzcr],
            auto0:["Initial firing vector (<0 for no firing)",this.auto0],
            depu:["Direct feedthrough (y or n)",this.depu],
            dept:["Time dependence (y or n)",this.dept]
        }
        return options
    }
    generic_block3.prototype.set = function generic_block3() {
        this.function_name = (arguments[0]["function_name"])
        this.funtyp = parseFloat((arguments[0]["funtyp"]))
        this.in = inverse((arguments[0]["in"]))
        this.it = inverse((arguments[0]["it"]))
        this.out = inverse((arguments[0]["out"]))
        this.ot = inverse((arguments[0]["ot"]))
        this.ci = inverse((arguments[0]["ci"]))
        this.co = inverse((arguments[0]["co"]))
        this.xx = inverse((arguments[0]["xx"]))
        this.z = inverse((arguments[0]["z"]))
        this.oz = inverse((arguments[0]["oz"]))
        this.rpar = inverse((arguments[0]["rpar"]))
        this.ipar = inverse((arguments[0]["ipar"]))
        this.opar = inverse((arguments[0]["opar"]))
        this.nmode = parseFloat((arguments[0]["nmode"]))
        this.nzcr = parseFloat((arguments[0]["nzcr"]))
        this.auto0 = parseFloat((arguments[0]["auto0"]))
        this.depu = arguments[0]["depu"]
        this.dept = arguments[0]["dept"]

        this.function_name = this.function_name.trim();
        if (this.funtyp < 0) {
            alert("function type cannot be negative");
            throw "incorrect";
        }
        if ([this.ci,this.co]!=[]) {
                if (Math.max(this.ci,this.ci)>1) {
                    alert("vector event links not supported");
                    throw "incorrect";
                }
        }

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
