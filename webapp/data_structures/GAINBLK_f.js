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
			gain: ["Gain", this.gain],
		}
		return options
	}
	GAINBLK_f.prototype.set = function GAINBLK_f() {
	    var temp_gain = arguments[0]["gain"];
		var gain_1 = inverse(temp_gain);
		if (this.gain.length == 0) {
			alert("Gain must have at least one element");
			throw "incorrect";
		}
		this.out = size(gain_1, 1);
		this.in = size(gain_1, 2);
		this.gain = temp_gain;
		var io = check_io(this.x.model, this.x.graphics, [this.in], [this.out], [], []);
		this.displayParameter = [this.gain];
		this.x.model.rpar = new ScilabDouble(...gain_1);
		var exprs = new ScilabString([this.gain]);
		this.x.graphics.exprs = exprs;
		return new BasicBlock(this.x)
	}
	GAINBLK_f.prototype.get_popup_title = function GAINBLK_f() {
        var set_param_popup_title = "Set gain block parameters";
        return set_param_popup_title
    }
    GAINBLK_f.prototype.getDimensionForDisplay = function GAINBLK_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
