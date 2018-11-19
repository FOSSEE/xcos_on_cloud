function DELAY_f() {
	var evtdly = new EVTDLY_f().internal();
	var register = new REGISTER_f().internal();
	var input_port = new IN_f().internal();
	var output_port = new OUT_f().internal();
	var split = new CLKSPLIT_f().internal();
	var diagram = scicos_diagram();

	DELAY_f.prototype.define = function DELAY_f() {

		evtdly.graphics.orig = new ScilabDouble([243, 296]);
		evtdly.graphics.sz = new ScilabDouble([40, 40]);
		evtdly.graphics.flip = new ScilabBoolean([true]);
		evtdly.graphics.exprs = new ScilabString(["0.1"], ["0"]);
		evtdly.graphics.pein = new ScilabDouble([10]);
		evtdly.graphics.peout = new ScilabDouble([7]);
		evtdly.model.rpar = new ScilabDouble([0.1]);
		evtdly.model.firing = new ScilabDouble([0]);
		evtdly.model.uid = new ScilabString([count]); // changed
		evtdly.doc = list(new ScilabString([count++]));
		evtdly.model.outtyp = new ScilabDouble();


		register.graphics.orig = new ScilabDouble([238, 195]);
		register.graphics.sz = new ScilabDouble([50, 50]);
		register.graphics.flip = new ScilabBoolean([true]);
		register.graphics.exprs = new ScilabString(["0;0;0;0;0;0;0;0;0;0"]);
		register.graphics.pin = new ScilabDouble([6]);
		register.graphics.pout = new ScilabDouble([5]);
		register.graphics.pein = new ScilabDouble([9]);
		register.model.uid = new ScilabString([count]); // changed
		register.doc = list(new ScilabString([count++]));
		register.model.in2 = new ScilabDouble([1]);
		register.model.intyp = new ScilabDouble([1]);
		register.model.out2 = new ScilabDouble([1]);


		input_port.graphics.orig = new ScilabDouble([92, 210]);
		input_port.graphics.sz = new ScilabDouble([20, 20]);
		input_port.graphics.flip = new ScilabBoolean([true]);
		input_port.graphics.exprs = new ScilabString(["1"], ["1"]);
		input_port.graphics.pout = new ScilabDouble([6]);
		input_port.model.ipar = new ScilabDouble([1]);
		input_port.model.uid = new ScilabString([count]); // changed
		input_port.doc = list(new ScilabString([count++]));
		input_port.model.outtyp = new ScilabDouble([-1]);


		output_port.graphics.orig = new ScilabDouble([440, 210]);
		output_port.graphics.sz = new ScilabDouble([20, 20]);
		output_port.graphics.flip = new ScilabBoolean([true]);
		output_port.graphics.exprs = new ScilabString(["1"], ["1"]);
		output_port.graphics.pin = new ScilabDouble([5]);
		output_port.model.ipar = new ScilabDouble([1]);
		output_port.model.uid = new ScilabString([count]); // changed
		output_port.doc = list(new ScilabString([count++]));
		output_port.model.outtyp = new ScilabDouble();


		split.graphics.orig = new ScilabDouble([263, 271.2]);
		split.graphics.pein = new ScilabDouble([7]);
		split.graphics.peout = new ScilabDouble([9], [10]);
		split.model.uid = new ScilabString([count]); // changed
		split.doc = list(new ScilabString([count++]));


		diagram.objs.push(input_port);
		diagram.objs.push(output_port);
		diagram.objs.push(register);
		diagram.objs.push(evtdly);
		diagram.objs.push(split);
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([296.6], [440]),
			yy: new ScilabDouble([220], [220]),
			from: new ScilabDouble([3, 1, 0]),
			to: new ScilabDouble([2, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([112], [229.4]),
			yy: new ScilabDouble([220], [220]),
			from: new ScilabDouble([1, 1, 0]),
			to: new ScilabDouble([3, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([263], [263]),
			yy: new ScilabDouble([290.3], [271.2]),
			ct: new ScilabDouble([5, -1]),
			from: new ScilabDouble([4, 1, 0]),
			to: new ScilabDouble([5, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([263], [263]),
			yy: new ScilabDouble([271.2], [250.7]),
			ct: new ScilabDouble([5, -1]),
			from: new ScilabDouble([5, 1, 0]),
			to: new ScilabDouble([3, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([263], [308.6], [308.6], [263], [263]),
			yy: new ScilabDouble([271.2], [271.2], [367], [367], [341.7]),
			ct: new ScilabDouble([5, -1]),
			from: new ScilabDouble([5, 2, 0]),
			to: new ScilabDouble([4, 1, 1])
		}));
		this.dt = 0.1;
		this.z0 = zeros(11, 1);
		this.zz0 = math.subset(this.z0, math.index(math.range(0, math.size(this.z0)[0] - 1), 0));
		this.x = scicos_block();
		this.x.gui = new ScilabString(["DELAY_f"]);
		this.x.graphics.sz = new ScilabDouble([2, 2]);
		this.x.graphics.gr_i = new ScilabDouble();
		this.x.graphics.pin = new ScilabDouble([0]);
		this.x.graphics.pout = new ScilabDouble([0]);
		this.x.model.sim = new ScilabString(["csuper"]);
		this.x.model.in = new ScilabDouble([1]);
		this.x.model.out = new ScilabDouble([1]);
		this.x.model.blocktype = new ScilabString(["h"]);
		this.x.model.dep_ut = new ScilabBoolean([false, false]);
		this.x.model.rpar = diagram;
		this.x.graphics.in_implicit = new ScilabString(["E"]);
		this.x.graphics.in_style = new ScilabString([""]);
		this.x.graphics.out_implicit = new ScilabString(["E"]);
		this.x.graphics.out_style = new ScilabString([""]);
		return new BasicBlock(this.x);
	}
	DELAY_f.prototype.details = function DELAY_f() {
		return this.x;
	}
	DELAY_f.prototype.get = function DELAY_f() {
		var options = {
			dt: ["Discretization time step", this.dt],
			zz0: ["Register initial state", this.zz0.toString().replace(/,/g, " ")],
		}
		return options;
	}
	DELAY_f.prototype.set = function DELAY_f() {
		this.dt = parseFloat((arguments[0]["dt"]))
		this.zz0 = inverse(arguments[0]["zz0"])
		if (size(this.zz0, "*") < 1) {
			alert("Register length must be at least 1");
			DELAY_f.get();
		}
		if (this.dt <= 0) {
			alert("Discretization time step must be positive");
			DELAY_f.get();
		}



		evtdly.model.rpar = new ScilabDouble(this.dt);
		register.graphics.exprs = new ScilabString([this.zz0.toString().replace(/,/g, ";")]);
		diagram.objs.push(input_port);
		diagram.objs.push(output_port);
		diagram.objs.push(register);
		diagram.objs.push(evtdly);
		diagram.objs.push(split);
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([296.6], [440]),
			yy: new ScilabDouble([220], [220]),
			from: new ScilabDouble([3, 1, 0]),
			to: new ScilabDouble([2, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([112], [229.4]),
			yy: new ScilabDouble([220], [220]),
			from: new ScilabDouble([1, 1, 0]),
			to: new ScilabDouble([3, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([263], [263]),
			yy: new ScilabDouble([290.3], [271.2]),
			ct: new ScilabDouble([5, -1]),
			from: new ScilabDouble([4, 1, 0]),
			to: new ScilabDouble([5, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([263], [263]),
			yy: new ScilabDouble([271.2], [250.7]),
			ct: new ScilabDouble([5, -1]),
			from: new ScilabDouble([5, 1, 0]),
			to: new ScilabDouble([3, 1, 1])
		}));
		diagram.objs.push(scicos_link({
			xx: new ScilabDouble([263], [308.6], [308.6], [263], [263]),
			yy: new ScilabDouble([271.2], [271.2], [367], [367], [341.7]),
			ct: new ScilabDouble([5, -1]),
			from: new ScilabDouble([5, 2, 0]),
			to: new ScilabDouble([4, 1, 1])
		}));
		this.x.model.rpar = diagram;




		return new BasicBlock(this.x)
	}

        DELAY_f.prototype.get_popup_title = function DELAY_f() {
        var set_param_popup_title="This block implements as a discretized delay<br> it is consist of a shift register and a clock<br> value of the delay is given by<br> the discretization time step multiplied by the<br> number-1 of state of the register<br>";
        return set_param_popup_title
    }
    DELAY_f.prototype.getDimensionForDisplay = function DELAY_f(){
        var dimension = [40,40];
        return dimension
    }

}
