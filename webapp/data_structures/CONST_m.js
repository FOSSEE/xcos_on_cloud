function CONST_m() {
	CONST_m.prototype.get = function CONST_m() {

		var options = "";
		var str = this.C.toString();
		if (!str.match(/[a-z()+\-*/.^{}]/i)) {
			if(str.match(/\[[0-9]+\]/)){

			options = {
				vec: ["Constant Value", this.C]
			};

			}else{
				options = {
				vec: ["Constant Value", sci2exp(this.C)]
			      };
			}

		} else {
			options = {
				vec: ["Constant Value", this.C]
			};

		}


		return options;
	}
	CONST_m.prototype.set = function CONST_m() {
		var exprs = "";

		var str = arguments[0]["vec"];
		str=convertInputVectorFormat(str);
		if (str.match(/[a-z()+\-*/.^{}]/i)) {
			var value = getValueOfImaginaryInput(str);
			if (value == "null") {
				m.get();
			} else {

				exprs = new ScilabString([str]);
				this.x.model.opar = list(new ScilabDouble([value]));
				this.displayParameter = [arguments[0]["vec"]];
				this.nout = size(value, "*")
				if (this.nout == 0) {
					alert("Wrong size for 'Constant Value' parameter" + "\nConstant value must have at least one element.");
					CONST_m.get();
				}
				this.x.model.rpar = new ScilabDouble();
				this.x.model.out = new ScilabDouble([this.nout]);
				this.C = str;

			}


		} else {
			var str = arguments[0]["vec"];
		        str=convertInputVectorFormat(str);
			this.C = MatrixInverse(str);
			this.nout = size(this.C, "*")
			if (this.nout == 0) {
				alert("Wrong size for 'Constant Value' parameter" + "\nConstant value must have at least one element.");
				CONST_m.get();
			}
			this.x.model.rpar = new ScilabDouble();
			this.x.model.out = new ScilabDouble([this.nout]);
			this.x.model.opar = list(new ScilabDouble([this.C][0]));

			if(str.match(/\[[0-9]+\]/)){
				this.displayParameter = [arguments[0]["vec"]];//[sci2exp(this.C)];
				exprs = new ScilabString(["["+this.C+"]"]);
				this.C=["["+this.C+"]"];

			}else{
				this.displayParameter = [arguments[0]["vec"]];
				exprs = new ScilabString([sci2exp(this.C)]);

			}

		}


		this.x.graphics.exprs = exprs
		return new BasicBlock(this.x)
	}
	CONST_m.prototype.internal = function CONST_m() {
		this.C = [1];
		var model = new scicos_model();
		model.sim = list(new ScilabString(["cstblk4"]), new ScilabDouble([4]));
		model.in = new ScilabDouble();
		model.out = new ScilabDouble([this.C.length]);
		model.in2 = new ScilabDouble();
		model.out2 = new ScilabDouble([this.C.length]);
		model.rpar = new ScilabDouble();
		model.opar = list(new ScilabDouble([this.C]));
		model.blocktype = new ScilabString(["d"]);
		model.dep_ut = new ScilabBoolean([false, false]);

		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST_m\",sz(1),sz(2));"]);
		var exprs = new ScilabString([this.C]);
		var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 1 -> 80
		block.graphics.style = new ScilabString(["CONST_m"]);
		return block;
	}
	CONST_m.prototype.define = function CONST_m() {
		this.C = [1];
		var model = new scicos_model();
		model.sim = list(new ScilabString(["cstblk4"]), new ScilabDouble([4]));
		model.in = new ScilabDouble();
		model.out = new ScilabDouble([this.C.length]);
		model.in2 = new ScilabDouble();
		model.out2 = new ScilabDouble([this.C.length]);
		model.rpar = new ScilabDouble();
		model.opar = list(new ScilabDouble([this.C]));
		model.blocktype = new ScilabString(["d"]);
		this.displayParameter = [1];
		model.dep_ut = new ScilabBoolean([false, false]);

		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST_m\",sz(1),sz(2));"]);
		var exprs = new ScilabString([sci2exp(this.C)]);
		this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 1 -> 80
		this.x.graphics.style = new ScilabString(["CONST_m"]);
		return new BasicBlock(this.x);
	}
	CONST_m.prototype.details = function CONST_m() {
		return this.x;

	}

        CONST_m.prototype.get_popup_title = function CONST_m() {
        var set_param_popup_title="Set CONST_m block parameters <br> Constant value generator<br>";
        return set_param_popup_title
        }
        CONST_m.prototype.getDimensionForDisplay = function CONST_m(){
        var dimension = [40,40];
        return dimension
    }

}
