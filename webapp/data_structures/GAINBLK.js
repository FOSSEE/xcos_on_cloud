function GAINBLK() {

    GAINBLK.prototype.define = function GAINBLK() {
        this.gain = 1;
        this.in1 = -1;
        this.out = -1;
        this.in2 = -2;
        this.out2 = -2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["gainblk"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.in2 = new ScilabDouble([this.in2]);
        model.out2 = new ScilabDouble([this.out2]);
        model.rpar = new ScilabDouble([this.gain]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.gain)]);
        var n=this.gain.toString();
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GAINBLK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GAINBLK.prototype.details = function GAINBLK() {
        return this.x;
    }
    GAINBLK.prototype.get = function GAINBLK() {
    if(this.over == undefined || this.over == null)
        var options = "";
        this.over = 0
        var str = this.gain.toString();
        if (!str.match(/[a-z()+\-*/.^{}]/i)) {
		if(str.match(/\[[0-9]+\]/)){
			options={
            			gain:["Gain", this.gain],
            			over:["Do On Overflow(0=Nothing 1=Saturate 2=Error)",this.over],
        		};
			
		}else {
			options={
            			gain:["Gain", sci2exp(this.gain)],
            			over:["Do On Overflow(0=Nothing 1=Saturate 2=Error)",this.over],
        		};
		}

		}else {
			options={
            			gain:["Gain", this.gain],
            			over:["Do On Overflow(0=Nothing 1=Saturate 2=Error)",this.over],
        		};

		}
        return options
    }
    GAINBLK.prototype.set = function GAINBLK() {
		var exprs = "";
		this.over = parseFloat((arguments[0]["over"]))
    		if((this.over<0)||(this.over>2))
    		{
        		alert("Do on Overflow must be 0,1,2");
        		GAINBLK.get();
    		}
		var str = arguments[0]["gain"];
                if(str.length==0){
        	  alert("Gain must have at least one element");
        	  GAINBLK.get();
    		}
		str=convertInputVectorFormat(str);
		if (str.match(/[a-z()+\-*/.^{}]/i)) {
			var value = getValueOfImaginaryInput(str);
			if (value == "null") {
				m.get();
			} else {
				exprs = new ScilabString([str],[this.over]);
				this.x.model.rpar = list(new ScilabDouble([value]));
				this.displayParameter = [arguments[0]["gain"]];
				this.x.model.intyp = new ScilabDouble([1])
        			this.x.model.outtyp = new ScilabDouble([1])
        			this.x.model.sim = list(new ScilabString(["gainblk"]), new ScilabDouble([4]));
        			this.x.model.opar = list()

				this.out = size(value,1)
    				this.in = size(value,2)
    				if(this.out*this.in == 1){
        				var io = set_io(this.x.model,this.x.graphics,[[-1],[-2]],[[-1],[-2]],[],[])
    				}
    				else{
        				var io = set_io(this.x.model,this.x.graphics,[[this.in],[-1]],[[this.out],[-1]],[],[])
    				}
				this.gain = str;

			}


		} else {
			var str = arguments[0]["gain"];
		        str=convertInputVectorFormat(str);
			this.gain = MatrixInverse(str);
			this.out = size(this.gain,1)
    			this.in = size(this.gain,2)
    			if(this.out*this.in == 1){
        			var io = set_io(this.x.model,this.x.graphics,[[-1],[-2]],[[-1],[-2]],[],[])
    			}
    			else{
        			var io = set_io(this.x.model,this.x.graphics,[[this.in],[-1]],[[this.out],[-1]],[],[])
    			}

			this.x.model.rpar = list(new ScilabDouble([this.gain]));
			this.x.model.intyp = new ScilabDouble([1])
        		this.x.model.outtyp = new ScilabDouble([1])
        		this.x.model.sim = list(new ScilabString(["gainblk"]), new ScilabDouble([4]));
        		this.x.model.opar = list()
			
			if(str.match(/\[[0-9]+\]/)){
				this.displayParameter = [arguments[0]["gain"]];//[sci2exp(this.c)];
				exprs = new ScilabString(["["+this.gain+"]"],[this.over]);
				this.gain=["["+this.gain+"]"];

			}else{
				this.displayParameter = [arguments[0]["gain"]];
				exprs = new ScilabString([sci2exp(this.gain)],[this.over]);

			}

		}


		this.x.graphics.exprs = exprs
		return new BasicBlock(this.x)

    }


    GAINBLK.prototype.get_popup_title = function GAINBLK() {
        var set_param_popup_title="Set gain block parameters";
        return set_param_popup_title
    }


}
