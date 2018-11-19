function CBLOCK() {

    CBLOCK.prototype.define = function CBLOCK() {
        this.function_name = "toto";
        this.impli = "n";
        this.i = 1;
        this.o = 1;
        this.ci = [[-1],[-1]];
        this.co = [[-1],[-1]];
        this.xx = [[-1],[-1]];
        this.z = [[-1],[-1]];
        this.auto0 = [[-1],[-1]];
        this.depu = "y";
        this.dept = "n";
        var in1 = 1;
        var out = 1;
        var clkin = [[-1],[-1]];
        var clkout = [[-1],[-1]];
        var x0 = [[-1],[-1]];
        var z0 = [[-1],[-1]];
        this.rpar = [[-1],[-1]];
        this.ipar = [[-1],[-1]];
        var auto = [[-1],[-1]];
        var funam = "toto";
        this.ng = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString([" "]), new ScilabDouble([2004]));
        model.in = new ScilabDouble([in1]);
        model.out = new ScilabDouble([out]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble();
        model.blocktype = new ScilabString([this.typ]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nzcross = new ScilabDouble([this.ng]);

        var label = list(new ScilabString([funam], ["n"], [sci2exp(in1)], [sci2exp(out)], [sci2exp(clkin)], [sci2exp(clkout)], [sci2exp(x0)], [sci2exp(0)], [sci2exp(z0)], [sci2exp(this.rpar)], [sci2exp(this.ipar)], [sci2exp(auto)], ["y"], ["n"]), new ScilabDouble());

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CBLOCK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        this.displayParameter=[funam];
        return new BasicBlock(this.x)
    }
    CBLOCK.prototype.get = function CBLOCK() {
	    var options={
		function_name:["simulation function",this.function_name],
		impli:["is block implicit?(y/n)",this.impli],
		i:["Import ports sizes",this.i],
		o:["output ports sizes",this.o],
		ci:["input event ports sizes",this.ci.toString().replace(/,/g," ")],
		co:["output events ports sizes",this.co.toString().replace(/,/g," ")],
		xx:["initial continuous state",this.xx.toString().replace(/,/g," ")],
		ng:["number of zero crossing surfaces",this.ng],
		z:["initial discrete state",this.z.toString().replace(/,/g," ")],
		rpar:["Real parameters vector",this.rpar.toString().replace(/,/g," ")],
		ipar:["Integer parameters vector",this.ipar.toString().replace(/,/g," ")],
		auto0:["initial firing vector",this.auto0.toString().replace(/,/g," ")],
		depu:["direct feedthrough",this.depu],
		dept:["time dependence",this.dept],
            }
        return options;
    }
   CBLOCK.prototype.set = function CBLOCK() {
        this.function_name = arguments[0]["function_name"];
        this.impli = arguments[0]["impli"];
        this.i = parseInt(arguments[0]["i"]);
        this.o = parseInt(arguments[0]["o"]);
        this.ci = inverse((arguments[0]["ci"]));
        this.co = inverse((arguments[0]["co"]));
        this.xx = inverse((arguments[0]["xx"]));
        this.ng = parseInt(arguments[0]["ng"]);
        this.z = inverse((arguments[0]["z"]));
        this.rpar = inverse((arguments[0]["rpar"]));
        this.ipar = inverse((arguments[0]["ipar"]));
        this.auto0 = inverse((arguments[0]["auto0"]));
        this.depu = arguments[0]["depu"];
        this.dept = arguments[0]["dept"];
        var funam = this.function_name;

        this.displayParameter = [funam];
        return new BasicBlock(this.x)

}


    CBLOCK.prototype.details = function CBLOCK() {

        return this.x;
    }

    CBLOCK.prototype.get_popup_title = function CBLOCK() {
        var set_param_popup_title="Set C-Block2 block parameters";
        return set_param_popup_title
    }
    CBLOCK.prototype.getDimensionForDisplay = function CBLOCK(){
        var dimension = [80,40];
        return dimension
    }

}
