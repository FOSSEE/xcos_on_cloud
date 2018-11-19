function MATMUL() {

    MATMUL.prototype.define = function MATMUL() {

        var model = scicos_model();
        model.sim = list(new ScilabString(["matmul_m"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1], [-2]);
        model.in2 = new ScilabDouble([-2], [-3]);
        model.out = new ScilabDouble([-1]);
        model.out2 = new ScilabDouble([-3]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.ipar = new ScilabDouble([1]);

        var label = new ScilabString([sci2exp(parseFloat(getData(model.ipar)))]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MATMUL\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    MATMUL.prototype.details = function MATMUL() {
        return this.x;
    }
    MATMUL.prototype.get = function MATMUL() {
        if(this.dtype == undefined || this.dtype == null)
            this.dtype = 1
        if(this.rule == undefined || this.rule == null)
            this.rule = 1
        if(this.np == undefined || this.np == null)
            this.np = 1

        var options={
            dtype:["Datatype(1=real double 2=Complex 3=int32 ...)",this.dtype],
            rule:["Multiplication rule",this.rule],
            np:["Do on Overflow(0=Nothing 1=Saturate 2=Error)",this.np],
        }
        return options
    }
    MATMUL.prototype.set = function MATMUL() {
        this.dtype = parseFloat((arguments[0]["dtype"]))
        this.rule = parseFloat((arguments[0]["rule"]))
        this.np = parseFloat((arguments[0]["np"]))
        if((this.dtype<1)||(this.dtype>8)){
                alert("type is not supported");
                MATMUL.get();
        }
            if((this.rule<1)||(this.rule>3)){
                alert("Multiplication rule must be only 1,2 or 3");
                MATMUL.get();
            }
        if(this.rule == 2){
            if(this.np == 0)
                this.function_name = "matmul2_m"
            else if(this.np == 1)
                this.function_name = "matmul2_s"
            else
                this.function_name = "matmul2_e"
        }
        else if(this.rule == 3){
            if(this.np == 0)
                this.function_name = "matbyscal"
            else if(this.np == 1)
                this.function_name = "matbyscal_s"
            else
                this.function_name = "matbyscal_e"
        }
        else{
            if(this.dtype == 1)
                this.function_name = "matmul_m"
            else if(this.dtype == 2)
                this.function_name = "matzmul_m"
            else if(this.dtype == 3){
                if(this.np == 0)
                    this.function_name = "matmul_i32n"
                else if(this.np == 1)
                    this.function_name = "matmul_i32s"
                else
                    this.function_name = "matmul_i32e"
            }
            else if(this.dtype == 4){
                if(this.np == 0)
                    this.function_name = "matmul_i16n"
                else if(this.np == 1)
                    this.function_name = "matmul_i16s"
                else
                    this.function_name = "matmul_i16e"
            }
            else if(this.dtype == 5){
                if(this.np == 0)
                    this.function_name = "matmul_i8n"
                else if(this.np == 1)
                    this.function_name = "matmul_i8s"
                else
                    this.function_name = "matmul_i8e"
            }
            else if(this.dtype == 6){
                if(this.np == 0)
                    this.function_name = "matmul_ui32n"
                else if(this.np == 1)
                    this.function_name = "matmul_ui32s"
                else
                    this.function_name = "matmul_ui32e"
            }
            else if(this.dtype == 7){
                if(this.np == 0)
                    this.function_name = "matmul_ui16n"
                else if(this.np == 1)
                    this.function_name = "matmul_ui16s"
                else
                    this.function_name = "matmul_ui16e"
            }
            else if(this.dtype == 8){
                if(this.np == 0)
                    this.function_name = "matmul_ui8n"
                else if(this.np == 1)
                    this.function_name = "matmul_ui8s"
                else
                    this.function_name = "matmul_ui8e"
            }
        }
        this.it = ones(2,1)
        for (var i = this.it.length - 1; i >= 0; i--) {
            this.it[i][0] = this.it[i][0]*this.dtype
        }
        this.ot = this.dtype
        if(this.rule == 1){
            this.in = [[-1],[-2],[-2],[-3]]
            this.out = [[-1],[-3]]
        }
        if(this.rule == 2){
            this.in = [[-1],[-2],[-1],[-2]]
            this.out = [[-1],[-2]]
        }
        else{
            this.in = [[-1],[-2],[1],[1]]
            this.out = [[-1],[-2]]
        }
        var tabmin = [[0],[0],[-1*Math.pow(2,31)],[-1*Math.pow(2,15)],[-1*Math.pow(2,7)],[0],[0],[0]]
        var tabmax = [[0],[0],[Math.pow(2,31)-1],[Math.pow(2,15)-1],[Math.pow(2,7)-1],[Math.pow(2,32)-1],[Math.pow(2,16)-1],[Math.pow(2,8)-1]]
        this.kmin = tabmin[this.dtype-1][0]
        this.kmax = tabmax[this.dtype-1][0]
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
        this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        this.x.model.ipar = new ScilabDouble([this.rule]);
        this.x.model.rpar = new ScilabDouble([this.kmin],[this.kmax])
        var exprs = new ScilabString([this.dtype],[this.rule],[this.np])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    MATMUL.prototype.get_popup_title = function MATMUL() {
        var set_param_popup_title="Set MATMUL block parameters";
        return set_param_popup_title
    }
    MATMUL.prototype.getDimensionForDisplay = function MATMUL(){
        var dimension = [60,40];
        return dimension
    }
}
