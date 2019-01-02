function SATURATION() {

	SATURATION.prototype.define = function SATURATION() {
		this.minp = -1;
		this.maxp = 1;
		this.rpar = [
			[this.maxp],
			[this.minp]
		];

		var model = scicos_model();
		model.sim = list(new ScilabString(["satur"]), new ScilabDouble([4]));
		model.in = new ScilabDouble([1]);
		model.nzcross = new ScilabDouble([2]);
		model.nmode = new ScilabDouble([1]);
		model.out = new ScilabDouble([1]);
		model.rpar = new ScilabDouble(...this.rpar);
		model.blocktype = new ScilabString(["c"]);
		model.dep_ut = new ScilabBoolean([true, false]);
		this.zeroc = parseFloat(getData(model.nmode)[0])
		var exprs = new ScilabString([this.maxp], [this.minp], [parseFloat(getData(model.nmode)[0])]);

		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SATURATION\",sz(1),sz(2));"]);
		this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
		return new BasicBlock(this.x);
	}
	SATURATION.prototype.details = function SATURATION() {
		return this.x;
	}
	SATURATION.prototype.get = function SATURATION() {
		var options = {
			maxp: ["Upper limit", this.maxp],
			minp: ["Lower limit", this.minp],
			zeroc: ["zero crossing (0:no, 1:yes)", this.zeroc],
		}
		return options
	}
	SATURATION.prototype.set = function SATURATION() {
		this.maxp = parseFloat((arguments[0]["maxp"]))
		this.minp = parseFloat((arguments[0]["minp"]))
		this.zeroc = parseFloat((arguments[0]["zeroc"]))

		if (this.maxp <= this.minp) {
			alert("Upper limit must be > Lower limit");
			SATURATION.get();
		}
		var rpar = new ScilabDouble([this.maxp], [this.minp])
		this.x.model.rpar = rpar;
		if (this.zeroc != 0) {
			this.x.model.nzcross = new ScilabDouble([2]);
			this.x.model.nmode = new ScilabDouble([1]);
		} else {
			this.x.model.nzcross = new ScilabDouble([0]);
			this.x.model.nmode = new ScilabDouble([0]);
		}

		var exprs = new ScilabString([this.maxp], [this.minp], [this.zeroc])
		this.x.graphics.exprs = exprs
		return new BasicBlock(this.x)
	}
	SATURATION.prototype.get_popup_title = function SATURATION() {
        var set_param_popup_title="Set Saturation parameters";
        return set_param_popup_title
        }
    SATURATION.prototype.getDimensionForDisplay = function SATURATION(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
