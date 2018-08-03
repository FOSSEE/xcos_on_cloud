function GAINBLK_f() {

	GAINBLK_f.prototype.define = function GAINBLK_f() {
		this.gain = 1;
		this.in1 = 1;
		this.out = 1;

		var model = scicos_model();
		model.sim = new ScilabString(["gain"]);
		model.in = new ScilabDouble([this.in1]);
		model.out = new ScilabDouble([this.out]);
		model.rpar = new ScilabDouble([this.gain]);
		model.blocktype = new ScilabString(["c"]);
		model.dep_ut = new ScilabBoolean([true, false]);

		var exprs = new ScilabString([sci2exp(this.gain)]);
		var n = sci2exp(this.gain).toString();
		this.displayParameter = [n];
		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GAINBLK_f\",sz(1),sz(2));"]);
		this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
		return new BasicBlock(this.x);
	}
	GAINBLK_f.prototype.details = function GAINBLK_f() {
		return this.x;
	}
	GAINBLK_f.prototype.get = function GAINBLK_f() {
		var options = {
			gain: ["Gain", this.gain.toString().replace(/,/g, " ")],
		}
		return options
	}
	GAINBLK_f.prototype.set = function GAINBLK_f() {
		this.gain = inverse(arguments[0]["gain"])
		if (this.gain.length == 0) {
			alert("Gain must have at least one element");
			GAINBLK_f.get();
		}
		this.out = size(this.gain, 1)
		this.in = size(this.gain, 2)
		var io = check_io(this.x.model, this.x.graphics, [this.in], [this.out], [], [])
		var n = arguments[0]["gain"];
		this.displayParameter = [n];
		this.x.model.rpar = new ScilabDouble(...this.gain)
		var exprs = new ScilabString([this.gain.toString().replace(/,/g, " ")])
		this.x.graphics.exprs = exprs
		return new BasicBlock(this.x)
	}
	GAINBLK_f.prototype.get_popup_title = function GAINBLK_f() {
        var set_param_popup_title="Set gain block parameters";
        return set_param_popup_title
        }
}
