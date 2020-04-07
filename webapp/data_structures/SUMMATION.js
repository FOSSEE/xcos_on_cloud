function SUMMATION() {

    SUMMATION.prototype.define = function SUMMATION() {
        this.sgn = [[1],[-1]];
	this.Datatype = 1;
	this.satur = 0;
        var model = scicos_model();
        model.sim = list(new ScilabString(["summation"]), new ScilabDouble([4]));
	//model.rpar = new ScilabDouble(...this.sgn);
        model.in = new ScilabDouble([1], [-1]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2], [-2]);
        model.out2 = new ScilabDouble([-2]);
        model.ipar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.sgn)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SUMMATION\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 3]), model, exprs, gr_i);
        return new Summation(this.x);
    }

    SUMMATION.prototype.details = function SUMMATION() {
        return this.x;
    }
    SUMMATION.prototype.get = function SUMMATION() {
        if(this.Datatype == undefined || this.Datatype == null){
            this.Datatype = 1;
        }
        if(this.sgn == undefined || this.sgn == null){
            this.sgn = [[1],[-1]];
        }
        if(this.satur == undefined || this.satur == null){
            this.satur = 0;
        }
        var options={
            Datatype:["Datatype (1=real double  2=complex 3=int32 ...)",this.Datatype],
	    sgn:["Number of inputs or sign vector (of +1, -1)",sci2exp(this.sgn)],//.toString().replace(/,/g, " ")
            satur:["Do on Overflow(0=Nothing 1=Saturate 2=Error)",this.satur],
        }
        return options
    }
    SUMMATION.prototype.set = function SUMMATION() {
        this.Datatype = parseInt((arguments[0]["Datatype"]))
	this.sgn = inverse(arguments[0]["sgn"])
        this.satur = parseInt((arguments[0]["satur"]))
        if((this.satur!=0)&&(this.satur!=1)&&(this.satur!=2)){
                alert("Do on overflow must be 0,1,2");
                SUMMATION.get();
        }

        var f=0;
        for(var i=size(this.sgn,1)-1;i>=0;i--)
        {
            for(var j=size(this.sgn,2)-1;j>=0;j--)
            {
                if(Math.abs(this.sgn[i][j])!=1){
                    f=1;
                    break;
                }
            }
        }
        if(size(this.sgn,1) == 1){
            if(this.sgn<1){
                    alert("Number of inputs must be > 0");
                    SUMMATION.get();
            }
            if(this.sgn[0] == 1){
                this.in = -1
                this.in2 = -2
                this.sgn = []
                this.nout = 1
                this.nout2 = 1
            }
            else{
		this.in = ones(size(this.sgn,"*"),1)
                //this.in = oness(this.sgn,1)
                for (var i = this.in.length - 1; i >= 0; i--) {
                    this.in[i][0] = -1*this.in[i][0]
                }
                this.in2 = this.in
                for (var i = this.in2.length - 1; i >= 0; i--) {
                    this.in2[i][0] = 2*this.in2[i][0]
                }
                this.sgn = oness(this.sgn,1)
                this.nout = -1
                this.nout2 = -2
            }
        }
        else{
            if(f==1){
                    alert("Signs can only be +1 or -1");
                    SUMMATION.get();
            }

            //this.in = oness(this.sgn,1)
	    this.in = ones(size(this.sgn,"*"),1)
            for (var i = this.in.length - 1; i >= 0; i--) {
                this.in[i][0] = -1*this.in[i][0]
            }
            this.in2 = this.in
            for (var i = this.in2.length - 1; i >= 0; i--) {
                this.in2[i][0] = 2*this.in2[i][0]
            }
            this.nout = -1;
            this.nout2 = -2;
        }

       // this.it = oness(size(this.in,1),1)
	this.it= ones(size(this.sgn,"*"),1)
        for (var i = this.it.length - 1; i >= 0; i--) {
            this.it[i][0] = this.Datatype*this.it[i][0]
        }
        this.ot = this.Datatype
        if(this.Datatype == 1)
            this.function_name = "summation"
        else if(this.Datatype == 2)
            this.function_name = "summation_z"
        else{
            if(this.satur == 0){
                if(this.Datatype == 3)
                    this.function_name = "summation_i32n"
                else if(this.Datatype == 4)
                    this.function_name = "summation_i16n"
                else if(this.Datatype == 5)
                    this.function_name = "summation_i8n"
                else if(this.Datatype == 6)
                    this.function_name = "summation_ui32n"
                else if(this.Datatype == 7)
                    this.function_name = "summation_ui16n"
                else if(this.Datatype == 8)
                    this.function_name = "summation_ui8n"
            }
            if(this.satur == 1){
                if(this.Datatype == 3)
                    this.function_name = "summation_i32s"
                else if(this.Datatype == 4)
                    this.function_name = "summation_i16s"
                else if(this.Datatype == 5)
                    this.function_name = "summation_i8s"
                else if(this.Datatype == 6)
                    this.function_name = "summation_ui32s"
                else if(this.Datatype == 7)
                    this.function_name = "summation_ui16s"
                else if(this.Datatype == 8)
                    this.function_name = "summation_ui8s"
            }
            if(this.satur == 2){
                if(this.Datatype == 3)
                    this.function_name = "summation_i32e"
                else if(this.Datatype == 4)
                    this.function_name = "summation_i16e"
                else if(this.Datatype == 5)
                    this.function_name = "summation_i8e"
                else if(this.Datatype == 6)
                    this.function_name = "summation_ui32e"
                else if(this.Datatype == 7)
                    this.function_name = "summation_ui16e"
                else if(this.Datatype == 8)
                    this.function_name = "summation_ui8e"
            }

        }

	var model = scicos_model();

	this.nout = -1;
        this.nout2 = -2;
        this.in = [...this.in,...this.in2]
	this.x.model.out = new ScilabDouble([-1]);
        this.out =new ScilabDouble([-1],[-2]) //[...this.nout,...this.nout2]
        this.x.model.intyp = new ScilabDouble(...this.it)
        this.x.model.outtyp = new ScilabDouble(this.ot)

        var io = set_io(this.x.model,this.x.graphics,this.in,[-1],[],[])
        this.x.model.rpar = new ScilabDouble([this.satur]);
        this.x.model.ipar = new ScilabDouble(...this.sgn);
        var exprs = new ScilabString([sci2exp(this.Datatype)],[sci2exp(this.sgn)],[this.satur])
        this.x.graphics.exprs=exprs
        return new Summation(this.x)
    }
    SUMMATION.prototype.get_popup_title = function SUMMATION() {
        var set_param_popup_title="Set sum block parameters";
        return set_param_popup_title
    }
    SUMMATION.prototype.getDimensionForDisplay = function SUMMATION(){
        var dimension = { width: 40, height: 60 };
        return dimension
    }
}
