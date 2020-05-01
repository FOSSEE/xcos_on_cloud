function DLRADAPT_f() {

    DLRADAPT_f.prototype.define = function DLRADAPT_f() {
        this.p = [[0], [1]];
        this.rn = [];
        this.rd = [[math.complex(0.2, 0.8), math.complex(0.2, -0.8)], [math.complex(0.3, 0.7), math.complex(0.3, -0.7)]];
        this.g = [[1], [1]];
        this.last_u = [];
        this.last_y = [[0], [0]];

        var model = scicos_model();
        model.sim = new ScilabString(["dlradp"]);
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble(...this.last_y);
        model.rpar = new ScilabDouble(...this.p, ...real(colon_operator(this.rd)), ...math.im(colon_operator(this.rd)), ...this.g);
        model.ipar = new ScilabDouble([0], [2], [2]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.p)], [sci2exp([])], [sci2exp(this.rd, 0)], [sci2exp(this.g)], [sci2exp([])], [sci2exp(this.last_y)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLRADAPT_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DLRADAPT_f.prototype.get = function DLRADAPT_f() {

	    var options = "";
	    var str = this.rd.toString();
	    if (str.match(/[a-z]/i)){
	        options = {
                p:["Vector of p mesh points",this.p],
	            rn:["Numerator roots (one line for each mesh)",this.rn],
                rd:["Denominator roots (one line for each mesh)",sci2exp(this.rd)],
                g:["Vector of gain at mesh points",this.g],
	            last_u:["past inputs (Num degree values)",this.last_u],
	            last_y:["past outputs (Den degree values)",this.last_y],
            }
	    }else{
	        options={
                p:["Vector of p mesh points",this.p],
	            rn:["Numerator roots (one line for each mesh)",this.rn],
                rd:["Denominator roots (one line for each mesh)",this.rd],
                g:["Vector of gain at mesh points",this.g],
	            last_u:["past inputs (Num degree values)",this.last_u],
	            last_y:["past outputs (Den degree values)",this.last_y],
            }
	    }
        return options
    }

    DLRADAPT_f.prototype.set = function DLRADAPT_f() {
        var temp_p = arguments[0]["p"];
        var temp_rn = arguments[0]["rn"];
	    this.rd = arguments[0]["rd"];
	    var temp_g = arguments[0]["g"];
        var temp_last_u = arguments[0]["last_u"];
	    var temp_last_y = arguments[0]["last_y"];
	    var rd_cal = this.rd;
	    var p_1 = inverse(temp_p);
	    var rn_1 = inverse(temp_rn);
	    var g_1 = inverse(temp_g);
	    var last_u_1 = inverse(temp_last_u);
	    var last_y_1 = inverse(temp_last_y);

        /*
        * Below code is to accept matrix with imaginary and real number
        */
	    var value = rd_cal.toString().replace(/[\[\]']+/g,''); //this remove [[ bracket
	    var arr1 = value.split(/[;]+/); //splits string by ;
	    var str = [];
	    var str1 = [];

        // to iterate through arr1 ie. split on basis of ;
	    for(var i = 0; i < arr1.length; i++){
	        var temp = arr1[i].split(/[,]+/); //split by ,
		    for(var j = 0; j < temp.length; j++){

		    /*
		    *convert it into string with mathcomplex for sending as paramter to eval and real function.
		    */
	            var temp2 = "math.complex('"+temp[j].replace("%i*","i")+"')";
	            str[j] = temp2;
		    }

            // adding , in between two values and no , if end element
		    if(i == (arr1.length-1)){
			    str1+="["+str+"]";
		    }else{
			    str1+="["+str+"],";
		    }
	    }
	    var temp_rd = eval("["+str1 +"]"); //this is to pass to real function used in rpar
	    if (str1.includes("i")) {
            this.rd = temp_rd;
	    }
        this.p = temp_p;
        this.rn = temp_rn;
        this.g = temp_g;
        this.last_u = temp_last_u;
        this.last_y = temp_last_y;
	    if (str1.includes("i")) {
            var exprs = new ScilabString([this.p], [this.rn], [sci2exp(this.rd, 0)], [this.g], [this.last_u], [this.last_y]);
        }else{
	        var exprs = new ScilabString([this.p], [this.rn], [this.rd], [this.g], [this.last_u], [this.last_y]);
        }
	    this.x.graphics.exprs = exprs;
	    this.x.model.rpar = new ScilabDouble(...p_1, ...real(colon_operator(temp_rd)), ...math.im(colon_operator(temp_rd)), ...g_1);
        return new BasicBlock(this.x)
    }

    DLRADAPT_f.prototype.details = function DLRADAPT_f() {
        return this.x;
    }
    DLRADAPT_f.prototype.get_popup_title = function DLRADAPT_f() {
        var set_param_popup_title = "Set block parameters";
        return set_param_popup_title
    }
    DLRADAPT_f.prototype.getDimensionForDisplay = function DLRADAPT_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
