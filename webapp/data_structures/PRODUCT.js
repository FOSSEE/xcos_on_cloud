function PRODUCT() {
	PRODUCT.prototype.define = function PRODUCT() {
		this.sgn = [
			[1],
			[-1]
		];

		var model = scicos_model();
		model.sim = list(new ScilabString(["product"]), new ScilabDouble([4]));
		model.in = new ScilabDouble([-1], [-1]);
		model.out = new ScilabDouble([-1]);
		model.ipar = new ScilabDouble(...this.sgn);
		model.blocktype = new ScilabString(["c"]);
		model.dep_ut = new ScilabBoolean([true, false]);

		var exprs = new ScilabString([sci2exp(this.sgn)]);

		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),&quot;PRODUCT&quot;,sz(1),sz(2));"]);
		this.x = new standard_define(new ScilabDouble([2, 3]), model, exprs, gr_i);
		return new Product(this.x);
	}
	PRODUCT.prototype.details = function PRODUCT() {
		return this.x;
	}
	PRODUCT.prototype.get = function PRODUCT() {
		var options = {
			sgn: ["Number of inputs or sign vector", this.sgn.toString().replace(/,/g, " ")],
		}
		return options
	}
	PRODUCT.prototype.set = function PRODUCT() {
		this.sgn = inverse(arguments[0]["sgn"])
		if (size(this.sgn, 1) == 1) {
			if (this.sgn < 1) {
				alert("Number of inputs must be > 0");
				PRODUCT.get();
			}
			if (this.sgn[0] == 1) {
				this.in = -1
				this.sgn = []
				this.nout = 1
			} else {
				this.in = ones(this.sgn[0], 1)
				for (var i = this.in.length - 1; i >= 0; i--) {
					this.in[i] = -1 * this.in[i]
				}
				this.sgn = ones(this.sgn[0], 1)
				this.nout = -1
			}
		} else {
			for (var i = 0; i < size(this.sgn, 1); i++) {
				for (var j = 0; j < size(this.sgn, 2); j++) {
					if (Math.abs(this.sgn[i][j]) != 1) {
						alert("Signs can only be +1 or -1");
						PRODUCT.get();
					}
				}
			}
			//if(Math.abs(this.sgn)!=1){
			//alert("Signs can only be +1 or -1");
			//PRODUCT.get();
			//}
		}
		this.x.model.ipar = new ScilabDouble(...this.sgn);
		var exprs = new ScilabString([sci2exp(this.sgn)])
		this.x.graphics.exprs = exprs
		return new Product(this.x)
	}
        PRODUCT.prototype.get_popup_title = function PRODUCT() {
        var set_param_popup_title="Set multiplication block parameters<br>(multiplication is set with + 1, division with -1)<br>";
        return set_param_popup_title
    }
}
