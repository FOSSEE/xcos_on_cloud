function CONST() {

    CONST.prototype.define = function CONST() {

		this.C = 1;

		var model = scicos_model();
		model.sim = list(new ScilabString(["cstblk4"]), new ScilabDouble([4]));
		model.in = new ScilabDouble();
		model.out = new ScilabDouble([1]);
		model.rpar = new ScilabDouble([this.C]);
		model.blocktype = new ScilabString(["d"]);
		model.dep_ut = new ScilabBoolean([false, false]);

		var exprs = new ScilabString([sci2exp(this.C)]);
		var n = sci2exp(this.C).toString();
		this.displayParameter = [n];
		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST\",sz(1),sz(2));"]);
		this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
		return new BasicBlock(this.x);
	}

	CONST.prototype.details = function CONST() {
		return this.x;
	}
	CONST.prototype.get = function CONST() {
		var options = {
			C: ["Constant", this.C.toString().replace(/,/g, " ")],
		}
		return options
	}
	CONST.prototype.set = function CONST() {
		this.C = (arguments[0]["C"]);
		var exprs;

		    if (this.C.match(/[a-z()+\-*/.^{}]/i)) {
			    var value = getValueOfImaginaryInput(this.C, "CONST");
			    if (value == "undefined") {
			    	throw "incorrect";
			    } else {
			    	exprs = new ScilabString([this.C]);
			    	this.x.model.rpar = new ScilabDouble([value]);
			    	this.C = this.C;
			    	this.displayParameter = [this.C];
			    }

		    } else {
			    this.C = MatrixInverse(this.C);
			    this.sz = size(this.C);
			    this.nout = size(this.C, "*");

			    if (this.nout == 0) {
			    	alert("C must have at least one element");
			    	throw "incorrect";
			    }
			    if (this.sz > 1) {
			    	alert("C matrix is not supported, use CONST_m instead");
			    	throw "incorrect";
			    }
			    exprs = new ScilabString([sci2exp(this.C)]);
			    this.x.model.rpar = new ScilabDouble([this.C]);
			    this.displayParameter = [this.C];

		    }

		    this.x.model.out = new ScilabDouble([this.nout]);
		    this.x.graphics.exprs = exprs;
		    return new BasicBlock(this.x)
	    }
        CONST.prototype.get_popup_title = function CONST() {
            var set_param_popup_title="Set Contant Block";
            return set_param_popup_title
        }
        CONST.prototype.getDimensionForDisplay = function CONST(){
            var dimension = { width: 40, height: 40 };
            return dimension
        }

}
