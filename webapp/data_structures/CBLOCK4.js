function CBLOCK4() {

    CBLOCK4.prototype.define = function CBLOCK4() {
        this.impli = "n";
        this.depu = true;
        this.dept = false;

        this.funam = "toto";

        var model = scicos_model();
        model.sim = list(new ScilabString([" "]), new ScilabDouble([2004]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = list(new ScilabString([this.funam], ["n"], [sci2exp([parseFloat(...getData(model.in)), parseFloat(...getData(model.in2))])], [sci2exp(parseFloat(...getData(model.intyp)))], [sci2exp([parseFloat(...getData(model.out)), parseFloat(...getData(model.out2))])], [sci2exp(parseFloat(...getData(model.outtyp)))], [sci2exp(getData(model.evtin))], [sci2exp(getData(model.evtout))], [sci2exp(getData(model.state))], [sci2exp(getData(model.dstate))], [sci2exp(model.odstate)], [sci2exp(getData(model.rpar))], [sci2exp(getData(model.ipar))], [sci2exp(model.opar)], [sci2exp(parseFloat(...getData(model.nmode)))], [sci2exp(parseFloat(...getData(model.nzcross)))], [sci2exp(getData(model.firing))], ["y"], ["n"]), new ScilabDouble());

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CBLOCK4\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        this.displayParameter=[this.funam];
        return new BasicBlock(this.x);
    }

    CBLOCK4.prototype.details = function CBLOCK4() {
        return this.x;
    }
// CBLOCK4.prototype.get = function CBLOCK4() {
//          var options={
//             function_name:["Simulation function",this.function_name],
//             impli:["Is block implicit? (y,n)",this.impli],
//             in:["Input ports sizes",sci2exp([this.x.model.in,this.x.model.in2])],
//             it:["Input ports type",sci2exp(this.x.model.intyp)],
//             out:["Output port sizes",sci2exp([this.x.model.out,this.x.model.out2])],
//             ot:["Output ports type",sci2exp(this.x.model.outtyp)],
//             ci:["Input event ports sizes",sci2exp(this.x.model.evtin)],
//             co:["Output events ports sizes",sci2exp(this.x.model.evtout)],
//             xx:["Initial continuous state",sci2exp(this.x.model.state)],
//             z:["Initial discrete state",sci2exp(this.x.model.dstate)],
//             oz:["Initial object state",sci2exp(this.x.model.odstate)],
//             rpar:["Real parameters vector",sci2exp(this.x.model.rpar)],
//             ipar:["Integer parameters vector",sci2exp(this.x.model.ipar)],
//             opar:["Object parameters list",sci2exp(this.x.model.opar)],
//             nmode:["Number of modes",sci2exp(this.x.model.nmode)],
//             nzcr:["Number of zero crossings",sci2exp(this.x.model.nzcross)],
//             auto0:["Initial firing vector (<0 for no firing)",sci2exp(this.x.model.firing)],
//             depu:["Direct feedthrough (y or n)",(this.depu?"y":"n")],
//             dept:["Time dependence (y or n)",(this.dept?"y":"n")],
//         }
//         return options
//     }
// CBLOCK4.prototype.set = function CBLOCK4() {
//     this.function_name = arguments[0]["function_name"]
//     this.impli = arguments[0]["impli"]
//     this.in = inverse(arguments[0]["in"])
//     this.it = inverse(arguments[0]["it"])
//     this.out = inverse(arguments[0]["out"])
//     this.ot = inverse(arguments[0]["ot"])
//     this.ci = inverse(arguments[0]["ci"])
//     this.co = inverse(arguments[0]["co"])
//     this.xx = inverse(arguments[0]["xx"])
//     this.z = inverse(arguments[0]["z"])
//     this.oz = inverse(arguments[0]["oz"])
//     this.rpar = inverse(arguments[0]["rpar"])
//     this.ipar = inverse(arguments[0]["ipar"])
//     this.opar = inverse(arguments[0]["opar"])
//     this.nmode = parseFloat((arguments[0]["nmode"]))
//     this.nzcr = parseFloat((arguments[0]["nzcr"]))
//     this.auto0 = parseFloat((arguments[0]["auto0"]))
//     this.depu = arguments[0]["depu"]
//     this.dept = arguments[0]["dept"]
//     if(this.impli == "y"){
//         this.funtyp = 12004
//     }
//     else{
//         this.funtyp = 2004
//     }
//     if(this.depu=="y"){
//         this.depu=true;
//     }
//     else{
//         this.depu=false;
//     }
//     if(this.dept=="y"){
//         this.dept=true;
//     }
//     else{
//         this.dept=false;
//     }
//     this.x.model.dep_ut = new ScilabBoolean([this.depu,this.dept])
//     this.x.model.sim = list(new ScilabString(this.function_name), )
//     this.x.model.state = new ScilabDouble(...this.xx);
//     this.x.model.dstate = new ScilabDouble(...this.z);
//     this.x.model.odstate = new ScilabDouble(...this.oz);
//     this.x.model.rpar = new ScilabDouble(...this.rpar);
//     this.x.model.ipar = new ScilabDouble(...this.ipar);
//     this.x.model.opar = new ScilabDouble(...this.opar);
//     this.x.model.firing = new ScilabDouble([this.auto0]);
//     this.x.model.nzcross = new ScilabDouble([this.nzcr]);
//     this.x.model.nmode = new ScilabDouble([this.nmode]);
//     var exprs = new ScilabString([this.function_name],[this.impli],[sci2exp(this.in)],[sci2exp(this.it)],[sci2exp(this.out)],[sci2exp(this.ot)],[sci2exp(this.ci)],[sci2exp(this.co)],[sci2exp(this.xx)],[sci2exp(this.z)],[sci2exp(this.oz)],[sci2exp(this.rpar)],[sci2exp(this.ipar)],[sci2exp(this.opar)],[sci2exp(this.nmode)],[sci2exp(this.nzcr)],[sci2exp(this.auto0)],[this.depu],[this.dept])
//     this.x.graphics.exprs=exprs
//     return new BasicBlock(this.x)
//     }

       CBLOCK4.prototype.get_popup_title = function CBLOCK4() {
        var set_param_popup_title="Set C-Block4 block parameters";
        return set_param_popup_title
    }
}
