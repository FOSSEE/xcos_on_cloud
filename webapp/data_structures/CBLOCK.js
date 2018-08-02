function CBLOCK() {

    CBLOCK.prototype.define = function CBLOCK() {
        this.in1 = 1;
        this.out = 1;
        this.clkin = [[-1],[-1]];
        this.clkout = [[-1],[-1]];
        this.x0 = [[-1],[-1]];
        this.z0 = [[-1],[-1]];
        this.auto = [[-1],[-1]];
        this.rpar = [[-1],[-1]];
        this.ipar = [[-1],[-1]];
        this.funam = "toto";
        this.ng = 0;
	this.implicit="n";
	this.directfeed="y";
	this.timedep="n";


        var model = scicos_model();
        model.sim = list(new ScilabString([" "]), new ScilabDouble([2004]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
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

        var label = list(new ScilabString([this.funam], ["n"], [sci2exp(this.in1)], [sci2exp(this.out)], [sci2exp(this.clkin)], [sci2exp(this.clkout)], [sci2exp(this.x0)], [sci2exp(0)], [sci2exp(this.z0)], [sci2exp(this.rpar)], [sci2exp(this.ipar)], [sci2exp(this.auto)], ["y"], ["n"]), new ScilabDouble());

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CBLOCK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, label, gr_i);
        this.displayParameter=[this.funam];
        return new BasicBlock(this.x)
    }
    CBLOCK.prototype.get = function CBLOCK() {
	    var options={
		funam:["simulation function",this.funam],
		implicit:["is block implicit?(y/n)",this.implicit],
		in1:["Import ports sizes",this.in1],
		out:["output ports sizes",this.out],
		clkin:["input event ports sizes",this.clkin.toString().replace(/,/g," ")],
		clkout:["output events ports sizes",this.clkout.toString().replace(/,/g," ")],
		x0:["initial continuous state",this.x0.toString().replace(/,/g," ")],
		ng:["number of zero crossing surfaces",this.ng],
		z0:["initial discrete state",this.z0.toString().replace(/,/g," ")],
		auto:["initial firing vector",this.auto.toString().replace(/,/g," ")],
		rpar:["Real parameters vector",this.rpar.toString().replace(/,/g," ")],
		ipar:["Integer parameters vector",this.ipar.toString().replace(/,/g," ")],
		directfeed:["direct feedthrough",this.directfeed],
		timedep:["time dependence",this.timedep],


		 }
    return options


    }
   CBLOCK.prototype.set = function CBLOCK() {
        this.funam=arguments[0]["funam"]
	this.implicit=arguments[0]["implicit"]
	this.in1=parseInt(arguments[0]["in1"])
	this.out=parseInt(arguments[0]["out"])
        this.clkin = inverse((arguments[0]["clkin"]))
	this.clkout = inverse((arguments[0]["clkout"]))
	this.x0 = inverse((arguments[0]["x0"]))
	this.ng=parseInt(arguments[0]["ng"])
	this.z0 = inverse((arguments[0]["z0"]))
	this.auto = inverse((arguments[0]["auto"]))
	this.rpar = inverse((arguments[0]["rpar"]))
	this.ipar = inverse((arguments[0]["ipar"]))
	this.directfeed=arguments[0]["directfeed"]
	this.timedep=arguments[0]["timedep"]

        this.displayParameter=[this.funam];
        return new BasicBlock(this.x)

}


    CBLOCK.prototype.details = function CBLOCK() {

        return this.x;
    }

    CBLOCK.prototype.get_popup_title = function CBLOCK() {
        var set_param_popup_title="Set C-Block2 block parameters";
        return set_param_popup_title
    }

}
