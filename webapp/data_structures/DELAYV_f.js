function DELAYV_f() {

	DELAYV_f.prototype.define = function DELAYV_f() {
		this.nin = 1;
		this.z0 = zeros(11, 1);
		this.zz0 = math.subset(this.z0, math.index(math.range(0, math.size(this.z0)[0] - 1), 0));
		this.T = 1;

		var model = scicos_model();
		model.sim = list(new ScilabString(["delayv"]), new ScilabDouble([1]));
		model.in = new ScilabDouble([this.nin], [1]);
		model.out = new ScilabDouble([this.nin]);
		model.evtin = new ScilabDouble([1]);
		model.evtout = new ScilabDouble([1], [1]);
		model.dstate = new ScilabDouble(...this.z0);
		model.rpar = new ScilabDouble([this.T / (size(this.zz0, "*"))]);
		model.blocktype = new ScilabString(["d"]);
		model.firing = new ScilabDouble([0, -1]);
		model.dep_ut = new ScilabBoolean([true, false]);

		var exprs = new ScilabString([this.nin], [this.zz0.toString().replace(/,/g, ";")], [this.T]);

		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DELAYV_f\",sz(1),sz(2));"]);
		this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
		return new BasicBlock(this.x);
	}
	DELAYV_f.prototype.details = function DELAYV_f() {
		return this.x;
	}
	DELAYV_f.prototype.get = function DELAYV_f() {
		var options = {
			nin: ["Number of inputs", this.nin],
			zz0: ["Register initial condition", this.zz0],
			T: ["Max delay", this.T],
		}
		return options;
	}
	DELAYV_f.prototype.set = function DELAYV_f() {
		this.nin = parseFloat(arguments[0]["nin"]);
		var temp_zz0 = arguments[0]["zz0"];
		this.T = parseFloat(arguments[0]["T"]);
		var zz0_1 = inverse(temp_zz0);
		if (size(zz0_1, "*") < 2) {
			alert("Register length must be at least 2");
			throw "incorrect";
		}
		if (this.T <= 0) {
			alert("Delay must be positive");
			throw "incorrect";
		}
		this.zz0 = temp_zz0;
		var io = check_io(this.x.model, this.x.graphics, [[this.nin],[1]], [this.nin], [1], [[1],[1]]);
		this.z0 = ones(11, 1);
		this.told = 1;
		this.x.model.dstate = new ScilabDouble(...zz0_1, [this.told]);
		this.value = this.T / size(zz0_1, "*");
		this.x.model.rpar = new ScilabDouble([this.value]);
		var exprs = new ScilabString([this.nin], [this.zz0], [this.T]);
		this.x.graphics.exprs = exprs;
		return new BasicBlock(this.x)
	}
	DELAYV_f.prototype.get_popup_title = function DELAYV_f() {
        var set_param_popup_title = "Set delay parameters";
        return set_param_popup_title
        }
    DELAYV_f.prototype.getDimensionForDisplay = function DELAYV_f(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
